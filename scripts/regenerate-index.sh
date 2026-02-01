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
    # Extract first non-empty, non-heading line as description
    desc=$(grep -m1 -v '^#\|^$\|^---\|^>' "$skill_file" 2>/dev/null | head -1 | sed 's/|/\\|/g' | cut -c1-80)
    [ -z "$desc" ] && desc="(no description)"
  else
    desc="(no SKILL.md)"
  fi
  echo "| \`$name\` | $desc |" >> "$INDEX"
done

echo "" >> "$INDEX"
echo "---" >> "$INDEX"
echo "" >> "$INDEX"

# Count marketplace skills
MARKETPLACE_COUNT=$(find "$HOME/.claude/plugins/marketplaces" -name "SKILL.md" 2>/dev/null | wc -l | tr -d ' ')
REPO_COUNT=$(ls -d "$HOME/.claude/plugins/marketplaces"/*/ 2>/dev/null | wc -l | tr -d ' ')

echo "## Marketplace: ${MARKETPLACE_COUNT} skills across ${REPO_COUNT} repos" >> "$INDEX"
echo "" >> "$INDEX"
echo "Search: \`find ~/.claude/plugins/marketplaces -name \"SKILL.md\" | xargs grep -li \"<keyword>\"\`" >> "$INDEX"

echo "Regenerated $INDEX with $(grep -c '^\| `' "$INDEX") local skills"
