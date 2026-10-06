# Responsive contract

- Treat desktop, tablet, and mobile as one screen task. Complete the contract before coding.
- Define ranges, fixed/fluid sizing, ordering, visibility, wrapping, spacing, typography, and state/interaction changes.
- Use project breakpoints where suitable. Frame widths alone are not breakpoints; mark inferred transitions and missing variants explicitly.
- Build a deduplicated validation matrix from all in-scope reference sizes/states, finite supported range limits, the intermediate widths from [constraints](../context/constraints.md) (default 1440, 1200, 1024, 768, 600, 390, 375, 320 CSS px), and each transition at **b−1, b, b+1 CSS px**. For an unbounded upper range, choose and record a wide-screen check.
- Add the themes and stress cases from constraints as states in the matrix.
- Write the matrix as a `json matrix` block in the contract so the capture tool can read it.
- Capture the full matrix in the first and last local round; intermediate rounds capture only affected widths and all b±1 points ([workflow](../workflows/visual-validation.md)).
- Include intermediate and transition checks only within the supported range; record excluded sizes and reasons. If an in-scope reference is outside that range, resolve the scope conflict before marking the contract ready.
- Add [asset quality](assets.md) checks once per production asset role (and per distinct responsive composition/source) at its largest paint size. They are not multiplied across layout widths or states.
- Without a matching reference, check contract behavior: overflow, overlap, clipping, wrapping, and control usability. Return blocking design gaps to the extractor.
