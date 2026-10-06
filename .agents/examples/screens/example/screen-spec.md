# Screen specification

Example package (references are captures of the finished demo page, standing in for design screenshots) for the [demo app](../../demo-app/). It has no Figma source, so reference columns use `n/a` and the contract assertions stand in for design references. Template: [screen-spec](../../../templates/screen-spec.md).

- Screen ID, route, and purpose: `example`, `/`, landing hero with three cards
- Selected implementation set ID and design-index selection/decision reference: `example/v1`, selected: single set (demo)
- Source revision (or `unavailable`) and extraction date: `unavailable`, 2026-10-06
- Status: ready ([status table](../../../rules/artifacts.md))
- Project profile, code index, and Responsive Contract paths: `.agents/artifacts/project-profile.md`, `.agents/artifacts/code-index.md`, [responsive-contract.md](responsive-contract.md)

## References

| Variant / state | Source node | Width × height | Capture date / bounds | Local screenshot |
| --- | --- | --- | --- | --- |
| Desktop | n/a (demo) | 1440 × 900 | 2026-10-06 / full page | `references/desktop.png` |
| Tablet | n/a (demo) | 768 × 900 | 2026-10-06 / full page | `references/tablet.png` |
| Mobile | n/a (demo) | 390 × 900 | 2026-10-06 / full page | `references/mobile.png` |

## Visual specification

| Section / component | Layout and sizing | Spacing | Typography | Colors / borders / effects | Evidence |
| --- | --- | --- | --- | --- | --- |
| Hero (`[data-section=hero]`) | Grid `1fr 560px` ≥1024; one column below | gap 48, padding 64 (40 below 1024) | h1 48/56 (32/40 below 600), body 16/24 | image radius 16 | `references/desktop.png` |
| Cards (`[data-section=cards]`) | 3 / 2 / 1 columns | gap 24, bottom 64 | h2 20/28 | white, radius 12, padding 16; thumb radius 8 | `references/desktop.png` |
| CTA button | auto width | padding 8 × 16 | 16/24 | `--brand` fill, white text, radius 8 | `references/desktop.png` |

## Assets and content

- Assets/fonts: `../../demo-app/assets/hero.png` (original, 1200 × 730), `../../demo-app/assets/thumb-2x.png` (600 × 400); font: `system-ui` (no web font)
- Fonts (per [font rules](../../../rules/assets.md#fonts)): system-ui stack, available everywhere, no fallback needed
- Asset manifest: inline below; screenshots in `references/` are references, not production assets

| Production role / responsive source | Selected path / source node or original | Format / pixel dimensions or viewBox | Maximum CSS paint size / fit / crop | Target DPR / required pixels / effective density | Density result / artwork inspection evidence |
| --- | --- | --- | --- | --- | --- |
| hero-image | `../../demo-app/assets/hero.png` / original | PNG 1200 × 730 | 560 × 340, cover | 2 / 1120 × 680 / 2.14× | pass; detail, crop, no alpha checked |
| card-thumb | `../../demo-app/assets/thumb-2x.png` / original | PNG 600 × 400 | 300 × 200, cover | 2 / 600 × 400 / 2× | pass; `../../demo-app/assets/thumb-1x.png` (300 × 200) rejected: 1× only |

Apply repository-root `.agents/rules/assets.md`.

## Tokens and reuse

| Figma variable / style | Figma value | Project token | Project value | Match / mismatch decision |
| --- | --- | --- | --- | --- |
| n/a (demo) | | `--brand` | `#3b5bdb` | defined in the page |
| n/a (demo) | | `--gap` | `24px` | defined in the page |

| Figma component | Code Connect match (path / symbol) | Project component to reuse or "missing primitive" |
| --- | --- | --- |
| Card | none | missing primitive: `.card` in the page |
| Button | none | missing primitive: `button` |

- Material mismatches and decisions: none
- Exact visible text and content/fixture sources: static text in `index.html`
- Missing responsive variants or state references: none
- Observed facts vs inferred decisions: breakpoints 1024 and 600 are inferred (see contract)
- Blocking gaps, required decisions, and owners: none

## Behavior and acceptance

| User action / state | Expected result and assertion | Data source / read or write / fixture or real integration | Requirement or code evidence |
| --- | --- | --- | --- |
| Tab to CTA | Button receives a visible focus ring | none | keyboard requirement |
| Narrow viewport (320) | No horizontal overflow | none | contract assertion |

- Applicable loading, empty, error, validation, and permission states: none
- Required semantics, navigation, keyboard, and focus behavior: header nav is links; CTA is a `button`
- Not applicable behavior and bounded assumptions: CTA has no action in the demo

## Worker handoff

- Coordinator (or single agent), owned files, and shared dependencies/owners: single agent; `.agents/examples/demo-app/index.html`
- Validation route/setup and acceptance criteria: `python3 -m http.server 4173 --directory .agents/examples/demo-app`; [workflow acceptance](../../../workflows/visual-validation.md#acceptance)
- Local budget: base 6, ceiling 10
- Integration budget: not applicable
- Integration required / not applicable and reason: not applicable, single agent, no separate integration step
