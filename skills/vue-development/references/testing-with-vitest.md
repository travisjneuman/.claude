# vue-development: Testing with Vitest

Part of the `vue-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing with Vitest

### Setup

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
});

// tests/setup.ts
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";
```

### Component Testing

```typescript
// tests/components/UserCard.test.ts
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import UserCard from "@/components/UserCard.vue";

describe("UserCard", () => {
  it("renders user information", () => {
    render(UserCard, {
      props: {
        name: "John Doe",
        email: "john@example.com",
      },
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("emits click event", async () => {
    const { emitted } = render(UserCard, {
      props: { name: "John", email: "john@test.com" },
    });

    await fireEvent.click(screen.getByRole("article"));
    expect(emitted().click).toHaveLength(1);
  });
});
```

### Composable Testing

```typescript
// tests/composables/useFetch.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useFetch } from "@/composables/useFetch";
import { flushPromises } from "@vue/test-utils";

describe("useFetch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("fetches data successfully", async () => {
    const mockData = [{ id: 1, name: "Test" }];
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const { data, loading, error } = useFetch("/api/test");

    expect(loading.value).toBe(true);
    await flushPromises();

    expect(loading.value).toBe(false);
    expect(data.value).toEqual(mockData);
    expect(error.value).toBeNull();
  });

  it("handles errors", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("Network error"));

    const { data, error } = useFetch("/api/test");
    await flushPromises();

    expect(data.value).toBeNull();
    expect(error.value?.message).toBe("Network error");
  });
});
```

---
