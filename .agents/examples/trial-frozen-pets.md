# Trial run: Frozen Pets "help-together"

One screen, three variants (Figma nodes 237:38306 desktop image, 234:37554 tablet, 226:28450 mobile), empty Vite + React project (`frozen-pets-trial`, outside this repository). Date: 2026-10-06. Single agent, all four skills in sequence.

## Result

- Implementation passes the visual matrix (12 widths × 4 states), asset checks (all SVG), keyboard behavior, `npm run build`, `npm run lint`.
- After round 6 the status was `blocked`: axe found two design-owned contrast failures (button 2.55:1, subtitle 4.25:1), and the desktop form had no Figma node (inferred from a low-resolution overview).
- The user decided to keep both colors as designed and supplied the desktop form node (237:38305). Round 7 replaced the inferred geometry (position probe: dx=0, dy=0). Final status `pass`.
- Local rounds: **7** (6 base + 1 extension); ceiling 10 not reached.

## Rounds

| Round | What it found | Fixed by |
| --- | --- | --- |
| 1 | mobile title wraps in the wrong place; placeholder 1 px off | padding 19 px + border |
| 2 | `text-wrap: balance` made the wrap worse | reverted |
| 3 | title/subtitle 1 px high | non-breaking space fixed the wrap; baseline offsets next |
| 4 | shared `top: 1px` regressed the mobile subtitle | tablet-only |
| 5 | desktop button touches the dark base at 1200 | form `top` as a function of width |
| 6 | final full matrix, axe, behavior; ended `blocked` on user decisions | — |
| 7 | real desktop form node arrived; geometry replaced; final pass | extension 1 |

Where the agent lost time: the title wrap (rounds 1–3: three attempts, `compare.mjs --probe` was added to separate position from rendering); a shared baseline fix applied to two variants (round 4).

## Fields left empty or weak

- Source revision: always `unavailable` (the MCP exposes none).
- Code Connect: unavailable (seat); the column stays empty.
- Desktop form and title: no node until round 7; the contract was `draft` and implementation proceeded on a bounded assumption. The inference was close (680 vs 670 wide, top 81 vs 80).
- Round manifests for rounds 1, 2, 5 were skipped by the agent; the harness now defaults `--prev` and warns.
- Hover, focus, filled, error states: no design references.

## Findings and the harness changes they caused

| Finding | Change |
| --- | --- |
| Figma MCP cuts responses at ~23k–56k characters; child IDs of copied frames are not contiguous | [Truncated responses](../rules/figma-to-code.md#truncated-responses): ask for per-section links, record a blocker |
| Serial capture of 48 contexts exceeded the 120 s command limit | `capture.mjs` runs 4 contexts in parallel (`--jobs`) |
| A hidden section timed out for 30 s | per-state `sections`, 5 s locator timeout |
| `validation/` was not git-ignored in the target project; the manifest listed old captures as changes | README setup line; manifest ignores generated paths |
| No way to tell a 1 px offset from font rendering | `compare.mjs` (diff + `--probe` shift search) |
| axe was "unavailable" | `axe.mjs` added |
| Design defects and design-owned a11y failures had no category | [Severity](../workflows/visual-validation.md#severity): decision in spec resolves a design defect; critical/serious axe on design values → `blocked` until the user decides |
| No explicit path for a package that is `draft` only because of a bounded design gap | new status `ready-with-assumptions` ([extractor rules](../skills/design-extractor/SKILL.md#ready-with-assumptions)); the desktop form in this trial would have qualified (bounded region, basis = overview crop, verified when node 237:38305 arrived), capped at `local-pass` until then |
| Vector-only screens: tool printed `paint ?×?` | prints the CSS box |
