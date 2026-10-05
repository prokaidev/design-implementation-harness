---
name: harness-project
description: Analyze a target codebase for the Figma-to-Code Harness and produce a project profile and code index, or initialize a new project from supplied requirements before analysis.
---

# Project context

Read the target repository's instructions and configured `.agents/context/` files. Apply [project adaptation](../../rules/project-adaptation.md) and [component reuse](../../rules/component-reuse.md).

- Existing application: follow [analyze-project](../../workflows/analyze-project.md).
- No application yet and initialization is requested: follow [initialize-project](../../workflows/initialize-project.md), then analyze the result.

Write the profile and code index to the configured artifact root, with source paths, revision, gaps, and verified commands. These become shared inputs for ingestion and coding; inspect current code again only where needed.
