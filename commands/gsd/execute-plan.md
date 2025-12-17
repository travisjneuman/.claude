---
description: Execute a PLAN.md file
argument-hint: "[path-to-PLAN.md]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - Task
  - AskUserQuestion
  - SlashCommand
---

<objective>
Execute a PLAN.md file, create SUMMARY.md, update project state, commit.

Uses intelligent segmentation:

- Plans without checkpoints → spawn subagent for full autonomous execution
- Plans with verify checkpoints → segment execution, pause at checkpoints
- Plans with decision checkpoints → execute in main context
  </objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-phase.md
@~/.claude/get-shit-done/templates/summary.md
@~/.claude/get-shit-done/references/checkpoints.md
</execution_context>

<context>
Plan path: $ARGUMENTS

**Load project state first:**
@.planning/STATE.md

**Load workflow config:**
@.planning/config.json
</context>

<process>
1. Check .planning/ directory exists (error if not - user should run /gsd:new-project)
2. Verify plan at $ARGUMENTS exists
3. Check if SUMMARY.md already exists (plan already executed?)
4. Load workflow config for mode (interactive/yolo)
5. Follow execute-phase.md workflow:
   - Parse plan and determine execution strategy (A/B/C)
   - Execute tasks (via subagent or main context as appropriate)
   - Handle checkpoints and deviations
   - Create SUMMARY.md
   - Update STATE.md
   - Commit changes
</process>

<execution_strategies>
**Strategy A: Fully Autonomous** (no checkpoints)

- Spawn subagent to execute entire plan
- Subagent creates SUMMARY.md and commits
- Main context: orchestration only (~5% usage)

**Strategy B: Segmented** (has verify-only checkpoints)

- Execute in segments between checkpoints
- Subagent for autonomous segments
- Main context for checkpoints
- Aggregate results → SUMMARY → commit

**Strategy C: Decision-Dependent** (has decision checkpoints)

- Execute in main context
- Decision outcomes affect subsequent tasks
- Quality maintained through small scope (2-3 tasks per plan)
  </execution_strategies>

<deviation_rules>
During execution, handle discoveries automatically:

1. **Auto-fix bugs** - Fix immediately, document in Summary
2. **Auto-add critical** - Security/correctness gaps, add and document
3. **Auto-fix blockers** - Can't proceed without fix, do it and document
4. **Ask about architectural** - Major structural changes, stop and ask user
5. **Log enhancements** - Nice-to-haves, log to ISSUES.md, continue

Only rule 4 requires user intervention.
</deviation_rules>

<commit_rules>
**Critical: Stage only files this plan actually modified.**

NEVER use:

- `git add .`
- `git add -A`
- `git add src/` or any broad directory

Stage each file individually from the modified-files list.
</commit_rules>

<success_criteria>

- [ ] All tasks executed
- [ ] SUMMARY.md created with substantive content
- [ ] STATE.md updated (position, decisions, issues, session)
- [ ] ROADMAP updated (plan count, phase status)
- [ ] Changes committed with feat({phase}-{plan}): [summary]
- [ ] User informed of next steps
      </success_criteria>
