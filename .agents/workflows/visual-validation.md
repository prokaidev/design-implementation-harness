# Visual validation

**Input:** running application, screen package, and Responsive Contract.
**Output:** [visual review](../templates/visual-review.md) and `validation/round-<n>/` captures.

## Capture setup

Use Playwright with stable fixtures, state, theme, locale, and animation settings. Wait for fonts/images and record route, browser, viewport height, scale factor, and capture bounds.

Matrix: all reference sizes and required states; **1200, 1024, 900, 600, 480 CSS px**; breakpoint −1/+1 CSS px. Deduplicate sizes. Compare matching bounds; at widths without references, check contract behavior.

## Review loop

Budget: **3 rounds including the initial capture**. A fourth is allowed for a diagnosed, localized issue; record the reason. Delegation and integration do not reset the budget.

1. Capture with Playwright and check contract behavior and specified interactions.
2. Compare captures with local design references; use overlays/diffs when available. Prioritize layout, typography, spacing, and assets. The agent performs the comparison without routine human review.
3. Diagnose causes using computed styles, box dimensions, fonts, and media queries through Chrome DevTools MCP or the Codex browser; fall back to Playwright inspection.
4. Record differences and causes. If another round remains, fix and recapture affected sizes/states in that round. Reuse earlier evidence only for unaffected checks.

Stop when required checks pass and meaningful differences are resolved. After the final round, report remaining differences and next actions as `incomplete`; make no further unverified fixes. Missing required tools/evidence yields `blocked`. A later task must explicitly establish a new budget.

## Acceptance

Every required size/state has evidence; contract and project checks pass; shared changes have been checked after integration. Document harmless rendering differences individually instead of relying on a universal pixel threshold.
