# agent-django-fastapi-expert: Key Patterns

Part of the `agent-django-fastapi-expert` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Key Patterns

### Django Model with Manager

```python
from django.db import models
from django.utils.translation import gettext_lazy as _


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class User(models.Model):
    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(_("full name"), max_length=150)
    role = models.CharField(
        max_length=20,
        choices=[("user", "User"), ("admin", "Admin"), ("moderator", "Moderator")],
        default="user",
    )
    is_active = models.BooleanField(_("active"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    active = ActiveManager()

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["-created_at"]),
            models.Index(fields=["role", "is_active"]),
        ]

    def __str__(self) -> str:
        return self.email
```

### DRF ViewSet with Permissions

```python
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_staff


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["role", "is_active"]
    search_fields = ["name", "email"]
    ordering_fields = ["created_at", "name"]

    def get_permissions(self):
        if self.action in ["update", "partial_update", "destroy"]:
            return [permissions.IsAuthenticated(), IsOwnerOrAdmin()]
        return super().get_permissions()

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(is_active=True)
        return qs

    @action(detail=True, methods=["post"])
    def deactivate(self, request, pk=None):
        user = self.get_object()
        user.is_active = False
        user.save(update_fields=["is_active"])
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
```

### DRF Serializer with Validation

```python
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(read_only=True, default=0)

    class Meta:
        model = User
        fields = ["id", "email", "name", "role", "is_active", "created_at", "post_count"]
        read_only_fields = ["id", "created_at", "post_count"]

    def validate_email(self, value: str) -> str:
        return value.lower().strip()

    def validate(self, attrs: dict) -> dict:
        if attrs.get("role") == "admin" and not self.context["request"].user.is_staff:
            raise serializers.ValidationError(
                {"role": "Only staff can assign admin role."}
            )
        return attrs


class CreateUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "name", "password"]

    def create(self, validated_data: dict) -> User:
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
```

### FastAPI with Dependency Injection

```python
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/users", tags=["users"])


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    payload = decode_jwt(token)
    user = await db.get(User, payload["sub"])
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )
    return user


@router.get("/", response_model=list[UserResponse])
async def list_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    role: str | None = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[UserResponse]:
    query = select(User).where(User.is_active == True)

    if role:
        query = query.where(User.role == role)

    query = query.offset(skip).limit(limit).order_by(User.created_at.desc())
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: CreateUserInput,
    db: AsyncSession = Depends(get_db),
) -> UserResponse:
    existing = await db.execute(
        select(User).where(User.email == payload.email)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )

    user = User(**payload.model_dump())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> UserResponse:
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_id} not found",
        )
    return user
```

### Pydantic v2 Models

```python
from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator
from datetime import datetime


class CreateUserInput(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=150)
    password: str = Field(..., min_length=8, max_length=128)
    role: str = Field(default="user", pattern=r"^(user|admin|moderator)$")

    model_config = {"str_strip_whitespace": True}

    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        return v.lower()

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not v.replace(" ", "").replace("-", "").replace("'", "").isalpha():
            raise ValueError("Name must contain only letters, spaces, hyphens, and apostrophes")
        return v


class UpdateUserInput(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=150)
    role: str | None = Field(None, pattern=r"^(user|admin|moderator)$")

    @model_validator(mode="before")
    @classmethod
    def check_at_least_one_field(cls, data: dict) -> dict:
        if not any(v is not None for v in data.values()):
            raise ValueError("At least one field must be provided")
        return data


class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
```

### Django Test with Factory

```python
import pytest
from django.urls import reverse
from rest_framework.test import APIClient
import factory


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(lambda n: f"user{n}@example.com")
    name = factory.Faker("name")
    is_active = True
    role = "user"


@pytest.mark.django_db
class TestUserAPI:
    def setup_method(self):
        self.client = APIClient()
        self.user = UserFactory()
        self.admin = UserFactory(role="admin", is_active=True)
        self.client.force_authenticate(user=self.user)

    def test_list_users(self):
        UserFactory.create_batch(3)
        url = reverse("user-list")

        response = self.client.get(url)

        assert response.status_code == 200
        assert len(response.data["results"]) >= 4

    def test_create_user(self):
        url = reverse("user-list")
        payload = {
            "email": "new@example.com",
            "name": "New User",
            "password": "secure_password_123",
        }

        response = self.client.post(url, payload, format="json")

        assert response.status_code == 201
        assert response.data["email"] == "new@example.com"

    def test_cannot_assign_admin_role(self):
        url = reverse("user-list")
        payload = {
            "email": "admin@example.com",
            "name": "Admin User",
            "password": "secure_password_123",
            "role": "admin",
        }

        response = self.client.post(url, payload, format="json")

        assert response.status_code == 400

    def test_unauthenticated_blocked(self):
        self.client.logout()
        url = reverse("user-list")

        response = self.client.get(url)

        assert response.status_code == 401
```

### FastAPI Async Test

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
async def test_list_users(client: AsyncClient, seed_users):
    response = await client.get("/users/")

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1


@pytest.mark.anyio
async def test_create_user(client: AsyncClient):
    payload = {"email": "test@example.com", "name": "Test User", "password": "password123"}

    response = await client.post("/users/", json=payload)

    assert response.status_code == 201
    assert response.json()["email"] == "test@example.com"


@pytest.mark.anyio
async def test_create_duplicate_email(client: AsyncClient, seed_users):
    existing_email = seed_users[0].email
    payload = {"email": existing_email, "name": "Duplicate", "password": "password123"}

    response = await client.post("/users/", json=payload)

    assert response.status_code == 409
```

### Celery Task with Retry

```python
from celery import shared_task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
    autoretry_for=(ConnectionError, TimeoutError),
    retry_backoff=True,
    retry_backoff_max=600,
)
def send_welcome_email(self, user_id: int) -> None:
    try:
        user = User.objects.get(id=user_id)
        email_service.send(
            to=user.email,
            subject="Welcome!",
            template="welcome",
            context={"name": user.name},
        )
        logger.info("Welcome email sent to user %s", user_id)
    except User.DoesNotExist:
        logger.warning("User %s not found, skipping email", user_id)
    except Exception as exc:
        logger.error("Failed to send email to user %s: %s", user_id, exc)
        raise self.retry(exc=exc)
```
