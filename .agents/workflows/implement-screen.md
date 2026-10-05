# Implement screen

**Input:** project profile, code index, ready screen package, owned files, and remaining review budget.
**Output:** responsive implementation, index updates, and visual review.

1. Check local provenance against the assigned design revision and current code. Return missing or uncertain package details to the extractor.
2. Use indexed components/tokens and implement all responsive variants against the contract. Route shared edits through their owner; record any required global token changes.
3. Run applicable project checks and [visual validation](visual-validation.md).
4. Return changed files, code-index updates, and the review. In parallel work, the coordinator merges index updates and verifies shared changes across affected screens.

Completion requires passing checks and visual evidence. Missing evidence or unresolved meaningful differences leave the screen incomplete.
