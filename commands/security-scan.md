---
description: Run security audit on codebase
arguments:
  - name: scope
    description: "Scan scope: deps | code | secrets | all (default: all)"
    required: false
---

# Security Scan

Runs a comprehensive security audit covering dependency vulnerabilities, code patterns, and secret detection.

---

## Execution Flow

### Step 1: Detect Project Type

```bash
[ -f "package.json" ] && echo "NODE"
[ -f "requirements.txt" ] || [ -f "pyproject.toml" ] && echo "PYTHON"
[ -f "go.mod" ] && echo "GO"
[ -f "Cargo.toml" ] && echo "RUST"
[ -f "Gemfile" ] && echo "RUBY"
```

---

### Step 2: Run Scans by Scope

**Scope:** `{{scope}}` (default: `all`)

#### deps - Dependency Vulnerabilities

```bash
# Node.js
npm audit --json 2>/dev/null

# Python
pip audit 2>/dev/null || safety check 2>/dev/null

# Go
govulncheck ./... 2>/dev/null

# Rust
cargo audit 2>/dev/null
```

**Report format:**

```
Dependency Vulnerabilities
--------------------------
CRITICAL (2):
  - lodash@4.17.20 - Prototype Pollution (CVE-2021-23337)
    Fix: npm install lodash@4.17.21
  - express@4.17.1 - Open Redirect (CVE-2024-XXXX)
    Fix: npm install express@4.18.2

HIGH (1):
  - jsonwebtoken@8.5.1 - Algorithm Confusion (CVE-2022-23529)
    Fix: npm install jsonwebtoken@9.0.0

MODERATE (3):
  ...
```

#### code - Code Pattern Analysis

Scan source code for common vulnerability patterns using the Grep tool:

**Injection Vulnerabilities:**

- SQL Injection: string concatenation or template literals in database queries
- XSS: use of innerHTML, unsafe HTML rendering in frameworks, v-html directives
- Command Injection: spawning shell processes with unsanitized user input, subprocess with shell=True, unsafe system calls

**Authentication Issues:**

- Hardcoded credentials: password/secret string literal assignments in source
- Weak crypto: usage of md5 or sha1 for security-sensitive operations
- Insecure randomness: Math.random used for tokens or secrets
- Missing auth decorators: public route annotations on sensitive endpoints

**Data Exposure:**

- Sensitive data in logs: password/token/secret in logging calls
- CORS misconfiguration: wildcard origins, overly permissive CORS settings
- Missing security headers: no Content-Security-Policy, no X-Frame-Options

**Report each finding with:**
- File path and line number
- Severity (Critical / High / Medium / Low)
- Description of the vulnerability
- Suggested fix

#### secrets - Secret Detection

Scan for accidentally committed secrets using Grep tool:

- AWS Access Keys (AKIA prefix followed by 16 alphanumeric chars)
- OpenAI/Stripe keys (sk- prefix)
- GitHub PATs (ghp_ prefix)
- GitHub OAuth tokens (gho_ prefix)
- GitLab PATs (glpat- prefix)
- Slack tokens (xox prefix variants)
- Private keys (BEGIN PRIVATE KEY headers)
- JWTs embedded in source code

Exclude common false positive locations: node_modules, .git, lock files, minified JS, test fixtures with placeholder keys.

**Check .gitignore coverage:**

Verify that .env, .env.local, .env.production, credentials.json, and serviceAccount.json are properly gitignored.

---

### Step 3: OWASP Top 10 Check

Cross-reference findings against OWASP Top 10 (2021):

| #   | Category                          | Status |
| --- | --------------------------------- | ------ |
| A01 | Broken Access Control             | [ ]    |
| A02 | Cryptographic Failures            | [ ]    |
| A03 | Injection                         | [ ]    |
| A04 | Insecure Design                   | [ ]    |
| A05 | Security Misconfiguration         | [ ]    |
| A06 | Vulnerable Components             | [ ]    |
| A07 | Authentication Failures           | [ ]    |
| A08 | Software/Data Integrity Failures  | [ ]    |
| A09 | Logging/Monitoring Failures       | [ ]    |
| A10 | Server-Side Request Forgery       | [ ]    |

---

### Step 4: Summary Report

```
Security Scan Report
====================
Scope:       {{scope}}
Project:     <detected type>
Scanned:     <file count> files

Findings:
  Critical:  X
  High:      X
  Medium:    X
  Low:       X
  Info:      X

Top Priority Fixes:
  1. [Critical] Update lodash to 4.17.21 (CVE-2021-23337)
  2. [Critical] Remove hardcoded API key in src/config.ts:15
  3. [High] Add input sanitization in src/api/users.ts:42

Recommendations:
  - [ ] Run npm audit fix to resolve N dependency issues
  - [ ] Add .env to .gitignore
  - [ ] Replace unsafe HTML rendering with safe text content methods
  - [ ] Enable CSP headers
  - [ ] Add rate limiting to authentication endpoints
```

---

## Automated Fix Suggestions

For each finding, provide a concrete fix with before/after code showing the secure alternative.

---

## Related Skills

| Skill      | When to Use                    |
| ---------- | ------------------------------ |
| `security` | Deep security analysis         |

---

_Part of the Ultimate Claude Code Toolkit_
