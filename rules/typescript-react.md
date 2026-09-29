---
paths:
  - "**/*.{ts,tsx,js,jsx,mjs,cjs}"
  - "**/tsconfig*.json"
---

# TypeScript/React Rules
Strict types, no `any`. Prefer `unknown` for external data.
React: functional components, hooks, avoid class components.
State: minimize useState, prefer derived state. Memoize expensive computations.
