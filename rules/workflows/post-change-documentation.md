# Post-Change Documentation Workflow

**When to use:** ALWAYS — after ANY code, configuration, skill, hook, command, or agent change.

---

## P0 Rule: Never Ship Without Docs

Every change that modifies behavior, adds features, or changes counts MUST include corresponding documentation updates. This is not optional.

---

## After Every Change, Update These Files

### Always Check

| File | Update When... |
|------|---------------|
| `CHANGELOG.md` | Any user-facing change (new entry at top) |
| `README.md` (root) | Version badge, tagline counts, resource badges |
| `docs/README.md` | "Toolkit at a Glance" table counts, history section |
| `docs/FOLDER-STRUCTURE.md` | New files/directories added, version number |

### When Counts Change

| File | Update When... |
|------|---------------|
| `commands/health-check.md` | Skill, agent, or marketplace repo count changes |
| `commands/update-counts.md` | Count update workflow changes |
| `scripts/README.md` | New scripts added |

### When Features Change

| File | Update When... |
|------|---------------|
| `website/README.md` | Website architecture or build process changes |
| `skills/README.md` | Skills added or removed |
| `agents/README.md` | Agents added or removed |
| `commands/README.md` | Commands added or removed |
| `hooks/README.md` | Hooks added or removed |
| `rules/README.md` | Rule files added or removed |
| `templates/README.md` | Templates added or removed |

---

## Version Numbering

| Change Type | Version Bump | Example |
|------------|-------------|---------|
| Bug fix, count correction | Patch (x.x.+1) | 2.3.4 → 2.3.5 |
| New feature, new skill/agent | Minor (x.+1.0) | 2.3.0 → 2.4.0 |
| Breaking change, major restructure | Major (+1.0.0) | 2.0.0 → 3.0.0 |

---

## Documentation Update Checklist

Before committing any change:

- [ ] CHANGELOG.md updated with new version entry
- [ ] Root README.md version badge updated
- [ ] Root README.md tagline counts accurate
- [ ] docs/README.md "Toolkit at a Glance" counts accurate
- [ ] docs/README.md history section updated
- [ ] docs/FOLDER-STRUCTURE.md version updated
- [ ] Any affected index/README files updated
- [ ] No stale counts anywhere in documentation

---

## Quick Grep for Stale Counts

After changing counts, verify no stale references remain:

```bash
# Check for old version numbers
grep -r "v2.3.4" docs/ commands/ scripts/ README.md --include="*.md"

# Check for old skill count
grep -r "73 skills\|73 local" docs/ commands/ --include="*.md"

# Check for old agent count
grep -r "36 agents" docs/ commands/ --include="*.md"

# Check for old marketplace count
grep -r "68 marketplace\|68 repos" docs/ commands/ --include="*.md"
```

---

## Why This Exists

Documentation drift is the #1 source of confusion for users. When counts, version numbers, or feature descriptions don't match reality, trust erodes. Every code change ships with docs — no exceptions.

---

## Related Documentation

- `~/.claude/CLAUDE.md` — Core rules (includes "update corresponding README/index files")
- `~/.claude/rules/README.md` — Rules index
- `~/.claude/docs/README.md` — Documentation hub

---

_If you changed code, you changed documentation. Period._
