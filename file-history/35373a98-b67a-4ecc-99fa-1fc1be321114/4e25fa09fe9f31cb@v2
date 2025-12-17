# Investigation Complete: Plan Storage Behavior

## Summary

Two planning systems exist - this is by design, not a bug:

| System | Storage | Purpose | Git Sync |
|--------|---------|---------|----------|
| Built-in Plan Mode | `~/.claude/plans/` | Exploratory, quick | No |
| `/create-plan` skill | `<project>/.planning/` | Persistent project docs | Yes |

## Decision

**Accept current behavior.** The two systems serve different purposes:

1. **Built-in Plan Mode** is for Claude Code's internal exploration before making changes
2. **`/create-plan` skill** is for proper project planning that syncs to GitHub

## Action Taken

Organized existing plan files by project in `~/.claude/plans/`:
- `neuman-brain/` (16 files)
- `thedeadrobot/` (2 files)
- `oakstone-properties/` (1 file)
- `lazy-golfing/` (1 file)
- `notes-migration/` (1 file)
- `claude-config/` (2 files)
- `meta/` (2 files)

Created `plans/CLAUDE.md` with organization guidelines.

## No Further Changes Needed

The `/start-task` command already routes planning tasks to `/create-plan` when keywords are detected.
The current setup is correct.
