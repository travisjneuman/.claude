# security: Supply Chain Security

Part of the `security` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

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
