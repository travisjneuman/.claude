#!/bin/bash
# SessionStart hook: Surface repo health problems into Claude's context.
#
# Why this exists:
#   The async session-start-pull.sh logs failures to a file Claude never reads.
#   Diverged/dirty/unpushed repos can sit invisible for months. This hook makes
#   that state visible at the start of every session by emitting a banner to
#   stdout (which Claude Code injects into context).
#
# What it checks (no network — uses last-fetched refs):
#   - Parent ~/.claude
#   - Every git repo in CUSTOM_PROJECT_DIRS (depth 1) and their nested
#     submodule-style repos (depth up to 3)
#
# What it flags (silent if all clean):
#   - DIVERGED: local and remote both ahead
#   - UNPUSHED: local ahead, remote not ahead
#   - BEHIND: remote ahead, can fast-forward
#   - DIRTY: uncommitted changes in working tree
#   - DETACHED: detached HEAD
#   - NO_UPSTREAM: branch tracks no remote (cannot reconcile)
#
# What it does NOT do:
#   - No git fetch (would block startup on network)
#   - No automatic fixes (this is a diagnostic, not a remediator)
#   - Does not check ~/.claude/plugins/marketplaces/* (no_push enforced; not user-owned)

set -u

SCRIPT_DIR="$HOME/.claude"
ENV_FILE="$SCRIPT_DIR/.env.local"

# Read CUSTOM_PROJECT_DIRS from .env.local (same source as _pull-all-repos.sh)
CUSTOM_PROJECT_DIRS=()
if [[ -f "$ENV_FILE" ]]; then
    RAW_DIRS=$(grep '^CUSTOM_PROJECT_DIRS=' "$ENV_FILE" | head -1 | cut -d'=' -f2- | tr -d '"' | tr -d "'")
    if [[ -n "$RAW_DIRS" ]]; then
        IFS=',' read -ra CUSTOM_PROJECT_DIRS <<< "$RAW_DIRS"
    fi
fi

# Inspect a single repo. Echoes one line iff there's a problem; otherwise silent.
check_repo() {
    local repo="$1"
    [[ -d "$repo/.git" || -f "$repo/.git" ]] || return 0

    local short_name
    short_name="${repo#$HOME/}"

    local branch
    branch=$(git -C "$repo" rev-parse --abbrev-ref HEAD 2>/dev/null) || return 0

    if [[ "$branch" == "HEAD" ]]; then
        echo "  DETACHED   $short_name (detached HEAD)"
        return 0
    fi

    # Dirty working tree
    local dirty
    dirty=$(git -C "$repo" status --porcelain 2>/dev/null)
    if [[ -n "$dirty" ]]; then
        local dirty_count
        dirty_count=$(echo "$dirty" | wc -l | tr -d ' ')
        echo "  DIRTY      $short_name ($dirty_count uncommitted change(s) on $branch)"
    fi

    # Upstream comparison
    local upstream
    upstream=$(git -C "$repo" rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null)
    if [[ -z "$upstream" ]]; then
        echo "  NO_UPSTREAM $short_name ($branch tracks no remote)"
        return 0
    fi

    local counts
    counts=$(git -C "$repo" rev-list --left-right --count "HEAD...@{u}" 2>/dev/null) || return 0
    local local_ahead remote_ahead
    local_ahead=$(echo "$counts" | awk '{print $1}')
    remote_ahead=$(echo "$counts" | awk '{print $2}')

    if [[ "$local_ahead" -gt 0 && "$remote_ahead" -gt 0 ]]; then
        echo "  DIVERGED   $short_name (local +$local_ahead, remote +$remote_ahead — pull blocked, needs reconciliation)"
    elif [[ "$local_ahead" -gt 0 ]]; then
        echo "  UNPUSHED   $short_name (local +$local_ahead — needs push)"
    elif [[ "$remote_ahead" -gt 0 ]]; then
        echo "  BEHIND     $short_name (remote +$remote_ahead — needs pull)"
    fi
}

# Collect output then decide whether to print a banner
PROBLEMS=""

# Parent ~/.claude
if out=$(check_repo "$SCRIPT_DIR"); then
    [[ -n "$out" ]] && PROBLEMS+="$out"$'\n'
fi

# Custom project dirs (depth 1) and nested submodules (depth up to 3)
for project_dir in "${CUSTOM_PROJECT_DIRS[@]}"; do
    [[ -z "$project_dir" ]] && continue
    project_dir="${project_dir/#\~/$HOME}"
    [[ -d "$project_dir" ]] || continue

    # Depth 1: top-level repos
    for repo in "$project_dir"/*/ "$project_dir"/.*/; do
        [[ -d "$repo" ]] || continue
        local_base=$(basename "$repo")
        [[ "$local_base" == "." || "$local_base" == ".." ]] && continue
        if out=$(check_repo "${repo%/}"); then
            [[ -n "$out" ]] && PROBLEMS+="$out"$'\n'
        fi

        # Depth 2: nested repos (e.g. monorepos with submodules)
        for nested in "$repo"*/ "$repo".*/; do
            [[ -d "$nested" ]] || continue
            nested_base=$(basename "$nested")
            [[ "$nested_base" == "." || "$nested_base" == ".." ]] && continue
            if out=$(check_repo "${nested%/}"); then
                [[ -n "$out" ]] && PROBLEMS+="$out"$'\n'
            fi

            # Depth 3: submodules of submodules (rare but covers .lzg_platform layout)
            for nested2 in "$nested"*/ "$nested".*/; do
                [[ -d "$nested2" ]] || continue
                nested2_base=$(basename "$nested2")
                [[ "$nested2_base" == "." || "$nested2_base" == ".." ]] && continue
                if out=$(check_repo "${nested2%/}"); then
                    [[ -n "$out" ]] && PROBLEMS+="$out"$'\n'
                fi
            done
        done
    done
done

if [[ -n "$PROBLEMS" ]]; then
    echo "=== Repo Health Check ==="
    echo "Out-of-sync repos detected. Reconcile before editing them."
    echo "(Status reflects last fetched state — does not include this session's pull.)"
    echo ""
    echo -n "$PROBLEMS"
    echo ""
    echo "Legend: DIVERGED=both sides ahead (manual merge/reset) | UNPUSHED=local commits to push |"
    echo "        BEHIND=fast-forward pull available | DIRTY=uncommitted changes |"
    echo "        DETACHED=detached HEAD | NO_UPSTREAM=branch has no remote tracking"
    echo "=== End Repo Health Check ==="
fi

exit 0
