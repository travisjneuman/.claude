---
paths:
  - "**/*.go"
  - "**/go.mod"
---

# Go Rules
Error handling: always check returned errors, never use `_` to discard. Use `fmt.Errorf` with `%w` for wrapping.
Concurrency: prefer channels over shared memory. Use `context.Context` for cancellation. Never start goroutines without cleanup.
Naming: short receiver names (1-2 chars), exported names are PascalCase, unexported are camelCase.
Interfaces: accept interfaces, return structs. Keep interfaces small (1-3 methods).
Tests (only when the user asks for them): table-driven with `t.Run`. Use `testify` only if already in project. Prefer stdlib `testing`.
