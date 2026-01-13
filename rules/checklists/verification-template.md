# Verification Checklist Template

**When to use:** After completing any task to verify success before marking complete.

Based on the KERNEL "Easy to verify" principle - explicit success criteria reduce unwanted outputs by 91%.

---

## Quick Verification

- [ ] Primary goal achieved
- [ ] No errors in console/logs
- [ ] Builds successfully

---

## Code Verification

- [ ] Tests pass: `npm run test` / `pytest` / `go test ./...`
- [ ] Type check passes: `npm run type-check` / `mypy src/`
- [ ] Linter passes: `npm run lint` / `ruff check .`

---

## Solution Quality Verification

**Critical:** Solutions must work for ALL valid inputs, not just test cases.

- [ ] Solution implements actual logic, not just pattern matching to pass tests
- [ ] No hard-coded values specific to test inputs
- [ ] Edge cases handled beyond what tests explicitly check
- [ ] Solution would work correctly if tests were different
- [ ] Algorithm/logic is sound and generalizable

**Anti-Patterns to Avoid:**

- ❌ Hard-coding expected output values
- ❌ Creating solutions that only work for specific test inputs
- ❌ Using helper scripts to work around proper implementation
- ❌ Focusing on "making tests green" instead of solving the problem
- ❌ Pattern matching test inputs instead of implementing real logic

**Correct Approach:**

- ✅ Understand problem requirements independent of tests
- ✅ Implement proper algorithm/logic
- ✅ Tests verify correctness, they don't define the solution
- ✅ Solution is robust, maintainable, and extendable
- ✅ Follows software design principles and best practices

---

## Constraint Verification

- [ ] Explicit constraints met (from task requirements)
- [ ] No forbidden patterns introduced (check Anti-Patterns)
- [ ] Scope boundaries respected (no scope creep)
- [ ] No `any` types added
- [ ] No security vulnerabilities introduced

---

## Integration Verification

- [ ] Works with existing code
- [ ] No breaking changes to public APIs
- [ ] No regressions in related features
- [ ] Documentation updated (if behavior changed)

---

## Task-Specific Criteria

Add task-specific verification items here:

- [ ] _[Specific to your task]_
- [ ] _[Specific to your task]_

---

## Usage

### In Task Files

```markdown
## Verification Criteria

- [ ] User can log in with valid credentials
- [ ] Invalid credentials show error message
- [ ] Session persists across page refresh
- [ ] Tests pass: `npm run test:auth`
```

### In Skills

Skills can reference this template and add domain-specific criteria.

### In Code Reviews

Reviewers should verify all applicable items before approval.

---

## Why Verification Matters

From research:

- "If you can't verify success, AI can't deliver"
- Explicit success criteria reduce unwanted outputs by 91%
- Verification catches issues before they compound

---

## Related Documentation

- `~/.claude/CLAUDE.md` - Core rules and Anti-Patterns
- `~/.claude/rules/checklists/` - Other checklists
- `~/.claude/templates/task-template.md` - Task planning template

---

_Verify before marking complete. Every time._
