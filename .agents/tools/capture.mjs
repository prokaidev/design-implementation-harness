#!/usr/bin/env node
// Capture the Responsive Contract matrix: widths × states × themes × DPR, plus per-section screenshots.
//
//   node capture.mjs --contract <responsive-contract.md> --url <base-url> --out <validation/round-N>
//        [--widths 1440,390] [--breakpoints 768,1024] [--states a,b] [--sections] [--no-full-page]
//
// --widths       capture only these widths (intermediate rounds: affected widths)
// --breakpoints  add b-1, b, b+1 for each value (intermediate rounds: all breakpoints)
// --sections     also screenshot each contract section by locator, per width
import { chromium } from 'playwright';
import { join } from 'node:path';
import { parseArgs, need, ensureDir, writeJson, readMatrix, stabilize, runActions, slug, fail } from './lib.mjs';

const args = parseArgs(process.argv.slice(2), { sections: 'bool', 'no-full-page': 'bool' });
need(args, 'contract', 'url', 'out');
const matrix = readMatrix(args.contract);

const nums = (s) => s.split(',').map((x) => Number(x.trim())).filter(Boolean);
let widths = matrix.widths;
if (args.widths || args.breakpoints) {
  widths = [...(args.widths ? nums(args.widths) : []), ...(args.breakpoints ? nums(args.breakpoints).flatMap((b) => [b - 1, b, b + 1]) : [])];
}
widths = [...new Set(widths)].sort((a, b) => b - a);
if (!widths.length) fail('No widths: set "widths" in the matrix or pass --widths/--breakpoints');
const wantedStates = args.states?.split(',');
const states = matrix.states.filter((s) => !wantedStates || wantedStates.includes(s.name));
const dprs = matrix.dpr.length ? matrix.dpr : [1];

const out = ensureDir(args.out);
const url = new URL(matrix.route || '/', args.url).toString();
const browser = await chromium.launch();
const files = [];
const problems = [];

for (const theme of matrix.themes) for (const dpr of dprs) for (const state of states) for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: matrix.height },
    deviceScaleFactor: dpr,
    colorScheme: theme === 'dark' ? 'dark' : 'light',
    reducedMotion: 'reduce',
    locale: matrix.locale || 'en-US',
  });
  const page = await ctx.newPage();
  const tag = `${width}x${matrix.height}-${slug(state.name)}-${theme}@${dpr}x`;
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await runActions(page, state.actions);
    await stabilize(page);
    const info = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      scrollHeight: document.documentElement.scrollHeight,
      dpr: window.devicePixelRatio,
    }));
    const overflowX = info.scrollWidth > info.innerWidth;
    if (overflowX) problems.push({ tag, issue: `horizontal overflow: scrollWidth ${info.scrollWidth} > ${info.innerWidth}` });
    if (!args['no-full-page']) {
      const path = join(out, `${tag}.png`);
      await page.screenshot({ path, fullPage: true });
      files.push({ kind: 'page', path, width, height: matrix.height, state: state.name, theme, dpr, bounds: { width, height: info.scrollHeight }, overflowX });
    }
    if (args.sections) {
      ensureDir(join(out, 'sections'));
      for (const sec of matrix.sections) {
        const loc = page.locator(sec.selector).first();
        if (!(await loc.count())) { problems.push({ tag, issue: `section "${sec.name}" not found: ${sec.selector}` }); continue; }
        const box = await loc.boundingBox();
        const path = join(out, 'sections', `${slug(sec.name)}-${tag}.png`);
        await loc.screenshot({ path });
        files.push({ kind: 'section', section: sec.name, path, width, state: state.name, theme, dpr, bounds: box });
      }
    }
  } catch (e) {
    problems.push({ tag, issue: `capture failed: ${e.message.split('\n')[0]}` });
  } finally {
    await ctx.close();
  }
}

const report = { url, route: matrix.route || '/', browser: `chromium ${browser.version()}`, date: new Date().toISOString(), widths, files, problems };
await browser.close();
writeJson(join(out, 'capture.json'), report);
console.log(`captured ${files.length} files → ${out}/capture.json`);
for (const p of problems) console.log(`  ! ${p.tag}: ${p.issue}`);
process.exit(files.length ? 0 : 1);
