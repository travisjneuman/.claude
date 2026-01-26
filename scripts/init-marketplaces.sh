#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
# Initialize/Reinitialize Marketplace Repos with Correct Upstream Remotes
#
# CROSS-PLATFORM: Works on Arch Linux, macOS, Windows (Git Bash)
#
# This script ensures all marketplace repos:
#   1. Are cloned fresh from their original upstream sources
#   2. Have push disabled (no_push) to prevent accidental modifications
#   3. Are configured identically regardless of which machine you're on
#
# Usage:
#   bash ~/.claude/scripts/init-marketplaces.sh
#
# When to run:
#   - After cloning ~/.claude on a new machine
#   - When marketplace repos have wrong remotes
#   - When you want to sync fresh from all upstreams
# ═══════════════════════════════════════════════════════════════════════════════

set -e

# Colors (works on all platforms with bash)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Determine home directory (cross-platform)
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CLAUDE_DIR="$USERPROFILE/.claude"
    # Convert Windows path to Unix-style for Git Bash
    CLAUDE_DIR=$(cygpath -u "$CLAUDE_DIR" 2>/dev/null || echo "$HOME/.claude")
else
    CLAUDE_DIR="$HOME/.claude"
fi

MARKETPLACES_DIR="$CLAUDE_DIR/plugins/marketplaces"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Marketplace Repository Initializer${NC}"
echo -e "${BLUE}  Cross-Platform: Arch Linux | macOS | Windows${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Verify directory exists
if [ ! -d "$CLAUDE_DIR" ]; then
    echo -e "${RED}Error: $CLAUDE_DIR does not exist${NC}"
    echo "Please clone the repo first: git clone https://github.com/travisjneuman/.claude.git ~/.claude"
    exit 1
fi

cd "$CLAUDE_DIR"

# ═══════════════════════════════════════════════════════════════════════════════
# Define all marketplace repos with their upstream URLs
# Format: "directory-name|upstream-url"
# ═══════════════════════════════════════════════════════════════════════════════
REPOS=(
    "alirezarezvani-claude-skills|https://github.com/alirezarezvani/claude-skills.git"
    "alvinunreal-awesome-claude|https://github.com/alvinunreal/awesome-claude.git"
    "anthropic-agent-skills|https://github.com/anthropics/skills.git"
    "auto-claude|https://github.com/AndyMik90/Auto-Claude.git"
    "awesome-claude-skills|https://github.com/ComposioHQ/awesome-claude-skills.git"
    "behisecc-awesome-claude-skills|https://github.com/BehiSecc/awesome-claude-skills.git"
    "claude-code-plugins|https://github.com/anthropics/claude-code.git"
    "claude-code-plugins-plus-skills|https://github.com/jeremylongshore/claude-code-plugins-plus-skills.git"
    "claude-mem|https://github.com/thedotmack/claude-mem.git"
    "claude-plugins-official|https://github.com/anthropics/claude-plugins-official.git"
    "claude-scientific-skills|https://github.com/K-Dense-AI/claude-scientific-skills.git"
    "get-shit-done|https://github.com/glittercowboy/get-shit-done.git"
    "hesreallyhim-awesome-claude-code|https://github.com/hesreallyhim/awesome-claude-code.git"
    "mhattingpete-skills|https://github.com/mhattingpete/claude-skills-marketplace.git"
    "obra-superpowers|https://github.com/obra/superpowers-marketplace.git"
    "skill-seekers|https://github.com/yusufkaraaslan/Skill_Seekers.git"
    "skillsforge|https://github.com/rawveg/skillsforge-marketplace.git"
    "taches-cc-resources|https://github.com/glittercowboy/taches-cc-resources.git"
    "travisvn-awesome-claude-skills|https://github.com/travisvn/awesome-claude-skills.git"
    "voltagent-awesome-claude-skills|https://github.com/VoltAgent/awesome-claude-skills.git"
    "voltagent-subagents|https://github.com/VoltAgent/awesome-claude-code-subagents.git"
    "wshobson-agents|https://github.com/wshobson/agents.git"
)

TOTAL_REPOS=${#REPOS[@]}
echo -e "${YELLOW}Initializing $TOTAL_REPOS marketplace repositories...${NC}"
echo ""

# Create marketplaces directory if it doesn't exist
mkdir -p "$MARKETPLACES_DIR"
cd "$MARKETPLACES_DIR"

# ═══════════════════════════════════════════════════════════════════════════════
# Clone/reinitialize each repo
# ═══════════════════════════════════════════════════════════════════════════════
SUCCESS=0
FAILED=0

for repo_info in "${REPOS[@]}"; do
    name="${repo_info%%|*}"
    url="${repo_info##*|}"

    echo -e "${YELLOW}[$((SUCCESS + FAILED + 1))/$TOTAL_REPOS] $name${NC}"

    # Check if directory exists and has correct remote
    if [ -d "$name/.git" ]; then
        current_url=$(cd "$name" && git remote get-url origin 2>/dev/null || echo "")
        current_push=$(cd "$name" && git remote get-url --push origin 2>/dev/null || echo "")

        if [ "$current_url" = "$url" ] && [ "$current_push" = "no_push" ]; then
            echo -e "  ${GREEN}✓ Already configured correctly${NC}"
            SUCCESS=$((SUCCESS + 1))
            continue
        fi
    fi

    # Remove existing directory and clone fresh
    rm -rf "$name"

    if git clone --depth 1 "$url" "$name" 2>/dev/null; then
        # Set no_push
        (cd "$name" && git remote set-url --push origin no_push)
        echo -e "  ${GREEN}✓ Cloned and configured${NC}"
        SUCCESS=$((SUCCESS + 1))
    else
        echo -e "  ${RED}✗ Failed to clone${NC}"
        FAILED=$((FAILED + 1))
    fi
done

echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Fix main repo remote (ensure it points to user's repo, not an upstream)
# ═══════════════════════════════════════════════════════════════════════════════
echo -e "${YELLOW}Verifying main repo configuration...${NC}"
cd "$CLAUDE_DIR"

MAIN_FETCH=$(git remote get-url origin 2>/dev/null || echo "")
MAIN_PUSH=$(git remote get-url --push origin 2>/dev/null || echo "")

# The main repo should push to travisjneuman/.claude
if [[ "$MAIN_PUSH" == *"travisjneuman/.claude"* ]]; then
    echo -e "  ${GREEN}✓ Main repo can push to travisjneuman/.claude${NC}"
else
    echo -e "  ${YELLOW}⚠ Fixing main repo push URL...${NC}"
    git remote set-url origin https://github.com/travisjneuman/.claude.git
    git remote set-url --push origin https://github.com/travisjneuman/.claude.git
    echo -e "  ${GREEN}✓ Main repo configured for push/pull${NC}"
fi

# Prevent recursive submodule pushes
git config push.recurseSubmodules no 2>/dev/null || true

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Initialization Complete${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Successful: ${GREEN}$SUCCESS${NC}"
echo -e "  Failed:     ${RED}$FAILED${NC}"
echo ""
echo "Configuration:"
echo "  - Main ~/.claude repo: CAN push to GitHub (your repo)"
echo "  - Marketplace repos:   CANNOT push (read-only from upstream)"
echo ""
echo "Next steps:"
echo "  1. Run: bash ~/.claude/scripts/setup-new-machine.sh"
echo "  2. Start Claude Code: claude"
echo ""
