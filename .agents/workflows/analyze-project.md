# Analyze project

**Input:** target repository and project context.
**Output:** `project-profile.md` and `code-index.md` under the configured artifact root.

1. Read applicable repository instructions and context; inspect manifests, lockfiles, configuration, source structure, and routes.
2. Identify runtime, framework, styling, state/data handling, assets, tests, and available commands.
3. Inspect representative UI, domain components, tokens, breakpoints, and responsive patterns.
4. Index relevant routes, components, exports/APIs, tokens, styles, and tests with paths, purpose, and reuse notes. Record search scope and gaps.
5. Fill the [project profile](../templates/project-profile.md) and [code index](../templates/code-index.md). Separate discovered facts from assumptions; record revision and working-tree state.
6. Verify commands needed for the task where practical; label commands not run. Update project context with confirmed facts.

**Ready:** a worker can locate the relevant implementation and reusable pieces without repeating repository-wide discovery. No application architecture changes are required by this workflow.
