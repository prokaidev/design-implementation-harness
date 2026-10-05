---
name: design-extractor
description: Extract indexed Figma screens into local specifications, screenshots, assets, and Responsive Contracts. Use to prepare coding inputs or recover missing or stale screen details.
---

# Design extractor

Follow [extract-design](../../workflows/extract-design.md), the [Figma boundary](../../rules/figma.md), and [responsive rules](../../rules/responsive-design.md).

Input: selected design-index entries, project profile, and code index. Output: one package per screen containing all responsive variants, marked ready or draft/stale with explicit blockers. Route missing screen/node mappings to [design-indexer](../design-indexer/SKILL.md); handle missing properties or assets here. Route unresolved product/API behavior to the coordinator or user.
