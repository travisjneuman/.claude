# Update Documentation

Scan for recently modified files and update corresponding documentation.

## Instructions

1. Check which files were modified in this session using `git diff --name-only` and `git diff --cached --name-only`
2. For each modified area, update the corresponding docs:

| Modified Area | Update |
| ------------- | ------ |
| `skills/` | Regenerate `skills/MASTER_INDEX.md` — run `bash ~/.claude/scripts/regenerate-index.sh` |
| `commands/` | Verify command appears in skill listings |
| `agents/` | Update `agents/README.md` |
| `hooks/` or `settings.json` | Update `docs/reference/tooling/` docs as needed |
| `rules/` | Update `rules/README.md` index |
| `CLAUDE.md` | Verify satellite files are consistent |
| `plugins/` | Update `docs/MARKETPLACE-GUIDE.md` if plugin list changed |

3. Update `cache/changelog.md` with a summary of changes made
4. Commit documentation updates together with the changes they describe

If arguments provided, focus on: $ARGUMENTS
