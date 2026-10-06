---
name: screen-implementer
description: Implement and visually validate a responsive screen from a local design package, covering desktop, tablet, and mobile as one task. Use when a screen package is ready and the screen must be coded and checked against the design.
---

# Screen implementer

**Input:** project profile, code index, ready screen package, owned files, and separate local/integration review budgets and round history.
**Output:** responsive implementation, changed files, code-index updates, and a visual review with evidence and consumed rounds.

Follow [responsive rules](../../rules/responsive-design.md), [asset quality rules](../../rules/assets.md), and [figma-to-code rules](../../rules/figma-to-code.md) (for translating spec values; no Figma access). Coding workers have no Figma access.

## Steps

1. Check package readiness, provenance against the assigned design revision and current code, and verified startup/capture commands.
2. Return design gaps to [design-extractor](../design-extractor/SKILL.md) and product/API questions to the coordinator or user. Recheck readiness after recovery; preserve round history and budgets.
3. Implement all responsive variants and specified behavior with the indexed components and tokens, including Code Connect matches from the spec. Never paste reference code from the spec as is.
4. Use the selected production assets. Run `asset-density.mjs` and `crop-tiles.mjs` at DPR 2 (or higher required) and inspect device-pixel crops. Recheck if paint sizes exceed the package bounds.
5. Return source/export failures to the extractor; fix code resource-selection failures locally. Follow the package's fixture/integration scope.
6. Route shared edits through their owner; record required global token changes.
7. Run required project checks, action/result assertions, and [visual validation](../../workflows/visual-validation.md).
8. Follow the workflow's budgets, severity scale, stall rule, and ceiling. At the ceiling stop with `incomplete` and the escalation record; do not continue without user approval.
9. Return changed files, code-index updates, and the review with a status from the workflow. Parallel workers hand off as `local-pass` after local acceptance; single-agent work without a separate integration step can finish as `pass`. Record concrete blockers or interrupted work with the workflow's other statuses.
