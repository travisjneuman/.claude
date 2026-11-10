---
name: security
description: Information security expertise for cybersecurity frameworks (NIST, ISO 27001), security architecture, incident response, vulnerability management, identity management, and cloud security. Use when designing security programs, responding to incidents, or assessing vulnerabilities.
---

# Information Security Expert

Comprehensive security frameworks for cybersecurity, incident response, and security architecture.

## Security Architecture

### Zero Trust Architecture

```
ZERO TRUST PRINCIPLES:
- Never trust, always verify
- Assume breach
- Verify explicitly
- Least privilege access
- Micro-segmentation

ZERO TRUST COMPONENTS:

IDENTITY:
- Strong authentication (MFA)
- Identity governance
- Privileged access management
- Continuous validation

DEVICES:
- Device health verification
- Endpoint detection and response
- Mobile device management
- Asset inventory

NETWORK:
- Micro-segmentation
- Software-defined perimeter
- Encrypted communications
- Network access control

APPLICATIONS:
- Application-level authentication
- API security
- Web application firewall
- Secure coding practices

DATA:
- Data classification
- Encryption at rest and in transit
- Data loss prevention
- Access controls
```

### Defense in Depth

```
SECURITY LAYERS:

PHYSICAL:
- Data center security
- Badge access
- Surveillance
- Environmental controls

PERIMETER:
- Firewalls
- IDS/IPS
- DMZ
- VPN

NETWORK:
- Segmentation
- Encryption
- Network monitoring
- NAC

HOST:
- Endpoint protection
- Host-based firewall
- Hardening
- Patch management

APPLICATION:
- WAF
- Secure coding
- Input validation
- Authentication

DATA:
- Encryption
- DLP
- Access controls
- Backup/recovery
```

### Cloud Security

| Domain         | Controls                            |
| -------------- | ----------------------------------- |
| **Identity**   | SSO, MFA, PAM, IAM policies         |
| **Compute**    | Hardened images, container security |
| **Network**    | VPC, security groups, WAF           |
| **Storage**    | Encryption, access policies, backup |
| **Logging**    | CloudTrail, SIEM integration        |
| **Compliance** | Config rules, automated remediation |

For detailed security frameworks (NIST, ISO 27001, CIS Controls, MITRE ATT&CK), see [Security Frameworks Reference](references/security-frameworks.md).

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/security/`).

| Topic | File | Covers |
| --- | --- | --- |
| Vulnerability Management | [`references/vulnerability-management.md`](references/vulnerability-management.md) | Vulnerability Management Process; CVSS Scoring; Patch Management |
| Identity & Access Management | [`references/identity-and-access-management.md`](references/identity-and-access-management.md) | IAM Framework; Privileged Access Management |
| Security Awareness | [`references/security-awareness.md`](references/security-awareness.md) | Security Training Program; Phishing Simulation |
| Security Metrics | [`references/security-metrics.md`](references/security-metrics.md) | Key Security Metrics; Security Dashboard |
| Threat Intelligence | [`references/threat-intelligence.md`](references/threat-intelligence.md) | Threat Intelligence Sources |
| OWASP Top 10 (with Code Examples) | [`references/owasp-top-10-with-code-examples.md`](references/owasp-top-10-with-code-examples.md) | 1. Broken Access Control; 2. Cryptographic Failures; 3. Injection; 4. Insecure Design; 5. Security Misconfiguration; 6. Vulnerable Components; and 4 more |
| Static Application Security Testing (SAST) | [`references/static-application-security-testing-sast.md`](references/static-application-security-testing-sast.md) | 18 lines |
| Dynamic Application Security Testing (DAST) | [`references/dynamic-application-security-testing-dast.md`](references/dynamic-application-security-testing-dast.md) | 18 lines |
| Supply Chain Security | [`references/supply-chain-security.md`](references/supply-chain-security.md) | Sigstore (Code Signing); SLSA (Supply-chain Levels for Software Artifacts); Dependency Management |

## References

- [Security Frameworks Reference](references/security-frameworks.md) - NIST, ISO 27001, CIS Controls, MITRE ATT&CK
- [Incident Response Reference](references/incident-response.md) - IR process, severity levels, SOC operations

---

## See Also

- [Risk Management](../risk-management/SKILL.md)
- [Legal/Compliance](../legal-compliance/SKILL.md)
- [Operations](../operations/SKILL.md)
