# Visual review

Filled example: [example review](../examples/screens/example/visual-review.md).

- Screen ID, route, and implementation revision/working-tree state:
- Original target repository, implementation worktree path, Git branch, and base commit:
- Design source revision (or `unavailable`), extraction date, and contract path:
- Runner, browser, environment, and fixture/state setup:
- Local: base 6, consumed rounds, extensions used (max 2), ceiling 10:
- Integration: base 2 when required, consumed rounds, extensions used (max 2), ceiling 6:
- Integration required / not applicable and reason; coordinator:
- Open package assumptions (cap the status at `local-pass`) and their verification checks:
- Status: pass / local-pass / incomplete / blocked ([definitions and ceilings](../workflows/visual-validation.md))

## Round provenance

| Round | Phase / phase round | Code snapshot / saved patch and source inputs | Changed files since prior round | Package manifest path | Review focus / affected checks |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

Paste or link the `round-manifest.mjs` output per round ([workflow](../workflows/visual-validation.md)). Each evidence row refers to one of these rounds.

## Progress and extensions

- Local round 4 assessment: progress, remaining causes, and acceptance plan:
- Stalls (two rounds without fewer blockers + majors; each uses up one extension and lowers the ceiling by 2), new diagnosis and findings:

| Extension after round / phase | Diagnosed remaining causes | Planned fixes / owner | Affected checks / expected improvement | Added rounds |
| --- | --- | --- | --- | --- |
| | | | | 2 |

- Ceiling escalation (status `incomplete`): remaining differences with severity, causes, decision needed from the user, owners:
- Setup/capture failures (not review rounds), causes, recovery, and any missing checks:

## Evidence

| Round | Viewport / scale / bounds | State | Reference path or contract assertion | Capture / diff path | Finding | Severity (blocker / major / minor / harmless) | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | |

Severity scale: [Severity](../workflows/visual-validation.md#severity). Unfixed minors need a justification; list harmless items individually.

## Outcome

- Asset checks: `asset-density.mjs` output (or the same fields manually), `crop-tiles.mjs` tile paths, and 1:1 sharpness results:
- Diagnosed causes and fixes:
- Behavior/accessibility checks and results:
- Project commands and results:
- Shared changes and affected-screen integration checks:
- Full-matrix final local verification round:
- Reused earlier evidence and why it remains valid:
- Harmless rendering differences and justification:
- Remaining differences, missing checks, or blockers:
- Next action and owner:
