---
name: design-extractor
description: Extract indexed Figma screens into local specifications, screenshots, assets, and Responsive Contracts. Use to prepare coding inputs or recover missing or stale screen details.
---

# Design extractor

**Input:** selected design-index entries, project profile, and code index.
**Output:** one local package per screen containing all responsive variants, with a status from the [status table](../../rules/artifacts.md).

Follow the [Figma boundary](../../rules/figma.md), [figma-to-code rules](../../rules/figma-to-code.md), [responsive rules](../../rules/responsive-design.md), and [asset quality rules](../../rules/assets.md).

## Steps

1. Require a selected implementation set with resolved frame grouping; return selection/mapping blockers to [design-indexer](../design-indexer/SKILL.md).
2. Verify source access and export. Read the set's responsive variants and states together, using representative nodes for equivalent copies. Do not mix sets without a confirmed relationship in the index.
3. Save references at original dimensions with the provenance fields in the screen-spec template.
4. Extract per [figma-to-code](../../rules/figma-to-code.md): exact visible text, layout constraints, fixed/fluid sizing, spacing, typography, colors, borders, effects.
5. Map Figma variables to project tokens and record Code Connect matches in the spec; resolve material mismatches against project constraints or record them as blockers.
6. Inventory originals and exports before choosing production assets; keep their roles separate from references. Save MCP asset URLs locally at once.
7. Per raster source, compute required pixels from the maximum CSS paint size × target DPR (at least 2) per the [density gate](../../rules/assets.md) and compare with the file's pixel size. Inspect detail, crop, alpha, and effects; obtain suitable sources for failures.
8. Check fonts under the [font rules](../../rules/assets.md#fonts).
9. Fill [screen-spec](../../templates/screen-spec.md) and [responsive-contract](../../templates/responsive-contract.md), including the `json matrix` block. Separate observed values from inferred behavior.
10. Use product requirements and existing code for action/result assertions and applicable data, error, loading, empty, and permission states; identify fixtures versus real integrations. Mark irrelevant behavior as not applicable.
11. Resolve detailed design gaps here. Route product/API questions to the coordinator or user with the missing decision and affected action.

## Readiness and recovery

`ready` requires all of:

1. Usable local references and assets.
2. Production-asset selection and density evidence that passes the asset rules.
3. Fonts available, or a fallback accepted in advance.
4. A completed contract with a matrix, DPR checks, and acceptance assertions.
5. A token mapping table and Code Connect column filled.
6. No blocking design or required-behavior gaps.

Otherwise set `draft` or `stale` with blockers and owners, or `ready-with-assumptions` when the next section applies. On recovery, refresh affected artifacts, recheck readiness, and return the package for implementation, preserving round history and phase budgets. Browser sharpness acceptance belongs to the implementer.

## Ready with assumptions

Use `ready-with-assumptions` instead of `draft` only when every condition holds:

1. The gap is bounded: one variant region, one state, or one value. Other variants and all required behavior are complete.
2. Each assumption is recorded in the spec's **Assumptions** table with its basis (observed evidence it was derived from), what it affects, the risk if wrong, and how it will be verified.
3. The extractor has asked the user or the design owner for the missing source (node link or decision) and recorded the request.
4. The assumption is not a product or API decision, a missing asset, an unavailable font, or an unresolved selection between alternative designs. Those stay `draft` or `blocked`.

When the source arrives, replace each assumption with observed values, update the contract, and set `ready`. Assumptions confirmed unchanged are closed in the table, not deleted.
