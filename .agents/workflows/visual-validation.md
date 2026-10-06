# Visual validation

**Input:** running application, screen package, and Responsive Contract.
**Output:** [visual review](../templates/visual-review.md) and `validation/round-<n>/` captures.

This file is the single source for round budgets, severity, and review statuses. Other files link here instead of restating them. Worked example: [example review](../examples/screens/example/visual-review.md).

## Tools

Run the [tools](../tools/README.md) and attach their output to the review. If a tool cannot run in the project, do the step manually and record the same fields, with the reason.

| Step | Tool |
| --- | --- |
| Capture matrix and section crops | `capture.mjs` |
| Asset density and actual resource | `asset-density.mjs` |
| 1:1 asset tiles at DPR 2 | `crop-tiles.mjs` |
| Diff against the reference, per section | `compare.mjs` |
| Accessibility | `axe.mjs` |
| Round snapshot and package manifest | `round-manifest.mjs` |

## Capture setup

1. Use Playwright with stable fixtures, state, theme, locale, and animation settings.
2. Wait for fonts and images; record route, browser, viewport height, scale factor, and capture bounds.
3. Use the matrix in the contract's `json matrix` block, built from [responsive rules](../rules/responsive-design.md). Compare matching bounds; at widths without references, check contract behavior.
4. Run the contract's [asset checks](../rules/assets.md) once per production asset role, at DPR 2 or the higher required DPR. DPR 1 captures and reduced previews do not establish sharpness.
5. Asset evidence is invalidated by changes to source, size, crop, or optimization. Captures at different DPRs for the same code/package snapshot can belong to one round.

## Round provenance

For each round, run `round-manifest.mjs`. It records:

1. The commit, a saved patch, and untracked source inputs. A commit with only a `dirty` flag is insufficient.
2. Files changed since the previous round.
3. Paths and SHA-256 of the spec, contract, references, and assets used.

Link captures to the round's provenance. A change of code or package requires a new round.

## Severity

This is the only definition of severity. Pixel thresholds come from [constraints](../context/constraints.md); defaults are shown.

| Level | Meaning |
| --- | --- |
| blocker | Broken layout, overlapped or clipped content, non-working action, failed density check |
| major | Block shift larger than the threshold (default 4 px) at a reference width; wrong token or color; different font or weight; wrong order or visibility; wrong line wrapping |
| minor | Difference within the threshold (default 1–4 px); line spacing off by less than one grid step |
| harmless | Anti-aliasing, subpixel positioning, browser font rendering; a metric-compatible fallback font accepted in advance |

- A **meaningful difference** is a blocker or a major.
- Each finding in the review carries one of these levels.
- A design defect (for example, text clipped in the reference) is resolved by a decision recorded in the screen spec; the implementation then follows the decision and the finding counts as resolved.
- `axe` violations of impact critical or serious are majors. If the cause is a design value (color, size), the code is not the owner: record it as a design finding with the decision needed from the user. Until that decision exists, the status is `blocked`, not `pass`.
- Every minor is either fixed or accepted with a written justification. Harmless items are listed individually with a reason.

## Rounds and budgets

A round is one capture-and-review batch for a fixed code/package snapshot across sizes and states. Multiple screenshots of that snapshot belong to the same round. Verification of changed code or package inputs starts a new round. Setup, diagnostic inspection, and failed capture attempts are not rounds; record them separately. A partial reviewed batch counts as a round and must identify the missing checks.

Number rounds consecutively per screen and label each local or integrated. Track consumption and extensions per phase. Delegation, handoff, and package recovery preserve history and do not reset counts.

| Phase | Base budget | Extensions (2 rounds each) | Ceiling |
| --- | --- | --- | --- |
| Local (per screen, worker-owned) | 6 | at most 2 | 10 |
| Integration (per affected screen, coordinator-owned) | 2 | at most 2 | 6 |

1. Local validation covers desktop, tablet, mobile, and the full contract matrix. Integration rounds do not subtract from it.
2. Integration is required for parallel work; in single-agent work only when there is a separate integration step.
3. Stop early when acceptance passes. After local round 4, record progress, remaining causes, and the plan.
4. Exhausting the base budget does not stop the work; exhausting the ceiling does.
5. An extension is granted at a budget boundary only if the remaining differences have diagnosed, actionable causes. Record causes, planned fixes, affected checks, expected improvement, and owner first. No user approval is needed within the ceiling.
6. A **stall** is two consecutive rounds that do not reduce the count of blockers plus majors, or that reintroduce the same issue. A stall counts as one of the two extensions, even if base budget remains. After a stall, record a new diagnosis before the next round: computed styles, dimensions, font loading, shared dependencies, package sufficiency. Without a new diagnosis the phase is not extended.
7. At the ceiling, set `incomplete` with an escalation (below). Continue only after the user approves explicit additional rounds.
8. Record external blockers (tools, source information, decisions) as `blocked`.

### Escalation at the ceiling

Record in the review:

1. Remaining differences with severity, and checks not completed.
2. Their diagnosed causes.
3. The decision needed from the user (accept as is, change the design or contract, allow more rounds, or other).
4. The owner of each item.

## Local review focus

Guidance for the default allowance, not mandatory stages. Combine or skip focuses when acceptance permits; check behavior and states from the first round.

| Round | Main focus |
| --- | --- |
| 1 | Full matrix review; inventory differences and diagnose causes. |
| 2 | Major geometry: containers, grids, dimensions, block placement. |
| 3 | Responsive behavior: wrapping, order, visibility, overflow, breakpoint boundaries. |
| 4 | Typography, spacing, assets/cropping, borders, effects; assess progress. |
| 5 | Remaining issues, interactions, keyboard behavior, regressions. |
| 6 | Final candidate on the full required matrix and required project checks. |

## Review loop

1. Capture with `capture.mjs`. Check contract behavior and the specified action/result assertions, including applicable data, error, and keyboard behavior.
2. Compare section by section: a screenshot of each section by locator against the Figma node screenshot of the same bounds. This is the primary method. Compare the whole page only for the final overview at the reference widths.
3. Diagnose causes using computed styles, box dimensions, fonts, and media queries through Chrome DevTools MCP or the Codex browser; fall back to Playwright inspection.
4. Record each difference with severity, cause, planned fix, and regression risk. Fix and recapture affected sizes/states. Reuse earlier evidence only for unaffected checks, with a recorded justification.

### Matrix per round

1. The first and the final local round cover the full matrix.
2. Intermediate rounds capture only affected widths and the b±1 points of all breakpoints.
3. If an earlier round covers the full matrix and passes acceptance, it can serve as the final verification.
4. Never declare success using evidence from before the last relevant change.

## Integration and handoff

Hand off a locally accepted screen as `local-pass`, with remaining integration work identified. A worker with unresolved meaningful differences or missing required checks must not use this status. Stabilize shared components, tokens, routes, and global styles before the coordinator reviews the integrated snapshot.

1. Capture the affected-screen checks after integration and verify that earlier evidence remains valid. Record shared changes and their impact; unknown impact requires the full matrix. This review consumes an integration round even when it finds no differences.
2. Route failures to the owner, then verify fixes and affected regressions in the next integration round. Recheck other screens affected by shared fixes; each screen keeps its own round history.

## Status

- `pass`: acceptance is met, including integration when required, and no package assumptions are open.
- `local-pass`: local acceptance is met; required integration validation is pending, or package assumptions are still open (list them in the review). Closing the assumptions and re-verifying the affected checks upgrades it to `pass`.
- `incomplete`: unfinished work, set when the ceiling is reached or work is interrupted. Requires the escalation record.
- `blocked`: required tools, source information, decisions, or dependencies prevent progress; record the concrete blocker and owner. Fixable capture failures must be recovered within the task.

## Acceptance

1. Every required size/state has evidence.
2. Specified behavior, the contract, and required project checks pass.
3. There are 0 blockers and 0 majors. Each minor is fixed or accepted with justification; harmless items are listed.
4. Asset density and sharpness checks pass under the [asset rules](../rules/assets.md); missing asset evidence prevents `local-pass` and `pass`.
5. Final local verification covers the full matrix.
6. Overall `pass` also requires affected shared changes to be checked after integration when applicable.
7. Open package assumptions cap the status at `local-pass`; after the source arrives, re-verify the checks the assumption affected.
