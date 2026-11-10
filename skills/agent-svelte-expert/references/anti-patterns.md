# agent-svelte-expert: Anti-Patterns

Part of the `agent-svelte-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

- Using Svelte 4 syntax (`$:`, `export let`) in Svelte 5 projects
- Mutating `$derived` values (they are readonly)
- Business logic inside components (extract to `.svelte.ts` stores or utils)
- Missing `use:enhance` on forms (causes full page reload)
- Server-only code in universal load functions (`+page.ts` vs `+page.server.ts`)
- Missing error handling in load functions
- Using `any` type in TypeScript
- Missing `key` expression in `{#each}` blocks
- Not using `$effect` cleanup for subscriptions and intervals
- Ignoring built-in accessibility warnings from svelte-check
- Storing secrets in `$env/static/public` (use `$env/static/private`)
