<purpose>
Research implementation context for Claude Code before roadmap creation.

This is NOT research for human decision-making.
This is CONTEXT INJECTION so Claude Code implements correctly.

Research quality directly impacts implementation quality.
Claude's training data may have outdated APIs, deprecated patterns, old syntax.
This research provides current, accurate context to override stale knowledge.
</purpose>

<research_philosophy>
## What This Research Is

**Context injection for Claude Code implementation quality.**

Claude Code will read these files during implementation. The research should:
- Override outdated patterns Claude might default to
- Provide current API syntax and code examples
- Explicitly correct common mistakes Claude makes
- Include version-specific details (as of 2024-2025)

## What This Research Is NOT

- A survey of options for humans to choose from
- Generic "best practices" documentation
- Padding with low-confidence "might be useful" items
- Academic completeness over practical utility

## Quality Bar

**Include if:** High confidence, directly actionable, will improve Claude's implementation
**Exclude if:** Low confidence, tangential, "might be relevant", padding
</research_philosophy>

<required_reading>
**Read before executing:**
1. `~/.claude/get-shit-done/references/research-subagent-prompts.md` - Prompt templates
2. `~/.claude/get-shit-done/templates/project-research.md` - Output format
</required_reading>

<process>

<step name="setup">
Create research directory:

```bash
mkdir -p .planning/research
```

Parse PROJECT.md to create research manifest:

```
## Research Manifest

### Features to Implement
[Extract from Scope > Building]
- Feature 1: [description]
- Feature 2: [description]
- Feature 3: [description]

### Stack Constraints
[Extract from Constraints]
- [constraint 1]
- [constraint 2]

### Open Questions to Answer
[Extract from Open Questions]
- [question 1]
- [question 2]

### Decisions to Validate
[Extract from Decisions Made]
- [decision 1]: Any gotchas?
```

This manifest drives ALL research. Subagents research these specific items, not generic domain knowledge.
</step>

<step name="define_research_categories">
Three research categories, each PROJECT.md-driven:

1. **stack.md** - What to use for each feature
   - For each feature in Scope: what library/tool?
   - For each constraint: what works within it?
   - Current versions, import statements, setup code

2. **implementation.md** - How to implement correctly
   - Current API patterns for chosen stack
   - Actual code examples with correct syntax
   - "Do this (current) not that (deprecated)"

3. **risks.md** - What Claude might get wrong
   - Deprecated patterns Claude may default to
   - Common implementation mistakes
   - Version-specific gotchas

Each subagent writes directly to `.planning/research/{category}.md`
</step>

<step name="spawn_subagents">
## Subagent Spawning

Read prompt templates from `~/.claude/get-shit-done/references/research-subagent-prompts.md`

**Single batch (spawn all 3 in parallel):**

```
Task 1:
  description: "Research stack for [project]"
  prompt: [stack_subagent_prompt with research manifest]

Task 2:
  description: "Research implementation for [project]"
  prompt: [implementation_subagent_prompt with research manifest]

Task 3:
  description: "Research risks for [project]"
  prompt: [risks_subagent_prompt with research manifest]
```

Send ALL Task calls in a single message. Wait for completion.

**Each subagent receives:**
- The research manifest (features, constraints, questions, decisions)
- Category assignment (stack, implementation, risks)
- Output format from templates/project-research.md
- Instruction: HIGH-CONFIDENCE ONLY
</step>

<step name="verify_outputs">
After subagents complete:

```bash
# Check all files exist
ls -la .planning/research/

# Verify each file has content
for f in stack implementation risks; do
  [ -s ".planning/research/${f}.md" ] && echo "✓ ${f}.md" || echo "✗ ${f}.md MISSING"
done
```

**Quality verification (read each file):**

For each file, check:
- [ ] Addresses specific features from research manifest?
- [ ] Contains actual code examples?
- [ ] No low-confidence items included?
- [ ] Current syntax (2024-2025)?

**If quality issues found:**
- Note specific problems
- Consider re-running that subagent with stricter prompt
- Or flag for manual review
</step>

<step name="aggregate">
Extract key findings for summary:

From stack.md:
- Primary libraries chosen for each feature
- Any constraint-driven choices

From implementation.md:
- Most important API patterns
- Key code examples

From risks.md:
- Critical mistakes to avoid
- Deprecated patterns flagged

Present summary to user with next steps.
</step>

</process>

<subagent_quality_rules>
## Quality Rules for Subagents

**INCLUDE:**
- High-confidence, verified information
- Current API patterns with actual code
- Direct answers to Open Questions from PROJECT.md
- Specific recommendations for features in Scope

**EXCLUDE:**
- Low or medium confidence items
- "Might be useful" padding
- Generic advice not specific to this project
- Old repos/articles marked as outdated
- Options without clear recommendation

**Format for Claude consumption:**
```markdown
## [Feature Name] Implementation

**Use:** [Library] v[X.Y]

```[language]
// Current pattern (2025)
import { Thing } from 'library'
const result = await Thing.doCorrectThing()
```

**NOT:**
```[language]
// Deprecated - Claude may generate this
import Thing from 'library'  // Old syntax
Thing.doOldThing()  // Removed in v2.0
```
```
</subagent_quality_rules>

<success_criteria>
Research workflow complete when:
- [ ] All 3 research files exist in .planning/research/
- [ ] Each file addresses PROJECT.md features specifically
- [ ] Open Questions from PROJECT.md are answered
- [ ] Only high-confidence information included
- [ ] Code examples use current syntax
- [ ] Main agent context preserved
</success_criteria>
