# agent-svelte-expert: SvelteKit Project Structure

Part of the `agent-svelte-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## SvelteKit Project Structure

```
src/
├── routes/                  # File-based routing
│   ├── +layout.svelte       # Root layout
│   ├── +layout.server.ts    # Root layout data
│   ├── +page.svelte         # Home page
│   ├── +error.svelte        # Error page
│   ├── about/
│   │   └── +page.svelte
│   ├── users/
│   │   ├── +page.svelte
│   │   ├── +page.server.ts
│   │   └── [id]/
│   │       ├── +page.svelte
│   │       └── +page.server.ts
│   ├── api/
│   │   └── users/
│   │       └── +server.ts
│   └── (auth)/
│       ├── +layout.svelte
│       ├── login/
│       │   ├── +page.svelte
│       │   └── +page.server.ts
│       └── register/
│           ├── +page.svelte
│           └── +page.server.ts
├── lib/                     # Library code ($lib)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.svelte
│   │   │   └── Input.svelte
│   │   └── features/
│   │       └── UserCard.svelte
│   ├── stores/
│   │   └── cart.svelte.ts
│   ├── server/              # Server-only ($lib/server)
│   │   ├── db.ts
│   │   └── auth.ts
│   ├── types/
│   │   └── user.ts
│   └── utils/
│       └── formatting.ts
├── app.html                 # HTML template
├── app.d.ts                 # Type declarations
└── hooks.server.ts          # Server hooks
```
