# Plugin & Marketplace Structure Audit Report

**Date:** 2026-03-04
**Scope:** `~/.claude/plugins/` (marketplaces, cache, local)
**Status:** READ-ONLY audit -- no files modified

---

## Summary

| Metric | Count |
|--------|-------|
| Marketplace manifests (`marketplace.json`) | 76 |
| Plugin manifests (`plugin.json`) | 2,209 |
| Hooks files (`hooks/hooks.json`) | 106 |
| Hooks using `${CLAUDE_PLUGIN_ROOT}` | 85 |
| Hooks NOT using `${CLAUDE_PLUGIN_ROOT}` | 21 |
| Local plugins | 1 (`ralph-wiggum`) |
| Cached (installed) plugins | 14 |

---

## 1. Marketplace Manifests

All 76 `marketplace.json` files were located under `~/.claude/plugins/marketplaces/`. A sample of 8 marketplaces was manually inspected for spec compliance.

### Required Fields Check (`name`, `owner`, `plugins[]`)

| Marketplace | `name` | `owner` | `plugins[]` | Verdict |
|-------------|--------|---------|-------------|---------|
| anthropic-agent-skills | Yes | Yes (name + email) | Yes (3 entries) | PASS |
| claude-code-plugins | Yes | Yes (name + email) | Yes (12 entries) | PASS |
| claude-plugins-official | Yes | Yes (name + email) | Yes (41 entries) | PASS |
| superpowers-marketplace | Yes | Yes (name + email) | Yes (9 entries) | PASS |
| trailofbits-skills | Yes | Yes (name + email) | Yes (30 entries) | PASS |
| gmickel-marketplace | Yes | Yes (name + url) | Yes (2 entries) | PASS |
| obra-superpowers | Yes | Yes (name + email) | Yes (1 entry) | PASS |
| expo-skills | Yes | Yes (name + email) | Yes (3 entries) | PASS |

**All sampled marketplaces have the required `name`, `owner`, and `plugins[]` fields.**

### Plugin Entry Compliance (`name` + `source`)

All plugin entries in the sampled marketplaces include both `name` and `source` fields. Source values use two formats:
- **Relative path:** `"./plugins/plugin-name"` (most common)
- **URL object:** `{ "source": "url", "url": "https://github.com/..." }` (used by claude-plugins-official for external plugins like Figma, Sentry, Slack, etc.)

### Notable Variations

- `claude-plugins-official` is the largest marketplace (41 plugins), mixing first-party Anthropic plugins with external integrations.
- `owner` field uses `name` + `email` in most cases; `gmickel-marketplace` uses `name` + `url` instead of `email` (not a spec violation but a deviation).
- `EveryInc-compound` has both `.claude-plugin/marketplace.json` and `.cursor-plugin/marketplace.json` (dual-platform support).
- Some nested marketplace.json files exist (e.g., `davila7-templates/cli-tool/components/`, `kivilaid-marketplace/plugins/davila7-claude-code-templates/cli-tool/components/`) -- these appear to be bundled/embedded marketplaces from submodules.

---

## 2. Plugin Manifests (`plugin.json`)

2,209 `plugin.json` files were found across the entire `~/.claude/plugins/` tree.

### Required `name` Field Check

A batch validation of 200 plugin.json files found zero instances of a missing `name` field. One file had an encoding error:

- `ananddtyagi-marketplace/plugins/sugar/.claude-plugin/plugin.json` -- `charmap` codec error (likely UTF-8 BOM or non-ASCII characters)

### Sampled plugin.json Files (Manual Inspection)

| Plugin | `name` | `version` | `description` | `author` |
|--------|--------|-----------|---------------|----------|
| agent-sdk-dev (cache) | Yes | 1.0.0 | Yes | Yes |
| superpowers (cache) | Yes | 4.0.3 | Yes | Yes |
| ralph-wiggum (local) | Yes | 1.0.0 | Yes | Yes |
| hookify (cache) | Yes | 0.1.0 | Yes | Yes |
| security-guidance (cache) | Yes | 1.0.0 | Yes | Yes |

**All sampled plugin.json files are compliant with the `name` requirement.**

---

## 3. Hooks and `${CLAUDE_PLUGIN_ROOT}` Usage

106 `hooks/hooks.json` files were found. Of these, 85 (80%) correctly use `${CLAUDE_PLUGIN_ROOT}` in their command paths. 21 (20%) do not.

### Compliant Examples

```json
// security-guidance
"command": "python3 ${CLAUDE_PLUGIN_ROOT}/hooks/security_reminder_hook.py"

// superpowers
"command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" session-start.sh"

// explanatory-output-style
"command": "${CLAUDE_PLUGIN_ROOT}/hooks-handlers/session-start.sh"
```

### Non-Compliant Patterns (21 files)

Three categories of non-compliance:

**A. Relative paths (no `${CLAUDE_PLUGIN_ROOT}`):**
- `ananddtyagi-marketplace` plugins use `./hooks/task-lock-enforcer.sh` (relative paths)
- `gmickel-marketplace/flow-next` uses `scripts/ralph/hooks/ralph-guard.py` (project-relative, intentional -- these hooks target the working project, not the plugin itself)

**B. Bare `node`/script paths:**
- `rohitg00-claude-code-toolkit` uses `node hooks/scripts/block-dev-server.js` (no `${CLAUDE_PLUGIN_ROOT}` prefix)

**C. Alternative format (flat array instead of nested object):**
- `rohitg00-claude-code-toolkit` uses a flat `"hooks": [...]` array with `"type"` field per entry, instead of the spec's nested `"hooks": { "PreToolUse": [...] }` structure.
- Several `secondsky-sap-skills` plugins, `EveryInc-compound` test fixtures, and `claude-code-plugins-plus-skills` backups also omit `${CLAUDE_PLUGIN_ROOT}`.

---

## 4. Blocklist (`blocklist.json`)

**Location:** `~/.claude/plugins/blocklist.json`

```json
{
  "fetchedAt": "2026-03-04T23:13:00.143Z",
  "plugins": [
    {
      "plugin": "code-review@claude-plugins-official",
      "added_at": "2026-02-11T03:16:31.424Z",
      "reason": "just-a-test",
      "text": "This is a test #5"
    },
    {
      "plugin": "fizz@testmkt-marketplace",
      "added_at": "2026-02-12T00:00:00.000Z",
      "reason": "security",
      "text": "this is a security test"
    }
  ]
}
```

**Format:** Valid JSON with `fetchedAt` timestamp and `plugins[]` array. Each entry has:
- `plugin` -- identifier in `name@marketplace` format
- `added_at` -- ISO timestamp
- `reason` -- category string
- `text` -- human-readable description

Both entries appear to be test data (reasons: "just-a-test", "security test").

---

## 5. Key Findings

### Compliant

1. All sampled marketplaces have required `name`, `owner`, and `plugins[]` fields.
2. All sampled plugin entries have required `name` and `source` fields.
3. All sampled `plugin.json` files have the required `name` field.
4. 80% of hooks correctly use `${CLAUDE_PLUGIN_ROOT}` for path resolution.
5. `strict` mode is used by several marketplaces (superpowers-marketplace sets `"strict": true` on all plugins).
6. The blocklist format is well-structured with plugin identifiers, timestamps, and reasons.

### Non-Compliant / Concerns

1. **21 hooks.json files omit `${CLAUDE_PLUGIN_ROOT}`** -- these will break if the plugin is installed in a different location than expected. Some are intentional (gmickel's flow-next hooks target project-relative paths by design), but others (ananddtyagi, rohitg00) appear to be genuine spec violations.
2. **1 plugin.json has encoding issues** -- `ananddtyagi-marketplace/plugins/sugar/.claude-plugin/plugin.json` cannot be parsed due to character encoding.
3. **rohitg00-claude-code-toolkit uses a non-standard hooks format** -- flat array with `type` field instead of the nested object structure. This may not be recognized by the plugin system.
4. **Blocklist contains only test entries** -- no production blocklist entries exist.
5. **Nested marketplace.json files** in submodules/bundled repos could cause confusion if the plugin system scans recursively.

---

## 6. Recommendations

1. Fix the 21 non-compliant hooks to use `${CLAUDE_PLUGIN_ROOT}` where they reference plugin-local files.
2. Fix the encoding issue in `ananddtyagi-marketplace/plugins/sugar/.claude-plugin/plugin.json`.
3. Standardize `rohitg00-claude-code-toolkit/hooks/hooks.json` to use the nested object format.
4. Consider removing test entries from `blocklist.json` or documenting that they are intentional test fixtures.
5. Document the convention that `owner` should include `email` (not just `name` + `url`).
