---
name: harness-ingest
description: Index Figma screens and extract local screen packages with screenshots, assets, visual specifications, and Responsive Contracts for coding workers. Use for initial ingestion or missing/stale design context recovery.
---

# Design ingestion

Read project/design context, the project profile, and code index. Apply the [Figma boundary](../../rules/figma.md) and [responsive rules](../../rules/responsive-design.md). Use the available Figma integration and its required tool instructions.

1. Follow [index-design](../../workflows/index-design.md) for new or changed scope.
2. Follow [extract-design](../../workflows/extract-design.md) for requested screens, including all responsive variants and states in one package.
3. Resolve worker requests by refreshing only affected artifacts and updating package readiness.

Write to the configured artifact root. Hand off package paths and remaining assumptions. Only mark ready when a worker can proceed without Figma; this skill prepares design inputs, not application code.
