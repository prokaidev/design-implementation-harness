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
3. Record missing variants, source revision (or `unavailable`), indexing date, and extraction status. Select requested screen IDs for the extractor.

Keep indexing structural; detailed layout properties, screenshots, and asset exports belong to [design-extractor](../design-extractor/SKILL.md). A mapped screen is indexed, not yet ready for coding.
