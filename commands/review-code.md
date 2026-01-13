---
description: Trigger a comprehensive code review on recent changes or specified files
arguments:
  - name: target
    description: "File path, directory, or 'staged' for git staged changes (default: staged)"
    required: false
---

# Review Code

Perform comprehensive code review with multi-aspect analysis.

## Usage

```
/review-code [target]
```

## Platform Compatibility

| Platform | Status | Notes                      |
| -------- | ------ | -------------------------- |
| Windows  | ✅     | Git commands work natively |
| macOS    | ✅     | Fully supported            |
| Linux    | ✅     | Fully supported            |

Uses standard git commands which are cross-platform.

## Arguments

| Argument | Default  | Description                                       |
| -------- | -------- | ------------------------------------------------- |
| `target` | `staged` | What to review: file path, directory, or `staged` |

## Behavior

### Step 1: Identify Target

**If target is `staged` or not provided:**

```bash
git diff --cached --name-only
```

**If target is a file:**

- Review that specific file

**If target is a directory:**

- Review all code files in directory

### Step 2: Load Review Skill

Invoke the appropriate code reviewer skill based on detected stack:

| Stack              | Skill                                    |
| ------------------ | ---------------------------------------- |
| React/TypeScript   | `Skill(generic-react-code-reviewer)`     |
| Full-stack         | `Skill(generic-fullstack-code-reviewer)` |
| Static HTML/CSS/JS | `Skill(generic-static-code-reviewer)`    |
| Python             | Load `rules/stacks/python.md`            |
| Go                 | Load `rules/stacks/go.md`                |
| Rust               | Load `rules/stacks/rust.md`              |
| Other              | `Skill(generic-code-reviewer)`           |

### Step 3: Perform Review

Analyze code for:

1. **Correctness** - Logic errors, bugs, edge cases
2. **Security** - OWASP top 10, input validation, secrets
3. **Performance** - Bottlenecks, unnecessary operations
4. **Maintainability** - Readability, complexity, DRY
5. **Testing** - Coverage gaps, test quality
6. **Standards** - Project conventions, style guide

### Step 4: Report Findings

Output structured report:

```markdown
## Code Review: [Target]

### Summary

[Overall assessment]

### Critical Issues (Must Fix)

- [ ] [Issue with file:line reference]

### Recommendations (Should Fix)

- [ ] [Suggestion with reasoning]

### Minor (Nice to Have)

- [ ] [Small improvement]

### Positive Observations

- [What's done well]
```

## Examples

### Review staged changes

```
/review-code
```

### Review specific file

```
/review-code src/components/UserCard.tsx
```

### Review directory

```
/review-code src/services/
```

## Related

- `Skill(generic-code-reviewer)` - Generic review patterns
- `/start-task` - For implementing fixes
- `Task(code-reviewer)` - Agent-based review

---

_Uses confidence-based filtering to report only actionable issues._
