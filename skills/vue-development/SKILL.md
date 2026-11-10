---
name: vue-development
description: Vue.js 3 development with Composition API, TypeScript, Pinia state management, and Nuxt 3 full-stack. Use when building Vue applications, implementing reactive patterns, creating composables, or working with the Vue ecosystem.
---

# Vue.js 3 Development

Comprehensive guide for building modern Vue.js applications with the Composition API.

## Stack Overview

| Tool       | Purpose              | Version |
| ---------- | -------------------- | ------- |
| Vue 3      | Core framework       | 3.4+    |
| TypeScript | Type safety          | 5.0+    |
| Vite       | Build tool           | 5.0+    |
| Pinia      | State management     | 2.1+    |
| Vue Router | Routing              | 4.2+    |
| Nuxt 3     | Full-stack framework | 3.10+   |
| Vitest     | Testing              | 1.0+    |

---

## Composition API with Script Setup

### Basic Component Structure

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Props with TypeScript
interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});

// Emits with TypeScript
const emit = defineEmits<{
  update: [value: number];
  submit: [];
}>();

// Reactive state
const localCount = ref(props.count);
const items = ref<string[]>([]);

// Computed
const doubleCount = computed(() => localCount.value * 2);

// Methods
function increment() {
  localCount.value++;
  emit("update", localCount.value);
}

// Lifecycle
onMounted(() => {
  console.log("Component mounted");
});
</script>

<template>
  <div class="component">
    <h1>{{ title }}</h1>
    <p>Count: {{ localCount }} (Double: {{ doubleCount }})</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
.component {
  padding: 1rem;
}
</style>
```

### Reactivity Patterns

```typescript
import { ref, reactive, computed, watch, watchEffect } from "vue";

// Primitives: use ref()
const count = ref(0);
const name = ref("");
count.value++; // Access via .value

// Objects/Arrays: use reactive()
const state = reactive({
  items: [] as Item[],
  loading: false,
  error: null as Error | null,
});
state.items.push(item); // Direct access, no .value

// Computed values
const total = computed(() => state.items.reduce((sum, i) => sum + i.price, 0));

// Watch specific values
watch(count, (newVal, oldVal) => {
  console.log(`Count changed: ${oldVal} -> ${newVal}`);
});

// Watch with options
watch(
  () => state.items,
  (newItems) => saveToStorage(newItems),
  { deep: true, immediate: true },
);

// Automatic dependency tracking
watchEffect(() => {
  console.log(`Count is now: ${count.value}`);
});
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/vue-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| Composables (Reusable Logic) | [`references/composables-reusable-logic.md`](references/composables-reusable-logic.md) | Naming & Structure; Creating Composables; Composable Best Practices |
| Pinia State Management | [`references/pinia-state-management.md`](references/pinia-state-management.md) | Store Definition (Composition Style); Using Stores in Components; Store with Persistence |
| Component Patterns | [`references/component-patterns.md`](references/component-patterns.md) | Provider/Inject Pattern; Smart/Dumb Components |
| Nuxt 3 (Full-Stack) | [`references/nuxt-3-full-stack.md`](references/nuxt-3-full-stack.md) | Project Structure; API Routes; Data Fetching |
| Testing with Vitest | [`references/testing-with-vitest.md`](references/testing-with-vitest.md) | Setup; Component Testing; Composable Testing |
| Anti-Patterns to Avoid | [`references/anti-patterns-to-avoid.md`](references/anti-patterns-to-avoid.md) | 13 lines |

## Related Resources

- [Vue.js Official Docs](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Nuxt 3 Documentation](https://nuxt.com/)
- [VueUse Composables](https://vueuse.org/)
- [Vue Test Utils](https://test-utils.vuejs.org/)

---

## When to Use This Skill

- Building new Vue.js 3 applications
- Migrating from Vue 2 Options API to Composition API
- Implementing Pinia state management
- Creating reusable composables
- Full-stack development with Nuxt 3
- Testing Vue components with Vitest
