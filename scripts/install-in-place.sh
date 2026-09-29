#!/bin/bash
# Turn an existing ~/.claude (created by Claude Code itself) into a checkout of
# this toolkit, without deleting anything. Also safe on a machine with no
# ~/.claude yet, and a no-op pull on one that is already a checkout.
#
#   bash install-in-place.sh [repo-url]
#   curl -fsSL https://raw.githubusercontent.com/travisjneuman/.claude/master/scripts/install-in-place.sh -o install-in-place.sh && bash install-in-place.sh
#
# - Runtime state (projects/, sessions/, plugins/, credentials, ...) is
#   gitignored by the toolkit and stays exactly where it is.
# - Any existing file that the toolkit also tracks (e.g. settings.json) is
#   moved to ~/.claude/backups/pre-install-<timestamp>/ first. Top-level keys
#   from your old settings.json that the toolkit doesn't set are merged back.
# - Fast-forward only; never resets or discards.
set -euo pipefail

REPO_URL="${1:-https://github.com/travisjneuman/.claude.git}"
CLAUDE="${CLAUDE_DIR:-$HOME/.claude}"
mkdir -p "$CLAUDE"
cd "$CLAUDE"

if [ -d .git ]; then
  echo "Already a checkout; pulling (fast-forward only)."
  git fetch --prune origin && git pull --ff-only
  [ -f scripts/setup-hooks.sh ] && bash scripts/setup-hooks.sh >/dev/null
  exit 0
fi

TS="$(date +%Y%m%dT%H%M%S)"
BACKUP="backups/pre-install-$TS"
git init -q
git remote add origin "$REPO_URL"
git fetch -q --prune origin
git remote set-head origin -a >/dev/null
BRANCH="$(git symbolic-ref --short refs/remotes/origin/HEAD | sed 's#^origin/##')"

# Move aside every existing path the toolkit tracks (files only; directories
# like skills/ are merged file by file).
moved=0
while IFS= read -r f; do
  if [ -e "$f" ] && [ ! -d "$f" ]; then
    mkdir -p "$BACKUP/$(dirname "$f")"
    mv "$f" "$BACKUP/$f"
    moved=$((moved + 1))
  fi
done < <(git ls-tree -r --name-only "origin/$BRANCH")

git checkout -q -t "origin/$BRANCH"
echo "Checked out $REPO_URL ($BRANCH) into $CLAUDE; moved $moved pre-existing file(s) to $BACKUP"

# Merge back personal top-level settings the toolkit doesn't define.
if [ -f "$BACKUP/settings.json" ] && command -v node >/dev/null 2>&1; then
  node -e '
    const fs=require("fs");const [oldP,newP]=process.argv.slice(1);
    const o=JSON.parse(fs.readFileSync(oldP,"utf8"));const n=JSON.parse(fs.readFileSync(newP,"utf8"));
    const added=Object.keys(o).filter(k=>!(k in n));for(const k of added)n[k]=o[k];
    fs.writeFileSync(newP,JSON.stringify(n,null,2)+"\n");
    if(added.length)console.log("Merged personal settings keys: "+added.join(", ")+" (review with git diff settings.json)");
  ' "$BACKUP/settings.json" settings.json || true
fi

bash scripts/setup-hooks.sh >/dev/null
cat <<EOF

Next steps:
  1. Optional private layer: see $CLAUDE/local.example/README.md
  2. Marketplaces clone on the first daily background pull, or now:  bash "$CLAUDE/_pull-all-repos.sh"
     (needs Bash 4+; on macOS: brew install bash)
  3. Start a new Claude Code session so the new settings, hooks, and skills load.
EOF
