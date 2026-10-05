# Visual validation

**Input:** running application, screen package, and Responsive Contract.
**Output:** [visual review](../templates/visual-review.md) and `validation/round-<n>/` captures.

## Capture setup

Use Playwright with stable fixtures, state, theme, locale, and animation settings. Wait for fonts/images and record route, browser, viewport height, scale factor, and capture bounds.

Use the contract's matrix built from [responsive rules](../rules/responsive-design.md). Compare matching bounds; at widths without references, check contract behavior.

For each round, record a code snapshot: commit plus a saved patch and relevant untracked source inputs, or an immutable snapshot ID. Record changed files since the previous round and a package manifest with paths/checksums for the spec, contract, references, and assets used. A commit with only a `dirty` flag is insufficient. Link captures to that round's provenance; a change of code or package requires a new round.

## Review loop

Budget: **3 rounds including the initial capture**. A fourth is allowed for a diagnosed, localized issue; record the reason. Delegation and integration do not reset the budget.

A round is one capture-and-review batch for a fixed code/package snapshot across sizes and states. Number rounds consecutively. In parallel work, allow at most two local rounds and reserve at least one default round for integration; unused local rounds remain available. Stabilize shared dependencies before the coordinator captures affected checks and verifies earlier evidence. Integration consumes a round even when it finds no differences.

1. Capture with Playwright and check contract behavior and the specified action/result assertions, including applicable data, error, and keyboard behavior.
2. Compare captures with local design references; use overlays/diffs when available. Prioritize layout, typography, spacing, and assets.
3. Diagnose causes using computed styles, box dimensions, fonts, and media queries through Chrome DevTools MCP or the Codex browser; fall back to Playwright inspection.
4. Record differences and causes. If another round remains, fix and recapture affected sizes/states in that round. Reuse earlier evidence only for unaffected checks.

Stop when the acceptance criteria pass. After the final round, report remaining differences and next actions as `incomplete`; make no further unverified fixes. Missing required tools/evidence yields `blocked`. A later task must explicitly establish a new budget.

## Acceptance

Every required size/state has evidence; specified behavior, contract, and required project checks pass; shared changes have been checked after integration; meaningful differences are resolved. Document harmless rendering differences individually instead of relying on a universal pixel threshold.
