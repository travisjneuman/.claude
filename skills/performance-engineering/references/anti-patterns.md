# performance-engineering: Anti-Patterns

Part of the `performance-engineering` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|---|---|---|
| Optimizing without measuring | Wastes effort on non-bottlenecks | Profile first, then optimize measured hotspots |
| Loading all JS upfront | Blocks interactivity for unused code | Code split by route, lazy load heavy components |
| Images without `width`/`height` | Causes layout shift (CLS) | Always specify dimensions or use aspect-ratio |
| `Cache-Control: no-cache` on everything | Every request hits origin server | Use `stale-while-revalidate` for API, `immutable` for hashed assets |
| Loading web fonts synchronously | Blocks text rendering (FOIT) | Use `font-display: swap` or `optional` |
| Third-party scripts in `<head>` | Blocks page rendering | Load with `async` or `defer`, or after interaction |
| N+1 database queries | Latency multiplies with data size | Use eager loading (Prisma `include`), batch queries |

---
