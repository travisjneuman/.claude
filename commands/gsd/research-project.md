---
description: Research domain ecosystem before creating roadmap
allowed-tools:
  - Task
  - Read
  - Write
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
---

<objective>
Research implementation context for Claude Code before roadmap creation.

This is NOT research for human decision-making. This is context injection so Claude Code can implement correctly with current APIs, patterns, and best practices.

Spawns 2-3 subagents in parallel to research PROJECT.md-specific needs:

- **Stack** - What libraries/tools to use for THIS project's features
- **Implementation** - Current API patterns, code examples, correct syntax
- **Risks** - What Claude might get wrong, deprecated patterns to avoid

Each subagent writes directly to `.planning/research/` preserving main context.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/research-project.md
@~/.claude/get-shit-done/templates/project-research.md
@~/.claude/get-shit-done/references/research-subagent-prompts.md
</execution_context>

<context>
**Load project vision:**
@.planning/PROJECT.md

**Check for existing research:**
!`ls .planning/research/ 2>/dev/null || echo "NO_RESEARCH_DIR"`
</context>

<process>

<step name="validate">
Check prerequisites:

```bash
# Verify .planning/ exists
[ -d .planning ] || { echo "No .planning/ directory. Run /gsd:new-project first."; exit 1; }

# Verify PROJECT.md exists
[ -f .planning/PROJECT.md ] || { echo "No PROJECT.md. Run /gsd:new-project first."; exit 1; }

# Check for existing research
[ -d .planning/research ] && echo "RESEARCH_EXISTS" || echo "NO_RESEARCH"
```

If RESEARCH_EXISTS:

```
Research already exists at .planning/research/

What would you like to do?
1. View existing research
2. Re-run research (overwrites existing)
3. Skip to create-roadmap
```

Wait for user decision.
</step>

<step name="parse_project">
Read PROJECT.md and extract research targets:

**From Scope (Building):**
- List each feature/capability that needs implementation
- These become specific research queries

**From Constraints:**
- Tech stack requirements (language, framework, platform)
- Performance requirements
- Compatibility requirements

**From Open Questions:**
- Questions that research should answer
- These are explicit research targets

**From Decisions Made:**
- Choices to validate ("any gotchas with X?")

Create a research manifest:
```
Features to implement:
- [feature 1]
- [feature 2]
- [feature 3]

Stack constraints:
- [constraint 1]
- [constraint 2]

Open questions to answer:
- [question 1]
- [question 2]

Decisions to validate:
- [decision 1]
```

If PROJECT.md is too vague for specific research targets, use AskUserQuestion:
- header: "Research scope"
- question: "What specific implementation questions should we research?"
- options based on detected domain
</step>

<step name="research">
Follow research-project.md workflow with PROJECT.md-driven research:

1. Create `.planning/research/` directory
2. Spawn subagents in parallel (all at once if ≤3):
   - **stack.md** - Libraries/tools for each feature in Scope
   - **implementation.md** - Current API patterns and code examples
   - **risks.md** - What Claude might get wrong, deprecated patterns
3. Wait for completion
4. Verify all outputs exist and are high-quality
</step>

<step name="verify_quality">
After subagents complete, verify quality:

```bash
# Check files exist
for f in stack implementation risks; do
  [ -s ".planning/research/${f}.md" ] && echo "✓ ${f}.md" || echo "✗ ${f}.md MISSING"
done
```

**Quality check (read each file):**
- Contains ONLY high-confidence information?
- Includes actual code examples with current syntax?
- Addresses specific features from PROJECT.md?
- No low-confidence padding or "might be useful" items?

If a file contains low-quality content, note it for summary.
</step>

<step name="summarize">
After verification:

```
Research complete:
- .planning/research/stack.md - [libraries/tools identified]
- .planning/research/implementation.md - [patterns documented]
- .planning/research/risks.md - [pitfalls to avoid]

Key implementation context:
- [Primary stack choice with rationale]
- [Most important API pattern to use]
- [Critical mistake Claude should avoid]

Open questions remaining:
- [Any questions research couldn't answer]

## To Continue

Run `/clear`, then paste:
```
/gsd:create-roadmap
```

Other options:
- Review research files before continuing
```
</step>

</process>

<output>
- `.planning/research/stack.md` - Libraries and tools for each feature
- `.planning/research/implementation.md` - Current API patterns and code examples
- `.planning/research/risks.md` - Deprecated patterns and common mistakes
</output>

<success_criteria>
- [ ] PROJECT.md parsed for specific research targets
- [ ] Research addresses actual features from Scope
- [ ] Open Questions from PROJECT.md answered (or noted as unanswerable)
- [ ] All outputs are HIGH-CONFIDENCE only (no padding)
- [ ] Code examples use current API syntax
- [ ] User knows next steps (create-roadmap)
</success_criteria>
