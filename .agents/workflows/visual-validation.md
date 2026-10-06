# Visual validation

**Input:** running application, screen package, and Responsive Contract.
**Output:** [visual review](../templates/visual-review.md) and `validation/round-<n>/` captures.

## Capture setup

Use Playwright with stable fixtures, state, theme, locale, and animation settings. Wait for fonts/images and record route, browser, viewport height, scale factor, and capture bounds.

Use the contract's matrix built from [responsive rules](../rules/responsive-design.md). Compare matching bounds; at widths without references, check contract behavior.

Include the contract's mandatory DPR 2 (or higher required DPR) [asset checks](../rules/assets.md). Capture at device-pixel resolution, record the resource actually loaded and its density, and inspect asset crops at 1:1 physical pixels. DPR 1 layout captures and reduced previews do not establish sharpness. Check assets from the initial round; source, size, crop, or optimization changes invalidate affected asset evidence. Captures at different DPRs for the same code/package snapshot can belong to one round.

For each round, record a code snapshot: commit plus a saved patch and relevant untracked source inputs, or an immutable snapshot ID. Record changed files since the previous round and a package manifest with paths/checksums for the spec, contract, references, and assets used. A commit with only a `dirty` flag is insufficient. Link captures to that round's provenance; a change of code or package requires a new round.

## Rounds and budgets

A round is one capture-and-review batch for a fixed code/package snapshot across sizes and states. Multiple screenshots of that snapshot belong to the same round. Fixes prepare the next round; verification of changed code or package inputs starts a new round. Setup, diagnostic inspection, and failed capture attempts do not consume review rounds; record failed attempts and their causes separately. A partial reviewed batch counts as a round and must identify missing checks.

Number rounds consecutively per screen and label each as local or integrated. Track consumption and extensions separately for each phase. Delegation, handoff, and package recovery preserve the history and do not reset counts.

- **Local validation: 6 rounds per screen by default**, including the initial review and final verification. The worker owns desktop, tablet, mobile, and the full contract matrix. Integration does not subtract from this budget.
- **Integration validation: 2 separate rounds per affected screen by default**, covering the integrated result and verification of any fixes. The coordinator owns this phase. It is required for parallel work; in single-agent work it is required only when there is a separate integration step.
- These are planning budgets, not mandatory round counts or automatic stop limits. Stop early when acceptance passes. After local round 4, record progress, remaining causes, and the plan to reach acceptance.
- When a phase exhausts its current budget and remaining issues have diagnosed, actionable causes, automatically extend that phase by **2 rounds**. Before continuing, record causes, planned fixes, affected checks, expected improvement, and the responsible owner. Repeat this decision at each extension boundary; no new task or user approval is required for work within the authorized scope.
- If two consecutive rounds fail to reduce meaningful differences or repeatedly reintroduce the same issues, change the diagnostic approach before further cosmetic edits. Inspect computed styles, dimensions, font loading, shared dependencies, and package sufficiency. Continue once an actionable cause is established; route package or shared-code gaps to their owner. Record unresolved external blockers as `blocked`. Budget exhaustion alone is not a blocker and does not justify returning an unfinished screen.

## Local review focus

Use this sequence to organize the default allowance. It is guidance, not six mandatory stages: combine or skip focuses when acceptance permits, and check behavior and states from the first round.

| Round | Main focus |
| --- | --- |
| 1 | Review the initial implementation across the full matrix; inventory meaningful differences and diagnose causes. |
| 2 | Verify major geometry fixes: containers, grids, dimensions, and block placement; check effects across widths. |
| 3 | Verify responsive behavior: wrapping, order, visibility, overflow, intermediate widths, and breakpoint boundaries. |
| 4 | Verify typography, spacing, assets/cropping, borders, and effects; assess progress and remaining causes. |
| 5 | Resolve and verify remaining issues, interactions, keyboard behavior, and regressions. |
| 6 | Verify the final candidate across the full required matrix and run required project checks. |

## Review loop

1. Capture with Playwright and check contract behavior and the specified action/result assertions, including applicable data, error, and keyboard behavior.
2. Compare captures with local design references; use overlays/diffs when available. Prioritize layout, typography, spacing, and assets.
3. Diagnose causes using computed styles, box dimensions, fonts, and media queries through Chrome DevTools MCP or the Codex browser; fall back to Playwright inspection.
4. Record differences, causes, fixes planned for the next round, and regression risks. Fix and recapture affected sizes/states; apply the extension and stalled-progress rules when needed. Reuse earlier evidence only for unaffected checks with a recorded justification.

The initial local review and final local verification cover the full required matrix. Intermediate rounds may target affected checks. If an earlier round covers the full matrix and passes acceptance, it can serve as the final verification. Never declare success using evidence from before the last relevant change or leave fixes unverified.

## Integration and handoff

Hand off a locally accepted screen as `local-pass`, with remaining integration work identified. A worker with unresolved meaningful local differences or missing required checks must not use this status. Stabilize shared components, tokens, routes, and global styles before the coordinator reviews the integrated snapshot.

1. Capture the affected-screen checks after integration and verify that earlier evidence remains valid. Record shared changes and their impact; unknown impact requires the full matrix. This review consumes an integration round even when it finds no differences.
2. Route failures to the appropriate owner, then verify fixes and affected regressions in the next integration round. If fixes require further work, continue under the phase extension rules. Recheck other screens affected by shared fixes; each screen keeps its own round history.

## Status

- `pass`: acceptance is met, including integration when required.
- `local-pass`: local acceptance is met; required integration validation is pending.
- `incomplete`: work is interrupted or remains unfinished, with differences, missing checks, next actions, and owners recorded. Do not use it to stop solely because a planning budget was exhausted.
- `blocked`: required tools, source information, decisions, or dependencies prevent progress; record the concrete blocker and owner. Missing required evidence prevents acceptance, but fixable capture failures should be recovered within the task.

## Acceptance

Every required size/state has evidence; specified behavior, contract, and required project checks pass; meaningful differences are resolved. Production raster density and browser sharpness checks at DPR 2 (or higher required DPR) pass under the asset rules; missing asset evidence prevents `local-pass` and `pass`. Final local verification covers the full matrix. Overall `pass` also requires affected shared changes to be checked after integration when applicable. Document harmless rendering differences individually instead of relying on a universal pixel threshold.
