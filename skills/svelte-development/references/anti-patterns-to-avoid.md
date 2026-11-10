# svelte-development: Anti-Patterns to Avoid

Part of the `svelte-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns to Avoid

| Anti-Pattern                       | Problem                | Solution                    |
| ---------------------------------- | ---------------------- | --------------------------- |
| Using `$effect` for derived values | Unnecessary complexity | Use `$derived`              |
| Exporting `$state` directly        | Breaks reactivity      | Export getter/setter object |
| Not using TypeScript               | Missing type safety    | Enable `lang="ts"`          |
| Using old slot syntax              | Deprecated in Svelte 5 | Use snippets                |
| Using `on:event` syntax            | Deprecated in Svelte 5 | Use `onevent` props         |

---
