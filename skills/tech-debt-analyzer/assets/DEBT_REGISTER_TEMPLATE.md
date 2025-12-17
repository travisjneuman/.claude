# Technical Debt Register

**Project:** [Project Name]
**Last Updated:** [Date]
**Maintained By:** [Team/Person]

## Summary

- **Total Debt Items:** 0
- **Critical:** 0
- **High:** 0
- **Medium:** 0
- **Low:** 0
- **Estimated Total Effort:** 0 days

---

## Active Debt Items

### DEBT-001: [Brief Description]

**Category:** [Code Quality / Architecture / Test / Documentation / Dependency / Performance / Security / Infrastructure / Design]

**Severity:** [Critical / High / Medium / Low]

**Created:** [YYYY-MM-DD]

**Location:**
- File(s): `path/to/file.ts`
- Component/Module: [Name]

**Description:**
[Detailed description of the technical debt issue]

**Impact:**
- **Business Impact:** [How does this affect users, features, or business goals?]
- **Technical Impact:** [How does this affect code quality, maintainability, or performance?]
- **Risk:** [What could go wrong if left unaddressed?]

**Root Cause:**
[Why was this shortcut taken? Deadline pressure, lack of knowledge, evolving requirements, etc.]

**Proposed Solution:**
[How should this be addressed? What's the ideal fix?]

**Effort Estimate:** [X hours/days]

**Priority Justification:**
[Why this severity level? Why fix this now vs later?]

**Dependencies:**
- Blocks: [List items this blocks]
- Blocked By: [List items blocking this]
- Related: [List related debt items]

**Status:** [Open / In Progress / Resolved / Won't Fix]

**Assignee:** [Name or Unassigned]

**Target Resolution:** [YYYY-MM-DD or Sprint/Quarter]

**Notes:**
- [Any additional context, discussion, or updates]

---

### DEBT-002: [Brief Description]

[Repeat structure above for each debt item]

---

## Resolved Debt Items

### DEBT-XXX: [Brief Description]

**Resolved Date:** [YYYY-MM-DD]
**Resolution:** [How it was fixed]
**Effort Spent:** [Actual time taken]
**Lessons Learned:** [What we learned from this]

---

## Won't Fix Items

### DEBT-XXX: [Brief Description]

**Decision Date:** [YYYY-MM-DD]
**Reason:** [Why we decided not to fix this]
**Decision Maker:** [Name/Team]

---

## Debt Trends

### By Category
- Code Quality: X items
- Architecture: X items
- Test: X items
- Documentation: X items
- Dependency: X items
- Performance: X items
- Security: X items
- Infrastructure: X items
- Design: X items

### By Severity
- Critical: X items
- High: X items
- Medium: X items
- Low: X items

### Aging
- < 1 month: X items
- 1-3 months: X items
- 3-6 months: X items
- 6-12 months: X items
- > 1 year: X items

---

## Review Schedule

- **Weekly:** Triage new items, update status
- **Monthly:** Review high priority items, plan fixes
- **Quarterly:** Full debt review, trend analysis

---

## Guidelines

### When to Add Items

Add technical debt items when:
- Taking a shortcut to meet a deadline
- Discovering code smells during development
- Identifying architectural improvements
- Finding missing tests or documentation
- Detecting performance issues
- Discovering security concerns

### How to Prioritize

Use this framework:
1. **Critical:** Security issues, production blockers, data loss risks
2. **High:** Blocks features, significant performance issues, high-churn areas
3. **Medium:** Quality issues, missing tests, outdated dependencies
4. **Low:** Minor improvements, optimizations, nice-to-haves

### When to Fix

- **Critical:** Immediately
- **High:** Within current/next sprint
- **Medium:** Within quarter
- **Low:** When convenient or during refactoring

### How to Prevent

- Code review checklist
- Automated linting and testing
- Regular dependency updates
- Documentation requirements
- Architecture reviews
