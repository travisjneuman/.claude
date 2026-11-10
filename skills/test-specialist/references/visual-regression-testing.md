# test-specialist: Visual Regression Testing

Part of the `test-specialist` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Visual Regression Testing

### Cypress Screenshot Comparison

```typescript
// Uses a local image-snapshot plugin such as @simonsmith/cypress-image-snapshot
describe("homepage visual regression", () => {
  it("matches the baseline", () => {
    cy.visit("/");
    cy.matchImageSnapshot("homepage", { failureThreshold: 0.01, failureThresholdType: "percent" });
  });

  it("component states", () => {
    cy.visit("/components");

    // Default state
    cy.get(".card").first().matchImageSnapshot("card-default");

    // Mobile viewport
    cy.viewport(375, 812);
    cy.matchImageSnapshot("homepage-mobile");
  });
});

// Update baselines: npx --no cypress run --env updateSnapshots=true
```

### Percy (Cloud Visual Testing)

```typescript
import "@percy/cypress";

it("visual test with Percy", () => {
  cy.visit("/dashboard");
  cy.percySnapshot("Dashboard");
  // Percy compares across browsers and viewport sizes
});
```

### Chromatic (Storybook Visual Testing)

```bash
# Run Chromatic on Storybook stories
npx chromatic --project-token=<token>

# CI integration
# Chromatic captures every story as a visual snapshot
# and detects pixel-level changes across PRs
```

| Tool           | Approach                        | Best For                      |
| -------------- | ------------------------------- | ----------------------------- |
| **Cypress + image snapshot** | Local screenshot comparison | E2E visual tests, free |
| **Percy**      | Cloud cross-browser comparison  | Multi-browser, team review    |
| **Chromatic**  | Storybook story snapshots       | Component library visual QA   |

---
