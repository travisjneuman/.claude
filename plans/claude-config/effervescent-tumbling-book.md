# Plan: Comprehensive .claude Folder Cleanup - Phase 2

**Date:** December 16, 2025
**Scope:** Deep cleanup after initial audit/reorganization
**User Decisions:** GSD commands=Keep, Stack skills=Keep all 16, History=Keep all

---

## Executive Summary

| Priority | Items | Impact | Effort |
|----------|-------|--------|--------|
| Critical | 3 | Remove bugs/bloat | 5 min |
| High | 4 | Space savings + organization | 15 min |
| Medium | 4 | Documentation hygiene | 15 min |
| Low | 3 | Nice-to-have improvements | Optional |

**Potential savings:** ~2.9MB from schema files + cleanup of empty/stale items

---

## CRITICAL (Do Immediately)

### 1. Remove `nul` file (BUG)
- **Path:** `C:\Users\tjn\.claude\nul`
- **Issue:** Accidental Windows null device file created
- **Action:** Delete file

### 2. Delete empty folders
- **Paths:**
  - `C:\Users\tjn\.claude\ide\`
  - `C:\Users\tjn\.claude\downloads\`
  - `C:\Users\tjn\.claude\telemetry\`
- **Action:** Remove all three empty folders

### 3. Archive document-skills schema bloat
- **Paths to archive:**
  - `skills/document-skills/docx/ooxml/` (1.2MB)
  - `skills/document-skills/pptx/ooxml/` (1.2MB)
  - `skills/document-skills/*/scripts/` folders
- **Keep:** All SKILL.md and .md guide files
- **Action:** Move ooxml/ and scripts/ to `.archive/document-schemas/`
- **Impact:** ~2.5MB savings, functionality preserved

---

## HIGH PRIORITY

### 4. Clean up todos/ folder
- **Path:** `C:\Users\tjn\.claude\todos\`
- **Issue:** 28 stale session state files (~500KB)
- **Action:**
  - Keep last 5 most recent
  - Archive rest to `.archive/todos/`

### 5. Fix projects/ case sensitivity
- **Path:** `C:\Users\tjn\.claude\projects\`
- **Issue:** Duplicate entries with d/D case differences
- **Action:** Identify and consolidate duplicates

### 6. Merge enterprise-* into fortune50-*
- **Files:**
  - `enterprise-marketing-strategy` (29KB) → merge into `fortune50-marketing`
  - `enterprise-sales-excellence` (50KB) → merge into `fortune50-sales`
- **Action:** Consolidate content, archive enterprise-* folders
- **Impact:** Remove 2 redundant skill folders (~79KB)

### 7. Archive paused plans
- **Candidate:** `plans/notes-migration/` (marked "Paused")
- **Action:** Move to `.archive/plans/`

---

## MEDIUM PRIORITY

### 8. Fix skills README documentation mismatch
- **File:** `C:\Users\tjn\.claude\skills\README.md`
- **Issue:** References "example-*" skills that don't exist (actual names are "generic-*")
- **Action:** Update documentation to match actual folder names

### 9. Consolidate MCP setup documentation
- **Files:** SETUP-GUIDE.md, MCP-SERVERS.md, CONFIGURATION.md
- **Issue:** MCP setup instructions duplicated across 3+ files
- **Action:** Keep detailed instructions in MCP-SERVERS.md, reference from others

### 10. Review neuman-brain plans
- **Path:** `C:\Users\tjn\.claude\plans\neuman-brain\` (9 files)
- **Action:** Identify any completed plans, archive them

### 11. Consolidate cleanup docs
- **Files:** MAINTENANCE.md, workflow-automation.md (Part 4)
- **Issue:** Partial overlap in cleanup procedures
- **Action:** Have workflow-automation.md reference MAINTENANCE.md

---

## LOW PRIORITY (Optional)

### 12. Add templates
- Skill creation template
- Command creation template

### 13. Create cleanup schedule
- Document retention policies for:
  - todos/ cleanup frequency
  - debug/ log purging
  - Archive retention periods

### 14. Rename _shared folder
- Current: `skills/_shared/` (hidden convention with underscore)
- Consider: `skills/shared-references/` (clearer naming)

---

## Size Impact Summary

| Item | Before | After | Savings |
|------|--------|-------|---------|
| document-skills ooxml/ | 2.4MB | 0 | 2.4MB |
| enterprise-* skills | 2 folders | 0 (merged) | ~79KB |
| todos/ | 28 files | 5 files | ~400KB |
| Empty folders | 3 | 0 | 0 |
| nul file | 1 | 0 | 0 |
| **Total** | | | **~2.9MB** |

---

## Execution Order

### Phase 1: Critical Cleanup (5 min)
1. Delete `nul` file
2. Delete empty folders (ide, downloads, telemetry)
3. Archive document-skills ooxml/ and scripts/ folders

### Phase 2: State Cleanup (5 min)
4. Clean todos/ folder (keep 5 most recent)
5. Fix projects/ case sensitivity duplicates

### Phase 3: Skills Consolidation (10 min)
6. Merge enterprise-* content into fortune50-*
7. Archive enterprise-* folders

### Phase 4: Plans & Documentation (10 min)
8. Archive paused plans (notes-migration/)
9. Review neuman-brain plans for completed items
10. Fix skills/README.md documentation
11. Consolidate MCP docs references

---

## Folders to Archive

| Source | Destination |
|--------|-------------|
| `skills/document-skills/docx/ooxml/` | `.archive/document-schemas/docx-ooxml/` |
| `skills/document-skills/pptx/ooxml/` | `.archive/document-schemas/pptx-ooxml/` |
| `skills/document-skills/*/scripts/` | `.archive/document-schemas/scripts/` |
| `skills/enterprise-*` (2) | `.archive/skills/` |
| `plans/notes-migration/` | `.archive/plans/` |
| Old todos (23 files) | `.archive/todos/` |

## Files to Update

| File | Change |
|------|--------|
| `skills/README.md` | Fix example-* → generic-* references |
| `skills/MASTER_INDEX.md` | Remove enterprise-* entries after merge |
| `fortune50-marketing/SKILL.md` | Add merged enterprise content |
| `fortune50-sales/SKILL.md` | Add merged enterprise content |
| `docs/SETUP-GUIDE.md` | Reference MCP-SERVERS.md instead of duplicating |
