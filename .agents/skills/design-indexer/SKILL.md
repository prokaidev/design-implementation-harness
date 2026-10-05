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
3. Resolve duplicates and select implementation sets using the rules below. Record missing variants, provenance, and extraction status in the design index.

Detailed layout properties, screenshots, and asset exports belong to [design-extractor](../design-extractor/SKILL.md). Indexing alone does not make a screen ready for coding.

## Duplicates and alternative implementations

- Classify similar frames as responsive variants, states, equivalent copies, or alternative implementations using structure and visual context. Names alone do not establish equivalence; material layout, content, or interaction differences require classification.
- Group equivalent copies in one entry, retaining all node links and one representative for extraction.
- Keep alternatives under one stable screen ID with distinct implementation set IDs, for example `catalog/v1` and `catalog/v2`. Separate screen IDs only when the product screen or purpose differs. Set IDs imply no chronology or priority.
- Keep each set's responsive variants and states together. Do not combine desktop from one set with mobile from another without a confirmed relationship and recorded evidence.
- Select the primary set from explicit scope, a confirmed decision, or a single unambiguous set; record that basis. Names, canvas position, node IDs, and similarity do not prove which alternative is current.
- For unresolved selection/grouping, retain candidates and reasons, and record an indexer-owned blocker with the coordinator/user decision needed. Block only the affected screen. When selection changes, update mappings and mark affected packages stale.
