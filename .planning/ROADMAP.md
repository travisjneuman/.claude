# Roadmap: Expert Skill Library Enhancement

## Overview

Transform ~40 Claude Code skills from basic guidelines to expert-level knowledge systems. Starting with foundational infrastructure (templates, shared standards), then enhancing base skills first (multiplier effect), followed by domain experts, stack variants, and utilities. Final phase validates activation and quality across entire library.

## Domain Expertise

None (this is a skill-authoring project, not a domain-specific application)

## Research Context

Pre-planning research was conducted for this domain. Key findings incorporated into phase planning:

**Source:** .planning/research/

**Key Ecosystem Choices:**
- Token-optimized structure: SKILL.md (~5-10KB) + references/ for deep content
- Task-focused descriptions for reliable activation
- Progressive disclosure: Metadata → Core → References

**Architectural Patterns:**
- P0/P1/P2 tiered priority systems for checklists
- Decision trees pointing to references
- Self-critique steps for technical output skills

**Critical Pitfalls Addressed:**
- Instruction overload (>10 rules = 19% performance drop) - Phase 1 establishes template with tiered priorities
- Theory without application - All phases require actionable frameworks, not just explanations
- Monolithic skills - Phase 1 creates shared standards to prevent duplication

See .planning/research/*.md for full research findings.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Templates, shared standards, enhancement checklist
- [ ] **Phase 2: Base Generic Skills** - Enhance 4 base skills (3-4x multiplier effect)
- [ ] **Phase 3: Domain Expert Skills** - Audit and enhance 16 domain skills
- [ ] **Phase 4: Stack-Specific Skills** - Update 12 stack variants
- [ ] **Phase 5: Utility Skills** - Enhance 6+ utility skills
- [ ] **Phase 6: Validation** - Test activation, verify quality, document

## Phase Details

### Phase 1: Foundation
**Goal**: Establish templates, shared standards, and enhancement checklist
**Depends on**: Nothing (first phase)
**Research**: Unlikely (established patterns from research)
**Plans**: 2 plans

Plans:
- [ ] 01-01: Create enhancement template and quality checklist based on research findings
- [ ] 01-02: Create/update shared standards (_shared/ folder) for code review, design patterns

### Phase 2: Base Generic Skills
**Goal**: Enhance 4 base generic skills that all stack variants inherit from
**Depends on**: Phase 1 (needs templates and shared standards)
**Research**: Unlikely (patterns established in Phase 1)
**Plans**: 4 plans (one per skill)

Plans:
- [ ] 02-01: Enhance generic-code-reviewer (already solid at 104 lines, verify/polish)
- [ ] 02-02: Enhance generic-design-system (add design tokens, atomic design, accessibility)
- [ ] 02-03: Enhance generic-feature-developer (add architecture patterns, data flow)
- [ ] 02-04: Enhance generic-ux-designer (add UX methodology, research methods)

### Phase 3: Domain Expert Skills
**Goal**: Audit and enhance 16 domain expert skills with current (2024-2025) frameworks
**Depends on**: Phase 1 (needs quality checklist)
**Research**: Unlikely (comprehensive research already completed)
**Plans**: 4 plans (grouped by domain affinity)

Plans:
- [ ] 03-01: Business group (business-strategy, operations, product-management, innovation)
- [ ] 03-02: People group (hr-talent, leadership, health-wellness)
- [ ] 03-03: Finance/Risk group (finance, risk-management, legal-compliance)
- [ ] 03-04: Technical/External group (data-science, security, sales, marketing, sustainability-esg, rd-management)

### Phase 4: Stack-Specific Skills
**Goal**: Update 12 stack-specific variants to properly reference enhanced base skills
**Depends on**: Phase 2 (base skills must be enhanced first)
**Research**: Unlikely (inherits from base skills)
**Plans**: 3 plans (one per stack family)

Plans:
- [ ] 04-01: React variants (generic-react-code-reviewer, generic-react-design-system, generic-react-feature-developer, generic-react-ux-designer)
- [ ] 04-02: Static variants (generic-static-code-reviewer, generic-static-design-system, generic-static-feature-developer, generic-static-ux-designer)
- [ ] 04-03: Fullstack variants (generic-fullstack-code-reviewer, generic-fullstack-design-system, generic-fullstack-feature-developer, generic-fullstack-ux-designer)

### Phase 5: Utility Skills
**Goal**: Enhance 6+ utility skills with workflows and verification steps
**Depends on**: Phase 1 (needs templates)
**Research**: Unlikely (patterns from research apply)
**Plans**: 2 plans

Plans:
- [ ] 05-01: Documentation utilities (codebase-documenter, document-skills)
- [ ] 05-02: Analysis utilities (tech-debt-analyzer, test-specialist, frontend-enhancer, seo-analytics-auditor)

### Phase 6: Validation
**Goal**: Test activation patterns, verify expert quality, document results
**Depends on**: Phases 2-5 (all skills must be enhanced)
**Research**: Unlikely (validation, not new development)
**Plans**: 2 plans

Plans:
- [ ] 06-01: Activation testing (natural language triggers across all ~40 skills)
- [ ] 06-02: Quality audit and documentation (verify expert-level, update skill inventory)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/2 | Not started | - |
| 2. Base Generic Skills | 0/4 | Not started | - |
| 3. Domain Expert Skills | 0/4 | Not started | - |
| 4. Stack-Specific Skills | 0/3 | Not started | - |
| 5. Utility Skills | 0/2 | Not started | - |
| 6. Validation | 0/2 | Not started | - |
