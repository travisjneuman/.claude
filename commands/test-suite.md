---
description: Run comprehensive test suite with coverage analysis
arguments:
  - name: scope
    description: "Test scope: unit | integration | e2e | all (default: all)"
    required: false
---

# Test Suite Runner

Detects the project's test framework, runs tests at the specified scope, analyzes failures, reports coverage, and suggests missing test coverage.

---

## Execution Flow

### Step 1: Detect Test Framework

```bash
# Check for common test frameworks
[ -f "package.json" ] && grep -qE '"(jest|vitest|mocha|cypress|playwright)"' package.json && echo "NODE_PROJECT"
[ -f "pytest.ini" ] || [ -f "pyproject.toml" ] && grep -q "pytest" pyproject.toml 2>/dev/null && echo "PYTEST"
[ -f "go.mod" ] && echo "GO_TEST"
[ -f "Cargo.toml" ] && echo "CARGO_TEST"
```

**Detected framework determines all subsequent commands.**

| Framework              | Test Runner                    | Coverage Tool         |
| ---------------------- | ------------------------------ | --------------------- |
| Jest                   | `npx jest`                     | `--coverage`          |
| Vitest                 | `npx vitest run`               | `--coverage`          |
| Mocha                  | `npx mocha`                    | `npx c8 mocha`        |
| Pytest                 | `pytest`                       | `--cov`               |
| Go test                | `go test ./...`                | `-cover -coverprofile`|
| Cargo test             | `cargo test`                   | `cargo tarpaulin`     |
| Cypress                | `npx cypress run`              | (via istanbul)        |
| Playwright             | `npx playwright test`          | (via istanbul)        |

---

### Step 2: Run Tests by Scope

**Scope:** `{{scope}}` (default: `all`)

#### Unit Tests

```bash
# Node.js (Jest/Vitest)
npx jest --testPathPattern="(unit|__tests__)" 2>/dev/null || npx vitest run --dir tests/unit 2>/dev/null

# Python
pytest tests/unit/ -v 2>/dev/null || pytest -v -m unit 2>/dev/null

# Go
go test -short ./... -v

# Rust
cargo test --lib
```

#### Integration Tests

```bash
# Node.js
npx jest --testPathPattern="integration" 2>/dev/null || npx vitest run --dir tests/integration 2>/dev/null

# Python
pytest tests/integration/ -v 2>/dev/null || pytest -v -m integration 2>/dev/null

# Go
go test -run Integration ./... -v

# Rust
cargo test --test '*'
```

#### E2E Tests

```bash
# Playwright
npx playwright test

# Cypress
npx cypress run

# Python (selenium/playwright)
pytest tests/e2e/ -v
```

#### All Tests

Run unit, then integration, then e2e in sequence. Report results for each.

---

### Step 3: Coverage Analysis

Run tests with coverage enabled:

```bash
# Node.js (Jest)
npx jest --coverage --coverageReporters=text --coverageReporters=json-summary

# Node.js (Vitest)
npx vitest run --coverage

# Python
pytest --cov=src --cov-report=term-missing

# Go
go test -coverprofile=coverage.out ./... && go tool cover -func=coverage.out

# Rust
cargo tarpaulin --out Stdout 2>/dev/null || echo "Install: cargo install cargo-tarpaulin"
```

**Report coverage summary:**

```
Coverage Report
---------------
Statements:  XX%
Branches:    XX%
Functions:   XX%
Lines:       XX%

Uncovered Files:
- src/services/payment.ts (0% - no tests)
- src/utils/crypto.ts (23% - missing edge cases)
```

---

### Step 4: Failure Analysis

If any tests fail:

1. **Parse failure output** to identify failing tests
2. **Read the failing test file** to understand what it expects
3. **Read the source file** being tested to identify the bug
4. **Report analysis:**

```
Failed Tests Analysis
---------------------
1. test_user_authentication (tests/test_auth.py:42)
   Expected: 200 status code
   Got: 401
   Likely cause: Token validation logic changed in src/auth/jwt.py
   Suggested fix: Update token expiry check on line 87

2. UserCard.test.tsx - "renders user name"
   Expected: "John Doe" in document
   Got: Element not found
   Likely cause: Component renamed from UserCard to ProfileCard
   Suggested fix: Update import in test file
```

---

### Step 5: Missing Test Suggestions

Analyze the codebase for untested code:

1. **Find source files without corresponding test files**
2. **Identify exported functions without test coverage**
3. **Check for missing edge case tests** (null inputs, error paths, boundary values)

```
Missing Test Coverage
---------------------
Priority 1 (Critical - no tests):
- src/services/payment.ts → needs tests/services/payment.test.ts
- src/middleware/auth.ts → needs tests/middleware/auth.test.ts

Priority 2 (Low coverage):
- src/utils/validation.ts (23%) → missing: email validation, phone format
- src/hooks/useForm.ts (45%) → missing: error states, async validation

Priority 3 (Missing edge cases):
- src/services/user.ts → missing: null user ID, duplicate email
- src/components/DataTable.tsx → missing: empty data, loading state
```

---

### Step 6: Summary Report

```
Test Suite Report
=================
Framework:    [detected]
Scope:        {{scope}}
Duration:     X.Xs

Results:
  Passed:     XX
  Failed:     XX
  Skipped:    XX
  Total:      XX

Coverage:     XX% (target: 80%)

Action Items:
  - [ ] Fix N failing tests
  - [ ] Add tests for M uncovered files
  - [ ] Improve coverage in K partially-tested files
```

---

## Related Skills

| Skill             | When to Use              |
| ----------------- | ------------------------ |
| `test-specialist` | Detailed testing advice  |

---

_Part of the Ultimate Claude Code Toolkit_
