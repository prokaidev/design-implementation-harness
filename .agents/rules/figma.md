# Figma ingestion boundary

- Only ingestion reads Figma. It owns indexing, extraction, and missing-context recovery.
- Group responsive variants and states under one stable screen ID; record absent variants explicitly.
- Extract layout constraints, spacing, typography, colors, assets, component states, and responsive evidence.
- Save local screenshots and assets with source nodes, dimensions, and extraction date/version when available.
- Distinguish observed values from inferred behavior. Frame widths alone do not establish CSS breakpoints.
- Coding workers never call Figma, including for missing images or metadata. Send ingestion the screen ID, missing detail, and affected decision; continue only independent work.
- Refresh affected packages when sources change. Do not silently mix references from different revisions.
