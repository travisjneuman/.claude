---
name: svelte-development
description: Svelte 5 development with runes ($state, $derived, $effect), SvelteKit full-stack framework, and modern reactive patterns. Use when building Svelte applications, implementing fine-grained reactivity, or working with SvelteKit routing and server functions.
---

# Svelte 5 Development

Comprehensive guide for building modern Svelte applications with runes and SvelteKit.

## Stack Overview

| Tool       | Purpose              | Version |
| ---------- | -------------------- | ------- |
| Svelte 5   | Core framework       | 5.0+    |
| SvelteKit  | Full-stack framework | 2.0+    |
| TypeScript | Type safety          | 5.0+    |
| Vite       | Build tool           | 5.0+    |
| Vitest     | Testing              | 1.0+    |

---

## Svelte 5 Runes (Core Reactivity)

### The Rune System

Runes are compile-time macros prefixed with `$` that provide explicit, fine-grained reactivity.

| Rune        | Purpose               | Replaces                    |
| ----------- | --------------------- | --------------------------- |
| `$state`    | Reactive state        | `let` declarations          |
| `$derived`  | Computed values       | `$:` reactive statements    |
| `$effect`   | Side effects          | `$:` side effect statements |
| `$props`    | Component props       | `export let`                |
| `$bindable` | Two-way binding props | `export let` with bind:     |

### Basic Component Structure

```svelte
<script lang="ts">
  // Props with TypeScript
  interface Props {
    title: string
    count?: number
    onUpdate?: (value: number) => void
  }

  let { title, count = 0, onUpdate }: Props = $props()

  // Reactive state
  let localCount = $state(count)
  let items = $state<string[]>([])

  // Derived values (auto-update when dependencies change)
  let doubled = $derived(localCount * 2)
  let total = $derived(items.reduce((sum, i) => sum + i.length, 0))

  // Side effects
  $effect(() => {
    console.log(`Count changed to: ${localCount}`)
    onUpdate?.(localCount)
  })

  // Methods
  function increment() {
    localCount++
  }
</script>

<div class="component">
  <h1>{title}</h1>
  <p>Count: {localCount} (Doubled: {doubled})</p>
  <button onclick={increment}>Increment</button>
</div>

<style>
  .component {
    padding: 1rem;
  }
</style>
```

### State Patterns

```typescript
// Primitives
let count = $state(0);
let name = $state("");

// Objects (deeply reactive)
let user = $state({
  name: "John",
  email: "john@example.com",
  preferences: { theme: "dark" },
});

// Arrays
let items = $state<Item[]>([]);

// Direct mutation works!
user.name = "Jane"; // Reactive
user.preferences.theme = "light"; // Reactive (deep)
items.push({ id: 1, name: "New" }); // Reactive

// Frozen state (shallow reactivity)
let frozenList = $state.frozen([1, 2, 3]);
```

### Derived Values

```typescript
// Simple derived
let doubled = $derived(count * 2);

// Complex derived (use $derived.by for multi-line)
let stats = $derived.by(() => {
  const total = items.reduce((sum, i) => sum + i.value, 0);
  const average = items.length ? total / items.length : 0;
  return { total, average, count: items.length };
});

// Derived from multiple sources
let summary = $derived(`${user.name} has ${items.length} items`);
```

### Effects

```typescript
// Basic effect (runs when dependencies change)
$effect(() => {
  console.log(`Count is now: ${count}`);
});

// Effect with cleanup
$effect(() => {
  const interval = setInterval(() => {
    count++;
  }, 1000);

  // Cleanup function (returned)
  return () => clearInterval(interval);
});

// Pre-effect (runs before DOM updates)
$effect.pre(() => {
  console.log("About to update DOM");
});

// Root effect (doesn't track dependencies)
$effect.root(() => {
  // Manual dependency management
});
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/svelte-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| Component Patterns | [`references/component-patterns.md`](references/component-patterns.md) | Props with Defaults and Spreading; Two-Way Binding with $bindable; Snippets (Replacing Slots); Snippets with Parameters |
| Shared State with .svelte.ts Files | [`references/shared-state-with-svelte-ts-files.md`](references/shared-state-with-svelte-ts-files.md) | Creating Shared State; Class-Based State; Using Shared State |
| SvelteKit (Full-Stack) | [`references/sveltekit-full-stack.md`](references/sveltekit-full-stack.md) | Project Structure; Load Functions; Form Actions; API Routes; Middleware (Hooks) |
| Event Handling (Svelte 5) | [`references/event-handling-svelte-5.md`](references/event-handling-svelte-5.md) | DOM Events (New Syntax); Component Events (Callback Props) |
| Testing with Vitest | [`references/testing-with-vitest.md`](references/testing-with-vitest.md) | Setup; Component Testing; Testing Stores |
| Migration from Svelte 4 | [`references/migration-from-svelte-4.md`](references/migration-from-svelte-4.md) | Migration Script |
| Anti-Patterns to Avoid | [`references/anti-patterns-to-avoid.md`](references/anti-patterns-to-avoid.md) | 12 lines |

## Performance Benefits

| Metric              | Improvement                   |
| ------------------- | ----------------------------- |
| Bundle size         | 40-60% smaller than React/Vue |
| Runtime performance | No virtual DOM overhead       |
| Time to interactive | Minimal JavaScript hydration  |
| Memory usage        | Lower due to compiled output  |

---

## Related Resources

- [Svelte 5 Documentation](https://svelte.dev/docs)
- [SvelteKit Documentation](https://svelte.dev/docs/kit)
- [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide)
- [Svelte Testing Docs](https://svelte.dev/docs/svelte/testing)
- [Joy of Code Tutorials](https://joyofcode.xyz/)

---

## When to Use This Skill

- Building new Svelte 5 applications with runes
- Migrating from Svelte 4 to Svelte 5
- Full-stack development with SvelteKit
- Creating reactive shared state
- Implementing form actions and API routes
- Testing Svelte components with Vitest
