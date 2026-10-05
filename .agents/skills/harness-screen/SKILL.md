---
name: harness-screen
description: Implement and visually validate one complete responsive screen from a local harness design package. Use for desktop, tablet, and mobile together; return missing Figma context to ingestion.
---

# Responsive screen implementation

Require a project profile, code index, ready screen package with Responsive Contract, file ownership, and remaining validation budget. Read the target repository's instructions.

Apply [reuse](../../rules/component-reuse.md), [responsive design](../../rules/responsive-design.md), [code quality](../../rules/code-quality.md), and [visual quality](../../rules/visual-quality.md).

Follow [implement-screen](../../workflows/implement-screen.md), including its [visual validation](../../workflows/visual-validation.md) stage. Use the available Playwright runner for captures/checks and diagnostic browser tools for layout causes. Coding workers never access Figma.

One worker owns the screen across all widths. Coordinate shared edits through their owner. Return implementation paths, updated index entries, validation evidence, consumed rounds, and unresolved differences; do not call an incomplete review finished.
