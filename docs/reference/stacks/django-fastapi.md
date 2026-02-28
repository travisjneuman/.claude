# Django & FastAPI Stack Guide

**When to use:** Any Python web application using Django or FastAPI.

---

## When to Use Which

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

---

## Project Commands

### Django

```bash
# Development
python manage.py runserver           # Start dev server
python manage.py makemigrations      # Create migrations
python manage.py migrate             # Apply migrations
python manage.py createsuperuser     # Create admin user
python manage.py shell_plus          # Enhanced shell (django-extensions)
python manage.py collectstatic       # Collect static files

# Testing
pytest                               # Run all tests
pytest apps/users/                   # Run specific app tests
pytest --cov=apps --cov-report=html  # Coverage report

# Code quality
mypy apps/
ruff check .
black .
```

### FastAPI

```bash
# Development
uvicorn app.main:app --reload        # Start dev server
uvicorn app.main:app --host 0.0.0.0 --port 8000  # Production-like

# Database (Alembic)
alembic revision --autogenerate -m "add users table"
alembic upgrade head
alembic downgrade -1

# Testing
pytest
pytest -x --tb=short                 # Stop on first failure
pytest --cov=app --cov-report=term

# Code quality
mypy app/
ruff check .
black .
```

---

## Code Standards

### Django Models

```python
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(models.Model):
    """Application user with profile data."""

    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(_("full name"), max_length=150)
    is_active = models.BooleanField(_("active"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["-created_at"]),
        ]

    def __str__(self) -> str:
        return self.email
```

### Django Views (DRF)

```python
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    """CRUD operations for users."""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter queryset based on request context."""
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(is_active=True)
        return qs

    @action(detail=True, methods=["post"])
    def deactivate(self, request, pk=None):
        """Deactivate a user account."""
        user = self.get_object()
        user.is_active = False
        user.save(update_fields=["is_active"])
        return Response(status=status.HTTP_204_NO_CONTENT)
```

### Django Serializers

```python
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "name", "is_active", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_email(self, value: str) -> str:
        return value.lower().strip()
```

### FastAPI Routes

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/", response_model=list[UserResponse])
async def list_users(
    skip: int = 0,
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
) -> list[UserResponse]:
    """List all active users with pagination."""
    result = await db.execute(
        select(User).where(User.is_active == True).offset(skip).limit(limit)
    )
    return result.scalars().all()


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    """Get a single user by ID."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_id} not found",
        )
    return user


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: UserCreate,
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    """Create a new user."""
    user = User(**payload.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
```

### FastAPI Pydantic Models

```python
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=150)

    model_config = {"str_strip_whitespace": True}


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
```

### FastAPI Dependency Injection

```python
from fastapi import Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Database session dependency."""
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_current_user(
    token: str = Header(..., alias="Authorization"),
    db: AsyncSession = Depends(get_db),
) -> User:
    """Extract and validate the current user from JWT."""
    payload = decode_jwt(token.removeprefix("Bearer "))
    user = await db.get(User, payload["sub"])
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user
```

---

## File Organization

### Django

```
project/
├── config/               # Project configuration
│   ├── settings/
│   │   ├── base.py       # Shared settings
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py            # Root URL config
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
│   │   ├── tests/
│   │   │   ├── test_models.py
│   │   │   ├── test_views.py
│   │   │   └── factories.py
│   │   └── management/
│   │       └── commands/
│   │           └── seed_users.py
│   └── core/              # Shared utilities
│       ├── mixins.py
│       └── pagination.py
├── templates/
├── static/
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
│   ├── main.py            # FastAPI application factory
│   ├── config.py          # Settings (pydantic-settings)
│   ├── database.py        # DB engine and session
│   ├── dependencies.py    # Shared dependencies
│   ├── models/            # SQLAlchemy models
│   │   ├── __init__.py
│   │   └── user.py
│   ├── schemas/           # Pydantic schemas
│   │   ├── __init__.py
│   │   └── user.py
│   ├── routers/           # Route handlers
│   │   ├── __init__.py
│   │   └── users.py
│   └── services/          # Business logic
│       ├── __init__.py
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
└── requirements.txt
```

---

## Testing

### Django Tests

```python
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from apps.users.tests.factories import UserFactory


@pytest.mark.django_db
class TestUserAPI:
    def setup_method(self):
        self.client = APIClient()
        self.user = UserFactory()
        self.client.force_authenticate(user=self.user)

    def test_list_users(self):
        url = reverse("user-list")
        response = self.client.get(url)
        assert response.status_code == 200
        assert len(response.data["results"]) >= 1

    def test_create_user(self):
        url = reverse("user-list")
        payload = {"email": "new@example.com", "name": "New User"}
        response = self.client.post(url, payload, format="json")
        assert response.status_code == 201
        assert response.data["email"] == "new@example.com"

    def test_unauthenticated_blocked(self):
        self.client.logout()
        url = reverse("user-list")
        response = self.client.get(url)
        assert response.status_code == 401
```

### FastAPI Tests

```python
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.database import get_db


@pytest.fixture
async def client(test_db):
    app.dependency_overrides[get_db] = lambda: test_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest.mark.anyio
async def test_list_users(client: AsyncClient):
    response = await client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


@pytest.mark.anyio
async def test_create_user(client: AsyncClient):
    payload = {"email": "test@example.com", "name": "Test"}
    response = await client.post("/users/", json=payload)
    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"
```

---

## Common Patterns

### Django Signals

```python
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

### Django Management Commands

```python
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = "Seed database with sample users"

    def add_arguments(self, parser):
        parser.add_argument("--count", type=int, default=10)

    def handle(self, *args, **options):
        count = options["count"]
        for i in range(count):
            User.objects.create(email=f"user{i}@example.com", name=f"User {i}")
        self.stdout.write(self.style.SUCCESS(f"Created {count} users"))
```

### FastAPI Background Tasks

```python
from fastapi import BackgroundTasks

@router.post("/users/")
async def create_user(
    payload: UserCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    user = await user_service.create(db, payload)
    background_tasks.add_task(send_welcome_email, user.email)
    return user
```

### FastAPI Middleware

```python
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import time

class TimingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()
        response = await call_next(request)
        elapsed = time.perf_counter() - start
        response.headers["X-Process-Time"] = f"{elapsed:.4f}"
        return response
```

---

## Related Skills

| Skill                | When to Use            |
| -------------------- | ---------------------- |
| `test-specialist`    | Testing guidance       |
| `security`           | Auth, validation       |
| `api-designer`       | API design patterns    |
| `tech-debt-analyzer` | Code quality           |
| `data-science`       | Data processing layers |

### Invoke with:

```
Skill(test-specialist)
Skill(api-designer)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/stacks/python.md` - Python fundamentals
- `~/.claude/docs/reference/checklists/api-development.md` - API design checklist

---

## Anti-Patterns

- [ ] Missing type hints on views/routes
- [ ] Raw SQL when ORM/query builder suffices
- [ ] Fat views/routes (move logic to services)
- [ ] No input validation on endpoints
- [ ] Secrets in settings files (use env vars)
- [ ] Missing database indexes on filtered fields
- [ ] Synchronous blocking calls in FastAPI async routes
- [ ] N+1 queries (use `select_related`/`prefetch_related` or joinedload)

---

_Django for batteries-included full-stack. FastAPI for async-first APIs. Both demand type hints and tests._
