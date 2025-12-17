---
type: prompt
description: Execute a PLAN.md file directly without loading planning skill context
arguments:
  - name: plan_path
    description: Path to PLAN.md file (e.g., .planning/phases/07-sidebar-reorganization/07-01-PLAN.md)
    required: true
---

Execute the plan at {{plan_path}} using **intelligent segmentation** for optimal quality.

**Process:**

1. **Verify plan exists and is unexecuted:**
   - Read {{plan_path}}
   - Check if corresponding SUMMARY.md exists in same directory
   - If SUMMARY exists: inform user plan already executed, ask if they want to re-run
   - If plan doesn't exist: error and exit

2. **Parse plan and determine execution strategy:**
   - Extract `<objective>`, `<execution_context>`, `<context>`, `<tasks>`, `<verification>`, `<success_criteria>` sections
   - Analyze checkpoint structure: `grep "type=\"checkpoint" {{plan_path}}`
   - Determine routing strategy:

   **Strategy A: Fully Autonomous (no checkpoints)**
   - Spawn single subagent to execute entire plan
   - Subagent reads plan, executes all tasks, creates SUMMARY, commits
   - Main context: Orchestration only (~5% usage)
   - Go to step 3A

   **Strategy B: Segmented Execution (has verify-only checkpoints)**
   - Parse into segments separated by checkpoints
   - Check if checkpoints are verify-only (checkpoint:human-verify)
   - If all checkpoints are verify-only: segment execution enabled
   - Go to step 3B

   **Strategy C: Decision-Dependent (has decision/action checkpoints)**
   - Has checkpoint:decision or checkpoint:human-action checkpoints
   - Following tasks depend on checkpoint outcomes
   - Must execute sequentially in main context
   - Go to step 3C

3. **Execute based on strategy:**

   **3A: Fully Autonomous Execution**
   ```
   Spawn Task tool (subagent_type="general-purpose"):

   Prompt: "Execute plan at {{plan_path}}

   This is a fully autonomous plan (no checkpoints).

   - Read the plan for full objective, context, and tasks
   - Execute ALL tasks sequentially
   - Follow all deviation rules and authentication gate protocols
   - Create SUMMARY.md in same directory as PLAN.md
   - Update ROADMAP.md plan count
   - Commit with format: feat({phase}-{plan}): [summary]
   - Report: tasks completed, files modified, commit hash"

   Wait for completion → Done
   ```

   **3B: Segmented Execution (verify-only checkpoints)**
   ```
   For each segment (autonomous block between checkpoints):

     IF segment is autonomous:
       Spawn subagent:
         "Execute tasks [X-Y] from {{plan_path}}
          Read plan for context and deviation rules.
          DO NOT create SUMMARY or commit.
          Report: tasks done, files modified, deviations"

       Wait for subagent completion
       Capture results

     ELSE IF task is checkpoint:
       Execute in main context:
         - Load checkpoint task details
         - Present checkpoint to user (action/verify/decision)
         - Wait for user response
         - Continue to next segment

   After all segments complete:
     - Aggregate results from all segments
     - Create SUMMARY.md with aggregated data
     - Update ROADMAP.md
     - Commit all changes
     - Done
   ```

   **3C: Decision-Dependent Execution**
   ```
   Execute in main context:

   Read execution context from plan <execution_context> section
   Read domain context from plan <context> section

   For each task in <tasks>:
     IF type="auto": execute in main, track deviations
     IF type="checkpoint:*": execute in main, wait for user

   After all tasks:
     - Create SUMMARY.md
     - Update ROADMAP.md
     - Commit
     - Done
   ```

4. **Summary and completion:**
   - Verify SUMMARY.md created
   - Verify commit successful
   - Present completion message with next steps

**Critical Rules:**

- **Read execution_context first:** Always load files from `<execution_context>` section before executing
- **Minimal context loading:** Only read files explicitly mentioned in `<execution_context>` and `<context>` sections
- **No skill invocation:** Execute directly using native tools - don't invoke create-plans skill
- **All deviations tracked:** Apply deviation rules from execute-phase.md, document everything in Summary
- **Checkpoints are blocking:** Never skip user interaction for checkpoint tasks
- **Verification is mandatory:** Don't mark complete without running verification checks
- **Follow execute-phase.md protocol:** Loaded context contains all execution instructions

**Context Efficiency Target:**
- Execution context: ~5-7k tokens (execute-phase.md, summary.md, checkpoints.md if needed)
- Domain context: ~10-15k tokens (BRIEF, ROADMAP, codebase files)
- Total overhead: <30% context, reserving 70%+ for workspace and implementation
