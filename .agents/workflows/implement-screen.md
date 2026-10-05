# Implement screen

**Input:** project profile, code index, ready screen package, owned files, and validation budget.
**Output:** responsive implementation, updated code index, and visual review.

1. Read the screen specification and completed Responsive Contract with every available reference. Check local provenance against the assigned design revision and relevant current code; ask ingestion to resolve uncertain freshness without querying Figma.
2. Return blocking gaps to ingestion. Workers never query Figma. Record bounded assumptions before coding.
3. Inspect reuse candidates and plan component composition using project conventions. Confirm ownership before editing shared files.
4. Implement the entire screen across desktop, tablet, mobile, and intermediate ranges: layout first, then typography, spacing, assets, and component states.
5. Check semantics, keyboard behavior, overflow, wrapping, and specified interactions. Run applicable project checks.
6. Run [visual validation](visual-validation.md) within the screen's remaining budget. Fix causes, not isolated screenshot symptoms.
7. Update relevant code-index entries, or return updates to the coordinator when working in parallel. Hand off changed files, checks, visual evidence, assumptions, and unresolved differences.

**Done:** required behavior and viewport checks pass, comparisons have evidence, and no meaningful visual differences remain. Budget exhaustion or missing evidence yields an incomplete report, not completion.
