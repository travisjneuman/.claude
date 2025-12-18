# Plan: Settings Files Consolidation (Phase 2)

## Previous Work Complete ✅

All CLAUDE.md files and .claude/ folders cleaned up:
- system.knowledgebase: 173 files, 63,503 lines removed
- tdr.portfolio: 173 files, 63,143 lines removed
- tjn.portfolio: 177 files, 65,752 lines removed
- tkl.home: CLAUDE.md slimmed to project-specific only
- oakstone.properties: Duplicate commands removed

---

## Current Issue: Settings Files

### The Two Types of Settings Files

| File | Purpose | Tracked in Git? |
|------|---------|-----------------|
| `settings.json` | Team-shareable settings | Yes |
| `settings.local.json` | User-specific overrides | No (like .gitignore) |

### Current State Analysis

**Global `~/.claude/settings.json`:**
- ✅ Has comprehensive permissions (npm, git, python, docker, etc.)
- ✅ Has plugin config
- ❌ NO HOOKS (missing auto-format, build checks)

**Global `~/.claude/settings.local.json`:**
- Exists but is mostly duplicate of settings.json
- Has some incremental permission additions

**Oakstone's `settings.json` (the unique one):**
```json
{
  "permissions": { /* project-specific Astro/Wrangler commands */ },
  "hooks": {
    "PostToolUse": [{
      "matcher": { "toolName": "Write", "filePath": "**/*.{ts,tsx,astro,js,mjs}" },
      "hooks": [{ "command": "npx prettier --write \"$CLAUDE_FILE_PATH\"" }]
    }],
    "PreCommit": [{
      "command": "npm run build 2>/dev/null || echo 'Build check skipped...'"
    }]
  },
  "context": { /* include/exclude patterns */ },
  "model": { "default": "sonnet", "thinking": true }
}
```

**Project `settings.local.json` files (system, tdr, tjn):**
- ALL IDENTICAL COPIES - just duplicating global permissions
- Add nothing project-specific
- Should be DELETED

---

## The Problem

1. **Oakstone's hooks are universally useful** but trapped in a project file
   - Prettier auto-format → benefits ALL JS/TS projects
   - Build check before commit → benefits ALL npm projects

2. **Three `settings.local.json` files are pure duplicates**
   - `system.knowledgebase/.claude/settings.local.json`
   - `tdr.portfolio/.claude/settings.local.json`
   - `tjn.portfolio/.claude/settings.local.json`
   - They're byte-for-byte identical, adding nothing

---

## Action Plan

### Step 1: Add Hooks to Global `~/.claude/settings.json`

Add these hooks (from oakstone, but universally useful):

```json
"hooks": {
  "PostToolUse": [
    {
      "matcher": {
        "toolName": "Write",
        "filePath": "**/*.{ts,tsx,js,jsx,mjs,astro,vue,svelte}"
      },
      "hooks": [
        {
          "type": "command",
          "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
        }
      ]
    }
  ],
  "PreCommit": [
    {
      "type": "command",
      "command": "npm run build 2>/dev/null || echo 'Build check skipped - no build script'"
    }
  ]
}
```

### Step 2: Delete Duplicate `settings.local.json` Files

Remove from:
- `F:/Web Development/system.knowledgebase/.claude/settings.local.json`
- `F:/Web Development/tdr.portfolio/.claude/settings.local.json`
- `F:/Web Development/tjn.portfolio/.claude/settings.local.json`

### Step 3: Convert Oakstone's `settings.json` → `settings.local.json`

Keep only the truly project-specific parts:
- Astro/Wrangler permissions (unique to this project)
- Context include/exclude patterns

Remove:
- Hooks (now in global)
- Generic git/npm permissions (now in global)

### Step 4: Verify tkl.home

Check if `tkl.home/.claude/settings.local.json` exists and if it needs cleanup.

---

## Files to Modify

| File | Action |
|------|--------|
| `~/.claude/settings.json` | ADD hooks section |
| `system.knowledgebase/.claude/settings.local.json` | DELETE |
| `tdr.portfolio/.claude/settings.local.json` | DELETE |
| `tjn.portfolio/.claude/settings.local.json` | DELETE |
| `oakstone.properties/.claude/settings.json` | Slim down to project-specific only |

---

## Expected Result

After cleanup:
- **Global** has hooks that apply to ALL projects
- **Projects** have NO settings files unless truly project-specific
- **Oakstone** keeps only Astro/Wrangler-specific permissions
- No more duplicate files overriding global settings

