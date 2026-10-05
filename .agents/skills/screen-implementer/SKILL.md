---
name: screen-implementer
description: Implement and visually validate a responsive screen from a local design package, covering desktop, tablet, and mobile as one task.
---

# Screen implementer

**Input:** project profile, code index, ready screen package, owned files, and remaining review budget including any integration reservation.
**Output:** responsive implementation, changed files, code-index updates, and a visual review with evidence and consumed rounds.

Follow [responsive rules](../../rules/responsive-design.md). Coding workers have no Figma access.

1. Check local provenance against the assigned design revision and current code, package readiness, and verified startup/capture commands. Return design gaps to [design-extractor](../design-extractor/SKILL.md) and product/API questions to the coordinator or user. After recovery, recheck readiness and resume with the remaining budget.
2. Use indexed components/tokens and implement all responsive variants and specified behavior. Follow the package's fixture/integration scope. Route shared edits through their owner; record any required global token changes.
3. Run required project checks, action/result assertions, and [visual validation](../../workflows/visual-validation.md), respecting the integration reservation.
4. Return changed files, code-index updates, and the review. In parallel work, the coordinator merges index updates and verifies shared changes across affected screens.

Completion requires passing checks and visual evidence for integrated code. Parallel workers hand off as incomplete pending the coordinator's integration check. Missing evidence or unresolved meaningful differences leave the screen incomplete; unavailable required tools/setup are blocked as defined in visual validation.
