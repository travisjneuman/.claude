# agent-django-fastapi-expert: Project Structure

Part of the `agent-django-fastapi-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Project Structure

### Django

```
project/
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── users/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── signals.py
│   │   ├── services.py
│   │   ├── permissions.py
│   │   └── tests/
│   │       ├── test_models.py
│   │       ├── test_views.py
│   │       └── factories.py
│   └── core/
│       ├── mixins.py
│       └── pagination.py
├── manage.py
├── pyproject.toml
└── requirements/
    ├── base.txt
    ├── dev.txt
    └── prod.txt
```

### FastAPI

```
project/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── dependencies.py
│   ├── models/
│   │   └── user.py
│   ├── schemas/
│   │   └── user.py
│   ├── routers/
│   │   └── users.py
│   └── services/
│       └── user_service.py
├── alembic/
│   ├── versions/
│   └── env.py
├── tests/
│   ├── conftest.py
│   ├── test_users.py
│   └── factories.py
├── alembic.ini
├── pyproject.toml
└── Dockerfile
```
