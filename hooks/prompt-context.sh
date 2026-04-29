#!/bin/bash
# UserPromptSubmit hook: Inject git context (with caching)
# Caches output based on .git/index mtime to avoid redundant git calls

git rev-parse --is-inside-work-tree &>/dev/null 2>&1 || exit 0

GIT_DIR=$(git rev-parse --git-dir 2>/dev/null)
CACHE_FILE="$GIT_DIR/.claude-prompt-cache"
INDEX_FILE="$GIT_DIR/index"

# Git index mtime (changes on add/commit/checkout/reset)
INDEX_MTIME=$(stat -c%Y "$INDEX_FILE" 2>/dev/null || stat -f%m "$INDEX_FILE" 2>/dev/null || echo 0)

# Return cache if still valid
if [ -f "$CACHE_FILE" ]; then
  CACHED_MTIME=$(head -1 "$CACHE_FILE")
  if [ "$CACHED_MTIME" = "$INDEX_MTIME" ]; then
    tail -n +2 "$CACHE_FILE"
    exit 0
  fi
fi

# Cache miss — regenerate
BRANCH=$(git branch --show-current 2>/dev/null)
LAST_COMMIT=$(git log --oneline -1 2>/dev/null)
DIRTY=$(git diff --stat --cached 2>/dev/null | tail -1)
UNSTAGED=$(git diff --stat 2>/dev/null | tail -1)

OUTPUT="[Git: $BRANCH | Last: $LAST_COMMIT]"
[ -n "$DIRTY" ] && OUTPUT="$OUTPUT
[Staged: $DIRTY]"
[ -n "$UNSTAGED" ] && OUTPUT="$OUTPUT
[Unstaged: $UNSTAGED]"

# Write cache (inside .git/, never committed)
echo "$INDEX_MTIME" > "$CACHE_FILE"
echo "$OUTPUT" >> "$CACHE_FILE"

echo "$OUTPUT"
exit 0
