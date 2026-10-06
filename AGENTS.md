# Figma-to-Code Harness

Follow the target project's architecture and conventions.

## Skills

| Stage | Skill |
| --- | --- |
| Project profile and code index | [project-analyzer](.agents/skills/project-analyzer/SKILL.md) |
| Screens, variants, and Figma nodes | [design-indexer](.agents/skills/design-indexer/SKILL.md) |
| Screen packages and Responsive Contracts | [design-extractor](.agents/skills/design-extractor/SKILL.md) |
| Implementation and visual review | [screen-implementer](.agents/skills/screen-implementer/SKILL.md) |

## Boundaries

One agent may perform all roles sequentially; delegated work has an explicitly assigned coordinator.

- Only the indexer and extractor access Figma; follow the [ownership and recovery rules](.agents/rules/figma.md).
- One task covers a screen's desktop, tablet, and mobile variants. A completed Responsive Contract is required before coding.
- Follow the [asset quality rules](.agents/rules/assets.md) (production assets, density, fonts) and the [Figma-to-code rules](.agents/rules/figma-to-code.md).
- Follow the [responsive validation matrix](.agents/rules/responsive-design.md) and the [visual validation workflow](.agents/workflows/visual-validation.md): it alone defines round budgets and ceilings, severity, and review statuses.
- Use the [tools](.agents/tools/README.md) for capture, asset density, tiles, and round manifests; attach their output to reviews.

## Parallel work

Dispatch independent screens after their packages are ready. Give each worker owned files, shared dependencies, and the local budget from the [workflow](.agents/workflows/visual-validation.md). A worker reaching its ceiling reports `incomplete` with the escalation record to the coordinator.

Assign one owner to shared components, tokens, routes, and global styles. Workers hand off as `local-pass` after local acceptance. The coordinator merges index updates and rechecks affected screens after integration under the workflow's integration budget. Only successful integration permits overall `pass` in parallel work.

## Artifacts

Inputs: `.agents/context/` (user-owned; skills do not write to it). Formats: `.agents/templates/`. Generated output: `.agents/artifacts/`; layout, version-control rules, and the status table are in the [artifacts rule](.agents/rules/artifacts.md).

Keep artifacts concise and update them when their sources change. Record provenance and unresolved gaps using the templates; visual validation defines per-round evidence requirements.
