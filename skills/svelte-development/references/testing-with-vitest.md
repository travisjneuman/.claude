# svelte-development: Testing with Vitest

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing with Vitest

### Setup

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
```

### Component Testing

```typescript
// tests/Counter.test.ts
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/svelte";
import Counter from "$lib/components/Counter.svelte";

describe("Counter", () => {
  it("renders initial count", () => {
    render(Counter, { props: { initial: 5 } });

    expect(screen.getByText("Count: 5")).toBeInTheDocument();
  });

  it("increments on click", async () => {
    render(Counter);

    const button = screen.getByRole("button", { name: /increment/i });
    await fireEvent.click(button);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

### Testing Stores

```typescript
// tests/stores/counter.test.ts
import { describe, it, expect } from "vitest";
import { counter } from "$lib/stores/counter.svelte";

describe("counter store", () => {
  it("increments count", () => {
    counter.reset();
    expect(counter.count).toBe(0);

    counter.increment();
    expect(counter.count).toBe(1);

    counter.increment();
    expect(counter.count).toBe(2);
  });

  it("decrements count", () => {
    counter.reset();
    counter.decrement();
    expect(counter.count).toBe(-1);
  });
});
```

---
