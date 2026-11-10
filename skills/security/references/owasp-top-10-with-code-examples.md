# security: OWASP Top 10 (with Code Examples)

Part of the `security` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## OWASP Top 10 (with Code Examples)

### 1. Broken Access Control

```python
# WRONG - No authorization check
@app.get("/api/users/{user_id}/data")
async def get_user_data(user_id: str):
    return db.get_user_data(user_id)  # Any user can access any data

# RIGHT - Verify ownership
@app.get("/api/users/{user_id}/data")
async def get_user_data(user_id: str, current_user: User = Depends(get_current_user)):
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Forbidden")
    return db.get_user_data(user_id)
```

### 2. Cryptographic Failures

```python
# WRONG - Weak hashing
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()

# RIGHT - Use bcrypt or argon2
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
password_hash = pwd_context.hash(password)
verified = pwd_context.verify(password, password_hash)
```

### 3. Injection

```python
# WRONG - SQL injection via string formatting
query = f"SELECT * FROM users WHERE email = '{email}'"
cursor.execute(query)

# RIGHT - Parameterized queries
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# WRONG - Command injection via unsanitized input
# Never pass user input to shell commands directly
# Always use subprocess with list arguments:

# RIGHT - Safe subprocess usage
import subprocess
subprocess.run(["convert", user_filename, "output.png"], check=True)
```

### 4. Insecure Design

```python
# WRONG - No rate limiting on password reset
@app.post("/api/reset-password")
async def reset_password(email: str):
    send_reset_email(email)

# RIGHT - Rate limit + CAPTCHA
@app.post("/api/reset-password")
@limiter.limit("3/hour")
async def reset_password(email: str, captcha: str):
    if not verify_captcha(captcha):
        raise HTTPException(400, "Invalid CAPTCHA")
    send_reset_email(email)
```

### 5. Security Misconfiguration

```python
# WRONG - Debug mode in production, exposing stack traces
# RIGHT - Environment-aware configuration
app = FastAPI(debug=os.getenv("ENV") == "development")

@app.exception_handler(Exception)
async def handle_error(request, exc):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(status_code=500, content={"error": "Internal server error"})
```

### 6. Vulnerable Components

```bash
# Audit dependencies regularly
npm audit
pip audit
cargo audit
# Pin versions, use lockfiles (package-lock.json, Pipfile.lock, Cargo.lock)
```

### 7. Authentication Failures

```typescript
// WRONG - JWT with no expiration, weak secret
const token = jwt.sign(payload, "secret123");

// RIGHT - Short expiry, strong secret, refresh tokens
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "15m",
  algorithm: "RS256",
  issuer: "my-app",
});
```

### 8. Software and Data Integrity Failures

```yaml
# Pin action versions in GitHub Actions (not @main)
- uses: actions/checkout@v4.1.1
```

### 9. Security Logging and Monitoring Failures

```python
# Log security-relevant events with structured data
logger.info("auth.login.success", extra={"user_id": user.id, "ip": request.client.host})
logger.warning("auth.login.failed", extra={"email": email, "ip": request.client.host})
logger.critical("auth.bruteforce.detected", extra={"ip": request.client.host, "attempts": count})
```

### 10. Server-Side Request Forgery (SSRF)

```python
# WRONG - User controls URL without validation
# RIGHT - Allowlist domains, block internal IPs
from urllib.parse import urlparse
import ipaddress

ALLOWED_HOSTS = {"api.example.com", "cdn.example.com"}

def safe_fetch(url: str) -> Response:
    parsed = urlparse(url)
    if parsed.hostname not in ALLOWED_HOSTS:
        raise ValueError("Host not allowed")
    ip = ipaddress.ip_address(socket.gethostbyname(parsed.hostname))
    if ip.is_private:
        raise ValueError("Internal addresses not allowed")
    return requests.get(url, timeout=10)
```

---
