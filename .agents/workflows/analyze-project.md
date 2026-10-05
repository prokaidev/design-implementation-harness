# Analyze project

**Input:** target repository and project context.
**Output:** [project profile](../templates/project-profile.md) and [code index](../templates/code-index.md).

1. Record the stack, structure, styling/tokens, responsive conventions, and task-relevant commands from the codebase.
2. Index relevant routes, component APIs, assets, styles, and tests with exact paths and reuse notes. Include search scope, revision, and working-tree state.
3. Verify task-relevant commands and distinguish required checks from those not applicable. Before screen implementation, verify application startup and a Playwright capture on an available route; record missing setup as a blocker. Inventory the Figma integration here; the indexer/extractor verifies actual source access.
4. Update project context with findings and verification results. Resolve conflicts between context and current code.

Later stages use this index for discovery; refresh affected entries as code changes.
