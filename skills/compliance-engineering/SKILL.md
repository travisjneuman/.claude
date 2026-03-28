---
name: compliance-engineering
description: SOC2, HIPAA, GDPR, PCI-DSS, FedRAMP compliance implementation in code. Audit logging, data encryption, access controls, privacy by design, and regulatory requirement mapping. Use when implementing compliance controls, preparing for audits, or building privacy-compliant systems.
---

# Compliance Engineering

## Framework Overview

| Framework | Scope | Key Requirements |
|-----------|-------|-----------------|
| **SOC 2** | Service organizations | Security, availability, confidentiality, privacy, processing integrity |
| **HIPAA** | Healthcare data (PHI) | Encryption, access controls, audit logging, BAAs |
| **GDPR** | EU personal data | Consent, data minimization, right to erasure, DPIAs |
| **PCI-DSS** | Payment card data | Network segmentation, encryption, access controls, logging |
| **FedRAMP** | US government cloud | NIST 800-53 controls, continuous monitoring, authorization |

## SOC 2 Controls in Code

### Audit Logging
```typescript
interface AuditEvent {
  timestamp: string;
  actor: { id: string; role: string; ip: string };
  action: string;
  resource: { type: string; id: string };
  outcome: 'success' | 'failure';
  metadata: Record<string, unknown>;
}

async function auditLog(event: AuditEvent): Promise<void> {
  // Write-once, append-only storage (immutable)
  await auditStore.append({
    ...event,
    timestamp: new Date().toISOString(),
    hash: computeChainHash(event), // tamper detection
  });
}
```

### Access Control
```typescript
// RBAC with principle of least privilege
const permissions = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read'],
} as const;

function authorize(user: User, action: string, resource: Resource): boolean {
  const allowed = permissions[user.role];
  if (!allowed?.includes(action)) {
    auditLog({ action, outcome: 'failure', actor: user, resource });
    return false;
  }
  return true;
}
```

## HIPAA Technical Safeguards

- **Encryption at rest:** AES-256 for PHI storage, AWS KMS / GCP KMS for key management
- **Encryption in transit:** TLS 1.2+ mandatory, certificate pinning for mobile
- **Access controls:** Unique user IDs, automatic logoff, MFA required
- **Audit controls:** Log all PHI access, retain logs 6+ years, tamper-evident
- **Data backup:** Encrypted backups, tested restore procedures, geographic redundancy

## GDPR Implementation

### Consent Management
```typescript
interface ConsentRecord {
  userId: string;
  purpose: string;
  granted: boolean;
  timestamp: string;
  source: 'explicit' | 'legitimate_interest';
  withdrawable: boolean;
}

// Data Subject Access Request (DSAR)
async function handleDSAR(userId: string, type: 'access' | 'erasure' | 'portability') {
  switch (type) {
    case 'access': return await exportUserData(userId); // JSON/CSV
    case 'erasure': return await deleteUserData(userId); // Right to be forgotten
    case 'portability': return await exportPortableData(userId); // Machine-readable
  }
}
```

### Data Minimization
- Collect only what's needed for the stated purpose
- Set retention policies with automatic deletion
- Pseudonymize where possible (replace PII with tokens)
- Anonymize for analytics (k-anonymity, differential privacy)

## PCI-DSS Key Controls
- **Never store CVV/CVC** — ever, in any form
- **Tokenize card numbers** — use Stripe/Braintree tokens instead of raw PANs
- **Network segmentation** — isolate cardholder data environment (CDE)
- **Quarterly vulnerability scans** — ASV-approved external scans
- **Penetration testing** — annual at minimum, after significant changes

## Compliance as Code
- **Policy as code:** Open Policy Agent (OPA), AWS Config Rules, Azure Policy
- **Infrastructure compliance:** Terraform Sentinel, Checkov, tfsec
- **Runtime compliance:** Falco for container monitoring, AWS GuardDuty
- **Evidence collection:** Automated screenshot/log collection for audit evidence
