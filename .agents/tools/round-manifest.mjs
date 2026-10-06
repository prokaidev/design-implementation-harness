#!/usr/bin/env node
// Record the provenance of a validation round.
//
//   node round-manifest.mjs --round <n> --out <validation/round-N> --package <screen dir> [--prev <previous round manifest.json>]
//   (--prev defaults to the sibling round-<n-1>/manifest.json)
//
// Writes <out>/manifest.json, <out>/code.patch (git diff HEAD) and <out>/untracked/ (copies of untracked source files).
// "changedSincePrev" compares the working-tree changes (and commits) with the previous round's manifest.
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative, dirname, resolve } from 'node:path';
import { parseArgs, need, ensureDir, writeJson, sha256, fail } from './lib.mjs';

const args = parseArgs(process.argv.slice(2));
need(args, 'round', 'out', 'package');
// Resolve user paths before moving to the repository root.
const outAbs = resolve(args.out), pkgAbs = resolve(args.package);
// Previous manifest: --prev, else the sibling round-<n-1>/manifest.json. A missing one is a warning, not an error.
let prevAbs = args.prev ? resolve(args.prev) : resolve(outAbs, '..', `round-${Number(args.round) - 1}`, 'manifest.json');
if (!existsSync(prevAbs)) {
  if (args.prev || Number(args.round) > 1) console.warn(`warning: no previous manifest at ${prevAbs}; "changedSincePrev" omitted (run this tool in every round)`);
  prevAbs = null;
}
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
let root;
try { root = git('rev-parse', '--show-toplevel').trim(); } catch { fail('not inside a git repository'); }
process.chdir(root);

const out = ensureDir(relative(root, outAbs));
const commit = git('rev-parse', 'HEAD').trim();
const branch = git('rev-parse', '--abbrev-ref', 'HEAD').trim();

// Everything under validation/ is a generated capture, never part of the snapshot.
const isGenerated = (p) => /(^|\/)validation\//.test(p);

const patch = git('diff', 'HEAD', '--binary');
writeFileSync(join(out, 'code.patch'), patch);

const modified = git('diff', 'HEAD', '--name-only').split('\n').filter(Boolean).filter((p) => !isGenerated(p));
const untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean).filter((p) => !isGenerated(p));

const hashFile = (p) => (existsSync(p) && statSync(p).isFile() ? sha256(readFileSync(p)) : null);
const working = {};
for (const p of [...modified, ...untracked]) working[p] = hashFile(p);

ensureDir(join(out, 'untracked'));
const skipped = [];
for (const p of untracked) {
  if (!existsSync(p) || statSync(p).size > 2 * 1024 * 1024) { skipped.push(p); continue; }
  const dest = join(out, 'untracked', p);
  ensureDir(dirname(dest));
  copyFileSync(p, dest);
}

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const full = join(dir, e.name);
  if (isGenerated(full + '/') || e.name === 'validation') return [];
  return e.isDirectory() ? walk(full) : [full];
});
const pkgDir = relative(root, pkgAbs);
const pkg = {};
for (const f of walk(pkgDir)) pkg[f] = hashFile(f);

let changedSincePrev = null;
if (prevAbs) {
  const prev = JSON.parse(readFileSync(prevAbs, 'utf8'));
  const changed = new Set();
  if (prev.commit !== commit) {
    try { git('diff', '--name-only', prev.commit, commit).split('\n').filter(Boolean).forEach((p) => changed.add(p)); }
    catch { changed.add('(previous commit not found; treat all files as changed)'); }
  }
  for (const [p, h] of Object.entries(working)) if (prev.workingTree?.[p] !== h) changed.add(p);
  for (const p of Object.keys(prev.workingTree ?? {})) if (!(p in working)) changed.add(p);
  for (const [p, h] of Object.entries(pkg)) if (prev.package?.[p] !== h) changed.add(p);
  for (const p of Object.keys(prev.package ?? {})) if (!(p in pkg)) changed.add(p);
  changedSincePrev = [...changed].filter((p) => !isGenerated(p)).sort();
}

const manifest = {
  round: Number(args.round), date: new Date().toISOString(), commit, branch,
  dirty: modified.length + untracked.length > 0, patch: join(out, 'code.patch'),
  workingTree: working, untrackedCopiedTo: join(out, 'untracked'), untrackedSkipped: skipped,
  package: pkg, changedSincePrev,
};
writeJson(join(out, 'manifest.json'), manifest);

console.log(`round ${manifest.round}: commit ${commit.slice(0, 10)} (${branch}), ${Object.keys(working).length} uncommitted file(s), ${Object.keys(pkg).length} package file(s)`);
if (changedSincePrev) console.log(`changed since previous round: ${changedSincePrev.length ? changedSincePrev.join(', ') : 'nothing'}`);
console.log(`→ ${join(out, 'manifest.json')}`);
