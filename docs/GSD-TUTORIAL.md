---
name: GSD Tutorial
description: Practical guide to the Get Shit Done system for multi-phase project management and task tracking.
category: workflow
---

# GSD (Get Shit Done) Tutorial

A practical guide to using the GSD system for multi-phase projects.

**Last Updated:** February 2026 (v2.9.2)

**New in v2.1:** SessionStart hook ensures GSD context loads automatically. See [CHANGELOG.md](../CHANGELOG.md#210---january-13-2026).

**v2.0 features:** GSD integrates with research methodology, multi-window state management, and PROACTIVE mode. See [CHANGELOG.md](../CHANGELOG.md#200---january-3-2026).

---

## What is GSD?

GSD is a project management framework that provides structure for complex, multi-phase work. It tracks:

- Project phases and milestones
- Current progress and next actions
- Session continuity (resume where you left off)

**Key Principle:** GSD provides _structure_, not _gates_. Use any tools, skills, agents, or research that helps - anytime.

---

## When to Use GSD

| Use GSD When...                  | Don't Use GSD When...       |
| -------------------------------- | --------------------------- |
| Task has multiple phases         | Single, focused task        |
| Work spans multiple sessions     | Quick fix or bug            |
| Need to track progress over time | Simple question or research |
| Complex feature with many parts  | Documentation update        |
| Architectural overhaul           | Code review                 |

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

| Phase | Description          | Status      |
| ----- | -------------------- | ----------- |
| 1     | Database Schema      | ✓ COMPLETE  |
| 2     | API Implementation   | IN PROGRESS |
| 3     | Frontend Integration | PENDING     |
| 4     | Testing & Docs       | PENDING     |
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

| Command                   | Purpose                        |
| ------------------------- | ------------------------------ |
| `/gsd:new-project`        | Start new multi-phase project  |
| `/gsd:progress`           | Check status, get next action  |
| `/gsd:plan-phase [n]`     | Create detailed plan for phase |
| `/gsd:execute-plan`       | Work through current plan      |
| `/gsd:resume-work`        | Restore session context        |
| `/gsd:pause-work`         | Save state, prepare to pause   |
| `/gsd:add-phase`          | Add a new phase to project     |
| `/gsd:complete-milestone` | Mark milestone done            |
| `/gsd:help`               | Full command reference         |

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

Claude: Schema designed. Next: Create migrations...
```

---

## Example: Multi-Session Continuity

GSD's main strength is persistence across sessions. Here is how that works in practice.

**Session 1 (evening):**

```
User: /gsd:new-project Build authentication system with OAuth, email/password, and MFA

Claude: Created .planning/STATE.md with 5 phases:
  Phase 1: Database schema and user model
  Phase 2: Email/password auth flow
  Phase 3: OAuth provider integration
  Phase 4: MFA (TOTP) implementation
  Phase 5: Testing and hardening

[Works through Phase 1 and part of Phase 2]

User: /gsd:pause-work

Claude: State saved. You're midway through Phase 2:
  - Login endpoint: complete
  - Registration endpoint: complete
  - Password reset flow: not started
  - Session management: not started
```

**Session 2 (next day):**

```
User: /gsd:resume-work

Claude: Restored context from .planning/STATE.md.
  Phase 2: Email/password auth (60% complete)
  Next action: Implement password reset flow

[Continues exactly where you left off]
```

---

## Example: Combining GSD with Agent Teams

For large phases, spawn an agent team to parallelize within a single GSD phase.

```
User: /gsd:progress

Claude: Phase 3 (Frontend Components) is next. This phase has 4 independent deliverables:
  - Login page
  - Registration page
  - Profile settings page
  - Password reset page

User: Use an agent team for this phase. One teammate per page.

Claude: [Creates agent team with 4 teammates]
  - login-dev: builds src/pages/login/
  - register-dev: builds src/pages/register/
  - profile-dev: builds src/pages/profile/
  - reset-dev: builds src/pages/reset/

[Each teammate works in parallel on separate files]
[Lead synthesizes results and marks Phase 3 complete]

User: /gsd:progress

Claude: Phase 3 complete. Phase 4 (Testing) is next.
```

---

## Related Documentation

- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - Workflow patterns and routing
- [AGENT-TEAMS.md](./AGENT-TEAMS.md) - Parallel team coordination
- `~/.claude/CLAUDE.md` - Core workflow rules
- `~/.claude/docs/reference/tooling/external-repos.md` - GSD plugin location

---

_GSD helps you get shit done. It tracks progress, not permissions._
