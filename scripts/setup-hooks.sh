#!/bin/bash
# Install this repo's git hooks as thin wrappers that exec the tracked scripts
# in scripts/hooks/, so hook updates arrive with a normal pull.
# Run after cloning: bash ~/.claude/scripts/setup-hooks.sh
set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOKS_DIR="$(git -C "$ROOT" rev-parse --git-path hooks)"
case "$HOOKS_DIR" in /*) ;; *) HOOKS_DIR="$ROOT/$HOOKS_DIR" ;; esac
mkdir -p "$HOOKS_DIR"
for hook in pre-commit commit-msg pre-push; do
  printf '#!/bin/bash\nexec bash "$(git rev-parse --show-toplevel)/scripts/hooks/%s.sh" "$@"\n' "$hook" > "$HOOKS_DIR/$hook"
  chmod +x "$HOOKS_DIR/$hook"
  echo "  installed $hook -> scripts/hooks/$hook.sh"
done
