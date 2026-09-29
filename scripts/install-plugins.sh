#!/bin/bash
# Make this machine match the toolkit's plugin set. Idempotent; safe to run any time.
#
#   bash ~/.claude/scripts/install-plugins.sh
#
# 1. Installs every plugin set to true in ~/.claude/settings.json (user scope)
#    or ~/.claude/.claude/settings.json (project scope: loads only inside the
#    toolkit repo) that isn't installed yet.
# 2. Installs the language-server binaries the enabled LSP plugins need.
#
# The daily background pull runs this, so every machine converges on the same
# plugins without manual steps. Nothing is uninstalled.

set -u
CLAUDE_DIR="$HOME/.claude"
command -v claude >/dev/null 2>&1 || exit 0
command -v node >/dev/null 2>&1 || exit 0
export CLAUDE_TOOLKIT_SKIP_SESSION_END=1   # claude subcommands fire SessionEnd; skip the repo walk

installed=$(cd "$CLAUDE_DIR" && claude plugin list --json 2>/dev/null || echo '[]')

wanted=$(node -e '
  const fs=require("fs"),p=require("path"),h=require("os").homedir();
  const read=f=>{try{return JSON.parse(fs.readFileSync(f,"utf8")).enabledPlugins||{}}catch{return {}}};
  const out=[];
  for (const [id,on] of Object.entries(read(p.join(h,".claude","settings.json")))) if(on===true) out.push(id+" user");
  for (const [id,on] of Object.entries(read(p.join(h,".claude",".claude","settings.json")))) if(on===true) out.push(id+" project");
  console.log(out.join("\n"));
')

while read -r id scope; do
  [ -z "${id:-}" ] && continue
  if printf '%s' "$installed" | grep -q "\"$id\""; then continue; fi
  echo "installing $id ($scope)"
  (cd "$CLAUDE_DIR" && claude plugin install "$id" --scope "$scope" </dev/null 2>&1 | tail -1)
done <<< "$wanted"

# Language servers for the LSP plugins
need_bin() { printf '%s' "$wanted" | grep -q "^$1@" && ! command -v "$2" >/dev/null 2>&1; }
pkgs=()
need_bin typescript-lsp typescript-language-server && pkgs+=(typescript-language-server typescript)
need_bin pyright-lsp pyright-langserver && pkgs+=(pyright)
if [ ${#pkgs[@]} -gt 0 ]; then
  if command -v pacman >/dev/null 2>&1 && sudo -n true 2>/dev/null; then
    sudo pacman -S --needed --noconfirm "${pkgs[@]}" 2>&1 | tail -1
  elif command -v npm >/dev/null 2>&1; then
    npm install -g --no-fund --no-audit "${pkgs[@]}" 2>&1 | tail -1
  fi
fi
exit 0
