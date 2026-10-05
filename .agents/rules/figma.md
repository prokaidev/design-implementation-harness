# Figma boundary

- The indexer owns screen IDs, variant groups, source nodes, and changed scope. The extractor owns detailed properties, references, assets, and package readiness.
- Coding workers never access Figma. Return missing or stale package details to the extractor; it routes mapping gaps to the indexer.
- Keep source nodes, dimensions, revision/date, and missing variants in local artifacts. Re-extract affected packages after source changes.
- In parallel work, return design-index updates to its coordinator rather than editing the shared index concurrently.
