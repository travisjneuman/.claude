---
description: Deploy application with pre/post-deploy checks
arguments:
  - name: target
    description: "Deployment target: vercel | docker | aws | netlify"
    required: true
  - name: environment
    description: "Target environment: staging | production (default: staging)"
    required: false
---

# Deploy Application

Runs a full deployment pipeline: pre-flight checks, build, deploy, health verification, and status report.

---

## Execution Flow

### Step 1: Pre-Flight Checks

Before deploying, verify the codebase is ready:

```bash
# Ensure clean working tree
git status --porcelain

# Run tests
npm run test 2>/dev/null || pytest 2>/dev/null || go test ./... 2>/dev/null || echo "NO_TEST_RUNNER"

# Run type checks (if applicable)
npm run type-check 2>/dev/null || npx tsc --noEmit 2>/dev/null || mypy src/ 2>/dev/null || echo "NO_TYPE_CHECK"

# Run linter
npm run lint 2>/dev/null || ruff check . 2>/dev/null || golangci-lint run 2>/dev/null || echo "NO_LINTER"
```

**If any check fails:** Stop deployment, report the failure, and suggest fixes.

---

### Step 2: Detect Environment

**Target:** `{{target}}`
**Environment:** `{{environment}}` (default: `staging`)

If environment is `production`, add an extra confirmation step:

```
WARNING: You are deploying to PRODUCTION.
Confirm: Have tests passed? Is this change reviewed?
```

---

### Step 3: Build

```bash
# Build the project
npm run build 2>/dev/null || python -m build 2>/dev/null || go build ./... 2>/dev/null || cargo build --release 2>/dev/null
```

**If build fails:** Stop. Report error with context.

---

### Step 4: Deploy by Target

#### Vercel

```bash
# Staging
npx vercel --confirm

# Production
npx vercel --prod --confirm
```

**Pre-requisites:** `vercel` CLI installed, project linked (`vercel link`).

#### Docker

```bash
# Build image
docker build -t app:latest .

# Tag for registry
docker tag app:latest registry.example.com/app:$(git rev-parse --short HEAD)

# Push
docker push registry.example.com/app:$(git rev-parse --short HEAD)

# Deploy (compose)
docker compose -f docker-compose.{{environment}}.yml up -d
```

**Pre-requisites:** `Dockerfile` exists, Docker daemon running.

#### AWS

```bash
# Detect AWS deployment type
[ -f "serverless.yml" ] && echo "SERVERLESS"
[ -f "cdk.json" ] && echo "CDK"
[ -f "template.yaml" ] && echo "SAM"
[ -f "copilot/.workspace" ] && echo "COPILOT"

# Serverless Framework
npx sls deploy --stage {{environment}}

# AWS CDK
npx cdk deploy --require-approval never

# AWS SAM
sam build && sam deploy --no-confirm-changeset

# AWS Copilot
copilot deploy --env {{environment}}
```

**Pre-requisites:** AWS credentials configured, deployment framework installed.

#### Netlify

```bash
# Build and deploy
npx netlify deploy --build

# Production
npx netlify deploy --build --prod
```

**Pre-requisites:** `netlify` CLI installed, site linked (`netlify link`).

---

### Step 5: Post-Deploy Health Check

After deployment completes:

```bash
# Wait for deployment to propagate
sleep 10

# Check deployment URL health
DEPLOY_URL="<extracted from deploy output>"
curl -sf "$DEPLOY_URL" -o /dev/null && echo "HEALTHY" || echo "UNHEALTHY"

# Check HTTP status
curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_URL"
```

**If unhealthy:** Report failure. Suggest rollback command for the target platform.

---

### Step 6: Report Status

Generate a deployment summary:

```
Deployment Summary
------------------
Target:      {{target}}
Environment: {{environment}}
Branch:      <current branch>
Commit:      <short SHA + message>
Status:      SUCCESS / FAILED
URL:         <deployment URL>
Duration:    <elapsed time>
```

---

## Rollback Commands

If deployment fails or issues are found post-deploy:

| Target  | Rollback Command                                    |
| ------- | --------------------------------------------------- |
| Vercel  | `vercel rollback`                                   |
| Docker  | `docker compose -f docker-compose.yml rollback`     |
| AWS     | `npx sls rollback` / `cdk destroy` / `sam rollback` |
| Netlify | `netlify deploy --prod --alias previous`            |

---

## Safety Rules

- Never deploy with failing tests
- Never deploy to production without explicit confirmation
- Always verify health after deployment
- Keep rollback commands ready
- Log all deployments for audit trail

---

_Part of the Ultimate Claude Code Toolkit_
