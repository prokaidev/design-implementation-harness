#!/usr/bin/env node
// Cut a device-pixel PNG into tiles no larger than --max px (default 1000) so each can be inspected 1:1.
//
//   node crop-tiles.mjs <file.png | dir> --out <dir> [--max 1000] [--rect x,y,w,h]
//
// --rect  region in device pixels to cut first (e.g. an asset's box × DPR)
// A directory argument tiles every PNG in it (e.g. <round>/assets from asset-density.mjs).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { PNG } from 'pngjs';
import { parseArgs, need, ensureDir, writeJson, fail } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
need(args, 'out');
const input = args._[0];
if (!input) fail('usage: crop-tiles.mjs <file.png|dir> --out <dir>');
const max = Number(args.max || 1000);
const out = ensureDir(args.out);
const inputs = statSync(input).isDirectory()
  ? readdirSync(input).filter((f) => f.endsWith('.png')).map((f) => join(input, f))
  : [input];
if (!inputs.length) fail(`no PNG files in ${input}`);

const index = [];
for (const file of inputs) {
  const png = PNG.sync.read(readFileSync(file));
  let [x0, y0, w, h] = args.rect ? args.rect.split(',').map(Number) : [0, 0, png.width, png.height];
  w = Math.min(w, png.width - x0); h = Math.min(h, png.height - y0);
  const cols = Math.ceil(w / max), rows = Math.ceil(h / max);
  const name = basename(file, extname(file));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const tx = x0 + c * max, ty = y0 + r * max;
    const tw = Math.min(max, x0 + w - tx), th = Math.min(max, y0 + h - ty);
    const tile = new PNG({ width: tw, height: th });
    PNG.bitblt(png, tile, tx, ty, tw, th, 0, 0);
    const path = join(out, `${name}-r${r}c${c}.png`);
    writeFileSync(path, PNG.sync.write(tile));
    index.push({ source: file, path, x: tx, y: ty, width: tw, height: th });
  }
  console.log(`${file} (${png.width}×${png.height}) → ${rows * cols} tile(s)`);
}
writeJson(join(out, 'tiles.json'), { max, tiles: index });
