# Workflow Automation Guide

**Version:** 4.0 (Consolidated)
**Last Updated:** January 2026 (v2.2)
**Purpose:** Complete workflow compliance guide - checklists + automation tools

---

## Quick Navigation

| Section                                               | Description                            |
| ----------------------------------------------------- | -------------------------------------- |
| [Quick Checklists](#quick-checklists)                 | Pre-flight, implementation, completion |
| [Automation Tools](#automation-tools)                 | Git hooks, templates, commands         |
| [Setup Instructions](#setup-instructions)             | Initial configuration                  |
| [Troubleshooting](#troubleshooting)                   | Common issues and fixes                |
| [Customization](#customization)                       | Extend and modify tools                |
| [Best Practices](#best-practices)                     | Tips for success                       |
| [Workflow Selection Guide](#workflow-selection-guide) | When to use GSD vs prompts vs direct   |

---

# PART 1: Quick Checklists

## Pre-Flight Checklist

### Before Starting ANY Task

- [ ] **Read CLAUDE.md** (workflow rules and core philosophy)
- [ ] **Sync with remote branch:**
  ```bash
  git fetch origin main && git merge origin/main --no-edit
  # OR: git fetch origin master && git merge origin/master --no-edit
  ```
- [ ] **Create task file:** `tasks/[feature-name].md` using template
- [ ] **Fill out task plan:**
  - Problem statement
  - Files to read
  - Proposed changes
  - Todo checklist
- [ ] **Get user approval** via `ExitPlanMode` tool
- [ ] **ONLY THEN** begin implementation

---

## During Implementation

### As You Work

- [ ] **Update todos** as you complete each item
- [ ] **Make changes as simple as possible**
  - Impact minimal code
  - Avoid complex refactors unless necessary
  - Keep changes focused on the task
- [ ] **Give high-level explanations** of changes
- [ ] **No temporary fixes** - Find and fix root causes
- [ ] **Follow privacy/security/UX principles**

---

## Project-Type Checklists

### For UI/Visual Changes

- [ ] Screenshot current state before changes
- [ ] Make ONE change at a time
- [ ] Test in browsers: Chrome, Firefox, Safari, Edge
- [ ] Test responsiveness: 375px, 768px, 1024px+
- [ ] Compare to baseline (visual diff)
- [ ] Check animations work (60fps target)
- [ ] Get user approval before committing

### For Node.js/React/TypeScript Projects

- [ ] Run tests: `npm run test`
- [ ] Type check: `npm run type-check`
- [ ] Lint check: `npm run lint`
- [ ] Build check: `npm run build`
- [ ] Verify bundle size acceptable

### For Static Sites (HTML/CSS/JS)

- [ ] Manual verification in browser
- [ ] Check console for errors
- [ ] Resize window (mobile/desktop)
- [ ] Run Lighthouse audit in DevTools

### For Automation/Scripts

- [ ] Test with `DRY_RUN=true` first
- [ ] Verify output matches expectations
- [ ] Check validation rules work
- [ ] Test edge cases
- [ ] Update docs if behavior changes

---

## When Complete

### Before Marking Work "Done"

- [ ] **Add review section** to `tasks/[feature].md`
  - Summary of changes
  - Files created/modified
  - Testing status
  - Issues encountered
- [ ] **Update documentation** if architecture changed
- [ ] **Verify in light mode** (if applicable)
- [ ] **Verify in dark mode** (if applicable)
- [ ] **Test keyboard navigation** (accessibility)
- [ ] **Test at different screen sizes**

---

## Git Commit Checklist

### Before Creating Commit

- [ ] **Stage task file:** `git add tasks/[feature].md`
- [ ] **Review changes:** `git diff --staged`
- [ ] **Write clear commit message:**

  ```
  type: Short description (50 chars max)

  - Bullet point details
  - What changed and why

  Generated with Claude Code
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

- [ ] **Commit types:** feat, fix, docs, style, refactor, test, chore

---

## Quick Reference Tables

### Core Workflow Rules

| #   | Rule                        | Description                           |
| --- | --------------------------- | ------------------------------------- |
| 1   | **Think → Plan → Write**    | Create task file FIRST before coding  |
| 2   | **Plan has todo list**      | Checklist with items to check off     |
| 3   | **Check before working**    | Get user approval via ExitPlanMode    |
| 4   | **Mark tasks complete**     | Update todos as you go                |
| 5   | **High-level explanations** | Don't overexplain every detail        |
| 6   | **Simple changes**          | Minimal code impact                   |
| 7   | **Add review section**      | Document what changed when done       |
| 8   | **No lazy fixes**           | Find root cause, no temporary patches |
| 9   | **Simplicity is key**       | Impact minimal code, avoid bugs       |
| 10  | **Update documentation**    | Keep docs detailed, clear, clean      |
| 11  | **Sync with remote**        | Start of EVERY session                |
| 12  | **Perfect foundation**      | Build for 100% even if 1% complete    |
| 13  | **Complete logical units**  | Never stop mid-implementation         |
| 14  | **Validate current date**   | Check `<env>` section                 |
| 15  | **Commit & Push at end**    | Git add, commit with details, push    |

### Core Philosophy Principles

| #   | Principle                   | Description                                       |
| --- | --------------------------- | ------------------------------------------------- |
| 1   | **Correctness & Integrity** | No data loss. Security P0.                        |
| 2   | **Coherence**               | Follow existing patterns. No competing paradigms. |
| 3   | **Atomic Execution**        | Small, reviewable steps. Explain WHY.             |
| 4   | **Maintainability**         | Explicit > Clever. No magic.                      |
| 5   | **Optimal Location**        | Files must be in the most logical place.          |
| 6   | **Scalable Architecture**   | Build primitives, not one-offs.                   |
| 7   | **Root Cause Only**         | Trace bugs to source. No band-aids.               |
| 8   | **Infinite Initiative**     | Fix broken windows immediately.                   |

---

# PART 2: Automation Tools

## Overview

This automation system ensures compliance with CLAUDE.md workflow rules by:

- **Preventing commits** without task file updates
- **Providing templates** for consistent task documentation
- **Reminding workflows** before starting tasks
- **Enforcing standards** through git hooks and checklists

**Core Principle:** Make it harder to forget than to remember.

### Supported Project Types

| Project Type          | Tech Stack            | Build Tools           |
| --------------------- | --------------------- | --------------------- |
| **Static Sites**      | Pure HTML/CSS/JS      | None (direct browser) |
| **React/Vue/Angular** | TypeScript/JavaScript | npm/vite/webpack      |
| **Full-Stack**        | Any framework         | npm + backend tools   |
| **Automation**        | Python/Node.js        | pip/npm               |

---

## Tool 1: Git Pre-Commit Hook

**Location:** `.git/hooks/pre-commit`
**Purpose:** Enforce task file updates when code changes
**Enforces:** CLAUDE.md Rules #1, #2, #7

**How it works:**

1. Detects if code files (src/, components/, etc.) are staged
2. Checks if a tasks/\*.md file is also staged
3. Blocks commit if code changed but no task file staged
4. Allows commit for non-code changes (docs, config)

**Example Output (Blocked Commit):**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  COMMIT BLOCKED - Missing Task File (CLAUDE.md Rule #1, #2, #7)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Code files were changed, but no task file is staged.

Required Action:
  1. Update your task file (tasks/[feature-name].md)
  2. Stage your task file: git add tasks/[feature-name].md
  3. Retry commit: git commit
```

**Emergency Bypass:**

```bash
git commit --no-verify
```

**Use only for:** Hotfixes, doc-only changes, reverts, emergencies

---

## Tool 2: Task Template

**Location:** `.claude/templates/task-template.md`
**Purpose:** Standardized format for all task files
**Enforces:** Rules #1, #2, #7

**Sections included:**

- Overview and problem statement
- Files to read
- Proposed changes (files to create/modify)
- Todo checklist with time estimates
- Design considerations
- Implementation notes
- Testing checklist
- **Review section** (to be filled when complete)

**Create new task:**

```bash
cp .claude/templates/task-template.md tasks/[feature-name].md
```

**Good naming examples:**

- `tasks/add-search-functionality.md`
- `tasks/fix-calendar-timezone-bug.md`
- `tasks/refactor-state-management.md`

**Bad naming examples:**

- `tasks/todo.md`
- `tasks/task1.md`
- `tasks/stuff.md`

---

## Tool 3: Custom Commands

**Location:** `.claude/commands/`

### `/start-task` Command

- Routes to appropriate workflow based on task type
- Creates task files from templates
- Checks existing todos
- Initiates planning mode
- Gets user approval before implementation

### `/run` Command

- Execute prompts with auto-archiving

---

# PART 3: Setup Instructions

## File Structure

```
[project-root]/
├── .git/
│   └── hooks/
│       └── pre-commit              # Git hook (enforces compliance)
├── .claude/
│   ├── CLAUDE.md                   (global instructions)
│   ├── README.md                   (folder overview)
│   ├── docs/
│   │   └── workflow-automation.md  (this file)
│   ├── templates/
│   │   └── task-template.md        (task file template)
│   ├── commands/
│   │   └── start-task.md           (custom commands)
│   └── skills/
│       └── [skill-name]/           (custom skills)
├── tasks/                          (task files go here)
├── CLAUDE.md                       (main workflow guide)
└── README.md                       (project documentation)
```

## Initial Setup

**Verify setup:**

```bash
# Check git hook exists and is executable
ls -la .git/hooks/pre-commit

# Check automation files exist
ls -la .claude/

# Make hook executable (if needed)
chmod +x .git/hooks/pre-commit
```

## For New Developers

1. **Clone repository**
2. **Read CLAUDE.md** (workflow rules)
3. **Read this guide** (you're here!)
4. **Test git hook:**

   ```bash
   # Make a small test change
   echo "// test" >> src/main.tsx

   # Try to commit without staging task file
   git add src/main.tsx
   git commit -m "test"
   # Should be BLOCKED

   # Stage task file and retry
   git add tasks/some-task.md
   git commit -m "test"
   # Should succeed

   # Revert test
   git reset HEAD~1
   git checkout src/main.tsx
   ```

---

# PART 4: Troubleshooting

## Issue 1: Pre-Commit Hook Not Running

**Symptoms:** Can commit code without task file

**Fixes:**

```bash
# Cause 1: Hook not executable
chmod +x .git/hooks/pre-commit

# Cause 2: Hook file doesn't exist
ls -la .git/hooks/pre-commit

# Cause 3: Using --no-verify flag (don't do this)
git commit  # Correct
git commit --no-verify  # Bypasses hook
```

## Issue 2: Hook Blocking Valid Commits

**Symptoms:** Hook blocks even with task file staged

**Fixes:**

```bash
# Cause 1: Task file in wrong location
git add tasks/my-feature.md  # Correct
git add my-feature.md         # Wrong

# Cause 2: Task file not staged
git diff --cached --name-only  # Check what's staged

# Cause 3: Wrong file extension
git add tasks/my-feature.md   # Correct (.md)
git add tasks/my-feature.txt  # Wrong
```

## Issue 3: Can't Find Task Template

**Fixes:**

```bash
# Check if template exists
ls -la .claude/templates/task-template.md

# Ensure you're in repository root
pwd
```

---

# PART 5: Customization

## Adding More File Patterns to Hook

**Edit:** `.git/hooks/pre-commit`

```bash
# Add more directories to monitor
CODE_FILES_CHANGED=$(echo "$STAGED_FILES" | grep -E '^(src/|lib/|config/|components/|services/)' | grep -v '\.md$')
```

## Customizing Task Template

**Edit:** `.claude/templates/task-template.md`

Add sections like:

```markdown
## Security Checklist

- [ ] Input validation added
- [ ] XSS prevention verified
- [ ] SQL injection prevented

## Performance Checklist

- [ ] Bundle size impact acceptable
- [ ] No memory leaks
- [ ] Animations 60fps

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
```

## Adding New Custom Commands

**Create:** `.claude/commands/[command-name].md`

```markdown
---
description: Your command description
---

# Command Content Here
```

---

# PART 6: Best Practices

## 1. Always Start with the Checklist

```bash
# View this file or use command
/start-task
```

## 2. Create Task File FIRST

```bash
# CORRECT ORDER
cp .claude/templates/task-template.md tasks/my-feature.md
# Fill out the task file
# THEN start coding

# WRONG ORDER
# Start coding first
# Create task file later (will forget details!)
```

## 3. Update Task File as You Work

```markdown
## Todo Checklist

### Phase 1

- [x] ~~Task 1~~ - DONE
- [ ] Task 2 - IN PROGRESS
- [ ] Task 3 - Blocked
```

## 4. Fill Review Section Immediately

When work is complete, fill out the review section RIGHT AWAY:

- Summary of changes
- Files created/modified
- Testing status
- Issues encountered

## 5. Stage Task File with Code

```bash
# CORRECT - Stage both together
git add src/components/Modal.tsx
git add tasks/add-modal-system.md
git commit -m "feat: Add modal system"

# WRONG - Hook will block
git add src/components/Modal.tsx
git commit -m "feat: Add modal"
```

## 6. Use Meaningful Task File Names

```bash
# GOOD
tasks/add-undo-system-for-notes.md
tasks/fix-calendar-timezone-bug.md

# BAD
tasks/todo.md
tasks/task1.md
```

## 7. Emergency Bypass is for EMERGENCIES

```bash
# Use --no-verify ONLY for:
# - Hotfix (site down)
# - Revert broken commit
# - Critical security fix

# NOT for:
# - "I'm lazy"
# - "I'll update task file later"
```

---

# PART 7: Workflow Selection Guide

## Task Complexity Spectrum

```
Simple              Moderate            Multi-Stage         Multi-Phase (GSD)
(Direct)            (/create-prompt)    (/create-meta)      (/gsd:*)
   │                     │                   │                   │
<30 min              30min-2hr            2-8 hours          Days/Weeks
1-2 files            3-10 files           10+ files          Phases
Clear scope          Defined scope        Research needed    Vision → Execution
No state             Stateless            Stateless          STATE.md (persistent)
```

## When to Use Each System

### Direct Execution

**Scope:** <30 min, 1-2 files, clear scope

**Examples:**

- Fix typo in README
- Update a single constant
- Add a simple test
- Rename a variable

**How:** Just describe the task to Claude

### /create-prompt → /run

**Scope:** 30min-2hr, 3-10 files, defined scope

**Examples:**

- Refactor a component
- Add a new API endpoint
- Implement a single feature
- Fix a bug with multiple touchpoints

**How:** `/start-task refactor the modal component`

### /create-meta-prompt

**Scope:** 2-8 hours, 10+ files, research needed

**Examples:**

- "Research auth options then implement"
- "Explore GraphQL vs REST then build"
- Multi-stage work with dependencies

**How:** `/start-task research then implement user auth`

### GSD (Get Shit Done)

**Scope:** Days/weeks, multiple phases, persistent state

**Examples:**

- New application from scratch
- Major feature requiring phases
- Complex system with dependencies
- Anything needing persistent context

**How:** `/start-task new project for my app` or `/gsd:new-project`

## Automatic Detection

The `/start-task` command automatically detects:

1. **GSD Project:** Checks for `.planning/STATE.md`
   - If found + no task → routes to `/gsd:progress`
   - If found + project-related task → routes to GSD commands

2. **Complexity Signals:**
   - Multiple components → suggests GSD
   - Sequential dependencies → suggests GSD
   - Large scope keywords → suggests GSD

## Transition Scenarios

### Escalating from Prompt to GSD

If during `/create-prompt` you realize scope is larger:

1. Complete current prompt if it provides value
2. Run `/gsd:new-project` to initialize
3. Import insights from prompt work into PROJECT.md

### De-escalating from GSD to Simple

If GSD project turns out simpler than expected:

1. Keep `.planning/` for documentation
2. Execute remaining work directly
3. Run `/gsd:complete-milestone` when done

## Quick Reference Table

| Signal                | Workflow | Command                        |
| --------------------- | -------- | ------------------------------ |
| "Fix typo"            | Direct   | Just do it                     |
| "Refactor X"          | Prompt   | `/start-task refactor X`       |
| "Research then build" | Meta     | `/start-task research then...` |
| "New project"         | GSD      | `/gsd:new-project`             |
| "Where was I"         | GSD      | `/gsd:progress`                |
| Multi-component task  | GSD      | Auto-detected                  |

---

## Related Documentation

- `CLAUDE.md` - Complete workflow rules
- `.claude/templates/task-template.md` - Task file template
- `.claude/skills/README.md` - Available skills
- `.claude/commands/` - Custom commands
- `.claude/commands/gsd/help.md` - GSD command reference

---

**Version:** 5.0 (Added Workflow Selection Guide with GSD integration)
**Last Updated:** December 2025

**Remember:** These tools exist to help, not hinder. Follow the workflow for smoother, more consistent development.
