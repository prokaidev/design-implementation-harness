# Figma-to-Code Harness

A reusable workflow for AI agents implementing Figma designs in new or existing projects. It adapts to the project's architecture, stack, and conventions.

```text
Project analysis → Figma ingestion → Responsive Contract → Coding → Visual validation
```

Ingestion produces local screen packages. Coding workers use those packages without accessing Figma. Each screen task includes desktop, tablet, and mobile together.

## Use

1. Copy `.agents/` into the target repository. Merge this harness's [AGENTS.md](AGENTS.md) instructions into existing agent instructions without overwriting project rules.
2. Fill `.agents/context/` with known project inputs; let project analysis record discovered facts. Keep unknowns explicit.
3. Use the skills below in order. Provide the design scope for ingestion and a screen package path for implementation.

| Skill | Outcome |
| --- | --- |
| [harness-project](.agents/skills/harness-project/SKILL.md) | Project profile, code index, and verified commands |
| [harness-ingest](.agents/skills/harness-ingest/SKILL.md) | Design index, local references/assets, screen specs, and Responsive Contracts |
| [harness-screen](.agents/skills/harness-screen/SKILL.md) | Responsive implementation and visual review |

Example task prompts:

```text
Use harness-project to analyze this repository.
Use harness-ingest to prepare <screens> from <Figma source>.
Use harness-screen to implement .agents/artifacts/screens/<screen-id>/.
```

If skills are not discovered by the agent, point it to the linked `SKILL.md`. These skills reference sibling harness files, so copy the whole `.agents/` directory.

## Structure

```text
AGENTS.md                # Entry points, shared requirements, and coordination
.agents/
├── context/             # Project inputs: product, architecture, stack, design, constraints, commands
├── skills/              # Three short task entry points
├── rules/               # Adaptation, reuse, Figma, responsive design, code and visual quality
├── workflows/           # Initialize, analyze, index, extract, implement, validate
└── templates/           # Project profile, code/design indexes, screen spec, contract, visual review
```

Generated artifacts go to `.agents/artifacts/` by default. Their layout and configurable location are in [design context](.agents/context/design.md). Context files are forms for the target project; templates are formats for generated results.

## Working rules

- Inspect and index the codebase; reuse existing components and tokens.
- Extract layout, spacing, typography, assets, component states, and responsive evidence before coding.
- Complete a [Responsive Contract](.agents/templates/responsive-contract.md) covering behavior between reference sizes. Frame widths are not automatically breakpoints.
- Check reference viewports plus **1200, 1024, 900, 600, 480 CSS px**, and breakpoint boundaries.
- Capture with Playwright; the agent compares against local design references. At widths without references, check contract behavior.
- Diagnose layout problems with Chrome DevTools MCP or the Codex browser when available; otherwise use Playwright inspection.
- Limit visual review to **3 rounds by default, 4 maximum**. Report unresolved differences instead of claiming completion.
- Parallelize by independent screen, with one owner for shared code. Each worker handles all responsive variants and never queries Figma.

This repository provides instructions and templates. Figma access, Playwright, diagnostic browser tools, and application commands must be available in the target environment; they are not installed by the harness.
