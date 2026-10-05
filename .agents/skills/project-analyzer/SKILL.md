---
name: project-analyzer
description: Analyze a target codebase before implementing designs, or initialize a new application from supplied project context. Produce a project profile and code index.
---

# Project analyzer

**Input:** target repository and project context in `.agents/context/`, relative to the repository root.
**Output:** [project profile](../../templates/project-profile.md) and [code index](../../templates/code-index.md) with reuse candidates, conventions, and commands.

## New application

If initialization is requested, initialize using the supplied product requirements, stack, architecture, and constraints, then analyze the resulting codebase. Resolve missing stack decisions first; the harness provides no application starter. Existing applications go directly to analysis.

## Analysis

1. Record the stack, structure, styling/tokens, responsive conventions, and task-relevant commands from the codebase.
2. Index relevant routes, component APIs, assets, styles, and tests with exact paths and reuse notes. Include search scope, revision, and working-tree state.
3. Verify task-relevant commands and distinguish required checks from those not applicable. Before screen implementation, verify application startup and a Playwright capture on an available route; record missing setup as a blocker. Inventory the Figma integration here; the indexer/extractor verifies actual source access.
4. Update project context with findings and verification results. Resolve conflicts between context and current code.

Later stages use this index for discovery; refresh affected entries as code changes.
