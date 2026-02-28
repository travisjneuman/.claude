---
description: Generate a changelog entry from git commits since the last tag using conventional commit format
arguments:
  - name: version
    description: "Optional version string for the entry header (e.g., v2.6.0). If omitted, auto-increments from latest tag."
    required: false
---

# Changelog Generator

Generates a formatted changelog entry by analyzing git commits since the last tag, grouped by conventional commit type.

## Usage

```
/changelog [version]
```

## Execution Protocol

### Step 1: Find Latest Tag

```bash
git describe --tags --abbrev=0 2>/dev/null || echo "NO_TAG"
```

If no tags exist, collect all commits on the current branch.

Report the tag found and its date.

---

### Step 2: Collect Commits Since Tag

```bash
# All commits since the latest tag (one-line format with hash)
git log <latest-tag>..HEAD --oneline --no-merges
```

If no tag exists:

```bash
git log --oneline --no-merges -50
```

Report total commit count found.

---

### Step 3: Classify Commits by Type

Parse each commit message for conventional commit prefixes. Group into these categories:

| Prefix       | Section Header     | Description                      |
| ------------ | ------------------ | -------------------------------- |
| `feat:`      | Added              | New features                     |
| `fix:`       | Fixed              | Bug fixes                        |
| `docs:`      | Documentation      | Documentation changes            |
| `chore:`     | Maintenance        | Chores, dependency updates       |
| `refactor:`  | Changed            | Refactors without behavior change|
| `perf:`      | Performance        | Performance improvements         |
| `test:`      | Tests              | Test additions or changes        |
| `style:`     | Style              | Code style, formatting           |
| `ci:`        | CI/CD              | Pipeline and CI changes          |
| `build:`     | Build              | Build system changes             |
| (no prefix)  | Other              | Commits without conventional prefix |

For each commit:
- Strip the type prefix and optional scope `(scope):` from the message
- Capitalize the first letter of the remaining message
- Include the short hash as a reference

---

### Step 4: Determine Version

If `{{version}}` is provided, use it directly.

If not provided, auto-increment based on commit types:

| Commits Include | Bump Type | Example          |
| --------------- | --------- | ---------------- |
| Breaking change (`!` suffix or `BREAKING CHANGE` in body) | Major | 2.4.0 -> 3.0.0 |
| Any `feat:` | Minor | 2.4.0 -> 2.5.0 |
| Only `fix:`, `docs:`, `chore:`, etc. | Patch | 2.4.0 -> 2.4.1 |

---

### Step 5: Format Changelog Entry

Output the entry in this format:

```markdown
## [<version>] - <YYYY-MM-DD>

### Added
- Feature description (abc1234)
- Another feature (def5678)

### Fixed
- Bug fix description (111aaaa)

### Changed
- Refactor description (222bbbb)

### Documentation
- Doc update description (333cccc)

### Maintenance
- Chore description (444dddd)

### Performance
- Perf improvement (555eeee)

### Tests
- Test addition (666ffff)
```

**Rules:**
- Omit sections that have no commits (do not show empty headers)
- Sort commits within each section alphabetically
- Use the current date for the entry date
- Include short commit hash in parentheses after each entry

---

### Step 6: Present for Review

Display the formatted entry and prompt the user:

```
Changelog entry generated for <version> (<N> commits since <tag>).

Review the entry above. Options:
1. Prepend to CHANGELOG.md (after the file header)
2. Copy and paste manually
3. Edit before adding
```

If the user approves, prepend the entry to `CHANGELOG.md` after any existing file header (title line and description), before the first existing version entry.

---

## Examples

### Basic usage (auto-version)

```
/changelog
```

### Specify version

```
/changelog v2.6.0
```

---

## Related

- `docs/reference/workflows/post-change-documentation.md` - Documentation update workflow
- `/health-check` - Verify toolkit status
- `/audit-docs` - Check documentation freshness

---

_Conventional commits make changelogs automatic. Use feat:, fix:, docs:, chore: prefixes consistently._
