# svelte-development: Migration from Svelte 4

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Migration from Svelte 4

| Svelte 4                   | Svelte 5                            |
| -------------------------- | ----------------------------------- |
| `let count = 0` (reactive) | `let count = $state(0)`             |
| `$: doubled = count * 2`   | `let doubled = $derived(count * 2)` |
| `$: console.log(count)`    | `$effect(() => console.log(count))` |
| `export let value`         | `let { value } = $props()`          |
| `on:click={handler}`       | `onclick={handler}`                 |
| `<slot />`                 | `{@render children()}`              |
| `createEventDispatcher()`  | Callback props                      |

### Migration Script

```bash
npx sv migrate svelte-5
```

---
