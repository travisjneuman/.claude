---
description: Scan recently modified files and update the matching documentation
---
# Update Documentation

Scan for recently modified files and update corresponding documentation.

## Instructions

First follow [Memory and documentation](../CLAUDE.md#memory-and-documentation) to update the owning subject note before the repository docs below.

1. Check which files were modified in this session using `git diff --name-only` and `git diff --cached --name-only`
2. For each modified area, update the corresponding docs:

| Modified Area | Update |
| ------------- | ------ |
| `skills/` | Regenerate `skills/MASTER_INDEX.md` — run `bash ~/.claude/scripts/regenerate-index.sh` |
| `commands/` | Verify command appears in skill listings |
| `agents/` | Update `agents/README.md` |
| `hooks/` or `settings.json` | Update `docs/reference/tooling/` docs as needed |
| `CLAUDE.md` | Verify satellite files are consistent |
| `plugins/` | Update `docs/MARKETPLACE-GUIDE.md` if plugin list changed |

3. Update the existing public changelog when an entry is warranted; do not put durable project knowledge in a cache log
4. Commit documentation updates together with the changes they describe

If arguments provided, focus on: $ARGUMENTS
