---
name: design-extractor
description: Extract indexed Figma screens into local specifications, screenshots, assets, and Responsive Contracts. Use to prepare coding inputs or recover missing or stale screen details.
---

# Design extractor

**Input:** selected design-index entries, project profile, and code index.
**Output:** one local package per screen containing all responsive variants, marked ready or draft/stale with explicit blockers.

Follow the [Figma boundary](../../rules/figma.md) and [responsive rules](../../rules/responsive-design.md).

1. Verify that the index identifies a selected implementation set with resolved frame grouping. Return unresolved selection/grouping to [design-indexer](../design-indexer/SKILL.md) as a blocker for the affected screen. Verify source access and reference/asset export, then read all responsive variants and states of the selected set together, using the recorded representative nodes for equivalent copies. Do not mix alternative sets without a confirmed relationship recorded in the index. Save references at original dimensions with implementation set ID, source node, state, source revision (or `unavailable`), capture date, and bounds.
2. Extract exact visible text, layout constraints, fixed/fluid sizing, spacing, typography (font, size, weight, line height, letter spacing), colors, borders, and effects. Export assets and record font availability and existing code equivalents. Resolve material design/code token mismatches against project constraints or record them as blockers.
3. Fill [screen-spec](../../templates/screen-spec.md) and [responsive-contract](../../templates/responsive-contract.md), separating observed values from inferred behavior. Use product requirements and existing code for action/result assertions and applicable data, error, loading, empty, and permission states; identify fixtures versus real integrations. Mark irrelevant behavior as not applicable.
4. Check package completeness and mark readiness. Return screen/node mapping gaps to [design-indexer](../design-indexer/SKILL.md); resolve detailed design gaps here. Route unresolved product/API behavior to the coordinator or user, with the missing decision and affected action; Figma alone cannot establish it.

Ready means the package supports implementation without Figma access: usable local references/assets, a completed contract, specified acceptance assertions, and no blocking design or required-behavior gaps. Otherwise retain draft/stale status and record blockers with owners. On recovery requests, refresh only affected artifacts, recheck readiness, and return the updated package so implementation can resume with its remaining budget.
