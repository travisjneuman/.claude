#!/bin/bash
# Update all external repositories (submodules and nested repos)
# These are read-only - we fetch updates but never push

set -e

CLAUDE_DIR="$HOME/.claude"
cd "$CLAUDE_DIR"

echo "=== Updating External Repositories ==="
echo ""

# Update git submodules (get-shit-done)
echo "Updating submodules..."
git submodule update --remote --merge
echo "  ✓ Submodules updated"
echo ""

# Update marketplace repos (nested git repos with no_push)
echo "Updating marketplace repos..."
for repo in plugins/marketplaces/*/; do
    if [ -d "$repo/.git" ]; then
        name=$(basename "$repo")
        echo "  Updating $name..."
        (cd "$repo" && git fetch origin && git merge origin/main --no-edit 2>/dev/null || git merge origin/master --no-edit 2>/dev/null || true)
        echo "    ✓ $name updated"
    fi
done
echo ""

echo "=== All external repos updated ==="
echo ""
echo "Note: These repos are read-only (push URL set to 'no_push')"
echo "To apply updates to your main repo, commit the submodule changes:"
echo "  git add get-shit-done plugins/marketplaces"
echo "  git commit -m 'chore: update external repos'"
