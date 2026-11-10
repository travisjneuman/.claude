# devops-cloud: Monitoring & Observability

Part of the `devops-cloud` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Monitoring & Observability

### Prometheus + Grafana

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "kubernetes-pods"
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
```

### Application Metrics

```typescript
// metrics.ts
import { Counter, Histogram, Registry } from "prom-client";

export const register = new Registry();

export const httpRequestsTotal = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "path", "status"],
  registers: [register],
});

export const httpRequestDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration",
  labelNames: ["method", "path"],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});
```

---
