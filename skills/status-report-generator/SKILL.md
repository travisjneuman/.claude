---
name: status-report-generator
description: Project status report generation from git history, task context, and milestone tracking. Use when creating weekly updates, sprint reviews, stakeholder reports, or project dashboards.
---

# Status Report Generator

Structured frameworks for generating project status reports from code activity, task systems, and milestone tracking.

## Status Report Structure

### Standard Report Sections

```
STATUS REPORT OUTLINE:

1. TL;DR (3-5 bullets)
   - What was accomplished
   - What's in progress
   - What's blocked or at risk
   - Key decision needed (if any)

2. STATUS INDICATOR
   - Overall: GREEN / YELLOW / RED
   - Schedule: on track / at risk / behind
   - Scope: stable / expanding / contracting
   - Budget: on track / at risk / over (if applicable)

3. ACCOMPLISHMENTS (completed this period)
   - Bullet list with links to PRs/tickets
   - Grouped by workstream or milestone
   - Include metrics where possible

4. IN PROGRESS (active work)
   - Current tasks and expected completion
   - Progress indicators (% or status)
   - Owner for each item

5. BLOCKERS AND RISKS
   - Active blockers with escalation status
   - Emerging risks with mitigation plans
   - Dependencies on other teams

6. UPCOMING (next period)
   - Planned work for next sprint/week
   - Key milestones approaching
   - Decisions needed

7. METRICS (if applicable)
   - Velocity / throughput
   - Quality indicators (bugs, incidents)
   - Business metrics impact
```

## Data Extraction Methods

### From Git History

```
GIT DATA FOR STATUS REPORTS:

COMMITS THIS PERIOD:
git log --since="1 week ago" --oneline --no-merges

COMMITS BY AUTHOR:
git shortlog --since="1 week ago" -sn --no-merges

FILES CHANGED:
git diff --stat HEAD~{n}..HEAD

MERGED PRs (GitHub):
gh pr list --state merged --search "merged:>=2025-01-01"

PR SUMMARY:
gh pr list --state merged --json title,author,mergedAt,url \
  --jq '.[] | "- \(.title) (@\(.author.login)) \(.url)"'

OPEN PRs:
gh pr list --state open --json title,author,url \
  --jq '.[] | "- \(.title) (@\(.author.login)) \(.url)"'

RELEASE NOTES:
git log --since="1 week ago" --pretty=format:"- %s" --no-merges \
  | grep -E "^- (feat|fix|refactor|perf):"
```

### From Task Systems

```
TASK DATA EXTRACTION:

JIRA (via API or CLI):
- Tickets moved to "Done" this sprint
- Tickets currently "In Progress"
- Tickets in "Blocked" status
- Story points completed vs planned

GITHUB ISSUES:
gh issue list --state closed --search "closed:>=2025-01-01"
gh issue list --state open --label "in-progress"
gh issue list --state open --label "blocked"

LINEAR (via API):
- Completed issues this cycle
- In-progress issues
- Blocked issues with reason
- Cycle velocity metrics

GENERIC EXTRACTION TEMPLATE:
| Ticket | Title | Status | Owner | Notes |
|--------|-------|--------|-------|-------|
|        |       |        |       |       |
```

### Automated Report Generation

```
REPORT GENERATION SCRIPT APPROACH:

1. PULL DATA
   - Git log for the period
   - PR merge data
   - Issue/ticket status
   - CI/CD metrics (build success rate, deploy count)

2. CATEGORIZE
   - Group commits by type (feat, fix, refactor, etc.)
   - Group issues by milestone or epic
   - Identify blockers from issue labels

3. SUMMARIZE
   - Count: X features shipped, Y bugs fixed, Z PRs merged
   - Highlight: biggest wins and remaining risks
   - Metrics: velocity, cycle time, throughput

4. FORMAT
   - Apply template for audience (exec, team, detailed)
   - Add status indicators (RAG)
   - Include links to source data

OUTPUT FORMATS:
- Markdown (for Slack, GitHub, internal docs)
- HTML (for email)
- PDF (for stakeholder presentations)
```

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/status-report-generator/`).

| Topic | File | Covers |
| --- | --- | --- |
| RAG Status Framework | [`references/rag-status-framework.md`](references/rag-status-framework.md) | Status Definitions; RAG Assessment Matrix; Status Change Triggers |
| Stakeholder-Appropriate Detail Levels | [`references/stakeholder-appropriate-detail-levels.md`](references/stakeholder-appropriate-detail-levels.md) | Executive Summary (C-Level / VP); Team Status (Engineering / Product); Detailed Technical Report |
| Sprint Review Template | [`references/sprint-review-template.md`](references/sprint-review-template.md) | 41 lines |
| Milestone Tracking | [`references/milestone-tracking.md`](references/milestone-tracking.md) | Milestone Dashboard Template; Burn-Down Narrative |
| Risk and Blocker Escalation | [`references/risk-and-blocker-escalation.md`](references/risk-and-blocker-escalation.md) | Blocker Escalation Format; Risk Register Template |
| Status Report Quality Checklist | [`references/status-report-quality-checklist.md`](references/status-report-quality-checklist.md) | 15 lines |
| Status Report Anti-Patterns | [`references/status-report-anti-patterns.md`](references/status-report-anti-patterns.md) | 30 lines |

## See Also

- [Codebase Documenter](../codebase-documenter/SKILL.md)
- `anthropic-skills:docx` (Anthropic document skill)
- [Product Management](../product-management/SKILL.md)
- [Finance](../finance/SKILL.md)
