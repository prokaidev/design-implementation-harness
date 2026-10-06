#!/usr/bin/env node
// Run axe-core on the contract's route at the given widths and write a JSON report.
//
//   node axe.mjs --contract <responsive-contract.md> --url <base-url> --out <validation/round-N> [--widths 1440,768,390]
//
// Default widths: the reference widths in the matrix (first, middle, last of the sorted list). Exit 1 on violations.
import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs, need, ensureDir, writeJson, readMatrix, stabilize } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
need(args, 'contract', 'url', 'out');
const matrix = readMatrix(args.contract);
const sorted = [...matrix.widths].sort((a, b) => b - a);
const widths = args.widths ? args.widths.split(',').map(Number) : [sorted[0], sorted[Math.floor(sorted.length / 2)], sorted[sorted.length - 1]];
const axeSource = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

const out = ensureDir(args.out);
const url = new URL(matrix.route || '/', args.url).toString();
const browser = await chromium.launch();
const results = [];
for (const width of widths) {
  const ctx = await browser.newContext({ viewport: { width, height: matrix.height } });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await stabilize(page);
  await page.evaluate(axeSource);
  const r = await page.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
  results.push({ width, violations: r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map((n) => n.target.join(' ')) })) });
  await ctx.close();
}
await browser.close();
const total = results.reduce((s, r) => s + r.violations.length, 0);
writeJson(join(out, 'axe.json'), { url, date: new Date().toISOString(), results });
for (const r of results) console.log(`${r.width}px: ${r.violations.length} violation(s)` + r.violations.map((v) => `\n  - ${v.id} (${v.impact}): ${v.help} → ${v.nodes.join(', ')}`).join(''));
console.log(`overall: ${total ? 'fail' : 'pass'} → ${join(out, 'axe.json')}`);
process.exit(total ? 1 : 0);
