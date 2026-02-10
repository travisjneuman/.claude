# Release Checklist: [Version X.Y.Z]

**Release Date:** [YYYY-MM-DD]
**Release Manager:** [Name]
**Release Type:** [Major / Minor / Patch / Hotfix]
**Target Environment:** [Production / Staging / Both]
**Release Branch/Tag:** [e.g., v2.4.0 or release/2.4.0]

---

## Release Summary

[1-2 paragraphs describing what is included in this release: new features, bug fixes, improvements, breaking changes.]

### Changes Included

| Type         | Description                        | PR/Commit           |
| ------------ | ---------------------------------- | ------------------- |
| Feature      | [Description]                      | [#PR or commit]     |
| Bug Fix      | [Description]                      | [#PR or commit]     |
| Improvement  | [Description]                      | [#PR or commit]     |
| Breaking     | [Description]                      | [#PR or commit]     |
| Security     | [Description]                      | [#PR or commit]     |

---

## Pre-Deploy Checks

### Code Quality

- [ ] All CI checks passing on release branch
- [ ] Code review completed and approved for all included PRs
- [ ] No unresolved merge conflicts
- [ ] No `TODO` or `FIXME` comments related to release-blocking issues
- [ ] No `console.log` / debug statements in production code

### Testing

- [ ] Unit tests passing: `npm run test` / `pytest` / `go test ./...`
- [ ] Integration tests passing
- [ ] E2E tests passing on staging environment
- [ ] Manual QA completed for new features
- [ ] Regression testing completed for affected areas
- [ ] Performance testing completed (if applicable)
- [ ] Accessibility testing completed (if UI changes)

| Test Suite        | Status  | Pass Rate | Notes                       |
| ----------------- | ------- | --------- | --------------------------- |
| Unit tests        | [ ]     | [X/Y]     | [Any skipped tests noted]   |
| Integration tests | [ ]     | [X/Y]     |                             |
| E2E tests         | [ ]     | [X/Y]     |                             |
| Performance tests | [ ]     | [Pass/Fail]|                            |

### Type Safety and Linting

- [ ] TypeScript type check passing: `npm run type-check`
- [ ] Linter passing: `npm run lint` / `ruff check .` / `cargo clippy`
- [ ] No new type warnings introduced
- [ ] Build succeeds without errors: `npm run build`

### Security

- [ ] Dependency audit clean: `npm audit` / `pip-audit` / `cargo audit`
- [ ] No critical or high vulnerabilities in production dependencies
- [ ] No new secrets or credentials in codebase
- [ ] Security-sensitive changes reviewed by security team (if applicable)
- [ ] OWASP checks passed for new endpoints (if applicable)
- [ ] CSP headers updated if new external resources added

### Dependencies

- [ ] `package-lock.json` / `poetry.lock` / `Cargo.lock` committed
- [ ] No unintended dependency upgrades
- [ ] New dependencies reviewed for license compatibility
- [ ] New dependencies reviewed for maintenance status (not abandoned)

### Database

- [ ] Database migrations tested against production-like data
- [ ] Migrations are backward-compatible (can roll back without data loss)
- [ ] Migration rollback tested: `npx prisma migrate reset` / `alembic downgrade -1`
- [ ] No destructive migrations without explicit backup confirmation
- [ ] Large data migrations run in batches (no table locks)
- [ ] Indexes created with `CONCURRENTLY` where applicable

### Configuration

- [ ] Environment variables documented for any new config
- [ ] Feature flags configured for gradual rollout (if applicable)
- [ ] API versioning updated if breaking changes present
- [ ] CORS configuration updated if new origins needed
- [ ] Rate limiting rules updated if new endpoints added

---

## Deploy Steps

### Pre-Deploy

```bash
# 1. Create release tag
git tag -a v[X.Y.Z] -m "Release v[X.Y.Z]"
git push origin v[X.Y.Z]

# 2. Verify build artifacts
[Platform-specific build command]

# 3. Take database backup (if applicable)
[Backup command or verify automated backup ran]
```

- [ ] Release tag created and pushed
- [ ] Build artifacts generated and verified
- [ ] Database backup completed (if database changes included)
- [ ] On-call engineer notified of upcoming deployment
- [ ] Status page prepared for update (if significant release)

### Staging Deployment

- [ ] Deployed to staging environment
- [ ] Staging smoke tests passing (see matrix below)
- [ ] Staging environment matches production configuration
- [ ] QA sign-off on staging
- [ ] No unexpected errors in staging logs

### Production Deployment

**Deploy Method:** [Blue-green / Rolling / Canary / Direct]

```bash
# Deploy command (platform-specific)
[e.g., vercel --prod]
[e.g., eas update --branch production]
[e.g., kubectl apply -f k8s/production/]
[e.g., git push heroku main]
```

- [ ] Production deployment initiated
- [ ] Deployment completed without errors
- [ ] Health check endpoint responding: `curl https://[domain]/api/health`
- [ ] Database migrations applied successfully (if applicable)
- [ ] CDN cache invalidated (if static assets changed)

---

## Smoke Test Matrix

Run these tests immediately after deployment to verify core functionality.

### Critical Path Tests (Must Pass)

| Test                                 | Expected Result              | Status |
| ------------------------------------ | ---------------------------- | ------ |
| Homepage loads                       | 200 OK, content renders      | [ ]    |
| Login flow works                     | User can authenticate        | [ ]    |
| Core feature [X] works              | [Expected behavior]          | [ ]    |
| Core feature [Y] works              | [Expected behavior]          | [ ]    |
| API health check responds           | 200 OK, all checks healthy   | [ ]    |
| Static assets loading (CSS, JS, images) | No 404s, correct versions | [ ]    |

### Secondary Tests (Should Pass)

| Test                                 | Expected Result              | Status |
| ------------------------------------ | ---------------------------- | ------ |
| User registration flow              | New account created          | [ ]    |
| Payment flow (if applicable)         | Test transaction succeeds    | [ ]    |
| Email delivery (if applicable)       | Test email received          | [ ]    |
| Push notifications (if applicable)   | Test notification received   | [ ]    |
| Search functionality                 | Results returned correctly   | [ ]    |
| File upload (if applicable)          | Upload succeeds              | [ ]    |

### API Endpoint Verification

```bash
# Health check
curl -sf https://[domain]/api/health | jq .

# Auth endpoint
curl -sf -X POST https://[domain]/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"[test-password]"}'

# Core endpoint
curl -sf https://[domain]/api/[endpoint] \
  -H "Authorization: Bearer [token]" | jq .
```

- [ ] All critical path smoke tests passing
- [ ] All secondary smoke tests passing (or known issues documented)
- [ ] API endpoints responding with correct status codes
- [ ] No new errors in application logs

---

## Rollback Criteria

**Rollback immediately if ANY of the following occur:**

- [ ] Error rate exceeds 5% (baseline: [X]%)
- [ ] p95 latency exceeds 2x baseline (baseline: [X]ms)
- [ ] Health check endpoint returns non-200
- [ ] Critical user flow broken (login, checkout, core feature)
- [ ] Data integrity issue detected
- [ ] Security vulnerability discovered in release
- [ ] Crash rate exceeds 2% (mobile apps)

### Rollback Procedure

```bash
# Option 1: Revert to previous version
[e.g., vercel rollback]
[e.g., kubectl rollout undo deployment/app]
[e.g., git revert HEAD && git push]

# Option 2: Deploy previous known-good version
[e.g., eas update:rollback --branch production]
[e.g., docker pull app:v[previous-version] && docker-compose up -d]

# Option 3: Feature flag disable
[e.g., Disable feature flag "new-checkout-flow" in LaunchDarkly]

# After rollback:
# 1. Verify service recovery (run smoke tests again)
# 2. Notify team via Slack
# 3. Update status page if it was updated
# 4. File incident report if user-facing impact occurred
```

- [ ] Rollback procedure tested before release
- [ ] Previous version available for quick deployment
- [ ] Database rollback plan verified (if migrations included)
- [ ] Feature flags ready to disable (if applicable)
- [ ] Rollback decision maker identified: [Name]

### Rollback Decision Flow

```
Issue Detected
  ↓
Is it a P1/P2 (service down or significantly degraded)?
  YES → Rollback immediately, investigate later
  NO  ↓
Can it be fixed with a hotfix in < 30 minutes?
  YES → Apply hotfix, monitor
  NO  → Rollback, investigate, re-release
```

---

## Post-Deploy Monitoring

### First 30 Minutes

- [ ] Error rate dashboard open and monitored
- [ ] Latency dashboard open and monitored
- [ ] Application logs tailed for new errors
- [ ] Infrastructure metrics stable (CPU, memory, connections)
- [ ] No alert notifications triggered

### First 2 Hours

- [ ] Error rate at or below baseline
- [ ] Latency at or below baseline
- [ ] No crash reports from new version (mobile)
- [ ] User feedback channels monitored (support tickets, social)
- [ ] Database performance stable (no slow queries from migration)

### First 24 Hours

- [ ] No trending increase in error rate
- [ ] No memory leaks or resource exhaustion
- [ ] Cron jobs / scheduled tasks running correctly
- [ ] Background workers processing normally
- [ ] No unexpected cost increase in infrastructure

### Key Metrics to Watch

| Metric                   | Baseline   | Alert Threshold | Current | Status |
| ------------------------ | ---------- | --------------- | ------- | ------ |
| Error rate (5xx)         | [X]%       | > [Y]%          | [Z]%    | [ ]    |
| Response time p95        | [X]ms      | > [Y]ms         | [Z]ms   | [ ]    |
| Response time p99        | [X]ms      | > [Y]ms         | [Z]ms   | [ ]    |
| Request rate             | [X] req/s  | < [Y] req/s     | [Z]     | [ ]    |
| CPU utilization          | [X]%       | > [Y]%          | [Z]%    | [ ]    |
| Memory utilization       | [X]%       | > [Y]%          | [Z]%    | [ ]    |
| Database connections     | [X]        | > [Y]           | [Z]     | [ ]    |
| Queue depth (if applicable)| [X]      | > [Y]           | [Z]     | [ ]    |

---

## Sign-Off

All sign-offs must be completed before the release is considered final.

| Role                     | Name     | Date     | Approval    | Notes             |
| ------------------------ | -------- | -------- | ----------- | ----------------- |
| Release Manager          | [Name]   | [Date]   | [ ] Approved |                  |
| QA Lead                  | [Name]   | [Date]   | [ ] Approved |                  |
| Engineering Lead         | [Name]   | [Date]   | [ ] Approved |                  |
| Product Owner            | [Name]   | [Date]   | [ ] Approved |                  |
| On-Call Engineer         | [Name]   | [Date]   | [ ] Notified |                  |

### Post-Release Tasks

- [ ] Release notes published (GitHub release, changelog, blog post)
- [ ] Internal announcement sent (Slack, email)
- [ ] Documentation updated for new features
- [ ] Customer-facing changelog updated (if applicable)
- [ ] Feature flags cleaned up (remove old flags for fully-rolled-out features)
- [ ] Monitoring dashboards updated for new metrics (if applicable)
- [ ] This checklist archived in `docs/releases/v[X.Y.Z].md`

---

## Emergency Hotfix Process

For critical issues discovered post-release that cannot wait for the next release cycle:

1. **Assess severity** (use incident severity classification)
2. **Branch from release tag:** `git checkout -b hotfix/v[X.Y.Z+1] v[X.Y.Z]`
3. **Apply minimal fix** (smallest possible change to resolve the issue)
4. **Test:** Run full test suite + manual verification of the fix
5. **Security review** (if security-related)
6. **Deploy to staging** and verify
7. **Deploy to production** with same monitoring procedure
8. **Merge back to main:** `git checkout main && git merge hotfix/v[X.Y.Z+1]`
9. **Tag and release:** `git tag -a v[X.Y.Z+1] -m "Hotfix: [description]"`
10. **File incident report** if user-facing impact occurred

---

## Release Timing Guidelines

| Day           | Release? | Reason                                                    |
| ------------- | -------- | --------------------------------------------------------- |
| Monday        | OK       | Full week to monitor and respond                          |
| Tuesday       | Best     | Settle-in day, full support coverage                      |
| Wednesday     | OK       | Mid-week, good coverage                                   |
| Thursday      | Caution  | Limited time to respond before weekend                    |
| Friday        | Avoid    | Weekend coverage usually reduced                          |
| Weekend       | Hotfix only | Only for critical fixes with on-call coverage          |
| Before holiday| Avoid    | Reduced staffing during holiday period                    |

---

## Related Documentation

- `~/.claude/rules/workflows/deployment-cicd.md` - CI/CD pipeline setup
- `~/.claude/rules/checklists/monitoring-alerting-design.md` - Monitoring setup
- `~/.claude/rules/checklists/security-hardening.md` - Security review
- `~/.claude/rules/checklists/mobile-app-deployment.md` - Mobile-specific release steps
- `~/.claude/templates/incident-response-template.md` - If something goes wrong
- `~/.claude/CLAUDE.md` - Core rules

---

_Release with confidence: test thoroughly, deploy carefully, monitor closely, roll back quickly._
