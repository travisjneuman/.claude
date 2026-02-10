# Incident Response: [INC-XXXX] [Brief Title]

**Date:** [YYYY-MM-DD]
**Time Detected:** [HH:MM UTC]
**Severity:** [SEV1 / SEV2 / SEV3 / SEV4]
**Status:** Investigating / Identified / Monitoring / Resolved
**Duration:** [Start] to [End] ([X] minutes/hours)

---

## Severity Classification

Use this table to determine severity at the start of the incident. Upgrade or downgrade as the situation evolves.

| Severity | Criteria                                                                 | Response Time   | Notification             |
| -------- | ------------------------------------------------------------------------ | --------------- | ------------------------ |
| **SEV1** | Complete service outage, data loss, security breach, revenue impact      | Immediate       | Page all on-call + execs |
| **SEV2** | Partial outage, significant degradation, SLO burn rate critical          | < 15 minutes    | Page primary on-call     |
| **SEV3** | Minor degradation, elevated errors, single customer impact               | < 1 hour        | Slack + email            |
| **SEV4** | Cosmetic issue, non-customer-facing, minimal impact                      | Next business day | Ticket created           |

**Current Severity Justification:**
[Explain why this severity level was chosen]

---

## Incident Team

| Role                     | Person           | Responsibilities                                     |
| ------------------------ | ---------------- | ---------------------------------------------------- |
| **Incident Commander**   | [Name]           | Coordinates response, makes decisions, runs comms     |
| **Communications Lead**  | [Name]           | Updates status page, notifies stakeholders, customers |
| **Tech Lead**            | [Name]           | Leads technical investigation and remediation         |
| **Scribe**               | [Name]           | Records timeline, decisions, and actions taken        |
| **Subject Matter Expert**| [Name] (optional)| Domain expertise for affected system                  |

### Role Descriptions

**Incident Commander:**
- Owns the incident from detection to resolution
- Assigns tasks, unblocks engineers, makes escalation decisions
- Does NOT debug directly (delegates technical work)
- Calls for additional resources when needed
- Decides when to declare incident resolved

**Communications Lead:**
- Posts status page updates every 30 minutes (SEV1) or 60 minutes (SEV2)
- Drafts internal and external communications
- Manages stakeholder expectations
- Handles customer support escalation queue

**Tech Lead:**
- Drives root cause investigation
- Proposes and implements fixes
- Reports findings to Incident Commander
- Manages technical contributors

**Scribe:**
- Maintains real-time timeline in this document
- Records all decisions with reasoning
- Captures action items as they arise
- Prepares raw material for postmortem

---

## Impact Assessment

**Services Affected:**
- [ ] [Service name] - [Description of impact]
- [ ] [Service name] - [Description of impact]

**Users Affected:**
- [ ] Estimated number: [X users / X% of traffic]
- [ ] Affected regions: [All / Specific regions]
- [ ] Affected user segments: [All / Specific segments]

**Business Impact:**
- [ ] Revenue impact: [Estimated $ or orders/minute lost]
- [ ] SLO impact: [Error budget consumed]
- [ ] Contractual/SLA impact: [Any SLA breach risk]
- [ ] Reputation impact: [Social media, press, partner impact]

---

## Timeline

Record events as they happen. Timestamps in UTC.

| Time (UTC) | Event                                                    | Actor          |
| ---------- | -------------------------------------------------------- | -------------- |
| HH:MM      | Alert fired: [alert name]                                | [Automated]    |
| HH:MM      | On-call acknowledged alert                               | [Name]         |
| HH:MM      | Incident declared at [severity level]                    | [Name]         |
| HH:MM      | Initial investigation started                            | [Name]         |
| HH:MM      | Root cause identified: [brief description]               | [Name]         |
| HH:MM      | Fix deployed: [description of fix]                       | [Name]         |
| HH:MM      | Service recovered, monitoring                            | [Name]         |
| HH:MM      | Incident resolved                                        | [Name]         |

---

## Communication Templates

### Internal Status Update (Slack/Email)

```
INCIDENT UPDATE — [INC-XXXX] [Title]
Severity: [SEV1/SEV2/SEV3/SEV4]
Status: [Investigating / Identified / Monitoring / Resolved]

Current Impact:
[1-2 sentences describing what users are experiencing]

What We Know:
[1-2 sentences on root cause or investigation status]

What We're Doing:
[1-2 sentences on current actions being taken]

Next Update: [Time UTC] or sooner if status changes.
Incident Commander: [Name]
```

### External Status Page Update

```
[Component Name] - [Investigating / Identified / Monitoring / Resolved]

We are currently investigating [reports of / an issue with] [brief description].

Users may experience [specific symptoms: e.g., slow page loads, failed logins,
error messages when accessing X].

Our engineering team is actively working on a resolution.
We will provide an update within [30/60] minutes.

Last updated: [Time UTC]
```

### Customer-Facing Email (for SEV1/SEV2 with broad impact)

```
Subject: Service Disruption - [Date]

Dear [Customer/Team],

We are writing to let you know about a service disruption affecting
[product/feature name] that began at [time].

What happened:
[1-2 sentences, factual, no blame]

What we did:
[1-2 sentences on resolution]

Current status:
[Service has been fully restored as of [time] / We are continuing to monitor]

What we're doing to prevent recurrence:
[1-2 sentences on follow-up actions]

We sincerely apologize for the disruption. If you have questions or are still
experiencing issues, please contact [support channel].

[Name]
[Title]
```

---

## Diagnosis and Investigation

### Initial Triage (First 15 Minutes)

- [ ] Confirm the alert is legitimate (not a false positive)
- [ ] Identify the scope of impact (which services, which users)
- [ ] Check recent deployments (was anything deployed in last 2 hours?)
- [ ] Check dependency health (are upstream services healthy?)
- [ ] Check infrastructure (CPU, memory, disk, network)
- [ ] Review error logs for the affected service
- [ ] Determine severity and escalate if needed

### Investigation Checklist

- [ ] Dashboard reviewed: [link to relevant dashboard]
- [ ] Logs queried: [log query used]
- [ ] Traces examined: [trace IDs if applicable]
- [ ] Recent changes reviewed: `git log --since="2 hours ago" --oneline`
- [ ] Config changes checked: [where to look]
- [ ] Dependency status verified: [status pages or health checks]
- [ ] Infrastructure metrics reviewed: [CPU, memory, disk, network]

### Root Cause Identified

**Root Cause:**
[Detailed description of what caused the incident]

**Contributing Factors:**
- [Factor 1: e.g., missing monitoring on X]
- [Factor 2: e.g., no circuit breaker for dependency Y]
- [Factor 3: e.g., insufficient load testing before release]

**Trigger:**
[What specific event triggered the incident? Deploy, traffic spike, dependency failure, etc.]

---

## Resolution and Recovery

### Immediate Fix Applied

**Fix Description:**
[What was done to resolve the incident]

**Fix Type:** [Rollback / Hotfix / Configuration change / Scale-up / Manual intervention]

**Verification:**
- [ ] Error rate returned to baseline
- [ ] Latency returned to baseline
- [ ] Health checks passing
- [ ] User-facing functionality verified manually
- [ ] No secondary issues observed

### Recovery Steps

1. [Step 1: e.g., Rolled back deployment abc123]
2. [Step 2: e.g., Restarted service X to clear corrupted cache]
3. [Step 3: e.g., Verified database integrity]
4. [Step 4: e.g., Confirmed all customer data intact]

---

## Postmortem

**Postmortem Date:** [Scheduled within 48 hours of resolution]
**Postmortem Lead:** [Name]
**Attendees:** [List of attendees]

### Summary

[2-3 paragraph summary of the incident: what happened, what the impact was, how it was resolved, and what we are doing to prevent recurrence. Write this for an audience that includes non-technical stakeholders.]

### Metrics

| Metric                    | Value                |
| ------------------------- | -------------------- |
| Time to detect (TTD)      | [X] minutes          |
| Time to acknowledge (TTA) | [X] minutes          |
| Time to mitigate (TTM)    | [X] minutes          |
| Time to resolve (TTR)     | [X] minutes/hours    |
| Users affected            | [X] users / [X]%     |
| Error budget consumed     | [X]% of monthly budget|
| Revenue impact            | $[X] estimated       |

### 5 Whys Analysis

Dig deeper into the root cause by asking "why" iteratively. The goal is to find systemic issues, not assign blame.

**Why did the incident happen?**
1. **Why?** [First-level cause: e.g., Database connection pool exhausted]
2. **Why?** [Second-level: e.g., Connection leak in new ORM query]
3. **Why?** [Third-level: e.g., No connection pool monitoring alert]
4. **Why?** [Fourth-level: e.g., Connection pool was not included in standard monitoring template]
5. **Why?** [Fifth-level: e.g., Standard monitoring template has not been updated in 18 months]

**Root Cause:** [The systemic issue identified through 5-whys analysis]

### What Went Well

- [Thing that worked: e.g., Alert fired within 2 minutes of issue starting]
- [Thing that worked: e.g., Rollback completed in under 5 minutes]
- [Thing that worked: e.g., Communication was timely and clear]

### What Could Be Improved

- [Improvement area: e.g., Detection was delayed because metric X was not monitored]
- [Improvement area: e.g., Runbook for this scenario was outdated]
- [Improvement area: e.g., Rollback required manual steps that could be automated]

### Where We Got Lucky

- [Lucky factor: e.g., Incident happened during low-traffic hours]
- [Lucky factor: e.g., An engineer who wrote the affected code was available]

---

## Action Items

Track follow-up work to prevent recurrence. Every action item must have an owner and a deadline.

| ID   | Action Item                                             | Owner   | Priority | Deadline   | Status      |
| ---- | ------------------------------------------------------- | ------- | -------- | ---------- | ----------- |
| AI-1 | [e.g., Add connection pool monitoring alert]            | [Name]  | P1       | [Date]     | [ ] Open    |
| AI-2 | [e.g., Update deployment runbook with rollback steps]   | [Name]  | P2       | [Date]     | [ ] Open    |
| AI-3 | [e.g., Add circuit breaker for dependency X]            | [Name]  | P2       | [Date]     | [ ] Open    |
| AI-4 | [e.g., Load test new query pattern before next release] | [Name]  | P3       | [Date]     | [ ] Open    |
| AI-5 | [e.g., Update standard monitoring template]             | [Name]  | P3       | [Date]     | [ ] Open    |

### Action Item Tracking

- [ ] All action items have owners and deadlines
- [ ] P1 action items completed within 1 week
- [ ] P2 action items completed within 2 weeks
- [ ] P3 action items completed within 1 month
- [ ] Action item review scheduled at next team meeting

---

## Lessons Learned

[What broader lessons does this incident teach us? Think beyond the immediate fix to systemic improvements in process, tooling, testing, or architecture.]

---

## Appendix

### Relevant Links

- Dashboard: [URL]
- Logs: [URL with query]
- Traces: [URL]
- Deployment: [commit hash or release tag]
- Status page: [URL]
- Slack thread: [URL]

### Raw Data

[Paste any relevant error messages, stack traces, or log snippets here for reference.]

---

## Related Documentation

- `~/.claude/rules/checklists/monitoring-alerting-design.md` - Monitoring and alerting setup
- `~/.claude/rules/workflows/deployment-cicd.md` - Rollback procedures
- `~/.claude/rules/checklists/security-hardening.md` - Security incident handling
- `~/.claude/CLAUDE.md` - Core rules

---

_Blameless postmortems improve systems. Every incident is a learning opportunity._
