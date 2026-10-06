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
- Follow [asset quality rules](.agents/rules/assets.md): distinguish references from production assets, verify source resolution against CSS paint size × target DPR (at least 2), and require browser density/sharpness evidence before acceptance.
- Follow the [responsive validation matrix](.agents/rules/responsive-design.md) and [visual validation workflow](.agents/workflows/visual-validation.md), including its separate phase budgets, progress checks, and extension rules.

## Parallel work

Dispatch independent screens after their packages are ready. Give each worker owned files, shared dependencies, and a local planning budget of 6 rounds by default. Budget exhaustion alone must not stop implementation; follow the workflow's diagnosis and 2-round extension rules.

Assign one owner to shared components, tokens, routes, and global styles. Workers hand off as `local-pass` after local acceptance. The coordinator merges index updates and rechecks affected screens after integration, using a separate planning budget of 2 rounds per screen with the same extension rules. Only successful integration permits overall `pass` in parallel work.

## Artifacts

Inputs: `.agents/context/`. Formats: `.agents/templates/`. Generated output: `.agents/artifacts/`, configurable in [design context](.agents/context/design.md).

Keep artifacts concise and update them when their sources change. Record provenance and unresolved gaps using the templates; visual validation defines per-round evidence requirements.
