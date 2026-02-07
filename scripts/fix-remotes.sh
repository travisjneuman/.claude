#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Fix Remote URLs for ~/.claude Repository
#
# CROSS-PLATFORM: Works on Arch Linux, macOS, Windows (Git Bash)
#
# This script ensures:
#   - Main ~/.claude repo CAN push to GitHub (your personal repo)
#   - Marketplace repos CANNOT push (read-only from upstream)
#   - Marketplace repos have CORRECT fetch URLs (original upstreams)
#
# Usage:
#   bash ~/.claude/scripts/fix-remotes.sh
#
# Run this after cloning on a new device to fix any remote configuration issues.
# ═══════════════════════════════════════════════════════════════════════════════

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Determine home directory (cross-platform)
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CLAUDE_DIR="$USERPROFILE/.claude"
    CLAUDE_DIR=$(cygpath -u "$CLAUDE_DIR" 2>/dev/null || echo "$HOME/.claude")
else
    CLAUDE_DIR="$HOME/.claude"
fi

cd "$CLAUDE_DIR" || {
    echo -e "${RED}Error: Cannot access $CLAUDE_DIR${NC}"
    exit 1
}

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Remote URL Fixer - Cross-Platform${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 1: Fix main repo (should push to user's GitHub)
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 1: Fixing main ~/.claude repo...${NC}"

EXPECTED_URL="https://github.com/travisjneuman/.claude.git"
CURRENT_FETCH=$(git remote get-url origin 2>/dev/null || echo "none")
CURRENT_PUSH=$(git remote get-url --push origin 2>/dev/null || echo "none")

echo "  Current fetch: $CURRENT_FETCH"
echo "  Current push:  $CURRENT_PUSH"

if [[ "$CURRENT_FETCH" != *"travisjneuman/.claude"* ]] || [[ "$CURRENT_PUSH" == "no_push" ]]; then
    git remote set-url origin "$EXPECTED_URL"
    git remote set-url --push origin "$EXPECTED_URL"
    echo -e "  ${GREEN}✓ Fixed: fetch and push set to $EXPECTED_URL${NC}"
else
    echo -e "  ${GREEN}✓ Already correct${NC}"
fi
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 2: Define correct upstream URLs for marketplace repos
# ═══════════════════════════════════════════════════════════════════════════════
declare -A UPSTREAMS
UPSTREAMS=(
    ["alirezarezvani-claude-skills"]="https://github.com/alirezarezvani/claude-skills.git"
    ["alvinunreal-awesome-claude"]="https://github.com/alvinunreal/awesome-claude.git"
    ["anthropic-agent-skills"]="https://github.com/anthropics/skills.git"
    ["auto-claude"]="https://github.com/AndyMik90/Auto-Claude.git"
    ["awesome-claude-skills"]="https://github.com/ComposioHQ/awesome-claude-skills.git"
    ["behisecc-awesome-claude-skills"]="https://github.com/BehiSecc/awesome-claude-skills.git"
    ["claude-code-plugins"]="https://github.com/anthropics/claude-code.git"
    ["claude-code-plugins-plus-skills"]="https://github.com/jeremylongshore/claude-code-plugins-plus-skills.git"
    ["claude-mem"]="https://github.com/thedotmack/claude-mem.git"
    ["claude-plugins-official"]="https://github.com/anthropics/claude-plugins-official.git"
    ["claude-scientific-skills"]="https://github.com/K-Dense-AI/claude-scientific-skills.git"
    ["get-shit-done"]="https://github.com/glittercowboy/get-shit-done.git"
    ["hesreallyhim-awesome-claude-code"]="https://github.com/hesreallyhim/awesome-claude-code.git"
    ["mhattingpete-skills"]="https://github.com/mhattingpete/claude-skills-marketplace.git"
    ["obra-superpowers"]="https://github.com/obra/superpowers.git"
    ["skill-seekers"]="https://github.com/yusufkaraaslan/Skill_Seekers.git"
    ["skillsforge"]="https://github.com/rawveg/skillsforge-marketplace.git"
    ["taches-cc-resources"]="https://github.com/glittercowboy/taches-cc-resources.git"
    ["travisvn-awesome-claude-skills"]="https://github.com/travisvn/awesome-claude-skills.git"
    ["voltagent-awesome-claude-skills"]="https://github.com/VoltAgent/awesome-claude-skills.git"
    ["voltagent-subagents"]="https://github.com/VoltAgent/awesome-claude-code-subagents.git"
    ["wshobson-agents"]="https://github.com/wshobson/agents.git"
)

# ═══════════════════════════════════════════════════════════════════════════════
# Step 3: Fix marketplace repos
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 2: Fixing marketplace repo remotes...${NC}"

FIXED=0
ALREADY_OK=0
MISSING=0

for repo in plugins/marketplaces/*/; do
    if [ -d "$repo" ]; then
        name=$(basename "$repo")
        expected_url="${UPSTREAMS[$name]}"

        if [ -z "$expected_url" ]; then
            echo -e "  ${YELLOW}⚠ $name: Unknown repo (not in upstream list)${NC}"
            continue
        fi

        # Check if .git exists
        if [ ! -d "$repo/.git" ] && [ ! -f "$repo/.git" ]; then
            echo -e "  ${RED}✗ $name: Not a git repo (run init-marketplaces.sh)${NC}"
            MISSING=$((MISSING + 1))
            continue
        fi

        current_fetch=$(cd "$repo" && git remote get-url origin 2>/dev/null || echo "none")
        current_push=$(cd "$repo" && git remote get-url --push origin 2>/dev/null || echo "none")

        needs_fix=false

        # Check if fetch URL is wrong
        if [ "$current_fetch" != "$expected_url" ]; then
            needs_fix=true
        fi

        # Check if push is not blocked
        if [ "$current_push" != "no_push" ]; then
            needs_fix=true
        fi

        if $needs_fix; then
            (cd "$repo" && git remote set-url origin "$expected_url")
            (cd "$repo" && git remote set-url --push origin no_push)
            echo -e "  ${GREEN}✓ $name: Fixed (fetch: upstream, push: blocked)${NC}"
            FIXED=$((FIXED + 1))
        else
            ALREADY_OK=$((ALREADY_OK + 1))
        fi
    fi
done

echo ""
echo -e "  Fixed:      ${GREEN}$FIXED${NC}"
echo -e "  Already OK: ${GREEN}$ALREADY_OK${NC}"
echo -e "  Missing:    ${YELLOW}$MISSING${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 4: Set git config to prevent recursive pushes
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Step 3: Setting push.recurseSubmodules = no...${NC}"
git config push.recurseSubmodules no 2>/dev/null || true
echo -e "  ${GREEN}✓ Done${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Summary
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Remote Fix Complete${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo "Configuration:"
echo "  ~/.claude (main):      CAN push to travisjneuman/.claude"
echo "  plugins/marketplaces:  CANNOT push (read-only from upstream)"
echo ""

if [ $MISSING -gt 0 ]; then
    echo -e "${YELLOW}Note: $MISSING repos are missing. Run:${NC}"
    echo "  bash ~/.claude/scripts/init-marketplaces.sh"
    echo ""
fi
