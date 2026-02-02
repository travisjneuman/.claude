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

# ─── Count from filesystem ───────────────────────────────────────────

SKILL_COUNT=$(find skills -name "SKILL.md" -not -path "skills/_shared/*" 2>/dev/null | wc -l | tr -d ' ')
AGENT_COUNT=$(ls agents/*.md 2>/dev/null | grep -cv 'README\.md' || echo 0)
REPO_COUNT=$(ls -d plugins/marketplaces/*/ 2>/dev/null | wc -l | tr -d ' ')
MARKET_SKILL_COUNT=$(find plugins/marketplaces -name "SKILL.md" 2>/dev/null | wc -l | tr -d ' ')

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

  # Marketplace repo count — only with qualifying words
  sedi -E "s/[0-9]+ marketplace repos/${REPO_COUNT} marketplace repos/g" "$file"
  sedi -E "s/[0-9]+ marketplaces/${REPO_COUNT} marketplaces/g" "$file"
  sedi -E "s/[0-9]+ external repositories/${REPO_COUNT} external repositories/g" "$file"
  sedi -E "s/[0-9]+ marketplace submodules/${REPO_COUNT} marketplace submodules/g" "$file"
  sedi -E "s/[0-9]+ marketplace repositories/${REPO_COUNT} marketplace repositories/g" "$file"

  # Marketplace skill count — comma format is unique to global counts
  sedi -E "s/[0-9]+,[0-9]+\+ (marketplace )?skills/${MARKET_DISPLAY_PLUS} \1skills/g" "$file"
  sedi -E "s/[0-9]+,[0-9]+\+ additional skills/${MARKET_DISPLAY_PLUS} additional skills/g" "$file"
  sedi -E "s/[0-9]+,[0-9]+\+ more/${MARKET_DISPLAY_PLUS} more/g" "$file"

  # "across N repos" pattern
  sedi -E "s/across [0-9]+ repos/across ${REPO_COUNT} repos/g" "$file"

  check_changed "$file" "$before"
}

# ─── Update badge-specific patterns in README ────────────────────────

update_readme_badges() {
  local file="README.md"
  [ -f "$file" ] || return 0

  # Shield.io badge patterns
  sedi -E "s/Skills-[0-9]+\+-/Skills-${SKILL_COUNT}+-/" "$file"
  sedi -E "s/Agents-[0-9]+\+-/Agents-${AGENT_COUNT}+-/" "$file"
  sedi -E "s/Marketplaces-[0-9]+-/Marketplaces-${REPO_COUNT}-/" "$file"
  sedi -E "s/Marketplace_Skills-[0-9]+\+-/Marketplace_Skills-${MARKET_BADGE}-/" "$file"

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

  # Directory tree comments
  sedi -E "s/# [0-9]+ domain expertise/# ${SKILL_COUNT} domain expertise/" "$file"
  sedi -E "s/# [0-9]+ specialized AI/# ${AGENT_COUNT} specialized AI/" "$file"

  # Token cost lines
  sedi -E "s/All [0-9]+ skills loaded/All ${SKILL_COUNT} skills loaded/" "$file"
  sedi -E "s/All [0-9]+ agents defined/All ${AGENT_COUNT} agents defined/" "$file"

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

function countSkillFiles(dir) {
  let count = 0;
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
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

  # layout.tsx: "72 local skills, 36 specialized agents"
  file="website/src/app/layout.tsx"
  [ -f "$file" ] || return 0
  sedi -E "s/[0-9]+ local skills, [0-9]+ specialized agents/${SKILL_COUNT} local skills, ${AGENT_COUNT} specialized agents/" "$file"
  sedi -E "s/[0-9]+ Skills, [0-9]+ Agents/${SKILL_COUNT} Skills, ${AGENT_COUNT} Agents/" "$file"

  # Footer.tsx: "72 skills, 36 agents"
  file="website/src/components/layout/Footer.tsx"
  [ -f "$file" ] || return 0
  sedi -E "s/[0-9]+ skills, [0-9]+ agents/${SKILL_COUNT} skills, ${AGENT_COUNT} agents/" "$file"
  sedi -E "s/[0-9]+ repos/${REPO_COUNT} repos/" "$file"

  # ConsoleGreeting.tsx: "72 Skills  •  36 Agents"
  file="website/src/components/ConsoleGreeting.tsx"
  [ -f "$file" ] || return 0
  sedi -E "s/[0-9]+ Skills  •  [0-9]+ Agents/${SKILL_COUNT} Skills  •  ${AGENT_COUNT} Agents/" "$file"
  sedi -E "s/[0-9]+ Repos/${REPO_COUNT} Repos/" "$file"
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

  # Update skills count
  sedi -E "/\"skills\"/,/\"count\"/{s/\"count\": [0-9]+/\"count\": ${SKILL_COUNT}/}" "$file"
  # Update agents count
  sedi -E "/\"agents\"/,/\"count\"/{s/\"count\": [0-9]+/\"count\": ${AGENT_COUNT}/}" "$file"
  # Update description line
  sedi -E "s/[0-9]+ local skills, [0-9]+ specialized agents/${SKILL_COUNT} local skills, ${AGENT_COUNT} specialized agents/" "$file"
  sedi -E "s/[0-9]+ local skills covering/${SKILL_COUNT} local skills covering/" "$file"
  sedi -E "s/[0-9]+ specialized AI agents/${AGENT_COUNT} specialized AI agents/" "$file"
  sedi -E "s/[0-9]+ marketplace repos/${REPO_COUNT} marketplace repos/" "$file"

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

echo ""
echo "─────────────────────────────────────────"
echo "Done. $CHANGED file(s) updated."
echo ""
echo "Definitive counts:"
echo "  Skills:      $SKILL_COUNT"
echo "  Agents:      $AGENT_COUNT"
echo "  Repos:       $REPO_COUNT"
echo "  Mkt Skills:  $MARKET_SKILL_COUNT (${MARKET_DISPLAY_PLUS})"
