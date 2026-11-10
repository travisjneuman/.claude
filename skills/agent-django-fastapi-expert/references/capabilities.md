# agent-django-fastapi-expert: Capabilities

Part of the `agent-django-fastapi-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Capabilities

### Django Models & ORM

- Model definition with field types, constraints, and indexes
- `Meta` class configuration (ordering, indexes, constraints, unique_together)
- Custom model managers and querysets
- QuerySet API (`filter`, `exclude`, `annotate`, `aggregate`, `select_related`, `prefetch_related`)
- F expressions and Q objects for complex queries
- Database functions and expressions
- Model signals (`pre_save`, `post_save`, `pre_delete`, `post_delete`)
- Abstract base models and model inheritance
- Custom model fields
- Multi-database routing
- Raw SQL when ORM is insufficient
- Database transactions and atomic operations

### Django REST Framework

- ViewSets (`ModelViewSet`, `ReadOnlyModelViewSet`, custom viewsets)
- Serializers (`ModelSerializer`, nested serializers, custom validation)
- Permissions (`IsAuthenticated`, `IsAdminUser`, custom permissions)
- Throttling (rate limiting per user, per anonymous, per scope)
- Filtering (`django-filter`, `SearchFilter`, `OrderingFilter`)
- Pagination (`PageNumberPagination`, `CursorPagination`, `LimitOffsetPagination`)
- Router configuration and URL patterns
- Custom actions (`@action` decorator)
- Content negotiation and renderers
- Versioning strategies
- Authentication backends (Token, JWT, Session, OAuth2)
- Exception handling and custom exceptions
- Schema generation (OpenAPI, drf-spectacular)

### Django Admin

- `ModelAdmin` registration and configuration
- `list_display`, `list_filter`, `search_fields`, `ordering`
- Custom admin actions
- Inline models (`TabularInline`, `StackedInline`)
- Custom admin views and templates
- Admin site customization (title, header, URL)
- Read-only fields and fieldsets
- Custom form widgets
- Admin permissions and groups
- Data export from admin

### FastAPI Routes

- Path operations (`@router.get`, `@router.post`, `@router.put`, etc.)
- Path parameters with type annotations
- Query parameters with defaults and validation
- Request body parsing with Pydantic models
- Response models and status codes
- Dependency injection (`Depends()`)
- Background tasks (`BackgroundTasks`)
- File upload handling (`UploadFile`)
- WebSocket endpoints
- Middleware (CORS, timing, authentication)
- Exception handlers
- Lifespan events (startup/shutdown)
- Sub-applications and API router mounting
- OpenAPI documentation customization

### Pydantic v2

- `BaseModel` with typed fields
- `Field()` for validation constraints (min, max, regex, etc.)
- `@field_validator` for custom field validation
- `@model_validator` for cross-field validation
- `model_config` (replaces `class Config` in v2)
- `from_attributes = True` for ORM integration
- Nested models and recursive types
- Generic models with `TypeVar`
- Custom serialization with `@field_serializer`
- Discriminated unions for polymorphic types
- `model_dump()` and `model_dump_json()`
- `TypeAdapter` for non-model validation
- Settings management with `pydantic-settings`

### Authentication

- Django built-in auth (User model, sessions, permissions)
- Django custom user model (`AbstractUser`, `AbstractBaseUser`)
- Django groups and permissions system
- JWT authentication (djangorestframework-simplejwt, python-jose)
- OAuth2 with FastAPI security utilities
- Session management and cookie security
- Token rotation and refresh patterns
- Social auth integration (django-allauth)
- API key authentication
- Multi-factor authentication patterns

### Database Operations

- N+1 query prevention (`select_related`, `prefetch_related`, `Prefetch`)
- QuerySet evaluation and caching
- Database indexes (B-tree, GIN, partial, composite)
- Migrations (creation, data migrations, squashing, zero-downtime)
- Connection pooling (`CONN_MAX_AGE`, pgbouncer)
- SQLAlchemy async sessions and engine configuration
- Alembic migrations for FastAPI projects
- Transaction management (`atomic`, `on_commit`)
- Database-level constraints (unique, check, exclusion)
- Raw SQL and cursor operations
- `EXPLAIN ANALYZE` for query optimization

### Async Patterns

- FastAPI native async/await for all I/O
- SQLAlchemy `AsyncSession` and `create_async_engine`
- `asyncio.gather` for concurrent operations
- `asyncio.TaskGroup` for structured concurrency (Python 3.11+)
- Django async views (`async def` view functions)
- Django async ORM operations (Django 4.1+)
- ASGI server configuration (uvicorn, daphne, hypercorn)
- Async middleware
- Background task execution
- WebSocket handling with async patterns

### Testing

- `pytest-django` for Django testing
- `pytest.mark.django_db` for database access
- `APIClient` for DRF endpoint testing
- `factory_boy` for test data generation
- `httpx.AsyncClient` for FastAPI async testing
- `ASGITransport` for FastAPI test setup
- `pytest-asyncio` / `anyio` for async test support
- Fixture-based dependency override
- Database fixtures and conftest patterns
- Mock and patch strategies
- Integration test patterns
- Coverage reporting

### Deployment

- Gunicorn for Django WSGI serving
- Uvicorn for FastAPI ASGI serving
- Gunicorn + Uvicorn workers for production FastAPI
- Docker multi-stage builds
- `collectstatic` and static file serving
- Environment variable management
- Health check endpoints
- Logging configuration (structlog, python-json-logger)
- Sentry integration for error tracking
- Prometheus metrics exposition

### Celery & Background Tasks

- Celery task definition (`@shared_task`, `@app.task`)
- Celery Beat for periodic/scheduled tasks
- Result backends (Redis, database, RPC)
- Task chains, groups, and chords
- Task retry with exponential backoff
- Task priority and routing
- Monitoring with Flower
- FastAPI `BackgroundTasks` for simple async work
- Django `post_commit` hooks for after-transaction tasks
- Task idempotency patterns
