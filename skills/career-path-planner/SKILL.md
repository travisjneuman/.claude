---
name: career-path-planner
description: Map career goals to skills, gaps, and milestones.
version: 0.1.0
author: Hermes
metadata:
  hermes:
    tags: [Career, Skills, Planning, Development]
---

# Career Path Planner

Structured frameworks for turning a vague career ambition into a concrete, tracked plan: assess where the user is, find the gaps to a target role, and build a development plan with milestones. It does NOT make career decisions for the user, negotiate offers, or apply for jobs — it structures the planning conversation. Pure markdown; no dependencies, APIs, or credentials.

## When to Use

- "Help me plan my career path" / "figure out my next career move"
- Skill gap analysis: "what skills do I need for <role>?"
- Setting professional development goals or drafting a development plan
- Evaluating a career transition (new industry, new role, returnship, self-employment)
- Promotion preparation: mapping ladder levels and milestone tracking
- Salary benchmarking or total-compensation evaluation

## Prerequisites

- None. The skill works from the user's own answers in conversation.
- Recommended for gap analysis: 3-5 real job postings for the target role (gather via `web_search` / `web_extract` if the user doesn't paste them).

## How to Run

Conversation-driven: ask the user the assessment questions from the Frameworks section, fill the templates as you go, and if the user wants the plan kept, save it with `write_file` as a markdown file (e.g. `career-plan.md`). No commands to run.

## Quick Reference

| Framework | Purpose |
|-----------|---------|
| Skills Audit Matrix | Inventory proficiency (1-5) × market demand (1-5) with evidence |
| Values Identification | 6 value categories with probing questions |
| RIASEC | 6 career-interest types (R I A S E C); top-3 anchors direction |
| Gap Analysis | 4 steps: target role → current state → classify → prioritize |
| Gap Prioritization Matrix | Importance × gap size (4 quadrants) |
| Development Timelines | Cert 1-3 mo … advanced degree 1-3 yr |
| Career Ladders | 7 industry ladder templates (IC, mgmt, product, design, marketing, finance, consulting) |
| Level Progression Signals | scope, recognition, autonomy, impact, mentoring, stagnation |
| PDP Template | Vision + SMART goals + key results + monthly check-in |
| Goal Categories | skills / experience / network / visibility / education |
| Networking Framework | 5-3-2-2 targets, 6-step outreach, maintenance cadence |
| Informational Interview Qs | 5 stages of questions |
| Resume Impact Formula | Action verb + what + quantified result + context |
| Action Verb Banks | leadership / technical / growth / efficiency / innovation |
| Portfolio Structure | 6 sections mapped to audience |
| Transition Types | 5 transitions with difficulty, strategy, timeline |
| Bridge Role Strategy | intermediate role that builds target skills |
| Salary Research | 7 sources; total-comp breakdown; benchmarking factors |
| Planning Horizons | 1/3/5-year with confidence rule (80/50/30) |
| Milestone Tracking | 6 milestone types with tracking methods |
| Mentorship | 4 mentor types; meeting structure |
| Learning Resources | 7 categories with time investment |

## Procedure

1. Anchor direction: if the goal is vague, run RIASEC (top-3 types) and the Values Identification questions.
2. Audit: complete the Skills Audit Matrix with the user — proficiency, market demand, and evidence per skill.
3. Define the target role: title and level, plus 3-5 real job postings as reference.
4. Classify each requirement: HAVE / PARTIAL / MISSING / ADJACENT; score priority = importance × gap size (record the reasoning).
5. Select the 2-3 highest-priority gaps and assign a timeline from the Development Timelines table.
6. Draft the PDP: vision statement, 2-3 SMART goals with key results and resources, review cadence (monthly).
7. Layer on networking (5-3-2-2 targets) and the 1/3/5-year horizons; log milestones with tracking methods.
8. Save the plan with `write_file`; offer a review reminder via `cronjob` if the user wants one.

## Frameworks and Templates

### Career Assessment

Skills Audit Matrix (proficiency: 1 = awareness, 2 = guided, 3 = independent, 4 = can teach, 5 = recognized):

```
TECHNICAL SKILLS:
  Skill               | Proficiency (1-5) | Market Demand (1-5) | Evidence
  [Skill 1]           | [X]               | [X]                 | [Projects, certs]

TRANSFERABLE SKILLS:
  Skill               | Proficiency (1-5) | Relevance (1-5) | Evidence
  Communication, Leadership, Problem-solving, Project management | ... | ...
```

Values Identification — ask: work style (remote/autonomous/collaborative), impact (who, what scale), growth (learning/mastery/leadership), compensation (salary floor/equity/benefits), lifestyle (hours/travel/balance), culture (startup/corporate/mission).

RIASEC types: R realistic (engineering, trades, IT infra) · I investigative (data science, research) · A artistic (design, writing, product) · S social (HR, teaching, healthcare) · E enterprising (sales, management, consulting) · C conventional (finance, accounting, ops, compliance). Intersect top-3 with skills and values for matches.

### Skill Gap Analysis

```
STEP 1: Define target role — title/level + 3-5 real job postings; extract required skills/qualifications/experience
STEP 2: Map current state — skills audit + current credentials + years of experience
STEP 3: Classify each requirement — HAVE / PARTIAL / MISSING / ADJACENT
STEP 4: Prioritize — Priority = (importance to role) × (size of gap); HIGH + LARGE first
```

| | Small Gap | Large Gap |
|--|-----------|-----------|
| **High Importance** | Quick win — close fast | Critical path — invest heavily |
| **Low Importance** | Defer — nice to have | Ignore — not worth the effort |

| Gap Type | Timeline | Methods |
|----------|----------|---------|
| Technical certification | 1-3 mo | Online course + exam |
| New programming language | 2-4 mo | Project-based learning |
| Domain knowledge | 3-6 mo | Reading, mentorship, side projects |
| Leadership experience | 6-12 mo | Volunteer to lead, manage projects |
| Industry transition | 12-24 mo | Networking, bridge roles, education |
| Advanced degree | 1-3 yr | Part-time programs, employer sponsorship |

### Career Ladder Mapping

```
TECH IC:  Junior → Engineer → Senior → Staff → Principal → Distinguished → Fellow
TECH MGMT: Team Lead → EM → Senior EM → Director → VP Eng → SVP → CTO
PRODUCT:  APM → PM → Senior PM → Group PM → Director → VP → CPO
DESIGN:   Junior → Designer → Senior → Lead → Design Manager → Director → VP → CDO
MARKETING: Coordinator → Specialist → Manager → Senior Manager → Director → VP → CMO
FINANCE:  Analyst → Senior Analyst → Manager → Senior Manager → Director → VP → CFO
CONSULTING: Analyst → Associate → Consultant → Senior Consultant → Manager → Senior Manager → Principal → Partner
```

Progression signals: scope increase (handle bigger projects/teams → raise level discussion), peer recognition (document for promotion case), autonomy growth (take stretch assignments), impact widening (build cross-functional presence), mentoring others (formalize mentorship), stagnation (time for a growth conversation).

### Professional Development Plan

```
PROFESSIONAL DEVELOPMENT PLAN
NAME: [ ]  CURRENT ROLE: [ ]  TARGET ROLE: [ ] — Timeline: [ ]
DATE CREATED: [ ]  REVIEW CADENCE: Monthly

VISION STATEMENT: [one sentence: where you want to be and why]

GOALS (SMART): Goal 1: [Specific, Measurable, Achievable, Relevant, Time-bound]
  Key Results: KR1: [measurable] — Due: [date]; KR2: [measurable] — Due: [date]
  Resources: [courses, mentors, books, budget]   Status: [ ] Not started / In progress / Complete

MONTHLY CHECK-IN: What did I accomplish? What blocked progress? Next month's focus? Adjust goals?
```

| Category | Examples | Measurement |
|----------|---------|-------------|
| Skills | Learn Python, AWS cert | Certification, project completion |
| Experience | Lead a project, speak at conference | Deliverables, speaking slots |
| Network | 10 informational interviews | Connections, events attended |
| Visibility | Publish article, OSS contribution | Publications, contributions |
| Education | Complete course, read 12 books | Certificates, book list |

### Networking Strategy

```
IDENTIFY: 5 people in target role · 3 who recently transitioned · 2 hiring managers · 2 thought leaders
OUTREACH: research person → find genuine connection point → personalized message
          → ask for 20 minutes, not a favor → prepare 3-5 questions → thank-you + value-add
MAINTENANCE: engage with contacts' content monthly · share resources quarterly
             · reconnect every 3-6 months · offer help before asking
```

Informational interview stages: role understanding (typical day, surprises) · path discovery (how they got in, what they'd change) · gap identification (critical skills, what new hires should know) · opportunity (field trends, growth) · connection (who else to speak with).

### Resume and Portfolio

Achievement formula: `[Action verb] + [what you did] + [quantified result] + [context]`. Example: "Reduced page load time by 60% (3.2s → 1.3s), increasing conversion by 15%".

Action verbs: leadership (Led, Directed, Orchestrated, Mentored) · technical (Architected, Engineered, Automated, Optimized) · growth (Scaled, Grew, Launched, Increased) · efficiency (Streamlined, Reduced, Consolidated, Eliminated) · innovation (Pioneered, Designed, Invented, Transformed).

Portfolio: Hero (name, title, value prop) · Featured Work (3-5 outcomes for hiring managers) · Case Studies (process for interviewers) · Skills (keywords for recruiters) · Writing/Talks (thought leadership) · Contact.

### Career Transition Planning

| Transition | Difficulty | Strategy | Timeline |
|-----------|-----------|----------|----------|
| Same industry, new role | Low | Internal transfer, upskilling | 3-6 mo |
| New industry, same role | Medium | Networking, domain learning | 6-12 mo |
| New industry, new role | High | Bridge role, education, portfolio | 12-24 mo |
| Employee → entrepreneur | High | Side project, savings runway, validation | 6-18 mo |
| Return after gap | Medium | Returnship programs, freelance ramp | 3-9 mo |

Bridge role: an intermediate role building missing experience while leveraging current strengths. Find one by listing current-role skills, then target-role skills, then roles that need the first and expose the second — at companies in the target industry.

### Salary Benchmarking

Sources: Levels.fyi (tech) · Glassdoor (self-reported) · LinkedIn Salary Insights · Payscale · BLS (government) · Blind (anonymous tech) · industry surveys (Robert Half, Hays).

Total comp: base + annual bonus (target %) + equity/RSU annual vest + sign-on + benefits value + perks. Benchmarking factors: geography, company stage, years of experience, specialized-skill premium, management vs IC track. Adjust sources to the user's market — US-centric data misleads outside the US.

### Planning Horizons

```
1-YEAR (tactical): close immediate gaps, build network; 2-3 measurable goals; monthly review
3-YEAR (strategic): role transition, level advancement, reputation; quarterly review
5-YEAR (visionary): direction and positioning, not specific roles; annual reflection
Confidence rule: 1yr ~80%, 3yr ~50% (expect revision), 5yr ~30% (directional only)
```

| Milestone Type | Example | Tracking Method |
|---------------|---------|----------------|
| Skill acquisition | AWS Solutions Architect cert | Credential earned date |
| Experience | Lead cross-functional project | Completion + retrospective |
| Network | 20 informational interviews | Spreadsheet tracker |
| Visibility | 4 industry articles published | Publication links |
| Compensation | Reach target total comp | Annual review benchmark |
| Role change | Transition to target role | Offer letter date |

### Mentorship and Learning

Mentor sources: internal (skip-level manager, senior IC in target role, ERG leaders) · external (meetups, LinkedIn, alumni) · paid (executive/career coaching). Mentor types: career (direction), skill (teaches specific capability), sponsor (advocates in rooms you're not in), peer (mutual growth). Meetings: monthly, 30-60 min, 2-3 prepared questions, follow-up action items.

| Resource | Best For | Time |
|----------|---------|------|
| Online courses | Structured skill building | 2-8 wk/course |
| Books | Deep knowledge, frameworks | 1-2 wk/book |
| Podcasts | Trends, passive learning | 30-60 min/ep |
| Conferences | Networking, trends | 1-3 days |
| Side projects | Portfolio, applied learning | 2-5 hr/wk |
| Communities | Peer learning, accountability | 1-2 hr/wk |
| Newsletters | Staying current | 15 min/day |

## Pitfalls

- Self-rated proficiency drifts: anchor each rating to behavioral evidence, not opinion.
- Gap analysis without real postings becomes generic advice — require 3-5 postings.
- Over-specifying the 3- and 5-year horizons: 80/50/30 confidence rule exists for a reason.
- Priority scoring is subjective — write down the reasoning for each HIGH/LARGE call.
- Never fabricate credentials or experience for the user; plans list development actions, not claims.
- Salary benchmarks are geography- and stage-dependent; pick sources for the user's market.
- This skill plans careers; it does not negotiate, apply, or decide for the user.

## Verification

A session is complete when the user has: a target role, a completed skills audit, a prioritized gap list, a dated PDP with 2-3 SMART goals, and at least one milestone with a tracking method. If a plan file was written, confirm it exists (`read_file`) and renders as valid markdown.
