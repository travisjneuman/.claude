# svelte-development: Shared State with .svelte.ts Files

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Shared State with .svelte.ts Files

### Creating Shared State

```typescript
// lib/stores/counter.svelte.ts
export function createCounter(initial = 0) {
  let count = $state(initial);

  return {
    get count() {
      return count;
    },
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    reset() {
      count = initial;
    },
  };
}

// Singleton instance
export const counter = createCounter();
```

### Class-Based State

```typescript
// lib/stores/user.svelte.ts
export class UserStore {
  user = $state<User | null>(null);
  loading = $state(false);
  error = $state<string | null>(null);

  isLoggedIn = $derived(!!this.user);

  async login(email: string, password: string) {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Login failed");

      this.user = await response.json();
    } catch (e) {
      this.error = e instanceof Error ? e.message : "Unknown error";
      throw e;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.user = null;
  }
}

export const userStore = new UserStore();
```

### Using Shared State

```svelte
<script lang="ts">
  import { counter } from '$lib/stores/counter.svelte'
  import { userStore } from '$lib/stores/user.svelte'
</script>

<p>Count: {counter.count}</p>
<button onclick={counter.increment}>+</button>

{#if userStore.isLoggedIn}
  <p>Welcome, {userStore.user?.name}</p>
  <button onclick={() => userStore.logout()}>Logout</button>
{:else}
  <button onclick={() => userStore.login('test@test.com', 'pass')}>
    Login
  </button>
{/if}
```

---
