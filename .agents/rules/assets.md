# Asset selection and quality

The extractor owns source selection and production-asset readiness. The implementer verifies the resource actually rendered in the browser. Both checks are required; repeated layout reviews do not substitute for them.

## Selection and provenance

- Distinguish design references, original sources, and selected production assets in the screen package. A section screenshot or 1× node export is not automatically a production asset.
- Inspect available originals, exports, and existing code equivalents before assigning a production role. Prefer an original of sufficient resolution when its artwork/composition matches; preserve required crop, masks, alpha, and effects in code or a suitable export. Prefer SVG for suitable vector artwork; embedded raster content still requires density checks.
- If the composition requires a rendered export, export at sufficient scale and record the source node, export settings, and reason. Increasing export dimensions cannot restore detail from an undersized raster input; check source quality as well as output dimensions. Do not upscale a small file to satisfy the pixel-count check.
- For each production role and responsive source variant, record selected path, source node/original path, source revision (or `unavailable`), format, pixel dimensions (or vector viewBox), SHA-256, maximum CSS paint dimensions, target DPR, required pixel dimensions, density result, and selection rationale. Record relevant alternative candidates and why they were rejected. References must have a separate role.

## Density gate

- Target DPR is **at least 2**; use a higher value when project requirements specify it. Layout screenshots at DPR 1 do not waive this gate.
- For a raster painted at W × H CSS px, require source width ≥ ceil(W × target DPR) and source height ≥ ceil(H × target DPR). Effective density is min(source width / W, source height / H). Use actual file pixel dimensions, not only browser `naturalWidth`/`naturalHeight`, which may reflect density descriptors.
- Evaluate the largest paint size across each source's supported responsive usage, including CSS transforms and zoom states when in scope. For `contain`, use the painted image dimensions; for `cover` or background cropping, use the full scaled image before clipping. A container's visible dimensions alone can underestimate required resolution. Bound fluid images in unbounded ranges or provide adequate scalable sources.
- Example: 388 × 472 CSS px at DPR 2 requires 776 × 944 pixels. A 388 × 472 export fails; an unscaled 1137 × 1383 original passes the dimensional gate. Composition and sharpness still need visual verification.
- Before package `ready`, inspect selected artwork for detail, crop, alpha, and effects and record the result. Missing dimensions, an unresolved density failure, or unusable artwork leaves the package `draft`/`stale`, with an extractor-owned recovery action. Obtain a suitable original/export rather than silently accepting a smaller file.

## Browser acceptance

- At the contract's DPR checks, run `asset-density.mjs` ([tools](../tools/README.md)) and attach its output; if it cannot run, record the same fields manually. Record the actual resource (`currentSrc` for images, resolved resource for CSS backgrounds), its file dimensions/hash, CSS paint dimensions, crop/fit, observed DPR, and effective density. Verify correspondence to the selected package asset. For optimized/generated derivatives, record the mapping to the selected original and verify derivative dimensions and quality; a different hash alone is not an error.
- Verify responsive resource selection at DPR 2 and the largest paint size for each production raster role and distinct responsive composition/source. Add higher-DPR checks when required. Vector-only screens may mark raster density checks not applicable with evidence; inspect vector rendering at DPR 2.
- Save DPR 2 (or higher required DPR) screenshots at device-pixel resolution, cut them with `crop-tiles.mjs`, and inspect asset crops at **1:1 physical pixels**, checking detail, blur, compression artifacts, crop, alpha, and effects against the selected source/composition. A reduced full-page preview or DPR 1 capture is insufficient. Record both dimensional and visual results.
- Check assets from the initial review and repeat affected checks after asset, source-selection, sizing, cropping, optimization, or relevant shared changes. Only current passing evidence permits `local-pass`/`pass`. Route source/export failures to the extractor; fix implementation/resource-selection failures in code.

## Fonts

1. Record every font family, weight, and style used in the references, with its source (local file, project package, or web font) and license note.
2. An unavailable font blocks package `ready` unless the user accepted a fallback in advance (recorded in [design context](../context/design.md)).
3. An accepted fallback must be metric-compatible (similar x-height, advance widths, and line height). Differences caused only by it are `harmless` ([severity](../workflows/visual-validation.md)); other font differences keep their severity.
4. Confirm in the browser that the intended font loaded (`document.fonts`), not the fallback.
