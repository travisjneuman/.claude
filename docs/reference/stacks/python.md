# Python Stack Guide

**When to use:** Any Python project (scripts, automation, APIs, data processing).

---

## Project Setup

### uv Package Manager (Recommended)

```bash
# Install uv (fast Python package manager, replaces pip/venv)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create project with uv
uv init my-project
cd my-project

# Create virtual environment and install dependencies
uv sync                      # Install from pyproject.toml
uv add requests pydantic     # Add dependencies
uv add --dev pytest ruff mypy # Add dev dependencies
uv run python script.py      # Run within venv
uv run pytest                # Run tests within venv
```

### Traditional Virtual Environment (Fallback)

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Common Commands

```bash
# Run script
python script.py
uv run python script.py     # With uv

# Run tests
pytest
pytest -v                    # verbose
pytest tests/test_module.py  # specific file

# Type checking
mypy src/

# Linting and formatting (ruff replaces black + isort + flake8)
ruff check .                 # Lint
ruff format .                # Format (replaces black)
ruff check --fix .           # Lint + auto-fix
```

---

## Code Standards

### Type Hints (Required)

```python
# All functions must have type hints
def process_user(user_id: int, options: dict[str, Any] | None = None) -> User:
    """Process a user by ID."""
    ...

# Use typing module for complex types
from typing import TypeVar, Generic, Callable

T = TypeVar('T')

def first_or_none(items: list[T]) -> T | None:
    return items[0] if items else None
```

### Function Guidelines

- Single responsibility
- < 50 lines
- < 5 parameters
- Docstrings for public functions

```python
def calculate_total(
    items: list[Item],
    discount: float = 0.0,
    tax_rate: float = 0.0,
) -> Decimal:
    """
    Calculate total price with discount and tax.

    Args:
        items: List of items to total
        discount: Discount percentage (0-1)
        tax_rate: Tax percentage (0-1)

    Returns:
        Total price as Decimal

    Raises:
        ValueError: If discount or tax_rate invalid
    """
    if not 0 <= discount <= 1:
        raise ValueError(f"Invalid discount: {discount}")
    ...
```

### Input Validation (Pydantic v2)

```python
# Pydantic v2 API: use @field_validator instead of @validator
from pydantic import BaseModel, Field, field_validator

class UserInput(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str
    age: int = Field(..., ge=0, le=150)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        if '@' not in v:
            raise ValueError('Invalid email')
        return v.lower()

    # Pydantic v2: model_config replaces class Config
    model_config = {'strict': True}

# Usage
try:
    user = UserInput(**raw_data)
except ValidationError as e:
    handle_error(e)
```

---

## File Organization

```
project/
├── src/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── user_service.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_user_service.py
├── pyproject.toml          # Primary config (replaces setup.py/setup.cfg)
└── README.md
```

### pyproject.toml (Primary Config)

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = [
    "pydantic>=2.0",
    "httpx>=0.27",
]

[project.optional-dependencies]
dev = ["pytest", "ruff", "mypy"]

[tool.ruff]
target-version = "py312"
line-length = 99

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B"]

[tool.mypy]
strict = true

[tool.pytest.ini_options]
testpaths = ["tests"]
```

---

## Testing

### Test Structure

```python
import pytest
from src.services.user_service import UserService

class TestUserService:
    @pytest.fixture
    def service(self) -> UserService:
        return UserService()

    def test_create_user_success(self, service: UserService) -> None:
        user = service.create_user("test@example.com")
        assert user.email == "test@example.com"

    def test_create_user_invalid_email(self, service: UserService) -> None:
        with pytest.raises(ValueError, match="Invalid email"):
            service.create_user("invalid")

    @pytest.mark.parametrize("email,expected", [
        ("test@example.com", True),
        ("invalid", False),
        ("", False),
    ])
    def test_validate_email(
        self,
        service: UserService,
        email: str,
        expected: bool
    ) -> None:
        assert service.validate_email(email) == expected
```

### conftest.py for fixtures

```python
import pytest
from src.database import Database

@pytest.fixture
def db() -> Database:
    """Provide test database."""
    db = Database(":memory:")
    db.setup()
    yield db
    db.teardown()
```

---

## Error Handling

```python
# Custom exceptions
class UserNotFoundError(Exception):
    """Raised when user is not found."""
    pass

class ValidationError(Exception):
    """Raised when validation fails."""
    pass

# Proper error handling
def get_user(user_id: int) -> User:
    try:
        user = db.find_user(user_id)
        if user is None:
            raise UserNotFoundError(f"User {user_id} not found")
        return user
    except DatabaseError as e:
        logger.error(f"Database error: {e}")
        raise
```

---

## Logging

```python
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Usage
logger.info(f"Processing {len(items)} items")
logger.debug(f"Item details: {item}")
logger.error(f"Failed to process: {error}", exc_info=True)

# NEVER log sensitive data
logger.info(f"User {user.id} authenticated")  # Good
logger.info(f"Password: {password}")  # NEVER
```

---

## Related Skills

| Skill                | When to Use         |
| -------------------- | ------------------- |
| `data-science`       | Data processing, ML |
| `test-specialist`    | Testing guidance    |
| `security`           | Security patterns   |
| `tech-debt-analyzer` | Code quality        |

### Invoke with:

```
Skill(data-science)
Skill(test-specialist)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/docs/reference/checklists/automation-scripts.md` - Scripts checklist

---

## Anti-Patterns

- [ ] Missing type hints
- [ ] Bare `except:` clauses
- [ ] Mutable default arguments
- [ ] `from module import *`
- [ ] No docstrings on public functions
- [ ] Ignoring return values

```python
# WRONG - mutable default
def add_item(item: str, items: list = []) -> list:
    items.append(item)
    return items

# RIGHT - use None
def add_item(item: str, items: list | None = None) -> list:
    if items is None:
        items = []
    items.append(item)
    return items
```

---

## PEP 8 Quick Reference

- 4 spaces for indentation
- 79 chars max line length (99 for modern projects)
- snake_case for functions/variables
- PascalCase for classes
- UPPER_CASE for constants
- Two blank lines between top-level definitions

---

## Python 3.12+ Features

### Type Parameter Syntax (PEP 695)

```python
# Old syntax
from typing import TypeVar
T = TypeVar('T')
def first(items: list[T]) -> T: ...

# New syntax (3.12+)
type Vector = list[float]

def first[T](items: list[T]) -> T: ...

class Stack[T]:
    def push(self, item: T) -> None: ...
    def pop(self) -> T: ...
```

### Better Error Messages

Python 3.12+ provides more helpful error messages with suggestions for typos, missing imports, and common mistakes. Leverage these during development.

### override Decorator

```python
from typing import override

class Base:
    def process(self) -> None: ...

class Child(Base):
    @override
    def process(self) -> None:  # Type checker verifies Base has this method
        ...
```

---

## Web Frameworks

### FastAPI

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel

app = FastAPI()

class CreateUser(BaseModel):
    name: str
    email: str

@app.post("/users", status_code=201)
async def create_user(user: CreateUser) -> User:
    return await user_service.create(user)

@app.get("/users/{user_id}")
async def get_user(user_id: int) -> User:
    user = await user_service.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

### Django

```python
# Django with Django REST Framework for APIs
# Django with Django Ninja for type-safe APIs (FastAPI-like)
# Use Django for admin-heavy or ORM-heavy applications
# Use FastAPI for lightweight, async-first API services
```

---

_Python: readable, explicit, and type-safe._
