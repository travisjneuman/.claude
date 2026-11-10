# security: Static Application Security Testing (SAST)

Part of the `security` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Static Application Security Testing (SAST)

| Tool           | Languages            | Integration          |
| -------------- | -------------------- | -------------------- |
| **Semgrep**    | 30+ languages        | CI/CD, IDE, CLI      |
| **CodeQL**     | C/C++, Java, JS, Python, Go | GitHub Actions  |
| **SonarQube**  | 30+ languages        | Self-hosted, CI/CD   |
| **Bandit**     | Python only          | CLI, CI/CD           |

```bash
# Semgrep (recommended - fast, customizable)
semgrep scan --config auto .
semgrep scan --config p/owasp-top-ten .
semgrep scan --config p/secrets .
```

---
