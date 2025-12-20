#!/bin/bash
# Update all marketplace repos (including get-shit-done)
# Run from anywhere: bash ~/.claude/scripts/update-marketplaces.sh

cd ~/.claude

echo "=== Updating all marketplace submodules ==="
git submodule update --remote --merge plugins/marketplaces/

echo ""
echo "=== Setting no_push on all (safety check) ==="
for repo in plugins/marketplaces/*/; do
    (cd "$repo" && git remote set-url --push origin no_push 2>/dev/null)
    echo "  ✓ $(basename $repo)"
done

echo ""
echo "=== Done ==="
