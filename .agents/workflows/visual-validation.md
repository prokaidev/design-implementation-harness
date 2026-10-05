# Visual validation

**Input:** running application, local references, screen specification, and Responsive Contract.
**Output:** `visual-review.md` and captures under `validation/round-<n>/` in the screen package.

## Prepare

- Use the project's Playwright setup or an available Playwright browser tool. Record the runner, route, fixture/auth setup, browser, and capture settings.
- Stabilize content, theme, locale, time-dependent data, and animations. Wait for fonts, images, and page readiness rather than a fixed sleep.
- Build a deduplicated viewport matrix: reference dimensions; widths **1200, 1024, 900, 600, 480 CSS px**; and just below/above actual breakpoints. Record heights and device scale factor explicitly.
- Match reference bounds: viewport, full-page, or region. At intermediate widths without a reference, validate contract behavior instead of stretching a reference screenshot.
- If tooling or required evidence is missing, report the blocker. Do not silently skip validation or claim a pass.

## Review loop

Default budget: **3 rounds per screen**, including the initial capture. A fourth is allowed only for a diagnosed, localized remaining issue; record the reason before starting it. Never exceed 4 or reset the count through delegation.

1. Capture the required sizes and designed states with Playwright. Check relevant interactions, keyboard/focus behavior, console/runtime errors, wrapping, overflow, clipping, and overlap.
2. Inspect implementation captures alongside matching design references. Use overlays or image diffs if available; record concrete differences and evidence. Pixel scores alone are not acceptance.
3. Prioritize structural layout, typography, spacing, assets, then decorative details. Diagnose causes through computed styles, bounding boxes, media queries, and font loading using Chrome DevTools MCP or the Codex browser; fall back to Playwright inspection.
4. Record findings in the [visual review](../templates/visual-review.md). If another round remains, apply focused fixes and capture again in the next round. Recheck all affected viewports; cite earlier evidence only for unaffected checks.

Stop early when required checks pass and meaningful differences are resolved. Do not make unverified fixes after the final round. If budget is exhausted, report remaining differences, suspected causes, and the next action with status `incomplete`. A later task must explicitly establish a new budget.

## Acceptance

- Every matrix entry and required state has evidence, including intermediate sizes without references.
- Reference comparisons show no meaningful unexplained layout, typography, spacing, or asset differences. Document harmless rendering differences individually; no universal pixel threshold is assumed.
- Contract behavior, accessibility checks, and applicable project checks pass.
- Shared changes have been integrated and affected screens checked. Missing integration evidence leaves the result incomplete.
