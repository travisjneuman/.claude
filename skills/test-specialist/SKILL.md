---
name: test-specialist
description: Test-writing patterns for JS/TS, Python, Go, and Rust (unit, integration, E2E, visual regression). Use only when the user explicitly asks for tests or test coverage; for debugging without a test request, use debug-systematic.
---

# Test Specialist

Test-writing patterns for JS/TS, Python, Go, and Rust, plus bug-analysis habits that apply when tests are requested.

## When to Use

Use this skill only when the user explicitly asks for tests. Without that request, validate by reviewing the diff and the code it touches.

**Use for (when tests are requested):**

- Writing unit, integration, or E2E tests
- Improving test coverage
- Security and performance tests

**Don't use when:**

- Debugging without a test request → use `debug-systematic`
- Code review → use `generic-code-reviewer`
- Technical debt → use `tech-debt-analyzer`
- Feature development → use `generic-feature-developer`

## Testing Stack by Project

| Project Type  | Unit Tests  | Component       | E2E     |
| ------------- | ----------- | --------------- | ------- |
| React/Next.js | Vitest/Jest | Testing Library | Cypress |
| Node.js       | Vitest/Jest | Supertest       | Cypress |
| Static        | Jest        | -               | Cypress |

Playwright (`@playwright/test`, `playwright-core`, Playwright MCP, Playwright browsers) is prohibited, and so are Puppeteer and Selenium/WebDriver: never add, install, run, or suggest them. For a browser-level suite use Cypress (or the project's existing non-Playwright runner); for components in a real browser, Vitest browser mode with the `preview` provider, never the `playwright` or `webdriverio` providers. Browser test runners, Percy, Chromatic, and `npx` browser downloads run only when the user asks, through an environment they have approved. To look at a page without a suite, use the active app's built-in browser, then `agent-browser`.

## Test Patterns

### Unit Tests (AAA Pattern)

```typescript
describe("calculateTotal", () => {
  test("sums amounts correctly", () => {
    // Arrange
    const items = [{ amount: 100 }, { amount: 50 }];
    // Act
    const total = calculateTotal(items);
    // Assert
    expect(total).toBe(150);
  });

  test("handles empty list", () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### Component Tests (User Behavior)

```typescript
// ✅ Test user behavior, not implementation
it('creates item when user clicks Add', async () => {
  const user = userEvent.setup();
  render(<ItemList />);

  await user.click(screen.getByRole('button', { name: /add/i }));
  await user.type(screen.getByLabelText(/title/i), 'New item');
  await user.click(screen.getByRole('button', { name: /save/i }));

  expect(screen.getByText('New item')).toBeInTheDocument();
});
```

### E2E Tests (Cypress)

```typescript
describe("checkout", () => {
  it("user can complete checkout", () => {
    cy.visit("/products");

    // Add to cart
    cy.contains("button", "Add to Cart").click();
    cy.contains("a", "Cart").click();

    // Checkout
    cy.contains("button", "Checkout").click();
    cy.get('[name="email"]').type("test@example.com");
    cy.contains("button", "Place Order").click();

    // Verify
    cy.get("h1").should("contain.text", "Order Confirmed");
  });
});
```

### Integration Tests

```typescript
test("POST /items creates item", async () => {
  const response = await request(app)
    .post("/api/items")
    .send({ name: "Test" })
    .expect(201);

  expect(response.body).toMatchObject({ id: expect.any(Number) });
});
```

## Bug Analysis Process

1. **Reproduce** - Document exact steps, expected vs actual
2. **Isolate** - Binary search, minimal reproduction
3. **Root Cause** - Trace execution, check assumptions, git blame
4. **Fix** - Fix the root cause (write a failing test first only when the user asked for tests)
5. **Validate** - Review the diff and the code paths it touches against the reproduction and edge cases

## Debugging Checklist

When debugging an issue:

- [ ] Can reproduce consistently
- [ ] Minimal reproduction created
- [ ] Console/network logs checked
- [ ] State at failure point inspected
- [ ] Git blame checked for recent changes
- [ ] Fix reviewed against the reproduction (failing test only if tests were requested)

## Common Bug Patterns

### Race Conditions

```typescript
test("handles concurrent updates", async () => {
  const promises = Array.from({ length: 100 }, () => increment());
  await Promise.all(promises);
  expect(getCount()).toBe(100);
});
```

### Null Safety

```typescript
test.each([null, undefined, "", 0])("handles invalid input: %p", (input) => {
  expect(() => process(input)).toThrow("Invalid");
});
```

### Boundary Values

```typescript
test("handles edge cases", () => {
  expect(paginate([], 1, 10)).toEqual([]); // empty
  expect(paginate([item], 1, 10)).toEqual([item]); // single
  expect(paginate(items25, 3, 10)).toHaveLength(5); // partial last page
});
```

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/test-specialist/`).

| Topic | File | Covers |
| --- | --- | --- |
| Security Tests | [`references/security-tests.md`](references/security-tests.md) | 18 lines |
| Python Testing (pytest) | [`references/python-testing-pytest.md`](references/python-testing-pytest.md) | Fixtures and Parametrize; Mocking; conftest.py Patterns |
| Go Testing | [`references/go-testing.md`](references/go-testing.md) | Table-Driven Tests; Testify Assertions and Mocks |
| Rust Testing | [`references/rust-testing.md`](references/rust-testing.md) | Unit and Integration Tests; Property-Based Testing (proptest) |
| Visual Regression Testing | [`references/visual-regression-testing.md`](references/visual-regression-testing.md) | Cypress Screenshot Comparison; Percy (Cloud Visual Testing); Chromatic (Storybook Visual Testing) |

## Performance Tests

```typescript
test("handles large datasets efficiently", () => {
  const largeList = Array.from({ length: 10000 }, (_, i) => ({ value: i }));
  const start = performance.now();
  process(largeList);
  expect(performance.now() - start).toBeLessThan(100);
});
```

## Coverage Targets

| Code Type      | Target |
| -------------- | ------ |
| Critical paths | 90%+   |
| Business logic | 85%+   |
| UI components  | 75%+   |
| Utilities      | 70%+   |

## Test Quality Principles

1. **One behavior per test**
2. **Descriptive names** - test names explain scenario
3. **Independent tests** - no shared state
4. **Cover edge cases** - null, empty, boundaries, errors
5. **Mock external deps** - tests should be fast
6. **Test behavior** - not implementation details

## Workflow Decision Tree

| Situation                        | Action                               |
| -------------------------------- | ------------------------------------ |
| Adding feature (tests requested) | Write test first (TDD)               |
| Fixing bug (tests requested)     | Write failing test, then fix         |
| Improving coverage               | Find gaps, prioritize critical paths |
| Code review                      | Check edge cases, error handling     |

---

## See Also

- [Code Review Standards](../_shared/CODE_REVIEW_STANDARDS.md) - Quality requirements
- Project `CLAUDE.md` - Testing rules
