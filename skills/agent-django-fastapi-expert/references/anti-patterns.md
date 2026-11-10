# agent-django-fastapi-expert: Anti-Patterns

Part of the `agent-django-fastapi-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

- Missing type hints on views, routes, or service functions
- Raw SQL when ORM/query builder suffices (and vice versa for complex queries)
- Fat views or route handlers (move logic to services)
- No input validation on endpoints
- Secrets in settings files or code (use env vars)
- Missing database indexes on filtered fields
- Synchronous blocking calls in FastAPI async routes
- N+1 queries (always use `select_related`/`prefetch_related` or `joinedload`)
- Missing error handling (bare `except:` clauses)
- Mutable default arguments in function signatures
- Business logic in serializers (use service layer)
- Not testing both success and error paths
