#!/bin/bash
# =============================================================================
# Pull All Repos - Parent + Marketplaces + Custom Directories
# =============================================================================
#
# Cross-platform script (Linux, macOS, Windows via Git Bash) that:
#   1. Pulls the parent ~/.claude repo (travisjneuman/.claude)
#   2. Pulls all marketplace clones listed in .gitmodules
#   3. Enforces no_push on all marketplace clones (prevents accidental pushes)
#   4. Pulls all git repos recursively in your custom project directories (optional)
#   5. Fixes marketplace paths for current OS (cross-platform compatibility)
#   6. Updates documentation counts if any repos changed (skills, agents, etc.)
#   7. Commits and pushes generated count/doc changes only
#
# Features:
#   - Pulls parent repo first, then marketplace clones, then custom directories
#   - Automatically fixes detached HEAD state
#   - Detects main/master/development branches
#   - Enforces no_push on marketplace and non-Travis-owned custom repos
#   - Safe: only fast-forward pulls, never merges, rebases, pushes external repos, or discards changes
#   - Works on: Linux (including Arch), macOS, Windows (Git Bash)
#
# Usage:
#   ./_pull-all-repos.sh           # Pull all repos
#   ./_pull-all-repos.sh --status  # Just show status, don't pull
#   ./_pull-all-repos.sh --help    # Show help
#
# =============================================================================

# =============================================================================
# USER CONFIGURATION — reads from .env.local (gitignored, machine-specific)
# =============================================================================
# To configure custom project directories for this machine:
#   1. Copy .env.example to .env.local
#   2. Set CUSTOM_PROJECT_DIRS to your directories (comma-separated)
#
# Example .env.local:
#   CUSTOM_PROJECT_DIRS="/e/Web Development,/c/Users/you/projects"
#
# Windows (Git Bash): use /e/ instead of E:\
# Mac/Linux: use normal paths like /home/you/projects
#
# Determine script location (works even when called via symlink)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CUSTOM_PROJECT_DIRS=()
ENV_FILE="$SCRIPT_DIR/.env.local"
if [[ -f "$ENV_FILE" ]]; then
    RAW_DIRS=$(grep '^CUSTOM_PROJECT_DIRS=' "$ENV_FILE" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    if [[ -n "$RAW_DIRS" ]]; then
        IFS=',' read -ra CUSTOM_PROJECT_DIRS <<< "$RAW_DIRS"
    fi
fi
# =============================================================================
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
            echo "Pull latest changes for the parent repo, marketplace clones, and custom directories."
            echo "Also enforces no_push on all marketplace clones to prevent accidental pushes."
            echo ""
            echo "Repos pulled:"
            echo "  1. ~/.claude (travisjneuman/.claude) - parent repo (push enabled)"
            echo "  2. ~/.claude/plugins/marketplaces/* - ignored marketplace clones from .gitmodules (no_push enforced)"
            echo "  3. Custom project directories (if configured) - recursively discovered repos"
            echo ""
            echo "To add your own project directories, set CUSTOM_PROJECT_DIRS in .env.local."
            echo "Example: CUSTOM_PROJECT_DIRS=\"/e/Web Development,/c/Users/you/.codex\""
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
# PHASE 0: Initialize missing marketplace clones from the manifest
# =============================================================================
if [[ "$STATUS_ONLY" == false ]]; then
    echo ""
    echo -e "${BOLD}Checking marketplace clones:${NC}"
    cd "$SCRIPT_DIR"
    mapfile -t REQUIRED_MARKETPLACES < <(manifest_marketplace_paths)
    MISSING_MARKETPLACES=()
    for rel_path in "${REQUIRED_MARKETPLACES[@]}"; do
        if ! repo_has_git "$SCRIPT_DIR/$rel_path"; then
            MISSING_MARKETPLACES+=("$rel_path")
        fi
    done
    if [[ ${#MISSING_MARKETPLACES[@]} -eq 0 ]]; then
        echo -e "${GREEN}  All manifest marketplace clones present${NC}"
    elif [[ -f "$SCRIPT_DIR/scripts/init-marketplaces.sh" ]]; then
        echo -e "${YELLOW}  Missing ${#MISSING_MARKETPLACES[@]} manifest marketplace clone(s); initializing${NC}"
        bash "$SCRIPT_DIR/scripts/init-marketplaces.sh"
    else
        echo -e "${YELLOW}  Marketplace clones missing and init-marketplaces.sh not found${NC}"
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

repo_has_git() {
    local repo_path="$1"
    [[ -d "$repo_path/.git" ]] || [[ -f "$repo_path/.git" ]]
}

manifest_marketplace_paths() {
    git config --file "$SCRIPT_DIR/.gitmodules" --get-regexp path 2>/dev/null | awk '{print $2}'
}

repo_is_dirty() {
    local repo_path="$1"
    [[ -n "$(git -C "$repo_path" status --porcelain 2>/dev/null)" ]]
}

remote_is_travis_owned() {
    local repo_path="$1"
    local fetch_url
    fetch_url=$(git -C "$repo_path" remote get-url origin 2>/dev/null) || return 1
    [[ "$fetch_url" == *"github.com/travisjneuman/"* ]] || [[ "$fetch_url" == git@github.com:travisjneuman/* ]]
}

enforce_custom_push_policy() {
    local repo_path="$1"
    local repo_name="$2"
    local push_url
    push_url=$(git -C "$repo_path" remote get-url --push origin 2>/dev/null) || push_url=""

    case "$(echo "$repo_path" | tr '[:upper:]' '[:lower:]')" in
        *"/.openclaw"|*"/.openclaw/"*)
            if [[ "$push_url" != "no_push" ]]; then
                git -C "$repo_path" remote set-url --push origin no_push 2>/dev/null || true
                echo -e "${CYAN}  $repo_name: push disabled (local-only .openclaw)${NC}"
                NO_PUSH_FIXED=$((NO_PUSH_FIXED + 1))
            fi
            return 0
            ;;
    esac

    if remote_is_travis_owned "$repo_path"; then
        if [[ "$push_url" == "no_push" ]]; then
            local fetch_url
            fetch_url=$(git -C "$repo_path" remote get-url origin 2>/dev/null) || return 0
            git -C "$repo_path" remote set-url --push origin "$fetch_url" 2>/dev/null || true
            echo -e "${CYAN}  $repo_name: push restored for Travis-owned repo${NC}"
            NO_PUSH_FIXED=$((NO_PUSH_FIXED + 1))
        fi
    else
        if [[ -n "$push_url" && "$push_url" != "no_push" ]]; then
            git -C "$repo_path" remote set-url --push origin no_push 2>/dev/null || true
            echo -e "${CYAN}  $repo_name: push disabled (non-Travis repo)${NC}"
            NO_PUSH_FIXED=$((NO_PUSH_FIXED + 1))
        fi
    fi
}

collect_git_roots() {
    local project_dir="$1"
    find "$project_dir" \
        \( -path "*/node_modules" -o -path "*/.git/*" -o -path "*/plugins/cache" -o -path "*/plugins/marketplaces" -o -path "*/.worktrees" \) -prune \
        -o -name .git -print 2>/dev/null | while IFS= read -r git_marker; do
            dirname "$git_marker"
        done
}

# Process a single repo
process_repo() {
    local repo_path="$1"
    local repo_name="$2"
    local is_parent="${3:-false}"

    TOTAL=$((TOTAL + 1))

    # Verify it's a git repo
    if ! repo_has_git "$repo_path"; then
        echo -e "${DIM}  Skipping $repo_name (not a git repo)${NC}"
        return 0
    fi

    cd "$repo_path" || {
        echo -e "${RED}  $repo_name: failed to enter directory${NC}"
        FAILED=$((FAILED + 1))
        return 1
    }

    if repo_is_dirty "$repo_path"; then
        echo -e "${RED}  $repo_name: dirty working tree; skipping pull${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

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
    if ! git fetch --prune origin 2>/dev/null; then
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
        echo -e "${RED}  $repo_name: fast-forward pull failed; skipping to avoid merge/conflict${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi

    return 0
}

# Enforce no_push on a marketplace clone
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
# PHASE 2: Pull all marketplace clones
# =============================================================================
echo ""
echo -e "${BOLD}Marketplace Clones:${NC}"
MARKETPLACE_COUNT=0
mapfile -t MARKETPLACE_PATHS < <(manifest_marketplace_paths)
for rel_path in "${MARKETPLACE_PATHS[@]}"; do
    repo="$SCRIPT_DIR/$rel_path"
    repo_name=$(basename "$repo")
    MARKETPLACE_COUNT=$((MARKETPLACE_COUNT + 1))
    if repo_has_git "$repo"; then
        process_repo "$repo" "$repo_name"
    else
        echo -e "${RED}  $repo_name: missing marketplace clone from manifest${NC}"
        TOTAL=$((TOTAL + 1))
        FAILED=$((FAILED + 1))
    fi
done

# =============================================================================
# PHASE 3: Enforce no_push on all marketplace clones (skip in status mode)
# =============================================================================
if [[ "$STATUS_ONLY" == false ]]; then
    echo ""
    echo -e "${BOLD}Enforcing no_push on marketplace clones:${NC}"
    for rel_path in "${MARKETPLACE_PATHS[@]}"; do
        repo="$SCRIPT_DIR/$rel_path"
        if repo_has_git "$repo"; then
            enforce_no_push "$repo" "$(basename "$repo")"
        fi
    done
    if [[ $NO_PUSH_FIXED -eq 0 ]]; then
        echo -e "${GREEN}  All marketplace clones already have no_push configured${NC}"
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
declare -A SEEN_CUSTOM_REPOS=()
if [[ ${#CUSTOM_PROJECT_DIRS[@]} -gt 0 ]]; then
    for project_dir in "${CUSTOM_PROJECT_DIRS[@]}"; do
        # Skip empty entries (from commented lines)
        [[ -z "$project_dir" ]] && continue

        # Expand ~ to $HOME if present
        project_dir="${project_dir/#\~/$HOME}"

        if [[ -d "$project_dir" ]]; then
            echo ""
            echo -e "${BOLD}Custom Projects ($(basename "$project_dir")):${NC}"

            FOUND_IN_THIS_DIR=0
            while IFS= read -r repo; do
                [[ -z "$repo" ]] && continue
                if [[ -n "${SEEN_CUSTOM_REPOS[$repo]:-}" ]]; then
                    continue
                fi
                SEEN_CUSTOM_REPOS[$repo]=1
                repo_name=$(basename "$repo")
                process_repo "$repo" "$repo_name"
                if [[ "$STATUS_ONLY" == false ]]; then
                    enforce_custom_push_policy "$repo" "$repo_name"
                fi
                CUSTOM_REPO_COUNT=$((CUSTOM_REPO_COUNT + 1))
                FOUND_IN_THIS_DIR=$((FOUND_IN_THIS_DIR + 1))
            done < <(collect_git_roots "$project_dir")

            if [[ $FOUND_IN_THIS_DIR -eq 0 ]]; then
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
    echo "  Total repos:       $TOTAL (1 parent + $MARKETPLACE_COUNT marketplace clones + $CUSTOM_REPO_COUNT custom)"
else
    echo "  Total repos:       $TOTAL (1 parent + $MARKETPLACE_COUNT marketplace clones)"
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
# PHASE 5: Fix marketplace paths (cross-platform compatibility)
# =============================================================================
if [[ "$STATUS_ONLY" == false ]] && [[ -f "$SCRIPT_DIR/scripts/fix-marketplace-paths.sh" ]]; then
    echo ""
    echo -e "${BOLD}Fixing marketplace paths:${NC}"
    bash "$SCRIPT_DIR/scripts/fix-marketplace-paths.sh"
fi

# =============================================================================
# PHASE 6: Update documentation counts (if repos were updated)
# =============================================================================
if [[ "$STATUS_ONLY" == false ]] && [[ -f "$SCRIPT_DIR/scripts/update-counts.sh" ]]; then
    if [[ $UPDATED -gt 0 ]] || [[ $FIXED_DETACHED -gt 0 ]]; then
        echo -e "${BOLD}Updating documentation counts...${NC}"
        bash "$SCRIPT_DIR/scripts/update-counts.sh"
    else
        echo -e "${DIM}No repo changes — skipping count update${NC}"
    fi
fi

# =============================================================================
# PHASE 7: Commit and push any changes (count updates, path fixes, etc.)
# =============================================================================
if [[ "$STATUS_ONLY" == false ]]; then
    cd "$SCRIPT_DIR"

    # Check if there are any changes to commit
    if [[ -n $(git status --porcelain 2>/dev/null) ]]; then
        echo ""
        echo -e "${BOLD}Committing and pushing updates:${NC}"

        # Stage only tracked/generated toolkit files. Never sweep ignored runtime,
        # marketplace, cache, auth, or ad-hoc local files into the public repo.
        git add -u
        for generated_file in \
            counts.json plugin.json README.md CLAUDE.md CHANGELOG.md \
            .gitmodules .env.example _pull-all-repos.sh \
            docs/SETUP-GUIDE.md docs/NEW-DEVICE-SETUP.md docs/MARKETPLACE-GUIDE.md \
            docs/MAINTENANCE.md docs/FOLDER-STRUCTURE.md docs/ARCHITECTURE.md \
            docs/README.md docs/FAQ.md docs/GLOSSARY.md docs/PLUGIN-MANAGEMENT.md \
            docs/CLAUDE-CODE-RESOURCES.md docs/SKILLS.md docs/reference/tooling/external-repos.md \
            scripts/README.md scripts/generate-counts.mjs \
            commands/README.md commands/bootstrap.md commands/health-check.md \
            commands/list-skills.md commands/pull-repos.md commands/skill-finder.md \
            website/src/lib/data/marketplace-counts.json
        do
            [[ -e "$generated_file" ]] && git add "$generated_file"
        done

        # Build a descriptive commit message
        COMMIT_PARTS=()
        [[ $UPDATED -gt 0 ]] && COMMIT_PARTS+=("pull $UPDATED repo(s)")
        [[ -n $(git diff --cached --name-only | grep -E '(counts\.json|README\.md|MASTER_INDEX\.md|marketplace-counts\.json)') ]] && COMMIT_PARTS+=("update counts")

        if [[ ${#COMMIT_PARTS[@]} -gt 0 ]]; then
            COMMIT_MSG="chore: $(IFS=', '; echo "${COMMIT_PARTS[*]}")"
        else
            COMMIT_MSG="chore: update after pull-all-repos"
        fi

        if git commit -m "$COMMIT_MSG" >/dev/null 2>&1; then
            echo -e "${GREEN}  Committed: $COMMIT_MSG${NC}"

            if git push >/dev/null 2>&1; then
                echo -e "${GREEN}  Pushed to origin${NC}"
            else
                echo -e "${RED}  Push failed — commit is local only${NC}"
            fi
        else
            echo -e "${DIM}  Nothing to commit${NC}"
        fi
    else
        echo ""
        echo -e "${DIM}No local changes to commit${NC}"
    fi
fi

# Exit with error if any failed
if [[ $FAILED -gt 0 ]]; then
    exit 1
fi
exit 0
