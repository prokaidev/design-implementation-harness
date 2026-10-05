# Responsive Contract

- Screen ID and specification path:
- Status: draft / ready / stale
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

Build the matrix using repository-root `.agents/rules/responsive-design.md`.

- Reference viewports and states:
- Supported range limits and wide-screen check if the upper range is unbounded:
- Intermediate widths and breakpoint boundary checks:
- Excluded sizes and reasons:
- Heights, scale factor, and capture bounds:
- Assertions without references: container behavior, order, visibility, wrapping, no unintended overflow/overlap/clipping, usable controls.
- Content stress cases and required interactions:

## Decisions

- Missing variants and bounded assumptions:
- Blocking questions for the extractor:
- Readiness evidence:

Ready: behavior covers all ranges and blocking questions are resolved.
