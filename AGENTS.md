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

Indexer, extractor, implementer, and coordinator are roles. One agent may perform them sequentially; delegated work has an explicitly assigned coordinator. After package recovery, recheck readiness and resume implementation with the remaining budget.

- Only the indexer and extractor access Figma. Coding workers return package gaps to the extractor; changed screen/node mappings go to the indexer.
- One task covers a screen's desktop, tablet, and mobile variants. A completed Responsive Contract is required before coding.
- Follow the [responsive validation matrix](.agents/rules/responsive-design.md), including supported range limits and exact breakpoints. Use Playwright for captures and Chrome DevTools MCP / Codex browser for diagnosis, with Playwright inspection as fallback.
- Visual review: **3 rounds by default, 4 maximum**, including the initial capture. See [validation](.agents/workflows/visual-validation.md).

## Parallel work

Dispatch independent screens after their packages are ready. Give each worker owned files, shared dependencies, and a review budget; never split by viewport.

Assign one owner to shared components, tokens, routes, and global styles. The coordinator merges index updates and rechecks affected screens after integration. Reserve at least one of the three default rounds for this check; workers use at most two local rounds and hand off as incomplete pending integration. Delegation does not reset review budgets.

## Artifacts

Inputs: `.agents/context/`. Formats: `.agents/templates/`. Generated output: `.agents/artifacts/`, configurable in [design context](.agents/context/design.md).

Record source nodes, source revision (or `unavailable`), capture/extraction dates, code revision and working-tree state, and unresolved gaps. A date is not a revision. Record code and package provenance per visual round. Update affected artifacts when their sources change.
