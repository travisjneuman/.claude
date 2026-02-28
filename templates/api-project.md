---
name: api-project
description: API-only starter with NestJS or FastAPI, JWT/OAuth auth, database, OpenAPI docs, rate limiting, Docker, testing
---

# API Project Template

**Primary Stack:** NestJS + TypeScript + PostgreSQL + Prisma + JWT + Docker
**Alternative Stack:** FastAPI + Python + PostgreSQL + SQLAlchemy + JWT + Docker

---

## Stack Selection

| Factor           | NestJS                            | FastAPI                           |
| ---------------- | --------------------------------- | --------------------------------- |
| Language         | TypeScript                        | Python                            |
| Architecture     | Modular (Angular-inspired)        | Functional / class-based          |
| ORM              | Prisma / TypeORM                  | SQLAlchemy / Tortoise             |
| Validation       | class-validator + DTOs            | Pydantic models                   |
| API docs         | Swagger (auto-generated)          | OpenAPI (auto-generated)          |
| Async            | Full async support                | Native async/await                |
| Best for         | Enterprise, structured teams      | ML/data teams, rapid prototyping  |

---

## NestJS Directory Structure

```
project/
├── src/
│   ├── main.ts                    # Bootstrap, CORS, Swagger, validation pipe
│   ├── app.module.ts              # Root module
│   ├── common/
│   │   ├── decorators/            # Custom decorators (@CurrentUser, @Public, @Roles)
│   │   ├── filters/               # Exception filters (HttpExceptionFilter)
│   │   ├── guards/                # Auth guards (JwtAuthGuard, RolesGuard)
│   │   ├── interceptors/          # Response transform, logging, timeout
│   │   ├── middleware/            # Rate limiting, request logging
│   │   ├── pipes/                 # Validation, parse-int, trim
│   │   ├── interfaces/           # Shared interfaces
│   │   └── dto/                   # Shared DTOs (PaginationDto, SortDto)
│   ├── config/
│   │   ├── config.module.ts       # ConfigModule setup
│   │   ├── database.config.ts     # Database configuration
│   │   └── jwt.config.ts          # JWT configuration
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts # Login, register, refresh, logout
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.guard.ts
│   │   │   ├── strategies/        # Passport strategies (jwt, local, google)
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── api-key.strategy.ts
│   │   │   └── dto/               # LoginDto, RegisterDto, TokenDto
│   │   │       ├── login.dto.ts
│   │   │       └── register.dto.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.spec.ts
│   │   │   ├── users.service.spec.ts
│   │   │   ├── entities/          # User entity
│   │   │   └── dto/               # CreateUserDto, UpdateUserDto
│   │   │       ├── create-user.dto.ts
│   │   │       └── update-user.dto.ts
│   │   ├── health/
│   │   │   ├── health.module.ts
│   │   │   └── health.controller.ts  # /health, /health/db, /health/ready
│   │   └── [feature]/
│   └── prisma/
│       ├── prisma.module.ts
│       └── prisma.service.ts      # Prisma client service
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── docker-compose.yml
├── .env
├── .env.example
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
└── package.json
```

---

## FastAPI Directory Structure

```
project/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI app creation, middleware, routes
│   ├── config.py                  # Settings via pydantic-settings
│   ├── dependencies.py            # Shared dependencies (get_db, get_current_user)
│   ├── database.py                # SQLAlchemy engine and session
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── health.py
│   │   └── [feature].py
│   ├── models/                    # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── base.py
│   │   └── [feature].py
│   ├── schemas/                   # Pydantic schemas (request/response)
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── auth.py
│   │   └── [feature].py
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── user.py
│   ├── middleware/                 # Custom middleware
│   │   ├── __init__.py
│   │   ├── rate_limit.py
│   │   └── logging.py
│   └── utils/
│       ├── __init__.py
│       ├── security.py            # Password hashing, JWT
│       └── pagination.py
├── alembic/                       # Database migrations
│   ├── env.py
│   └── versions/
├── tests/
│   ├── conftest.py                # Fixtures, test DB
│   ├── test_auth.py
│   └── test_users.py
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── alembic.ini
├── .env
├── .env.example
├── pyproject.toml
└── requirements.txt
```

---

## Setup Steps

### NestJS

```bash
# Create project
npx @nestjs/cli new project-name

# Install core dependencies
npm install @nestjs/config @nestjs/swagger
npm install @nestjs/passport passport passport-jwt passport-local
npm install @nestjs/jwt @nestjs/throttler
npm install @prisma/client class-validator class-transformer
npm install bcrypt helmet
npm install -D prisma @types/passport-jwt @types/bcrypt

# Initialize Prisma
npx prisma init

# Run development server
npm run start:dev
# Swagger docs at http://localhost:3000/api/docs
```

### FastAPI

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn[standard]
pip install sqlalchemy[asyncio] asyncpg alembic
pip install pydantic-settings python-jose[cryptography] passlib[bcrypt]
pip install python-multipart httpx  # for OAuth, testing
pip install slowapi                 # for rate limiting

# Initialize Alembic
alembic init alembic

# Run server
uvicorn app.main:app --reload --port 3000
# Swagger docs at http://localhost:3000/docs
```

---

## Authentication

### JWT + Refresh Token Flow

```
1. POST /auth/register        -> Create account, return tokens
2. POST /auth/login            -> Validate credentials, return access + refresh tokens
3. GET  /auth/me               -> Return current user (requires access token)
4. POST /auth/refresh           -> Exchange refresh token for new access token
5. POST /auth/logout            -> Invalidate refresh token
6. POST /auth/forgot-password   -> Send reset email
7. POST /auth/reset-password    -> Reset with token from email
```

### JWT + API Keys (Dual Auth)

Support both JWT tokens (for users) and API keys (for service-to-service).

**NestJS pattern:**

```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserContext> {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

// API Key Strategy
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private apiKeyService: ApiKeyService) {
    super({ header: 'X-API-Key', prefix: '' });
  }

  async validate(apiKey: string): Promise<ApiKeyContext> {
    const key = await this.apiKeyService.validate(apiKey);
    if (!key) throw new UnauthorizedException('Invalid API key');
    return { keyId: key.id, scopes: key.scopes };
  }
}
```

**FastAPI pattern:**

```python
# app/utils/security.py
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, APIKeyHeader

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
bearer_scheme = HTTPBearer()
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm="HS256")

async def get_current_user(token: str = Depends(bearer_scheme)) -> User:
    payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
    user = await get_user(payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user
```

### OAuth2 Flow

```
1. GET  /auth/google           -> Redirect to Google OAuth consent screen
2. GET  /auth/google/callback  -> Handle callback, create/link account, return tokens
3. Same pattern for GitHub, Microsoft, etc.
```

---

## Input Validation

### NestJS (class-validator)

```typescript
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecureP@ss1' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain uppercase, lowercase, and number',
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
```

### FastAPI (Pydantic)

```python
from pydantic import BaseModel, Field, EmailStr, field_validator, ConfigDict
import re

class CreateUserSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)
    role: Role | None = None

    model_config = ConfigDict(from_attributes=True)

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain an uppercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain a number")
        return v
```

---

## Error Handling

### Standardized Error Response

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "details": [
    { "field": "email", "message": "must be a valid email address" }
  ],
  "timestamp": "2026-01-15T10:30:00.000Z",
  "path": "/api/users"
}
```

### NestJS

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### FastAPI

```python
@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.message,
            "code": exc.error_code,
        },
    )
```

---

## API Documentation (OpenAPI)

### NestJS

```typescript
// main.ts
const config = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .addApiKey({ type: 'apiKey', name: 'X-API-Key', in: 'header' })
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
// Available at /api/docs
```

### FastAPI (automatic)

```python
app = FastAPI(
    title="My API",
    description="API documentation",
    version="1.0.0",
    docs_url="/docs",          # Swagger UI
    redoc_url="/redoc",        # ReDoc
    openapi_url="/openapi.json",
)
```

---

## Rate Limiting

### NestJS (@nestjs/throttler)

```typescript
@Module({
  imports: [
    ThrottlerModule.forRoot([
      { name: 'short', ttl: 1000, limit: 3 },     // 3 req/sec
      { name: 'medium', ttl: 10000, limit: 20 },   // 20 req/10sec
      { name: 'long', ttl: 60000, limit: 100 },    // 100 req/min
    ]),
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
```

### FastAPI (slowapi)

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/resource")
@limiter.limit("100/minute")
async def get_resource(request: Request):
    ...
```

---

## Docker

### Dockerfile (NestJS)

```dockerfile
# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

### Dockerfile (FastAPI)

```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml

```yaml
services:
  api:
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/myapi
      REDIS_URL: redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapi
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

---

## Testing Strategy

### Unit Tests

- Test service methods in isolation
- Mock database and external dependencies
- Test validation logic
- Test error handling paths

### Integration / E2E Tests

- Test API endpoints end-to-end
- Use test database (SQLite in-memory or test PostgreSQL)
- Test authentication flows
- Test database queries

### Test Checklist

- [ ] All endpoints have at least one happy-path test
- [ ] Error responses tested (400, 401, 403, 404, 500)
- [ ] Auth flows tested (login, register, token refresh)
- [ ] Validation tested (invalid inputs rejected)
- [ ] Pagination tested
- [ ] Rate limiting tested
- [ ] CORS configuration tested

### Health Check Endpoints

```
GET /health         -> { status: "ok", timestamp: "..." }
GET /health/db      -> { status: "ok", database: "connected" }
GET /health/ready   -> { status: "ok", dependencies: { db: "up", redis: "up" } }
```

---

## Environment Variables

```bash
# .env.example

# Server
PORT=3000
NODE_ENV=development
HOST="0.0.0.0"

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/myapi"
DATABASE_POOL_SIZE=10

# JWT
JWT_SECRET="generate-with-openssl-rand-base64-64"
JWT_ACCESS_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"

# Redis (caching/rate limiting)
REDIS_URL="redis://localhost:6379"

# CORS
CORS_ORIGINS="http://localhost:3001,https://myapp.com"

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL="info"

# Email (optional)
SMTP_HOST=""
SMTP_PORT=587
SMTP_USER=""
SMTP_PASS=""

# Sentry (optional)
SENTRY_DSN=""
```

---

## Deployment Checklist

### Production Readiness

- [ ] Environment variables set (no defaults for secrets)
- [ ] Database migrations applied
- [ ] Rate limiting configured
- [ ] CORS restricted to known origins
- [ ] Helmet/security headers enabled
- [ ] Request logging enabled
- [ ] Error tracking configured (Sentry)
- [ ] Health check endpoints responding
- [ ] OpenAPI docs disabled or auth-protected in production
- [ ] SSL/TLS termination configured
- [ ] Database connection pooling tuned
- [ ] Graceful shutdown handling implemented

---

## Related Global Rules

Load these `~/.claude/` files when relevant:

- `docs/reference/stacks/fullstack-nextjs-nestjs.md` for NestJS patterns
- `docs/reference/stacks/python.md` for FastAPI/Python patterns
- `docs/reference/checklists/api-development.md` for API design checklists
- `docs/reference/checklists/security-hardening.md` for security patterns
- `rules/checklists/verification-template.md` for completion verification

---

_API template: auth, validation, error handling, docs, rate limiting, Docker, testing -- production-ready from day one._
