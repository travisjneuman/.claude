# agent-django-fastapi-expert: When to Use Which Framework

Part of the `agent-django-fastapi-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## When to Use Which Framework

| Factor            | Django                           | FastAPI                              |
| ----------------- | -------------------------------- | ------------------------------------ |
| Admin interface   | Built-in                         | None (build your own)                |
| ORM               | Built-in (Django ORM)            | SQLAlchemy / Tortoise / raw SQL      |
| Async support     | Partial (ASGI views, ORM sync)   | Native async everywhere              |
| API-first         | DRF addon                        | Built-in with OpenAPI                |
| Auth              | Built-in (sessions, permissions) | Manual (JWT, OAuth2 utilities)       |
| Template rendering| Built-in (Jinja2 / DTL)         | Optional (Jinja2)                    |
| Best for          | Full-stack apps, admin-heavy     | High-perf APIs, microservices, async |
| Learning curve    | Higher (batteries-included)      | Lower (minimal, explicit)            |
