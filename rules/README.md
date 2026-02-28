# Rules — Always-Loaded Context

Compact rules that apply to every session. Loaded automatically into the system prompt.

---

## Files in `rules/`

Only 3 files remain here (always loaded):

| File | Purpose |
| ---- | ------- |
| `README.md` | This index |
| `checklists/verification-template.md` | Task completion verification (applies to every task) |
| `workflows/context-management.md` | Context window, multi-window, state persistence |

---

## Reference Files (On-Demand)

Domain-specific guides moved to `docs/reference/` to reduce system prompt size. These are loaded on-demand via the Auto-Routing table in `CLAUDE.md`.

```
docs/reference/
├── checklists/
│   ├── api-development.md
│   ├── automation-scripts.md
│   ├── database-design.md
│   ├── mobile-app-deployment.md
│   ├── monitoring-alerting-design.md
│   ├── performance-optimization.md
│   ├── security-hardening.md
│   ├── static-sites.md
│   └── ui-visual-changes.md
├── stacks/
│   ├── django-fastapi.md
│   ├── flutter-dart.md
│   ├── fullstack-nextjs-nestjs.md
│   ├── go.md
│   ├── python.md
│   ├── react-native-expo.md
│   ├── react-typescript.md
│   ├── rust.md
│   ├── svelte-sveltekit.md
│   └── vue-nuxt.md
├── workflows/
│   ├── action-policy.md
│   ├── agent-teams.md
│   ├── deployment-cicd.md
│   ├── post-change-documentation.md
│   └── research-methodology.md
└── tooling/
    ├── external-repos.md
    ├── git-hooks-setup.md
    ├── mcp-servers.md
    └── troubleshooting.md
```

---

## Hierarchy

1. `CLAUDE.md` — Always applies (constitution)
2. `rules/*` — Always loaded (compact, universal)
3. `docs/reference/*` — Loaded on-demand when prompt matches Auto-Routing table
4. Project `CLAUDE.md` — Project-specific overrides

---

## Related Documentation

- `~/.claude/CLAUDE.md` — Core rules + Auto-Routing table
- `~/.claude/skills/MASTER_INDEX.md` — Skills navigation
- `~/.claude/agents/README.md` — Agents directory

---

_Keep `rules/` minimal. Domain-specific content belongs in `docs/reference/`._
