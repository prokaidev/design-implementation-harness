# Design index

- Figma file/page scope:
- Source revision (or `unavailable`) and indexed date:
- Project profile and code index paths:

| Screen ID | Implementation set ID | Route or unknown | Variant / state | Source node / link | Width × height | Local package | Status / gaps |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | Desktop / tablet / mobile | | | | indexed / extracting / ready / stale |

## Implementation selection and duplicates

| Screen ID | Implementation set ID | Selection: selected / candidate / pending | Decision source or unresolved blocker / owner |
| --- | --- | --- | --- |
| | | | |

- Equivalent copies: screen/set/variant/state, representative extraction node, all copy node links, and evidence of equivalence:
- Uncertain frame grouping: candidate nodes, reasons, and required decision / owner:

Use one stable screen ID for alternatives of the same product screen and distinct set IDs for each implementation. Retain candidate sets in the index. Extract only a selected set with resolved grouping; do not mix sets without a confirmed relationship. When selection is pending, record the affected screen's extraction blocker. For a single unambiguous set, record that selection basis.

## Relationships and gaps

- Shared design components and code candidates:
- Navigation relationships:
- Missing variants and assumptions:
- Source changes requiring re-extraction:

Repeat a screen ID and implementation set ID across that set's variants and states. Readiness applies to the selected set's whole package, not one viewport. Mark existing affected packages stale when selection changes.
