---
name: screen-implementer
description: Implement and visually validate a responsive screen from a local design package, covering desktop, tablet, and mobile as one task.
---

# Screen implementer

**Input:** project profile, code index, ready screen package, owned files, and separate local/integration review budgets and round history.
**Output:** responsive implementation, changed files, code-index updates, and a visual review with evidence and consumed rounds.

Follow [responsive rules](../../rules/responsive-design.md) and [asset quality rules](../../rules/assets.md). Coding workers have no Figma access.

1. Check package readiness, provenance against the assigned design revision and current code, and verified startup/capture commands. Return design gaps to [design-extractor](../design-extractor/SKILL.md) and product/API questions to the coordinator or user. Recheck readiness after recovery; preserve round history and phase budgets.
2. Use indexed components/tokens and implement all responsive variants and specified behavior. Use the selected production assets, verify actual browser resource selection and density at DPR 2 (or higher required DPR), and inspect device-pixel captures for sharpness. Recheck density if implemented paint sizes exceed the package bounds. Return source/export failures to the extractor; fix code resource-selection failures locally. Follow the package's fixture/integration scope. Route shared edits through their owner; record any required global token changes.
3. Run required project checks, action/result assertions, and [visual validation](../../workflows/visual-validation.md). Use 6 local rounds by default, assess progress after round 4, and extend by 2 rounds for diagnosed, actionable remaining issues. Change the diagnostic approach after two rounds without meaningful progress. Finish local acceptance instead of stopping at budget exhaustion; integration has its own 2-round default budget.
4. Return changed files, code-index updates, and the review with a status from the validation workflow. Parallel workers hand off as `local-pass` only after local acceptance, pending the coordinator's integration check. Single-agent work without a separate integration step can finish as `pass` after local acceptance. Record concrete blockers or interrupted work using the workflow's other statuses.
