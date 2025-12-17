# Skill Quality Checklist

Use this checklist to validate skill quality before marking enhancement complete. Tiered priorities ensure critical issues are addressed while maintaining flexibility for polish.

---

## P0: Must Pass (Blocking)

These issues block skill completion. Fix before moving forward.

### Activation Quality

- [ ] **Description is task-focused**
  - Test: Does description list what skill DOES, not what it IS?
  - Test: Would "help me with [task]" activate this skill?
  - Test: Are natural language variations included? (e.g., "technical debt" + "code quality" + "maintainability")

- [ ] **Trigger phrases match natural language**
  - Test: List 5 ways users might describe this task - are those phrases in description?
  - Test: No qualifier-only descriptions ("Fortune 50-level" without capabilities)
  - Test: Includes "Use when [scenarios]" triggers

- [ ] **Description under 1024 characters**
  - Hard limit enforced by system

### Structure Compliance

- [ ] **SKILL.md under 500 lines**
  - Test: Line count < 500 (critical threshold)
  - If >400 lines: Content split to references/ folder

- [ ] **YAML frontmatter complete**
  - `name:` field present (lowercase-hyphen)
  - `description:` field present (task-focused)

- [ ] **references/ folder exists if needed**
  - If comprehensive frameworks included: Split to references/
  - If SKILL.md >400 lines: Split to references/

### Anti-Pattern Avoidance

- [ ] **No padding/filler content**
  - Test: "Can I remove any section without reducing task performance?"
  - Test: Does every paragraph answer "How does this help Claude do the job?"
  - No history sections, no "importance of" sections, no generic introductions

- [ ] **No theory without application**
  - Test: "Can Claude execute after reading, or just explain?"
  - Every framework includes: when to use, exact steps, what to ask, how to evaluate, how to present
  - Examples show application, not just explanation

- [ ] **No instruction overload**
  - Test: "Are there >10 flat instructions?"
  - If yes: Refactor to P0/P1/P2 tiered hierarchy
  - Use decision trees, not checklists

- [ ] **No vague guidance**
  - Test: Are thresholds specific? (">40%" not "good margin")
  - Test: Are steps actionable? ("Check X" not "Consider quality")
  - Test: Are examples concrete? (Real numbers, not "for example, some companies...")

---

## P1: Expert Quality (Should Pass)

These criteria define expert-level skills. Address gaps unless there's a documented reason.

### Framework Coverage

- [ ] **3+ recognized frameworks included**
  - Named methodologies from domain leaders (e.g., RICE, Porter's Five Forces, MEDDIC)
  - Not invented frameworks - industry-standard approaches
  - Each framework includes decision criteria for when to use

- [ ] **Frameworks show HOW, not just WHAT**
  - Step-by-step application process
  - Specific questions to ask user
  - How to score/evaluate
  - How to present results

- [ ] **Domain vocabulary used**
  - Actual professional terminology (not generic phrases)
  - Technical terms defined on first use
  - Vocabulary list for domain skills

### Actionable Guidance

- [ ] **Templates included**
  - Copy-paste ready structures
  - Concrete examples filled in
  - Not just descriptions of what template should contain

- [ ] **Specific thresholds provided**
  - Numbers, percentages, benchmarks
  - Not vague "good/bad" assessments
  - Industry-standard targets referenced

- [ ] **Examples show variation**
  - 2-3 carefully selected examples
  - Not 10+ examples of same pattern
  - Examples demonstrate different scenarios/edge cases

- [ ] **Decision trees for complex choices**
  - If X → Do Y logic explicit
  - Prioritization shown (check this first, then that)
  - Tradeoffs explained

### Quality Mechanisms

- [ ] **Self-critique step included (for technical output)**
  - Required for: code generation, SQL, configs, formulas, analysis
  - Checklist of what to verify
  - Revision step if issues found

- [ ] **Red flags section (for advisory skills)**
  - Common mistakes users make
  - What to probe/challenge
  - How to identify root causes

- [ ] **Output format specified**
  - Template showing expected structure
  - Example of good output
  - Quality criteria for deliverables

---

## P2: Polish (Nice to Have)

These improve skill quality but aren't blocking. Address if time permits.

### Cross-Skill Integration

- [ ] **References to related skills**
  - Links to _shared/ standards where applicable
  - "See also" section with relevant skills
  - Clear boundaries (when to use this vs. that skill)

- [ ] **Leverages shared resources**
  - Uses _shared/ folder for common standards
  - Doesn't duplicate content from other skills
  - Links to shared frameworks

### Consistency

- [ ] **Terminology consistent with other skills**
  - Same terms used across skill library
  - No conflicting definitions
  - Style matches existing skills

- [ ] **Structure matches skill type**
  - Domain expert: Frameworks, decision trees, templates
  - Code review: P0/P1/P2, tech stack detection, output format
  - Utility: Workflow steps, when to use, quality checklist

### Documentation

- [ ] **references/ files have clear signposts**
  - SKILL.md explicitly states when to read references
  - Decision points trigger reference reading
  - Reference inventory listed in SKILL.md

- [ ] **Examples are realistic**
  - Not toy examples
  - Show real-world complexity
  - Include edge cases and exceptions

---

## Verification Questions

### Padding Test
"Can I remove any section without reducing task performance?"
- If yes → Remove it
- If no → Keep it

### Activation Test
"Would 'help me with [task]' activate this skill?"
- List 5 common variations of task request
- Check if description includes those phrases
- Test with natural language, not technical jargon

### Actionable Test
"Can Claude execute after reading, or just explain?"
- Read SKILL.md
- Can you follow steps to complete task?
- Or does it just explain concepts?

### Overload Test
"Are there >10 flat instructions?"
- Count explicit instructions at same level
- If >10 → Refactor to hierarchy (P0/P1/P2 or decision tree)
- Group related instructions into single directive

### Specificity Test
"Are guidelines specific or vague?"
- Vague: "Ensure good performance"
- Specific: "Target <100ms response time, <100KB bundle"
- Every threshold should have a number

### Theory vs Practice Test
"Does framework include application steps?"
- Theory only: Explains what RICE is
- Practice: Shows exact steps, questions to ask, how to calculate, how to present
- Every framework must pass practice test

### Completeness Test (For Technical Output Skills)
"Is there a self-critique step?"
- Required for: code, SQL, configs, formulas, technical analysis
- Must include: what to check, how to verify, revision step
- Not optional for technical output

---

## Pass/Fail Criteria

### Must Pass to Complete
- All P0 items checked
- No blocking anti-patterns present
- Activation testing confirms skill triggers reliably

### Should Pass for Expert Quality
- 80%+ of P1 items checked
- All P1 gaps have documented rationale
- At least 3 recognized frameworks present (for domain skills)

### Nice to Have
- P2 items improve quality but don't block
- Address opportunistically
- Revisit during maintenance cycles

---

## Common Failure Patterns

### Failure: Vague Activation
**Symptom:** Skill doesn't trigger when user describes task naturally
**Test:** Try variations like "our code is messy", "should we refactor", "what needs fixing"
**Fix:** Add those natural language phrases to description field

### Failure: Instruction Overload
**Symptom:** Flat checklist with 20+ items
**Test:** Count instructions at same hierarchy level
**Fix:** Refactor to P0 (must check), P1 (should check), P2 (nice to have)

### Failure: Theory Without Application
**Symptom:** Explains frameworks but doesn't show how to use them
**Test:** Can you execute task after reading, or just explain concepts?
**Fix:** Add step-by-step processes, specific questions, evaluation criteria

### Failure: Missing Self-Critique
**Symptom:** Technical output generated without verification
**Test:** Does skill include "Step N: Verify [output]" before presenting?
**Fix:** Add mandatory self-critique checklist for technical output

### Failure: Padding
**Symptom:** Content that doesn't improve task performance
**Test:** Remove section - can Claude still do the job?
**Fix:** Delete everything that doesn't answer "How does this help?"

### Failure: Underspecification
**Symptom:** Guidance like "ensure quality", "be clear", "follow best practices"
**Test:** Are there specific thresholds, numbers, or criteria?
**Fix:** Replace vague guidance with specific benchmarks

---

## Quality Benchmark

Compare to `generic-code-reviewer` (good example at 104 lines):
- ✓ Task-focused description with tech stacks listed
- ✓ Tech stack detection table
- ✓ Security checks (specific, not vague)
- ✓ Performance targets with numbers
- ✓ Tiered priorities (pre-commit, security, performance, accessibility)
- ✓ References shared standards
- ✓ Under 500 lines

Compare to `business-strategy` (good example at 325 lines + 66KB reference):
- ✓ Multiple frameworks (Porter's Five Forces, BCG Matrix, Blue Ocean)
- ✓ Specific templates (Strategy Presentation, Business Case)
- ✓ Actionable tables (Market Entry Checklist, Decision Matrix)
- ✓ Clear activation description
- ✓ Deep content split to references/ folder

---

## Scanability Target

- **SKILL.md:** Readable in 2-3 minutes
- **This checklist:** Scannable in 2 minutes
- **If longer:** Too much detail - split or condense

---

*Use this checklist during skill enhancement to maintain consistent quality across library. Focus on P0 first, P1 second, P2 opportunistically.*
