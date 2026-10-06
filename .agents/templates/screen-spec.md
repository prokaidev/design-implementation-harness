# Screen specification

Filled example: [example spec](../examples/screens/example/screen-spec.md).

- Screen ID, route, and purpose:
- Selected implementation set ID and design-index selection/decision reference:
- Source revision (or `unavailable`) and extraction date:
- Status: see [status table](../rules/artifacts.md) (`ready-with-assumptions` requires the table below)
- Project profile, code index, and Responsive Contract paths:

## References

| Variant / state | Source node | Width × height | Capture date / bounds | Local screenshot |
| --- | --- | --- | --- | --- |
| | | | | |

## Visual specification

| Section / component | Layout and sizing | Spacing | Typography | Colors / borders / effects | Evidence |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Assets and content

- Assets/fonts: local path, source, dimensions/format, role, and availability:
- Asset manifest path (or inline records): separate references, originals, and selected production roles; include source revision, SHA-256, export settings/derivations, and relevant alternative candidates with selection rationale:

| Production role / responsive source | Selected path / source node or original | Format / pixel dimensions or viewBox | Maximum CSS paint size / fit / crop | Target DPR / required pixels / effective density | Density result / artwork inspection evidence |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

Apply repository-root `.agents/rules/assets.md`. Record detail, crop, alpha, and effects checks. Missing or failed source-quality/density checks prevent package `ready`; browser resource and sharpness checks belong to implementation acceptance.

- Fonts (family / weight / style / source / available or accepted fallback, per [font rules](../rules/assets.md#fonts)):

## Tokens and reuse

| Figma variable / style | Figma value | Project token | Project value | Match / mismatch decision |
| --- | --- | --- | --- | --- |
| | | | | |

| Figma component | Code Connect match (path / symbol) | Project component to reuse or "missing primitive" |
| --- | --- | --- |
| | | |

- Material mismatches and decisions:
- Exact visible text and content/fixture sources:
- Missing responsive variants or state references:
- Observed facts vs inferred decisions:
- Blocking gaps, required decisions, and owners (extractor for design; coordinator/user for product/API behavior):

## Assumptions

Only for `ready-with-assumptions` ([rules](../skills/design-extractor/SKILL.md#ready-with-assumptions)). Empty otherwise.

| Assumption | Basis (observed evidence) | Affects (variant / checks) | Risk if wrong | Source requested from / verification | State: open / confirmed / replaced |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

## Behavior and acceptance

| User action / state | Expected result and assertion | Data source / read or write / fixture or real integration | Requirement or code evidence |
| --- | --- | --- | --- |
| | | | |

- Applicable loading, empty, error, validation, and permission states:
- Required semantics, navigation, keyboard, and focus behavior:
- Not applicable behavior and bounded assumptions:

Specify behavior required by the task; do not invent backend or API requirements from visual references.

## Worker handoff

- Coordinator (or single agent), owned files, and shared dependencies/owners:
- Validation route/setup and acceptance criteria:
- Local budget and ceiling (see [workflow](../workflows/visual-validation.md)), consumed rounds, extensions used:
- Integration budget and ceiling when required, consumed rounds, extensions used:
- Integration required / not applicable and reason; handoff is `local-pass` after local acceptance when integration is pending:

Readiness criteria: repository-root `.agents/skills/design-extractor/SKILL.md`.
