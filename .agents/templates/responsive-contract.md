# Responsive Contract

Filled example: [example contract](../examples/screens/example/responsive-contract.md).

- Screen ID and specification path:
- Status: see [status table](../rules/artifacts.md)
- Source revision (or `unavailable`), extraction date, and project breakpoint source:
- Supported viewport range:

## Behavior by range

| Width range (CSS px) | Layout / columns | Container and fixed/fluid sizing | Order / visibility | Wrapping / overflow | Spacing / typography | Interaction / states |
| --- | --- | --- | --- | --- | --- | --- |
| | | | | | | |

Ranges must cover the supported widths without gaps or ambiguous boundaries. Describe behavior between references, not just at frame widths.

## Transitions

| Breakpoint | What changes and why | Existing project value? | Observed evidence or explicit inference |
| --- | --- | --- | --- |
| | | | |

## Validation matrix

Build the matrix using repository-root `.agents/rules/responsive-design.md`. The JSON block is read by `capture.mjs`; keep it equal to the text below.

```json matrix
{
  "route": "/",
  "widths": [],
  "height": 900,
  "states": [{ "name": "default" }],
  "themes": ["light"],
  "dpr": [1],
  "sections": [{ "name": "hero", "selector": "[data-section=hero]" }],
  "assetChecks": [{ "role": "hero-image", "selector": "img.hero", "width": 1440, "dpr": 2 }]
}
```

`states` may carry `actions` (`click`/`fill`/`press` with a selector) to reach a state; `themes` set `prefers-color-scheme`. Layout widths use DPR 1; `assetChecks` run once per role at the target DPR.

- Reference viewports and states:
- Supported range limits and wide-screen check if the upper range is unbounded:
- Intermediate widths and breakpoint boundary checks:
- Excluded sizes and reasons:
- Heights, scale factor, and capture bounds:
- Target asset DPR (at least 2), maximum CSS paint sizes by source/range, and fit/crop behavior:
- DPR 2 (or higher required DPR) viewports/states covering each production raster role and distinct responsive composition/source; vector rendering checks or justified raster not-applicable evidence:
- Resource-selection and density assertions; device-pixel captures and sharpness checks:
- Assertions without references: container behavior, order, visibility, wrapping, no unintended overflow/overlap/clipping, usable controls.
- Content stress cases and required interactions:

## Decisions

- Missing variants and bounded assumptions:
- Blocking questions for the extractor:
- Readiness evidence:

Ready: behavior covers all ranges and blocking questions are resolved.
