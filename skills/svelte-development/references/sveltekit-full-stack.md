# svelte-development: SvelteKit (Full-Stack)

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## SvelteKit (Full-Stack)

### Project Structure

```
sveltekit-app/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── +page.svelte     # /
│   │   ├── +page.server.ts  # Server load function
│   │   ├── +layout.svelte   # Root layout
│   │   ├── about/
│   │   │   └── +page.svelte # /about
│   │   ├── users/
│   │   │   ├── +page.svelte # /users
│   │   │   └── [id]/
│   │   │       ├── +page.svelte      # /users/:id
│   │   │       └── +page.server.ts
│   │   └── api/
│   │       └── users/
│   │           └── +server.ts  # /api/users
│   ├── lib/                 # $lib alias
│   │   ├── components/
│   │   └── stores/
│   └── app.html
├── static/
└── svelte.config.js
```

### Load Functions

```typescript
// routes/users/+page.server.ts
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await fetch('/api/users')

  if (!response.ok) {
    throw error(response.status, 'Failed to load users')
  }

  const users = await response.json()

  return { users }
}

// routes/users/+page.svelte
<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<h1>Users</h1>
{#each data.users as user}
  <p>{user.name}</p>
{/each}
```

### Form Actions

```typescript
// routes/login/+page.server.ts
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validation
    if (!email || !password) {
      return fail(400, { email, missing: true });
    }

    // Authentication
    const user = await authenticate(email, password);

    if (!user) {
      return fail(401, { email, incorrect: true });
    }

    // Set session cookie
    cookies.set("session", user.token, { path: "/" });

    throw redirect(303, "/dashboard");
  },
};
```

```svelte
<!-- routes/login/+page.svelte -->
<script lang="ts">
  import type { ActionData } from './$types'
  import { enhance } from '$app/forms'

  let { form }: { form: ActionData } = $props()
</script>

<form method="POST" use:enhance>
  <input name="email" value={form?.email ?? ''} />

  {#if form?.missing}
    <p class="error">All fields are required</p>
  {/if}

  {#if form?.incorrect}
    <p class="error">Invalid credentials</p>
  {/if}

  <input name="password" type="password" />
  <button>Login</button>
</form>
```

### API Routes

```typescript
// routes/api/users/+server.ts
import type { RequestHandler } from "./$types";
import { json, error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  const limit = Number(url.searchParams.get("limit")) || 10;

  const users = await prisma.user.findMany({ take: limit });

  return json(users);
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  if (!body.email || !body.name) {
    throw error(400, "Missing required fields");
  }

  const user = await prisma.user.create({ data: body });

  return json(user, { status: 201 });
};

// routes/api/users/[id]/+server.ts
export const GET: RequestHandler = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    throw error(404, "User not found");
  }

  return json(user);
};
```

### Middleware (Hooks)

```typescript
// src/hooks.server.ts
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Get session from cookie
  const session = event.cookies.get("session");

  if (session) {
    const user = await validateSession(session);
    event.locals.user = user;
  }

  // Protected routes
  if (event.url.pathname.startsWith("/dashboard") && !event.locals.user) {
    return new Response("Redirect", {
      status: 303,
      headers: { Location: "/login" },
    });
  }

  return resolve(event);
};
```

---
