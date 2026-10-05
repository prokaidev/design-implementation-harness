---
name: design-extractor
description: Extract indexed Figma screens into local specifications, screenshots, assets, and Responsive Contracts. Use to prepare coding inputs or recover missing or stale screen details.
---

# Design extractor

**Input:** selected design-index entries, project profile, and code index.
**Output:** one local package per screen containing all responsive variants, marked ready or draft/stale with explicit blockers.

Follow the [Figma boundary](../../rules/figma.md) and [responsive rules](../../rules/responsive-design.md).

1. Require a selected implementation set with resolved frame grouping; return selection/mapping blockers to [design-indexer](../design-indexer/SKILL.md). Verify source access and export, then read the selected set's responsive variants and states together, using representative nodes for equivalent copies. Do not mix sets without a confirmed relationship in the index. Save references at original dimensions with the provenance fields in the screen-spec template.
2. Extract exact visible text, layout constraints, fixed/fluid sizing, spacing, typography (font, size, weight, line height, letter spacing), colors, borders, and effects. Export assets and record font availability and existing code equivalents. Resolve material design/code token mismatches against project constraints or record them as blockers.
3. Fill [screen-spec](../../templates/screen-spec.md) and [responsive-contract](../../templates/responsive-contract.md), separating observed values from inferred behavior. Use product requirements and existing code for action/result assertions and applicable data, error, loading, empty, and permission states; identify fixtures versus real integrations. Mark irrelevant behavior as not applicable.
4. Resolve detailed design gaps here. Route product/API questions to the coordinator or user with the missing decision and affected action. Mark package readiness using the criteria below.

## Readiness and recovery

Ready requires usable local references/assets, a completed contract, acceptance assertions, and no blocking design or required-behavior gaps. Otherwise mark draft/stale with blockers and owners. On recovery, refresh affected artifacts, recheck readiness, and return the package for implementation with its remaining budget.
