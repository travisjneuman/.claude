#!/usr/bin/env bash
#
# Claude Code Toolkit - installer for a machine with no ~/.claude yet.
#
# Download, read, then run (don't pipe a download straight into a shell; this
# toolkit's own guard hook blocks that pattern):
#   curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install.sh -o install.sh
#   less install.sh
#   bash install.sh [repo-url]      # repo-url: your own copy if you used the template
#
# What it does: checks for git, node and claude; clones the toolkit to
# ~/.claude (or fast-forward pulls an existing checkout); installs this repo's
# git hooks. Nothing else: no MCP servers, no marketplace clones, no plugins.
# Those are separate, optional steps printed at the end.
#
# Already have a ~/.claude that Claude Code created? Use
# scripts/install-in-place.sh instead; it keeps your existing files.
#
# Windows: run in Git Bash (included with Git for Windows).

set -e

if [ -t 1 ]; then
    RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
else
    RED=''; GREEN=''; YELLOW=''; BLUE=''; NC=''
fi

REPO_URL="${1:-https://github.com/travisjneuman/.claude.git}"
CLAUDE_DIR="$HOME/.claude"

echo -e "${BLUE}Claude Code Toolkit - installation${NC}"
echo ""

# ---- prerequisites ----
MISSING=0
for cmd in git node; do
    if command -v "$cmd" >/dev/null 2>&1; then
        echo -e "  ${GREEN}✓${NC} $cmd found"
    else
        echo -e "  ${RED}✗${NC} $cmd not found"
        MISSING=1
    fi
done
if command -v claude >/dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} claude found"
else
    echo -e "  ${RED}✗${NC} claude not found (install Claude Code first: https://code.claude.com/docs/en/setup)"
    MISSING=1
fi
if [ "$MISSING" -eq 1 ]; then
    echo ""
    echo -e "${RED}Missing prerequisites. Install them and re-run.${NC}"
    exit 1
fi
echo ""

# ---- clone or update ----
if [ -d "$CLAUDE_DIR/.git" ]; then
    echo -e "${BLUE}~/.claude is already a checkout; pulling (fast-forward only)...${NC}"
    git -C "$CLAUDE_DIR" pull --ff-only
elif [ -e "$CLAUDE_DIR" ]; then
    echo -e "${YELLOW}~/.claude already exists and is not a git checkout.${NC}"
    echo "Nothing was changed. To turn it into a toolkit checkout without losing"
    echo "anything, download and run scripts/install-in-place.sh instead:"
    echo "  curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install-in-place.sh -o install-in-place.sh"
    echo "  bash install-in-place.sh"
    exit 1
else
    echo -e "${BLUE}Cloning $REPO_URL to ~/.claude...${NC}"
    git clone "$REPO_URL" "$CLAUDE_DIR"
fi
echo ""

# ---- git hooks for the toolkit repo itself ----
bash "$CLAUDE_DIR/scripts/setup-hooks.sh" >/dev/null && echo -e "  ${GREEN}✓${NC} git hooks installed"

# ---- verify ----
ERRORS=0
for f in CLAUDE.md settings.json hooks/run-hook.js; do
    if [ -f "$CLAUDE_DIR/$f" ]; then echo -e "  ${GREEN}✓${NC} $f"; else echo -e "  ${RED}✗${NC} $f missing"; ERRORS=$((ERRORS + 1)); fi
done
for d in skills agents commands rules; do
    if [ -d "$CLAUDE_DIR/$d" ]; then echo -e "  ${GREEN}✓${NC} $d/"; else echo -e "  ${RED}✗${NC} $d/ missing"; ERRORS=$((ERRORS + 1)); fi
done
echo ""

if [ "$ERRORS" -ne 0 ]; then
    echo -e "${RED}Installation finished with $ERRORS problem(s); see above.${NC}"
    exit 1
fi

echo -e "${GREEN}Installed.${NC} Next steps:"
echo "  1. Read ~/.claude/README.md, section \"What runs on its own\": this toolkit"
echo "     runs Claude Code in bypassPermissions mode and pulls itself daily."
echo "  2. Optional private layer (your GitHub owner, project dirs, private rules):"
echo "       see ~/.claude/local.example/README.md"
echo "  3. Optional community marketplaces (~80 repos, read-only clones):"
echo "       bash ~/.claude/scripts/init-marketplaces.sh"
echo "  4. Start Claude Code: claude    (check the install with: claude doctor)"
echo ""
