# agent-svelte-expert: Key Patterns

Part of the `agent-svelte-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Key Patterns

### Rune-Based Component

```svelte
<script lang="ts">
  interface Props {
    title: string;
    items: Item[];
    onselect?: (item: Item) => void;
  }

  let { title, items, onselect }: Props = $props();

  let search = $state("");

  let filtered = $derived(
    items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  let count = $derived(filtered.length);
</script>

<div class="list">
  <h2>{title} ({count})</h2>

  <input bind:value={search} placeholder="Search..." />

  {#each filtered as item (item.id)}
    <button class="item" onclick={() => onselect?.(item)}>
      {item.name}
    </button>
  {:else}
    <p>No items found.</p>
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item {
    padding: 0.75rem;
    border: 1px solid var(--border-color, #e2e8f0);
    border-radius: 0.375rem;
    background: transparent;
    cursor: pointer;
    text-align: left;
  }

  .item:hover {
    background: var(--hover-bg, #f1f5f9);
  }
</style>
```

### Shared State Store (.svelte.ts)

```typescript
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
    this.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = $derived(
    this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
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

### Form Action with Validation

```typescript
// src/routes/login/+page.server.ts
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      return fail(400, {
        email,
        errors: result.error.flatten().fieldErrors,
      });
    }

    const user = await authenticate(result.data.email, result.data.password);
    if (!user) {
      return fail(401, {
        email,
        errors: { password: ["Invalid credentials"] },
      });
    }

    cookies.set("session", user.sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect(303, "/dashboard");
  },
};
```

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();

  let submitting = $state(false);
</script>

<form
  method="POST"
  use:enhance={() => {
    submitting = true;
    return async ({ update }) => {
      submitting = false;
      await update();
    };
  }}
>
  <label>
    Email
    <input
      name="email"
      type="email"
      value={form?.email ?? ""}
      required
      aria-invalid={form?.errors?.email ? "true" : undefined}
    />
    {#if form?.errors?.email}
      <span class="error">{form.errors.email[0]}</span>
    {/if}
  </label>

  <label>
    Password
    <input name="password" type="password" required />
    {#if form?.errors?.password}
      <span class="error">{form.errors.password[0]}</span>
    {/if}
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? "Signing in..." : "Sign In"}
  </button>
</form>
```

### Server Hook for Authentication

```typescript
// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");

  if (session) {
    const user = await getUserFromSession(session);
    event.locals.user = user;
  }

  return resolve(event);
};

const security: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin",
  );

  return response;
};

export const handle = sequence(auth, security);
```

### Load Function with Error Handling

```typescript
// src/routes/users/[id]/+page.server.ts
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  if (!locals.user) {
    error(401, "Authentication required");
  }

  const user = await db.user.findUnique({
    where: { id: params.id },
    include: { posts: { orderBy: { createdAt: "desc" }, take: 10 } },
  });

  if (!user) {
    error(404, `User ${params.id} not found`);
  }

  return { user };
};
```

### Component Test

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { userEvent } from "@testing-library/user-event";
import ItemList from "$lib/components/ItemList.svelte";

describe("ItemList", () => {
  const items = [
    { id: "1", name: "Alpha" },
    { id: "2", name: "Beta" },
    { id: "3", name: "Gamma" },
  ];

  it("renders all items", () => {
    render(ItemList, { props: { title: "Test", items } });

    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(screen.getByText("Beta")).toBeTruthy();
    expect(screen.getByText("Gamma")).toBeTruthy();
  });

  it("displays filtered count", () => {
    render(ItemList, { props: { title: "Items", items } });
    expect(screen.getByText("Items (3)")).toBeTruthy();
  });

  it("filters items by search input", async () => {
    const user = userEvent.setup();
    render(ItemList, { props: { title: "Test", items } });

    await user.type(screen.getByPlaceholderText("Search..."), "alpha");

    expect(screen.getByText("Alpha")).toBeTruthy();
    expect(screen.queryByText("Beta")).toBeNull();
    expect(screen.queryByText("Gamma")).toBeNull();
  });

  it("shows empty message when no items match", async () => {
    const user = userEvent.setup();
    render(ItemList, { props: { title: "Test", items } });

    await user.type(screen.getByPlaceholderText("Search..."), "zzz");

    expect(screen.getByText("No items found.")).toBeTruthy();
  });
});
```
