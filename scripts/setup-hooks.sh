#!/bin/bash
# Setup script to install git hooks for ~/.claude/
# Run this after cloning on a new machine

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOOKS_DIR="$SCRIPT_DIR/hooks"
GIT_HOOKS_DIR="$SCRIPT_DIR/../.git/hooks"

echo "Installing git hooks..."

# Copy each hook
for hook in pre-commit commit-msg pre-push; do
    if [ -f "$HOOKS_DIR/$hook.sh" ]; then
        cp "$HOOKS_DIR/$hook.sh" "$GIT_HOOKS_DIR/$hook"
        chmod +x "$GIT_HOOKS_DIR/$hook"
        echo "  ✓ Installed $hook"
    else
        echo "  ⚠ $hook.sh not found in $HOOKS_DIR"
    fi
done

echo ""
echo "Git hooks installed successfully!"
echo ""
echo "Hooks enabled:"
echo "  - pre-commit: Secret detection, CHANGELOG reminder, validation"
echo "  - commit-msg: Conventional commit format enforcement"
echo "  - pre-push: Force-push protection, remote validation"
