---
name: screen-implementer
description: Implement and visually validate a responsive screen from a local design package, covering desktop, tablet, and mobile as one task. Use when a screen package is ready and the screen must be coded and checked against the design.
---

# Screen implementer

**Input:** project profile, code index, ready screen package, owned files, and separate local/integration review budgets and round history.
**Output:** responsive implementation in a dedicated Git worktree and branch, changed files, code-index updates, and a visual review with evidence and consumed rounds.

Follow [responsive rules](../../rules/responsive-design.md), [asset quality rules](../../rules/assets.md), and [figma-to-code rules](../../rules/figma-to-code.md) (for translating spec values; no Figma access). Coding workers have no Figma access.

## Required worktree and branch

Before implementation starts, create a separate worktree and a new branch in the **target application's repository**. This is required whenever this skill is used, including single-agent work. One screen's desktop, tablet, and mobile variants share that worktree and branch.

1. Identify the target repository, inspect its working-tree state and existing worktrees, and resolve the implementation base to a commit. Use the user/coordinator's assigned base; otherwise use the target checkout's current `HEAD`. If the target is not a Git repository or setup fails, record a `blocked` review with the cause; do not fall back to implementation in the original checkout.
2. Create a task-specific branch named `codex/<screen-id>-<task-id>` and a separate worktree outside the original checkout. Normalize IDs for Git branch names and use a unique suffix for collisions; never reset an existing branch or overwrite a worktree. Follow an explicitly requested branch name instead of the default. Resume an existing worktree only when it belongs to this same screen implementation task; independent screen tasks require separate worktrees and branches.
3. Prefer the environment's managed worktree tools when they support the target repository, passing the resolved base explicitly and verifying that a named branch is checked out. Otherwise use `git -C "$target_repo" worktree add -b "$implementation_branch" "$implementation_worktree" "$base_commit"`. Verify the new checkout's path, branch, and base before editing.
4. Make the assigned profile, code index, screen package, and required harness files available in the worktree. Git worktrees do not copy uncommitted or ignored files: transfer only the required local inputs and task-relevant code changes without changing the original checkout, record their provenance, and recheck readiness against the worktree's code. Do not stash, reset, or auto-commit the user's changes. Resolve conflicts or an unclear scope of required uncommitted code with the user/coordinator before coding.
5. Run all implementation edits, dependency setup, application startup, checks, captures, and generated artifact writes from the new worktree. Verify startup/capture commands there, and ensure the captured server serves this checkout. Preserve existing review rounds and budgets when resuming or recovering inputs.
6. Record the original repository path, worktree path, branch, and base commit in the visual review and final handoff. Leave the worktree and branch available for review unless the user/coordinator has assigned integration or cleanup.

## Steps

1. Complete the required worktree and branch setup above. Check package readiness (`ready`, or `ready-with-assumptions` with every assumption listed in the review), provenance against the assigned design revision and worktree code, and verified startup/capture commands in that worktree.
2. Return design gaps to [design-extractor](../design-extractor/SKILL.md) and product/API questions to the coordinator or user. Recheck readiness after recovery; preserve round history and budgets.
3. Implement all responsive variants and specified behavior with the indexed components and tokens, including Code Connect matches from the spec. Never paste reference code from the spec as is.
4. Use the selected production assets. Run `asset-density.mjs` and `crop-tiles.mjs` at DPR 2 (or higher required) and inspect device-pixel crops. Recheck if paint sizes exceed the package bounds.
5. Return source/export failures to the extractor; fix code resource-selection failures locally. Follow the package's fixture/integration scope.
6. Route shared edits through their owner; record required global token changes.
7. Run required project checks, action/result assertions, and [visual validation](../../workflows/visual-validation.md).
8. Follow the workflow's budgets, severity scale, stall rule, and ceiling. At the ceiling stop with `incomplete` and the escalation record; do not continue without user approval.
9. Return changed files, code-index updates, and the review with a status from the workflow. While assumptions are open, the status is at most `local-pass`. Parallel workers hand off as `local-pass` after local acceptance; single-agent work without a separate integration step can finish as `pass`. Record concrete blockers or interrupted work with the workflow's other statuses.
