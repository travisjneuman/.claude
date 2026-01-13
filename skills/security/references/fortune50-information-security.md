# Fortune 50 Information Security Expert

## Description

Enterprise-grade information security expertise for Fortune 50 organizations. Provides comprehensive guidance on cybersecurity frameworks (NIST CSF 2.0, ISO 27001, CIS Controls), security architecture patterns including Zero Trust, incident response procedures, vulnerability management, identity and access management, cloud security, and compliance. Enables Fortune 50-level security decision-making with frameworks, checklists, and response playbooks based on 2025 industry standards.

## Trigger Conditions

Use this skill when the user needs help with:

- Cybersecurity framework selection, implementation, or compliance (NIST, ISO 27001, CIS, COBIT)
- Security architecture design including Zero Trust implementation
- Incident response planning, execution, or post-mortem analysis
- Vulnerability management and patch management strategies
- Identity and access management (IAM) or privileged access management (PAM)
- Cloud security architecture for AWS, Azure, or GCP
- Security compliance requirements and audits
- Threat modeling exercises (STRIDE, DREAD, PASTA)
- Security risk assessments and mitigation strategies
- Security operations center (SOC) design and optimization
- Security policy development and governance

## Core Knowledge Base

### 1. CYBERSECURITY FRAMEWORKS

#### NIST Cybersecurity Framework (CSF) 2.0

**Overview:** Universal framework with 6 core functions applicable to all organizations, not just critical infrastructure. Updated April 2025.

**Six Core Functions:**

1. **GOVERN** (New in 2.0): Cybersecurity as board-level enterprise risk
   - Establish cybersecurity risk management strategy
   - Define organizational context and expectations
   - Set policy and oversight mechanisms
   - Integrate cybersecurity into enterprise risk management

2. **IDENTIFY**: Understand organizational context and cybersecurity risks
   - Asset management
   - Business environment
   - Governance
   - Risk assessment
   - Risk management strategy
   - Supply chain risk management

3. **PROTECT**: Implement appropriate safeguards
   - Identity management and access control
   - Awareness and training
   - Data security
   - Information protection processes
   - Maintenance
   - Protective technology

4. **DETECT**: Identify cybersecurity events
   - Anomalies and events
   - Security continuous monitoring
   - Detection processes

5. **RESPOND**: Take action regarding detected cybersecurity incidents
   - Response planning
   - Communications
   - Analysis
   - Mitigation
   - Improvements

6. **RECOVER**: Maintain resilience and restore capabilities
   - Recovery planning
   - Improvements
   - Communications

**Implementation Levels:**

- **Tier 1 - Partial**: Ad hoc, reactive risk management
- **Tier 2 - Risk Informed**: Risk management practices approved but not organization-wide
- **Tier 3 - Repeatable**: Organization-wide approach with regular updates
- **Tier 4 - Adaptive**: Continuous improvement based on lessons learned

**Best Use Cases:**

- Organizations starting cybersecurity risk management programs
- U.S. government contractors and critical infrastructure
- Organizations recovering from data breaches
- Businesses needing board-level security communication

**Resources:**

- NIST SP 800-61r3 (Incident Response - April 2025 update)
- NIST SP 800-53 (Security and Privacy Controls)
- NIST SP 800-137 (Information Security Continuous Monitoring)

---

#### ISO/IEC 27001:2022

**Overview:** International standard for Information Security Management Systems (ISMS). Certifiable standard with 93 controls across 4 themes.

**Core Components:**

1. **Organizational Controls** (37 controls)
   - Information security policies
   - Organization of information security
   - Human resource security
   - Asset management
   - Access control
   - Supplier relationships

2. **People Controls** (8 controls)
   - Before employment screening
   - Terms and conditions of employment
   - Information security awareness, education, and training
   - Disciplinary process

3. **Physical Controls** (14 controls)
   - Physical security perimeters
   - Physical entry controls
   - Securing offices, rooms, and facilities
   - Equipment security

4. **Technological Controls** (34 controls)
   - User endpoint devices
   - Privileged access rights
   - Information access restriction
   - Access to source code
   - Secure authentication
   - Cryptography
   - Secure development lifecycle
   - Security testing in development
   - Outsourced development
   - Network security
   - Monitoring, logging, and detection

**ISMS Implementation Process:**

1. **Define Scope**: Determine boundaries and applicability
2. **Conduct Risk Assessment**: Identify assets, threats, vulnerabilities
3. **Establish Risk Treatment Plan**: Accept, mitigate, transfer, or avoid
4. **Implement Controls**: Deploy from Annex A control set
5. **Internal Audit**: Verify ISMS effectiveness
6. **Management Review**: Ensure continual improvement
7. **External Certification**: Third-party audit (optional but recommended)

**Best Use Cases:**

- Organizations with international operations
- Businesses requiring formal certification
- Operationally mature enterprises
- Companies needing market differentiation
- Organizations with contractual certification requirements

**Framework Overlap:**

- ISO 27001 certification = ~83% of NIST CSF requirements
- NIST CSF compliance = ~61% of ISO 27001 requirements

---

#### CIS Controls v8

**Overview:** Prioritized set of 18 technical best practices organized into Implementation Groups (IGs).

**Implementation Groups:**

- **IG1** (Basic Cyber Hygiene): 56 safeguards for small organizations with limited resources
- **IG2** (Enhanced Security): 74 additional safeguards for organizations managing sensitive data
- **IG3** (Advanced Protection): 23 additional safeguards for high-security environments

**Top 5 Critical Controls:**

1. **Inventory and Control of Enterprise Assets**
   - Maintain accurate asset inventory
   - Address unauthorized assets
   - Update asset inventory

2. **Inventory and Control of Software Assets**
   - Establish software inventory
   - Address unauthorized software
   - Utilize application allowlisting

3. **Data Protection**
   - Establish data management process
   - Classify sensitive data
   - Protect sensitive data

4. **Secure Configuration of Enterprise Assets and Software**
   - Establish secure configuration process
   - Maintain secure configurations
   - Automate configuration management

5. **Account Management**
   - Use unique credentials
   - Establish account lifecycle management
   - Disable dormant accounts

**Best Use Cases:**

- Organizations prioritizing technical implementation
- Security teams needing actionable guidance
- Companies with limited security resources
- Technical security benchmarking

---

#### COBIT 2019

**Overview:** IT governance framework from ISACA focusing on enterprise governance of information and technology.

**Core Components:**

- **Governance Objectives** (5): Evaluate, Direct, Monitor (EDM)
- **Management Objectives** (40): Plan, Build, Run, Monitor (PBRM)

**Best Use Cases:**

- IT risk management programs
- Organizations needing governance and management separation
- Enterprises with complex IT environments
- Integration with COSO ERM frameworks

---

### 2. ZERO TRUST ARCHITECTURE (ZTA)

#### Core Principles

**"Never Trust, Always Verify"**

Zero Trust operates on the assumption that threats exist both inside and outside traditional network perimeters. No user, device, or network is implicitly trusted.

**7 Key Components (2025):**

1. **Identity Verification**
   - Multi-factor authentication (MFA) - hardware tokens (FIDO2/WebAuthn) preferred
   - Phishing-resistant authentication methods
   - Passwordless authentication (biometrics, hardware keys)
   - Continuous authentication and re-verification

2. **Device Security**
   - Device health checks before access
   - Endpoint detection and response (EDR)
   - Mobile device management (MDM)
   - Compliance verification (OS version, patch level, encryption status)

3. **Network Segmentation**
   - Microsegmentation to limit lateral movement
   - Software-defined perimeter (SDP)
   - Zero Trust Network Access (ZTNA) replacing traditional VPNs
   - Network traffic inspection and filtering

4. **Least Privilege Access**
   - Just-in-time (JIT) access provisioning
   - Just-enough-access (JEA) permissions
   - Privileged access management (PAM)
   - Time-bound access grants

5. **Continuous Monitoring**
   - Real-time security analytics
   - User and entity behavior analytics (UEBA)
   - Security information and event management (SIEM)
   - Threat intelligence integration

6. **Data Security**
   - Data classification and labeling
   - Encryption at rest and in transit
   - Data loss prevention (DLP)
   - Information rights management (IRM)

7. **Automation and Orchestration**
   - Security orchestration, automation, and response (SOAR)
   - Automated policy enforcement
   - AI/ML for threat detection and response
   - Automated incident response workflows

**Implementation Roadmap:**

**Phase 1: Foundation (Months 1-3)**

- [ ] Identify protect surface (critical data, applications, assets, services)
- [ ] Map transaction flows for protect surface
- [ ] Deploy enhanced identity verification (MFA, passwordless)
- [ ] Establish baseline network visibility
- [ ] Define initial access policies

**Phase 2: Deployment (Months 4-9)**

- [ ] Implement microsegmentation for protect surface
- [ ] Deploy ZTNA solutions for remote access
- [ ] Enable continuous monitoring and logging
- [ ] Establish security operations playbooks
- [ ] Integrate threat intelligence feeds

**Phase 3: Optimization (Months 10-18)**

- [ ] Expand microsegmentation across entire network
- [ ] Implement automated policy enforcement
- [ ] Deploy AI/ML-based anomaly detection
- [ ] Establish continuous compliance monitoring
- [ ] Conduct regular zero trust maturity assessments

**Fortune 50 ZTA Statistics (2025):**

- 70% of new remote access deployments use ZTNA vs. VPNs (Gartner)
- $1.5M average savings per breach with Zero Trust implementation (IBM)
- 24 Fortune 50 companies collaborated on NIST ZTA implementation guide
- Zero Trust market: $19.2B (2024) → $85B projected (2034), 17.4% CAGR

**NIST SP 800-207 ZTA Deployment Models:**

- **Enhanced Identity Governance** (EIG)
- **Logical Microsegmentation**
- **Network-based Segmentation**
- **Software-Defined Perimeter** (SDP)
- **Secure Access Service Edge** (SASE)

---

### 3. INCIDENT RESPONSE

#### NIST SP 800-61r3 Framework (Updated April 2025)

**Key Changes in Revision 3:**

- Alignment with NIST CSF 2.0
- Expanded team model beyond dedicated "incident handlers"
- Shared responsibility model for outsourced security operations
- Integration across all six CSF functions (not just Detect/Respond/Recover)

**Six-Function Incident Response Model:**

**GOVERN:**

- Establish incident response strategy and expectations
- Define roles, responsibilities, and authority
- Communicate incident response policy organization-wide
- Monitor incident response program effectiveness

**IDENTIFY:**

- Asset inventory and criticality classification
- Business impact analysis for key systems
- Risk assessment for potential incident scenarios
- Threat intelligence collection and analysis

**PROTECT:**

- Implement preventive controls
- Security awareness training
- Vulnerability remediation
- Access control hardening

**DETECT:**

- Security monitoring and alerting
- Anomaly detection
- Threat hunting
- User and entity behavior analytics (UEBA)

**RESPOND:**

- Incident triage and prioritization
- Containment strategy execution
- Evidence collection and preservation
- Eradication of threat actor presence
- Communication and coordination

**RECOVER:**

- System restoration and validation
- Business operations resumption
- Post-incident activity monitoring
- Documentation and reporting

---

#### Incident Response Lifecycle

**Phase 1: PREPARATION**

**Team Structure (Expanded Model - 2025):**

- **Core Incident Response Team:**
  - Incident Response Manager
  - Security Analysts (Tier 1, 2, 3)
  - Forensics Specialists
  - Threat Intelligence Analysts

- **Extended Response Team:**
  - Executive Leadership (CEO, CISO, CIO)
  - Legal Counsel (privacy, regulatory, litigation)
  - Public Relations / Corporate Communications
  - Human Resources
  - IT Operations
  - Application Development Teams
  - Business Unit Representatives
  - Third-party Security Partners (SOC, MDR providers)

**Preparation Checklist:**

- [ ] Incident response plan documented and approved
- [ ] Incident response playbooks for common scenarios
- [ ] Contact lists current (internal and external)
- [ ] Communication templates prepared
- [ ] Incident response tools deployed and tested
- [ ] Logging and monitoring configured
- [ ] Forensic capabilities established
- [ ] Backup and recovery procedures verified
- [ ] Tabletop exercises conducted quarterly
- [ ] Incident response training completed annually
- [ ] Retainer agreements with external support vendors
- [ ] Cyber insurance policy reviewed and current

**Critical Tools:**

- SIEM (Splunk, QRadar, Sentinel, Chronicle)
- EDR/XDR (CrowdStrike, SentinelOne, Microsoft Defender)
- Network traffic analysis (Zeek, Suricata, Darktrace)
- Forensic imaging (FTK Imager, dd, Velociraptor)
- Memory analysis (Volatility, Rekall)
- Malware analysis sandbox (Cuckoo, Any.Run, Joe Sandbox)
- Threat intelligence platform (MISP, ThreatConnect, Anomali)
- Case management (TheHive, RTIR, ServiceNow)

---

**Phase 2: DETECTION AND ANALYSIS**

**Detection Sources:**

- SIEM alerts and correlation rules
- EDR/XDR detections
- Intrusion detection/prevention systems (IDS/IPS)
- Antivirus/antimalware alerts
- Data loss prevention (DLP) alerts
- Cloud access security broker (CASB) alerts
- Threat intelligence feeds
- Security awareness program reports
- External notifications (law enforcement, security researchers, customers)

**Initial Triage (First 15 minutes):**

1. **Collect Basic Information:**
   - Date/time of detection
   - Source of detection
   - Type of suspected incident
   - Affected systems/users
   - Initial indicators of compromise (IOCs)

2. **Determine Severity:**
   - **CRITICAL**: Active data exfiltration, ransomware deployment, critical system compromise
   - **HIGH**: Confirmed compromise of sensitive systems, active threat actor presence
   - **MEDIUM**: Suspicious activity with potential for escalation
   - **LOW**: Policy violation, minimal security impact

3. **Assign Initial Response:**
   - CRITICAL → Senior analysts + IR Manager notification
   - HIGH → Experienced analyst + escalation path ready
   - MEDIUM → Standard analyst assignment
   - LOW → Queue for routine investigation

**Analysis Process:**

**Evidence Collection:**

- [ ] Preserve volatile data (memory, network connections, running processes)
- [ ] Collect system logs (application, security, system)
- [ ] Capture network traffic (full packet capture if possible)
- [ ] Document system state (screenshots, running services, scheduled tasks)
- [ ] Gather threat intelligence on observed IOCs
- [ ] Maintain chain of custody documentation

**Indicator Analysis:**

- **Network IOCs**: IP addresses, domains, URLs, SSL certificates
- **Host IOCs**: File hashes, registry keys, file paths, mutexes
- **Behavioral IOCs**: Command-line patterns, process injection, privilege escalation
- **Contextual Analysis**: User behavior, access patterns, data flows

**Threat Intelligence Integration:**

- Check IOCs against threat intelligence platforms
- Identify associated campaigns and threat actors
- Understand tactics, techniques, and procedures (TTPs) - MITRE ATT&CK mapping
- Assess likelihood of further compromise

---

**Phase 3: CONTAINMENT**

**Short-term Containment (Immediate Actions):**

- Isolate affected systems from network (not powered off)
- Block malicious IPs/domains at firewall/proxy
- Disable compromised user accounts
- Reset credentials for affected accounts
- Increase monitoring on related systems
- Deploy temporary compensating controls

**Long-term Containment (Sustained Actions):**

- Apply emergency patches to vulnerable systems
- Implement network segmentation
- Deploy additional monitoring
- Build clean recovery systems
- Prepare for eradication phase
- Document containment actions and effectiveness

**Containment Decision Matrix:**

| Incident Type          | Recommended Containment                                         |
| ---------------------- | --------------------------------------------------------------- |
| Ransomware             | Immediate network isolation, disable backup access              |
| Data Exfiltration      | Block C2 communications, monitor for additional exfil attempts  |
| Account Compromise     | Disable account, reset all credentials, force MFA re-enrollment |
| Web Application Attack | Block attacker IPs, deploy WAF rules, patch vulnerability       |
| Insider Threat         | Preserve evidence, disable access, monitor for data movement    |
| DDoS Attack            | Implement rate limiting, engage DDoS mitigation service         |

---

**Phase 4: ERADICATION**

**Eradication Actions:**

- [ ] Remove malware from affected systems
- [ ] Delete malicious accounts and backdoors
- [ ] Patch vulnerabilities exploited in attack
- [ ] Improve security controls that failed
- [ ] Reset all potentially compromised credentials
- [ ] Review and remove persistence mechanisms
- [ ] Validate complete threat actor removal

**Validation Methods:**

- Re-scan systems with updated signatures
- Monitor for reinfection attempts
- Conduct threat hunting for residual activity
- Verify no additional IOCs present
- Confirm all persistence mechanisms removed

---

**Phase 5: RECOVERY**

**Recovery Process:**

- [ ] Restore systems from clean backups or rebuild
- [ ] Verify system integrity before production
- [ ] Gradually restore services (phased approach)
- [ ] Enhanced monitoring during recovery period
- [ ] User communication and support
- [ ] Business operations resumption coordination
- [ ] Extended validation period (30-90 days)

**Recovery Validation:**

- System functionality testing
- Security control verification
- Performance baseline comparison
- User acceptance testing
- Compliance verification
- Documented sign-off from business owners

**Monitoring Post-Recovery:**

- Increased logging retention
- Enhanced alerting thresholds
- Focused threat hunting
- Weekly status reviews for 30 days
- Monthly reviews for 90 days

---

**Phase 6: POST-INCIDENT ACTIVITY**

**Lessons Learned Meeting (Within 2 weeks):**

**Required Attendees:**

- Incident response team members
- IT operations representatives
- Business unit stakeholders
- Executive sponsor
- Legal counsel (if applicable)

**Discussion Topics:**

1. **Incident Summary:**
   - What happened?
   - When was it detected?
   - How was it detected?
   - What was the impact?

2. **Response Evaluation:**
   - What went well?
   - What could be improved?
   - Were procedures followed?
   - Were tools adequate?
   - Was communication effective?

3. **Root Cause Analysis:**
   - How did the incident occur?
   - What vulnerabilities were exploited?
   - Were there early warning signs missed?
   - What controls failed?

4. **Improvement Actions:**
   - Technical improvements needed
   - Process updates required
   - Training gaps identified
   - Tool/capability enhancements
   - Policy changes recommended

**Deliverables:**

- Executive summary (1-2 pages)
- Detailed incident report
- Timeline of events
- IOC list and threat intelligence
- Financial impact assessment
- Improvement action plan with owners and deadlines
- Updated incident response playbooks

**Metrics and Reporting:**

- Mean time to detect (MTTD)
- Mean time to respond (MTTR)
- Mean time to contain (MTTC)
- Mean time to recover (MTTR)
- Number of systems affected
- Data exposure/exfiltration volume
- Incident cost (direct and indirect)
- Regulatory reporting compliance

---

#### Incident Response Playbooks

**PLAYBOOK 1: Ransomware Incident**

**Detection Indicators:**

- Mass file encryption
- Ransom notes on systems
- Unusual file extension changes
- Backup deletion attempts
- Shadow copy deletion
- High CPU/disk activity
- Communication to known ransomware C2

**Immediate Actions (First 30 minutes):**

1. **DO NOT** power off affected systems (evidence preservation)
2. Isolate affected systems from network immediately
3. Disable network shares and backup connectivity
4. Identify Patient Zero and attack vector
5. Document ransomware variant (file extension, ransom note)
6. Notify CISO, legal, executive leadership
7. Engage cyber insurance carrier
8. Contact law enforcement (FBI IC3, Secret Service)

**Investigation (Hours 1-4):**

- Identify all affected systems
- Determine encryption timeline
- Analyze ransomware sample (sandbox)
- Check for decryption tools (No More Ransom)
- Assess backup integrity and coverage
- Document financial impact
- Engage external forensics firm (if needed)

**Containment (Hours 4-24):**

- Network segmentation to prevent spread
- Credential reset for all potentially compromised accounts
- Patch identified vulnerabilities
- Deploy enhanced monitoring
- Isolate backup systems
- Validate clean systems

**Recovery (Days 2-30):**

- Restore from backups (validate integrity first)
- Rebuild compromised systems if backups unavailable
- Phased return to production
- Enhanced monitoring (90 days minimum)
- User communication and training
- Vendor notification if applicable

**Do NOT Pay Ransom Unless:**

- No viable backups exist
- Business-critical data cannot be reconstructed
- Legal counsel advises payment
- Executive leadership approves
- Law enforcement consulted

**Even if paying:**

- No guarantee of decryption
- Funds support criminal enterprise
- May target organization again
- Potential legal/regulatory issues

---

**PLAYBOOK 2: Data Exfiltration / Data Breach**

**Detection Indicators:**

- Large outbound data transfers
- Database query anomalies
- Access to sensitive data repositories
- Cloud storage uploads to personal accounts
- Encrypted/compressed file creation
- Data staging in unusual locations
- External notifications (data leak sites, researchers)

**Immediate Actions (First 30 minutes):**

1. Identify source of data exfiltration
2. Block exfiltration channels (IPs, domains, protocols)
3. Preserve logs and evidence
4. Determine data classification and sensitivity
5. Identify affected individuals/records
6. Notify CISO, legal, privacy officer, executive leadership
7. Engage external legal counsel
8. Document timeline and scope

**Investigation (Hours 1-12):**

- Determine attack vector and timeline
- Identify compromised accounts/systems
- Assess volume and type of data exfiltrated
- Determine number of affected individuals
- Conduct threat intelligence research
- Engage forensics firm for detailed analysis
- Assess regulatory notification requirements

**Regulatory Notification Requirements:**

| Regulation        | Trigger                            | Timeframe                  | Authority                       |
| ----------------- | ---------------------------------- | -------------------------- | ------------------------------- |
| GDPR              | Personal data of EU residents      | 72 hours                   | Data Protection Authority       |
| CCPA/CPRA         | California resident data           | Without unreasonable delay | Attorney General                |
| HIPAA             | Protected health information (PHI) | 60 days                    | HHS, individuals, media if >500 |
| PCI DSS           | Cardholder data                    | Immediately                | Card brands, acquiring bank     |
| SEC               | Material impact to operations      | 4 business days            | SEC Form 8-K                    |
| State Breach Laws | Varies by state                    | Varies (often 30-90 days)  | State Attorney General          |

**Containment and Eradication (Hours 12-72):**

- Remove threat actor access
- Reset all compromised credentials
- Patch vulnerabilities exploited
- Enhance monitoring and logging
- Deploy compensating controls
- Validate complete eradication

**Recovery and Notification (Days 3-30):**

- Individual notification (per regulatory requirements)
- Credit monitoring services (if PII exposed)
- Public disclosure (if required)
- Regulatory reporting
- Stakeholder communication
- Enhanced security measures

**Post-Incident:**

- Regulatory response management
- Potential litigation preparation
- Public relations management
- Customer support and remediation
- Lessons learned and improvements

---

**PLAYBOOK 3: Business Email Compromise (BEC)**

**Detection Indicators:**

- Email forwarding rules to external addresses
- Unusual wire transfer requests
- Executive impersonation emails
- Multi-factor authentication failures
- Login from unusual geographic locations
- Email filter/rule changes
- Requests to change payment details

**Immediate Actions (First 15 minutes):**

1. Verify legitimacy of any pending financial transactions
2. Halt wire transfers if initiated
3. Disable compromised email accounts
4. Remove suspicious email forwarding rules
5. Reset credentials for affected accounts
6. Document suspicious emails and headers
7. Notify finance department and executive leadership

**Investigation (Hours 1-6):**

- Review email account activity logs
- Identify unauthorized access timeline
- Examine email rules and filters
- Check for data exfiltration
- Analyze phishing emails (headers, infrastructure)
- Determine scope of compromise
- Assess financial loss (if any)

**Containment (Hours 6-24):**

- Force password reset for all potentially affected users
- Enable/re-enroll MFA for all accounts
- Block sender domains/IPs
- Deploy email filtering rules
- Enhance email authentication (SPF, DKIM, DMARC)
- User notification and awareness

**Recovery (Days 2-7):**

- Financial recovery efforts (contact banks, FBI)
- Enhanced email security controls
- User awareness training
- Executive impersonation detection tools
- Vendor payment verification procedures
- Ongoing monitoring

**Prevention Measures:**

- Implement DMARC (p=reject)
- Multi-factor authentication enforcement
- Wire transfer verification procedures (out-of-band)
- Email banner warnings for external emails
- Executive impersonation detection
- Security awareness training (quarterly)

---

**PLAYBOOK 4: Insider Threat**

**Detection Indicators:**

- Unusual data access patterns
- Mass file downloads or transfers
- Access outside normal working hours
- Use of unauthorized storage devices
- Violation of acceptable use policies
- Attempts to access unauthorized systems
- Disgruntled employee reports
- HR performance/disciplinary issues

**Immediate Actions (Coordinate with HR/Legal):**

1. **DO NOT** alert suspect to investigation
2. Engage legal counsel immediately
3. Coordinate with HR for employment status
4. Preserve evidence (logs, files, emails)
5. Document observed suspicious activity
6. Determine data access and potential exposure
7. Establish monitoring (if not already in place)

**Investigation (Days 1-14):**

- Review user activity logs (file access, email, web)
- Examine data transfers and removable media usage
- Analyze email communications
- Check cloud storage and personal email forwarding
- Interview relevant personnel (carefully)
- Engage external forensics if needed
- Document evidence chain of custody

**Containment (Upon Decision to Act):**

- Disable user accounts simultaneously (all systems)
- Revoke physical access badges
- Retrieve company devices (laptop, phone, tokens)
- Block personal email domains if being used
- Preserve mailbox and files
- Coordinate with HR for employee meeting

**Recovery and Legal Action:**

- Assess data exposure and risk
- Determine if law enforcement involvement needed
- Consider civil action (non-compete, NDA violations)
- Implement additional monitoring for related users
- Review and enhance access controls
- Conduct lessons learned with HR and legal

**Prevention Measures:**

- User and Entity Behavior Analytics (UEBA)
- Data loss prevention (DLP) policies
- Privileged access management (PAM)
- Enhanced monitoring during offboarding
- Regular access reviews
- Security awareness training
- Clear acceptable use policies

---

### 4. VULNERABILITY MANAGEMENT

#### 2025 Vulnerability Landscape

**Key Statistics:**

- **23,667 CVEs published in H1 2025** (16% increase over H1 2024)
- **~130 new CVEs per day** requiring triage
- **38% rated High or Critical** (CVSS ≥7.0)
- **50,000 CVEs projected** for full year 2025
- **63.5% of vulnerability-based breaches** tied to just 2 CVEs in file transfer software
- **45+ days unpatched** = prime target for exploitation

**CVSS v4.0 Scoring:**

- **Critical (9.0-10.0)**: Immediate action required (24-48 hours)
- **High (7.0-8.9)**: Urgent patching (within 7 days)
- **Medium (4.0-6.9)**: Scheduled patching (within 30 days)
- **Low (0.1-3.9)**: Routine patching (within 90 days)

**IMPORTANT:** CVSS scores reflect technical severity only. Risk-based prioritization must include:

- Active exploitation in the wild
- Asset criticality and exposure
- Availability of patches or mitigations
- Compensating controls in place
- Business impact of patching

---

#### Vulnerability Management Program Framework

**1. ASSET INVENTORY**

**Requirements:**

- Comprehensive inventory of all IT assets
- Classification by criticality (Tier 1/2/3)
- Owner assignment for each asset
- Network location and exposure level
- Operating system and application inventory
- Patch level and EOL status
- Dependencies and interconnections

**Tools:**

- Asset discovery: Qualys, Rapid7, Tenable, ServiceNow CMDB
- Cloud asset inventory: AWS Systems Manager, Azure Resource Graph, GCP Asset Inventory
- Network mapping: Nmap, Rumble, Axonius

---

**2. VULNERABILITY IDENTIFICATION**

**Scanning Strategy:**

**Infrastructure Scanning:**

- **Internal Networks**: Weekly authenticated scans
- **DMZ/Internet-facing**: Daily/continuous scanning
- **Cloud Environments**: Continuous/daily scanning
- **Critical Systems**: Daily authenticated scans

**Application Security:**

- **Static Analysis (SAST)**: Every code commit (CI/CD integration)
- **Dynamic Analysis (DAST)**: Weekly/monthly depending on criticality
- **Interactive Testing (IAST)**: Continuous during development
- **Software Composition Analysis (SCA)**: Every build (dependency vulnerabilities)

**Scanning Tools:**

- **Infrastructure**: Qualys VMDR, Tenable.io, Rapid7 InsightVM, Nessus
- **Web Applications**: Burp Suite Enterprise, Acunetix, HCL AppScan
- **Containers**: Aqua, Prisma Cloud, Snyk, Anchore
- **Cloud**: Wiz, Orca Security, Prisma Cloud, Lacework

**Configuration:**

- Authenticated scans with read-only credentials
- Coverage validation (scan rate >95%)
- Regular scanner updates (daily plugin updates)
- False positive tuning (reduce analyst fatigue)

---

**3. RISK ASSESSMENT AND PRIORITIZATION**

**Risk-Based Prioritization Model:**

**Severity Score = CVSS Base Score × Threat Modifier × Asset Criticality × Exposure Factor**

**Threat Modifier:**

- **Active exploitation (5.0)**: Listed in CISA KEV, public exploits available
- **High exploitation likelihood (3.0)**: Exploit code published, proof-of-concept available
- **Medium exploitation likelihood (1.5)**: Detailed vulnerability analysis published
- **Low exploitation likelihood (1.0)**: No known exploitation activity

**Asset Criticality:**

- **Tier 1 - Critical (3.0)**: Revenue-generating, customer-facing, regulated data
- **Tier 2 - Important (2.0)**: Internal business operations, employee data
- **Tier 3 - Standard (1.0)**: General IT infrastructure, development systems

**Exposure Factor:**

- **Internet-facing (3.0)**: Directly accessible from internet
- **DMZ (2.0)**: Protected by firewall but externally accessible
- **Internal (1.5)**: Internal network, VPN access required
- **Isolated (1.0)**: Air-gapped or highly restricted

**CISA Known Exploited Vulnerabilities (KEV) Catalog:**

- Federally mandated patching for government agencies
- Best practice for all organizations
- Updated regularly with actively exploited CVEs
- Required patching timeline included
- Source: https://www.cisa.gov/known-exploited-vulnerabilities-catalog

---

**4. REMEDIATION**

**Patch Management Process:**

**Emergency Patching (Critical vulnerabilities, active exploitation):**

- **Timeline**: 24-48 hours
- **Approval**: CISO or delegate
- **Testing**: Limited testing in non-production
- **Deployment**: Emergency change management
- **Validation**: Immediate verification scan

**Urgent Patching (High severity, internet-facing):**

- **Timeline**: 7 days
- **Approval**: Security operations manager
- **Testing**: Accelerated testing in non-production
- **Deployment**: Expedited change management
- **Validation**: Rescan within 48 hours

**Scheduled Patching (Medium severity, internal systems):**

- **Timeline**: 30 days
- **Approval**: Standard change management
- **Testing**: Full regression testing
- **Deployment**: Maintenance windows
- **Validation**: Rescan within 7 days

**Routine Patching (Low severity):**

- **Timeline**: 90 days
- **Approval**: Standard change management
- **Testing**: Standard testing procedures
- **Deployment**: Regular patch cycle
- **Validation**: Next scheduled scan

**Alternative Mitigations (when patching not immediately feasible):**

- Virtual patching (WAF rules, IPS signatures)
- Network segmentation and access restrictions
- Disable vulnerable features/services
- Compensating controls (enhanced monitoring)
- Acceptance of residual risk (documented and approved)

---

**5. VERIFICATION AND MONITORING**

**Verification Activities:**

- Post-patch vulnerability rescanning
- Configuration validation
- Functionality testing
- Performance monitoring
- Rollback capability confirmed

**Continuous Monitoring:**

- Real-time vulnerability detection
- Configuration drift detection
- New vulnerability alerts
- Threat intelligence integration
- Compliance status tracking

---

**6. REPORTING AND METRICS**

**Executive Dashboard Metrics:**

- Total vulnerabilities by severity (trend over time)
- Mean time to remediate (MTTR) by severity
- Percentage of vulnerabilities exceeding SLA
- Critical assets with high/critical vulnerabilities
- Patch compliance rate
- Risk score trending

**Operational Metrics:**

- Scan coverage percentage
- False positive rate
- Remediation velocity (vulns closed per week)
- Average age of open vulnerabilities
- Patch success rate
- Exception/waiver count

**Compliance Metrics:**

- PCI DSS compliance (quarterly scans, critical patching in 30 days)
- HIPAA compliance (regular risk assessments, timely remediation)
- ISO 27001 compliance (vulnerability management controls)
- SOC 2 compliance (vulnerability monitoring and remediation)

---

#### Critical Vulnerability Response Procedure

**SEVERITY: CRITICAL (CVSS 9.0-10.0) + Active Exploitation**

**Hour 0 (Detection):**

- [ ] Alert received from vulnerability scanner, threat intelligence, or vendor advisory
- [ ] Validate vulnerability applicability to organization
- [ ] Identify affected systems from asset inventory
- [ ] Determine if vulnerability is actively exploited (CISA KEV, exploit-db, social media)
- [ ] Assess business impact and exposure
- [ ] Notify CISO, CIO, affected business units

**Hour 1-4 (Emergency Response):**

- [ ] Convene emergency response team
- [ ] Determine remediation strategy: patch, virtual patch, isolate, disable service
- [ ] Obtain patch or develop mitigation plan
- [ ] Test patch/mitigation in lab environment (accelerated)
- [ ] Develop rollback plan
- [ ] Prepare communications for stakeholders

**Hour 4-24 (Deployment):**

- [ ] Execute emergency change management approval
- [ ] Deploy patches/mitigations to critical internet-facing systems first
- [ ] Monitor for issues during deployment
- [ ] Execute rollback if critical issues identified
- [ ] Verify successful remediation (rescan, functionality testing)
- [ ] Document all actions taken

**Hour 24-48 (Validation and Expansion):**

- [ ] Verify remediation effectiveness on initial systems
- [ ] Expand deployment to remaining affected systems
- [ ] Conduct threat hunting for indicators of exploitation
- [ ] Notify relevant stakeholders of completion
- [ ] Document lessons learned
- [ ] Update vulnerability management procedures if needed

---

### 5. IDENTITY AND ACCESS MANAGEMENT (IAM)

#### Market Overview and Trends (2025)

- **Market Size**: $25.96B (2025) → $42.61B (2030), 10.4% CAGR
- **Fortune 2000 Adoption**: 80% rely on comprehensive IAM solutions
- **Breach Statistics**: Credential abuse remains #1 breach vector (Verizon DBIR 2025)
- **Third-party Risk**: 35.5% of breaches originate from third-party vectors

---

#### IAM Framework Components

**1. IDENTITY GOVERNANCE AND ADMINISTRATION (IGA)**

**User Lifecycle Management:**

**Joiner Process:**

- [ ] Identity verification and background check
- [ ] Account provisioning based on role/job function
- [ ] Access assignment using role-based access control (RBAC)
- [ ] Manager approval for privileged access
- [ ] Security awareness training completion
- [ ] MFA enrollment
- [ ] Acknowledgment of acceptable use policy

**Mover Process:**

- [ ] Access review triggered by HR system integration
- [ ] Removal of previous role access
- [ ] Addition of new role access
- [ ] Manager approval for changes
- [ ] Recertification of privileged access
- [ ] Update to asset inventory

**Leaver Process:**

- [ ] Immediate account disablement (coordinated with exit)
- [ ] Access badge revocation
- [ ] Recovery of company assets (laptop, phone, tokens)
- [ ] Mailbox conversion to shared mailbox (if needed)
- [ ] Transfer of file ownership
- [ ] Revocation of external partner access
- [ ] 30/60/90 day deletion cycle (based on policy)

**Access Certification:**

- **Quarterly**: High-privilege access (admin, exec, finance)
- **Semi-annual**: Standard user access
- [ ] Manager reviews and certifies subordinate access
- [ ] Auto-revocation for non-response within SLA
- [ ] Exception handling for business-justified access
- [ ] Audit trail of all certification decisions

**Role-Based Access Control (RBAC):**

- Define roles based on job functions (not individuals)
- Map entitlements to roles (applications, data, systems)
- Assign users to appropriate roles
- Minimize role explosion (avoid role per person)
- Regular role review and optimization
- Segregation of duties (SoD) enforcement

---

**2. ACCESS MANAGEMENT**

**Authentication Methods (2025 Best Practices):**

**Passwordless Authentication (Preferred):**

- **FIDO2/WebAuthn hardware keys** (YubiKey, Titan, Smart Cards)
- **Platform authenticators** (Windows Hello, Touch ID, Face ID)
- **Mobile push notifications** (Microsoft Authenticator, Duo, Okta Verify)
- **Biometrics** (fingerprint, facial recognition)

**Multi-Factor Authentication (MFA):**

- **Phishing-resistant MFA required for:**
  - All privileged accounts (100%)
  - All users accessing sensitive data (100%)
  - All remote access (100%)
  - All financial transaction systems (100%)

- **MFA Method Strength Ranking:**
  1. **FIDO2/WebAuthn** (hardware tokens) - phishing resistant
  2. **Smart cards/PKI** - phishing resistant
  3. **Platform authenticators** (biometrics) - phishing resistant
  4. **Authenticator apps** (TOTP) - vulnerable to sophisticated phishing
  5. **SMS/Voice calls** - vulnerable to SIM swapping, NOT RECOMMENDED

**Single Sign-On (SSO):**

- Centralized authentication through identity provider
- SAML 2.0, OAuth 2.0, OpenID Connect protocols
- Reduces password sprawl and user friction
- Centralized audit logging
- Conditional access policy enforcement

**Conditional Access Policies:**

- **Device compliance**: Require managed, compliant devices
- **Location-based**: Block/challenge access from high-risk countries
- **Risk-based**: Step-up authentication for anomalous behavior
- **Application-specific**: Require additional controls for sensitive apps
- **Time-based**: Restrict access to business hours (if appropriate)

---

**3. PRIVILEGED ACCESS MANAGEMENT (PAM)**

**Gartner Magic Quadrant Leaders (2025):**

- CyberArk (Leader - highest security environments)
- Delinea (Leader)
- BeyondTrust (Leader)
- One Identity (Visionary)

**Core PAM Capabilities:**

**Privileged Account Management:**

- Centralized vault for privileged credentials
- Automatic password rotation
- Password complexity enforcement
- Credential check-out/check-in workflows
- Session recording and monitoring
- Just-in-time (JIT) privilege elevation

**Privileged Session Management:**

- RDP/SSH proxy for all privileged sessions
- Full session recording (video and keystroke)
- Real-time session monitoring
- Session termination capabilities
- Suspicious activity alerting (command blocking)
- Audit trail and compliance reporting

**Secrets Management:**

- Application password vaulting
- API key and certificate management
- Automated credential injection
- Secrets rotation
- Integration with CI/CD pipelines
- DevOps secrets management

**Just-in-Time (JIT) Access:**

- Zero standing privileges for administrative access
- Temporary elevation based on approval workflow
- Time-bound access grants (1-8 hours typical)
- Automatic privilege revocation
- Approval workflows with business justification
- Integration with ticketing systems

**Privileged Account Types:**

- **Domain/Enterprise Admins**: Highest privilege in directory
- **Local Administrators**: Server and workstation admin rights
- **Service Accounts**: Application and system service accounts
- **Emergency/Break-glass**: Emergency access accounts
- **Cloud Admin**: AWS root, Azure Global Admin, GCP Owner
- **Database Admins**: DBA with full database access
- **Network Admins**: Switch, router, firewall administration
- **Security Admins**: SIEM, EDR, firewall management

**PAM Implementation Roadmap:**

**Phase 1 (Months 1-3):**

- [ ] Inventory all privileged accounts
- [ ] Deploy PAM solution
- [ ] Onboard Domain/Enterprise Admin accounts
- [ ] Onboard Local Administrator accounts
- [ ] Implement password rotation for privileged accounts
- [ ] Enable session recording for Windows and Linux

**Phase 2 (Months 4-6):**

- [ ] Onboard service accounts
- [ ] Implement application password management
- [ ] Deploy privileged session monitoring
- [ ] Implement command filtering/blocking
- [ ] Integration with SIEM for alerting
- [ ] Enable JIT access for administrative tasks

**Phase 3 (Months 7-12):**

- [ ] Onboard cloud infrastructure accounts (AWS, Azure, GCP)
- [ ] Implement secrets management for DevOps
- [ ] Deploy behavior analytics for privileged users
- [ ] Integrate with identity governance (IGA)
- [ ] Implement full zero standing privilege model
- [ ] Continuous optimization and expansion

---

**4. NON-HUMAN IDENTITY MANAGEMENT (Emerging 2025)**

**Types of Non-Human Identities:**

- Service accounts
- API keys and tokens
- OAuth clients
- Machine identities (certificates, SSH keys)
- Bot accounts
- IoT device identities

**Challenges:**

- Typically outnumber human identities 5-10x
- Often over-privileged and long-lived
- Lack of ownership and lifecycle management
- Difficult to track and audit
- Attractive target for attackers

**Best Practices:**

- Inventory all non-human identities
- Apply principle of least privilege
- Implement automated credential rotation
- Use short-lived tokens where possible
- Monitor non-human identity usage
- Apply same governance as human identities (certification, review)

---

#### Zero Trust IAM Implementation

**Identity as the Control Plane:**
In Zero Trust architecture, identity becomes the primary security perimeter. Every access request must be:

**Verified:**

- Who is requesting access? (strong authentication)
- What device are they using? (device compliance)
- Where are they connecting from? (location and network)
- When are they accessing? (time-based policies)

**Authorized:**

- What are they allowed to access? (least privilege)
- What is their current risk level? (risk-based access)
- Are they compliant with policies? (conditional access)

**Monitored:**

- Continuous authentication and authorization
- Behavioral analytics for anomaly detection
- Real-time risk assessment
- Automated response to threats

**Implementation Checklist:**

- [ ] Implement phishing-resistant MFA for all users
- [ ] Deploy conditional access policies
- [ ] Enable risk-based authentication
- [ ] Implement device compliance requirements
- [ ] Deploy user and entity behavior analytics (UEBA)
- [ ] Implement just-in-time access for privileged operations
- [ ] Zero standing privileges for administrators
- [ ] Continuous monitoring and logging
- [ ] Integration with SIEM for security analytics
- [ ] Regular access reviews and certification

---

### 6. CLOUD SECURITY

#### Multi-Cloud Security Framework (AWS, Azure, GCP)

**2025 Trends:**

- **78% of enterprises** run multi-cloud deployments
- **30% better disaster recovery** metrics with multi-cloud
- **Zero Trust** as non-negotiable baseline architecture
- **Compliance automation** required across 150+ frameworks

---

#### Shared Responsibility Model

**Cloud Provider Responsibility:**

- Physical security of data centers
- Hardware and network infrastructure
- Hypervisor and virtualization layer
- Managed service security (RDS, S3, etc.)

**Customer Responsibility:**

- Data encryption and classification
- Identity and access management
- Network configuration (VPC, security groups)
- Application security
- Operating system and patch management
- Logging and monitoring

**"Security OF the cloud vs. Security IN the cloud"**

---

#### Cloud Security Architecture Principles

**1. IDENTITY-FIRST SECURITY**

**AWS Identity and Access Management (IAM):**

- Use IAM roles instead of access keys where possible
- Implement least privilege with IAM policies
- Enable MFA for all privileged accounts
- Use AWS Organizations for multi-account governance
- Implement Service Control Policies (SCPs) for guardrails
- Regular access analyzer reviews
- Avoid use of root account (enable MFA, no access keys)

**Azure Active Directory (Entra ID):**

- Conditional access policies for all applications
- Privileged Identity Management (PIM) for just-in-time admin access
- Identity Protection for risk-based authentication
- Access reviews for governance
- Managed identities for Azure resources
- B2B/B2C for external identity management

**GCP IAM:**

- Use service accounts with minimal permissions
- Implement organization policies for guardrails
- Workload Identity Federation for external access
- VPC Service Controls for data perimeter
- Access Context Manager for conditional access
- Regular IAM policy analyzer reviews

---

**2. NETWORK SECURITY**

**Virtual Private Cloud (VPC) Design:**

- **Network Segmentation:**
  - Public subnets: Internet-facing resources (load balancers, NAT gateways)
  - Private subnets: Application tier (web servers, app servers)
  - Isolated subnets: Data tier (databases, sensitive data)

- **Security Groups / Network Security Groups (NSGs):**
  - Stateful firewalls at instance/NIC level
  - Deny by default, allow specific traffic
  - Source IP restriction (avoid 0.0.0.0/0 where possible)
  - Regular review and cleanup of rules

- **Network Access Control Lists (NACLs):**
  - Stateless firewalls at subnet level
  - Additional layer of defense
  - Use for broad deny rules

**Private Connectivity:**

- **AWS**: VPC peering, Transit Gateway, PrivateLink
- **Azure**: VNet peering, Virtual WAN, Private Link
- **GCP**: VPC peering, Shared VPC, Private Service Connect

**Avoid Public Exposure:**

- Use private endpoints for cloud services
- VPN or Direct Connect for on-premises connectivity
- Bastion hosts / jump boxes for administrative access (or better: eliminate with SSM/Serial Console)
- NAT Gateways for outbound internet from private subnets

---

**3. DATA PROTECTION**

**Encryption at Rest:**

- **AWS**: S3 bucket encryption (SSE-S3, SSE-KMS, SSE-C), EBS volume encryption, RDS encryption
- **Azure**: Storage Service Encryption (SSE), Disk Encryption, TDE for SQL
- **GCP**: Default encryption, Customer-Managed Encryption Keys (CMEK)

**Encryption in Transit:**

- TLS 1.2 or higher for all communications
- HTTPS/SSL certificates (AWS ACM, Azure Key Vault, GCP Certificate Manager)
- VPN or Direct Connect for on-premises connectivity
- Enforce encryption in transit policies

**Key Management:**

- **AWS KMS**: Customer Master Keys (CMKs), automatic rotation, policy-based access
- **Azure Key Vault**: Keys, secrets, certificates; FIPS 140-2 Level 2 HSMs
- **GCP Cloud KMS**: Encryption keys, automatic rotation, IAM integration

**Data Classification and Labeling:**

- Public, Internal, Confidential, Restricted
- Apply labels/tags to resources
- Automate data discovery and classification
- Data loss prevention (DLP) policies

**Data Loss Prevention (DLP):**

- **AWS**: Macie for S3 data discovery and classification
- **Azure**: Purview for data governance and DLP
- **GCP**: Cloud DLP for data discovery and de-identification

---

**4. LOGGING AND MONITORING**

**Centralized Logging:**

- **AWS**: CloudTrail (API logging), VPC Flow Logs, CloudWatch Logs
- **Azure**: Activity Log, NSG Flow Logs, Azure Monitor
- **GCP**: Cloud Logging, VPC Flow Logs, Cloud Audit Logs

**Security Monitoring:**

- **AWS**: GuardDuty (threat detection), Security Hub (aggregation), Config (compliance)
- **Azure**: Defender for Cloud, Sentinel (SIEM), Policy
- **GCP**: Security Command Center, Chronicle (SIEM)

**Log Retention and Compliance:**

- Minimum 90 days (best practice: 1+ years)
- Immutable logging (prevent deletion/modification)
- Integration with SIEM for correlation
- Automated alerting on suspicious activity

**Critical Alerts:**

- Root/Global Admin account usage
- Changes to security groups / NSGs / firewall rules
- IAM policy changes
- Bucket/storage account public exposure
- Encryption disabled
- MFA disabled
- Console login failures
- Unusual API calls (data exfiltration indicators)

---

**5. COMPLIANCE AND GOVERNANCE**

**Cloud Security Posture Management (CSPM):**

- Continuous configuration monitoring
- Automated compliance scanning (CIS benchmarks, NIST, PCI DSS, HIPAA)
- Misconfiguration detection and remediation
- Drift detection from security baselines

**Tools:**

- AWS: Security Hub, Config, Trusted Advisor
- Azure: Defender for Cloud, Policy, Blueprints
- GCP: Security Command Center, Policy Intelligence
- Third-party: Wiz, Orca Security, Prisma Cloud, Lacework, Datadog

**Policy as Code:**

- Infrastructure as Code (IaC) security scanning (Terraform, CloudFormation)
- Open Policy Agent (OPA) for policy enforcement
- Pre-deployment validation of security controls
- Automated remediation of non-compliant resources

**Compliance Frameworks:**

- SOC 2 Type II
- ISO 27001
- PCI DSS (for cardholder data)
- HIPAA (for PHI)
- GDPR (for EU personal data)
- FedRAMP (for government)

---

**6. CONTAINER AND SERVERLESS SECURITY**

**Container Security:**

- Image scanning for vulnerabilities (Aqua, Snyk, Prisma Cloud, Anchore)
- Registry security (private registries, image signing)
- Runtime security (detect anomalous behavior)
- Network policies (Kubernetes Network Policies, service mesh)
- Secrets management (not in images or environment variables)
- Least privilege for container processes (non-root users)

**Kubernetes Security:**

- RBAC for cluster access control
- Pod Security Policies / Pod Security Standards
- Network Policies for microsegmentation
- Admission controllers for policy enforcement
- Encrypted secrets
- Regular cluster patching and upgrades

**Serverless Security (Lambda, Azure Functions, Cloud Functions):**

- Least privilege IAM roles/permissions
- VPC integration for private resource access
- Environment variable encryption
- Dependency scanning for third-party libraries
- Monitoring and logging (X-Ray, Application Insights)
- Timeout and concurrency limits

---

#### Cloud Security Checklist

**AWS Security Checklist:**

- [ ] Root account MFA enabled, access keys deleted
- [ ] CloudTrail enabled in all regions
- [ ] GuardDuty enabled for threat detection
- [ ] Security Hub enabled for compliance monitoring
- [ ] Config enabled for configuration monitoring
- [ ] S3 bucket public access blocked (account level)
- [ ] S3 bucket encryption enabled
- [ ] VPC Flow Logs enabled
- [ ] IAM password policy enforced (complexity, rotation)
- [ ] IAM Access Analyzer enabled
- [ ] MFA required for privileged users
- [ ] EBS encryption enabled by default
- [ ] RDS encryption enabled
- [ ] Secrets Manager for credentials (not hardcoded)
- [ ] AWS Organizations with SCPs for guardrails
- [ ] Regular IAM access reviews

**Azure Security Checklist:**

- [ ] Conditional access policies enforced
- [ ] Privileged Identity Management (PIM) enabled
- [ ] Azure AD Identity Protection enabled
- [ ] MFA required for all users
- [ ] Defender for Cloud enabled (all plans)
- [ ] Activity Log retention configured (90+ days)
- [ ] NSG Flow Logs enabled
- [ ] Storage account encryption enabled
- [ ] Disk encryption enabled
- [ ] Key Vault for secrets management
- [ ] Private endpoints for PaaS services
- [ ] Azure Policy for compliance enforcement
- [ ] Security Center recommendations reviewed weekly
- [ ] Subscription security alerts configured

**GCP Security Checklist:**

- [ ] Organization policies configured
- [ ] VPC Service Controls enabled for sensitive projects
- [ ] Security Command Center premium enabled
- [ ] Cloud Audit Logs enabled
- [ ] VPC Flow Logs enabled
- [ ] Binary Authorization for container deployment
- [ ] Shielded VMs enabled
- [ ] Default encryption for storage
- [ ] Cloud KMS for key management
- [ ] IAM Recommender for least privilege
- [ ] Service accounts instead of user accounts
- [ ] Workload Identity for GKE
- [ ] DLP API for data classification
- [ ] Regular security health analytics review

---

### 7. THREAT MODELING

#### Framework Comparison

| Framework        | Focus                    | Best For                              | Complexity |
| ---------------- | ------------------------ | ------------------------------------- | ---------- |
| **STRIDE**       | Threat categorization    | Entry-level, technical teams          | Low        |
| **DREAD**        | Risk quantification      | Prioritizing threats                  | Low        |
| **PASTA**        | Business risk alignment  | Enterprise, mature programs           | High       |
| **MITRE ATT&CK** | Adversary behavior       | Threat hunting, detection engineering | Medium     |
| **OWASP**        | Web application security | Development teams                     | Medium     |
| **OCTAVE**       | Organizational risk      | Risk management teams                 | High       |

---

#### STRIDE Threat Modeling

**Developed by Microsoft for product security design.**

**STRIDE Threat Categories:**

**S - Spoofing Identity:**

- Attacker impersonates another user or system
- **Examples**: Stolen credentials, session hijacking, IP spoofing
- **Mitigations**: Strong authentication, MFA, mutual TLS, digital signatures

**T - Tampering with Data:**

- Unauthorized modification of data in transit or at rest
- **Examples**: Man-in-the-middle attacks, database manipulation, file modification
- **Mitigations**: Encryption, digital signatures, integrity checks, access controls

**R - Repudiation:**

- User denies performing an action without ability to prove otherwise
- **Examples**: Deleting audit logs, unsigned transactions
- **Mitigations**: Comprehensive logging, digital signatures, non-repudiation controls

**I - Information Disclosure:**

- Exposure of confidential information to unauthorized parties
- **Examples**: Data leaks, improper access controls, verbose error messages
- **Mitigations**: Encryption, access controls, data classification, least privilege

**D - Denial of Service:**

- Degrading or denying service to legitimate users
- **Examples**: Resource exhaustion, DDoS attacks, algorithmic complexity attacks
- **Mitigations**: Rate limiting, resource quotas, DDoS protection, input validation

**E - Elevation of Privilege:**

- Gaining higher privileges than authorized
- **Examples**: Exploiting vulnerabilities, credential theft, privilege escalation
- **Mitigations**: Least privilege, input validation, secure coding, defense in depth

**STRIDE Process:**

1. **Diagram the System**: Create data flow diagram (DFD)
2. **Identify Threats**: Apply STRIDE to each component, data flow, and trust boundary
3. **Mitigate Threats**: Define security controls for each identified threat
4. **Validate**: Ensure mitigations address threats adequately

---

#### PASTA Threat Modeling

**Process for Attack Simulation and Threat Analysis - Risk-centric, business-focused.**

**7 Stages of PASTA:**

**Stage 1: Define Objectives**

- Business objectives and security requirements
- Compliance requirements (PCI DSS, HIPAA, GDPR)
- Risk tolerance and acceptance criteria
- Success metrics for threat modeling

**Stage 2: Define Technical Scope**

- Application architecture and components
- Technology stack and dependencies
- Network boundaries and trust zones
- Data flows and storage locations

**Stage 3: Application Decomposition**

- Use cases and user roles
- Entry points and trust boundaries
- Assets and data classification
- Third-party integrations

**Stage 4: Threat Analysis**

- Threat intelligence sources
- Threat actor profiling (motivation, capability, opportunity)
- Attack surface analysis
- Historical vulnerability data

**Stage 5: Vulnerability and Weakness Analysis**

- Known vulnerabilities (CVEs)
- Configuration weaknesses
- Design flaws
- Code-level vulnerabilities

**Stage 6: Attack Modeling**

- Attack trees and kill chains
- MITRE ATT&CK mapping
- Exploitability analysis
- Impact assessment

**Stage 7: Risk and Impact Analysis**

- Risk scoring (likelihood × impact)
- Business impact quantification
- Risk prioritization
- Remediation recommendations

**Best Use Cases:**

- Large organizations with mature security programs
- Compliance-driven industries (finance, healthcare)
- Applications processing sensitive data
- Integration with enterprise risk management

---

#### MITRE ATT&CK Framework

**Knowledge base of adversary tactics and techniques based on real-world observations.**

**ATT&CK Matrices:**

- **Enterprise**: Windows, Linux, macOS, Cloud (AWS, Azure, GCP, SaaS)
- **Mobile**: Android, iOS
- **ICS**: Industrial Control Systems

**14 Tactics (Attack Lifecycle):**

1. **Reconnaissance**: Gathering information for planning
2. **Resource Development**: Establishing resources for operations
3. **Initial Access**: Getting into the network
4. **Execution**: Running malicious code
5. **Persistence**: Maintaining foothold
6. **Privilege Escalation**: Gaining higher-level permissions
7. **Defense Evasion**: Avoiding detection
8. **Credential Access**: Stealing credentials
9. **Discovery**: Understanding the environment
10. **Lateral Movement**: Moving through the network
11. **Collection**: Gathering data of interest
12. **Command and Control**: Communicating with compromised systems
13. **Exfiltration**: Stealing data
14. **Impact**: Disrupting availability or integrity

**Use Cases:**

- **Threat Intelligence**: Understand adversary behavior
- **Detection Engineering**: Build detection rules for specific techniques
- **Red Teaming**: Plan attack scenarios
- **Gap Analysis**: Identify gaps in security controls
- **Incident Response**: Map observed activity to known techniques

**Implementation:**

- Map existing security controls to ATT&CK techniques
- Identify coverage gaps
- Prioritize detection and prevention capabilities
- Conduct purple team exercises
- Measure security program effectiveness

---

## Decision Frameworks

### Framework Selection Matrix

**When to use NIST CSF 2.0:**

- [ ] Starting new cybersecurity program
- [ ] Need board-level communication framework
- [ ] U.S. government contractor
- [ ] Critical infrastructure organization
- [ ] Recovering from data breach
- [ ] Integration with enterprise risk management

**When to use ISO 27001:**

- [ ] International operations
- [ ] Formal certification required
- [ ] Contractual requirement (customers, partners)
- [ ] Operationally mature organization
- [ ] Market differentiation needed
- [ ] Comprehensive ISMS desired

**When to use CIS Controls:**

- [ ] Technical implementation focus
- [ ] Limited resources / small team
- [ ] Prioritized actionable guidance needed
- [ ] Benchmarking security program
- [ ] Tactical security improvements
- [ ] Complement to strategic framework

**When to use STRIDE:**

- [ ] Team new to threat modeling
- [ ] Application/system design phase
- [ ] Technical security review
- [ ] Simple categorization needed
- [ ] Microsoft technology stack
- [ ] Entry-level threat modeling

**When to use PASTA:**

- [ ] Mature security program
- [ ] Business risk alignment critical
- [ ] Compliance requirements heavy
- [ ] High-value/high-risk applications
- [ ] Enterprise risk management integration
- [ ] Comprehensive threat analysis needed

**When to use MITRE ATT&CK:**

- [ ] Building detection capabilities
- [ ] Threat hunting program
- [ ] Red/purple team exercises
- [ ] Security control gap analysis
- [ ] Threat intelligence program
- [ ] Incident response enhancement

---

### Security Architecture Decision Framework

**Question 1: What is the data classification?**

- **Public**: Standard security controls
- **Internal**: Enhanced access controls, encryption in transit
- **Confidential**: Strong encryption, strict access controls, DLP
- **Restricted**: Maximum security, regulatory compliance, audit logging

**Question 2: What is the threat landscape?**

- **Low**: Standard internet threats, opportunistic attacks
- **Medium**: Targeted attacks, industry-specific threats
- **High**: Advanced persistent threats (APTs), nation-state actors

**Question 3: What are the compliance requirements?**

- PCI DSS, HIPAA, GDPR, SOC 2, ISO 27001, FedRAMP, state breach laws

**Question 4: What is the business impact of compromise?**

- **Low**: Minimal revenue/reputation impact
- **Medium**: Significant but recoverable impact
- **High**: Existential threat to organization

**Security Control Selection:**

- **Defense in Depth**: Multiple layers of security controls
- **Least Privilege**: Minimum necessary access
- **Zero Trust**: Verify explicitly, use least privilege, assume breach
- **Secure by Default**: Security enabled out of the box
- **Fail Secure**: Failures result in secure state

---

## Compliance and Regulatory Requirements

### Major Regulations

**PCI DSS 4.0 (Payment Card Industry Data Security Standard):**

- Applies to organizations handling cardholder data
- 12 requirements across 6 control objectives
- Annual assessment required (SAQ or ROC depending on volume)
- Quarterly vulnerability scans by ASV
- Penalties: Fines ($5k-$100k per month), loss of payment processing

**Key Requirements:**

- Firewall protection for cardholder data
- No default passwords
- Encryption of stored cardholder data (if stored)
- Encryption in transit for cardholder data
- Antivirus/antimalware
- Secure systems and applications
- Restrict access by business need-to-know
- Unique IDs for access
- Physical access restrictions
- Logging and monitoring
- Regular security testing
- Information security policy

---

**HIPAA (Health Insurance Portability and Accountability Act):**

- Applies to covered entities and business associates handling PHI
- Security Rule, Privacy Rule, Breach Notification Rule
- Administrative, Physical, and Technical Safeguards

**Key Requirements:**

- Risk analysis and risk management
- Security awareness training
- Audit controls and logging
- Access controls and authentication
- Encryption and integrity controls
- Breach notification (60 days to HHS and individuals)
- Business associate agreements (BAAs)

**Penalties:** $100 - $50,000 per violation, up to $1.5M per year

---

**GDPR (General Data Protection Regulation):**

- Applies to processing of EU personal data
- Territorial scope: EU residents regardless of organization location
- Individual rights (access, rectification, erasure, portability, objection)

**Key Requirements:**

- Lawful basis for processing
- Data protection by design and default
- Data breach notification (72 hours to DPA)
- Data protection impact assessments (DPIAs)
- Data protection officer (DPO) for certain organizations
- Records of processing activities
- Vendor management (processor agreements)

**Penalties:** Up to €20M or 4% of global revenue (whichever is higher)

---

**CCPA/CPRA (California Consumer Privacy Act / Privacy Rights Act):**

- Applies to businesses processing California resident data
- Consumer rights: Know, delete, opt-out of sale/sharing, correct, limit use of sensitive data

**Key Requirements:**

- Privacy notice and policy
- Consumer request handling (45 days)
- Opt-out mechanisms ("Do Not Sell or Share")
- Service provider agreements
- Risk assessments for sensitive data processing
- Data minimization and retention limits

**Penalties:** Up to $7,500 per intentional violation, $2,500 per unintentional violation

---

**SOC 2 Type II:**

- Voluntary audit of security controls
- Trust Services Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy
- Common for SaaS providers and service organizations

**Key Requirements:**

- Risk assessment process
- Security policies and procedures
- Access controls and authentication
- System monitoring and logging
- Change management
- Incident response
- Vendor management
- 6-12 month audit period for Type II

---

**SOX (Sarbanes-Oxley Act):**

- Applies to public companies
- IT General Controls (ITGCs) for financial reporting systems

**Key IT Controls:**

- Access controls (user provisioning, privileged access)
- Change management (development, testing, deployment)
- Data backup and recovery
- Security operations (monitoring, incident response)
- Segregation of duties

---

### Compliance Program Framework

**1. Establish Compliance Requirements**

- [ ] Identify applicable regulations and standards
- [ ] Document compliance obligations
- [ ] Map requirements to security controls
- [ ] Establish compliance team and ownership

**2. Implement Controls**

- [ ] Deploy technical controls
- [ ] Document policies and procedures
- [ ] Conduct employee training
- [ ] Vendor management program

**3. Monitor and Audit**

- [ ] Continuous compliance monitoring
- [ ] Internal audits
- [ ] External assessments and certifications
- [ ] Remediation of gaps

**4. Report and Improve**

- [ ] Executive reporting on compliance status
- [ ] Regulatory reporting as required
- [ ] Lessons learned and improvement
- [ ] Update controls for changing requirements

---

## Metrics and KPIs

### Security Operations Metrics

**Incident Response:**

- Mean Time to Detect (MTTD)
- Mean Time to Respond (MTTR)
- Mean Time to Contain (MTTC)
- Mean Time to Recover (MTTR)
- Number of incidents by severity
- Incident recurrence rate
- False positive rate

**Vulnerability Management:**

- Total vulnerabilities by severity
- Mean Time to Remediate (MTTR) by severity
- Percentage exceeding SLA
- Patch compliance rate
- Scan coverage percentage
- Critical assets with high/critical vulnerabilities

**Identity and Access Management:**

- Privileged account count
- Accounts with MFA enabled (%)
- Access certification completion rate
- Average access review cycle time
- Orphaned account count
- Service account with password rotation (%)

**Cloud Security:**

- Misconfiguration count (by severity)
- Public storage exposure count
- Encryption coverage (%)
- Cloud security posture score
- Policy violation count
- Mean time to remediate misconfigurations

**Security Awareness:**

- Training completion rate
- Phishing simulation click rate
- Reported phishing emails
- Security policy acknowledgment rate

### Executive Dashboard (Board-Level)

**Risk Posture:**

- Overall cyber risk score (trend)
- Critical risks and treatment status
- Cyber insurance coverage adequacy
- Third-party risk exposure

**Compliance:**

- Compliance status by framework
- Audit findings (open/closed)
- Regulatory exam preparedness
- Certification status

**Program Maturity:**

- Security control effectiveness
- Capability maturity by domain
- Benchmark against industry peers
- Investment and resource allocation

**Incidents and Threats:**

- Security incidents (trend)
- Data breaches (if any)
- Business impact of incidents
- Threat landscape and emerging risks

---

## Playbook: Security Assessment and Audit Preparation

### Pre-Assessment Phase (30-60 days before)

**1. Scope Definition**

- [ ] Identify assessment type (SOC 2, ISO 27001, PCI DSS, etc.)
- [ ] Define scope (systems, locations, timeframe)
- [ ] Engage auditor/assessor
- [ ] Establish timeline and milestones
- [ ] Assign internal team and responsibilities

**2. Gap Analysis**

- [ ] Review assessment criteria and requirements
- [ ] Conduct internal control testing
- [ ] Identify gaps and deficiencies
- [ ] Prioritize remediation efforts
- [ ] Develop remediation plan with owners and deadlines

**3. Evidence Collection**

- [ ] Identify required evidence and documentation
- [ ] Collect policies, procedures, configurations
- [ ] Gather logs, reports, and records
- [ ] Organize evidence repository
- [ ] Prepare evidence index

**4. Remediation**

- [ ] Execute remediation plan
- [ ] Document remediation actions
- [ ] Retest controls
- [ ] Update policies and procedures
- [ ] Conduct awareness training if needed

### Assessment Phase (1-4 weeks depending on scope)

**1. Opening Meeting**

- [ ] Introductions and roles
- [ ] Review scope and timeline
- [ ] Discuss assessment approach and methodology
- [ ] Confirm evidence submission process
- [ ] Establish communication protocols

**2. Documentation Review**

- [ ] Submit requested documentation
- [ ] Respond to auditor questions
- [ ] Provide supplemental evidence as requested
- [ ] Track evidence submission status

**3. Testing and Validation**

- [ ] Facilitate control testing (interviews, observations, system testing)
- [ ] Provide access to systems and personnel
- [ ] Respond to findings in real-time if possible
- [ ] Document testing activities

**4. Findings Review**

- [ ] Review preliminary findings
- [ ] Provide management responses
- [ ] Discuss remediation plans
- [ ] Negotiate finding severity if appropriate

### Post-Assessment Phase

**1. Report Review**

- [ ] Review draft report
- [ ] Validate accuracy of findings
- [ ] Provide comments and corrections
- [ ] Finalize report

**2. Remediation Planning**

- [ ] Develop corrective action plan
- [ ] Assign owners and deadlines
- [ ] Prioritize findings
- [ ] Allocate resources

**3. Continuous Improvement**

- [ ] Implement corrective actions
- [ ] Monitor effectiveness
- [ ] Update controls and procedures
- [ ] Conduct ongoing compliance monitoring
- [ ] Plan for next assessment cycle

---

## Additional Resources

### Standards and Frameworks

- NIST Cybersecurity Framework 2.0: https://www.nist.gov/cyberframework
- NIST SP 800-61r3 Incident Response: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r3.pdf
- ISO/IEC 27001:2022: https://www.iso.org/standard/27001
- CIS Controls v8: https://www.cisecurity.org/controls
- MITRE ATT&CK: https://attack.mitre.org
- CISA Known Exploited Vulnerabilities: https://www.cisa.gov/known-exploited-vulnerabilities-catalog

### Threat Intelligence

- CISA Alerts: https://www.cisa.gov/news-events/cybersecurity-advisories
- US-CERT: https://www.cisa.gov/resources-tools/resources/us-cert
- SANS Internet Storm Center: https://isc.sans.edu
- Microsoft Security Response Center: https://msrc.microsoft.com

### Industry Reports

- Verizon Data Breach Investigations Report: https://www.verizon.com/business/resources/reports/dbir/
- IBM Cost of a Data Breach Report
- Mandiant M-Trends Report
- CrowdStrike Global Threat Report

---

_Last Updated: December 2025_
_Based on Fortune 50 enterprise security practices and current industry standards._
