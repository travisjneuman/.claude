# Enhancement Templates

Templates and quality checklist for skill library enhancement project.

---

## Files

### `skill-enhancement-template.md`
Structure template for enhanced skills. Contains:
- YAML frontmatter guidance (name, description)
- Three skill type templates (domain expert, code review, utility)
- Progressive disclosure architecture
- Anti-patterns to avoid
- Size thresholds and token efficiency tips

**Usage:** Copy relevant template section, adapt to specific skill, fill in domain content.

### `skill-quality-checklist.md`
Validation checklist with tiered priorities. Contains:
- P0: Must Pass (activation, structure, anti-patterns)
- P1: Expert Quality (frameworks, actionable guidance, self-critique)
- P2: Polish (cross-skill references, consistency, documentation)
- Verification questions (padding test, activation test, actionable test)
- Pass/fail criteria

**Usage:** Run through checklist before marking skill enhancement complete.

---

## Usage Workflow

1. **Select skill to enhance**
   - Review current SKILL.md
   - Identify skill type (domain expert, code review, utility)

2. **Copy relevant template section**
   - From `skill-enhancement-template.md`
   - Choose Template A (domain), B (code), or C (utility)
   - Adapt structure to skill needs

3. **Fill in domain-specific content**
   - Research industry frameworks
   - Add specific thresholds/benchmarks
   - Include examples and templates
   - Keep SKILL.md under 500 lines

4. **Run quality checklist**
   - From `skill-quality-checklist.md`
   - Verify P0 items (blocking)
   - Check P1 items (expert quality)
   - Address P2 items opportunistically

5. **Verify activation**
   - Test with natural language variations
   - Ensure description triggers reliably

---

## Research Context

Templates incorporate findings from:

### `.planning/research/implementation.md`
Current skill authoring patterns (2025):
- Skill activation is pure LLM reasoning (no embeddings)
- Task-focused descriptions activate reliably (70-80% vs 50% baseline)
- Optimal SKILL.md size: Under 500 lines (~5-10KB)
- SKILL.md + references/ structure is standard practice
- Progressive disclosure: frontmatter → body → references

### `.planning/research/risks.md`
Anti-patterns to avoid:
- Instruction overload (>10 rules causes 19% performance drop)
- Under-specification (2x more likely to regress across models)
- Theory without application (LLMs explain vs execute)
- Padding/filler content (wastes tokens)
- Missing self-critique (increases errors in technical output)

### `.planning/research/stack.md`
Domain-specific frameworks per industry:
- Business strategy: Porter's Five Forces, BCG Matrix, Blue Ocean
- Finance: DCF, LBO, Rule of 40, CAC payback
- Marketing: JTBD, Positioning (Dunford), Media mix
- Product: RICE, ICE, Kano model
- Operations: JIT, Six Sigma, Theory of Constraints

---

## Quick Reference

### Good Skill Examples
- `skills/generic-code-reviewer/SKILL.md` (104 lines, clean structure)
- `skills/business-strategy/SKILL.md` (325 lines + references/)
- `skills/_shared/CODE_REVIEW_STANDARDS.md` (shared across skills)

### Size Guidelines
- SKILL.md: <500 lines target
- Split point: ~400 lines
- references/ files: 10-20KB each
- Total skill library: Lean and scannable

### Activation Formula
**Task verbs + Capabilities + Natural language + Triggers**

Example: "Review code for bugs, security, performance. Supports React, Python, static sites. Use when completing features, before commits, reviewing PRs."

---

*Created: Phase 01, Plan 01*
*Purpose: Foundation for enhancing ~40 skills to expert quality*
