# Deployment & CI/CD Workflow Guide

**When to use:** Setting up CI/CD pipelines, deployment strategies, or release processes.

---

## CI/CD Pipeline Stages

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Build   │───>│   Test   │───>│ Security │───>│  Stage   │───>│  Deploy  │
│          │    │          │    │          │    │          │    │          │
│ Install  │    │ Unit     │    │ Audit    │    │ Preview  │    │ Rolling  │
│ Compile  │    │ Integr.  │    │ SAST     │    │ Smoke    │    │ Monitor  │
│ Lint     │    │ E2E      │    │ Secrets  │    │ Approve  │    │ Rollback │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Stage Responsibilities

| Stage    | Purpose                        | Fails On                               |
| -------- | ------------------------------ | -------------------------------------- |
| Build    | Compile, lint, type-check      | Syntax errors, type errors, lint rules |
| Test     | Verify correctness             | Test failures, coverage below threshold|
| Security | Vulnerability scanning         | Critical/high vulnerabilities          |
| Stage    | Preview and smoke test         | Smoke test failures, manual rejection  |
| Deploy   | Ship to production             | Health check failures                  |

---

## GitHub Actions Patterns

### Basic CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type Check
        run: npm run type-check

      - name: Build
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
          retention-days: 1

  test:
    needs: build
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci

      - name: Unit Tests
        run: npm run test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage/lcov.info

  security:
    runs-on: ubuntu-latest
    timeout-minutes: 5

    steps:
      - uses: actions/checkout@v4

      - name: Audit dependencies
        run: npm audit --production --audit-level=high

      - name: Check for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          extra_args: --only-verified
```

### Deploy on Merge

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    environment: production

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci
      - run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"

      - name: Health Check
        run: |
          for i in $(seq 1 10); do
            if curl -sf https://example.com/api/health; then
              echo "Health check passed"
              exit 0
            fi
            echo "Attempt $i failed, retrying in 10s..."
            sleep 10
          done
          echo "Health check failed after 10 attempts"
          exit 1

      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {"text": "Deploy failed: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}"}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Preview Deployments

```yaml
# .github/workflows/preview.yml
name: Preview

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  preview:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci
      - run: npm run build

      - name: Deploy Preview
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

      - name: Comment PR with preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `Preview deployed: ${{ steps.deploy.outputs.preview-url }}`
            })
```

---

## GitLab CI Patterns

### Standard Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - quality
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "20"

cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/

quality:
  stage: quality
  image: node:${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run lint
    - npm run type-check

test:
  stage: test
  image: node:${NODE_VERSION}-alpine
  services:
    - postgres:16-alpine
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: test
    POSTGRES_PASSWORD: test
    DATABASE_URL: "postgres://test:test@postgres:5432/testdb"
  script:
    - npm ci
    - npm test -- --coverage
  coverage: /All files[^|]*\|[^|]*\s+([\d\.]+)/
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

build:
  stage: build
  image: node:${NODE_VERSION}-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week
  needs: [quality, test]

deploy-staging:
  stage: deploy
  script:
    - ./scripts/deploy.sh staging
  environment:
    name: staging
    url: https://staging.example.com
  needs: [build]
  only:
    - main

deploy-production:
  stage: deploy
  script:
    - ./scripts/deploy.sh production
  environment:
    name: production
    url: https://example.com
  needs: [deploy-staging]
  when: manual
  only:
    - main
```

---

## Deployment Strategies

### Rolling Deployment

Gradually replace old instances with new ones. Zero downtime if health checks pass.

```yaml
# Kubernetes rolling update
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

| Pros                          | Cons                              |
| ----------------------------- | --------------------------------- |
| Zero downtime                 | Slow rollout for many instances   |
| Simple to implement           | Two versions running simultaneously |
| Easy rollback                 | Migrations must be backward-compatible |

### Blue-Green Deployment

Run two identical environments. Switch traffic atomically.

```
           ┌─────────────┐
           │ Load Balancer│
           └──────┬──────┘
                  │
        ┌─────────┴─────────┐
        │                   │
  ┌─────┴─────┐      ┌─────┴─────┐
  │   Blue    │      │   Green   │
  │ (current) │      │  (new)    │
  │  v1.0.0   │      │  v1.1.0   │
  └───────────┘      └───────────┘
```

| Pros                            | Cons                              |
| ------------------------------- | --------------------------------- |
| Instant rollback (switch back)  | Double infrastructure cost        |
| Full testing before switch      | Database must support both versions |
| Zero downtime                   | More complex setup                |

### Canary Deployment

Route a small percentage of traffic to the new version, then gradually increase.

```
Traffic split:
  5% → v1.1.0 (canary)    ←  Monitor for 15 min
 95% → v1.0.0 (stable)

If metrics OK:
  25% → v1.1.0
  75% → v1.0.0             ←  Monitor for 30 min

If metrics OK:
  100% → v1.1.0            ←  Full rollout
```

| Pros                            | Cons                              |
| ------------------------------- | --------------------------------- |
| Minimal blast radius            | Complex routing setup             |
| Real traffic testing            | Longer rollout time               |
| Data-driven promotion           | Requires robust monitoring        |

### Choosing a Strategy

| Factor                  | Rolling     | Blue-Green | Canary     |
| ----------------------- | ----------- | ---------- | ---------- |
| Simplicity              | High        | Medium     | Low        |
| Rollback speed          | Minutes     | Seconds    | Seconds    |
| Infrastructure cost     | Low         | High       | Medium     |
| Risk tolerance          | Medium      | Low        | Lowest     |
| Best for                | Most apps   | Critical   | High-traffic |

---

## Rollback Procedures

### Automated Rollback

```yaml
- name: Deploy
  id: deploy
  run: ./scripts/deploy_to_production.sh

- name: Verify deployment
  id: verify
  run: |
    sleep 30
    if ! curl -sf https://example.com/api/health; then
      echo "Health check failed, rolling back"
      ./scripts/rollback_production.sh
      exit 1
    fi
```

### Manual Rollback Checklist

1. **Identify the issue** (health check failure, error spike, user reports)
2. **Decide: rollback or hotfix** (rollback if > 5 min to fix)
3. **Execute rollback**
   ```bash
   # Vercel
   vercel rollback

   # Docker/Kubernetes
   kubectl rollout undo deployment/app

   # Git-based (re-deploy previous commit)
   git revert HEAD && git push
   ```
4. **Verify rollback** (health checks, error rates, user flows)
5. **Notify team** (Slack, status page)
6. **Post-mortem** (root cause, prevention)

- [ ] Rollback procedure documented and tested
- [ ] Previous version always available for quick rollback
- [ ] Database migrations are backward-compatible (rollback-safe)
- [ ] Team knows how to trigger rollback manually

---

## Health Checks and Monitoring

### Health Check Endpoint

```typescript
// /api/health
app.get("/api/health", async (req, res) => {
  const checks = {
    server: "ok",
    database: "unknown",
    cache: "unknown",
  };

  try {
    await db.$queryRaw`SELECT 1`;
    checks.database = "ok";
  } catch {
    checks.database = "error";
  }

  try {
    await redis.ping();
    checks.cache = "ok";
  } catch {
    checks.cache = "error";
  }

  const allOk = Object.values(checks).every((v) => v === "ok");
  const status = allOk ? 200 : 503;

  res.status(status).json({
    status: allOk ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
});
```

### Key Metrics to Monitor

| Metric                | Target         | Alert Threshold   |
| --------------------- | -------------- | ----------------- |
| Error rate (5xx)      | < 0.1%         | > 1%              |
| Response time p95     | < 500ms        | > 2s              |
| CPU usage             | < 70%          | > 90%             |
| Memory usage          | < 80%          | > 90%             |
| Uptime                | > 99.9%        | Any downtime      |
| Deploy frequency      | Daily+         | < Weekly          |
| Mean time to recovery | < 30 min       | > 1 hour          |

- [ ] Health check endpoint deployed and monitored
- [ ] Error rate alerts configured
- [ ] Response time alerts configured
- [ ] Resource usage (CPU/memory) monitored
- [ ] Uptime monitoring from external service

---

## Environment Variable Management

### Environment Hierarchy

```
.env                  # Default values (committed, no secrets)
.env.local            # Local overrides (gitignored)
.env.development      # Dev-specific (committed, no secrets)
.env.production       # Prod-specific (committed, no secrets)
```

### Validation

```typescript
// Validate env vars at startup (fail fast)
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  REDIS_URL: z.string().url().optional(),
  PORT: z.coerce.number().default(3000),
});

export const env = envSchema.parse(process.env);
```

- [ ] All required env vars validated at startup
- [ ] Secrets stored in secrets manager (not committed)
- [ ] Different values per environment
- [ ] `.env.local` in `.gitignore`
- [ ] CI/CD secrets stored in platform (GitHub Secrets, etc.)

---

## Docker Deployment Patterns

### Multi-Stage Build

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

COPY --from=builder --chown=appuser:nodejs /app/dist ./dist
COPY --from=builder --chown=appuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:nodejs /app/package.json ./

USER appuser
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "dist/main.js"]
```

### Docker Compose (Development)

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app
      - REDIS_URL=redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 5s
      timeout: 5s
      retries: 5

  cache:
    image: redis:7-alpine

volumes:
  pgdata:
```

- [ ] Multi-stage Docker builds (small final image)
- [ ] Non-root user in production containers
- [ ] Health checks defined in Dockerfile
- [ ] `.dockerignore` excludes unnecessary files
- [ ] No secrets baked into images (use env vars at runtime)

---

## Platform-Specific Deployment

### Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "no-store" }
      ]
    }
  ]
}
```

### Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### AWS (ECS/Fargate)

```yaml
# Task definition (simplified)
containerDefinitions:
  - name: app
    image: 123456789.dkr.ecr.us-east-1.amazonaws.com/app:latest
    portMappings:
      - containerPort: 3000
    healthCheck:
      command: ["CMD-SHELL", "curl -f http://localhost:3000/api/health"]
      interval: 30
      timeout: 5
      retries: 3
    environment:
      - name: NODE_ENV
        value: production
    secrets:
      - name: DATABASE_URL
        valueFrom: arn:aws:secretsmanager:us-east-1:123456789:secret:db-url
```

---

## Pre-Deployment Checklist

- [ ] All tests pass in CI
- [ ] Security audit clean (no critical/high vulnerabilities)
- [ ] Database migrations backward-compatible
- [ ] Environment variables configured for target environment
- [ ] Health check endpoint deployed and responding
- [ ] Monitoring and alerting configured
- [ ] Rollback plan documented and tested
- [ ] Changelog or release notes prepared
- [ ] Team notified of deployment

---

## Related Skills

| Skill                | When to Use                  |
| -------------------- | ---------------------------- |
| `security`           | Deployment security          |
| `test-specialist`    | CI testing strategy          |
| `tech-debt-analyzer` | Pipeline optimization        |
| `api-designer`       | API deployment patterns      |

### Invoke with:

```
Skill(security)
Skill(test-specialist)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/rules/checklists/security-hardening.md` - Security checklist
- `~/.claude/rules/checklists/performance-optimization.md` - Performance
- `~/.claude/rules/tooling/troubleshooting.md` - Common issues

---

## Anti-Patterns

- [ ] Deploying without automated tests
- [ ] No rollback plan
- [ ] Secrets in source code or Docker images
- [ ] No health check endpoint
- [ ] Manual deployments to production
- [ ] No monitoring or alerting
- [ ] Database migrations that cannot be rolled back
- [ ] Deploying on Fridays without on-call coverage

---

_Automate everything. Test before deploy. Monitor after deploy. Always have a rollback plan._
