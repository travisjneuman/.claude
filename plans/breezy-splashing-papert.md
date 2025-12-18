# Plan: Global vs Project Configuration Setup

## The Problem

**Claude Code precedence: Project > Global (by design)**

This means:
- Your optimized global `~/.claude/` rules ARE loaded
- BUT project `.claude/` rules **override** them when they conflict
- Outdated project rules will "win" over newer global rules

**The ONLY solution**: Remove duplicated/outdated content from project `.claude/` folders so global rules apply by default.

---

## Action Plan

### Phase 1: Audit (READ-ONLY) ✅ COMPLETE

**Found 7 locations with Claude configs:**

| Location | CLAUDE.md | .claude/ | Status |
|----------|-----------|----------|--------|
| `F:\Web Development\` | 10KB | 3.1MB! | **DELETE** - Full duplicate of global |
| `tdr.portfolio` | 33KB | Yes | Heavy duplication |
| `system.knowledgebase` | 17KB | Yes | Heavy duplication |
| `tkl.home` | 11KB | Yes | Moderate duplication |
| `oakstone.properties` | 7.6KB | Yes | Likely duplication |
| `tjn.portfolio` | 3.7KB | Yes | Smaller, check |
| `tjn.home` | 3.6KB | No | **Cleanest** - just CLAUDE.md |

---

## Detailed Findings

### Duplicated Content (REMOVE from projects)

**In CLAUDE.md files:**
- Session protocol (start/end checklists)
- Git conventions
- P0 non-negotiables
- Workflow routing
- 15 Sacred Rules
- Token hygiene guidelines

**In .claude/ folders:**
| File/Folder | Projects | Status |
|-------------|----------|--------|
| `commands/run.md` | tdr, system | ❌ Now in global |
| `commands/start-task.md` | tdr, system | ❌ Now in global |
| `skills/codebase-documenter/` | tdr, system | ❌ Now in global |
| `skills/frontend-enhancer/` | tdr, system | ❌ Now in global |
| `skills/tech-debt-analyzer/` | tdr, system | ❌ Now in global |
| `skills/test-specialist/` | tdr, system | ❌ Now in global |
| `skills/document-skills/` | tdr, system | ❌ Now in global |
| `automation-guide.md` | all | ❌ Now in global rules |
| `workflow-checklist.md` | all | ❌ Now in global rules |

### Project-Specific Content (KEEP)

**tdr.portfolio:**
- Project description, brand info, tech stack
- `skills/tdr-code-reviewer/`
- `skills/tdr-design-system/`
- `skills/tdr-feature-developer/`
- `skills/tdr-ux-designer/`

**system.knowledgebase:**
- Neuman Brain description, architecture
- `skills/neuman-brain-code-reviewer/`
- `skills/neuman-brain-design-system/`
- `skills/neuman-brain-feature-developer/`
- `skills/neuman-brain-ux-designer/`

### Critical Issue: F:\Web Development\.claude\

This is a **3.1MB duplicate** of your global setup including:
- `history.jsonl` (2.9MB session history)
- Full skills/, commands/, plugins/ copies
- `.credentials.json` (⚠️ SECURITY RISK)

**Recommendation:** Delete entirely. Use global setup instead.

### Phase 2: Cleanup Strategy (When Ready)

**Order of operations:**

1. **Delete `F:\Web Development\.claude\`** (3.1MB duplicate)
   - Back up `F:\Web Development\CLAUDE.md` first (workspace overview is useful)
   - Delete entire `.claude/` folder

2. **For each project, slim down CLAUDE.md:**
   - Extract ONLY project-specific content
   - Remove all workflow/session/git/testing rules (now in global)
   - Target: ~50-100 lines per project

3. **For each project .claude/ folder:**
   - Delete duplicated skills (codebase-documenter, frontend-enhancer, etc.)
   - KEEP project-specific skills (tdr-*, neuman-brain-*)
   - Delete duplicated commands (run.md, start-task.md)
   - Delete automation-guide.md, workflow-checklist.md
   - Keep settings.json only if it has project-specific permissions

### Phase 3: Template Creation

**Create:** `~/.claude/templates/project-claude-md-template.md`

```markdown
# [PROJECT NAME] — CLAUDE.md

> Project-specific instructions. Global rules from `~/.claude/` apply automatically.

## Overview
[What this project does in 2-3 sentences]

## Tech Stack
- [Framework/language]
- [Key libraries]
- [Database if applicable]

## Commands
```bash
npm run dev      # [what it does]
npm run build    # [what it does]
npm run test     # [what it does]
```

## Architecture
```
[project]/
├── src/          # [description]
├── components/   # [description]
└── ...
```

## Project-Specific Notes
- [Key architectural decisions]
- [Team conventions unique to this project]
- [Important gotchas]

---
*Global workflow, skills, and standards loaded from `~/.claude/`*
```

**For team sharing:**
- Global `~/.claude/` repo is cloned by each team member
- Project `.claude/` contains only project-specific customizations
- Team members get full toolkit via global, project consistency via local

---

## Summary

**Audit complete.** Found significant duplication that's overriding your global setup.

**Next steps when ready:**
1. Create template first (quick win)
2. Clean up `F:\Web Development\.claude\` (security risk + 3MB waste)
3. Slim down project CLAUDE.md files one by one
4. Clean up project .claude/ folders (keep project-specific skills only)

**Verification:** Run `/memory` in any project to see what's loaded.

