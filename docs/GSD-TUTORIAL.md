# GSD (Get Shit Done) Tutorial

A practical guide to using the GSD system for multi-phase projects.

**Last Updated:** December 2025

---

## What is GSD?

GSD is a project management framework that provides structure for complex, multi-phase work. It tracks:
- Project phases and milestones
- Current progress and next actions
- Session continuity (resume where you left off)

**Key Principle:** GSD provides *structure*, not *gates*. Use any tools, skills, agents, or research that helps - anytime.

---

## When to Use GSD

| Use GSD When... | Don't Use GSD When... |
|-----------------|----------------------|
| Task has multiple phases | Single, focused task |
| Work spans multiple sessions | Quick fix or bug |
| Need to track progress over time | Simple question or research |
| Complex feature with many parts | Documentation update |
| Architectural overhaul | Code review |

**Rule of thumb:** If `/start-task` scores complexity >= 3, GSD is appropriate.

---

## Quick Start

### 1. Start a New Project

```
/gsd:new-project [project description]
```

Or let `/start-task` auto-route:
```
/start-task Build a comprehensive user authentication system
```

### 2. Check Progress

```
/gsd:progress
```

This shows:
- Current phase and status
- Completed vs remaining tasks
- Suggested next action

### 3. Plan a Phase

```
/gsd:plan-phase 1
```

Creates detailed execution plan for the current phase.

### 4. Execute the Plan

```
/gsd:execute-plan
```

Works through the plan step by step.

### 5. Resume After a Break

```
/gsd:resume-work
```

Restores context from your last session.

---

## Project Structure

GSD creates files in `.planning/`:

```
.planning/
├── STATE.md        # Current status, phase tracking
├── ROADMAP.md      # Full project plan (optional)
├── PROJECT.md      # Project definition (optional)
└── phases/
    ├── phase-1.md  # Phase-specific details
    └── phase-2.md
```

### STATE.md Example

```markdown
# Project State

## Project Summary
**Building:** User Authentication System
**Status: ACTIVE**

## Current Position
Phase: 2 of 4 (API Implementation)
Status: **IN PROGRESS**
Progress: ████████░░░░░ 60%

## Phases Overview
| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Database Schema | ✓ COMPLETE |
| 2 | API Implementation | IN PROGRESS |
| 3 | Frontend Integration | PENDING |
| 4 | Testing & Docs | PENDING |
```

---

## Using Tools Within GSD

**Remember:** GSD doesn't block any capabilities. Use these anytime:

### Research
```
# Within any GSD phase, research freely:
"What's the best approach for JWT refresh tokens?"
→ Uses WebSearch automatically
```

### Skills
```
# Load domain expertise:
Skill(security)
Skill(api-design)
```

### Agents
```
# Spawn specialized agents:
"Use the security-auditor agent to review the auth implementation"
```

### Decision Frameworks
```
# Make structured decisions:
/consider:first-principles Should we use sessions or JWTs?
```

---

## Command Reference

| Command | Purpose |
|---------|---------|
| `/gsd:new-project` | Start new multi-phase project |
| `/gsd:progress` | Check status, get next action |
| `/gsd:plan-phase [n]` | Create detailed plan for phase |
| `/gsd:execute-plan` | Work through current plan |
| `/gsd:resume-work` | Restore session context |
| `/gsd:pause-work` | Save state, prepare to pause |
| `/gsd:add-phase` | Add a new phase to project |
| `/gsd:complete-milestone` | Mark milestone done |
| `/gsd:help` | Full command reference |

---

## Best Practices

### 1. Keep Phases Focused
- Each phase should have a clear deliverable
- 3-5 phases is typical for most projects
- If a phase has >10 tasks, split it

### 2. Update Progress Regularly
- Mark tasks complete as you go
- Don't batch status updates
- Use `/gsd:progress` frequently

### 3. Use Tools Proactively
- Research before implementing
- Use agents for specialized work
- Load skills for domain expertise
- Don't wait for permission

### 4. Session Continuity
- `/gsd:pause-work` before ending session
- `/gsd:resume-work` to restore context
- STATE.md preserves your progress

---

## Troubleshooting

### "I'm stuck in GSD"
You're never "stuck" - GSD is just tracking. Execute directly:
```
"Just implement the login endpoint now"
```

### "GSD is blocking me"
GSD can't block you. If you feel blocked:
1. Check `/gsd:progress` for next action
2. Or just do what needs doing
3. Update STATE.md manually if needed

### "Phase is too big"
Use `/gsd:add-phase` to split:
```
/gsd:add-phase Split current phase into smaller chunks
```

### "Lost my context"
```
/gsd:resume-work
```
Or read `.planning/STATE.md` directly.

---

## Example: Full Workflow

```
User: /start-task Build a blog platform with posts, comments, and user profiles

Claude: This is a multi-phase project. Initializing GSD...

[Creates .planning/STATE.md with 4 phases]

Phase 1: Database & Models
Phase 2: API Endpoints
Phase 3: Frontend Components
Phase 4: Testing & Polish

Current: Phase 1
Next action: Design database schema

User: /gsd:progress

Claude: Phase 1 in progress. Tasks:
- [ ] Design schema
- [ ] Create migrations
- [ ] Seed data

Suggested: Start with schema design

User: What's the best way to model blog comments?

Claude: [Uses WebSearch for current best practices]
[Provides recommendation with examples]

User: Use the database-architect agent to review my schema

Claude: [Spawns database-architect agent]
[Agent provides detailed schema review]

User: /gsd:progress

Claude: Schema designed ✓. Next: Create migrations...
```

---

## Related Documentation

- `CLAUDE.md` - Core workflow rules
- `README.md` - Full toolkit overview
- `rules/tooling/external-repos.md` - GSD plugin location

---

*GSD helps you get shit done. It tracks progress, not permissions.*
