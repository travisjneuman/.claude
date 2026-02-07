# Security Hardening Checklist

**When to use:** Implementing security measures, reviewing code for vulnerabilities, or hardening a deployment.

---

## OWASP Top 10 Checklist

### 1. Broken Access Control (A01)

- [ ] Authentication required on all non-public endpoints
- [ ] Authorization checked on every request (not just UI hiding)
- [ ] Resource access validated against current user (no IDOR)
- [ ] Admin endpoints restricted by role, not just authentication
- [ ] CORS configured to allow only known origins
- [ ] Directory listing disabled on web servers

```typescript
// Verify ownership on every resource access
app.get("/users/:id/profile", auth, (req, res) => {
  if (req.user.id !== req.params.id && req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  return db.getProfile(req.params.id);
});
```

### 2. Cryptographic Failures (A02)

- [ ] Passwords hashed with bcrypt, scrypt, or Argon2 (never MD5/SHA)
- [ ] Sensitive data encrypted at rest (database, backups)
- [ ] TLS 1.2+ enforced for all connections
- [ ] No secrets in source code, environment variables, or logs
- [ ] API keys and tokens rotated regularly

```python
# Use bcrypt for password hashing
import bcrypt
password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))
```

### 3. Injection (A03)

- [ ] Parameterized queries used everywhere (never string concatenation)
- [ ] ORM or query builder used for database operations
- [ ] User input sanitized before rendering in HTML
- [ ] No dynamic code execution with user input
- [ ] OS command injection prevented (avoid shell execution with user input)

```python
# Always use parameterized queries
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# Or use an ORM
user = await db.user.find_first(where={"email": email})
```

```typescript
// Always use textContent for user-provided text
element.textContent = userInput;

// For rich content, use a sanitization library like DOMPurify
const clean = DOMPurify.sanitize(userInput);
```

### 4. Insecure Design (A04)

- [ ] Threat modeling performed for critical features
- [ ] Rate limiting on authentication and sensitive endpoints
- [ ] Account lockout after repeated failed login attempts
- [ ] Business logic validated server-side (not just client)
- [ ] Fail-secure defaults (deny by default)

### 5. Security Misconfiguration (A05)

- [ ] Default credentials changed
- [ ] Debug mode disabled in production
- [ ] Stack traces not exposed in error responses
- [ ] Unnecessary features/endpoints disabled
- [ ] Security headers configured (see below)
- [ ] Directory listing disabled

### 6. Vulnerable Components (A06)

- [ ] Dependencies audited regularly
- [ ] Automated vulnerability scanning in CI

```bash
# Node.js
npm audit
npm audit fix

# Python
pip-audit
safety check

# General
snyk test
```

- [ ] No known critical vulnerabilities in dependencies
- [ ] Dependency update policy defined (monthly minimum)
- [ ] Lock files committed (`package-lock.json`, `poetry.lock`)

### 7. Authentication Failures (A07)

- [ ] Multi-factor authentication available for sensitive accounts
- [ ] Password minimum length >= 8 characters
- [ ] Passwords checked against known breach databases
- [ ] Session tokens regenerated after login
- [ ] Logout invalidates session server-side
- [ ] JWT tokens have short expiration (15 min access, 7 day refresh)

### 8. Data Integrity Failures (A08)

- [ ] Software updates verified with signatures
- [ ] CI/CD pipeline secured (no unauthorized deployments)
- [ ] Serialized data validated before deserialization
- [ ] No untrusted data passed to deserialization functions

### 9. Logging and Monitoring Failures (A09)

- [ ] Authentication events logged (login, logout, failed attempts)
- [ ] Authorization failures logged
- [ ] Input validation failures logged
- [ ] Logs do NOT contain passwords, tokens, or PII
- [ ] Log aggregation and alerting configured

```python
# Log events without sensitive data
logger.info(f"Login attempt: user_id={user.id}, ip={request.client.host}")
# NEVER log passwords, tokens, or secrets
```

### 10. Server-Side Request Forgery (A10)

- [ ] URL parameters validated against allowlist
- [ ] Internal network access blocked from user-provided URLs
- [ ] DNS rebinding prevention (resolve DNS before fetching)
- [ ] Response body from fetched URLs not returned raw to users

---

## Security Headers

```
# Required headers
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 0
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Content Security Policy (CSP)

```
Content-Security-Policy:
  default-src 'none';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

Implementation:

```typescript
// Express/Node.js with helmet
import helmet from "helmet";

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        fontSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.example.com"],
        frameAncestors: ["'none'"],
      },
    },
    hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
  }),
);
```

- [ ] All security headers set on every response
- [ ] CSP configured and tested (use report-only mode first)
- [ ] HSTS preloading submitted

---

## CORS Configuration

```typescript
// Explicit allowed origins only
app.use(
  cors({
    origin: ["https://app.example.com", "https://admin.example.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);
```

- [ ] CORS allows only known origins (never wildcard with credentials)
- [ ] Allowed methods restricted to what is needed
- [ ] Preflight cache configured (`maxAge`)

---

## Rate Limiting

```typescript
import rateLimit from "express-rate-limit";

// General API rate limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limit for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
});

app.use("/api/", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
```

- [ ] Global rate limit on all endpoints
- [ ] Stricter rate limit on authentication endpoints
- [ ] Rate limit on password reset and email verification
- [ ] Rate limit by IP and by authenticated user
- [ ] Rate limit headers included in responses

---

## Input Validation and Sanitization

```typescript
// Zod validation (TypeScript)
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email().max(255).toLowerCase().trim(),
  name: z
    .string()
    .min(1)
    .max(150)
    .trim()
    .regex(/^[a-zA-Z\s'-]+$/),
  password: z.string().min(8).max(128),
});

const result = createUserSchema.safeParse(req.body);
if (!result.success) {
  return res.status(422).json({ errors: result.error.issues });
}
const validData = result.data;
```

```python
# Pydantic validation (Python)
from pydantic import BaseModel, EmailStr, Field, field_validator
import re

class CreateUser(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=150)
    password: str = Field(..., min_length=8, max_length=128)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        if not re.match(r"^[a-zA-Z\s'-]+$", v):
            raise ValueError("Name contains invalid characters")
        return v.strip()
```

- [ ] All inputs validated on the server (never trust client validation alone)
- [ ] String lengths bounded (min and max)
- [ ] Numeric ranges validated
- [ ] File uploads validated (type, size, content)
- [ ] JSON payloads validated against schemas
- [ ] URL parameters validated and typed

---

## Session and Cookie Security

```typescript
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
      domain: ".example.com",
    },
  }),
);
```

- [ ] Session cookies are `HttpOnly` (no JS access)
- [ ] Session cookies are `Secure` (HTTPS only)
- [ ] Session cookies use `SameSite=Lax` or `Strict`
- [ ] Session IDs regenerated after login
- [ ] Sessions invalidated on logout (server-side)
- [ ] Session timeout configured (idle and absolute)

---

## Secret Management

```bash
# NEVER commit secrets
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore

# Production: use a secrets manager
# AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager, Doppler
```

- [ ] No secrets in source code (grep for patterns: `password=`, `secret=`, `key=`)
- [ ] `.env` files in `.gitignore`
- [ ] Production secrets in a secrets manager (not env vars in deployment config)
- [ ] Secrets rotated on schedule and after any suspected compromise
- [ ] Different secrets per environment (dev/staging/prod)

---

## Dependency Security

```yaml
# GitHub Actions CI scanning
- name: Run npm audit
  run: npm audit --production --audit-level=high

- name: Run Snyk
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

- [ ] `npm audit` (or equivalent) run in CI pipeline
- [ ] No critical or high vulnerabilities in production dependencies
- [ ] Dependabot or Renovate configured for automated updates
- [ ] Lock files committed and reviewed

---

## Related Skills

| Skill                | When to Use                    |
| -------------------- | ------------------------------ |
| `security`           | Comprehensive security review  |
| `api-designer`       | Secure API patterns            |
| `test-specialist`    | Security testing               |
| `tech-debt-analyzer` | Identifying security debt      |

### Invoke with:

```
Skill(security)
Skill(test-specialist)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules (Security, No innerHTML)
- `~/.claude/rules/checklists/api-development.md` - API security
- `~/.claude/rules/checklists/database-design.md` - Data security

---

## Anti-Patterns

- [ ] Rendering user content without sanitization (XSS)
- [ ] String concatenation for SQL queries (SQL injection)
- [ ] Wildcard in CORS origin (with credentials)
- [ ] Secrets committed to version control
- [ ] Dynamic code evaluation with user input
- [ ] Missing rate limiting on authentication
- [ ] Logging passwords, tokens, or PII
- [ ] Default credentials in production

---

_Security is not optional. Every checklist item is a vulnerability waiting to happen if skipped._
