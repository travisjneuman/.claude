---
description: Initialize a new project with deep context gathering and PROJECT.md
allowed-tools:
  - Read
  - Bash
  - Write
  - AskUserQuestion
---

<objective>
Initialize a new project through comprehensive context gathering.

This is the most leveraged moment in any project. Deep questioning here means better plans, better execution, better outcomes.

Creates `.planning/` with PROJECT.md and config.json.
</objective>

<execution_context>
@~/.claude/get-shit-done/references/principles.md
@~/.claude/get-shit-done/references/questioning.md
@~/.claude/get-shit-done/templates/project.md
@~/.claude/get-shit-done/templates/config.json
</execution_context>


<process>

<step name="setup">
**MANDATORY FIRST STEP — Execute these checks before ANY user interaction:**

1. **Abort if project exists:**
   ```bash
   [ -f .planning/PROJECT.md ] && echo "ERROR: Project already initialized. Use /gsd:progress" && exit 1
   ```

2. **Initialize git repo in THIS directory** (required even if inside a parent repo):
   ```bash
   # Check if THIS directory is already a git repo root (handles .git file for worktrees too)
   if [ -d .git ] || [ -f .git ]; then
       echo "Git repo exists in current directory"
   else
       git init
       echo "Initialized new git repo"
   fi
   ```

3. **Detect existing code (brownfield detection):**
   ```bash
   # Check for existing code files
   CODE_FILES=$(find . -name "*.ts" -o -name "*.js" -o -name "*.py" -o -name "*.go" -o -name "*.rs" -o -name "*.swift" -o -name "*.java" 2>/dev/null | grep -v node_modules | grep -v .git | head -20)
   HAS_PACKAGE=$([ -f package.json ] || [ -f requirements.txt ] || [ -f Cargo.toml ] || [ -f go.mod ] || [ -f Package.swift ] && echo "yes")
   HAS_CODEBASE_MAP=$([ -d .planning/codebase ] && echo "yes")
   ```

   **You MUST run all bash commands above using the Bash tool before proceeding.**
</step>

<step name="brownfield_offer">
**If existing code detected and .planning/codebase/ doesn't exist:**

Check the results from setup step:
- If `CODE_FILES` is non-empty OR `HAS_PACKAGE` is "yes"
- AND `HAS_CODEBASE_MAP` is NOT "yes"

Use AskUserQuestion:
- header: "Existing Code"
- question: "I detected existing code in this directory. Would you like to map the codebase first?"
- options:
  - "Map codebase first" - Run /gsd:map-codebase to understand existing architecture (Recommended)
  - "Skip mapping" - Proceed with project initialization

**If "Map codebase first":**
```
Run `/gsd:map-codebase` first, then return to `/gsd:new-project`
```
Exit command.

**If "Skip mapping":** Continue to question step.

**If no existing code detected OR codebase already mapped:** Continue to question step.
</step>

<step name="question">
**1. Open (FREEFORM - do NOT use AskUserQuestion):**

Ask inline: "What do you want to build?"

Wait for their freeform response. This gives you the context needed to ask intelligent follow-up questions.

**2. Follow the thread (NOW use AskUserQuestion):**

Based on their response, use AskUserQuestion with options that probe what they mentioned:
- header: "[Topic they mentioned]"
- question: "You mentioned [X] — what would that look like?"
- options: 2-3 interpretations + "Something else"

**3. Sharpen the core:**

Use AskUserQuestion:
- header: "Core"
- question: "If you could only nail one thing, what would it be?"
- options: Key aspects they've mentioned + "All equally important" + "Something else"

**4. Find boundaries:**

Use AskUserQuestion:
- header: "Scope"
- question: "What's explicitly NOT in v1?"
- options: Things that might be tempting + "Nothing specific" + "Let me list them"

**5. Ground in reality:**

Use AskUserQuestion:
- header: "Constraints"
- question: "Any hard constraints?"
- options: Relevant constraint types + "None" + "Yes, let me explain"

**6. Decision gate:**

Use AskUserQuestion:
- header: "Ready?"
- question: "Ready to create PROJECT.md, or explore more?"
- options (ALL THREE REQUIRED):
  - "Create PROJECT.md" - Finalize and continue
  - "Ask more questions" - I'll dig deeper
  - "Let me add context" - You have more to share

If "Ask more questions" → check coverage gaps from `questioning.md` → return to step 2.
If "Let me add context" → receive input via their response → return to step 2.
Loop until "Create PROJECT.md" selected.
</step>

<step name="project">
Synthesize all context into `.planning/PROJECT.md` using the template from `templates/project.md`.

Do not compress. Capture everything gathered.
</step>

<step name="mode">
Ask workflow mode preference:

Use AskUserQuestion:

- header: "Mode"
- question: "How do you want to work?"
- options:
  - "Interactive" - Confirm at each step
  - "YOLO" - Auto-approve, just execute

Create `.planning/config.json` with chosen mode using `templates/config.json` structure.
</step>

<step name="commit">
```bash
git add .planning/PROJECT.md .planning/config.json
git commit -m "$(cat <<'EOF'
docs: initialize [project-name]

[One-liner from PROJECT.md]

Creates PROJECT.md with vision and requirements.
EOF
)"

```
</step>

<step name="done">
Present completion with next steps (see ~/.claude/get-shit-done/references/continuation-format.md):

```
Project initialized:

- Project: .planning/PROJECT.md
- Config: .planning/config.json (mode: [chosen mode])
[If .planning/codebase/ exists:] - Codebase: .planning/codebase/ (7 documents)

---

## ▶ Next Up

**[Project Name]** — create roadmap

`/gsd:create-roadmap`

<sub>`/clear` first → fresh context window</sub>

---
```
</step>

</process>

<output>
- `.planning/PROJECT.md`
- `.planning/config.json`
</output>

<success_criteria>
- [ ] Deep questioning completed (not rushed)
- [ ] PROJECT.md captures full context
- [ ] config.json has workflow mode
- [ ] All committed to git
</success_criteria>
```
