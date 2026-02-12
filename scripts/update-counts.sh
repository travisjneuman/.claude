#!/bin/bash
# update-counts.sh — Update all hardcoded counts across documentation
# Usage: bash ~/.claude/scripts/update-counts.sh
#
# Counts skills, agents, marketplace repos, and marketplace skills from
# the filesystem (source of truth), then updates all documentation files.
#
# SAFE: Only updates specific global-count phrases. Does NOT touch
# per-marketplace or per-section counts (e.g., "trailofbits-skills (50)").

set -euo pipefail

BASE="$HOME/.claude"
cd "$BASE"

# ─── Non-skill directory exclusions ────────────────────────────────
# Marketplace repos may contain SKILL.md files in directories that are
# NOT real skills (backups, planned content, test fixtures, docs, etc.).
# These patterns are excluded from the marketplace skill count.
# Add new patterns here if a newly-added repo has non-skill directories.
EXCLUDE_SKILL_DIRS=(
  backups backup              # Timestamped backup snapshots
  tests test                  # Test fixtures and E2E test data
  examples example            # Documentation examples
  docs                        # Translated docs, API docs
  workspace lab               # Development workspaces
  archive archived            # Archived/retired skills
  deprecated                  # Explicitly deprecated content
  draft drafts                # Work-in-progress drafts
  planned-skills planned      # Planned but not yet real skills
  templates template          # Skill templates/scaffolds
  node_modules                # Package dependencies
  .git                        # Git internals
)

# ─── Count from filesystem ───────────────────────────────────────────

SKILL_COUNT=$(find skills -name "SKILL.md" -not -path "skills/_shared/*" 2>/dev/null | wc -l | tr -d ' ')
AGENT_COUNT=$(ls agents/*.md 2>/dev/null | grep -cv 'README\.md' || echo 0)
REPO_COUNT=$(ls -d plugins/marketplaces/*/ 2>/dev/null | wc -l | tr -d ' ')

# Build find exclusion arguments from EXCLUDE_SKILL_DIRS
FIND_EXCLUDES=()
for dir in "${EXCLUDE_SKILL_DIRS[@]}"; do
  FIND_EXCLUDES+=(-not -path "*/$dir/*")
done
# Also exclude all dot-directories (e.g., .cursor/, .vscode/) — matches Node.js counter behavior
FIND_EXCLUDES+=(-not -path "*/\.*/*")
MARKET_SKILL_COUNT=$(find plugins/marketplaces -name "SKILL.md" "${FIND_EXCLUDES[@]}" 2>/dev/null | wc -l | tr -d ' ')
COMMAND_COUNT=$(ls commands/*.md 2>/dev/null | grep -cv 'README\.md' || echo 0)
HOOK_COUNT=$(ls hooks/*.sh 2>/dev/null | wc -l | tr -d ' ')
RULE_COUNT=$(find rules -name '*.md' -not -name 'README.md' 2>/dev/null | wc -l | tr -d ' ')
TEMPLATE_COUNT=$(ls templates/ 2>/dev/null | grep -cv 'README\.md' || echo 0)
SKILL_DIR_COUNT=$(find skills -mindepth 1 -maxdepth 1 -type d -not -name '_shared' 2>/dev/null | wc -l | tr -d ' ')
CHECKLIST_COUNT=$(ls rules/checklists/*.md 2>/dev/null | grep -cv 'README\.md' || echo 0)
# MCP servers: count entries with "type": "stdio" in .mcp.json
MCP_COUNT=$(grep -c '"type": "stdio"' .mcp.json 2>/dev/null || echo 0)

# Round marketplace skills down to nearest 100 with "+" suffix
MARKET_ROUNDED="$(( (MARKET_SKILL_COUNT / 100) * 100 ))"
# Format with comma: 1700 → 1,700
if [ "$MARKET_ROUNDED" -ge 1000 ]; then
  MARKET_DISPLAY="$(printf "%d,%03d" $((MARKET_ROUNDED / 1000)) $((MARKET_ROUNDED % 1000)))"
else
  MARKET_DISPLAY="$MARKET_ROUNDED"
fi
MARKET_DISPLAY_PLUS="${MARKET_DISPLAY}+"

# For badge (no comma): 1700+
MARKET_BADGE="${MARKET_ROUNDED}+"

echo "┌─────────────────────────────────────────┐"
echo "│  Filesystem Counts (source of truth)    │"
echo "├─────────────────────────────────────────┤"
echo "│  Local skills:      $SKILL_COUNT"
echo "│  Agents:             $AGENT_COUNT"
echo "│  Commands:           $COMMAND_COUNT"
echo "│  Hooks:              $HOOK_COUNT"
echo "│  Rules:              $RULE_COUNT"
echo "│  Templates:          $TEMPLATE_COUNT"
echo "│  Checklists:         $CHECKLIST_COUNT"
echo "│  MCP servers:        $MCP_COUNT"
echo "│  Marketplace repos:  $REPO_COUNT"
echo "│  Marketplace skills: $MARKET_SKILL_COUNT (display: ${MARKET_DISPLAY_PLUS})"
echo "└─────────────────────────────────────────┘"
echo ""

# ─── Helper: sed in-place (cross-platform) ───────────────────────────

sedi() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "$@"
  else
    sed -i "$@"
  fi
}

CHANGED=0

check_changed() {
  local file="$1" before="$2"
  local after
  after=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)
  if [ "$before" != "$after" ]; then
    echo "  ✓ Updated: $file"
    CHANGED=$((CHANGED + 1))
  fi
}

# ─── Safe update: only specific global-count phrases ─────────────────
# These patterns are chosen to ONLY match global counts, not per-repo counts.
# e.g., "72 local skills" matches, but "trailofbits-skills (50 skills)" does NOT.

update_file() {
  local file="$1"
  [ -f "$file" ] || return 0
  local before
  before=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)

  # Global skill count — only with qualifying adjectives
  sedi -E "s/[0-9]+ local skills/${SKILL_COUNT} local skills/g" "$file"
  sedi -E "s/[0-9]+ unique skills/${SKILL_COUNT} unique skills/g" "$file"

  # Global agent count — only with qualifying adjectives
  sedi -E "s/[0-9]+ specialized agents/${AGENT_COUNT} specialized agents/g" "$file"
  sedi -E "s/[0-9]+ local agents/${AGENT_COUNT} local agents/g" "$file"
  sedi -E "s/[0-9]+ custom agents/${AGENT_COUNT} custom agents/g" "$file"

  # Command count
  sedi -E "s/[0-9]+ slash commands/${COMMAND_COUNT} slash commands/g" "$file"
  sedi -E "s/[0-9]+ custom commands/${COMMAND_COUNT} custom commands/g" "$file"

  # Hook count
  sedi -E "s/[0-9]+ lifecycle hooks/${HOOK_COUNT} lifecycle hooks/g" "$file"

  # MCP server count
  sedi -E "s/[0-9]+ MCP servers/${MCP_COUNT} MCP servers/g" "$file"
  sedi -E "s/[0-9]+ MCP Servers/${MCP_COUNT} MCP Servers/g" "$file"

  # Checklist count
  sedi -E "s/[0-9]+ checklists/${CHECKLIST_COUNT} checklists/g" "$file"

  # Rule count
  sedi -E "s/[0-9]+ rules files/${RULE_COUNT} rules files/g" "$file"
  sedi -E "s/[0-9]+ contextual rules/${RULE_COUNT} contextual rules/g" "$file"

  # Marketplace repo count — only with qualifying words
  sedi -E "s/[0-9]+ marketplace repos/${REPO_COUNT} marketplace repos/g" "$file"
  sedi -E "s/[0-9]+ marketplaces/${REPO_COUNT} marketplaces/g" "$file"
  sedi -E "s/[0-9]+ external repositories/${REPO_COUNT} external repositories/g" "$file"
  sedi -E "s/[0-9]+ marketplace submodules/${REPO_COUNT} marketplace submodules/g" "$file"
  sedi -E "s/[0-9]+ marketplace repositories/${REPO_COUNT} marketplace repositories/g" "$file"
  sedi -E "s/[0-9]+ community plugin marketplaces/${REPO_COUNT} community plugin marketplaces/g" "$file"
  sedi -E "s/[0-9]+ community-maintained GitHub repositories/${REPO_COUNT} community-maintained GitHub repositories/g" "$file"
  sedi -E "s/[0-9]+ upstream repositories/${REPO_COUNT} upstream repositories/g" "$file"
  sedi -E "s/[0-9]+ plugin repositories/${REPO_COUNT} plugin repositories/g" "$file"
  sedi -E "s/[0-9]+ community repos/${REPO_COUNT} community repos/g" "$file"
  sedi -E "s/[0-9]+ total external repos/${REPO_COUNT} total external repos/g" "$file"
  sedi -E "s/[0-9]+ repos total/${REPO_COUNT} repos total/g" "$file"

  # Marketplace skill count — comma format is unique to global counts
  sedi -E "s/[0-9]+,[0-9]+\+ (marketplace )?skills/${MARKET_DISPLAY_PLUS} \1skills/g" "$file"
  sedi -E "s/[0-9]+,[0-9]+\+ additional skills/${MARKET_DISPLAY_PLUS} additional skills/g" "$file"
  sedi -E "s/[0-9]+,[0-9]+\+ more/${MARKET_DISPLAY_PLUS} more/g" "$file"
  sedi -E "s/[0-9]+,[0-9]+\+ community skills/${MARKET_DISPLAY_PLUS} community skills/g" "$file"
  sedi -E "s/[0-9]+,[0-9]+\+ Community Skills/${MARKET_DISPLAY_PLUS} Community Skills/g" "$file"
  # "over N,NNN additional" (no + suffix)
  sedi -E "s/over [0-9]+,[0-9]+ additional/over ${MARKET_DISPLAY_PLUS} additional/g" "$file"

  # "across N repos" pattern
  sedi -E "s/across [0-9]+ repos/across ${REPO_COUNT} repos/g" "$file"
  # "from N repos" and "in N repos"
  sedi -E "s/from [0-9]+ repos/from ${REPO_COUNT} repos/g" "$file"
  # "from N plugin repositories"
  sedi -E "s/from [0-9]+ plugin repositories/from ${REPO_COUNT} plugin repositories/g" "$file"

  # "N,NNN+ community-contributed skills"
  sedi -E "s/[0-9]+,[0-9]+\+ community-contributed skills/${MARKET_DISPLAY_PLUS} community-contributed skills/g" "$file"

  # YAML frontmatter: "N community plugin marketplaces with N,NNN+"
  sedi -E "s/[0-9]+ community plugin marketplaces with [0-9]+,[0-9]+\+/${REPO_COUNT} community plugin marketplaces with ${MARKET_DISPLAY_PLUS}/g" "$file"

  # Health-check/stat line: "(N skills, N agents, N markets)"
  sedi -E "s/\([0-9]+ skills, [0-9]+ agents, [0-9]+ markets\)/(${SKILL_COUNT} skills, ${AGENT_COUNT} agents, ${REPO_COUNT} markets)/g" "$file"

  # Frontmatter: "N skills, N agents" (without further qualifier)
  sedi -E "s/[0-9]+ skills, [0-9]+ agents/${SKILL_COUNT} skills, ${AGENT_COUNT} agents/g" "$file"

  # Directory tree comments: "# N submodules"
  sedi -E "s/# [0-9]+ submodules/# ${REPO_COUNT} submodules/g" "$file"

  # Total repos: "N (1 parent + N submodules)"
  TOTAL_REPOS=$((REPO_COUNT + 1))
  sedi -E "s/[0-9]+ \(1 parent \+ [0-9]+ submodules\)/${TOTAL_REPOS} (1 parent + ${REPO_COUNT} submodules)/g" "$file"

  # Parenthetical agent catalog: "catalog (N agents)" or "Subagent catalog (N agents)"
  sedi -E "s/catalog \([0-9]+ agents\)/catalog (${AGENT_COUNT} agents)/g" "$file"

  # Emoji stat lines: "🎓 **N Skills** · 🤖 **N Agents** · 🏪 **N Marketplaces** · ⌨️ **N Commands** · 🪝 **N Hooks**"
  sedi -E "s/🎓 \*\*[0-9]+ Skills\*\*/🎓 **${SKILL_COUNT} Skills**/" "$file"
  sedi -E "s/🤖 \*\*[0-9]+ Agents\*\*/🤖 **${AGENT_COUNT} Agents**/" "$file"
  sedi -E "s/🏪 \*\*[0-9]+ Marketplaces\*\*/🏪 **${REPO_COUNT} Marketplaces**/" "$file"
  sedi -E "s/⌨️ \*\*[0-9]+ Commands\*\*/⌨️ **${COMMAND_COUNT} Commands**/" "$file"
  sedi -E "s/🪝 \*\*[0-9]+ Hooks\*\*/🪝 **${HOOK_COUNT} Hooks**/" "$file"

  # "LOCAL SKILLS (N total)" section headers
  sedi -E "s/LOCAL SKILLS \([0-9]+ total\)/LOCAL SKILLS (${SKILL_COUNT} total)/g" "$file"

  # "MARKETPLACE SKILLS (N,NNN+)" section headers
  sedi -E "s/MARKETPLACE SKILLS \([0-9]+,[0-9]+\+\)/MARKETPLACE SKILLS (${MARKET_DISPLAY_PLUS})/g" "$file"

  # "N Marketplace Repos" (capitalized)
  sedi -E "s/[0-9]+ Marketplace Repos/${REPO_COUNT} Marketplace Repos/g" "$file"

  # FOLDER-STRUCTURE patterns: "N directories, N SKILL.md files" and "N SKILL.md files across N directories"
  sedi -E "s/[0-9]+ directories, [0-9]+ SKILL\.md files/${SKILL_DIR_COUNT} directories, ${SKILL_COUNT} SKILL.md files/g" "$file"
  sedi -E "s/[0-9]+ SKILL\.md files across [0-9]+ directories/${SKILL_COUNT} SKILL.md files across ${SKILL_DIR_COUNT} directories/g" "$file"

  check_changed "$file" "$before"
}

# ─── Update badge-specific patterns in README ────────────────────────

update_readme_badges() {
  local file="README.md"
  [ -f "$file" ] || return 0

  # Shield.io badge patterns (no plus on Skills/Agents, comma format on Marketplace_Skills)
  sedi -E "s/Skills-[0-9]+-/Skills-${SKILL_COUNT}-/g" "$file"
  sedi -E "s/Agents-[0-9]+-/Agents-${AGENT_COUNT}-/g" "$file"
  sedi -E "s/Marketplaces-[0-9]+-/Marketplaces-${REPO_COUNT}-/g" "$file"
  sedi -E "s/Marketplace_Skills-[0-9,]+\+-/Marketplace_Skills-${MARKET_BADGE}-/g" "$file"
  sedi -E "s/Commands-[0-9]+-/Commands-${COMMAND_COUNT}-/g" "$file"
  sedi -E "s/Hooks-[0-9]+-/Hooks-${HOOK_COUNT}-/g" "$file"
  sedi -E "s/Rules-[0-9]+-/Rules-${RULE_COUNT}-/g" "$file"
  sedi -E "s/Templates-[0-9]+-/Templates-${TEMPLATE_COUNT}-/g" "$file"

  # Table bold counts on rows containing "Skills"/"Agents"/"Marketplaces"
  sedi -E "/Skills/s/\*\*[0-9]+\*\*/**${SKILL_COUNT}**/" "$file"
  sedi -E "/Agents.*\| \*\*[0-9]+\*\*/s/\*\*[0-9]+\*\*/**${AGENT_COUNT}**/" "$file"
  sedi -E "/Marketplaces.*\| \*\*[0-9]+\*\*/s/\*\*[0-9]+\*\*/**${REPO_COUNT}**/" "$file"

  # TOC anchors: (72 Skills) → (${SKILL_COUNT} Skills)
  sedi -E "s/\([0-9]+ Skills\)/(${SKILL_COUNT} Skills)/g" "$file"
  sedi -E "s/\([0-9]+ Agents\)/(${AGENT_COUNT} Agents)/g" "$file"
  sedi -E "s/\([0-9]+ Marketplaces\)/(${REPO_COUNT} Marketplaces)/g" "$file"

  # Anchor links: -72-skills → -${SKILL_COUNT}-skills
  sedi -E "s/-[0-9]+-skills/-${SKILL_COUNT}-skills/g" "$file"
  sedi -E "s/-[0-9]+-agents/-${AGENT_COUNT}-agents/g" "$file"
  sedi -E "s/-[0-9]+-marketplaces/-${REPO_COUNT}-marketplaces/g" "$file"

  # Section headers
  sedi -E "s/Reference \([0-9]+ Skills\)/Reference (${SKILL_COUNT} Skills)/" "$file"
  sedi -E "s/Reference \([0-9]+ Agents\)/Reference (${AGENT_COUNT} Agents)/" "$file"
  sedi -E "s/Reference \([0-9]+ Marketplaces\)/Reference (${REPO_COUNT} Marketplaces)/" "$file"

  # ASCII art stat boxes
  sedi -E "s/[0-9]+ local/${SKILL_COUNT} local/" "$file"
  sedi -E "s/[0-9]+ experts/${AGENT_COUNT} experts/" "$file"

  # ASCII art overview: "Marketplace: N,NNN+"
  sedi -E "s/Marketplace: [0-9]+,[0-9]+\+/Marketplace: ${MARKET_DISPLAY_PLUS}/" "$file"

  # Stat box: "N local + N,NNN+ marketplace"
  sedi -E "s/[0-9]+ local \+ [0-9]+,[0-9]+\+ marketplace/${SKILL_COUNT} local + ${MARKET_DISPLAY_PLUS} marketplace/" "$file"

  # Directory tree comments
  sedi -E "s/# [0-9]+ domain expertise/# ${SKILL_COUNT} domain expertise/" "$file"
  sedi -E "s/# [0-9]+ specialized AI/# ${AGENT_COUNT} specialized AI/" "$file"

  # Token cost lines
  sedi -E "s/All [0-9]+ skills loaded/All ${SKILL_COUNT} skills loaded/" "$file"
  sedi -E "s/All [0-9]+ agents defined/All ${AGENT_COUNT} agents defined/" "$file"

  # ASCII art diagram counts
  sedi -E "s/[0-9]+ modules/${SKILL_COUNT} modules/" "$file"
  sedi -E "s/[0-9]+ specialists/${AGENT_COUNT} specialists/" "$file"
  sedi -E "s/[0-9]+ guides/${RULE_COUNT} guides/" "$file"
  sedi -E "s/[0-9]+ slash commands/${COMMAND_COUNT} slash commands/" "$file"
  sedi -E "s/🪝 [0-9]+ HOOKS/🪝 ${HOOK_COUNT} HOOKS/" "$file"
  sedi -E "s/📁 [0-9]+ TEMPLATES/📁 ${TEMPLATE_COUNT} TEMPLATES/" "$file"

  # ASCII art boxes: "🏪 72 MARKETPLACE REPOS · 5,100+ community skills"
  sedi -E "s/🏪 [0-9]+ MARKETPLACE REPOS/🏪 ${REPO_COUNT} MARKETPLACE REPOS/" "$file"

  # "N Total Repos" and "1 parent + N marketplace" patterns
  TOTAL_REPOS=$((REPO_COUNT + 1))
  sedi -E "s/[0-9]+ Total Repos/${TOTAL_REPOS} Total Repos/g" "$file"
  sedi -E "s/All [0-9]+ repos \(1 parent \+ [0-9]+ marketplace\)/All ${TOTAL_REPOS} repos (1 parent + ${REPO_COUNT} marketplace)/g" "$file"
  sedi -E "s/1 parent \+ [0-9]+ marketplace/1 parent + ${REPO_COUNT} marketplace/g" "$file"

  # "(N repos, N,NNN+ skills)" in directory trees
  sedi -E "s/\([0-9]+ repos, [0-9]+,[0-9]+\+ skills\)/(${REPO_COUNT} repos, ${MARKET_DISPLAY_PLUS} skills)/" "$file"

  # "Marketplace (N repos)" in stat tables
  sedi -E "s/Marketplace \([0-9]+ repos\)/Marketplace (${REPO_COUNT} repos)/" "$file"

  # "(N total external repos)" in directory trees
  sedi -E "s/[0-9]+ total external repos/${REPO_COUNT} total external repos/" "$file"

  # Directory tree: "# N submodules"
  sedi -E "s/# [0-9]+ submodules/# ${REPO_COUNT} submodules/" "$file"

  # Emoji stat lines: "🎓 **N Skills** · 🤖 **N Agents** · ..."
  sedi -E "s/🎓 \*\*[0-9]+ Skills\*\*/🎓 **${SKILL_COUNT} Skills**/" "$file"
  sedi -E "s/🤖 \*\*[0-9]+ Agents\*\*/🤖 **${AGENT_COUNT} Agents**/" "$file"
  sedi -E "s/🏪 \*\*[0-9]+ Marketplaces\*\*/🏪 **${REPO_COUNT} Marketplaces**/" "$file"
  sedi -E "s/⌨️ \*\*[0-9]+ Commands\*\*/⌨️ **${COMMAND_COUNT} Commands**/" "$file"
  sedi -E "s/🪝 \*\*[0-9]+ Hooks\*\*/🪝 **${HOOK_COUNT} Hooks**/" "$file"

  # Section headers: "LOCAL SKILLS (N total)", "MARKETPLACE SKILLS (N,NNN+)"
  sedi -E "s/LOCAL SKILLS \([0-9]+ total\)/LOCAL SKILLS (${SKILL_COUNT} total)/" "$file"
  sedi -E "s/MARKETPLACE SKILLS \([0-9]+,[0-9]+\+\)/MARKETPLACE SKILLS (${MARKET_DISPLAY_PLUS})/" "$file"

  # Total line: "Total: 1,772+"
  local TOTAL=$((SKILL_COUNT + MARKET_SKILL_COUNT))
  local TOTAL_ROUNDED=$(( (TOTAL / 100) * 100 ))
  if [ "$TOTAL_ROUNDED" -ge 1000 ]; then
    TOTAL_DISPLAY="$(printf "%d,%03d" $((TOTAL_ROUNDED / 1000)) $((TOTAL_ROUNDED % 1000)))"
  else
    TOTAL_DISPLAY="$TOTAL_ROUNDED"
  fi
  sedi -E "s/Total: [0-9,]+\+/Total: ${TOTAL_DISPLAY}+/" "$file"
}

# ─── Generate website marketplace fallback JSON ──────────────────────

generate_marketplace_json() {
  local json_file="website/src/lib/data/marketplace-counts.json"
  [ -d "website/src/lib/data" ] || return 0

  node -e "
const fs = require('fs');
const path = require('path');
const marketDir = path.resolve(__dirname, 'plugins', 'marketplaces');

const EXCLUDE_DIRS = new Set([
  'backups','backup','tests','test','examples','example',
  'docs','workspace','lab','archive','archived','deprecated',
  'draft','drafts','planned-skills','planned','templates',
  'template','node_modules','.git'
]);

function countSkillFiles(dir) {
  let count = 0;
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory() && !item.name.startsWith('.') && !EXCLUDE_DIRS.has(item.name)) {
        count += countSkillFiles(path.join(dir, item.name));
      } else if (item.name === 'SKILL.md') count++;
    }
  } catch {}
  return count;
}

if (!fs.existsSync(marketDir)) { process.exit(0); }
const entries = fs.readdirSync(marketDir, { withFileTypes: true });
const repos = [];
let totalSkills = 0;
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  const count = countSkillFiles(path.join(marketDir, entry.name));
  const displayName = entry.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  repos.push({ name: entry.name, displayName, skillCount: count });
  totalSkills += count;
}
repos.sort((a, b) => b.skillCount - a.skillCount);
fs.writeFileSync('$json_file', JSON.stringify({ repoCount: repos.length, totalSkills, repos }, null, 2) + '\n');
console.log('  ✓ Generated $json_file (' + repos.length + ' repos, ' + totalSkills + ' skills)');
" 2>/dev/null || echo "  ⚠ Node.js not available, skipping marketplace JSON generation"
}

# ─── Update website files ────────────────────────────────────────────

update_website() {
  local file

  # layout.tsx: metadata description and OG/Twitter
  file="website/src/app/layout.tsx"
  if [ -f "$file" ]; then
    sedi -E "s/[0-9]+ local skills, [0-9]+ specialized agents/${SKILL_COUNT} local skills, ${AGENT_COUNT} specialized agents/" "$file"
    sedi -E "s/[0-9]+ Skills, [0-9]+ Agents/${SKILL_COUNT} Skills, ${AGENT_COUNT} Agents/" "$file"
    # Marketplace skills pattern: "1,900+" or "5,100+"
    sedi -E "s/[0-9]+,[0-9]+\+ marketplace skills/${MARKET_DISPLAY_PLUS} marketplace skills/" "$file"
    sedi -E "s/[0-9]+,[0-9]+\+ Marketplace Skills/${MARKET_DISPLAY_PLUS} Marketplace Skills/" "$file"
    sedi -E "s/across [0-9]+ repos/across ${REPO_COUNT} repos/" "$file"
  fi

  # Footer.tsx: "85 skills, 47 agents, and 5,200+ marketplace skills across 72 repos"
  file="website/src/components/layout/Footer.tsx"
  if [ -f "$file" ]; then
    sedi -E "s/[0-9]+ skills, [0-9]+ agents/${SKILL_COUNT} skills, ${AGENT_COUNT} agents/" "$file"
    sedi -E "s/[0-9]+,[0-9]+\+[[:space:]]*marketplace skills/${MARKET_DISPLAY_PLUS} marketplace skills/" "$file"
    sedi -E "s/across [0-9]+ repos/across ${REPO_COUNT} repos/" "$file"
    sedi -E "s/[0-9]+ repos/${REPO_COUNT} repos/" "$file"
  fi

  # ConsoleGreeting.tsx: "85 Skills  •  47 Agents  •  5,200+ Marketplace Skills  •  72 Repos"
  file="website/src/components/ConsoleGreeting.tsx"
  if [ -f "$file" ]; then
    sedi -E "s/[0-9]+ Skills  •  [0-9]+ Agents/${SKILL_COUNT} Skills  •  ${AGENT_COUNT} Agents/" "$file"
    sedi -E "s/[0-9]+,[0-9]+\+ Marketplace Skills/${MARKET_DISPLAY_PLUS} Marketplace Skills/" "$file"
    sedi -E "s/[0-9]+ Repos/${REPO_COUNT} Repos/" "$file"
  fi
}

# ─── Update list-skills.md header line only ──────────────────────────

update_list_skills() {
  local file="commands/list-skills.md"
  [ -f "$file" ] || return 0
  local before
  before=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)

  # Only update the "Local Skills (N total)" header and footer line
  sedi -E "s/Local Skills \([0-9]+ total\)/Local Skills (${SKILL_COUNT} total)/" "$file"
  # Footer: "72 local skills + 51 marketplaces (1,700+ skills)"
  sedi -E "s/[0-9]+ local skills \+ [0-9]+ marketplaces/${SKILL_COUNT} local skills + ${REPO_COUNT} marketplaces/" "$file"
  sedi -E "s/\([0-9]+,[0-9]+\+ skills\)/(${MARKET_DISPLAY_PLUS} skills)/" "$file"
  # "Marketplace Skills (1,700+ total across 51 repos)"
  sedi -E "s/Marketplace Skills \([0-9]+,[0-9]+\+ total across [0-9]+ repos\)/Marketplace Skills (${MARKET_DISPLAY_PLUS} total across ${REPO_COUNT} repos)/" "$file"

  check_changed "$file" "$before"
}

# ─── Update MARKETPLACE-GUIDE.md header/footer only ──────────────────

update_marketplace_guide() {
  local file="docs/MARKETPLACE-GUIDE.md"
  [ -f "$file" ] || return 0
  local before
  before=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)

  # Title line: "Complete reference for the N plugin marketplaces"
  sedi -E "s/the [0-9]+ plugin marketplaces/the ${REPO_COUNT} plugin marketplaces/" "$file"
  # Section header: "Installed Marketplaces (N)"
  sedi -E "s/Installed Marketplaces \([0-9]+\)/Installed Marketplaces (${REPO_COUNT})/" "$file"
  # Footer line: "N marketplaces, N,NNN+ skills"
  sedi -E "s/[0-9]+ marketplaces, [0-9]+,[0-9]+\+ skills/${REPO_COUNT} marketplaces, ${MARKET_DISPLAY_PLUS} skills/" "$file"
  # YAML frontmatter: "N community plugin marketplaces with N,NNN+"
  sedi -E "s/[0-9]+ community plugin marketplaces with [0-9]+,[0-9]+\+/${REPO_COUNT} community plugin marketplaces with ${MARKET_DISPLAY_PLUS}/" "$file"

  check_changed "$file" "$before"
}

# ─── Update skill-finder.md description only ─────────────────────────

update_skill_finder() {
  local file="commands/skill-finder.md"
  [ -f "$file" ] || return 0
  local before
  before=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)

  # Description line: "72 local skills + 51 marketplaces (1,700+ skills)"
  sedi -E "s/[0-9]+ local skills \+ [0-9]+ marketplaces/${SKILL_COUNT} local skills + ${REPO_COUNT} marketplaces/" "$file"
  sedi -E "s/\([0-9]+,[0-9]+\+ skills\)/(${MARKET_DISPLAY_PLUS} skills)/" "$file"
  # "51 marketplace repositories" in body
  sedi -E "s/[0-9]+ marketplace repositories/${REPO_COUNT} marketplace repositories/" "$file"
  # Footer: "72 local skills + 51 marketplaces (1,700+ skills)"
  sedi -E "s/[0-9]+ local skills \+ [0-9]+ marketplaces/${SKILL_COUNT} local skills + ${REPO_COUNT} marketplaces/" "$file"

  check_changed "$file" "$before"
}

# ─── Update plugin.json counts ────────────────────────────────────────

update_plugin_json() {
  local file="plugin.json"
  [ -f "$file" ] || return 0
  local before
  before=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)

  # Update skills and agents counts using node for JSON safety
  node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('$file', 'utf-8'));
if (data.components?.skills) data.components.skills.count = ${SKILL_COUNT};
if (data.components?.agents) data.components.agents.count = ${AGENT_COUNT};
fs.writeFileSync('$file', JSON.stringify(data, null, 2) + '\n');
" 2>/dev/null || true
  # Update description line
  sedi -E "s/[0-9]+ local skills, [0-9]+ specialized agents/${SKILL_COUNT} local skills, ${AGENT_COUNT} specialized agents/" "$file"
  sedi -E "s/[0-9]+ local skills covering/${SKILL_COUNT} local skills covering/" "$file"
  sedi -E "s/[0-9]+ specialized AI agents/${AGENT_COUNT} specialized AI agents/" "$file"
  sedi -E "s/[0-9]+ marketplace repos/${REPO_COUNT} marketplace repos/" "$file"
  sedi -E "s/marketplace repos with [0-9]+,[0-9]+\+ additional skills/marketplace repos with ${MARKET_DISPLAY_PLUS} additional skills/" "$file"

  check_changed "$file" "$before"
}

# ─── Execute updates ─────────────────────────────────────────────────

echo "Updating documentation counts..."
echo ""

# README (special handling for badges, tables, anchors)
update_readme_badges
update_file "README.md"

# Website
generate_marketplace_json
update_website

# Skills docs
update_file "skills/README.md"

# Docs — MARKETPLACE-GUIDE gets special handling (has per-repo counts)
update_marketplace_guide
update_file "docs/NEW-DEVICE-SETUP.md"
update_file "docs/SETUP-GUIDE.md"
update_file "docs/AUTO-CLAUDE-GUIDE.md"
update_file "docs/README.md"
update_file "docs/CLAUDE-CODE-RESOURCES.md"
update_file "docs/FOLDER-STRUCTURE.md"
update_file "docs/ARCHITECTURE.md"
update_file "docs/workflow-automation.md"
update_file "docs/AGENT-TEAMS.md"
update_file "docs/OPUS-4-6-GUIDE.md"
update_file "docs/FAQ.md"
update_file "docs/GLOSSARY.md"
update_file "docs/PLUGIN-MANAGEMENT.md"
update_file "docs/MAINTENANCE.md"
update_file "docs/SKILLS.md"

# Scripts README
update_file "scripts/README.md"

# Rules tooling
update_file "rules/tooling/external-repos.md"

# Rules workflows
update_file "rules/workflows/agent-teams.md"

# Agents README
update_file "agents/README.md"

# Hooks README
update_file "hooks/README.md"

# Templates README
update_file "templates/README.md"

# Rules README
update_file "rules/README.md"

# Commands — list-skills and skill-finder get special handling
# Health-check has a special "N+ files" pattern on the agents row
file="commands/health-check.md"
if [ -f "$file" ]; then
  before=$(md5sum "$file" 2>/dev/null || md5 "$file" 2>/dev/null)
  sedi -E "/agents\//s/[0-9]+\+ files/${AGENT_COUNT}+ files/" "$file"
  check_changed "$file" "$before"
fi
update_file "commands/health-check.md"
update_list_skills
update_skill_finder
update_file "commands/start-task.md"
update_file "commands/bootstrap.md"
update_file "commands/pull-repos.md"

# CLAUDE.md
update_file "CLAUDE.md"

# plugin.json
update_plugin_json

# Regenerate MASTER_INDEX.md
if [ -f "scripts/regenerate-index.sh" ]; then
  echo ""
  echo "Regenerating MASTER_INDEX.md..."
  bash scripts/regenerate-index.sh
fi

# ─── Generate counts.json (public API for external projects) ─────────

cat > counts.json << COUNTSJSON
{
  "skills": $SKILL_COUNT,
  "agents": $AGENT_COUNT,
  "repos": $REPO_COUNT,
  "commands": $COMMAND_COUNT,
  "hooks": $HOOK_COUNT,
  "rules": $RULE_COUNT,
  "templates": $TEMPLATE_COUNT,
  "checklists": $CHECKLIST_COUNT,
  "mcpServers": $MCP_COUNT,
  "marketplaceSkills": $MARKET_SKILL_COUNT,
  "marketplaceSkillsDisplay": "${MARKET_DISPLAY_PLUS}"
}
COUNTSJSON
echo "  ✓ Generated counts.json"

echo ""
echo "─────────────────────────────────────────"
echo "Done. $CHANGED file(s) updated."
echo ""
echo "Definitive counts:"
echo "  Skills:      $SKILL_COUNT"
echo "  Agents:      $AGENT_COUNT"
echo "  Commands:    $COMMAND_COUNT"
echo "  Hooks:       $HOOK_COUNT"
echo "  Rules:       $RULE_COUNT"
echo "  Templates:   $TEMPLATE_COUNT"
echo "  Checklists:  $CHECKLIST_COUNT"
echo "  MCP Servers: $MCP_COUNT"
echo "  Repos:       $REPO_COUNT"
echo "  Mkt Skills:  $MARKET_SKILL_COUNT (${MARKET_DISPLAY_PLUS})"
