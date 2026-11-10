# agent-svelte-expert: SvelteKit Checklist

Part of the `agent-svelte-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## SvelteKit Checklist

- [ ] Code is clean under `npm run check` (types + a11y + Svelte warnings) and `npm run lint` (confirm by review; run these only when the user asks)
- [ ] All components use Svelte 5 runes (no `$:` or `export let`)
- [ ] Props typed with interface and `$props()`
- [ ] No `any` types
- [ ] Forms use `use:enhance` for progressive enhancement
- [ ] Sensitive operations in `+page.server.ts` (not `+page.ts`)
- [ ] Load functions handle errors with `error()`
- [ ] Server hooks set security headers
- [ ] `.svelte.ts` used for shared reactive state
- [ ] Accessibility warnings resolved
