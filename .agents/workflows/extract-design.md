# Extract design

**Input:** indexed screen, all responsive variants/states, project profile, and code index.
**Output:** one local screen package with specification, Responsive Contract, references, and assets.

1. Read all available desktop/tablet/mobile variants together. Capture each reference at its original dimensions; record state, content, source node, and provenance.
2. Extract layout/constraints, fixed/fluid sizing, alignment, spacing, typography including font weights and line heights, colors, borders, radii, and effects.
3. Export required assets; record local paths, format, dimensions, font availability, and usage. Identify existing project equivalents.
4. Extract component variants, interaction evidence, and applicable loading/empty/error/disabled/selected states. Separate design facts from assumptions.
5. Fill [screen-spec](../templates/screen-spec.md) and [responsive-contract](../templates/responsive-contract.md). Describe transitions across ranges, including intermediate widths; use project breakpoints where suitable.
6. Verify all package paths resolve, screenshots/assets are usable, sources are consistent, and blocking gaps are resolved. Mark readiness in the design index.

**Ready:** a coding worker can implement and validate this screen without Figma access. Missing references remain explicit; never fabricate a missing design variant or call it visually verified.
