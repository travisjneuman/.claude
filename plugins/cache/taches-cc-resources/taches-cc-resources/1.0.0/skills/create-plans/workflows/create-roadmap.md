# Workflow: Create Roadmap

<required_reading>
**Read these files NOW:**
1. templates/roadmap.md
2. Read `.planning/BRIEF.md` if it exists
</required_reading>

<purpose>
Define the phases of implementation. Each phase is a coherent chunk of work
that delivers value. The roadmap provides structure, not detailed tasks.
</purpose>

<process>

<step name="check_brief">
```bash
cat .planning/BRIEF.md 2>/dev/null || echo "No brief found"
```

**If no brief exists:**
Ask: "No brief found. Want to create one first, or proceed with roadmap?"

If proceeding without brief, gather quick context:
- What are we building?
- What's the rough scope?
</step>

<step name="identify_phases">
Based on the brief/context, identify 3-6 phases.

Good phases are:
- **Coherent**: Each delivers something complete
- **Sequential**: Later phases build on earlier
- **Sized right**: 1-3 days of work each (for solo + Claude)

Common phase patterns:
- Foundation → Core Feature → Enhancement → Polish
- Setup → MVP → Iteration → Launch
- Infrastructure → Backend → Frontend → Integration
</step>

<step name="confirm_phases">
Present the phase breakdown inline:

"Here's how I'd break this down:

1. [Phase name] - [goal]
2. [Phase name] - [goal]
3. [Phase name] - [goal]
...

Does this feel right? (yes / adjust)"

If "adjust": Ask what to change, revise, present again.
</step>

<step name="decision_gate">
After phases confirmed:

Use AskUserQuestion:
- header: "Ready"
- question: "Ready to create the roadmap, or would you like me to ask more questions?"
- options:
  - "Create roadmap" - I have enough context
  - "Ask more questions" - There are details to clarify
  - "Let me add context" - I want to provide more information

Loop until "Create roadmap" selected.
</step>

<step name="create_structure">
```bash
mkdir -p .planning/phases
```
</step>

<step name="write_roadmap">
Use template from `templates/roadmap.md`.

Write to `.planning/ROADMAP.md` with:
- Phase list with names and one-line descriptions
- Dependencies (what must complete before what)
- Status tracking (all start as "not started")

Create phase directories:
```bash
mkdir -p .planning/phases/01-{phase-name}
mkdir -p .planning/phases/02-{phase-name}
# etc.
```
</step>

<step name="git_commit_initialization">
Commit project initialization (brief + roadmap together):

```bash
git add .planning/
git commit -m "$(cat <<'EOF'
docs: initialize [project-name] ([N] phases)

[One-liner from BRIEF.md]

Phases:
1. [phase-name]: [goal]
2. [phase-name]: [goal]
3. [phase-name]: [goal]
EOF
)"
```

Confirm: "Committed: docs: initialize [project] ([N] phases)"
</step>

<step name="offer_next">
```
Project initialized:
- Brief: .planning/BRIEF.md
- Roadmap: .planning/ROADMAP.md
- Committed as: docs: initialize [project] ([N] phases)

What's next?
1. Plan Phase 1 in detail
2. Review/adjust phases
3. Done for now
```
</step>

</process>

<phase_naming>
Use `XX-kebab-case-name` format:
- `01-foundation`
- `02-authentication`
- `03-core-features`
- `04-polish`

Numbers ensure ordering. Names describe content.
</phase_naming>

<anti_patterns>
- Don't add time estimates
- Don't create Gantt charts
- Don't add resource allocation
- Don't include risk matrices
- Don't plan more than 6 phases (scope creep)

Phases are buckets of work, not project management artifacts.
</anti_patterns>

<success_criteria>
Roadmap is complete when:
- [ ] `.planning/ROADMAP.md` exists
- [ ] 3-6 phases defined with clear names
- [ ] Phase directories created
- [ ] Dependencies noted if any
- [ ] Status tracking in place
</success_criteria>
