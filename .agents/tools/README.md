# Harness tools

Node 20+ and Playwright. Setup once per target repository:

```bash
cd .agents/tools && npm install && npx playwright install chromium
```

All scripts print a short summary, write JSON next to the captures, and exit non-zero on failure. Paths are relative to the current directory. If a tool cannot run in the project, do the step by hand and record the same fields in the review, with the reason.

| Script | Purpose | Example |
| --- | --- | --- |
| `capture.mjs` | Capture widths × states × themes × DPR from the contract's `json matrix`, stabilized (fonts, images, animations off). Optional per-section crops by locator. Flags horizontal overflow. | `node capture.mjs --contract C --url http://localhost:5173 --out V/round-1 --sections` |
| `asset-density.mjs` | For each `assetChecks` entry: actual `currentSrc` / CSS background resource, file pixel size and SHA-256, CSS paint size (fit/crop aware), observed DPR, effective density, verdict. Saves device-pixel element screenshots. | `node asset-density.mjs --contract C --url ... --out V/round-1` |
| `crop-tiles.mjs` | Cut device-pixel PNGs (a file or a directory) into tiles of at most 1000 px for 1:1 inspection. | `node crop-tiles.mjs V/round-1/assets --out V/round-1/tiles` |
| `round-manifest.mjs` | Round provenance: commit, `git diff` patch, untracked files, package SHA-256s, files changed since the previous round. | `node round-manifest.mjs --round 2 --out V/round-2 --package screens/<id> --prev V/round-1/manifest.json` |

`C` is `responsive-contract.md`; `V` is `validation/` in the screen package.

## Capture options

- `--widths 390,768`: only these widths (intermediate rounds: affected widths).
- `--breakpoints 600,1024`: adds b−1, b, b+1 for each (intermediate rounds: all breakpoints).
- `--states a,b`, `--sections`, `--no-full-page`.

Full matrix: first and last local round (no flags). See [workflow](../workflows/visual-validation.md).

## Matrix format

The `json matrix` block in the [contract template](../templates/responsive-contract.md): `route`, `widths`, `height`, `states` (each with optional `actions`: `click`, `fill` + `value`, `press`, `hover`, `evaluate`, `wait`), `themes`, `dpr`, `sections` (`name`, `selector`), `assetChecks` (`role`, `selector`, `width`, `dpr`). Actions come from the project's own contract and run as written.

## Limits

- `asset-density.mjs` takes the first element matching each selector. For `background-image` without `cover`/`contain`, the paint size is approximated by the element box and marked `approximate`.
- SVG sources are reported `n/a-vector`; inspect their rendering in the DPR 2 crop.
- Image formats parsed from headers: PNG, JPEG, GIF, WebP, SVG. Others need manual dimensions.
- `round-manifest.mjs` ignores everything under `validation/`, copies untracked files up to 2 MB, and needs a git repository.
