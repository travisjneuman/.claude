#!/bin/bash
# Fix remote URLs for .claude repo
# - Ensures parent repo CAN push to GitHub
# - Ensures marketplace submodules CANNOT push (read-only)
#
# Run after cloning: bash ~/.claude/scripts/fix-remotes.sh

cd ~/.claude

echo "=== Fixing .claude repo remotes ==="

# 1. Ensure parent repo can push
PARENT_URL=$(git remote get-url origin)
echo "Parent fetch URL: $PARENT_URL"
git remote set-url --push origin "$PARENT_URL"
echo "Parent push URL: $PARENT_URL (restored)"

# 2. Set no_push on marketplace submodules only
echo ""
echo "=== Setting no_push on marketplace submodules ==="
for repo in plugins/marketplaces/*/; do
    if [ -d "$repo/.git" ] || [ -f "$repo/.git" ]; then
        (cd "$repo" && git remote set-url --push origin no_push 2>/dev/null)
        echo "  ✓ $(basename $repo) - no_push set"
    fi
done

# 3. Set local config to prevent submodule push recursion
git config push.recurseSubmodules no
echo ""
echo "=== Set push.recurseSubmodules = no ==="

echo ""
echo "=== Done! Parent repo can push, submodules cannot. ==="
