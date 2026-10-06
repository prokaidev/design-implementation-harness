#!/usr/bin/env node
// Verify the resource actually loaded for each production asset role against CSS paint size × target DPR.
//
//   node asset-density.mjs --contract <responsive-contract.md> --url <base-url> --out <validation/round-N>
//
// Reads "assetChecks" from the contract's json matrix: { role, selector, width, dpr }.
// Writes <out>/asset-density.json and device-pixel element screenshots to <out>/assets/<role>.png.
// Exit code 1 if any check fails.
import { chromium } from 'playwright';
import { join } from 'node:path';
import { parseArgs, need, ensureDir, writeJson, readMatrix, stabilize, sha256, imageSize, slug } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
need(args, 'contract', 'url', 'out');
const matrix = readMatrix(args.contract);
if (!matrix.assetChecks.length) { console.log('no assetChecks in the matrix (vector-only screen? record evidence of not applicable)'); process.exit(0); }

const out = ensureDir(args.out);
ensureDir(join(out, 'assets'));
const url = new URL(matrix.route || '/', args.url).toString();
const browser = await chromium.launch();
const results = [];

for (const check of matrix.assetChecks) {
  const dpr = check.dpr ?? 2;
  const ctx = await browser.newContext({ viewport: { width: check.width, height: matrix.height }, deviceScaleFactor: dpr, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await stabilize(page);
    const loc = page.locator(check.selector).first();
    if (!(await loc.count())) { results.push({ role: check.role, verdict: 'fail', reason: `selector not found: ${check.selector}` }); continue; }
    await loc.scrollIntoViewIfNeeded();
    const probe = await loc.evaluate((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      // image-set(): pick the candidate the browser uses at this DPR (smallest density ≥ DPR, else the largest),
      // not the first url() in the list.
      const pickBackground = (v) => {
        const set = v.match(/image-set\((.*)\)/);
        if (set) {
          const cands = [...set[1].matchAll(/url\(["']?(.*?)["']?\)(?:\s+type\([^)]*\))?(?:\s+([\d.]+)(?:dppx|x))?/g)]
            .map((m) => ({ url: m[1], density: m[2] ? Number(m[2]) : 1 }))
            .sort((a, b) => a.density - b.density);
          if (cands.length) return { url: (cands.find((c) => c.density >= devicePixelRatio) ?? cands[cands.length - 1]).url, imageSet: true };
        }
        const m = v.match(/url\(["']?(.*?)["']?\)/);
        return m ? { url: m[1], imageSet: false } : null;
      };
      const bg = pickBackground(cs.backgroundImage);
      const isImg = el.tagName === 'IMG';
      return {
        kind: isImg ? 'img' : bg ? (bg.imageSet ? 'background-image-set' : 'background') : 'none',
        resource: isImg ? el.currentSrc : bg ? new URL(bg.url, document.baseURI).href : null,
        naturalWidth: isImg ? el.naturalWidth : null, naturalHeight: isImg ? el.naturalHeight : null,
        rect: { width: r.width, height: r.height },
        fit: isImg ? cs.objectFit : cs.backgroundSize,
        position: isImg ? cs.objectPosition : cs.backgroundPosition,
        observedDpr: window.devicePixelRatio,
      };
    });
    if (!probe.resource) { results.push({ role: check.role, verdict: 'fail', reason: 'no img currentSrc or CSS background-image on the element' }); continue; }

    let buf, size, via = 'fetch';
    if (probe.resource.startsWith('data:')) {
      via = 'data-uri';
      const comma = probe.resource.indexOf(',');
      const meta = probe.resource.slice(5, comma);
      buf = meta.includes(';base64') ? Buffer.from(probe.resource.slice(comma + 1), 'base64') : Buffer.from(decodeURIComponent(probe.resource.slice(comma + 1)));
    } else {
      const res = await ctx.request.get(probe.resource);
      if (!res.ok()) { results.push({ role: check.role, verdict: 'fail', reason: `resource fetch ${res.status()}: ${probe.resource}` }); continue; }
      buf = await res.body();
    }
    size = imageSize(buf);
    const shot = join(out, 'assets', `${slug(check.role)}.png`);
    await loc.screenshot({ path: shot });

    const row = {
      role: check.role, selector: check.selector, viewportWidth: check.width, observedDpr: probe.observedDpr, targetDpr: dpr,
      kind: probe.kind, resource: probe.resource.startsWith('data:') ? `data-uri(${buf.length}B)` : probe.resource, via,
      sha256: sha256(buf), bytes: buf.length, file: size,
      htmlNatural: probe.naturalWidth != null ? { width: probe.naturalWidth, height: probe.naturalHeight } : null,
      cssBox: probe.rect, fit: probe.fit, position: probe.position, screenshot: shot,
    };
    if (probe.observedDpr !== dpr) { row.verdict = 'fail'; row.reason = `observed DPR ${probe.observedDpr} ≠ target ${dpr}`; }
    else if (!size) { row.verdict = 'fail'; row.reason = 'unknown image format; record dimensions manually'; }
    else if (size.vector) { row.verdict = 'n/a-vector'; row.reason = 'vector source: inspect rendering at DPR 2 in the crop'; }
    else {
      // Painted size of the whole image before clipping (cover) or after fitting (contain).
      const { width: bw, height: bh } = probe.rect;
      const fit = probe.fit;
      let scale;
      if (/cover/.test(fit)) scale = Math.max(bw / size.width, bh / size.height);
      else if (/contain|scale-down/.test(fit)) scale = Math.min(bw / size.width, bh / size.height);
      else if (/none/.test(fit)) scale = 1;
      else scale = null; // fill / auto: stretched to the box
      const paintW = scale == null ? bw : size.width * scale;
      const paintH = scale == null ? bh : size.height * scale;
      row.paintCss = { width: +paintW.toFixed(2), height: +paintH.toFixed(2) };
      row.requiredPixels = { width: Math.ceil(paintW * dpr), height: Math.ceil(paintH * dpr) };
      row.effectiveDensity = +Math.min(size.width / paintW, size.height / paintH).toFixed(3);
      row.approximate = probe.kind.startsWith('background') && !/cover|contain/.test(fit);
      const ok = size.width >= row.requiredPixels.width && size.height >= row.requiredPixels.height;
      row.verdict = ok ? 'pass' : 'fail';
      if (!ok) row.reason = `file ${size.width}×${size.height} < required ${row.requiredPixels.width}×${row.requiredPixels.height}`;
      if (row.approximate) row.note = 'background-size is not cover/contain: paint size approximated by the element box';
    }
    results.push(row);
  } catch (e) {
    results.push({ role: check.role, verdict: 'fail', reason: `check failed: ${e.message.split('\n')[0]}` });
  } finally {
    await ctx.close();
  }
}
await browser.close();

const verdict = results.every((r) => r.verdict === 'pass' || r.verdict === 'n/a-vector') ? 'pass' : 'fail';
writeJson(join(out, 'asset-density.json'), { url, date: new Date().toISOString(), verdict, results });
for (const r of results) {
  console.log(`${r.verdict.padEnd(10)} ${r.role}: ` + (r.file ? `file ${r.file.width ?? '?'}×${r.file.height ?? '?'}, paint ${r.paintCss?.width ?? r.cssBox?.width}×${r.paintCss?.height ?? r.cssBox?.height} css, density ${r.effectiveDensity ?? '-'}× (need ≥${r.targetDpr})` : '') + (r.reason ? ` — ${r.reason}` : ''));
}
console.log(`overall: ${verdict} → ${join(out, 'asset-density.json')}`);
process.exit(verdict === 'pass' ? 0 : 1);
