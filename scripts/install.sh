#!/usr/bin/env bash
#
# Claude Code Toolkit - Installation Script
#
# Usage (fresh install):
#   curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh | bash
#
# Or download and review first:
#   curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh -o install.sh
#   cat install.sh  # review
#   bash install.sh
#
# For Windows: Run in Git Bash (included with Git for Windows)
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

REPO_URL="https://github.com/travisjneuman/.claude.git"
CLAUDE_DIR="$HOME/.claude"

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║           Claude Code Toolkit - Installation                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# =============================================================================
# Prerequisites Check
# =============================================================================

echo -e "${YELLOW}Checking prerequisites...${NC}"

check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "  ${GREEN}✓${NC} $1 found"
        return 0
    else
        echo -e "  ${RED}✗${NC} $1 not found"
        return 1
    fi
}

MISSING=0

check_command "git" || MISSING=1
check_command "node" || MISSING=1

# Check for Claude Code
if command -v claude &> /dev/null; then
    echo -e "  ${GREEN}✓${NC} claude-code found"
else
    echo -e "  ${RED}✗${NC} claude-code not found"
    echo -e "     Install with: ${YELLOW}npm install -g @anthropic-ai/claude-code${NC}"
    MISSING=1
fi

if [ $MISSING -eq 1 ]; then
    echo ""
    echo -e "${RED}Missing prerequisites. Please install them and re-run.${NC}"
    exit 1
fi

echo ""

# =============================================================================
# Detect Platform
# =============================================================================

detect_platform() {
    case "$(uname -s)" in
        Darwin*)  echo "macos" ;;
        Linux*)   echo "linux" ;;
        MINGW*|MSYS*|CYGWIN*) echo "windows" ;;
        *)        echo "unknown" ;;
    esac
}

PLATFORM=$(detect_platform)
echo -e "${BLUE}Detected platform:${NC} $PLATFORM"
echo ""

# =============================================================================
# Handle Existing Installation
# =============================================================================

if [ -d "$CLAUDE_DIR" ]; then
    echo -e "${YELLOW}Existing ~/.claude directory found.${NC}"

    if [ -d "$CLAUDE_DIR/.git" ]; then
        echo "This appears to be a git repository."
        echo ""
        echo "Options:"
        echo "  1) Update existing installation (git pull)"
        echo "  2) Backup and replace with fresh install"
        echo "  3) Cancel"
        echo ""
        read -p "Choose [1/2/3]: " choice

        case $choice in
            1)
                echo ""
                echo -e "${BLUE}Updating existing installation...${NC}"
                cd "$CLAUDE_DIR"
                git pull origin master
                git submodule update --init --recursive
                # Continue to configuration steps below
                ;;
            2)
                BACKUP_DIR="$HOME/.claude-backup-$(date +%Y%m%d-%H%M%S)"
                echo ""
                echo -e "${YELLOW}Backing up to $BACKUP_DIR${NC}"
                mv "$CLAUDE_DIR" "$BACKUP_DIR"
                echo -e "${GREEN}Backup complete.${NC}"
                # Will proceed to fresh clone below
                ;;
            3)
                echo "Cancelled."
                exit 0
                ;;
            *)
                echo "Invalid choice. Cancelled."
                exit 1
                ;;
        esac
    else
        echo "This is not a git repository. Cannot update automatically."
        echo "Please backup/remove ~/.claude manually and re-run."
        exit 1
    fi
fi

# =============================================================================
# Clone Repository
# =============================================================================

if [ ! -d "$CLAUDE_DIR" ]; then
    echo -e "${BLUE}Cloning Claude Code Toolkit...${NC}"
    git clone --recurse-submodules "$REPO_URL" "$CLAUDE_DIR"
    echo -e "${GREEN}Clone complete.${NC}"
    echo ""
fi

cd "$CLAUDE_DIR"

# =============================================================================
# Configure Submodules (Read-Only)
# =============================================================================

echo -e "${BLUE}Configuring marketplace repos as read-only...${NC}"

for repo in plugins/marketplaces/*/; do
    if [ -d "$repo/.git" ] || [ -f "$repo/.git" ]; then
        (cd "$repo" && git remote set-url --push origin no_push 2>/dev/null || true)
    fi
done

echo -e "${GREEN}Marketplace repos configured (fetch-only, no push).${NC}"
echo ""

# =============================================================================
# Make Scripts Executable
# =============================================================================

echo -e "${BLUE}Making scripts executable...${NC}"

find "$CLAUDE_DIR/scripts" -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true

echo -e "${GREEN}Scripts configured.${NC}"
echo ""

# =============================================================================
# Create Platform-Specific MCP Config
# =============================================================================

MCP_FILE="$CLAUDE_DIR/.mcp.json"

if [ ! -f "$MCP_FILE" ]; then
    echo -e "${BLUE}Creating platform-specific MCP configuration...${NC}"

    if [ "$PLATFORM" = "windows" ]; then
        cat > "$MCP_FILE" << 'MCPEOF'
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@anthropic-ai/mcp-sequential-thinking"]
    },
    "memory": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@anthropic-ai/mcp-memory"]
    },
    "filesystem": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@anthropic-ai/mcp-filesystem", "--allow-dir", "%USERPROFILE%"]
    }
  }
}
MCPEOF
    else
        cat > "$MCP_FILE" << 'MCPEOF'
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-sequential-thinking"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-memory"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-filesystem", "--allow-dir", "$HOME"]
    }
  }
}
MCPEOF
    fi

    echo -e "${GREEN}MCP configuration created.${NC}"
else
    echo -e "${YELLOW}MCP configuration already exists, skipping.${NC}"
fi
echo ""

# =============================================================================
# Verification
# =============================================================================

echo -e "${BLUE}Verifying installation...${NC}"

ERRORS=0

# Check key files exist
check_file() {
    if [ -f "$1" ]; then
        echo -e "  ${GREEN}✓${NC} $2"
    else
        echo -e "  ${RED}✗${NC} $2 missing"
        ERRORS=$((ERRORS + 1))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "  ${GREEN}✓${NC} $2"
    else
        echo -e "  ${RED}✗${NC} $2 missing"
        ERRORS=$((ERRORS + 1))
    fi
}

check_file "$CLAUDE_DIR/CLAUDE.md" "CLAUDE.md (core rules)"
check_file "$CLAUDE_DIR/settings.json" "settings.json (configuration)"
check_file "$CLAUDE_DIR/scripts/hooks/session-start.sh" "SessionStart hook (auto-routing)"
check_dir "$CLAUDE_DIR/skills" "Skills directory"
check_dir "$CLAUDE_DIR/agents" "Agents directory"
check_dir "$CLAUDE_DIR/commands" "Commands directory"
check_dir "$CLAUDE_DIR/plugins/marketplaces" "Marketplace plugins"

# Count marketplace repos
MARKETPLACE_COUNT=$(find "$CLAUDE_DIR/plugins/marketplaces" -maxdepth 1 -type d | wc -l)
MARKETPLACE_COUNT=$((MARKETPLACE_COUNT - 1))  # Subtract the parent directory
echo -e "  ${GREEN}✓${NC} $MARKETPLACE_COUNT marketplace repos"

echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              Installation Complete!                           ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Run 'claude' to start Claude Code"
    echo "  2. Authenticate when prompted"
    echo "  3. Run '/doctor' to verify setup"
    echo "  4. Run '/bootstrap' to check configuration"
    echo ""
    echo "Documentation: ~/.claude/docs/SETUP-GUIDE.md"
    echo ""
else
    echo -e "${RED}Installation completed with $ERRORS error(s).${NC}"
    echo "Please check the issues above and re-run or fix manually."
    exit 1
fi
