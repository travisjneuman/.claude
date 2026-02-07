---
name: security
description: Information security expertise for cybersecurity frameworks (NIST, ISO 27001), security architecture, incident response, vulnerability management, identity management, and cloud security. Use when designing security programs, responding to incidents, or assessing vulnerabilities.
---

# Information Security Expert

Comprehensive security frameworks for cybersecurity, incident response, and security architecture.

## Security Architecture

### Zero Trust Architecture

```
ZERO TRUST PRINCIPLES:
- Never trust, always verify
- Assume breach
- Verify explicitly
- Least privilege access
- Micro-segmentation

ZERO TRUST COMPONENTS:

IDENTITY:
- Strong authentication (MFA)
- Identity governance
- Privileged access management
- Continuous validation

DEVICES:
- Device health verification
- Endpoint detection and response
- Mobile device management
- Asset inventory

NETWORK:
- Micro-segmentation
- Software-defined perimeter
- Encrypted communications
- Network access control

APPLICATIONS:
- Application-level authentication
- API security
- Web application firewall
- Secure coding practices

DATA:
- Data classification
- Encryption at rest and in transit
- Data loss prevention
- Access controls
```

### Defense in Depth

```
SECURITY LAYERS:

PHYSICAL:
- Data center security
- Badge access
- Surveillance
- Environmental controls

PERIMETER:
- Firewalls
- IDS/IPS
- DMZ
- VPN

NETWORK:
- Segmentation
- Encryption
- Network monitoring
- NAC

HOST:
- Endpoint protection
- Host-based firewall
- Hardening
- Patch management

APPLICATION:
- WAF
- Secure coding
- Input validation
- Authentication

DATA:
- Encryption
- DLP
- Access controls
- Backup/recovery
```

### Cloud Security

| Domain         | Controls                            |
| -------------- | ----------------------------------- |
| **Identity**   | SSO, MFA, PAM, IAM policies         |
| **Compute**    | Hardened images, container security |
| **Network**    | VPC, security groups, WAF           |
| **Storage**    | Encryption, access policies, backup |
| **Logging**    | CloudTrail, SIEM integration        |
| **Compliance** | Config rules, automated remediation |

For detailed security frameworks (NIST, ISO 27001, CIS Controls, MITRE ATT&CK), see [Security Frameworks Reference](references/security-frameworks.md).

## Vulnerability Management

### Vulnerability Management Process

```
LIFECYCLE:

1. DISCOVERY
   - Asset inventory
   - Vulnerability scanning
   - Penetration testing
   - Code analysis

2. PRIORITIZATION
   - CVSS scoring
   - Asset criticality
   - Exploit availability
   - Business context

3. REMEDIATION
   - Patch management
   - Configuration changes
   - Compensating controls
   - Risk acceptance

4. VERIFICATION
   - Rescan
   - Validation testing
   - Documentation
   - Reporting

5. REPORTING
   - Executive dashboards
   - Trend analysis
   - Compliance reporting
   - SLA tracking
```

### CVSS Scoring

| Score    | Severity | SLA Target  |
| -------- | -------- | ----------- |
| 9.0-10.0 | Critical | 7 days      |
| 7.0-8.9  | High     | 30 days     |
| 4.0-6.9  | Medium   | 90 days     |
| 0.1-3.9  | Low      | Best effort |

### Patch Management

```
PATCH PROCESS:

1. IDENTIFICATION
   - Vendor announcements
   - Vulnerability feeds
   - Security bulletins

2. ASSESSMENT
   - Applicability
   - Risk evaluation
   - Test requirements

3. TESTING
   - Lab validation
   - Compatibility testing
   - Rollback planning

4. DEPLOYMENT
   - Pilot group
   - Phased rollout
   - Monitoring

5. VERIFICATION
   - Confirm installation
   - Functional testing
   - Documentation
```

## Identity & Access Management

### IAM Framework

```
IAM COMPONENTS:

IDENTITY LIFECYCLE:
- Provisioning
- Modification
- De-provisioning
- Certification

AUTHENTICATION:
- Password policies
- Multi-factor authentication
- Single sign-on
- Passwordless

AUTHORIZATION:
- Role-based access (RBAC)
- Attribute-based access (ABAC)
- Least privilege
- Separation of duties

GOVERNANCE:
- Access reviews
- Policy enforcement
- Audit logging
- Compliance reporting
```

### Privileged Access Management

```
PAM CONTROLS:

VAULT:
- Credential storage
- Password rotation
- Secrets management

SESSION:
- Session recording
- Just-in-time access
- Time-limited credentials

MONITORING:
- Activity logging
- Behavioral analytics
- Alert on anomalies

GOVERNANCE:
- Access certification
- Policy enforcement
- Compliance reporting
```

## Security Awareness

### Security Training Program

| Topic                   | Frequency  | Audience         |
| ----------------------- | ---------- | ---------------- |
| **New Hire Security**   | Onboarding | All employees    |
| **Annual Refresh**      | Annually   | All employees    |
| **Phishing Awareness**  | Quarterly  | All employees    |
| **Developer Security**  | Annually   | Development team |
| **Executive Briefings** | Quarterly  | Leadership       |
| **Role-Based**          | As needed  | Specific roles   |

### Phishing Simulation

```
SIMULATION PROGRAM:

FREQUENCY: Monthly

DIFFICULTY LEVELS:
- Easy: Generic, obvious errors
- Medium: Branded, some personalization
- Hard: Targeted, well-crafted

METRICS:
- Click rate
- Report rate
- Training completion
- Trend over time

RESPONSE:
- Click → Immediate training
- Report → Positive reinforcement
- Repeat offenders → Additional training
```

## Security Metrics

### Key Security Metrics

| Category          | Metric                       | Target    |
| ----------------- | ---------------------------- | --------- |
| **Vulnerability** | Critical vulns open >30 days | 0         |
| **Patching**      | Systems patched within SLA   | 95%+      |
| **Incidents**     | Mean time to detect          | <24 hours |
| **Access**        | Orphan accounts              | 0         |
| **Training**      | Completion rate              | 95%+      |
| **Phishing**      | Click rate                   | <5%       |

### Security Dashboard

```
EXECUTIVE DASHBOARD:

RISK POSTURE:
- Overall risk score
- Risk trend
- Top risks

COMPLIANCE:
- Framework coverage
- Audit findings
- Remediation status

OPERATIONS:
- Incident summary
- Vulnerability status
- Patching compliance

INVESTMENT:
- Budget utilization
- Tool effectiveness
- Headcount
```

## Threat Intelligence

### Threat Intelligence Sources

| Type            | Sources                        | Use                 |
| --------------- | ------------------------------ | ------------------- |
| **Strategic**   | Industry reports, geopolitical | Executive briefings |
| **Tactical**    | TTPs, malware analysis         | Detection rules     |
| **Operational** | IOCs, campaigns                | Active response     |
| **Technical**   | Signatures, hashes             | Automated blocking  |

For detailed incident response processes and SOC operations, see [Incident Response Reference](references/incident-response.md).

## References

- [Security Frameworks Reference](references/security-frameworks.md) - NIST, ISO 27001, CIS Controls, MITRE ATT&CK
- [Incident Response Reference](references/incident-response.md) - IR process, severity levels, SOC operations

---

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

## Static Application Security Testing (SAST)

| Tool           | Languages            | Integration          |
| -------------- | -------------------- | -------------------- |
| **Semgrep**    | 30+ languages        | CI/CD, IDE, CLI      |
| **CodeQL**     | C/C++, Java, JS, Python, Go | GitHub Actions  |
| **SonarQube**  | 30+ languages        | Self-hosted, CI/CD   |
| **Bandit**     | Python only          | CLI, CI/CD           |

```bash
# Semgrep (recommended - fast, customizable)
semgrep scan --config auto .
semgrep scan --config p/owasp-top-ten .
semgrep scan --config p/secrets .
```

---

## Dynamic Application Security Testing (DAST)

```bash
# OWASP ZAP baseline scan (passive, fast)
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
  -t https://your-app.com

# Full scan (active, thorough)
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py \
  -t https://your-app.com

# API scan
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-api-scan.py \
  -t https://your-app.com/openapi.json -f openapi
```

---

## Supply Chain Security

### Sigstore (Code Signing)

```bash
# Sign container images with cosign
cosign sign --key cosign.key docker.io/myapp:latest

# Verify signatures
cosign verify --key cosign.pub docker.io/myapp:latest
```

### SLSA (Supply-chain Levels for Software Artifacts)

| Level   | Requirements                                              |
| ------- | --------------------------------------------------------- |
| SLSA 1  | Build process documented                                  |
| SLSA 2  | Hosted build service, signed provenance                   |
| SLSA 3  | Hardened build platform, non-falsifiable provenance       |

### Dependency Management

```bash
# Lock dependencies and audit regularly
npm ci                    # Install from lockfile only
npm audit --audit-level=high
pip-audit
cargo audit
# Use Dependabot or Renovate for automated updates
```

---

## See Also

- [Fortune 50 Risk Management](../fortune50-risk-management/SKILL.md)
- [Fortune 50 Legal/Compliance](../fortune50-legal-compliance/SKILL.md)
- [Fortune 50 Operations](../fortune50-operations/SKILL.md)
