---
description: Generate a test strategy document — test matrix, coverage goals, and test pyramid allocation for the current project
arguments:
  - name: focus
    description: "Optional focus area: a specific module, feature, or directory to scope the plan (e.g., 'src/auth', 'payment flow')"
    required: false
---

# Test Plan Generator

Analyzes the current project structure and generates a comprehensive test strategy document with test matrix, coverage goals, and test pyramid allocation.

## Usage

```
/test-plan [focus]
```

## Execution Protocol

### Step 1: Project Discovery

Analyze the current project to understand the tech stack and structure:

**Detect framework and tooling:**

```bash
# Check for package.json (Node/JS/TS projects)
[ -f package.json ] && cat package.json | head -50

# Check for pyproject.toml or requirements.txt (Python projects)
[ -f pyproject.toml ] && cat pyproject.toml | head -30
[ -f requirements.txt ] && head -20 requirements.txt

# Check for go.mod (Go projects)
[ -f go.mod ] && cat go.mod | head -10

# Check for Cargo.toml (Rust projects)
[ -f Cargo.toml ] && cat Cargo.toml | head -20
```

**Detect existing test infrastructure:**

```bash
# Existing test files
find . -name "*.test.*" -o -name "*.spec.*" -o -name "*_test.*" -o -name "test_*" | head -30

# Test config files
ls jest.config* vitest.config* pytest.ini setup.cfg .mocharc* playwright.config* cypress.config* 2>/dev/null

# Test directories
ls -d test/ tests/ __tests__/ e2e/ integration/ 2>/dev/null
```

**Detect project structure:**

```bash
# Source directories and top-level modules
find . -maxdepth 3 -type d -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/.next/*" -not -path "*/__pycache__/*" | head -40
```

If `{{focus}}` is provided, narrow discovery to that area only.

---

### Step 2: Identify Testable Components

Based on project discovery, categorize components into testable units:

| Component Type | Examples | Primary Test Level |
| --- | --- | --- |
| **Pure functions/utilities** | Formatters, validators, helpers, parsers | Unit |
| **Data models/types** | Database models, schemas, DTOs | Unit |
| **Business logic/services** | Service classes, use cases, domain logic | Unit + Integration |
| **API endpoints/routes** | REST handlers, GraphQL resolvers | Integration |
| **UI components** | React components, Vue components, Svelte components | Unit (render) + Integration |
| **Database operations** | Repositories, queries, migrations | Integration |
| **External integrations** | API clients, email, payment, auth providers | Integration (mocked) |
| **User workflows** | Login flow, checkout, onboarding | E2E |
| **Configuration** | Env validation, feature flags, startup | Unit |

For each component found, record:
- Name and file path
- Type (from table above)
- Complexity estimate (low/medium/high)
- Current test coverage status (existing tests or untested)

---

### Step 3: Define Test Pyramid Allocation

Apply the test pyramid principle, adjusted for project type:

**Standard web application:**

```
         /  E2E  \          5-10% of tests
        /  (slow)  \        Critical user flows only
       /────────────\
      / Integration  \      20-30% of tests
     /   (moderate)   \     API, DB, component interaction
    /──────────────────\
   /      Unit          \   60-70% of tests
  /    (fast, many)      \  Pure logic, utilities, models
 /────────────────────────\
```

**API-only service:**

```
         /  E2E  \          5% of tests
        / (contract)\       Contract tests with consumers
       /────────────\
      / Integration  \      40% of tests
     /  (API + DB)    \     Endpoint + database tests
    /──────────────────\
   /      Unit          \   55% of tests
  /   (logic, valid.)    \  Business rules, validation
 /────────────────────────\
```

**Frontend-heavy application:**

```
         /  E2E  \          10-15% of tests
        / (flows)  \        User journeys, critical paths
       /────────────\
      / Integration  \      30-40% of tests
     / (component +   \     Component interaction, hooks, stores
    / ──state─────────\
   /      Unit          \   50-60% of tests
  /   (render, logic)    \  Component render, utilities
 /────────────────────────\
```

Select the pyramid that best matches the project.

---

### Step 4: Set Coverage Goals

Define coverage targets per component type:

| Component Type | Coverage Goal | Rationale |
| --- | --- | --- |
| Pure functions/utilities | 90-100% | Easy to test, high value, no dependencies |
| Business logic/services | 80-90% | Core value, must be correct |
| API endpoints | 80-90% | Contract with consumers |
| UI components (critical) | 70-80% | User-facing, regression-prone |
| UI components (simple) | 50-60% | Low risk, diminishing returns |
| Database operations | 70-80% | Data integrity matters |
| External integrations | 60-70% | Mock boundaries, test contracts |
| Configuration | 90-100% | Fail-fast on misconfiguration |

**Overall project target:** 80% line coverage as baseline goal.

---

### Step 5: Create Test Matrix

For each identified component, create a test matrix entry:

```markdown
| Module | Unit | Integration | E2E | Priority | Current Status |
| --- | --- | --- | --- | --- | --- |
| auth/login | Yes (validation) | Yes (API + DB) | Yes (flow) | P0 | Untested |
| auth/session | Yes (token logic) | Yes (cookie handling) | - | P0 | Partial |
| users/service | Yes (CRUD logic) | Yes (DB queries) | - | P1 | Untested |
| components/Button | Yes (render) | - | - | P2 | Untested |
| utils/format | Yes (all cases) | - | - | P1 | Has tests |
```

Priority levels:
- **P0:** Must test before shipping. Authentication, payment, data integrity.
- **P1:** Should test. Core business logic, main user paths.
- **P2:** Nice to test. UI rendering, edge cases, non-critical paths.
- **P3:** Test if time allows. Styling, animations, rare edge cases.

---

### Step 6: Define Testing Tools

Based on detected tech stack, recommend testing tools:

**JavaScript/TypeScript:**

| Purpose | Recommended Tool | Alternative |
| --- | --- | --- |
| Unit/Integration runner | Vitest | Jest |
| Component testing | Testing Library | Enzyme (legacy) |
| E2E testing | Playwright | Cypress |
| API testing | Supertest | httpx (Python) |
| Mocking | vi.mock / vi.fn | jest.mock |
| Coverage | v8 (via Vitest) | Istanbul |

**Python:**

| Purpose | Recommended Tool | Alternative |
| --- | --- | --- |
| Test runner | pytest | unittest |
| API testing | httpx + pytest | requests |
| Mocking | pytest-mock | unittest.mock |
| Coverage | pytest-cov | coverage.py |
| Fixtures | pytest fixtures | factory_boy |

**Go:**

| Purpose | Recommended Tool | Alternative |
| --- | --- | --- |
| Test runner | go test | - |
| Assertions | testify | stdlib |
| Mocking | mockgen | testify/mock |
| E2E/HTTP | httptest | - |
| Coverage | go test -cover | - |

---

### Step 7: Generate Test Plan Document

Create the test plan as `tasks/test-plan-<date>.md`:

```markdown
# Test Plan: <Project Name>

**Generated:** YYYY-MM-DD
**Scope:** <full project or focused area>
**Stack:** <detected tech stack>

---

## Test Pyramid

<pyramid diagram from Step 3>

**Allocation:**
- Unit: NN% (~N tests estimated)
- Integration: NN% (~N tests estimated)
- E2E: NN% (~N tests estimated)

---

## Coverage Goals

| Component Type | Target | Current |
| --- | --- | --- |
| ... | ... | ... |

**Overall target:** 80% line coverage

---

## Test Matrix

| Module | Unit | Integration | E2E | Priority | Status |
| --- | --- | --- | --- | --- | --- |
| ... | ... | ... | ... | ... | ... |

---

## Testing Tools

| Purpose | Tool |
| --- | --- |
| ... | ... |

---

## Test Commands

| Command | Purpose |
| --- | --- |
| `<run unit>` | Run unit tests |
| `<run integration>` | Run integration tests |
| `<run e2e>` | Run E2E tests |
| `<run coverage>` | Generate coverage report |

---

## Implementation Order

### Phase 1: Foundation (P0)
- [ ] Set up test infrastructure (config, fixtures, helpers)
- [ ] <P0 modules listed>

### Phase 2: Core Coverage (P1)
- [ ] <P1 modules listed>

### Phase 3: Comprehensive (P2)
- [ ] <P2 modules listed>

### Phase 4: Polish (P3)
- [ ] <P3 modules listed>

---

## Notes

- <Any project-specific testing considerations>
- <Known testing challenges or limitations>
```

---

### Step 8: Present and Confirm

Display the generated plan summary and confirm:

```
Test plan generated: tasks/test-plan-<date>.md

Summary:
- <N> testable modules identified
- <N> P0 (critical), <N> P1, <N> P2, <N> P3
- Estimated <N> total tests needed
- Current coverage: <X>% → Target: 80%

Next steps:
1. Review the plan in tasks/test-plan-<date>.md
2. Start with Phase 1 (P0 foundation)
3. Use /start-task to begin implementing tests
```

---

## Examples

### Full project test plan

```
/test-plan
```

### Focused on authentication

```
/test-plan src/auth
```

### Focused on a feature

```
/test-plan payment flow
```

---

## Related

- `rules/checklists/verification-template.md` - Verification checklist
- `rules/stacks/react-typescript.md` - React testing patterns
- `rules/stacks/python.md` - Python testing patterns
- `rules/stacks/go.md` - Go testing patterns
- `/start-task` - Begin implementing the test plan

---

_A test plan without execution is just a wish. Start with P0, ship coverage incrementally._
