# Artifacts and statuses

Generated output lives under the artifact root `.agents/artifacts/` (configurable in [design context](../context/design.md)). `.agents/context/` is user input only: no skill writes to it.

```text
project-profile.md          # analyzer: profile and command check results
code-index.md
design-index.md
screens/<screen-id>/
  screen-spec.md
  responsive-contract.md
  references/
  assets/
  validation/round-<n>/     # git-ignored
  visual-review.md
```

Formats: [templates](../templates/). Version control: `validation/` is git-ignored; everything else is committed.

## Statuses for the design index and packages

This is the only status table for indexes and packages.

```text
indexed → extracting → draft → ready
                         ↘ stale (source changed after ready/draft)
                         ↘ blocked (recorded blocker and owner)
```

| Status | Meaning | Set by |
| --- | --- | --- |
| indexed | Screen and variants mapped; not extracted | indexer |
| extracting | Extraction in progress | extractor |
| draft | Package incomplete; blockers recorded | extractor |
| ready | Readiness criteria met ([extractor](../skills/design-extractor/SKILL.md)) | extractor |
| stale | Source or selection changed; re-extract | indexer / extractor |
| blocked | Cannot proceed; blocker and owner recorded | any owner |

Review statuses (`pass`, `local-pass`, `incomplete`, `blocked`) are defined in [visual validation](../workflows/visual-validation.md).
