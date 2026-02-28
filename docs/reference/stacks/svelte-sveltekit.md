# Svelte 5 + SvelteKit Stack Guide

**When to use:** Any web application built with Svelte 5 and SvelteKit.

---

## Project Commands

```bash
# Development
npm run dev                    # Start dev server (Vite)
npm run dev -- --open          # Start and open browser

# Building
npm run build                  # Production build
npm run preview                # Preview production build locally

# Testing
npm run test                   # Run Vitest unit tests
npm run test:e2e               # Run Playwright E2E tests

# Code quality
npm run check                  # svelte-check (types + a11y + warnings)
npm run lint                   # ESLint
npm run format                 # Prettier

# Verify before committing
npm run check && npm run test && npm run lint
```

---

## Code Standards

### Svelte 5 Runes

```svelte
<!-- Counter.svelte -->
<script lang="ts">
  interface Props {
    initial?: number;
    max?: number;
    onchange?: (value: number) => void;
  }

  let { initial = 0, max = 100, onchange }: Props = $props();

  let count = $state(initial);
  let doubled = $derived(count * 2);
  let isAtMax = $derived(count >= max);

  $effect(() => {
    onchange?.(count);
  });

  function increment() {
    if (!isAtMax) {
      count++;
    }
  }

  function reset() {
    count = initial;
  }
</script>

<div class="counter">
  <p>Count: {count} (doubled: {doubled})</p>
  <button onclick={increment} disabled={isAtMax}>Increment</button>
  <button onclick={reset}>Reset</button>
</div>

<style>
  .counter {
    padding: 1rem;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.5rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

### Runes Reference

| Rune        | Purpose                      | Replaces (Svelte 4)           |
| ----------- | ---------------------------- | ----------------------------- |
| `$state`    | Reactive state               | `let x = ...` (top-level)     |
| `$derived`  | Computed value               | `$: x = ...`                  |
| `$effect`   | Side effects                 | `$: { ... }` (statements)     |
| `$props`    | Component props              | `export let prop`             |
| `$bindable` | Two-way bindable prop        | `export let prop` with `bind:`|
| `$inspect`  | Debug reactivity (dev only)  | N/A                           |

### TypeScript Rules

| Rule            | Enforcement                          |
| --------------- | ------------------------------------ |
| No `any`        | Use `unknown` for external data      |
| Props typing    | Interface with `$props()`            |
| Load functions  | Typed with generated types           |
| Store types     | Explicit generics on `$state`        |

### SvelteKit Routing

```
src/routes/
├── +layout.svelte           # Root layout
├── +layout.ts               # Root layout data
├── +page.svelte             # / route
├── +page.ts                 # / data loader
├── +error.svelte            # Error page
├── about/
│   └── +page.svelte         # /about route
├── users/
│   ├── +page.svelte         # /users route
│   ├── +page.server.ts      # /users server-side data
│   └── [id]/
│       ├── +page.svelte     # /users/:id route
│       └── +page.ts         # /users/:id data loader
├── api/
│   └── users/
│       └── +server.ts       # API endpoint: /api/users
└── (auth)/                  # Route group (no URL segment)
    ├── +layout.svelte
    ├── login/
    │   └── +page.svelte
    └── register/
        └── +page.svelte
```

### Load Functions

```typescript
// src/routes/users/+page.server.ts
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, url }) => {
  const page = Number(url.searchParams.get("page")) || 1;

  const response = await fetch(`/api/users?page=${page}`);
  if (!response.ok) {
    throw error(response.status, "Failed to load users");
  }

  const { users, total } = await response.json();

  return {
    users,
    total,
    page,
  };
};
```

```svelte
<!-- src/routes/users/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1>Users ({data.total})</h1>
<ul>
  {#each data.users as user (user.id)}
    <li>
      <a href="/users/{user.id}">{user.name}</a>
    </li>
  {/each}
</ul>
```

### Form Actions

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return fail(400, { email, error: "Email and password are required" });
    }

    const user = await authenticate(email, password);
    if (!user) {
      return fail(401, { email, error: "Invalid credentials" });
    }

    cookies.set("session", user.sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    throw redirect(303, "/dashboard");
  },
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData } from './$types';

  let { form }: { form: ActionData } = $props();
</script>

<form method="POST" use:enhance>
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  <label>
    Email
    <input name="email" type="email" value={form?.email ?? ''} required />
  </label>

  <label>
    Password
    <input name="password" type="password" required />
  </label>

  <button type="submit">Sign In</button>
</form>
```

### API Endpoints

```typescript
// src/routes/api/users/+server.ts
import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 20;

  const users = await db.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const total = await db.user.count();

  return json({ users, total, page });
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  if (!body.email || !body.name) {
    throw error(400, "Missing required fields");
  }

  const user = await db.user.create({ data: body });
  return json(user, { status: 201 });
};
```

### Hooks

```typescript
// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (session) {
    const user = await getUserFromSession(session);
    event.locals.user = user;
  }

  const response = await resolve(event);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
};
```

### State Management Patterns

```typescript
// Shared reactive state using Svelte 5 runes in .svelte.ts files
// src/lib/stores/cart.svelte.ts

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class CartStore {
  items = $state<CartItem[]>([]);

  totalItems = $derived(
    this.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  totalPrice = $derived(
    this.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  add(product: Omit<CartItem, "quantity">) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  remove(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  clear() {
    this.items = [];
  }
}

export const cart = new CartStore();
```

---

## File Organization

```
src/
├── routes/                  # SvelteKit file-based routing
│   ├── +layout.svelte
│   ├── +page.svelte
│   └── ...
├── lib/                     # Library code ($lib alias)
│   ├── components/          # Reusable components
│   │   ├── ui/
│   │   │   ├── Button.svelte
│   │   │   └── Input.svelte
│   │   └── features/
│   │       └── UserCard.svelte
│   ├── stores/              # Reactive stores (.svelte.ts)
│   │   └── cart.svelte.ts
│   ├── server/              # Server-only utilities ($lib/server)
│   │   ├── db.ts
│   │   └── auth.ts
│   ├── types/               # Shared TypeScript types
│   │   └── user.ts
│   └── utils/               # Utility functions
│       └── formatting.ts
├── app.html                 # HTML template
├── app.d.ts                 # App-level type declarations
└── hooks.server.ts          # Server hooks
static/                      # Static assets
tests/                       # Test files
├── unit/
└── e2e/
svelte.config.js
vite.config.ts
```

---

## Testing

### Component Tests (Vitest)

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { userEvent } from "@testing-library/user-event";
import Counter from "$lib/components/Counter.svelte";

describe("Counter", () => {
  it("renders initial count", () => {
    render(Counter, { props: { initial: 5 } });
    expect(screen.getByText("Count: 5")).toBeTruthy();
  });

  it("increments on button click", async () => {
    const user = userEvent.setup();
    render(Counter, { props: { initial: 0 } });

    await user.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeTruthy();
  });

  it("disables button at max", () => {
    render(Counter, { props: { initial: 10, max: 10 } });
    const button = screen.getByText("Increment");
    expect(button).toBeDisabled();
  });
});
```

### E2E Tests (Playwright)

```typescript
import { test, expect } from "@playwright/test";

test("navigation works", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Users" }).click();
  await expect(page).toHaveURL("/users");
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
});

test("form submission with validation", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Email and password are required")).toBeVisible();
});
```

---

## Deployment

### Adapters

```javascript
// svelte.config.js
import adapter from "@sveltejs/adapter-vercel"; // or adapter-node, adapter-static

export default {
  kit: {
    adapter: adapter(),
  },
};
```

| Adapter          | Use Case                    |
| ---------------- | --------------------------- |
| `adapter-auto`   | Auto-detect platform        |
| `adapter-vercel` | Vercel (edge/serverless)    |
| `adapter-node`   | Node.js server              |
| `adapter-static` | Static site (no SSR)        |
| `adapter-cloudflare` | Cloudflare Workers      |

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

- [ ] Using `any` type
- [ ] Svelte 4 syntax (`$:`, `export let`) in Svelte 5 projects
- [ ] Mutating `$derived` values (they are readonly)
- [ ] Business logic in components (extract to `.svelte.ts` stores or utils)
- [ ] Missing error handling in load functions
- [ ] Not using `use:enhance` on forms (causes full page reload)
- [ ] Server-only code in universal load functions (use `+page.server.ts`)
- [ ] Missing type annotations on load function returns

---

_Svelte 5 + SvelteKit: compile-time reactivity, full-stack routing, zero boilerplate._
