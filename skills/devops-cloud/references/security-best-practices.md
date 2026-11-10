# devops-cloud: Security Best Practices

Part of the `devops-cloud` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Security Best Practices

### Secrets Management

```bash
# AWS Secrets Manager
aws secretsmanager create-secret \
  --name prod/db-credentials \
  --secret-string '{"username":"admin","password":"xxx"}'

# Kubernetes Secrets (external-secrets)
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  secretStoreRef:
    kind: ClusterSecretStore
    name: aws-secrets
  target:
    name: db-credentials
  data:
    - secretKey: username
      remoteRef:
        key: prod/db-credentials
        property: username
```

### Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432
```

---
