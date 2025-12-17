# Expert Skill Library Enhancement

## Vision

Transform the Claude Code skills library from a collection of basic guidelines into a world-class expert knowledge system. Every skill should provide the depth and precision of a seasoned domain professional while remaining token-efficient and reliably auto-activating.

The current skills range from 2KB (thin guidelines) to 12KB (domain expert). The goal is to bring all skills up to expert quality through deep research, proven frameworks, and actionable guidance - while optimizing structure so context usage stays efficient.

This isn't about making skills longer. It's about making them **better** - the right depth, the right activation triggers, the right balance between core guidance and reference material.

## Problem

**Current state:**
- 16 domain expert skills (formerly fortune50-*): ~10-12KB each, solid content
- 16 generic-* skills: ~2-7KB each, relatively thin
- 6 utility skills: variable quality
- Total: ~40 skills with inconsistent depth

**The gaps:**
1. **Generic skills are shallow** - Basic checklists vs comprehensive expert guidance
2. **Activation not optimized** - Descriptions may not trigger on natural language
3. **No structural optimization** - Everything in SKILL.md, no reference splitting
4. **Inconsistent quality** - Some skills expert-level, others are starter templates

**Why it matters:**
When a skill activates, Claude should provide genuinely expert guidance - not surface-level tips that anyone could Google. The skills should make Claude a better collaborator, not just a checkbox verifier.

## Success Criteria

How we know this worked:

- [ ] Skills auto-activate on natural language ("help me with marketing" triggers marketing skill)
- [ ] Guidance feels expert-level (matches what seasoned professionals would say)
- [ ] Token efficiency maintained (core SKILL.md lean, deep content in references/)
- [ ] All ~40 skills brought to consistent quality standard
- [ ] Descriptions are task-focused, not qualifier-focused
- [ ] Each skill has clear activation triggers documented

## Scope

### Building
- Deep research on best practices for each skill domain
- Expert-level content with proven frameworks and methodologies
- Token-optimized structure: lean SKILL.md (~5-10KB) + deep references/
- Task-focused descriptions that trigger on natural language
- Actionable guidance (not just theory)
- Consistent quality across all skill categories

### Not Building
- New skill categories outside current domains (focus on enhancement)
- Automated skill testing infrastructure (manual verification is fine)
- Project-specific skill variants (keep skills universal)

## Context

**Recent work completed:**
- Renamed 16 fortune50-* skills to domain names (marketing, sales, etc.)
- Updated descriptions to be task-focused
- Fixed documentation discrepancies

**Current skill categories:**
1. **Domain Expert** (16): business-strategy, data-science, finance, health-wellness, hr-talent, innovation, leadership, legal-compliance, marketing, operations, product-management, rd-management, risk-management, sales, security, sustainability-esg
2. **Base Generic** (4): generic-code-reviewer, generic-design-system, generic-feature-developer, generic-ux-designer
3. **Stack-Specific** (12): generic-react-*, generic-static-*, generic-fullstack-* (each has 4 variants)
4. **Utility** (6+): codebase-documenter, tech-debt-analyzer, test-specialist, frontend-enhancer, seo-analytics-auditor, document-skills

**Token optimization approach:**
- Main SKILL.md: Auto-loads, essential patterns (~5-10KB target)
- references/: Deep-dive guides, templates, comprehensive frameworks (on-demand)
- scripts/: Helper automation where applicable

## Constraints

- **Token efficiency**: Core SKILL.md should stay lean enough to not bloat context
- **Backward compatibility**: Existing skill names and activation should still work
- **Research-backed**: Content should be based on recognized best practices, not invented
- **Self-contained**: Skills should work without external dependencies

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Generic-* naming | Keep as-is | Doesn't prevent activation like fortune50- did |
| Enhancement approach | Deep research + comprehensive | User trusts Claude's judgment on best practices |
| Structure | SKILL.md + references/ | Balances auto-load content with on-demand depth |
| Scope | All ~40 skills | Consistent quality across entire library |

## Open Questions

Things to figure out during execution:

- [ ] Optimal SKILL.md size threshold before splitting to references/?
- [ ] Which skills need the most enhancement (prioritization)?
- [ ] Should scripts/ include automated analysis tools for each domain?
- [ ] How to verify "expert-level" quality (peer review? testing?)?

---
*Initialized: December 17, 2025*
