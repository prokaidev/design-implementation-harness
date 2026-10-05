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
- Follow the [responsive validation matrix](.agents/rules/responsive-design.md) and [visual validation workflow](.agents/workflows/visual-validation.md), including its review budget and integration reservation.

## Parallel work

Dispatch independent screens after their packages are ready. Give each worker owned files, shared dependencies, and a review budget.

Assign one owner to shared components, tokens, routes, and global styles. The coordinator merges index updates and rechecks affected screens after integration.

## Artifacts

Inputs: `.agents/context/`. Formats: `.agents/templates/`. Generated output: `.agents/artifacts/`, configurable in [design context](.agents/context/design.md).

Keep artifacts concise and update them when their sources change. Record provenance and unresolved gaps using the templates; visual validation defines per-round evidence requirements.
