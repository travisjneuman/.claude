# Monitoring & Alerting Design Checklist

**When to use:** Setting up observability infrastructure, defining SLOs, designing dashboards, or configuring alerting policies.

---

## SLO/SLI Definition

### Service Level Indicators (SLIs)

SLIs are the quantitative measures of your service's behavior. Choose SLIs that reflect what users actually experience.

| SLI Type      | Definition                                           | Measurement                                |
| ------------- | ---------------------------------------------------- | ------------------------------------------ |
| Availability  | Proportion of requests that succeed                  | `successful_requests / total_requests`     |
| Latency       | Proportion of requests faster than threshold         | `requests_under_Xms / total_requests`      |
| Error rate    | Proportion of requests that return errors            | `error_requests / total_requests`          |
| Throughput    | Rate of successful operations per time unit          | `successful_ops / second`                  |
| Freshness     | Proportion of data updated within threshold          | `fresh_records / total_records`            |
| Correctness   | Proportion of operations producing correct results   | `correct_results / total_results`          |

### Service Level Objectives (SLOs)

SLOs are the target values for your SLIs over a defined time window.

```
SLO Formula:
  SLI >= Target over Window

Examples:
  Availability >= 99.9% over 30 days
  Latency p99 <= 500ms over 7 days
  Error rate <= 0.1% over 30 days
```

### SLO Tiers

| Tier   | Availability | Monthly Downtime | Error Budget | Use Case                         |
| ------ | ------------ | ---------------- | ------------ | -------------------------------- |
| Tier 1 | 99.99%       | 4.3 minutes      | 0.01%        | Payment processing, auth         |
| Tier 2 | 99.9%        | 43.8 minutes     | 0.1%         | Core API, user-facing features   |
| Tier 3 | 99.5%        | 3.6 hours        | 0.5%         | Internal tools, batch processing |
| Tier 4 | 99%          | 7.3 hours        | 1%           | Dev environments, non-critical   |

### Error Budget

```
Error budget = 1 - SLO target

Example (99.9% SLO over 30 days):
  Error budget = 0.1% of 30 days = 43.2 minutes of downtime allowed
  Current burn: 15 minutes used → 28.2 minutes remaining

If error budget is exhausted:
  → Freeze feature releases
  → Focus on reliability work
  → Review recent deployments for contributors
```

- [ ] SLIs defined for each critical service
- [ ] SLOs set based on user expectations and business requirements
- [ ] Error budgets calculated and tracked
- [ ] SLO review cadence established (monthly or quarterly)
- [ ] Error budget policy documented (what happens when exhausted)
- [ ] SLO dashboard visible to engineering and product teams

---

## Metric Selection

### RED Method (Request-Driven Services)

Use RED for any service that handles requests (APIs, web servers, microservices).

| Metric   | What It Measures              | Example                                      |
| -------- | ----------------------------- | -------------------------------------------- |
| **R**ate | Requests per second           | `http_requests_total` by endpoint            |
| **E**rror | Errors per second / error %  | `http_requests_total{status=~"5.."}` / total |
| **D**uration | Request latency distribution | `http_request_duration_seconds` histogram   |

```promql
# Prometheus examples

# Rate: requests per second by endpoint
rate(http_requests_total[5m])

# Error rate: percentage of 5xx responses
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m])) * 100

# Duration: p99 latency
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))
```

- [ ] Rate tracked per endpoint and overall
- [ ] Error rate tracked per endpoint and overall
- [ ] Duration tracked as histogram (p50, p90, p95, p99)
- [ ] Metrics broken down by HTTP method, status code, endpoint

### USE Method (Infrastructure Resources)

Use USE for any physical or virtual resource (CPU, memory, disk, network).

| Metric          | What It Measures                     | Example                            |
| --------------- | ------------------------------------ | ---------------------------------- |
| **U**tilization | Percentage of resource in use        | CPU at 75%, disk at 60%            |
| **S**aturation  | Queue depth or work waiting          | Run queue length, swap usage       |
| **E**rrors      | Count of error events                | Disk errors, network packet drops  |

```promql
# CPU utilization
1 - avg(rate(node_cpu_seconds_total{mode="idle"}[5m]))

# Memory utilization
1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)

# Disk saturation (I/O wait)
rate(node_cpu_seconds_total{mode="iowait"}[5m])

# Network errors
rate(node_network_receive_errs_total[5m])
```

- [ ] Utilization tracked for CPU, memory, disk, network
- [ ] Saturation tracked (queue depths, swap usage)
- [ ] Error counts tracked for hardware and OS-level failures
- [ ] Resource metrics correlated with application metrics

### The Four Golden Signals (Google SRE)

For services where RED and USE overlap, Google SRE recommends these four:

| Signal     | Maps To   | Priority |
| ---------- | --------- | -------- |
| Latency    | RED (D)   | High     |
| Traffic    | RED (R)   | Medium   |
| Errors     | RED (E)   | High     |
| Saturation | USE (S)   | Medium   |

- [ ] All four golden signals measured for each service
- [ ] Latency measured as distributions, not averages
- [ ] Traffic baseline established (know what "normal" looks like)
- [ ] Saturation projected forward (capacity planning)

---

## Alerting Design

### Severity Levels

| Severity | Response Time    | Notification      | Examples                                         |
| -------- | ---------------- | ----------------- | ------------------------------------------------ |
| **P1**   | Immediate (< 5m) | Page on-call      | Service down, data loss, security breach          |
| **P2**   | Within 30 min    | Page on-call      | Partial outage, SLO burn rate critical            |
| **P3**   | Within 4 hours   | Slack/email       | Degraded performance, elevated error rate         |
| **P4**   | Next business day | Email/ticket      | Non-critical warnings, capacity approaching limit |

### Alerting Rules Best Practices

```yaml
# Good alert: symptom-based, high signal
- alert: HighErrorRate
  expr: |
    sum(rate(http_requests_total{status=~"5.."}[5m]))
    / sum(rate(http_requests_total[5m])) > 0.01
  for: 5m
  labels:
    severity: P2
  annotations:
    summary: "Error rate above 1% for 5 minutes"
    runbook: "https://wiki.example.com/runbooks/high-error-rate"
    dashboard: "https://grafana.example.com/d/api-overview"

# Bad alert: cause-based, noisy
- alert: HighCPU
  expr: node_cpu_utilization > 0.80
  # This fires constantly during normal load spikes
  # Better: alert on latency/errors that result from high CPU
```

### Alert Design Principles

| Principle                   | Description                                                     |
| --------------------------- | --------------------------------------------------------------- |
| Symptom over cause          | Alert on user-visible impact, not underlying cause              |
| Actionable                  | Every alert should have a clear action to take                  |
| Runbook linked              | Every alert links to a runbook with resolution steps            |
| Appropriate urgency         | Match notification channel to actual urgency                    |
| Minimal false positives     | Tune thresholds and `for` durations to avoid noise              |
| No duplicate alerts         | One symptom should fire one alert, not five                     |

- [ ] Every alert has a defined severity level
- [ ] Every alert links to a runbook or resolution guide
- [ ] Alerts are symptom-based (not cause-based)
- [ ] `for` duration set appropriately (avoid transient spikes triggering pages)
- [ ] Alert thresholds tuned from baseline data (not guessed)
- [ ] Alerts tested before going live (intentional failure injection)

### Alerting Fatigue Prevention

```
Signs of alert fatigue:
- On-call ignores or snoozes alerts
- Alert acknowledgment time increasing
- Pages during off-hours for non-urgent issues
- Same alerts fire and resolve repeatedly (flapping)
- More than 3 pages per on-call shift on average
```

| Problem          | Solution                                                         |
| ---------------- | ---------------------------------------------------------------- |
| Noisy alerts     | Increase `for` duration, tighten thresholds, aggregate           |
| Flapping alerts  | Add hysteresis (different thresholds for fire vs resolve)        |
| Non-actionable   | Downgrade to P4 or remove entirely                               |
| Duplicate alerts | Consolidate into a single alert with broader condition            |
| After-hours P3s  | Route P3/P4 to Slack/email only, never page                     |
| Too many pages   | Review and prune monthly; target < 2 pages per on-call shift    |

- [ ] On-call rotation defined and fair (no one person always paged)
- [ ] Quiet hours configured (P3/P4 suppressed outside business hours)
- [ ] Escalation policy defined (P1 escalates after 15 min if unacknowledged)
- [ ] Alert volume reviewed monthly (prune stale or noisy alerts)
- [ ] On-call handoff process defined (context transfer between shifts)
- [ ] On-call compensation policy documented

### Escalation Policies

```
P1 Escalation:
  0 min  → Page primary on-call
  10 min → Page secondary on-call (if unacknowledged)
  20 min → Page engineering manager
  30 min → Page VP of Engineering

P2 Escalation:
  0 min  → Page primary on-call
  30 min → Page secondary on-call (if unacknowledged)
  60 min → Slack engineering manager

P3/P4:
  0 min  → Slack notification to team channel
  No escalation (resolved during business hours)
```

- [ ] Escalation policy configured in PagerDuty/Opsgenie/VictorOps
- [ ] Primary and secondary on-call defined
- [ ] Manager escalation for unacknowledged critical alerts
- [ ] Escalation tested (fire test alert, verify routing)

---

## Dashboard Design

### Dashboard Hierarchy

```
Level 1: Executive Overview
├── Service health (green/yellow/red)
├── SLO compliance (% of target met)
├── Error budget remaining
└── Key business metrics

Level 2: Service Overview
├── RED metrics per service
├── Deployment markers
├── Error rate by endpoint
└── Latency percentiles (p50, p90, p99)

Level 3: Service Detail
├── Individual endpoint metrics
├── Database query performance
├── Cache hit rates
├── Dependency health
└── Resource utilization (USE)

Level 4: Debug / Investigation
├── Log aggregation
├── Trace search
├── Flame graphs
└── Raw metric exploration
```

### Dashboard Design Principles

| Principle             | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| Audience-appropriate  | Executive dashboards differ from on-call dashboards             |
| Top-down navigation   | Start high-level, drill down to details                         |
| Consistent layout     | Same metrics in same positions across service dashboards        |
| Deployment annotations| Vertical lines marking deploy times for correlation             |
| Meaningful defaults   | Default time range matches typical investigation window (1-6 hours) |
| No vanity metrics     | Every panel answers a question someone actually asks            |

### Grafana Dashboard Template

```json
{
  "panels": [
    {
      "title": "Request Rate",
      "description": "Requests per second across all endpoints",
      "type": "timeseries",
      "gridPos": { "h": 8, "w": 8, "x": 0, "y": 0 }
    },
    {
      "title": "Error Rate (%)",
      "description": "Percentage of 5xx responses",
      "type": "timeseries",
      "gridPos": { "h": 8, "w": 8, "x": 8, "y": 0 },
      "thresholds": [
        { "value": 1, "color": "yellow" },
        { "value": 5, "color": "red" }
      ]
    },
    {
      "title": "Latency Percentiles",
      "description": "p50, p90, p99 response times",
      "type": "timeseries",
      "gridPos": { "h": 8, "w": 8, "x": 16, "y": 0 }
    }
  ]
}
```

- [ ] Executive dashboard with SLO compliance and service health
- [ ] Service-level dashboards with RED metrics
- [ ] Infrastructure dashboards with USE metrics
- [ ] Deployment annotations visible on all dashboards
- [ ] Dashboard variables for filtering (environment, service, region)
- [ ] Dashboards version-controlled (Grafana provisioning, Terraform)
- [ ] Dashboard loading time acceptable (< 5 seconds)

---

## Incident Correlation

### Correlation Strategy

When investigating incidents, correlate across these dimensions:

| Dimension  | What to Check                                        |
| ---------- | ---------------------------------------------------- |
| Time       | What changed at the time the issue started?          |
| Deployment | Was there a recent deploy? Check deployment markers  |
| Dependency | Are upstream/downstream services healthy?            |
| Resource   | Is any infrastructure resource saturated?            |
| Traffic    | Is there a traffic spike or unusual pattern?         |
| Config     | Was there a configuration change?                    |

### Runbook Template

```markdown
# Runbook: [Alert Name]

## Alert Description
[What this alert means in plain language]

## Impact
[What users experience when this fires]

## Severity
[P1/P2/P3/P4]

## Diagnosis Steps
1. Check [dashboard link] for current state
2. Check [dependency] health: `curl https://dependency/health`
3. Check recent deployments: `git log --oneline -5`
4. Check resource utilization: [dashboard link]
5. Check logs: `[log query]`

## Resolution Steps

### If caused by deployment:
1. Roll back: `kubectl rollout undo deployment/app`
2. Verify recovery on dashboard
3. Investigate root cause post-incident

### If caused by traffic spike:
1. Scale up: `kubectl scale deployment/app --replicas=5`
2. Enable rate limiting if not active
3. Monitor for recovery

### If caused by dependency failure:
1. Check dependency status page
2. Enable circuit breaker if available
3. Activate fallback/degraded mode
4. Communicate to stakeholders

## Escalation
- If unresolved after 15 min: escalate to [team/person]
- If data loss suspected: escalate to P1 immediately

## Post-Incident
- File incident report
- Schedule postmortem within 48 hours
```

- [ ] Runbooks exist for all P1 and P2 alerts
- [ ] Runbooks include specific commands and dashboard links
- [ ] Runbooks reviewed and updated quarterly
- [ ] New alerts always created with accompanying runbook
- [ ] Runbooks tested during game days / chaos engineering

---

## Tooling Patterns

### Prometheus + Grafana Stack

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alerts/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets: ["alertmanager:9093"]

scrape_configs:
  - job_name: "app"
    metrics_path: "/metrics"
    static_configs:
      - targets: ["app:8080"]

  - job_name: "node"
    static_configs:
      - targets: ["node-exporter:9100"]
```

```yaml
# alertmanager.yml
route:
  receiver: "default"
  group_by: ["alertname", "service"]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h

  routes:
    - match:
        severity: P1
      receiver: "pagerduty-critical"
      repeat_interval: 5m

    - match:
        severity: P2
      receiver: "pagerduty-warning"
      repeat_interval: 15m

    - match:
        severity: P3
      receiver: "slack-engineering"

receivers:
  - name: "pagerduty-critical"
    pagerduty_configs:
      - service_key: "<PAGERDUTY_KEY>"
        severity: "critical"

  - name: "slack-engineering"
    slack_configs:
      - api_url: "<SLACK_WEBHOOK>"
        channel: "#engineering-alerts"
```

### DataDog Patterns

```python
# Custom metric emission
from datadog import statsd

# Counter
statsd.increment("api.requests", tags=["endpoint:users", "method:GET"])

# Histogram (timing)
statsd.histogram("api.latency", response_time, tags=["endpoint:users"])

# Gauge
statsd.gauge("queue.depth", queue.size(), tags=["queue:emails"])

# Monitor definition (via Terraform)
resource "datadog_monitor" "high_error_rate" {
  name    = "High Error Rate - API"
  type    = "metric alert"
  query   = "sum(last_5m):sum:api.errors{env:production}.as_rate() / sum:api.requests{env:production}.as_rate() > 0.01"
  message = <<-EOT
    Error rate is above 1% for the last 5 minutes.
    Runbook: https://wiki.example.com/runbooks/high-error-rate
    @pagerduty-critical
  EOT

  thresholds = {
    critical = 0.01
    warning  = 0.005
  }

  notify_no_data    = true
  no_data_timeframe = 10
  renotify_interval = 15
  tags              = ["service:api", "env:production"]
}
```

### Application-Level Instrumentation

```typescript
// Express middleware for RED metrics
import { Counter, Histogram } from "prom-client";

const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e9;
    const route = req.route?.path || req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route,
      status: res.statusCode,
    });

    httpRequestDuration.observe(
      { method: req.method, route, status: res.statusCode },
      duration,
    );
  });

  next();
});

// Expose /metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
```

---

## Structured Logging for Observability

```typescript
// Structured JSON logging (for log aggregation)
import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  formatters: {
    level: (label) => ({ level: label }),
  },
});

// Log with context
logger.info(
  { requestId: req.id, userId: user.id, endpoint: req.path },
  "Request processed successfully",
);

logger.error(
  { requestId: req.id, error: err.message, stack: err.stack },
  "Request failed",
);
```

- [ ] Logs are structured (JSON format, not free text)
- [ ] Logs include correlation IDs (request ID, trace ID)
- [ ] Log levels used appropriately (debug, info, warn, error)
- [ ] Sensitive data excluded from logs (passwords, tokens, PII)
- [ ] Logs aggregated centrally (ELK, Loki, CloudWatch, DataDog)
- [ ] Log retention policy defined (30-90 days typical)

---

## Distributed Tracing

```
Trace:
├── Span: API Gateway (12ms)
│   ├── Span: Auth Middleware (2ms)
│   └── Span: Route Handler (8ms)
│       ├── Span: Database Query (3ms)
│       ├── Span: Cache Lookup (1ms)
│       └── Span: External API Call (4ms)
```

- [ ] Tracing SDK integrated (OpenTelemetry, Jaeger, Zipkin)
- [ ] Trace context propagated across service boundaries
- [ ] Sampling rate configured (100% in dev, 1-10% in production)
- [ ] Trace IDs included in logs for correlation
- [ ] Slow trace alerts configured (p99 > threshold)
- [ ] Trace data retention policy defined

---

## Pre-Production Monitoring Checklist

Before shipping to production, verify:

- [ ] SLIs defined and measurable
- [ ] SLOs set and error budgets calculated
- [ ] RED metrics exposed from application
- [ ] USE metrics collected from infrastructure
- [ ] Alerting rules configured for P1 and P2 scenarios
- [ ] Runbooks written for all critical alerts
- [ ] Dashboards created (executive, service, debug levels)
- [ ] On-call rotation established
- [ ] Escalation policies configured
- [ ] Structured logging in place with correlation IDs
- [ ] Distributed tracing configured (if microservices)
- [ ] Health check endpoint responding correctly

---

## Related Skills

| Skill                        | When to Use                        |
| ---------------------------- | ---------------------------------- |
| `monitoring-observability`   | Deep observability patterns        |
| `devops-cloud`               | Cloud-specific monitoring setup    |
| `security`                   | Security monitoring and alerting   |
| `tech-debt-analyzer`         | Monitoring infrastructure quality  |
| `api-designer`               | API metrics instrumentation        |

### Invoke with:

```
Skill(monitoring-observability)
Skill(devops-cloud)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules
- `~/.claude/rules/workflows/deployment-cicd.md` - CI/CD and deployment
- `~/.claude/docs/reference/checklists/api-development.md` - API design
- `~/.claude/docs/reference/checklists/performance-optimization.md` - Performance targets
- `~/.claude/docs/reference/checklists/security-hardening.md` - Security monitoring
- `~/.claude/templates/incident-response-template.md` - Incident playbook

---

## Anti-Patterns

- [ ] Alerting on causes instead of symptoms (alert on high CPU instead of high latency)
- [ ] No runbooks linked to alerts (on-call has no guidance)
- [ ] Alerting on averages instead of percentiles (p99 hides in averages)
- [ ] Too many alerts (alert fatigue, on-call ignores pages)
- [ ] No SLOs defined (no way to measure if service is "good enough")
- [ ] Dashboards with no deployment annotations (can't correlate deploys to issues)
- [ ] Logs as free-text strings (impossible to query at scale)
- [ ] Monitoring only added after incidents (reactive, not proactive)
- [ ] Same dashboard for executives and engineers (wrong audience)
- [ ] No log or trace retention policy (storage costs spiral)
- [ ] Ignoring error budgets (deploying freely even when budget exhausted)

---

_Monitor what users experience. Alert on symptoms, not causes. Every alert must be actionable._
