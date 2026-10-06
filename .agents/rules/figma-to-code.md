# Figma to code

Used by the extractor (the only role with Figma access besides the indexer). Access and ownership: [Figma boundary](figma.md).

## Order of MCP calls

1. Large file: `get_metadata` first to find node IDs; never request the whole page.
2. Per selected node: `get_design_context`, then `get_screenshot` of the same node for the reference.
3. Tokens: `get_variable_defs` for the node, before copying any raw value.
4. Reuse: `get_code_connect_map` for the node's components.

## Truncated responses

Large frames can make `get_metadata` / `get_design_context` fail with a JSON parse error (the response is cut off). Retrying does not help. Observed in the trial: mobile frame of 7645 px height failed at ~23k characters.

1. Do not guess child IDs: IDs of copied frames are not contiguous.
2. Ask the user for per-section node links (copy link to selection), or request a selection-based call in the Figma desktop app.
3. Screenshots (`get_screenshot`) work on any node and are enough to find a section's size, but not to extract properties or assets.
4. Record the failure and the missing section links as an extractor-owned blocker; the package stays `draft`.

## Rules

1. Code from `get_design_context` (React + Tailwind) is a reference only. Re-express it in the project's stack, components, and tokens; do not paste it.
2. MCP asset URLs are temporary. Save each asset to the package's `assets/` immediately and record its source node and URL date.
3. Map every Figma variable to a project token before using raw values. Record each mapping in the spec's token table; a variable with no project token or a different value is a mismatch, to be resolved against [constraints](../context/constraints.md) or recorded as a blocker.
4. Code Connect matches are the primary reuse candidates. Add them to the code index and the spec's "Code Connect" column; unmatched components go to "missing primitives".
5. Check the traps below on every node.

## Auto-layout to CSS

| Figma | CSS |
| --- | --- |
| Horizontal / vertical auto-layout | `display: flex; flex-direction: row / column` |
| Hug contents | `width/height: auto` (`fit-content` for blocks that must shrink) |
| Fill container | `flex: 1 1 0` on the main axis; `align-self: stretch` on the cross axis |
| Fixed | explicit `width` / `height`; verify it is not a frame artifact |
| Min / max width or height | `min-*` / `max-*` |
| Gap | `gap`; "space between" is `justify-content: space-between` |
| Padding | `padding` per side |
| Absolute position inside auto-layout | `position: absolute` in a `position: relative` parent; the element is outside the flow |
| Constraints (left/right/top/bottom/center/scale) | offsets for absolute children; "left + right" is stretch, "center" is centered offset, "scale" is percentages |
| Wrap | `flex-wrap: wrap` with the row gap |
| Grid-like repeated frames | `display: grid` with tracks that match the contract ranges |

Frame widths from references are samples, not breakpoints; the contract defines behavior between them.

## Traps

1. Hidden layers: skip, but note them if they carry states.
2. Instance overrides: text, visibility, and swapped components differ from the main component; read the instance, not the master.
3. Mixed-style text: split into spans; record each run's font, weight, and color.
4. Decorative absolute elements (blobs, lines, shadows): decide whether they are assets, pseudo-elements, or omitted, and record it.
5. Masks and clipping: reproduce the crop in code or export the masked result; record which.
6. Auto-layout text with fixed width: line wrapping depends on the font; check the font is available before measuring.
