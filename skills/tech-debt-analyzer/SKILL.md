---
name: tech-debt-analyzer
description: This skill should be used when analyzing technical debt in a codebase, documenting code quality issues, creating technical debt registers, or assessing code maintainability. Use this for identifying code smells, architectural issues, dependency problems, missing documentation, security vulnerabilities, and creating comprehensive technical debt documentation.
---

# Technical Debt Analyzer

Systematically identify, analyze, and document technical debt.

## Debt Categories

| Category | Examples |
|----------|----------|
| Code Quality | Large files, complex functions, TODO/FIXME markers |
| Architectural | Tight coupling, missing abstractions, circular deps |
| Test | Missing coverage, fragile tests, slow execution |
| Documentation | Missing README, outdated docs, no ADRs |
| Dependency | Outdated packages, security vulnerabilities |
| Performance | N+1 queries, memory leaks, large bundles |
| Security | Missing validation, exposed secrets, XSS/SQL injection |

## Analysis Workflow

### 1. Automated Detection

**Code Smells to Check:**
- Large files (>500 lines)
- Complex functions (cyclomatic complexity >10)
- Debt markers (TODO, FIXME, HACK, XXX)
- Console statements in production code
- `any` types in TypeScript
- Long parameter lists (>5 params)
- Deep nesting (>4 levels)
- Magic numbers

**Dependency Issues:**
- Deprecated packages
- Duplicate functionality (multiple libs for same purpose)
- Loose version constraints
- Known vulnerabilities

### 2. Manual Review Focus

- Architectural issues (coupling, abstractions)
- Test quality and coverage gaps
- Documentation completeness
- Performance bottlenecks
- Security vulnerabilities

### 3. Severity Assessment

| Severity | Criteria | Action |
|----------|----------|--------|
| Critical | Security vulns, data loss risk | Immediate fix |
| High | Performance problems, blocking issues | Current sprint |
| Medium | Code quality, missing docs | This quarter |
| Low | Minor smells, optimizations | When convenient |

### 4. Priority Matrix

| Impact / Effort | Low | Medium | High |
|----------------|-----|--------|------|
| High Impact | Do First | Do Second | Plan & Do |
| Medium Impact | Do Second | Plan & Do | Consider |
| Low Impact | Quick Win | Consider | Avoid |

## Debt Register Format

```markdown
## DEBT-001: Description

**Category:** Code Quality | **Severity:** High
**Location:** src/services/UserService.ts

**Description:** Brief description of the issue

**Impact:**
- Business: How it affects delivery
- Technical: Why it's problematic
- Risk: What could go wrong

**Proposed Solution:** What to do about it
**Effort:** Days/hours estimate
**Target:** Sprint/quarter
```

## Prevention Strategies

### Code Review Checklist
- [ ] No new code smells
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No security issues
- [ ] Performance considered
- [ ] Follows team patterns

### Automated Guards
```json
{
  "rules": {
    "complexity": ["error", 10],
    "max-lines-per-function": ["error", 50],
    "max-params": ["error", 5],
    "max-depth": ["error", 4]
  }
}
```

### Maintenance Schedule

| Frequency | Tasks |
|-----------|-------|
| Weekly | Review TODO/FIXME, update register |
| Monthly | Dependency updates, debt review |
| Quarterly | Full analysis, architecture review |

## Tracking Metrics

**Quantity:** Total items, items by severity, items per 1000 LOC
**Quality:** Test coverage, complexity trends, file sizes
**Velocity:** Items resolved/added per sprint, time to resolve
**Business:** Bug rate, feature delivery speed

## See Also

- [Code Review Standards](./../_shared/CODE_REVIEW_STANDARDS.md) - Quality checks
- Project `CLAUDE.md` - Workflow rules
