#!/bin/bash
# Regenerate skills/MASTER_INDEX.md from actual directory contents
# Usage: bash ~/.claude/scripts/regenerate-index.sh

SKILLS_DIR="$HOME/.claude/skills"
INDEX="$SKILLS_DIR/MASTER_INDEX.md"

echo "# Skills Master Index" > "$INDEX"
echo "" >> "$INDEX"
echo "> Auto-generated on $(date '+%Y-%m-%d %H:%M'). Run \`bash ~/.claude/scripts/regenerate-index.sh\` to refresh." >> "$INDEX"
echo "" >> "$INDEX"
echo "## Discovery Protocol" >> "$INDEX"
echo "" >> "$INDEX"
echo "1. Check this index first" >> "$INDEX"
echo "2. Search marketplace: \`find ~/.claude/plugins/marketplaces -name \"SKILL.md\" | xargs grep -li \"<keyword>\"\`" >> "$INDEX"
echo "3. External: \`/discover-skills <query>\`" >> "$INDEX"
echo "" >> "$INDEX"
echo "---" >> "$INDEX"
echo "" >> "$INDEX"
echo "## Local Skills" >> "$INDEX"
echo "" >> "$INDEX"
echo "| Skill | Description |" >> "$INDEX"
echo "| ----- | ----------- |" >> "$INDEX"

for dir in "$SKILLS_DIR"/*/; do
  [ -d "$dir" ] || continue
  name=$(basename "$dir")
  skill_file="$dir/SKILL.md"
  if [ -f "$skill_file" ]; then
    # Extract description from YAML frontmatter if available
    desc=$(sed -n '/^---$/,/^---$/p' "$skill_file" 2>/dev/null | grep -m1 '^description:' | sed 's/^description:\s*//' | sed 's/^>-\s*//' | sed 's/|/\\|/g' | cut -c1-80)
    # If multiline description (>-), grab the next line instead
    if [ -z "$desc" ] || [ "$desc" = ">-" ]; then
      desc=$(sed -n '/^---$/,/^---$/p' "$skill_file" 2>/dev/null | grep -A1 '^description:' | tail -1 | sed 's/^\s*//' | sed 's/|/\\|/g' | cut -c1-80)
    fi
    # Fallback: first line after frontmatter that's not a heading
    if [ -z "$desc" ]; then
      desc=$(awk '/^---$/{c++;next} c==2{if(/^[^#]/ && !/^$/ && !/^---/){print;exit}}' "$skill_file" 2>/dev/null | sed 's/|/\\|/g' | cut -c1-80)
    fi
    [ -z "$desc" ] && desc="(no description)"
  else
    desc="(no SKILL.md)"
  fi
  echo "| \`$name\` | $desc |" >> "$INDEX"
done

echo "" >> "$INDEX"
echo "---" >> "$INDEX"
echo "" >> "$INDEX"

# Count marketplace skills (exclude backups, tests, examples, docs, etc.)
# Must match exclusions in update-counts.sh for consistency
EXCLUDE_SKILL_DIRS=(
  backups backup tests test examples example docs workspace lab
  archive archived deprecated draft drafts planned-skills planned
  templates template node_modules .git
)
FIND_EXCLUDES=()
for dir in "${EXCLUDE_SKILL_DIRS[@]}"; do
  FIND_EXCLUDES+=(-not -path "*/$dir/*")
done
FIND_EXCLUDES+=(-not -path "*/\.*/*")
cd "$HOME/.claude"
MARKETPLACE_COUNT=$(find plugins/marketplaces -name "SKILL.md" "${FIND_EXCLUDES[@]}" 2>/dev/null | wc -l | tr -d ' ')
REPO_COUNT=$(ls -d plugins/marketplaces/*/ 2>/dev/null | wc -l | tr -d ' ')

echo "## Marketplace: ${MARKETPLACE_COUNT} skills across ${REPO_COUNT} repos" >> "$INDEX"
echo "" >> "$INDEX"
echo "Search: \`find ~/.claude/plugins/marketplaces -name \"SKILL.md\" | xargs grep -li \"<keyword>\"\`" >> "$INDEX"

echo "Regenerated $INDEX with $(grep -c '^\| `' "$INDEX") local skills"
