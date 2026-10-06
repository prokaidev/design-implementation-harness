# Responsive contract

- Treat desktop, tablet, and mobile as one screen task. Complete the contract before coding.
- Define ranges, fixed/fluid sizing, ordering, visibility, wrapping, spacing, typography, and state/interaction changes.
- Use project breakpoints where suitable. Frame widths alone are not breakpoints; mark inferred transitions and missing variants explicitly.
- Build a deduplicated validation matrix from all in-scope reference sizes/states, finite supported range limits, **1200, 1024, 900, 600, 480 CSS px**, and each transition at **b−1, b, b+1 CSS px**. For an unbounded upper range, choose and record a wide-screen check.
- Include intermediate and transition checks only within the supported range; record excluded sizes and reasons. If an in-scope reference is outside that range, resolve the scope conflict before marking the contract ready.
- Add [asset quality](assets.md) checks at DPR 2 (or higher required DPR), covering the largest CSS paint size for each production raster role and distinct responsive composition/source. Record target DPR, resource selection, and sizing/crop assertions; DPR 1 layout evidence alone is insufficient. These checks augment the matrix without requiring every layout viewport to be duplicated at every DPR.
- Without a matching reference, check contract behavior: overflow, overlap, clipping, wrapping, and control usability. Return blocking design gaps to the extractor.
