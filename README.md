# Figma-to-Code Harness

A reusable agent workflow for implementing and visually validating responsive web interfaces from Figma.

```text
Project analysis → Design indexing → Design extraction → Coding → Visual validation
```

The extractor prepares local screen packages for coding without further Figma access. The target project supplies functional requirements and data/API behavior.

Asset and font requirements: [asset quality rules](.agents/rules/assets.md). Figma extraction practice: [Figma-to-code rules](.agents/rules/figma-to-code.md).

## Use

1. Copy `.agents/` into the target repository and merge [AGENTS.md](AGENTS.md) with its existing instructions. Add `/.agents/artifacts/**/validation/` and `/.agents/tools/node_modules/` to the target's `.gitignore`.
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

## Tools

- **Figma MCP server** (indexer and extractor only): connect and authenticate; call order in [figma-to-code](.agents/rules/figma-to-code.md).
- **Browser for visual review** (the agent must see the page): Chrome DevTools MCP, Playwright MCP, or Claude's built-in browser / Claude in Chrome.
- **Playwright** (for the scripts): `npx playwright install chromium`.
- **[Harness scripts](.agents/tools)** (capture, asset density, tiles, round manifest): Node 20+, `cd .agents/tools && npm install`.
- **Target project toolchain and axe**: record commands in [commands](.agents/context/commands.md).

## Structure

```text
AGENTS.md                # Entry points and coordination
.agents/
├── context/             # Target project inputs
├── skills/              # Four skills with their stage procedures
├── rules/               # Figma access, Figma-to-code, assets, responsive, artifacts and statuses
├── workflows/           # Visual validation: budgets, severity, statuses
├── examples/            # Demo app and a filled example screen package
├── tools/               # Node scripts: capture, asset density, tiles, round manifest
└── templates/           # Formats for generated artifacts
```

Generated output goes to `.agents/artifacts/`; see the [artifact layout and statuses](.agents/rules/artifacts.md). `.agents/artifacts/**/validation/` is git-ignored (round captures); the other artifacts are committed. A filled example: [example screen](.agents/examples/screens/example/); a real trial with findings: [trial log](.agents/examples/trial-frozen-pets.md).

## Validation and parallel work

Each screen task covers desktop, tablet, and mobile using a [Responsive Contract](.agents/templates/responsive-contract.md) and [validation matrix](.agents/rules/responsive-design.md). [Visual validation](.agents/workflows/visual-validation.md) defines capture, comparison, and review budgets.

Round budgets, the ceiling, severity levels, and review statuses are defined only in the [workflow](.agents/workflows/visual-validation.md): a phase may extend automatically at most twice, then stops as `incomplete` with an escalation for the user. Parallel workers hand off as `local-pass`; the coordinator verifies integration before overall `pass`.

One agent can run the workflow sequentially or delegate independent screens under the [coordination rules](AGENTS.md). The target environment supplies Figma access, Playwright, and diagnostic tools.
