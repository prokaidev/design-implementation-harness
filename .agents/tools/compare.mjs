#!/usr/bin/env node
// Pixel-compare a capture with a design reference of the same bounds and write a diff image.
//
//   node compare.mjs --ref <reference.png> --actual <capture.png> --out <diff.png> [--tolerance 24] [--band 8] [--probe x,y,w,h]
//
// --probe  for the region x,y,w,h find the (dx,dy) shift of the capture (±3 px) that minimizes the mismatch;
//          a non-zero best shift is a positional difference (minor), a zero shift with high mismatch is rendering
//
// Prints the mismatch ratio and the row bands with differences (top → bottom) so a reviewer can map them to
// sections. Images of different sizes are compared on their common area and the size difference is reported.
// Exit code 1 when sizes differ or more than 0.5% of pixels differ; the review (not this tool) assigns severity.
import { readFileSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import { parseArgs, need } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
need(args, 'ref', 'actual', 'out');
const tol = Number(args.tolerance ?? 24), band = Number(args.band ?? 8);
const a = PNG.sync.read(readFileSync(args.ref));
const b = PNG.sync.read(readFileSync(args.actual));
const w = Math.min(a.width, b.width), h = Math.min(a.height, b.height);
const diff = new PNG({ width: w, height: h });
let bad = 0;
const rows = new Array(h).fill(0);
const px = (img, x, y, c) => img.data[(y * img.width + x) * 4 + c];
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  // composite on white so transparent areas compare like the page background
  const d = [0, 1, 2].map((c) => {
    const al = px(a, x, y, 3) / 255, bl = px(b, x, y, 3) / 255;
    return Math.abs(px(a, x, y, c) * al + 255 * (1 - al) - (px(b, x, y, c) * bl + 255 * (1 - bl)));
  });
  const o = (y * w + x) * 4;
  if (Math.max(...d) > tol) {
    bad++; rows[y]++;
    diff.data[o] = 255; diff.data[o + 1] = 0; diff.data[o + 2] = 64; diff.data[o + 3] = 255;
  } else {
    const g = 255 - (255 - (px(b, x, y, 0) + px(b, x, y, 1) + px(b, x, y, 2)) / 3) * 0.25;
    diff.data[o] = diff.data[o + 1] = diff.data[o + 2] = g; diff.data[o + 3] = 255;
  }
}
writeFileSync(args.out, PNG.sync.write(diff));
const bands = [];
for (let y = 0; y < h; y += band) {
  const n = rows.slice(y, y + band).reduce((s, v) => s + v, 0);
  if (!n) continue;
  const last = bands[bands.length - 1];
  if (last && last.to >= y - band) { last.to = Math.min(y + band, h); last.pixels += n; } else bands.push({ from: y, to: Math.min(y + band, h), pixels: n });
}
if (args.probe) {
  const [rx, ry, rw, rh] = args.probe.split(',').map(Number);
  const gray = (im, x, y) => { const i = (y * im.width + x) * 4; return (im.data[i] + im.data[i + 1] + im.data[i + 2]) / 3; };
  const res = [];
  for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
    let n = 0;
    for (let y = ry; y < ry + rh; y++) for (let x = rx; x < rx + rw; x++) {
      if (x + dx < 0 || y + dy < 0 || x + dx >= b.width || y + dy >= b.height) continue;
      if (Math.abs(gray(a, x, y) - gray(b, x + dx, y + dy)) > tol) n++;
    }
    res.push({ dx, dy, n });
  }
  res.sort((p, q) => p.n - q.n);
  const zero = res.find((r) => r.dx === 0 && r.dy === 0);
  console.log(`probe ${args.probe}: best shift dx=${res[0].dx} dy=${res[0].dy} (${res[0].n}px), at 0,0: ${zero.n}px`);
}
const ratio = bad / (w * h);
console.log(`ref ${a.width}×${a.height}, actual ${b.width}×${b.height}${a.height !== b.height || a.width !== b.width ? '  (SIZE DIFFERS: Δ' + (b.width - a.width) + '×' + (b.height - a.height) + ')' : ''}`);
console.log(`mismatch ${(ratio * 100).toFixed(2)}% of ${w}×${h} (tolerance ${tol}) → ${args.out}`);
for (const r of bands.slice(0, 12)) console.log(`  rows ${r.from}–${r.to}: ${r.pixels}px`);
process.exit(ratio > 0.005 || a.height !== b.height || a.width !== b.width ? 1 : 0);
