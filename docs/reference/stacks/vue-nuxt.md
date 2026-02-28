# Vue 3 + Nuxt 3 Stack Guide

**When to use:** Any web application built with Vue 3 and Nuxt 3.

---

## Project Commands

```bash
# Development
npm run dev                    # Start dev server (Nitro)
npx nuxi generate              # Static site generation
npx nuxi build                 # Production build

# Code quality
npm run lint                   # Lint code
npm run type-check             # TypeScript validation (vue-tsc)

# Testing
npm run test                   # Run Vitest unit tests
npm run test:e2e               # Run Playwright E2E tests

# Utilities
npx nuxi add page users        # Scaffold a new page
npx nuxi add composable useAuth # Scaffold a composable
npx nuxi add api users.get     # Scaffold a server route
npx nuxi cleanup               # Clean build artifacts
npx nuxi prepare               # Generate .nuxt types
```

---

## Code Standards

### Vue 3 Component (Script Setup)

```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  variant: "primary",
});

const emit = defineEmits<{
  increment: [value: number];
  reset: [];
}>();

const doubled = computed(() => props.count * 2);

function handleIncrement() {
  emit("increment", props.count + 1);
}
</script>

<template>
  <div :class="['card', `card--${variant}`]">
    <h2>{{ title }}</h2>
    <p>Count: {{ count }} (doubled: {{ doubled }})</p>
    <button @click="handleIncrement">Increment</button>
    <button @click="$emit('reset')">Reset</button>
  </div>
</template>

<style scoped>
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.card--primary {
  background-color: var(--color-primary-bg);
  color: var(--color-primary-text);
}

.card--secondary {
  background-color: var(--color-secondary-bg);
  color: var(--color-secondary-text);
}
</style>
```

### TypeScript Rules

| Rule               | Enforcement                                |
| ------------------ | ------------------------------------------ |
| No `any`           | Use `unknown` for external data            |
| Props typing       | `defineProps<Props>()` with interface       |
| Emits typing       | `defineEmits<{...}>()` with named events   |
| Composable returns | Explicit return types on composables       |
| API types          | Typed `$fetch` and `useFetch` responses    |

### Composables (Custom Hooks)

```typescript
// composables/useAuth.ts
export function useAuth() {
  const user = useState<User | null>("auth-user", () => null);
  const token = useCookie("auth-token");

  const isAuthenticated = computed(() => !!user.value);

  async function login(email: string, password: string): Promise<void> {
    const response = await $fetch<{ user: User; token: string }>("/api/auth/login", {
      method: "POST",
      body: { email, password },
    });

    user.value = response.user;
    token.value = response.token;
  }

  async function logout(): Promise<void> {
    await $fetch("/api/auth/logout", { method: "POST" });
    user.value = null;
    token.value = null;
    await navigateTo("/login");
  }

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    logout,
  };
}
```

### Nuxt Server Routes

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;

  const users = await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  return { users, page, limit };
});

// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing user ID" });
  }

  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "User not found" });
  }

  return user;
});

// server/api/users/index.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; name: string }>(event);

  if (!body.email || !body.name) {
    throw createError({ statusCode: 400, statusMessage: "Missing fields" });
  }

  const user = await db.user.create({ data: body });
  setResponseStatus(event, 201);
  return user;
});
```

### Nuxt Middleware

```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});

// Usage in page:
// <script setup>
// definePageMeta({ middleware: 'auth' })
// </script>
```

### State Management (Pinia)

```typescript
// stores/cart.ts
import { defineStore } from "pinia";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  function addItem(product: Omit<CartItem, "quantity">) {
    const existing = items.value.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.value.push({ ...product, quantity: 1 });
    }
  }

  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  function clearCart() {
    items.value = [];
  }

  return { items, totalItems, totalPrice, addItem, removeItem, clearCart };
});
```

### Data Fetching

```vue
<script setup lang="ts">
// useFetch - SSR-friendly, auto-cached
const { data: users, pending, error, refresh } = await useFetch<User[]>("/api/users");

// useAsyncData - more control
const { data: user } = await useAsyncData(`user-${id}`, () =>
  $fetch<User>(`/api/users/${id}`),
);

// useLazyFetch - non-blocking (renders immediately, loads in background)
const { data: notifications, pending: loadingNotifications } =
  await useLazyFetch<Notification[]>("/api/notifications");
</script>

<template>
  <div>
    <LoadingSpinner v-if="pending" />
    <ErrorMessage v-else-if="error" :error="error" />
    <UserList v-else :users="users!" />
  </div>
</template>
```

---

## File Organization

```
project/
├── app.vue                  # App entry (or use layouts)
├── nuxt.config.ts           # Nuxt configuration
├── pages/                   # File-based routing
│   ├── index.vue            # / route
│   ├── about.vue            # /about route
│   ├── users/
│   │   ├── index.vue        # /users route
│   │   └── [id].vue         # /users/:id route
│   └── [...slug].vue        # Catch-all route
├── components/              # Auto-imported components
│   ├── ui/
│   │   ├── Button.vue
│   │   └── Input.vue
│   └── features/
│       └── UserCard.vue
├── composables/             # Auto-imported composables
│   ├── useAuth.ts
│   └── useTheme.ts
├── stores/                  # Pinia stores
│   └── cart.ts
├── server/                  # Nitro server
│   ├── api/                 # API routes
│   │   └── users/
│   │       ├── index.get.ts
│   │       ├── index.post.ts
│   │       └── [id].get.ts
│   ├── middleware/           # Server middleware
│   │   └── log.ts
│   └── utils/               # Server utilities
│       └── db.ts
├── layouts/                 # Page layouts
│   ├── default.vue
│   └── auth.vue
├── middleware/               # Route middleware
│   └── auth.ts
├── plugins/                 # Nuxt plugins
│   └── api.ts
├── types/                   # Shared types
│   └── user.ts
├── assets/                  # Processed assets (CSS, fonts)
│   └── css/
│       └── main.css
└── public/                  # Static assets (served as-is)
    └── favicon.ico
```

### File Naming

| Type         | Convention | Example          |
| ------------ | ---------- | ---------------- |
| Pages        | kebab-case | `user-profile.vue` |
| Components   | PascalCase | `UserCard.vue`   |
| Composables  | use prefix | `useAuth.ts`     |
| Stores       | camelCase  | `cart.ts`        |
| Server routes| RESTful    | `index.get.ts`   |
| Middleware   | kebab-case | `auth.ts`        |

---

## Testing

### Component Tests (Vitest + Vue Test Utils)

```typescript
import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import UserCard from "~/components/features/UserCard.vue";

describe("UserCard", () => {
  it("renders user name", async () => {
    const wrapper = await mountSuspended(UserCard, {
      props: { name: "Alice", email: "alice@example.com" },
    });

    expect(wrapper.text()).toContain("Alice");
    expect(wrapper.text()).toContain("alice@example.com");
  });

  it("emits click event", async () => {
    const wrapper = await mountSuspended(UserCard, {
      props: { name: "Alice", email: "alice@example.com" },
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted("click")).toHaveLength(1);
  });
});
```

### Composable Tests

```typescript
import { describe, it, expect } from "vitest";
import { useAuth } from "~/composables/useAuth";

describe("useAuth", () => {
  it("starts unauthenticated", () => {
    const { isAuthenticated } = useAuth();
    expect(isAuthenticated.value).toBe(false);
  });
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from "@playwright/test";

test("login flow", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page).toHaveURL("/dashboard");
  await expect(page.getByText("Welcome back")).toBeVisible();
});
```

---

## Deployment

### Vercel

```json
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: "vercel",
  },
});
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.output .output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

---

## Related Skills

| Skill                | When to Use            |
| -------------------- | ---------------------- |
| `test-specialist`    | Testing guidance       |
| `tech-debt-analyzer` | Code quality           |
| `security`           | Auth, validation       |
| `api-designer`       | API design             |

### Invoke with:

```
Skill(test-specialist)
Skill(api-designer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/checklists/ui-visual-changes.md` - Visual changes
- `~/.claude/docs/reference/checklists/api-development.md` - API checklist

---

## Anti-Patterns

- [ ] Using `any` type in TypeScript
- [ ] Options API instead of Composition API (in new code)
- [ ] Mutating props directly
- [ ] Missing error handling on `useFetch`/`useAsyncData`
- [ ] Business logic in components (extract to composables)
- [ ] Not using auto-imports (manually importing `ref`, `computed`, etc.)
- [ ] `v-if` with `v-for` on same element
- [ ] Missing `key` attribute on `v-for` lists

---

_Vue 3 + Nuxt 3: reactive, auto-imported, and full-stack from a single codebase._
