#!/bin/bash
# Make this machine match the toolkit's plugin set. Idempotent; safe to run any time.
#
#   bash ~/.claude/scripts/install-plugins.sh
#
# 1. Installs every plugin set to true in ~/.claude/settings.json (user scope)
#    or ~/.claude/.claude/settings.json (project scope: loads only inside the
#    toolkit repo) that isn't installed yet.
# 2. Registers and refreshes each GitHub or URL marketplace those plugins come
#    from (extraKnownMarketplaces).
# 3. Updates installed plugins from marketplaces marked "autoUpdate": true, so
#    plugins that track an upstream repo (marketplace/marketplace.json) follow
#    its releases even on machines with no interactive sessions.
# 4. Installs the language-server binaries the enabled LSP plugins need.
#
# The daily background pull runs this, so every machine converges on the same
# plugins without manual steps. Nothing is uninstalled.

set -u
CLAUDE_DIR="$HOME/.claude"
command -v claude >/dev/null 2>&1 || exit 0
command -v node >/dev/null 2>&1 || exit 0
export CLAUDE_TOOLKIT_SKIP_SESSION_END=1   # claude subcommands fire SessionEnd; skip the repo walk

wanted=$(node -e '
  const fs=require("fs"),p=require("path"),h=require("os").homedir();
  const read=f=>{try{return JSON.parse(fs.readFileSync(f,"utf8")).enabledPlugins||{}}catch{return {}}};
  const out=[];
  for (const [id,on] of Object.entries(read(p.join(h,".claude","settings.json")))) if(on===true) out.push(id+" user");
  for (const [id,on] of Object.entries(read(p.join(h,".claude",".claude","settings.json")))) if(on===true) out.push(id+" project");
  console.log(out.join("\n"));
')

# Register every GitHub or URL marketplace an enabled plugin comes from (listed
# in extraKnownMarketplaces) and refresh its catalog. Third field: autoUpdate.
markets=$(node -e '
  const fs=require("fs"),p=require("path"),h=require("os").homedir();
  let s={};try{s=JSON.parse(fs.readFileSync(p.join(h,".claude","settings.json"),"utf8"))}catch{}
  const known=s.extraKnownMarketplaces||{};
  const used=new Set(process.argv[1].split("\n").map(l=>l.split(" ")[0].split("@")[1]).filter(Boolean));
  for (const m of used) {
    const src=known[m]?.source, auto=known[m]?.autoUpdate===true?"auto":"-";
    const where=src?.source==="github"?src.repo:src?.source==="url"?src.url:"";
    if (where) console.log(m+" "+where+" "+auto);
  }
' "$wanted")
registered=$(claude plugin marketplace list 2>/dev/null)
while read -r name where _auto; do
  [ -z "${name:-}" ] && continue
  printf '%s' "$registered" | grep -q "$name" || claude plugin marketplace add "$where" </dev/null >/dev/null 2>&1
  claude plugin marketplace update "$name" </dev/null >/dev/null 2>&1
done <<< "$markets"

installed=$(cd "$CLAUDE_DIR" && claude plugin list --json 2>/dev/null || echo '[]')

while read -r id scope; do
  [ -z "${id:-}" ] && continue
  if printf '%s' "$installed" | grep -q "\"$id\""; then continue; fi
  echo "installing $id ($scope)"
  (cd "$CLAUDE_DIR" && claude plugin install "$id" --scope "$scope" </dev/null 2>&1 | tail -1)
done <<< "$wanted"

# Plugins from autoUpdate marketplaces follow upstream: update the installed ones.
auto_markets=$(printf '%s\n' "$markets" | awk '$3=="auto"{print $1}')
while read -r id scope; do
  [ -z "${id:-}" ] && continue
  printf '%s\n' "$auto_markets" | grep -qx "${id#*@}" || continue
  printf '%s' "$installed" | grep -q "\"$id\"" || continue
  (cd "$CLAUDE_DIR" && claude plugin update "$id" --scope "$scope" </dev/null 2>&1 | grep -iv 'already at the latest' | tail -1)
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
