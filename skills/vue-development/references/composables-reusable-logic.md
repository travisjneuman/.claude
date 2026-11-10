# vue-development: Composables (Reusable Logic)

Part of the `vue-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Composables (Reusable Logic)

### Naming & Structure

```
src/
└── composables/
    ├── useFetch.ts
    ├── useLocalStorage.ts
    ├── useDebounce.ts
    └── useAuth.ts
```

**Convention:** Always prefix with `use` (e.g., `useFetch`, `useAuth`)

### Creating Composables

```typescript
// composables/useFetch.ts
import { ref, toValue, watchEffect, type MaybeRefOrGetter } from "vue";

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  async function fetchData() {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(toValue(url));
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
    } finally {
      loading.value = false;
    }
  }

  // Auto-refetch when URL changes
  watchEffect(() => {
    fetchData();
  });

  return { data, error, loading, refetch: fetchData };
}

// Usage in component
const { data, error, loading } = useFetch<User[]>("/api/users");

// With reactive URL
const userId = ref(1);
const { data: user } = useFetch(() => `/api/users/${userId.value}`);
```

### Composable Best Practices

```typescript
// composables/useLocalStorage.ts
import { ref, watch, type Ref } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // Read initial value
  const stored = localStorage.getItem(key);
  const value = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>;

  // Sync to storage
  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true },
  );

  return value;
}

// ✅ Good: Accept refs, getters, or plain values
// ✅ Good: Return plain object with refs (not reactive)
// ✅ Good: Clean up in onUnmounted
// ✅ Good: Use toValue() for flexible inputs
```

---
