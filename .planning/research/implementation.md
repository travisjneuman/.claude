# Implementation: Expert Skill Library Enhancement

**Purpose:** Current patterns for Claude Code skill authoring (2025)
**Researched:** December 17, 2025
**For:** Claude Code, not humans

---

## Executive Summary

This document provides **current, production-tested patterns** for Claude Code skill authoring. Based on official Anthropic documentation, real-world infrastructure examples, and actual skill implementations.

**Critical findings:**
1. Skill activation is **pure LLM reasoning** - no embeddings, no regex, no ML classifiers
2. Success rate: **84% with forced eval hooks** vs 50% baseline
3. Optimal SKILL.md size: **Under 500 lines / ~5KB** for core content
4. Description quality determines activation - **task-focused beats qualifier-focused**
5. SKILL.md + references/ structure is **standard practice** for token optimization

---

## Skill Activation Patterns

### How Activation Actually Works (2025)

Claude Code doesn't use embeddings, classifiers, or pattern matching to decide which skill to invoke. The system formats all available skills into a text description embedded in the Skill tool's prompt, and lets Claude's language model make the decision.

**This is pure LLM reasoning.** No regex, no keyword matching, no ML-based intent detection. The decision happens inside Claude's forward pass through the transformer, not in application code.

### Current Pattern: Task-Focused Descriptions

```yaml
---
name: generic-code-reviewer
description: Review code for bugs, security vulnerabilities, performance issues,
  accessibility gaps, and CLAUDE.md workflow compliance. Supports any tech stack -
  HTML/CSS/JS, React, TypeScript, Node.js, Python, NestJS, Next.js, and more.
  Use when completing features, before commits, or reviewing pull requests.
---
```

**Why this works:**
- Lists **what** the skill does (review code for X, Y, Z)
- Lists **what** it supports (tech stacks)
- Explicit triggers: "Use when [specific scenarios]"
- Natural language matches: "review my code" → activates skill

### NOT This: Qualifier-Focused Descriptions

```yaml
---
name: fortune50-code-reviewer
description: Fortune 50-level code review expertise for enterprise applications.
---
```

**Why this fails:**
- "Fortune 50-level" is a qualifier, not a task
- No explicit capabilities listed
- No activation triggers
- User says "review my code" → Claude doesn't see task match

### Activation Reliability Data

Based on production testing with 200+ test cases across different prompt types:

| Approach | Success Rate | Notes |
|----------|--------------|-------|
| **Baseline (simple)** | 50% | Coin flip - unreliable |
| **Forced eval hook** | 84% | Claude lists every skill with YES/NO reasoning |
| **LLM eval hook** | ~80% | Pre-evaluates with Claude API ($0.0004/prompt) |
| **Task-focused descriptions** | ~70-80% | No hooks, just better descriptions |

**Recommendation:** Task-focused descriptions are sufficient for most use cases. Forced eval hooks add reliability but cost verbosity/tokens.

---

## Token-Efficient Structure

### Current Best Practice (2025)

```
skill-name/
├── SKILL.md        # ~5KB - Core guidance, auto-loads
├── references/     # Deep-dive content, on-demand
│   ├── frameworks.md
│   └── examples.md
└── scripts/        # Optional automation
    └── helper.py
```

### What Belongs Where

**SKILL.md contains:**
- YAML frontmatter (name, description)
- Core principles (P0/P1 concepts)
- Quick reference tables
- Common patterns
- Links to references/

**references/ contains:**
- Comprehensive framework documentation
- Detailed examples with context
- Template files
- Deep-dive methodologies
- Industry-specific guides

**scripts/ contains:**
- Automation helpers (optional)
- Analysis tools
- Validation scripts

### Size Thresholds

| Content Type | Location | Size Guidance | Rationale |
|--------------|----------|---------------|-----------|
| Core patterns | SKILL.md | **Under 500 lines** (~5-10KB) | Auto-loads with skill activation |
| Quick reference | SKILL.md | Tables, checklists, frameworks | Scannable during task execution |
| Deep frameworks | references/ | 20-80KB each | On-demand via explicit reference |
| Examples | references/ | As needed | Context-heavy, load when needed |
| Templates | references/ or templates/ | As needed | Load when user needs them |

**Critical threshold:** Official Anthropic guidance says keep SKILL.md **under 500 lines** for optimal performance. Split content into separate files when approaching this limit.

**Why this matters:** Once Claude loads SKILL.md, every token competes with conversation history and other context. Default assumption: Claude is already very smart—only add context Claude doesn't already have.

---

## Expert Content Structure

### Pattern for Domain Skills

Based on analysis of production skills (business-strategy, finance, health-wellness):

```markdown
---
name: domain-name
description: [Task-focused description with capabilities and triggers]
---

# Domain Name Expert

[One-sentence overview]

## Core Frameworks

### Framework 1 Name

[When to use, how to apply]

| Key Concept | Description | Application |
|-------------|-------------|-------------|
| Concept A | Definition | How to use |

### Framework 2 Name

[Quick reference structure]

## Deliverable Templates

### Template Name

```
[Actual template structure]
```

## See Also

- [Related Skill](../other-skill/SKILL.md) - Specific use case
```

### Pattern for Code Review Skills

Based on analysis of generic-code-reviewer, generic-react-code-reviewer:

```markdown
---
name: skill-name
description: [Tech stack] + [What to review] + [When to use]
---

# Skill Name

[One-sentence purpose]

**Full Standards:** See [Shared Standards](./../_shared/STANDARDS.md)

## Tech Stack Detection

[Auto-detect patterns]

## Security Checks

[Scannable checklist]

## Performance Requirements

[Specific targets with numbers]

## Review Checklist

[Pre-commit, security, performance sections]

## See Also

[Links to shared standards]
```

**Key insight:** Code review skills reference shared standards (C:/users/tjn/.claude/skills/_shared/CODE_REVIEW_STANDARDS.md) to avoid duplication.

### Progressive Disclosure Pattern

From official Anthropic documentation:

1. **YAML frontmatter** = First level (name + description for activation)
2. **SKILL.md body** = Second level (core guidance, loaded on activation)
3. **references/ files** = Third level (deep content, loaded on explicit reference)

**Implementation:**
- Keep SKILL.md scannable (headers, tables, bullets)
- Use `**Bold**` for critical terms
- Link to references/ for "See full methodology in [link]"
- Don't inline 30KB of content that may not be needed

---

## Open Questions Answered

### Optimal size threshold before splitting to references/?

**Answer:** **500 lines / ~10KB for SKILL.md**

**Reasoning:**
- Official Anthropic guidance: "Keep SKILL.md under 500 lines for optimal performance"
- Current production skills: 104-325 lines (all under threshold)
- business-strategy: 325 lines with 66KB reference file (good example)
- generic-code-reviewer: 104 lines with shared standards (efficient)

**Action:** Any skill approaching 400 lines should split content to references/

### Which skills need the most enhancement?

**Answer:** Prioritize in this order:

1. **generic-* base skills** (4 skills) - Foundation for all stack-specific variants
   - generic-code-reviewer ✓ (already solid at 104 lines)
   - generic-design-system (needs frameworks)
   - generic-feature-developer (needs architecture patterns)
   - generic-ux-designer (needs design methodology)

2. **Utility skills with thin content** (3-4 skills)
   - document-skills (likely thin)
   - seo-analytics-auditor (verify depth)
   - Any utility under 100 lines

3. **Stack-specific variants** (12 skills) - After base generic skills are solid
   - These inherit from base, so enhance base first

4. **Domain expert skills** (16 skills) - Already at good quality
   - Verify all have references/ for deep content
   - Add missing frameworks/templates

**Prioritization logic:**
- Base skills have 3-4x multiplier (used by stack variants)
- Thin skills give biggest quality improvement
- Domain skills already meet bar (polish vs rebuild)

### Should scripts/ include automated analysis tools?

**Answer:** **Yes, where automation adds value beyond what Claude can do natively**

**Use scripts/ for:**
- Security scanning (e.g., detect exposed secrets, vulnerable dependencies)
- Performance analysis (bundle size, lighthouse scores)
- Accessibility auditing (contrast ratios, ARIA validation)
- Code metrics (complexity, duplication)
- Data analysis (when skill needs to crunch numbers)

**Don't use scripts/ for:**
- Tasks Claude can do with code generation
- Simple file operations
- Generic automation that belongs in slash commands

**Examples from research:**
- Code review skills: Could have script for automated security scanning
- Data science skills: Analysis scripts for statistical tests
- Finance skills: Valuation model templates (Excel/Python)
- SEO skills: Lighthouse/Core Web Vitals automation

### How to verify expert-level quality?

**Answer:** **Multi-dimensional quality checklist**

**Criteria for "expert-level":**

1. **Framework Coverage** (Are proven methodologies included?)
   - [ ] Includes 3+ recognized frameworks from domain leaders
   - [ ] Cites specific methodologies (e.g., MEDDIC, RICE, Porter's Five Forces)
   - [ ] Shows when to use each framework
   - [ ] Provides decision criteria for framework selection

2. **Actionable Guidance** (Can Claude execute with this?)
   - [ ] Includes templates, not just theory
   - [ ] Has specific numbers/thresholds (e.g., "contrast >= 4.5:1")
   - [ ] Shows examples of good vs bad
   - [ ] Provides step-by-step processes

3. **Depth vs Breadth Balance** (Right level of detail?)
   - [ ] Core SKILL.md: Scannable in 2-3 minutes
   - [ ] References: Comprehensive enough for execution
   - [ ] Not Wikipedia dumps (avoid comprehensive but useless content)
   - [ ] Tailored to common use cases, not exhaustive edge cases

4. **Source Quality** (Is content research-backed?)
   - [ ] Based on industry-standard frameworks (not invented)
   - [ ] Matches what professionals in field would recommend
   - [ ] Cites or implies authoritative sources
   - [ ] Avoids generic advice anyone could Google

5. **Activation Quality** (Does it trigger reliably?)
   - [ ] Description is task-focused ("Use when...")
   - [ ] Lists specific capabilities
   - [ ] Matches natural language requests
   - [ ] Tested with sample prompts

**Verification process:**
1. Read SKILL.md in under 3 minutes - is it clear?
2. Check for 3+ recognized frameworks - are they there?
3. Look for templates/examples - can Claude execute?
4. Test description - does "help me with [task]" activate it?
5. Compare to professional guidance - does it match real expertise?

**Quality benchmark:** Compare to business-strategy skill (325 lines, 66KB reference):
- ✓ Multiple frameworks (Porter's Five Forces, BCG Matrix, Blue Ocean)
- ✓ Specific templates (Strategy Presentation, Business Case)
- ✓ Actionable tables (Market Entry Checklist, Decision Matrix)
- ✓ Clear activation description

---

## Decisions Validated

### generic-* naming

**Validation:** ✓ Good choice

**Why it works:**
- "generic-code-reviewer" triggers on "review my code"
- "generic-design-system" triggers on "design system patterns"
- Natural language matching works with task-focused descriptions
- No false negative from qualifier prefix

**Implementation notes:**
- Keep generic-* for base skills (language/framework agnostic)
- Use stack-specific names for variants (generic-react-*, generic-static-*)
- Task focus in description is more important than name

### SKILL.md + references/ structure

**Validation:** ✓ Good choice - industry standard

**Why it works:**
- Official Anthropic pattern from documentation
- Used in production infrastructure examples
- Observed in current skills (business-strategy, finance, health-wellness)
- Balances auto-load content with on-demand depth

**Implementation notes:**
- SKILL.md should reference its references/ files explicitly
- Use relative links: `See [Framework Details](./references/frameworks.md)`
- Consider templates/ subfolder for template files if many exist
- scripts/ folder is optional, add only when automation helps

**Production examples observed:**
```
business-strategy/
├── SKILL.md (325 lines)
└── references/
    └── corporate-strategy-advisor.md (66KB)

health-wellness/
├── SKILL.md
└── references/
    ├── fortune50-workplace-health-wellness.md (35KB)
    └── health-wellness-templates.md (25KB)

_shared/
└── CODE_REVIEW_STANDARDS.md (shared across all code review skills)
```

### Deep research + comprehensive enhancement approach

**Validation:** ✓ Good choice with guardrails

**Why it works:**
- User explicitly trusts Claude's judgment on best practices
- Skills are for Claude (AI → AI), not human documentation
- Quality gap is real (104 lines vs 325 lines between skills)
- Token efficiency prevents bloat if structured correctly

**Guardrails needed:**
- Stay under 500 line threshold for SKILL.md
- Split to references/ when content gets deep
- Focus on proven frameworks, not invented ones
- Actionable over theoretical

**Risk mitigation:**
- Start with base skills (4) to validate approach
- Review after 5 skills to check quality/size
- Use shared/ folder for common standards
- Link to references/ instead of inlining

---

## Quick Reference

### Skill Activation Checklist

When writing/editing a skill description:

- [ ] Lists specific capabilities (not qualifiers)
- [ ] Includes "Use when [scenarios]" triggers
- [ ] Mentions tech stacks or domains covered
- [ ] Matches natural language user requests
- [ ] Under 1024 characters (max limit)

**Good example:**
```yaml
description: Review code for bugs, security vulnerabilities, performance issues,
  accessibility gaps, and CLAUDE.md workflow compliance. Supports any tech stack -
  HTML/CSS/JS, React, TypeScript, Node.js, Python, NestJS, Next.js, and more.
  Use when completing features, before commits, or reviewing pull requests.
```

**Bad example:**
```yaml
description: Fortune 50-level code review expertise for enterprise applications.
```

### Token Optimization Checklist

When structuring skill content:

- [ ] SKILL.md under 500 lines (~10KB)
- [ ] Core patterns in SKILL.md (auto-loads)
- [ ] Deep content in references/ (on-demand)
- [ ] Scannable structure (tables, bullets, headers)
- [ ] Links to references/ for "see more"
- [ ] Shared standards in _shared/ folder (avoid duplication)

### Expert Quality Checklist

When enhancing a skill:

- [ ] 3+ recognized frameworks included
- [ ] Specific thresholds/numbers (not vague guidance)
- [ ] Templates and examples (not just theory)
- [ ] Matches real professional guidance
- [ ] Actionable during task execution
- [ ] Scannable in 2-3 minutes (SKILL.md)

---

## Implementation Strategy

### Phase 1: Enhance Base Skills (Week 1)

**Target:** 4 generic-* base skills

1. **generic-code-reviewer** ✓ Already good (104 lines, references _shared/)
2. **generic-design-system** - Add design tokens, component patterns, accessibility
3. **generic-feature-developer** - Add architecture patterns, data flow, integration
4. **generic-ux-designer** - Add UX methodology, research, interaction patterns

**Success criteria per skill:**
- 200-400 lines in SKILL.md
- 3+ frameworks/methodologies
- Specific examples and templates
- References/ folder if content exceeds 400 lines
- Task-focused description

**Validation:** Test activation with natural language prompts

### Phase 2: Enhance Utility Skills (Week 2)

**Target:** 3-4 thin utility skills

1. Identify skills under 100 lines
2. Research domain best practices
3. Add frameworks and templates
4. Create references/ if needed

**Examples:**
- document-skills → Add documentation patterns, templates, style guides
- seo-analytics-auditor → Add Core Web Vitals, Lighthouse, SEO frameworks
- frontend-enhancer → Add design systems, animation patterns, accessibility

### Phase 3: Audit Domain Expert Skills (Week 3)

**Target:** 16 domain skills

**Not rebuilding - auditing and polishing:**
- [ ] All have references/ folder for deep content
- [ ] SKILL.md under 500 lines
- [ ] 3+ frameworks present
- [ ] Templates included or referenced
- [ ] Task-focused descriptions

**Add missing pieces:**
- Missing frameworks
- Missing templates
- Thin content sections

### Phase 4: Stack-Specific Variants (Week 4)

**Target:** 12 stack-specific skills

**After base skills are solid:**
- Review each variant (react, static, fullstack)
- Ensure they reference base skills
- Add stack-specific patterns
- Avoid duplicating base content

---

## Research Sources

**Official Documentation:**
- [Agent Skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [Skill authoring best practices - Claude Docs](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [How to create custom Skills - Claude Help Center](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)

**Real-World Examples:**
- [Claude Agent Skills: A First Principles Deep Dive](https://leehanchung.github.io/blogs/2025/10/26/claude-skills-deep-dive/)
- [How to Make Claude Code Skills Activate Reliably - Scott Spence](https://scottspence.com/posts/how-to-make-claude-code-skills-activate-reliably)
- [Inside Claude Code Skills - Mikhail Shilkov](https://mikhail.io/2025/10/claude-code-skills/)

**Production Infrastructure:**
- [claude-code-infrastructure-showcase - diet103](https://github.com/diet103/claude-code-infrastructure-showcase)

**Context Engineering:**
- [Effective context engineering for AI agents - Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Optimizing Token Usage - Portkey.ai](https://portkey.ai/blog/optimize-token-efficiency-in-prompts/)

---

*Researched: December 17, 2025*
*This document contains current, production-tested patterns for Claude Code skill authoring.*
