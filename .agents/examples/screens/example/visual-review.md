# Visual review

Example review for the [demo app](../../demo-app/), filled from real `capture.mjs`, `asset-density.mjs`, and `round-manifest.mjs` output (round 1 ran on a variant of the page with two seeded defects). The demo has no Figma source, so evidence rows cite contract assertions. Template: [visual-review](../../../templates/visual-review.md).

- Screen ID, route, and implementation revision/working-tree state: `example`, `/`, commit `f393fa0665` + working tree (patches in `validation/round-<n>/code.patch`)
- Design source revision (or `unavailable`), extraction date, and contract path: `unavailable`, 2026-10-06, [responsive-contract.md](responsive-contract.md)
- Runner, browser, environment, and fixture/state setup: Playwright, chromium 153, static server on `:4173`, states `default` and `long-title`
- Local: base 6, consumed 2, extensions used 0 (max 2), ceiling 10
- Integration: not applicable (single agent, no separate integration step), coordinator: none
- Status: **pass** ([definitions](../../../workflows/visual-validation.md#status))

## Round provenance

| Round | Phase / phase round | Code snapshot / saved patch and source inputs | Changed files since prior round | Package manifest path | Review focus / affected checks |
| --- | --- | --- | --- | --- | --- |
| 1 | local / 1 | `validation/round-1/code.patch`, manifest `validation/round-1/manifest.json` | initial | `validation/round-1/manifest.json` (`package`) | full matrix (12 widths × 2 states) + 2 asset checks |
| 2 | local / 2 | `validation/round-2/code.patch`, manifest `validation/round-2/manifest.json` | `demo-app/index.html` (hero `max-width: 560px`; thumbnails → `thumb-2x.png`) | `validation/round-2/manifest.json` | full matrix + 2 asset checks (final verification) |

## Progress and extensions

- Local round 4 assessment: not reached; accepted in round 2.
- Stalls (two rounds without fewer blockers + majors): none.

| Extension after round / phase | Diagnosed remaining causes | Planned fixes / owner | Affected checks / expected improvement | Added rounds |
| --- | --- | --- | --- | --- |
| none | | | | |

- Ceiling escalation: not applicable.
- Setup/capture failures: none.

## Evidence

| Round | Viewport / scale / bounds | State | Reference path or contract assertion | Capture / diff path | Finding | Severity | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 390, 375, 320 / 1× / full page | default, long-title | no horizontal overflow | `validation/round-1/390x900-default-light@1x.png` | `scrollWidth` 584 > viewport: hero image fixed at 560 px | blocker | fail |
| 1 | 1440 / 2× / element | default | density ≥ 2× | `validation/round-1/assets/card-thumb.png` | file 300 × 200 for 300 × 200 CSS px: density 1× | blocker | fail |
| 1 | 1440 / 2× / element | default | density ≥ 2× | `validation/round-1/assets/hero-image.png` | file 1200 × 730 vs 560 × 340.7: density 2.14× | none | pass |
| 2 | all 12 widths / 1× / full page | default, long-title | no horizontal overflow, no overlap | `validation/round-2/capture.json` (`problems: []`) | none | none | pass |
| 2 | 1440 / 2× / element | default | density ≥ 2× | `validation/round-2/assets/card-thumb.png` | file 600 × 400, density 2× | none | pass |
| 2 | 1440 / 2× / tiles | default | 1:1 sharpness | `validation/round-2/tiles/*.png` | gradient detail intact, no blur or artifacts | none | pass |
| 2 | 390 / 1× / hero section | default | contract: stacked, h1 32/40, image 220 high | `validation/round-2/sections/hero-390x900-default-light@1x.png` | matches contract | none | pass |

Severity scale: [Severity](../../../workflows/visual-validation.md#severity). There are no unfixed minors.

## Outcome

- Asset checks: round 2 `asset-density.json` verdict `pass`: hero `hero.png` 1200 × 730, SHA-256 `efecf060f9c2…`, paint 560 × 340.7 CSS (cover), DPR 2, density 2.14×; thumb `thumb-2x.png` 600 × 400, SHA-256 `1bc1a41122cc…`, paint 300 × 200, DPR 2, density 2×. `crop-tiles.mjs` tiles inspected 1:1.
- Diagnosed causes and fixes: overflow from `width: 560px` on the hero image (computed style); fixed with `width: 100%; max-width: 560px`. Density failure from the 1× thumbnail; replaced with the 2× original from the package.
- Behavior/accessibility checks and results: CTA is a native `button` (default focus behavior); keyboard and axe checks were not run in this demo (recorded as not applicable).
- Project commands and results: none (static page).
- Shared changes and affected-screen integration checks: none.
- Full-matrix final local verification round: round 2.
- Reused earlier evidence and why it remains valid: none.
- Harmless rendering differences and justification: none seen.
- Remaining differences, missing checks, or blockers: none.
- Next action and owner: none.
