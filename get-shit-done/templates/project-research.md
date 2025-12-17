# Project Research Template

Template for `.planning/research/{category}.md` - implementation context for Claude Code.

---

<philosophy>
## What This Research Is

**Context injection for Claude Code implementation quality.**

This is NOT research for humans to make decisions.
This is context that Claude Code reads during implementation to generate correct, modern code.

**Quality bar:** Will this make Claude generate better code?

**Include:** High-confidence, directly actionable, current patterns with code examples
**Exclude:** Low-confidence, generic advice, "might be useful" padding, outdated patterns
</philosophy>

---

## stack.md Template

```markdown
# Stack: [Project Name]

**Purpose:** Libraries and tools for Claude Code to use during implementation
**Researched:** [date]

## [Feature 1 from PROJECT.md Scope]

**Use:** [Library Name] v[X.Y.Z]
**Why:** [One sentence - why this library for this feature]

```[language]
// Setup / import
import { Thing } from 'library'

// Basic usage
const result = Thing.doThing()
```

**Docs:** [URL to current documentation]

## [Feature 2 from PROJECT.md Scope]

**Use:** [Library Name] v[X.Y.Z]
**Why:** [One sentence]

```[language]
// Setup / import
[actual code]
```

**Docs:** [URL]

## [Continue for each feature in Scope...]

## Constraint Compatibility

| Constraint | Status | Notes |
|------------|--------|-------|
| [constraint from PROJECT.md] | ✓ Compatible | [brief note] |
| [constraint from PROJECT.md] | ✓ Compatible | [brief note] |

## Unanswered

- [Any features where no clear library choice exists - be honest]
```

---

## implementation.md Template

```markdown
# Implementation: [Project Name]

**Purpose:** Current API patterns for Claude Code to use
**Researched:** [date]

## [Feature 1] Implementation

### Current Pattern (2025)

```[language]
// Correct way to implement [feature]
[actual working code - not pseudocode]
```

### NOT This (Deprecated)

```[language]
// Claude may generate this - it's outdated
[old pattern]
// Why wrong: [deprecated in vX, removed in vY, causes Z problem]
```

### Key APIs

- `methodName(params)` - [what it does, when to use]
- `otherMethod(params)` - [what it does, when to use]

## [Feature 2] Implementation

[Same structure]

## Open Questions Answered

### [Question from PROJECT.md Open Questions]

**Answer:** [Direct answer]
**Source:** [URL or documentation reference]

### [Question 2]

**Answer:** [Direct answer or "Could not determine - [reason]"]

## Decisions Validated

### [Decision from PROJECT.md Decisions Made]

**Validation:** ✓ Good choice / ⚠️ Has gotchas
**Notes:** [Implementation considerations Claude should know]

## Quick Reference

| Task | Current Pattern | Deprecated Pattern |
|------|-----------------|-------------------|
| [common task 1] | `newWay()` | `oldWay()` |
| [common task 2] | `async/await` | `.then()` chains |
```

---

## risks.md Template

```markdown
# Risks: [Project Name]

**Purpose:** What Claude Code might get wrong
**Researched:** [date]

## Deprecated Patterns to Avoid

### [Deprecated Thing 1]

**Claude might generate:**
```[language]
// This is outdated - from old tutorials/training data
[deprecated code pattern]
```

**Instead use:**
```[language]
// Current approach (2025)
[correct code pattern]
```

**Why:** Deprecated in v[X], removed in v[Y]. [Brief explanation]

### [Deprecated Thing 2]

[Same structure]

## Common Mistakes

### [Mistake 1: Descriptive Name]

**What happens:** [The incorrect approach Claude might take]
**Why it's wrong:** [Specific consequence - performance, bugs, etc.]
**Correct approach:**

```[language]
// Wrong
[bad code]

// Right
[good code]
```

## Stack-Specific Gotchas

### [Gotcha for this project's chosen stack]

**Issue:** [What goes wrong]
**When:** [Trigger conditions]
**Fix:** [How to avoid or handle]

## Decision Risks

### [Decision from PROJECT.md]

**Risk level:** Low / Medium / High
**Concern:** [What could go wrong with this choice]
**Mitigation:** [How to avoid the problem]

## Critical Warnings

1. **[Most important thing Claude must not mess up]**
2. **[Second most important]**
3. **[Third most important]**
```

---

<quality_rules>
## Quality Rules

### INCLUDE:

- High-confidence information only
- Actual code examples (runnable, not pseudocode)
- Current syntax (2024-2025)
- Direct answers to PROJECT.md questions
- Specific recommendations tied to manifest features

### EXCLUDE:

- Low or medium confidence items
- "Might be useful" padding
- Generic advice not specific to this project
- Options without clear recommendation
- Old repos/articles acknowledged as outdated
- Anything that doesn't directly improve Claude's implementation

### Format for Claude Consumption:

Every recommendation should include:
1. What to use (specific, versioned)
2. Why (one sentence)
3. How (actual code)
4. What NOT to do (if relevant)

### No Padding Rule:

If you can't find high-confidence information for something, say so:
- "Could not determine - no authoritative source found"
- "Unanswered - requires experimentation"

This is better than padding with low-quality guesses.
</quality_rules>

