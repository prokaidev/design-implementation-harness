# Responsive design

- One screen task includes desktop, tablet, and mobile; inspect all available variants before coding.
- Write a Responsive Contract defining ranges, transitions, fixed/fluid dimensions, ordering, wrapping, visibility, spacing, typography, and interaction changes.
- Reuse project breakpoints where they fit. Justify any new breakpoint from layout behavior; do not equate reference frame widths with breakpoints.
- Mark inferred behavior and missing variants. Blocking ambiguity returns to ingestion; bounded assumptions belong in the contract.
- Validate every reference size and intermediate widths 1200, 1024, 900, 600, and 480 CSS px, deduplicated. Also inspect just below/above actual transition breakpoints.
- At widths without references, check the contract: no unintended overflow, overlap, clipping, unreadable wrapping, or inaccessible controls. Do not claim pixel equivalence to an absent reference.
