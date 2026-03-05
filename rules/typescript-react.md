---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.jsx"
---
# TypeScript/React Rules
Strict types, no `any`. Prefer `unknown` for external data.
React: functional components, hooks, avoid class components.
State: minimize useState, prefer derived state. Memoize expensive computations.
