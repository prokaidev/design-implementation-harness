# Figma-to-Code Harness

A reusable agent workflow for implementing and visually validating responsive web interfaces from Figma.

```text
Project analysis → Design indexing → Design extraction → Coding → Visual validation
```

The indexer maps screens and variants. The extractor prepares local packages with visual specifications, references, assets, and Responsive Contracts. Coding workers use those packages without accessing Figma.

These are roles: one agent can run them sequentially, or a coordinator can delegate independent screens. The target project supplies application requirements, including data and API behavior where applicable.

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
Use project-analyzer to analyze the target codebase.
Use design-indexer to index <Figma source>.
Use design-extractor to extract <screen IDs> from the design index.
Use screen-implementer to implement .agents/artifacts/screens/<screen-id>/.
```

For a new application: `Use project-analyzer to initialize the application from .agents/context/ and then analyze it.`

Skills depend on other files under `.agents/`, so copy the entire directory. If discovery is unavailable, point the agent to the linked `SKILL.md`.

## Structure

```text
AGENTS.md                # Entry points and coordination
.agents/
├── context/             # Target project inputs
├── skills/              # Four skills with their stage procedures
├── rules/               # Figma access and responsive requirements
├── workflows/           # Shared visual validation procedure
└── templates/           # Formats for generated artifacts
```

Generated output goes to `.agents/artifacts/`; see [artifact layout](.agents/context/design.md).

Each skill contains its inputs, outputs, and stage procedure. Visual validation remains shared between screen implementation and the coordinator's integration review. Rules, templates, and project context stay separate for reuse.

## Validation and parallel work

One task includes desktop, tablet, and mobile. The [Responsive Contract](.agents/templates/responsive-contract.md) defines behavior between references. The [validation matrix](.agents/rules/responsive-design.md) includes reference sizes, supported range limits, intermediate widths, and each breakpoint at −1, exactly, and +1 CSS px.

Playwright captures the implementation; the agent compares it with local references. Chrome DevTools MCP or the Codex browser helps diagnose differences. The default budget is **3 rounds, including the initial capture**. A fourth is allowed for a diagnosed, localized issue. Parallel work reserves at least one of the three rounds for integration; see [visual validation](.agents/workflows/visual-validation.md).

Parallel workers own separate screens, with one owner for shared code. Figma, Playwright, and diagnostic tools are supplied by the target environment.
