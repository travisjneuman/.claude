#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Setup script for new machines
# Run from ~/.claude directory after cloning the repo
#
# Usage:
#   cd ~/.claude
#   bash scripts/setup-new-machine.sh
#
# What this does:
#   1. Initializes all git submodules (22 external repos)
#   2. Configures no_push protection on all external repos
#   3. Registers required marketplaces with Claude Code
#   4. Installs all enabled plugins
#   5. Verifies the setup
# ═══════════════════════════════════════════════════════════════════════════════

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Claude Code Toolkit - New Machine Setup${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Verify we're in the right directory
if [ ! -f "CLAUDE.md" ]; then
    echo -e "${RED}Error: CLAUDE.md not found. Please run this from ~/.claude directory${NC}"
    exit 1
fi

# ═══════════════════════════════════════════════════════════════════════════════
# Step 1: Initialize submodules
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 1/5: Initializing git submodules...${NC}"
git submodule update --init --recursive
echo -e "${GREEN}  ✓ Submodules initialized${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 2: Configure no_push protection
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 2/5: Configuring no_push protection on external repos...${NC}"
for dir in plugins/marketplaces/*/; do
    if [ -d "$dir" ]; then
        name=$(basename "$dir")
        (cd "$dir" && git remote set-url --push origin no_push 2>/dev/null) && \
            echo -e "  ✓ $name: no_push configured" || \
            echo -e "  ${RED}✗ $name: failed to configure${NC}"
    fi
done
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 3: Register marketplaces with Claude Code
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 3/5: Registering marketplaces with Claude Code...${NC}"

# claude-code-plugins (must use GitHub source - name is reserved)
echo "  Adding claude-code-plugins..."
claude plugin marketplace add anthropics/claude-code 2>/dev/null && \
    echo -e "  ${GREEN}✓ claude-code-plugins${NC}" || \
    echo -e "  ${YELLOW}⚠ claude-code-plugins (may already exist)${NC}"

# anthropic-agent-skills (directory source)
echo "  Adding anthropic-agent-skills..."
claude plugin marketplace add "$HOME/.claude/plugins/marketplaces/anthropic-agent-skills" 2>/dev/null && \
    echo -e "  ${GREEN}✓ anthropic-agent-skills${NC}" || \
    echo -e "  ${YELLOW}⚠ anthropic-agent-skills (may already exist)${NC}"

# taches-cc-resources (directory source)
echo "  Adding taches-cc-resources..."
claude plugin marketplace add "$HOME/.claude/plugins/marketplaces/taches-cc-resources" 2>/dev/null && \
    echo -e "  ${GREEN}✓ taches-cc-resources${NC}" || \
    echo -e "  ${YELLOW}⚠ taches-cc-resources (may already exist)${NC}"

# obra-superpowers (directory source)
echo "  Adding superpowers-marketplace..."
claude plugin marketplace add "$HOME/.claude/plugins/marketplaces/obra-superpowers" 2>/dev/null && \
    echo -e "  ${GREEN}✓ superpowers-marketplace${NC}" || \
    echo -e "  ${YELLOW}⚠ superpowers-marketplace (may already exist)${NC}"

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 4: Install enabled plugins
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 4/5: Installing enabled plugins...${NC}"

# From claude-code-plugins
CLAUDE_CODE_PLUGINS=(
    "agent-sdk-dev"
    "pr-review-toolkit"
    "commit-commands"
    "feature-dev"
    "security-guidance"
    "code-review"
    "frontend-design"
    "claude-opus-4-5-migration"
    "plugin-dev"
    "ralph-wiggum"
)

for plugin in "${CLAUDE_CODE_PLUGINS[@]}"; do
    claude plugin install "${plugin}@claude-code-plugins" 2>/dev/null && \
        echo -e "  ${GREEN}✓ ${plugin}${NC}" || \
        echo -e "  ${YELLOW}⚠ ${plugin} (may already be installed)${NC}"
done

# From anthropic-agent-skills
claude plugin install "document-skills@anthropic-agent-skills" 2>/dev/null && \
    echo -e "  ${GREEN}✓ document-skills${NC}" || \
    echo -e "  ${YELLOW}⚠ document-skills (may already be installed)${NC}"

claude plugin install "example-skills@anthropic-agent-skills" 2>/dev/null && \
    echo -e "  ${GREEN}✓ example-skills${NC}" || \
    echo -e "  ${YELLOW}⚠ example-skills (may already be installed)${NC}"

# From taches-cc-resources
claude plugin install "taches-cc-resources@taches-cc-resources" 2>/dev/null && \
    echo -e "  ${GREEN}✓ taches-cc-resources${NC}" || \
    echo -e "  ${YELLOW}⚠ taches-cc-resources (may already be installed)${NC}"

# From superpowers-marketplace
claude plugin install "superpowers@superpowers-marketplace" 2>/dev/null && \
    echo -e "  ${GREEN}✓ superpowers${NC}" || \
    echo -e "  ${YELLOW}⚠ superpowers (may already be installed)${NC}"

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 5: Re-apply no_push (Claude may have overwritten during marketplace add)
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 5/5: Re-applying no_push protection...${NC}"
for dir in plugins/marketplaces/*/; do
    if [ -d "$dir" ]; then
        (cd "$dir" && git remote set-url --push origin no_push 2>/dev/null) || true
    fi
done
echo -e "${GREEN}  ✓ no_push protection restored${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Complete
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Next steps:"
echo "  1. Run 'claude doctor' to verify setup"
echo "  2. Start Claude Code with 'claude'"
echo "  3. Try '/start-task' to test the router"
echo ""
echo "If claude doctor shows errors, try:"
echo "  bash scripts/update-external-repos.sh"
echo ""
