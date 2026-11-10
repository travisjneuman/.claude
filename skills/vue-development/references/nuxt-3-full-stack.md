# vue-development: Nuxt 3 (Full-Stack)

Part of the `vue-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Nuxt 3 (Full-Stack)

### Project Structure

```
nuxt-app/
├── pages/              # File-based routing
│   ├── index.vue       # /
│   ├── about.vue       # /about
│   └── users/
│       ├── index.vue   # /users
│       └── [id].vue    # /users/:id
├── components/         # Auto-imported components
├── composables/        # Auto-imported composables
├── server/             # API routes (Nitro)
│   ├── api/
│   │   └── users.ts    # /api/users
│   └── middleware/
├── layouts/            # Page layouts
├── middleware/         # Route middleware
└── nuxt.config.ts
```

### API Routes

```typescript
// server/api/users.ts
export default defineEventHandler(async (event) => {
  const method = getMethod(event);

  if (method === "GET") {
    return await prisma.user.findMany();
  }

  if (method === "POST") {
    const body = await readBody(event);
    return await prisma.user.create({ data: body });
  }
});

// server/api/users/[id].ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await prisma.user.findUnique({ where: { id: Number(id) } });
});
```

### Data Fetching

```vue
<script setup lang="ts">
// Server-side fetch (SSR)
const { data: users } = await useFetch("/api/users");

// Lazy fetch (client-side)
const { data: posts, pending } = await useLazyFetch("/api/posts");

// With parameters
const route = useRoute();
const { data: user } = await useFetch(`/api/users/${route.params.id}`);
</script>
```

---
