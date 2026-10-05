# Figma-to-Code Harness

A reusable workflow for AI agents implementing Figma designs within a project's architecture and conventions.

```text
Project analysis → Design indexing → Design extraction → Coding → Visual validation
```

The indexer maps screens and variants. The extractor prepares local packages with visual specifications, references, assets, and Responsive Contracts. Coding workers use those packages without accessing Figma.

## Use

1. Copy `.agents/` into the target repository and merge [AGENTS.md](AGENTS.md) with its existing instructions.
2. Fill `.agents/context/` with known project inputs; analysis supplies codebase facts.
3. Run the skills in order, selecting the screens to extract and implement.

| Skill | Output |
| --- | --- |
| [project-analyzer](.agents/skills/project-analyzer/SKILL.md) | Project profile and code index |
| [design-indexer](.agents/skills/design-indexer/SKILL.md) | Screens, responsive variants, states, and source nodes |
| [design-extractor](.agents/skills/design-extractor/SKILL.md) | Screen packages and Responsive Contracts |
| [screen-implementer](.agents/skills/screen-implementer/SKILL.md) | Responsive implementation and visual review |

```text
Use project-analyzer to analyze this repository.
Use design-indexer to index <Figma source>.
Use design-extractor to extract <screen IDs> from the design index.
Use screen-implementer to implement .agents/artifacts/screens/<screen-id>/.
```

Skills reference sibling files, so copy the whole `.agents/` directory. If discovery is unavailable, point the agent to the linked `SKILL.md`.

## Structure

```text
AGENTS.md                # Entry points and coordination
.agents/
├── context/             # Target project inputs
├── skills/              # Four task entry points
├── rules/               # Figma access and responsive requirements
├── workflows/           # Stage-specific procedures
└── templates/           # Formats for generated artifacts
```

Generated output goes to `.agents/artifacts/`; see [artifact layout](.agents/context/design.md).

## Validation and parallel work

One task includes desktop, tablet, and mobile. The [Responsive Contract](.agents/templates/responsive-contract.md) defines behavior between references. Check reference sizes, **1200, 1024, 900, 600, 480 CSS px**, and breakpoint boundaries.

Playwright captures the implementation; the agent compares it with local references. Chrome DevTools MCP or the Codex browser helps diagnose differences. Review is limited to **3 rounds, at most 4**; unresolved differences remain in the report.

Parallel workers own separate screens, with one owner for shared code. Figma, Playwright, and diagnostic tools are supplied by the target environment.
