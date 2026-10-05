# Figma boundary

- The indexer owns screen IDs, variant groups, source nodes, and changed scope. The extractor owns detailed properties, references, assets, and package readiness.
- Coding workers never access Figma. Return missing or stale package details to the extractor; it routes mapping gaps to the indexer.
- Keep source nodes, dimensions, source revision (or `unavailable`), capture/extraction dates, and missing variants in local artifacts. Dates do not substitute for revisions. Re-extract affected packages after source changes, then recheck readiness before resuming implementation.
- In parallel work, return design-index updates to its coordinator rather than editing the shared index concurrently.
