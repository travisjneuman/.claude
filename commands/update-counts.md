---
description: Update all hardcoded counts (skills, agents, marketplace repos/skills) across documentation from filesystem
---

Run the count updater script to sync all documentation with actual filesystem counts:

```bash
bash ~/.claude/scripts/update-counts.sh
```

This script:
1. Counts skills, agents, marketplace repos, and marketplace skills from the filesystem
2. Updates all hardcoded references across README.md, website files, commands, and docs
3. Regenerates skills/MASTER_INDEX.md

Run this after pulling repos, adding/removing skills or agents, or before committing.
