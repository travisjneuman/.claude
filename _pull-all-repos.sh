#!/bin/bash
# =============================================================================
# Pull All Repos - Parent + Marketplaces + Custom Directories
# =============================================================================
#
# Cross-platform script (Linux, macOS, Windows via Git Bash) that:
#   1. Pulls the parent ~/.claude repo (travisjneuman/.claude)
#   2. Pulls all marketplace submodules in plugins/marketplaces/
#   3. Enforces no_push on all submodules (prevents accidental pushes)
#   4. Pulls all git repos in your custom project directories (optional)
#   5. Updates documentation counts if any repos changed (skills, agents, etc.)
#
# Features:
#   - Pulls parent repo first, then all submodules, then custom directories
#   - Automatically fixes detached HEAD state
#   - Detects main/master/development branches
#   - Enforces no_push on external repos (read-only protection)
#   - Safe: only pulls, never pushes or discards changes
#   - Works on: Linux (including Arch), macOS, Windows (Git Bash)
#
# Usage:
#   ./_pull-all-repos.sh           # Pull all repos
#   ./_pull-all-repos.sh --status  # Just show status, don't pull
#   ./_pull-all-repos.sh --help    # Show help
#
# =============================================================================

# =============================================================================
# USER CONFIGURATION - Add your project directories here
# =============================================================================
# Uncomment and modify the lines below to include your own project directories.
# The script will scan these directories for git repos and pull them.
#
# Examples:
#   - Windows: "/e/Web Development" or "/c/Users/you/projects"
#   - Mac/Linux: "/home/you/projects" or "~/projects"
#
# NOTE: In Git Bash on Windows, use forward slashes and /c/ instead of C:\
#       Example: "E:\Web Development" becomes "/e/Web Development"
#
CUSTOM_PROJECT_DIRS=(
    # "/e/Web Development"           # Uncomment and edit for your directories
    # "/c/Users/you/projects"        # Add as many as needed
    # "$HOME/projects"               # Works on any platform
)
# =============================================================================

# Determine script location (works even when called via symlink)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKETPLACES_DIR="$SCRIPT_DIR/plugins/marketplaces"

# Colors (with fallback for terminals without color support)
if [[ -t 1 ]] && [[ "${TERM:-dumb}" != "dumb" ]]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    CYAN='\033[0;36m'
    BOLD='\033[1m'
    DIM='\033[2m'
    NC='\033[0m'
else
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    CYAN=''
    BOLD=''
    DIM=''
    NC=''
fi

# Stats
TOTAL=0
UPDATED=0
ALREADY_CURRENT=0
FIXED_DETACHED=0
FAILED=0
NO_PUSH_FIXED=0

# Flags
STATUS_ONLY=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --status|-s)
            STATUS_ONLY=true
            shift
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Pull latest changes for the parent repo, marketplace submodules, and custom directories."
            echo "Also enforces no_push on all submodules to prevent accidental pushes."
            echo ""
            echo "Repos pulled:"
            echo "  1. ~/.claude (travisjneuman/.claude) - parent repo (push enabled)"
            echo "  2. ~/.claude/plugins/marketplaces/* - submodules (no_push enforced)"
            echo "  3. Custom project directories (if configured) - your own repos"
            echo ""
            echo "To add your own project directories, edit CUSTOM_PROJECT_DIRS at the top of this script."
            echo "Example: CUSTOM_PROJECT_DIRS=(\"/e/Web Development\" \"/c/Users/you/projects\")"
            echo ""
            echo "Options:"
            echo "  --status, -s   Show repo status without pulling"
            echo "  --help, -h     Show this help message"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Check we're in a git repo
if [[ ! -d "$SCRIPT_DIR/.git" ]]; then
    echo -e "${RED}Error: Not a git repository${NC}"
    echo "Expected .git directory in: $SCRIPT_DIR"
    exit 1
fi

# Check marketplaces directory exists
if [[ ! -d "$MARKETPLACES_DIR" ]]; then
    echo -e "${RED}Error: Marketplaces directory not found${NC}"
    echo "Expected: $MARKETPLACES_DIR"
    exit 1
fi

# =============================================================================
# PHASE 0: Initialize any new/unregistered submodules
# =============================================================================
if [[ "$STATUS_ONLY" == false ]]; then
    echo ""
    echo -e "${BOLD}Initializing submodules:${NC}"
    cd "$SCRIPT_DIR"
    if git submodule update --init 2>&1 | tail -5; then
        echo -e "${GREEN}  Submodule initialization complete${NC}"
    else
        echo -e "${YELLOW}  Some submodules failed to initialize (may be unavailable upstream)${NC}"
    fi
fi

# Detect the default branch for a repo
get_default_branch() {
    # Try common branch names in order of preference
    for try_branch in main master development dev; do
        if git show-ref --verify --quiet "refs/remotes/origin/$try_branch" 2>/dev/null; then
            echo "$try_branch"
            return 0
        fi
    done

    # Fallback: use whatever remote HEAD points to
    local branch
    branch=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@') || true
    if [[ -n "$branch" ]]; then
        echo "$branch"
        return 0
    fi

    return 1
}

# Process a single repo
process_repo() {
    local repo_path="$1"
    local repo_name="$2"
    local is_parent="${3:-false}"

    TOTAL=$((TOTAL + 1))

    # Verify it's a git repo
    if [[ ! -d "$repo_path/.git" ]] && [[ ! -f "$repo_path/.git" ]]; then
        echo -e "${DIM}  Skipping $repo_name (not a git repo)${NC}"
        return 0
    fi

    cd "$repo_path" || {
        echo -e "${RED}  $repo_name: failed to enter directory${NC}"
        FAILED=$((FAILED + 1))
        return 1
    }

    # Get current state
    local current_branch
    current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || current_branch="unknown"

    local is_detached_head=false
    if [[ "$current_branch" == "HEAD" ]]; then
        is_detached_head=true
    fi

    # Status only mode
    if [[ "$STATUS_ONLY" == true ]]; then
        if [[ "$is_detached_head" == true ]]; then
            local commit
            commit=$(git rev-parse --short HEAD 2>/dev/null) || commit="unknown"
            echo -e "${YELLOW}  $repo_name: detached at $commit${NC}"
        else
            echo -e "${GREEN}  $repo_name: on $current_branch${NC}"
        fi
        return 0
    fi

    # Fetch first
    if ! git fetch origin 2>/dev/null; then
        echo -e "${RED}  $repo_name: failed to fetch${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    # Fix detached HEAD if needed
    if [[ "$is_detached_head" == true ]]; then
        local default_branch
        default_branch=$(get_default_branch) || default_branch=""

        if [[ -z "$default_branch" ]]; then
            echo -e "${YELLOW}  $repo_name: detached HEAD, no default branch found${NC}"
            FAILED=$((FAILED + 1))
            return 1
        fi

        if git checkout "$default_branch" 2>/dev/null; then
            echo -e "${CYAN}  $repo_name: fixed detached HEAD -> $default_branch${NC}"
            FIXED_DETACHED=$((FIXED_DETACHED + 1))
            current_branch="$default_branch"
        else
            echo -e "${RED}  $repo_name: failed to checkout $default_branch${NC}"
            FAILED=$((FAILED + 1))
            return 1
        fi
    fi

    # Check if we're behind
    local behind
    behind=$(git rev-list --count HEAD..origin/"$current_branch" 2>/dev/null) || behind="0"

    if [[ "$behind" -eq 0 ]]; then
        echo -e "${GREEN}  $repo_name: already up to date${NC}"
        ALREADY_CURRENT=$((ALREADY_CURRENT + 1))
        return 0
    fi

    # Pull
    if git pull --ff-only origin "$current_branch" >/dev/null 2>&1; then
        echo -e "${GREEN}  $repo_name: pulled $behind commits${NC}"
        UPDATED=$((UPDATED + 1))
    else
        # Try regular pull if ff-only fails
        if git pull origin "$current_branch" >/dev/null 2>&1; then
            echo -e "${GREEN}  $repo_name: pulled (merged) $behind commits${NC}"
            UPDATED=$((UPDATED + 1))
        else
            echo -e "${RED}  $repo_name: pull failed (conflicts?)${NC}"
            FAILED=$((FAILED + 1))
            return 1
        fi
    fi

    return 0
}

# Enforce no_push on a submodule
enforce_no_push() {
    local repo_path="$1"
    local repo_name="$2"

    cd "$repo_path" || return 1

    local push_url
    push_url=$(git remote get-url --push origin 2>/dev/null) || push_url=""

    if [[ "$push_url" != "no_push" ]]; then
        git remote set-url --push origin no_push 2>/dev/null
        echo -e "${CYAN}  $repo_name: set no_push${NC}"
        NO_PUSH_FIXED=$((NO_PUSH_FIXED + 1))
    fi
}

# =============================================================================
# PHASE 1: Pull parent repo
# =============================================================================
echo ""
echo -e "${BOLD}${BLUE}=== Pull All Repos ===${NC}"
echo ""
echo -e "${BOLD}Parent Repo (~/.claude):${NC}"
process_repo "$SCRIPT_DIR" ".claude (travisjneuman/.claude)" true

# =============================================================================
# PHASE 2: Pull all marketplace submodules
# =============================================================================
echo ""
echo -e "${BOLD}Marketplace Submodules:${NC}"
SUBMODULE_COUNT=0
for repo in "$MARKETPLACES_DIR"/*/; do
    if [[ -d "$repo" ]]; then
        repo_name=$(basename "$repo")
        process_repo "$repo" "$repo_name"
        SUBMODULE_COUNT=$((SUBMODULE_COUNT + 1))
    fi
done

# =============================================================================
# PHASE 3: Enforce no_push on all submodules (skip in status mode)
# =============================================================================
if [[ "$STATUS_ONLY" == false ]]; then
    echo ""
    echo -e "${BOLD}Enforcing no_push on submodules:${NC}"
    for repo in "$MARKETPLACES_DIR"/*/; do
        if [[ -d "$repo" ]]; then
            repo_name=$(basename "$repo")
            enforce_no_push "$repo" "$repo_name"
        fi
    done
    if [[ $NO_PUSH_FIXED -eq 0 ]]; then
        echo -e "${GREEN}  All submodules already have no_push configured${NC}"
    fi

    # Safety: ensure parent repo is NOT set to no_push
    cd "$SCRIPT_DIR"
    PARENT_PUSH=$(git remote get-url --push origin 2>/dev/null)
    if [[ "$PARENT_PUSH" == "no_push" ]]; then
        PARENT_FETCH=$(git remote get-url origin 2>/dev/null)
        git remote set-url --push origin "$PARENT_FETCH"
        echo -e "${YELLOW}  WARNING: Parent repo had no_push — restored push URL${NC}"
    fi
fi

# =============================================================================
# PHASE 4: Pull custom project directories (if configured)
# =============================================================================
CUSTOM_REPO_COUNT=0
if [[ ${#CUSTOM_PROJECT_DIRS[@]} -gt 0 ]]; then
    for project_dir in "${CUSTOM_PROJECT_DIRS[@]}"; do
        # Skip empty entries (from commented lines)
        [[ -z "$project_dir" ]] && continue

        # Expand ~ to $HOME if present
        project_dir="${project_dir/#\~/$HOME}"

        if [[ -d "$project_dir" ]]; then
            echo ""
            echo -e "${BOLD}Custom Projects ($(basename "$project_dir")):${NC}"

            # Find all git repos in this directory (1 level deep)
            for repo in "$project_dir"/*/; do
                if [[ -d "$repo/.git" ]] || [[ -f "$repo/.git" ]]; then
                    repo_name=$(basename "$repo")
                    process_repo "$repo" "$repo_name"
                    CUSTOM_REPO_COUNT=$((CUSTOM_REPO_COUNT + 1))
                fi
            done

            if [[ $CUSTOM_REPO_COUNT -eq 0 ]]; then
                echo -e "${DIM}  No git repos found in $project_dir${NC}"
            fi
        else
            echo ""
            echo -e "${YELLOW}Custom directory not found: $project_dir${NC}"
            echo -e "${DIM}  (Edit CUSTOM_PROJECT_DIRS in this script to fix)${NC}"
        fi
    done
fi

# =============================================================================
# Summary
# =============================================================================
echo ""
echo -e "${BOLD}${BLUE}=== Summary ===${NC}"
if [[ $CUSTOM_REPO_COUNT -gt 0 ]]; then
    echo "  Total repos:       $TOTAL (1 parent + $SUBMODULE_COUNT submodules + $CUSTOM_REPO_COUNT custom)"
else
    echo "  Total repos:       $TOTAL (1 parent + $SUBMODULE_COUNT submodules)"
fi
if [[ "$STATUS_ONLY" == false ]]; then
    [[ $UPDATED -gt 0 ]] && echo -e "  ${GREEN}Updated:         $UPDATED${NC}"
    [[ $ALREADY_CURRENT -gt 0 ]] && echo -e "  ${GREEN}Already current: $ALREADY_CURRENT${NC}"
    [[ $FIXED_DETACHED -gt 0 ]] && echo -e "  ${CYAN}Fixed detached:  $FIXED_DETACHED${NC}"
    [[ $NO_PUSH_FIXED -gt 0 ]] && echo -e "  ${CYAN}Fixed no_push:   $NO_PUSH_FIXED${NC}"
    [[ $FAILED -gt 0 ]] && echo -e "  ${RED}Failed:          $FAILED${NC}"
fi
echo ""

# =============================================================================
# PHASE 5: Update documentation counts (if repos were updated)
# =============================================================================
if [[ "$STATUS_ONLY" == false ]] && [[ -f "$SCRIPT_DIR/scripts/update-counts.sh" ]]; then
    if [[ $UPDATED -gt 0 ]] || [[ $FIXED_DETACHED -gt 0 ]]; then
        echo -e "${BOLD}Updating documentation counts...${NC}"
        bash "$SCRIPT_DIR/scripts/update-counts.sh"
    else
        echo -e "${DIM}No repo changes — skipping count update${NC}"
    fi
fi

# Exit with error if any failed
if [[ $FAILED -gt 0 ]]; then
    exit 1
fi
exit 0
