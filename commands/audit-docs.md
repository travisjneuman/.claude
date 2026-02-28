---
description: Scan documentation for staleness — broken links, outdated counts, stale version references, and inconsistencies
arguments:
  - name: scope
    description: "Optional scope to narrow the audit: 'counts', 'links', 'versions', or 'all' (default: all)"
    required: false
---

# Documentation Audit

Scans all documentation files for staleness, broken references, count mismatches, and version drift.

## Usage

```
/audit-docs [scope]
```

## Execution Protocol

### Step 1: Determine Current Truth

Gather ground-truth values by reading the filesystem directly:

```bash
# Current version (from CHANGELOG.md first entry or package.json)
head -20 ~/.claude/CHANGELOG.md

# Actual skill count
ls ~/.claude/skills/ | grep -v "^_\|README\|MASTER\|EXPERT\|^$" | wc -l

# Actual agent count
ls ~/.claude/agents/*.md 2>/dev/null | wc -l

# Actual command count
ls ~/.claude/commands/*.md 2>/dev/null | wc -l

# Actual marketplace repo count
ls -d ~/.claude/plugins/marketplaces/*/ 2>/dev/null | wc -l

# Actual rule file count
find ~/.claude/rules -name "*.md" -not -name "README.md" | wc -l

# Actual template count
ls ~/.claude/templates/ 2>/dev/null | wc -l

# Actual hook count
grep -c '"PreToolUse"\|"PostToolUse"\|"Notification"\|"UserPromptSubmit"\|"Stop"\|"PreCompact"\|"SubagentStop"' ~/.claude/settings.json
```

Store these as the **source of truth** for comparison.

---

### Step 2: Scan for Version References

If scope is `versions` or `all`:

Search all documentation files for version strings and compare against the current version:

**Directories to scan:** `docs/`, `commands/`, `skills/`, `rules/`, `templates/`, `README.md`, `CHANGELOG.md`

**Patterns to check:**

| Pattern                  | Example Match     | Check Against            |
| ------------------------ | ----------------- | ------------------------ |
| `v\d+\.\d+\.\d+`        | v2.4.0            | Latest version in CHANGELOG |
| `version \d+\.\d+\.\d+` | version 2.4.0     | Latest version in CHANGELOG |
| `Version: \d+\.\d+`     | Version: 2.4      | Latest version in CHANGELOG |

Report any version references that do not match the current version, with file path and line number.

**Exceptions:** CHANGELOG.md itself contains historical versions -- only flag non-CHANGELOG files with outdated versions.

---

### Step 3: Scan for Count Mismatches

If scope is `counts` or `all`:

Search documentation files for count references and compare against ground truth:

**Count patterns to check:**

| Pattern to Search | Example Match | Compare Against |
| --- | --- | --- |
| `\d+ skills` | "119 skills" | Actual skill count |
| `\d+ agents` | "47 agents" | Actual agent count |
| `\d+ commands` | "10 commands" | Actual command count |
| `\d+ market` | "101 marketplace" | Actual marketplace count |
| `\d+ repos` | "101 repos" | Actual marketplace count |
| `\d+ hooks` | "10 hooks" | Actual hook count |
| `\d+ rules` | "13 rules" | Actual rule count |
| `\d+ templates` | "5 templates" | Actual template count |
| `\d+ local skills` | "119 local skills" | Actual skill count |
| `\d+ local agents` | "47 local agents" | Actual agent count |

For each mismatch, report:
- File path
- Line number
- Found value vs expected value

---

### Step 4: Check Relative Links

If scope is `links` or `all`:

Scan all `.md` files in `docs/`, `commands/`, `skills/`, `rules/`, `templates/` for relative markdown links.

**Link patterns to check:**

```
[text](relative/path.md)
[text](../path/to/file.md)
[text](~/.claude/path/to/file.md)
```

For each relative link found:
1. Resolve the path relative to the file containing the link
2. Check if the target file exists
3. Report any broken links with source file, line number, and target path

**Skip:** External URLs (http://, https://), anchor links (#), and mailto: links.

---

### Step 5: Check for Stale Content Indicators

If scope is `all`:

Scan for patterns that suggest stale content:

| Indicator | Pattern | Concern |
| --- | --- | --- |
| Hardcoded dates | Dates more than 90 days old in non-changelog files | May be outdated |
| TODO/FIXME | `TODO`, `FIXME`, `HACK`, `XXX` in docs | Unresolved items |
| Placeholder text | `TBD`, `Coming soon`, `WIP` | Incomplete docs |
| Dead references | References to files or directories that do not exist | Broken refs |

---

### Step 6: Generate Audit Report

Output the report in this format:

```
=== Documentation Audit Report ===
Date: YYYY-MM-DD
Scope: all | counts | links | versions

--- Ground Truth ---
Version:     vX.Y.Z
Skills:      NNN
Agents:      NN
Commands:    NN
Marketplaces: NN
Rules:       NN
Templates:   N
Hooks:       N

--- Version Mismatches (N found) ---
  [file:line] Found "vX.Y.Z" — expected "vA.B.C"

--- Count Mismatches (N found) ---
  [file:line] Found "NN skills" — actual count is MM
  [file:line] Found "NN agents" — actual count is MM

--- Broken Links (N found) ---
  [file:line] Link target "path/to/file.md" does not exist

--- Stale Content (N found) ---
  [file:line] TODO: description of unresolved item
  [file:line] Placeholder "TBD" found

--- Summary ---
Total issues: N
  Version mismatches: N
  Count mismatches:   N
  Broken links:       N
  Stale content:      N

Status: CLEAN / NEEDS ATTENTION
```

---

### Step 7: Offer Fixes

For count and version mismatches, offer to fix them:

- **Count fixes:** Update the stale number in-place
- **Version fixes:** Update version references to current version
- **Broken links:** Suggest correct paths or removal

Always show the proposed changes before applying. Never fix silently.

---

## Examples

### Full audit

```
/audit-docs
```

### Check only counts

```
/audit-docs counts
```

### Check only broken links

```
/audit-docs links
```

### Check only version references

```
/audit-docs versions
```

---

## Related

- `rules/workflows/post-change-documentation.md` - Documentation update workflow
- `/changelog` - Generate changelog entries
- `/health-check` - Toolkit integrity check

---

_Documentation that lies is worse than no documentation. Audit regularly._
