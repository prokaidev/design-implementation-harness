# Figma-to-Code Harness

Follow the target project's architecture and conventions. Keep artifacts and reports concise.

## Skills

| Stage | Skill |
| --- | --- |
| Project profile and code index | [project-analyzer](.agents/skills/project-analyzer/SKILL.md) |
| Screens, variants, and Figma nodes | [design-indexer](.agents/skills/design-indexer/SKILL.md) |
| Screen packages and Responsive Contracts | [design-extractor](.agents/skills/design-extractor/SKILL.md) |
| Implementation and visual review | [screen-implementer](.agents/skills/screen-implementer/SKILL.md) |

## Boundaries

- Only the indexer and extractor access Figma. Coding workers return package gaps to the extractor; changed screen/node mappings go to the indexer.
- One task covers a screen's desktop, tablet, and mobile variants. A completed Responsive Contract is required before coding.
- Validate reference sizes plus **1200, 1024, 900, 600, 480 CSS px** and breakpoint boundaries. Use Playwright for captures and Chrome DevTools MCP / Codex browser for diagnosis.
- Visual review: **3 rounds by default, 4 maximum**, including the initial capture. See [validation](.agents/workflows/visual-validation.md).

## Parallel work

Dispatch independent screens after their packages are ready. Give each worker owned files, shared dependencies, and a review budget; never split by viewport.

Assign one owner to shared components, tokens, routes, and global styles. The coordinator merges index updates and rechecks affected screens after integration. Delegation does not reset review budgets.

## Artifacts

Inputs: `.agents/context/`. Formats: `.agents/templates/`. Generated output: `.agents/artifacts/`, configurable in [design context](.agents/context/design.md).

Record source nodes/revisions, code revision and working-tree state, extraction date, and unresolved gaps. Update affected artifacts when their sources change.
