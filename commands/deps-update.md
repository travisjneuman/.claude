---
description: Audit and update dependencies safely
arguments:
  - name: mode
    description: "Update mode: check | minor | major | security (default: check)"
    required: false
---

# Dependency Update Manager

Checks for outdated dependencies, identifies security advisories, tests compatibility, and creates an update plan.

---

## Execution Flow

### Step 1: Detect Package Manager

```bash
[ -f "pnpm-lock.yaml" ] && echo "PNPM"
[ -f "yarn.lock" ] && echo "YARN"
[ -f "bun.lockb" ] && echo "BUN"
[ -f "package-lock.json" ] && echo "NPM"
[ -f "requirements.txt" ] || [ -f "pyproject.toml" ] && echo "PIP"
[ -f "Pipfile" ] && echo "PIPENV"
[ -f "poetry.lock" ] && echo "POETRY"
[ -f "go.sum" ] && echo "GO"
[ -f "Cargo.lock" ] && echo "CARGO"
[ -f "Gemfile.lock" ] && echo "BUNDLER"
```

---

### Step 2: Check Outdated Dependencies

**Mode:** `{{mode}}` (default: `check`)

```bash
# Node.js
npm outdated --json 2>/dev/null

# Python
pip list --outdated --format=json 2>/dev/null

# Go
go list -u -m all 2>/dev/null

# Rust
cargo outdated 2>/dev/null
```

**Display as structured table:**

```
Outdated Dependencies
---------------------
Package          Current   Wanted    Latest    Type
react            18.2.0    18.3.1    19.0.0    dependencies
typescript       5.3.3     5.4.5     5.7.2     devDependencies
@types/node      20.10.0   20.14.2   22.10.1   devDependencies
eslint           8.56.0    8.57.1    9.15.0    devDependencies
```

---

### Step 3: Security Advisory Check

```bash
# Node.js
npm audit --json 2>/dev/null

# Python
pip-audit --format=json 2>/dev/null

# Go
govulncheck ./... 2>/dev/null

# Rust
cargo audit --json 2>/dev/null
```

**Flag security-critical updates:**

```
Security Advisories
-------------------
CRITICAL:
  express@4.17.1 -> 4.18.2 (CVE-2024-XXXX: Open Redirect)
  jsonwebtoken@8.5.1 -> 9.0.0 (CVE-2022-23529: Algorithm Confusion)

HIGH:
  axios@0.21.1 -> 1.6.0 (CVE-2023-45857: CSRF Bypass)
```

---

### Step 4: Run by Mode

#### check (default)

Report only. No changes made. Display outdated deps and advisories.

#### security

Update only packages with known security vulnerabilities:

```bash
# Node.js
npm audit fix

# Python
pip install --upgrade <package-with-advisory>

# Go
go get <module>@latest

# Rust
cargo update <crate>
```

After each update, run tests to verify nothing breaks.

#### minor

Update all packages to latest minor/patch versions (semver-safe):

```bash
# Node.js
npx npm-check-updates --target minor -u && npm install

# Python (with pip-tools)
pip-compile --upgrade && pip-sync

# Go
go get -u ./...

# Rust
cargo update
```

**After updating, run full verification:**

```bash
npm run test 2>/dev/null || pytest 2>/dev/null || go test ./... 2>/dev/null
npm run type-check 2>/dev/null || mypy src/ 2>/dev/null
npm run build 2>/dev/null || go build ./... 2>/dev/null
```

#### major

Create a staged update plan for major version bumps. Major updates require individual attention because they often include breaking changes.

**For each major update:**

1. Read the package's CHANGELOG or migration guide
2. Identify breaking changes relevant to the project
3. Estimate migration effort
4. Prioritize by security impact and maintenance burden

```
Major Update Plan
-----------------
Priority 1 (Security):
  [ ] express 4.x -> 5.x
      Breaking: Removed deprecated methods, new error handling
      Effort: Medium (2-4 hours)

Priority 2 (Maintenance):
  [ ] eslint 8.x -> 9.x
      Breaking: Flat config required, plugin API changes
      Effort: Large (4-8 hours)
```

**Update major versions one at a time**, running tests after each.

---

### Step 5: Compatibility Verification

After any updates:

```bash
# 1. Clean install
rm -rf node_modules && npm install

# 2. Type check
npm run type-check 2>/dev/null

# 3. Lint
npm run lint 2>/dev/null

# 4. Test
npm run test 2>/dev/null

# 5. Build
npm run build 2>/dev/null
```

**If any step fails:** Roll back the problematic update, report the incompatibility, and suggest resolution.

---

### Step 6: Summary Report

```
Dependency Update Report
========================
Mode:        {{mode}}
Manager:     <detected>

Before:
  Total deps:      X
  Outdated:        X
  Vulnerabilities: X (C critical, H high)

After:
  Updated:         X packages
  Remaining:       X outdated
  Vulnerabilities: X remaining

Verification:
  Tests:     PASS
  Types:     PASS
  Build:     PASS
  Lint:      PASS
```

---

## Safety Rules

- Always run tests after updates
- Never update all major versions at once
- Security updates take priority
- Keep lock files committed
- Document breaking changes encountered

---

_Part of the Ultimate Claude Code Toolkit_
