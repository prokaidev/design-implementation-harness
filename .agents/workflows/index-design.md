# Index design

**Input:** design scope, Figma access, and project profile.
**Output:** `design-index.md` using the [template](../templates/design-index.md).

1. Inspect only relevant pages and top-level frames first.
2. Group desktop, tablet, mobile, and component states by logical screen. Assign stable screen IDs; record node IDs, source links, and frame dimensions.
3. Identify shared design components, assets, navigation relationships, and missing variants.
4. Map screens to known routes and code candidates; mark uncertain mappings instead of inventing routes.
5. Record source version/date, extraction status, and package paths. Queue only required screens for [extraction](extract-design.md).

**Ready:** requested screens and all available responsive variants are discoverable through one local index. Indexing alone does not make a screen ready for coding.
