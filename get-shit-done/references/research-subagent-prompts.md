# Research Subagent Prompts

<overview>
Prompt templates for subagents that research implementation context before roadmap creation.

**Critical understanding:** This research is NOT for human decision-making.
This is CONTEXT INJECTION so Claude Code implements correctly.

Each subagent:
- Receives a research manifest extracted from PROJECT.md
- Researches ONLY the specific features, constraints, and questions in that manifest
- Outputs HIGH-CONFIDENCE information only (no padding)
- Writes directly to `.planning/research/{category}.md`
- Formats output for Claude Code to consume during implementation

**Quality bar:** Will this context make Claude Code generate correct, modern code?
</overview>

<stack_subagent_prompt>
## Stack Research Subagent

Use this template for spawning stack research subagents:

```
<subagent_prompt>
## Objective

Research and document the libraries/tools needed for THIS specific project.
Write findings to .planning/research/stack.md

## Critical Context

**This research is for Claude Code, not humans.**

You are providing context injection so Claude Code implements correctly. Claude's training data may have outdated library versions, deprecated APIs, or old patterns. Your research overrides stale knowledge with current, accurate information.

**Quality bar:** Only include information that will make Claude generate correct, modern code.

## Research Manifest

{Paste the research manifest extracted from PROJECT.md}

## Your Assignment

For EACH feature in the manifest:
1. What library/tool should Claude use?
2. What's the current version?
3. What's the correct import/setup?

For EACH constraint in the manifest:
1. Does the recommended library work within this constraint?
2. Any compatibility issues?

## Research Requirements

Use WebSearch to verify CURRENT information (2024-2025).

**INCLUDE only if:**
- Actively maintained (commits in last 12 months)
- High confidence this is the right choice
- Directly relevant to a feature in the manifest

**EXCLUDE:**
- Low or medium confidence options
- "Might be useful" alternatives
- Deprecated or unmaintained libraries
- Generic options not tied to manifest features

## Output Format

Write to .planning/research/stack.md:

```markdown
# Stack: [Project Name]

**Purpose:** Libraries and tools for Claude Code to use during implementation
**Researched:** [date]

## [Feature 1 from Scope]

**Use:** [Library Name] v[X.Y.Z]
**Why:** [One sentence - why this for this feature]

```[language]
// Setup / import
[actual code]
```

**Docs:** [URL to current documentation]

## [Feature 2 from Scope]

**Use:** [Library Name] v[X.Y.Z]
**Why:** [One sentence]

```[language]
// Setup / import
[actual code]
```

**Docs:** [URL]

## [Continue for each feature...]

## Constraint Compatibility

| Constraint | Status | Notes |
|------------|--------|-------|
| [constraint 1] | ✓ Compatible | [brief note] |
| [constraint 2] | ✓ Compatible | [brief note] |

## Unanswered

- [Any features where no clear library choice exists]
- [Any constraints that couldn't be satisfied]
```

## Quality Checklist

Before writing output, verify:
- [ ] Every feature from manifest has a library recommendation
- [ ] Every library is actively maintained
- [ ] Current versions specified (not "latest")
- [ ] Setup code is current syntax
- [ ] No low-confidence padding included
</subagent_prompt>
```
</stack_subagent_prompt>

<implementation_subagent_prompt>
## Implementation Research Subagent

Use this template for spawning implementation research subagents:

```
<subagent_prompt>
## Objective

Research and document CURRENT implementation patterns for this project's stack.
Write findings to .planning/research/implementation.md

## Critical Context

**This research is for Claude Code, not humans.**

Claude may generate outdated code patterns. Your job is to provide:
- Current API syntax (not deprecated alternatives)
- Working code examples (not pseudocode)
- "Do this, not that" corrections

**Quality bar:** Claude reads this file, then generates correct modern code.

## Research Manifest

{Paste the research manifest extracted from PROJECT.md}

## Your Assignment

For the stack chosen in stack.md (or infer from manifest):
1. What are the CURRENT API patterns?
2. What code does Claude need to generate correctly?
3. What deprecated patterns might Claude default to?

For Open Questions in the manifest:
1. Research and provide direct answers
2. If unanswerable, explain why

## Research Requirements

Use WebSearch and Context7 for current documentation.

**INCLUDE:**
- Actual code examples with current syntax
- "Do this (current)" vs "Not this (deprecated)" comparisons
- Version-specific patterns (as of 2024-2025)
- Answers to Open Questions from manifest

**EXCLUDE:**
- Theoretical explanations without code
- Multiple options without recommendation
- Old patterns from outdated tutorials
- Generic advice not specific to this project

## Output Format

Write to .planning/research/implementation.md:

```markdown
# Implementation: [Project Name]

**Purpose:** Current API patterns for Claude Code to use
**Researched:** [date]

## [Feature 1] Implementation

### Current Pattern (2025)

```[language]
// Correct way to do [thing]
[actual working code]
```

### NOT This (Deprecated)

```[language]
// Claude may generate this - it's outdated
[old pattern to avoid]
// Why wrong: [brief explanation]
```

### Key API Details

- `methodName()` - [what it does, when to use]
- `otherMethod()` - [what it does, when to use]

## [Feature 2] Implementation

[Same structure]

## Open Questions Answered

### [Question 1 from manifest]

**Answer:** [Direct answer with source]

### [Question 2 from manifest]

**Answer:** [Direct answer with source]

## Decisions Validated

### [Decision 1 from manifest]

**Validation:** ✓ Good choice / ⚠️ Gotcha
**Notes:** [Any implementation considerations]

## Patterns Summary

| Task | Current Pattern | Deprecated Pattern |
|------|-----------------|-------------------|
| [task 1] | `doThisWay()` | `oldWay()` |
| [task 2] | `async/await` | `callbacks` |
```

## Quality Checklist

Before writing output, verify:
- [ ] Every code example is runnable (not pseudocode)
- [ ] Deprecated patterns explicitly flagged
- [ ] Open Questions from manifest answered
- [ ] Decisions from manifest validated
- [ ] No "it depends" - give clear recommendations
</subagent_prompt>
```
</implementation_subagent_prompt>

<risks_subagent_prompt>
## Risks Research Subagent

Use this template for spawning risks research subagents:

```
<subagent_prompt>
## Objective

Research what Claude Code might get WRONG when implementing this project.
Write findings to .planning/research/risks.md

## Critical Context

**This research is for Claude Code, not humans.**

Claude's training data includes outdated tutorials, deprecated APIs, and bad patterns. Your job is to identify:
- What Claude might generate incorrectly
- Deprecated patterns to explicitly avoid
- Common implementation mistakes in this domain

**Quality bar:** After reading this, Claude avoids specific mistakes.

## Research Manifest

{Paste the research manifest extracted from PROJECT.md}

## Your Assignment

For this project's domain and stack:
1. What deprecated patterns might Claude default to?
2. What common mistakes happen in this domain?
3. What version-specific gotchas exist?

For Decisions in the manifest:
1. Any known issues with these choices?
2. Pitfalls specific to this combination?

## Research Requirements

Use WebSearch to find:
- GitHub issues about common mistakes
- Stack Overflow questions about gotchas
- Migration guides showing old → new patterns
- "Things I wish I knew" posts

**INCLUDE:**
- Specific mistakes with code examples
- Version-specific deprecations
- Domain-specific pitfalls for this project

**EXCLUDE:**
- Generic coding advice
- Low-probability edge cases
- "Best practices" (that's not risks)
- Risks that don't apply to this specific project

## Output Format

Write to .planning/research/risks.md:

```markdown
# Risks: [Project Name]

**Purpose:** What Claude Code might get wrong
**Researched:** [date]

## Deprecated Patterns to Avoid

### [Deprecated Thing 1]

**Claude might generate:**
```[language]
// This is outdated
[deprecated code pattern]
```

**Instead use:**
```[language]
// Current approach
[correct code pattern]
```

**Why:** [Deprecated in vX.Y, removed in vX.Z, etc.]

### [Deprecated Thing 2]

[Same structure]

## Common Mistakes

### [Mistake 1: Descriptive Name]

**What happens:** [The incorrect approach]
**Why it's wrong:** [Consequence]
**Correct approach:** [What to do instead]

```[language]
// Wrong
[bad code]

// Right
[good code]
```

### [Mistake 2]

[Same structure]

## Stack-Specific Gotchas

### [Gotcha for chosen library/framework]

**Issue:** [What goes wrong]
**When:** [Trigger conditions]
**Fix:** [How to avoid/handle]

## Decision Risks

### [Decision 1 from manifest]

**Risk level:** Low / Medium / High
**Specific concern:** [What could go wrong with this choice]
**Mitigation:** [How to avoid the problem]

## Critical Warnings

1. **[Most important thing to not mess up]**
2. **[Second most important]**
3. **[Third most important]**
```

## Quality Checklist

Before writing output, verify:
- [ ] Every risk is specific (not generic advice)
- [ ] Code examples show wrong vs right
- [ ] Risks are relevant to this project's stack
- [ ] No padding with unlikely scenarios
- [ ] Critical warnings prioritized
</subagent_prompt>
```
</risks_subagent_prompt>

<task_tool_usage>
## Using the Task Tool

Spawn all 3 subagents in a SINGLE message:

```
Task 1:
  subagent_type: "general-purpose"
  description: "Research stack for [project]"
  prompt: [stack_subagent_prompt with manifest]

Task 2:
  subagent_type: "general-purpose"
  description: "Research implementation for [project]"
  prompt: [implementation_subagent_prompt with manifest]

Task 3:
  subagent_type: "general-purpose"
  description: "Research risks for [project]"
  prompt: [risks_subagent_prompt with manifest]
```

Wait for all to complete, then verify outputs.
</task_tool_usage>

<quality_verification>
## Post-Research Quality Check

After subagents complete, verify each file:

**stack.md:**
- [ ] Every manifest feature has a library
- [ ] Current versions specified
- [ ] Setup code included
- [ ] No low-confidence alternatives

**implementation.md:**
- [ ] Code examples are runnable
- [ ] Deprecated patterns flagged
- [ ] Open Questions answered
- [ ] Decisions validated

**risks.md:**
- [ ] Risks specific to this project
- [ ] Wrong vs right code shown
- [ ] No generic advice padding
- [ ] Critical warnings clear

**If a file fails quality check:**
Re-run that specific subagent with stricter instructions, or flag the gap for the user.
</quality_verification>
