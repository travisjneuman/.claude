#!/bin/bash
# Update all external repositories (submodules in plugins/marketplaces/)
# These are read-only - we fetch updates but never push

set -e

CLAUDE_DIR="$HOME/.claude"
cd "$CLAUDE_DIR"

echo "=== Updating External Repositories ==="
echo ""
echo "All external repos are in plugins/marketplaces/:"
echo "  - anthropic-agent-skills"
echo "  - claude-code-plugins"
echo "  - claude-plugins-official"
echo "  - taches-cc-resources"
echo "  - get-shit-done"
echo "  - awesome-claude-skills"
echo "  - claude-mem"
echo "  - skill-seekers"
echo "  - claude-scientific-skills"
echo ""

# Update all submodules
echo "Updating submodules..."
git submodule update --remote --merge
echo "  ✓ All submodules updated"
echo ""

# Verify no_push is set on each
echo "Verifying read-only configuration..."
for repo in plugins/marketplaces/*/; do
    if [ -d "$repo" ]; then
        name=$(basename "$repo")
        push_url=$(cd "$repo" && git remote get-url --push origin 2>/dev/null || echo "unknown")
        if [ "$push_url" = "no_push" ]; then
            echo "  ✓ $name: read-only (no_push)"
        else
            echo "  ⚠ $name: push enabled - setting no_push..."
            (cd "$repo" && git remote set-url --push origin no_push)
        fi
    fi
done
echo ""

echo "=== All external repos updated ==="
echo ""
echo "To commit submodule updates:"
echo "  git add plugins/marketplaces"
echo "  git commit -m 'chore: update external repos'"
