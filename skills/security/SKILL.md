---
name: security
description: Information security expertise for cybersecurity frameworks (NIST, ISO 27001), security architecture, incident response, vulnerability management, identity management, and cloud security. Use when designing security programs, responding to incidents, or assessing vulnerabilities.
---

# Information Security Expert

Comprehensive security frameworks for cybersecurity, incident response, and security architecture.

## Security Frameworks

### NIST Cybersecurity Framework

```
CORE FUNCTIONS:

IDENTIFY:
- Asset management
- Business environment
- Governance
- Risk assessment
- Risk management strategy

PROTECT:
- Access control
- Awareness and training
- Data security
- Information protection
- Maintenance
- Protective technology

DETECT:
- Anomalies and events
- Security continuous monitoring
- Detection processes

RESPOND:
- Response planning
- Communications
- Analysis
- Mitigation
- Improvements

RECOVER:
- Recovery planning
- Improvements
- Communications

MATURITY TIERS:
Tier 1: Partial
Tier 2: Risk Informed
Tier 3: Repeatable
Tier 4: Adaptive
```

### ISO 27001 Controls

| Domain | Key Controls |
|--------|--------------|
| **A.5 Security Policies** | Information security policy |
| **A.6 Organization** | Roles, mobile, telework |
| **A.7 Human Resources** | Screening, awareness, termination |
| **A.8 Asset Management** | Inventory, classification, handling |
| **A.9 Access Control** | Policy, user management, system access |
| **A.10 Cryptography** | Encryption, key management |
| **A.11 Physical Security** | Perimeter, equipment, clear desk |
| **A.12 Operations** | Procedures, change, capacity |
| **A.13 Communications** | Network, transfer |
| **A.14 Development** | SDLC, test data |
| **A.15 Suppliers** | Third-party security |
| **A.16 Incident Management** | Reporting, response |
| **A.17 Business Continuity** | Redundancy, recovery |
| **A.18 Compliance** | Legal, reviews |

### CIS Critical Controls

```
BASIC CONTROLS (1-6):
1. Inventory of Hardware Assets
2. Inventory of Software Assets
3. Continuous Vulnerability Management
4. Controlled Use of Admin Privileges
5. Secure Configuration
6. Maintenance, Monitoring, Analysis of Audit Logs

FOUNDATIONAL CONTROLS (7-16):
7. Email and Web Browser Protections
8. Malware Defenses
9. Limitation of Network Ports, Protocols
10. Data Recovery Capabilities
11. Secure Network Configuration
12. Boundary Defense
13. Data Protection
14. Controlled Access Based on Need to Know
15. Wireless Access Control
16. Account Monitoring and Control

ORGANIZATIONAL CONTROLS (17-20):
17. Security Awareness Training
18. Application Software Security
19. Incident Response and Management
20. Penetration Testing
```

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

| Domain | Controls |
|--------|----------|
| **Identity** | SSO, MFA, PAM, IAM policies |
| **Compute** | Hardened images, container security |
| **Network** | VPC, security groups, WAF |
| **Storage** | Encryption, access policies, backup |
| **Logging** | CloudTrail, SIEM integration |
| **Compliance** | Config rules, automated remediation |

## Incident Response

### Incident Response Process

```
PHASES:

1. PREPARATION
   - IR team and roles
   - Communication plans
   - Tools and runbooks
   - Training and exercises

2. IDENTIFICATION
   - Detection mechanisms
   - Alert triage
   - Scope assessment
   - Evidence preservation

3. CONTAINMENT
   - Short-term containment
   - System backup
   - Long-term containment
   - Network isolation

4. ERADICATION
   - Malware removal
   - Root cause elimination
   - Vulnerability patching
   - System hardening

5. RECOVERY
   - System restoration
   - Data restoration
   - Validation testing
   - Monitoring enhancement

6. LESSONS LEARNED
   - Post-incident review
   - Documentation
   - Process improvement
   - Report generation
```

### Incident Severity Levels

| Level | Definition | Response Time | Escalation |
|-------|------------|---------------|------------|
| **P1 Critical** | Active breach, major impact | Immediate | CISO, Legal, Exec |
| **P2 High** | Imminent threat, significant risk | 1 hour | Security Director |
| **P3 Medium** | Potential threat, moderate impact | 4 hours | Security Manager |
| **P4 Low** | Minor issue, limited impact | 24 hours | Security Team |

### Security Operations Center (SOC)

```
SOC FUNCTIONS:

MONITORING:
- 24/7 alert monitoring
- Log analysis
- Threat hunting
- Anomaly detection

INVESTIGATION:
- Alert triage
- Incident analysis
- Forensic investigation
- Threat intelligence

RESPONSE:
- Incident containment
- Remediation coordination
- Communication
- Documentation

IMPROVEMENT:
- Playbook development
- Detection tuning
- Process optimization
- Metrics reporting

SOC METRICS:
- Mean Time to Detect (MTTD)
- Mean Time to Respond (MTTR)
- Alert volume and false positive rate
- Incidents by type and severity
```

## Vulnerability Management

### Vulnerability Management Process

```
LIFECYCLE:

1. DISCOVERY
   - Asset inventory
   - Vulnerability scanning
   - Penetration testing
   - Code analysis

2. PRIORITIZATION
   - CVSS scoring
   - Asset criticality
   - Exploit availability
   - Business context

3. REMEDIATION
   - Patch management
   - Configuration changes
   - Compensating controls
   - Risk acceptance

4. VERIFICATION
   - Rescan
   - Validation testing
   - Documentation
   - Reporting

5. REPORTING
   - Executive dashboards
   - Trend analysis
   - Compliance reporting
   - SLA tracking
```

### CVSS Scoring

| Score | Severity | SLA Target |
|-------|----------|------------|
| 9.0-10.0 | Critical | 7 days |
| 7.0-8.9 | High | 30 days |
| 4.0-6.9 | Medium | 90 days |
| 0.1-3.9 | Low | Best effort |

### Patch Management

```
PATCH PROCESS:

1. IDENTIFICATION
   - Vendor announcements
   - Vulnerability feeds
   - Security bulletins

2. ASSESSMENT
   - Applicability
   - Risk evaluation
   - Test requirements

3. TESTING
   - Lab validation
   - Compatibility testing
   - Rollback planning

4. DEPLOYMENT
   - Pilot group
   - Phased rollout
   - Monitoring

5. VERIFICATION
   - Confirm installation
   - Functional testing
   - Documentation
```

## Identity & Access Management

### IAM Framework

```
IAM COMPONENTS:

IDENTITY LIFECYCLE:
- Provisioning
- Modification
- De-provisioning
- Certification

AUTHENTICATION:
- Password policies
- Multi-factor authentication
- Single sign-on
- Passwordless

AUTHORIZATION:
- Role-based access (RBAC)
- Attribute-based access (ABAC)
- Least privilege
- Separation of duties

GOVERNANCE:
- Access reviews
- Policy enforcement
- Audit logging
- Compliance reporting
```

### Privileged Access Management

```
PAM CONTROLS:

VAULT:
- Credential storage
- Password rotation
- Secrets management

SESSION:
- Session recording
- Just-in-time access
- Time-limited credentials

MONITORING:
- Activity logging
- Behavioral analytics
- Alert on anomalies

GOVERNANCE:
- Access certification
- Policy enforcement
- Compliance reporting
```

## Security Awareness

### Security Training Program

| Topic | Frequency | Audience |
|-------|-----------|----------|
| **New Hire Security** | Onboarding | All employees |
| **Annual Refresh** | Annually | All employees |
| **Phishing Awareness** | Quarterly | All employees |
| **Developer Security** | Annually | Development team |
| **Executive Briefings** | Quarterly | Leadership |
| **Role-Based** | As needed | Specific roles |

### Phishing Simulation

```
SIMULATION PROGRAM:

FREQUENCY: Monthly

DIFFICULTY LEVELS:
- Easy: Generic, obvious errors
- Medium: Branded, some personalization
- Hard: Targeted, well-crafted

METRICS:
- Click rate
- Report rate
- Training completion
- Trend over time

RESPONSE:
- Click → Immediate training
- Report → Positive reinforcement
- Repeat offenders → Additional training
```

## Security Metrics

### Key Security Metrics

| Category | Metric | Target |
|----------|--------|--------|
| **Vulnerability** | Critical vulns open >30 days | 0 |
| **Patching** | Systems patched within SLA | 95%+ |
| **Incidents** | Mean time to detect | <24 hours |
| **Access** | Orphan accounts | 0 |
| **Training** | Completion rate | 95%+ |
| **Phishing** | Click rate | <5% |

### Security Dashboard

```
EXECUTIVE DASHBOARD:

RISK POSTURE:
- Overall risk score
- Risk trend
- Top risks

COMPLIANCE:
- Framework coverage
- Audit findings
- Remediation status

OPERATIONS:
- Incident summary
- Vulnerability status
- Patching compliance

INVESTMENT:
- Budget utilization
- Tool effectiveness
- Headcount
```

## Threat Intelligence

### Threat Intelligence Sources

| Type | Sources | Use |
|------|---------|-----|
| **Strategic** | Industry reports, geopolitical | Executive briefings |
| **Tactical** | TTPs, malware analysis | Detection rules |
| **Operational** | IOCs, campaigns | Active response |
| **Technical** | Signatures, hashes | Automated blocking |

### MITRE ATT&CK Framework

```
ATTACK PHASES:

RECONNAISSANCE: Gather information
RESOURCE DEVELOPMENT: Obtain tools/infrastructure
INITIAL ACCESS: Get into network
EXECUTION: Run malicious code
PERSISTENCE: Maintain access
PRIVILEGE ESCALATION: Gain higher access
DEFENSE EVASION: Avoid detection
CREDENTIAL ACCESS: Steal credentials
DISCOVERY: Learn environment
LATERAL MOVEMENT: Move through network
COLLECTION: Gather target data
COMMAND AND CONTROL: Communicate with compromised systems
EXFILTRATION: Steal data
IMPACT: Damage/disrupt
```

## See Also

- [Fortune 50 Risk Management](../fortune50-risk-management/SKILL.md)
- [Fortune 50 Legal/Compliance](../fortune50-legal-compliance/SKILL.md)
- [Fortune 50 Operations](../fortune50-operations/SKILL.md)
