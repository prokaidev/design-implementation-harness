# Figma-to-Code Harness

Adapt to the target project's architecture, stack, styling, and conventions. Keep instructions and reports concise.

## Entry points

Use skills instead of repeating long prompts. Read only the references needed for the current stage.

| Task | Skill |
| --- | --- |
| Inspect or initialize a project | [harness-project](.agents/skills/harness-project/SKILL.md) |
| Index Figma and extract local screen packages | [harness-ingest](.agents/skills/harness-ingest/SKILL.md) |
| Implement and validate a responsive screen | [harness-screen](.agents/skills/harness-screen/SKILL.md) |

## Required sequence

Project profile + code index → design index → screen specification + Responsive Contract → implementation → visual review.

- Inspect the codebase first; reuse components, tokens, and project commands.
- Use Figma for visual decisions and the codebase for implementation architecture.
- Ingestion owns Figma access. Coding workers use local artifacts only; return missing or stale design context to ingestion.
- Assign desktop, tablet, and mobile variants of one screen as **one task**.
- Complete the Responsive Contract before coding. Validate reference sizes and intermediate widths: **1200, 1024, 900, 600, 480 CSS px**.
- Use Playwright for captures and browser checks; the agent compares captures with references. Use Chrome DevTools MCP or the Codex browser to diagnose layout failures when available.
- Allow three visual review rounds by default, at most four. Follow [visual validation](.agents/workflows/visual-validation.md); report unresolved differences honestly.
- Preserve semantics, accessibility, responsive behavior, and maintainability. Record consequential assumptions.

## Parallel work

- Run parallel workers for independent screens after project analysis and ingestion are ready. Never split workers by viewport.
- Give each worker a screen package, route, owned files, shared dependencies, and validation budget.
- Assign one owner to shared components, tokens, routing, and global styles before dispatch. Other workers request changes from that owner.
- The coordinator owns shared indexes; workers return updates for integration instead of concurrently editing the same index.
- The coordinator integrates changes and rechecks affected screens. Record integration checks and remaining validation budget; do not restart the loop under a new worker.

## Local artifacts

Keep project inputs in `.agents/context/`. Write generated artifacts to `.agents/artifacts/` by default, or the location recorded in [design context](.agents/context/design.md). Copy formats from `.agents/templates/`; do not fill the templates themselves.

Artifacts describe the target application, not this harness repository. Record source references, code revision/working-tree state, extraction date, and unresolved gaps so later agents can detect stale context.
