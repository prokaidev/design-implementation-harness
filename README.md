# Figma-to-Code Harness

A reusable agent workflow for implementing and visually validating responsive web interfaces from Figma.

```text
Project analysis → Design indexing → Design extraction → Coding → Visual validation
```

The extractor prepares local screen packages for coding without further Figma access. The target project supplies functional requirements and data/API behavior.

[Asset quality rules](.agents/rules/assets.md) require justified production-source selection and resolution sufficient for CSS paint size × target DPR (at least 2). Implementation acceptance additionally verifies the actual browser resource and sharpness in device-pixel captures at DPR 2; DPR 1 layout checks alone are insufficient.

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

If skill discovery is unavailable, point the agent to the linked `SKILL.md`.

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

## Validation and parallel work

Each screen task covers desktop, tablet, and mobile using a [Responsive Contract](.agents/templates/responsive-contract.md) and [validation matrix](.agents/rules/responsive-design.md). [Visual validation](.agents/workflows/visual-validation.md) defines capture, comparison, and review budgets.

The default planning budgets are 6 local rounds and 2 separate integration rounds per affected screen when integration is required. Finish early when acceptance passes; extend a phase by 2 rounds for diagnosed, actionable remaining issues. Two rounds without meaningful progress require a change in diagnosis. Budget exhaustion alone does not end the task. Parallel workers hand off as `local-pass`; the coordinator verifies integration before overall `pass`.

One agent can run the workflow sequentially or delegate independent screens under the [coordination rules](AGENTS.md). The target environment supplies Figma access, Playwright, and diagnostic tools.
