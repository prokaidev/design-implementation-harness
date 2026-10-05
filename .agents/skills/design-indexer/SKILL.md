---
name: design-indexer
description: Map a Figma file into a local index of screens, responsive variants, states, and source nodes. Use for initial discovery or changed design scope.
---

# Design indexer

**Input:** Figma scope, project profile, and code index.
**Output:** [design index](../../templates/design-index.md) with screen IDs, variant groups, node references, and extraction targets.

Follow the [Figma boundary](../../rules/figma.md).

1. Verify read access to the requested Figma scope, then inspect relevant pages and top-level frames. Record access failures as blockers. Group desktop/tablet/mobile variants and states under stable screen IDs.
2. Record node links, dimensions, shared component references, navigation relationships, and known route/code mappings.
3. Resolve duplicates and alternative implementations using the rules below. Record missing variants, source revision (or `unavailable`), indexing date, and extraction status. Select requested screen IDs and implementation sets for the extractor.

Keep indexing structural; detailed layout properties, screenshots, and asset exports belong to [design-extractor](../design-extractor/SKILL.md). A mapped screen is indexed, not yet ready for coding.

## Duplicates and alternative implementations

- Classify similar frames as responsive variants, states, equivalent copies, or alternative implementations. Use structure and visual context; names alone do not establish equivalence. Record uncertain classifications with candidate nodes, reasons, and the missing decision.
- Group equivalent copies in one entry, retain all source node links, and identify the representative node for extraction. Treat materially different layouts, content, or interactions as candidates requiring classification rather than silently deduplicating them.
- Keep alternative implementations as separate implementation sets under the same stable screen ID, for example `catalog` with sets `v1` and `v2`. Use separate screen IDs only when the product screen or purpose differs. Set IDs identify alternatives; they do not establish chronology or priority.
- Keep each set's responsive variants and states together. Do not combine desktop from one set with mobile from another without a confirmed relationship and recorded evidence.
- Select the primary set from explicit task scope or a confirmed decision, recording its source. Frame names, canvas position, node IDs, and visual similarity alone do not prove which alternative is current. If there is only one unambiguous set, record that basis for selection.
- If the primary set or frame grouping remains unresolved, finish indexing with all candidates and record a blocker owned by the indexer, with the coordinator/user decision needed. Block extraction only for the affected screen; other selected screens may proceed. When selection changes, update mappings and mark affected existing packages stale for re-extraction.
