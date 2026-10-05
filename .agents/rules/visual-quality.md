# Visual quality

- The agent owns visual comparison; routine acceptance does not depend on a human spotting differences.
- Playwright captures deterministic browser output and checks behavior. It does not itself judge whether a Figma design has been implemented correctly.
- Match viewport, content, state, theme, fonts, and capture bounds before comparing. Retain original references; never replace them with implementation captures to make a check pass.
- Compare layout first, then typography, spacing, assets, colors, and details. Use overlays/image diffs when available and inspect discrepancies rather than trusting a single score.
- Diagnose with computed styles, box dimensions, overflow, fonts, and media queries using Chrome DevTools MCP or the Codex browser. If unavailable, use Playwright inspection and record the limitation.
- Follow the bounded [visual validation workflow](../workflows/visual-validation.md). Missing tools, references, or unresolved major differences prevent a passing review.
