# Responsive Contract

- Screen ID and specification path: `example` — [screen-spec.md](screen-spec.md)
- Status: ready ([status table](../../../rules/artifacts.md))
- Source revision (or `unavailable`), extraction date, and project breakpoint source: `unavailable` (demo, no Figma file); 2026-10-06; breakpoints defined by this contract (project has none)
- Supported viewport range: 320–1440 CSS px (wide-screen check at 1440; content is capped at 1200 and centered above that)

## Behavior by range

| Width range (CSS px) | Layout / columns | Container and fixed/fluid sizing | Order / visibility | Wrapping / overflow | Spacing / typography | Interaction / states |
| --- | --- | --- | --- | --- | --- | --- |
| 1024–1440 | Hero: text + 560 px image; cards: 3 columns | Content max 1200, side padding 24 | Nav visible | h1 wraps within its column | h1 48/56, gap 48 | CTA button focusable |
| 600–1023 | Hero stacked; cards: 2 columns | Image fluid, max 560 × 340 | Nav visible | none | h1 48/56, hero padding 40 | same |
| 320–599 | Hero stacked; cards: 1 column | Image fluid, 220 high | Nav hidden | long h1 words break (`overflow-wrap:anywhere`) | h1 32/40 | same |

Ranges cover 320–1440 without gaps; boundaries are 1024 and 600 (inclusive lower bound of the wider range).

## Transitions

| Breakpoint | What changes and why | Existing project value? | Observed evidence or explicit inference |
| --- | --- | --- | --- |
| 1024 | Hero stacks, cards 3 → 2 columns | no | Inferred: tablet reference is 768 wide |
| 600 | Nav hides, cards 2 → 1, h1 shrinks | no | Inferred: mobile reference is 390 wide |

## Validation matrix

Built using repository-root `.agents/rules/responsive-design.md`.

```json matrix
{
  "route": "/",
  "widths": [1440, 1200, 1025, 1024, 1023, 768, 601, 600, 599, 390, 375, 320],
  "height": 900,
  "states": [
    { "name": "default" },
    { "name": "long-title", "actions": [{ "evaluate": "document.querySelector('h1').textContent = 'Supercalifragilisticexpialidocious_unbroken_word_stress_test'" }] }
  ],
  "themes": ["light"],
  "dpr": [1],
  "sections": [
    { "name": "hero", "selector": "[data-section=hero]" },
    { "name": "cards", "selector": "[data-section=cards]" }
  ],
  "assetChecks": [
    { "role": "hero-image", "selector": "img.hero", "width": 1440, "dpr": 2 },
    { "role": "card-thumb", "selector": "img.thumb", "width": 1440, "dpr": 2 }
  ]
}
```

- Reference viewports and states: 1440 (desktop), 768 (tablet), 390 (mobile); default state.
- Supported range limits and wide-screen check: 320 and 1440.
- Intermediate widths and breakpoint boundary checks: 1200, 600, 375 from constraints defaults; b−1, b, b+1 for 1024 (1023/1024/1025) and 600 (599/600/601). 1440 doubles as the wide-screen check.
- Excluded sizes and reasons: none.
- Heights, scale factor, and capture bounds: height 900, DPR 1 for layout, full-page bounds recorded in `capture.json`.
- Target asset DPR: 2. Maximum CSS paint sizes: hero 560 × 340 (cover), card thumb 300 × 200 (cover). Required pixels: 1120 × 680 and 600 × 400.
- DPR 2 checks: one per production raster role (`hero-image`, `card-thumb`), at their largest paint size (1440).
- Resource-selection and density assertions: `asset-density.mjs` verdict `pass`; device-pixel tiles from `crop-tiles.mjs` inspected 1:1.
- Assertions without references: no horizontal overflow at any width; no overlap or clipping; CTA reachable by keyboard.
- Content stress cases and required interactions: `long-title` state; CTA focus.

## Decisions

- Missing variants and bounded assumptions: no design file; breakpoints inferred from the three reference widths.
- Blocking questions for the extractor: none.
- Readiness evidence: [screen-spec](screen-spec.md) assets table and density arithmetic.

Ready: behavior covers all ranges and blocking questions are resolved.
