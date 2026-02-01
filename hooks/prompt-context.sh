#!/bin/bash
# UserPromptSubmit hook: Inject git context into every prompt
# Outputs to stdout which gets appended to Claude's context

# Only inject if we're in a git repo
git rev-parse --is-inside-work-tree &>/dev/null 2>&1 || exit 0

BRANCH=$(git branch --show-current 2>/dev/null)
LAST_COMMIT=$(git log --oneline -1 2>/dev/null)
DIRTY=$(git diff --stat --cached 2>/dev/null | tail -1)
UNSTAGED=$(git diff --stat 2>/dev/null | tail -1)

echo "[Git: $BRANCH | Last: $LAST_COMMIT]"
[ -n "$DIRTY" ] && echo "[Staged: $DIRTY]"
[ -n "$UNSTAGED" ] && echo "[Unstaged: $UNSTAGED]"

exit 0
