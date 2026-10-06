// Shared helpers for the harness tools. No dependencies beyond Node built-ins.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

export function parseArgs(argv, spec = {}) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { out._.push(a); continue; }
    const key = a.slice(2);
    if (spec[key] === 'bool') { out[key] = true; continue; }
    const v = argv[++i];
    if (v === undefined) fail(`Missing value for --${key}`);
    out[key] = v;
  }
  return out;
}

export function fail(msg, code = 2) {
  console.error(`error: ${msg}`);
  process.exit(code);
}

export function need(args, ...keys) {
  for (const k of keys) if (!args[k]) fail(`--${k} is required`);
}

export function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
}

export const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

export const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Read the ```json matrix block from a Responsive Contract markdown file. */
export function readMatrix(contractPath) {
  const text = readFileSync(contractPath, 'utf8');
  const m = text.match(/```json matrix\s*\n([\s\S]*?)\n```/);
  if (!m) fail(`No \`\`\`json matrix block in ${contractPath}`);
  let matrix;
  try { matrix = JSON.parse(m[1]); } catch (e) { fail(`Invalid matrix JSON in ${contractPath}: ${e.message}`); }
  matrix.widths ??= [];
  matrix.height ??= 900;
  matrix.states ??= [{ name: 'default' }];
  matrix.themes ??= ['light'];
  matrix.dpr ??= [1];
  matrix.sections ??= [];
  matrix.assetChecks ??= [];
  return matrix;
}

export function joinUrl(base, route) {
  return new URL(route || '/', base.endsWith('/') ? base : base + '/').toString().replace(/\/$/, route === '/' || !route ? '/' : '');
}

/** Pixel size of an image buffer: PNG, JPEG, GIF, WebP, SVG (viewBox). Returns null when unknown. */
export function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { format: 'png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 10 && buf.toString('ascii', 0, 3) === 'GIF') {
    return { format: 'gif', width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { format: 'jpeg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8X') return { format: 'webp', width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (kind === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { format: 'webp', width: 1 + (b & 0x3fff), height: 1 + ((b >> 14) & 0x3fff) };
    }
    if (kind === 'VP8 ') return { format: 'webp', width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    return null;
  }
  const head = buf.toString('utf8', 0, Math.min(buf.length, 2048));
  if (/<svg[\s>]/i.test(head)) {
    const vb = head.match(/viewBox\s*=\s*["']\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
    return { format: 'svg', vector: true, width: vb ? Number(vb[1]) : null, height: vb ? Number(vb[2]) : null };
  }
  return null;
}

/** CSS injected before capture to make rendering deterministic. */
export const STABILIZE_CSS = `
*, *::before, *::after {
  animation: none !important; transition: none !important;
  animation-delay: 0s !important; scroll-behavior: auto !important; caret-color: transparent !important;
}`;

/** Wait for fonts, images (incl. lazy ones scrolled into view), and layout to settle. */
export async function stabilize(page) {
  await page.addStyleTag({ content: STABILIZE_CSS });
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));
    await Promise.all([...document.images].map((img) => img.decode ? img.decode().catch(() => {}) : null));
  });
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

export async function runActions(page, actions = []) {
  for (const a of actions) {
    if (a.click) await page.locator(a.click).first().click();
    else if (a.fill) await page.locator(a.fill).first().fill(a.value ?? '');
    else if (a.press) await page.keyboard.press(a.press);
    else if (a.hover) await page.locator(a.hover).first().hover();
    else if (a.evaluate) await page.evaluate(a.evaluate);
    else if (a.wait) await page.waitForTimeout(a.wait);
  }
}
