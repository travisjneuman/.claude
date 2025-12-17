# Skill Enhancement Template

Use this template as structure when enhancing skills. Copy relevant sections and adapt to skill type (domain expert, code review, utility).

---

## YAML Frontmatter Structure

```yaml
---
name: skill-name-lowercase-hyphen
description: Task-focused description with capabilities and triggers. List what skill does (review code for X, Y, Z), what it supports (tech stacks, domains), and explicit triggers (Use when [scenarios]). Include natural language variations users actually say. NO qualifiers (Fortune 50, expert-level) - use task verbs and deliverables.
---
```

**Description Field Guidelines:**
- **DO:** List task verbs (analyzing, planning, creating, reviewing)
- **DO:** Include natural language variations (technical debt / code quality / maintainability)
- **DO:** Name specific deliverables (creating roadmaps, writing test plans)
- **DO:** Use "Use when..." or "Help with..." triggers
- **DON'T:** Explain what skill does in detail
- **DON'T:** Use qualifier phrases (expert-level, comprehensive)
- **DON'T:** Include methodology explanations
- **Testing:** Would this trigger if user said common variations of the task?

---

## Core SKILL.md Structure

### Size Limits
- **Target:** Under 500 lines (~5-10KB)
- **Critical threshold:** Split to references/ if approaching 400 lines
- **Why:** Auto-loads with skill activation, competes with conversation context

### What Belongs in SKILL.md
- Core decision frameworks (P0/P1 concepts)
- Quick reference tables and checklists
- Common patterns and workflows
- Signposts to references/ for deep content
- Activation logic and when-to-use guidance

### What Belongs in references/
- Comprehensive framework documentation (10-20KB each)
- Detailed examples with context
- Template files
- Deep-dive methodologies
- Industry-specific guides

---

## Template A: Domain Expert Skills (Business/Strategy/Finance)

```markdown
---
name: domain-name
description: [Task-focused with capabilities, domains, triggers]
---

# Domain Name Expert

[One-sentence overview of what this skill provides]

## When to Activate

Use for [domain] decisions involving:
- [Specific scenario 1 with keywords]
- [Specific scenario 2 with keywords]
- [Specific scenario 3 with keywords]
- [Specific scenario 4 with keywords]

## Core Frameworks

### Framework 1 Name (Industry-Standard Framework)

**When to use:** [Specific conditions or scenarios]

**How to apply:**
1. Step one with specific action
2. Step two with specific action
3. Step three with specific action

| Key Concept | Description | Application |
|-------------|-------------|-------------|
| Concept A | Definition | How to use it |
| Concept B | Definition | How to use it |

**Example:** [Concrete example showing framework in action]

---

### Framework 2 Name

**When to use:** [Different scenarios than Framework 1]

**Decision points:**
- If X → Do Y
- If Z → Do A
- Otherwise → Do B

**Thresholds:** [Specific numbers/benchmarks]

---

### Framework 3 Name

**When to use:** [Yet different scenarios]

[Quick reference structure with actionable steps]

## Deliverable Templates

### Template Name

**When to use:** [Scenario]

**Structure:**
```
[Actual template structure user can copy]

Example:
[Concrete example filled in]
```

**Quality checks:**
- [ ] Criterion 1 met
- [ ] Criterion 2 met
- [ ] Criterion 3 met

## Decision Trees

**Scenario: User asks about [common question]**

Determine:
1. Check [key variable] → If X, use Framework 1; if Y, use Framework 2
2. Check [another variable] → If A, recommend [specific action]; if B, recommend [different action]
3. Synthesize → [How to combine insights]

## Domain Vocabulary

Use actual professional terminology:
- **Term 1** (not "generic phrase") - [When to use]
- **Term 2** (not "common phrase") - [When to use]
- **Term 3** (not "simple phrase") - [When to use]

## Red Flags to Watch For

When user asks for help, check for:
- ❌ "[Common mistake]" → Probe: [What to ask to uncover real issue]
- ❌ "[Another mistake]" → Define: [What needs clarification]
- ❌ "[Third mistake]" → Challenge: [What's the actual root cause]

## References

Deep dives in:
- `references/framework-details.md` - [What's in this file]
- `references/templates-library.md` - [What's in this file]
- `references/industry-specific.md` - [What's in this file]

**When to read references:**
- User needs comprehensive [X] → READ references/[specific-file].md
- User asks about [Y] → READ references/[specific-file].md
- Simple questions → Use frameworks above
```

---

## Template B: Code Review Skills

```markdown
---
name: skill-name
description: Review code for [X, Y, Z issues], [specific checks]. Supports [tech stacks]. Use when [scenarios: completing features, before commits, reviewing PRs].
---

# Skill Name

[One-sentence purpose]

**Full Standards:** See [Shared Standards](./../_shared/STANDARDS.md)

## Tech Stack Detection

**Before reviewing, detect stack:**

| Detection | Stack | Key Checks |
|-----------|-------|------------|
| Pattern 1 | Stack A | Focus areas for A |
| Pattern 2 | Stack B | Focus areas for B |
| Pattern 3 | Stack C | Focus areas for C |

## Review Philosophy

Not all rules are equal. Prioritize:
1. **Correctness** - Does it work?
2. **Safety** - Type safety, security, error handling
3. **Maintainability** - Can next dev understand it?
4. **Performance** - Only if user-facing impact

## P0 Issues (Block Merge)

### Issue Category 1
**Rule:** [Specific rule]
**Why:** [Why it matters]
**Exception:** [When rule can flex, if ever]
**How to flag:** [Exact message format]

### Issue Category 2
**Rule:** [Specific rule]
**Why:** [Why it matters]
**Exception:** [None for security - state clearly]
**How to flag:** [Exact message format]

## P1 Issues (Should Fix)

### Issue Category 3
**Guideline:** [Guideline with threshold]
**Why:** [Why it matters]
**Exception:** [Legitimate exceptions]
**How to flag:** [Message format with suggestion]

### Issue Category 4
**Guideline:** [Guideline]
**Why:** [Why it matters]
**When to mention:** [Criteria for flagging]
**When to skip:** [Criteria for not flagging]

## P2 Issues (Nice to Have)

### Issue Category 5
**Guideline:** [Improvement area]
**Why:** [Why it matters]
**When to mention:** [Only if clear, easy improvement]
**How to flag:** [Suggestion format]

## Review Output Format

Only report issues found (don't list empty categories):

**Blocking Issues (P0):**
- [Only if found]

**Should Fix (P1):**
- [Only if found]

**Consider (P2):**
- [Only if found]

**If no issues:** "[Success message matching project standards]"

## Judgment Calls

**When user asks "Is this OK?"**

Consider:
- Is this production or prototype? (Stricter for production)
- Is this hot path or one-time setup? (Performance matters on hot path)
- Is this public API or internal helper? (More rigor for public)

Adjust expectations accordingly.

## See Also

- [Shared Standards](./../_shared/STANDARDS.md) - Full requirements
- Project `CLAUDE.md` - Workflow rules
```

---

## Template C: Utility Skills (Workflow/Tool Skills)

```markdown
---
name: skill-name
description: [Task verbs: creating, analyzing, generating] [deliverables]. Use when [specific scenarios with natural language triggers].
---

# Skill Name

[One-sentence purpose]

## When to Use This Skill

**Create/use when:**
- [Specific condition 1]
- [Specific condition 2]
- [Specific condition 3]

**Don't use when:**
- [Condition where this isn't appropriate]
- [Alternative action if wrong fit]
- [What to use instead]

## Workflow: [Main Task Name]

### Step 1: Gather Requirements

**Ask user (if not provided):**
1. [Key question 1]
2. [Key question 2]
3. [Key question 3]
4. [Key question 4]

**Required context:**
- [What you need to know]
- [What you need to determine]

### Step 2: [Analysis/Design/Planning Phase]

**How to approach:**
1. [Specific action]
2. [Specific action]
3. [Specific action]

**Decision points:**
- If X → Do Y
- If Z → Do A

### Step 3: [Execution Phase]

**Create/generate/implement:**

**Format:**
```
[Actual structure/template]

Example:
[Concrete filled-in example]
```

### Step 4: [Verification Phase]

**Before delivering, check:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
- [ ] Criterion 4

**Self-critique (REQUIRED for technical output):**
- [ ] Correctness: Does this work?
- [ ] Edge cases: What could break?
- [ ] Performance: Any bottlenecks?

If issues found, revise and re-check.

### Step 5: [Delivery/Documentation Phase]

**Present to user:**
```
[Output format with clear sections]

**Next Steps:**
- [What user should do next]
```

## Quality Checklist

Before marking complete:
- [ ] All requirements gathered
- [ ] Output follows established patterns
- [ ] Examples are concrete and working
- [ ] Next steps are clear
- [ ] Quality checks passed

## Common Mistakes to Avoid

**❌ Mistake 1:**
```
[Bad example]
```

**✅ Correct approach:**
```
[Good example showing right way]
```

**❌ Mistake 2:**
[What not to do and why]

**✅ Correct approach:**
[What to do instead]

## References

- `references/detailed-methodology.md` - [When to read this]
- `references/examples-library.md` - [When to read this]
```

---

## Progressive Disclosure Architecture

**Level 1: YAML Frontmatter**
- Name + description for activation
- Read by Claude when deciding which skill to invoke

**Level 2: SKILL.md Body**
- Core guidance, loaded on activation
- Quick reference, decision frameworks, signposts
- Target: Under 500 lines

**Level 3: references/ Files**
- Deep content, loaded on explicit reference
- Comprehensive frameworks, detailed examples, templates
- 10-20KB per file

**Implementation:**
- Keep SKILL.md scannable (headers, tables, bullets)
- Use `**Bold**` for critical terms
- Link to references/ with decision points: "For X → READ references/file.md"
- Don't inline 30KB of content that may not be needed

---

## Anti-Patterns to Avoid

### 1. Monolithic Skills
❌ Everything in one 25KB file
✅ Core frameworks in SKILL.md (~8KB), deep content in references/

### 2. Vague Activation Descriptions
❌ "Fortune 50-level marketing expertise"
✅ "Use for marketing strategy, campaigns, brand development, product launches, market research, customer segmentation, content strategy, go-to-market planning..."

### 3. Theory Over Practice
❌ Explains WHAT frameworks are
✅ Shows HOW to apply them with step-by-step processes

### 4. Instruction Overload
❌ 50+ flat checklist items
✅ Tiered priorities (P0/P1/P2) with under 10 simultaneous instructions

### 5. Generic Expert Claims
❌ "You are a world-class expert with decades of experience"
✅ Named frameworks, domain vocabulary, decision trees, specific thresholds

### 6. Missing Examples
❌ Instructions only
✅ 2-3 carefully selected examples showing variation

### 7. No Self-Critique
❌ Generate output and return
✅ Mandatory verification step for technical output

### 8. Underspecification
❌ "Write clear documentation"
✅ "For [audience], write [type] documentation with [structure], checking [criteria]"

### 9. Description as Documentation
❌ Detailed explanation of what skill does
✅ Task verbs, natural language triggers, deliverables

### 10. Padding/Filler Content
❌ History, importance, introductions
✅ Every paragraph answers: "How does this help Claude do the job better?"

---

## Size Thresholds

| Content Type | Location | Size | Rationale |
|--------------|----------|------|-----------|
| Core patterns | SKILL.md | <500 lines (~5-10KB) | Auto-loads with activation |
| Quick reference | SKILL.md | Tables, checklists | Scannable during execution |
| Deep frameworks | references/ | 10-20KB each | On-demand via explicit reference |
| Examples | references/ | As needed | Context-heavy, load when needed |
| Templates | references/ | As needed | Load when user needs them |

**Action threshold:** If SKILL.md approaching 400 lines, split content to references/

---

## Verification Before Completion

- [ ] YAML description is task-focused with natural language triggers
- [ ] SKILL.md under 500 lines
- [ ] 3+ recognized frameworks included (for expert skills)
- [ ] Specific thresholds/numbers provided (not vague guidance)
- [ ] Templates and examples included (not just theory)
- [ ] Actionable during task execution (can Claude execute, or just explain?)
- [ ] Scannable in 2-3 minutes
- [ ] Tiered priorities used (not flat list >10 items)
- [ ] Self-critique step included (for technical output)
- [ ] No padding (all content serves a purpose)
- [ ] references/ folder created if content exceeds core guidance needs

---

## Token Efficiency Reminders

**Concise over verbose:**
- "To" not "In order to"
- "Now" not "At this point in time"
- "Because" not "Due to the fact that"
- Delete "It is important to note that"

**Structured over prose:**
- Use tables, bullets, numbered lists
- Not paragraphs of explanation

**Direct instructions:**
- "Check X" not "You should carefully consider checking X"
- "Use Y when Z" not "It might be beneficial to use Y in situations where Z"

**No repetition:**
- Context in SKILL.md once, not in every reference file
- Shared standards in _shared/, not duplicated per skill

---

*This template incorporates research findings from implementation.md and risks.md. Use it as a starting point, adapt to specific skill needs, and always prioritize actionable guidance over theoretical knowledge.*
