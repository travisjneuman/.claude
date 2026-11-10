# test-specialist: Python Testing (pytest)

Part of the `test-specialist` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Python Testing (pytest)

### Fixtures and Parametrize

```python
import pytest
from myapp.services import UserService

@pytest.fixture
def user_service(db_session):
    """Provide a UserService with test database."""
    return UserService(session=db_session)

@pytest.fixture
def sample_user(user_service):
    """Create and return a sample user."""
    return user_service.create(name="Test User", email="test@example.com")

class TestUserService:
    def test_create_user(self, user_service):
        user = user_service.create(name="John", email="john@example.com")
        assert user.name == "John"
        assert user.id is not None

    def test_get_user_not_found(self, user_service):
        with pytest.raises(UserNotFoundError, match="User 999 not found"):
            user_service.get(999)

    @pytest.mark.parametrize("email,is_valid", [
        ("user@example.com", True),
        ("user@sub.domain.com", True),
        ("invalid", False),
        ("@example.com", False),
        ("", False),
    ])
    def test_validate_email(self, user_service, email: str, is_valid: bool):
        assert user_service.validate_email(email) == is_valid
```

### Mocking

```python
from unittest.mock import Mock, patch, AsyncMock

def test_send_notification(user_service):
    with patch("myapp.services.email_client") as mock_email:
        mock_email.send = Mock(return_value=True)
        user_service.notify(user_id=1, message="Hello")
        mock_email.send.assert_called_once_with(
            to="test@example.com",
            body="Hello",
        )

# Async mocking
@pytest.mark.asyncio
async def test_fetch_data():
    with patch("myapp.client.fetch", new_callable=AsyncMock) as mock_fetch:
        mock_fetch.return_value = {"status": "ok"}
        result = await process_data()
        assert result["status"] == "ok"
```

### conftest.py Patterns

```python
# tests/conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

@pytest.fixture(scope="session")
def engine():
    return create_engine("sqlite:///:memory:")

@pytest.fixture(scope="function")
def db_session(engine):
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.rollback()
    session.close()
    Base.metadata.drop_all(engine)
```

---
