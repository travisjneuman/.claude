#!/bin/bash
# Update all marketplace repos and fix remote URLs
# Run from anywhere: bash ~/.claude/scripts/update-marketplaces.sh

cd ~/.claude

echo "=== Updating all marketplace submodules ==="
git submodule update --remote --merge plugins/marketplaces/

echo ""
echo "=== Fixing remote URLs ==="

# Ensure parent repo can push (use fetch URL for push)
PARENT_URL=$(git remote get-url origin)
git remote set-url --push origin "$PARENT_URL"
echo "  ✓ Parent repo - push enabled"

# Set no_push on marketplace submodules only
for repo in plugins/marketplaces/*/; do
    if [ -d "$repo/.git" ] || [ -f "$repo/.git" ]; then
        (cd "$repo" && git remote set-url --push origin no_push 2>/dev/null)
        echo "  ✓ $(basename $repo) - no_push set"
    fi
done

# Ensure push doesn't recurse into submodules
git config push.recurseSubmodules no

echo ""
echo "=== Done ==="
