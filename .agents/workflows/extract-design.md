# Extract design

**Input:** selected design-index entries, project profile, and code index.
**Output:** one local package per screen.

1. Read all indexed responsive variants and states together. Save references at original dimensions with source node, state, revision/date, and capture bounds.
2. Extract layout constraints, fixed/fluid sizing, spacing, typography (font, size, weight, line height), colors, borders, and effects. Export assets and record font availability and existing code equivalents.
3. Fill [screen-spec](../templates/screen-spec.md), including component states and interaction evidence, and [responsive-contract](../templates/responsive-contract.md), separating observed values from inferred behavior.
4. Check package completeness and mark readiness. Return screen/node mapping gaps to the indexer; resolve detailed design gaps here.

Ready means the package supports implementation without Figma access: usable local references/assets, a completed contract, and no blocking gaps. On recovery requests, refresh only affected artifacts.
