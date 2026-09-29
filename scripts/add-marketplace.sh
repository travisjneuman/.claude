#!/bin/bash
# Add a skills/plugins marketplace repo to the toolkit.
#
#   bash ~/.claude/scripts/add-marketplace.sh <git-url> [name]
#
# What it does:
#   1. Adds a manifest entry to .gitmodules (path + url only, ignore = all).
#      That entry is the only thing committed. No gitlink, no repo content.
#   2. Clones the repo into plugins/marketplaces/<name> (gitignored) with the
#      push URL set to no_push, so nobody (including forks of this toolkit)
#      can accidentally push to someone else's repo.
#   3. Regenerates INDEX.md and the local marketplace catalog.
#
# Anyone who clones or forks this toolkit gets the manifest; their daily pull
# (or /pull-repos) clones the marketplaces locally for them.

set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
URL="${1:-}"
[[ -z "$URL" ]] && { echo "usage: $0 <git-url> [name]" >&2; exit 1; }
NAME="${2:-$(basename "$URL" .git)}"
REL="plugins/marketplaces/$NAME"

if git config --file "$ROOT/.gitmodules" --get "submodule.$REL.url" >/dev/null 2>&1; then
  echo "Already in manifest: $REL"
else
  git config --file "$ROOT/.gitmodules" "submodule.$REL.path" "$REL"
  git config --file "$ROOT/.gitmodules" "submodule.$REL.url" "$URL"
  git config --file "$ROOT/.gitmodules" "submodule.$REL.ignore" all
  echo "Added manifest entry: $REL -> $URL"
fi

if [[ ! -d "$ROOT/$REL/.git" ]]; then
  git clone --quiet --depth 1 "$URL" "$ROOT/$REL"
fi
git -C "$ROOT/$REL" remote set-url --push origin no_push

# Safety: the clone must never be tracked by the toolkit repo.
if git -C "$ROOT" ls-files --error-unmatch "$REL" >/dev/null 2>&1; then
  echo "ERROR: $REL is tracked by the toolkit repo; remove it with: git rm -r --cached $REL" >&2
  exit 1
fi

node "$ROOT/scripts/generate-index.mjs" --write
echo "Done. Commit .gitmodules and INDEX.md to publish the new marketplace entry."
