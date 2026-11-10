# security: Dynamic Application Security Testing (DAST)

Part of the `security` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

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
