# agent-django-fastapi-expert: Django/FastAPI Checklist

Part of the `agent-django-fastapi-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Django/FastAPI Checklist

- [ ] Code is `mypy --strict` and `ruff check` clean (confirm by review; run these only when the user asks)
- [ ] Tests (`pytest`) only when the user asks for them
- [ ] All functions have type hints
- [ ] All inputs validated (serializers or Pydantic)
- [ ] No N+1 queries (select_related/prefetch_related used)
- [ ] Database indexes on filtered/sorted columns
- [ ] Migrations backward-compatible
- [ ] Authentication required on non-public endpoints
- [ ] No secrets in code (use environment variables)
- [ ] Error responses follow consistent format
- [ ] Connection pooling configured
