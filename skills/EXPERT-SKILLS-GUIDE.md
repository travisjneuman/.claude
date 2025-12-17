# Expert Skills - Complete Guide

**Created**: December 2025
**Version**: 3.0 (Domain-Named)
**Total Content**: ~1.3MB across 40 skill files
**Purpose**: Transform Claude Code into a team of domain experts

---

## Quick Navigation

| Section | Jump To |
|---------|---------|
| [Complete Skill Inventory](#complete-skill-inventory) | All 18 skills listed |
| [How to Use Skills](#how-to-use-skills) | Usage methods |
| [Product & Data Science](#product--data-science-skills) | PM & Analytics |
| [Health & Wellness](#health--wellness-skills) | Employee wellbeing |
| [ESG & Sustainability](#esg--sustainability-skills) | Climate & reporting |
| [Innovation & R&D](#innovation--rd-skills) | Innovation management |
| [Key Frameworks](#key-frameworks-reference) | All frameworks |
| [Maintenance](#maintenance--updates) | Update guidance |

---

## Overview

This comprehensive guide covers all Expert-level expert skills available in Claude Code. Each skill includes:

1. **SKILL.md** - Compact auto-invoked skill (~10KB) with frameworks and quick references
2. **references/** - Comprehensive deep-dive guides (~30-80KB each) with templates and detailed methodologies

---

## Complete Skill Inventory

### Business & Strategy

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **business-strategy** | Strategic planning, competitive analysis, M&A strategy, portfolio management | `corporate-strategy-advisor.md` (66KB) |
| **finance** | DCF, LBO, M&A modeling, valuation, capital allocation, treasury | `corporate-finance-expert.md` (79KB), `financial-modeling-master.md` (75KB), `ma-due-diligence-specialist.md` (49KB) |

### Operations & Technology

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **operations** | Supply chain, Lean Six Sigma, capacity planning, vendor management | `operations-excellence-skill.md` (43KB) |
| **security** | NIST, ISO 27001, security architecture, incident response, cloud security | `fortune50-information-security.md` (72KB) |
| **risk-management** | ERM frameworks, business continuity, insurance, third-party risk | `risk-management.md` (75KB) |
| **legal-compliance** | Corporate governance, SOX, GDPR, HIPAA, contract analysis, IP | `legal-compliance-excellence-skill.md` (109KB) |

### People & Leadership

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **leadership** | Executive decision-making, change management, crisis management, board relations | `fortune-50-executive-leadership.md` (60KB) |
| **hr-talent** | Talent acquisition, performance management, compensation, org design, DEI | `fortune-50-hr-strategist.md` (52KB) |
| **health-wellness** | Employee wellness, mental health, ergonomics, benefits strategy | `fortune50-workplace-health-wellness.md` (35KB), `health-wellness-templates.md` (25KB) |

### Revenue & Growth

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **marketing** | Brand positioning, market research, digital marketing, content strategy | (uses enterprise-marketing-strategy) |
| **sales** | MEDDIC, SPIN, Challenger, pipeline management, revenue ops | (uses enterprise-sales-excellence) |
| **product-management** | Product strategy, roadmaps, RICE/ICE prioritization, customer research | `product-strategy-expert.md` (27KB) |

### Innovation & R&D

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **innovation** | Design thinking, Stage-Gate, innovation portfolio, corporate venture | `innovation-management-skill.md` (30KB), `corporate-venture-open-innovation-skill.md` (37KB) |
| **rd-management** | R&D portfolio, technology roadmapping, patent strategy, academic partnerships | `rd-portfolio-management-skill.md` (39KB), `ip-strategy-tech-scouting-skill.md` (35KB) |

### Data & Analytics

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **data-science** | Statistical analysis, ML pipelines, data governance, BI, predictive modeling | `data-science-expert.md` (40KB) |

### Sustainability & ESG

| Skill | SKILL.md | Reference Files |
|-------|----------|-----------------|
| **sustainability-esg** | ESG strategy, carbon footprint, circular economy, climate risk, reporting | `fortune50-esg-sustainability-strategy.md` (58KB), `esg-sustainability-templates.md` (39KB) |

### Enterprise Skills (with full reference libraries)

| Skill | SKILL.md | References |
|-------|----------|------------|
| **enterprise-marketing-strategy** | 29KB | `campaign-planning-guide.md` (15KB) |
| **enterprise-sales-excellence** | 50KB | `deal-strategies.md` (23KB) |

---

## How to Use Skills

### Method 1: Auto-Invocation (Recommended)

Skills are automatically invoked by Claude Code when relevant. Simply describe your need:

```
"Help me build a DCF model for this acquisition"
"Design our sales qualification process using MEDDIC"
"Create an employee wellness program"
"Analyze our ESG compliance gaps"
```

### Method 2: Direct Reference

For comprehensive guidance, explicitly reference the skill:

```
I need help prioritizing features for our mobile app. Please reference
the Product Strategy Expert skill at ~/.claude/skills/product-management/
and help me apply RICE scoring to these 5 features.
```

### Method 3: Copy to Project

For project-specific work, copy relevant sections into project documentation:

```bash
# Create project-specific reference
mkdir -p ./docs/frameworks
cp ~/.claude/skills/product-management/SKILL.md ./docs/frameworks/
```

### Method 4: CLAUDE.md Reference

Add to your project's CLAUDE.md:

```markdown
## Domain Expertise

For product decisions, reference: ~/.claude/skills/product-management/
For analytics/ML work, reference: ~/.claude/skills/data-science/
For ESG strategy, reference: ~/.claude/skills/sustainability-esg/
```

---

## Product & Data Science Skills

### Product Strategy Expert

**File**: `~/.claude/skills/product-management/references/product-strategy-expert.md` (27KB)

**Core Capabilities:**
- Product vision and strategy development
- Feature prioritization frameworks (RICE, ICE, MoSCoW, Kano, Value vs. Effort)
- Roadmap planning and communication
- Customer research methodologies (interviews, JTBD, surveys, usability testing)
- Product analytics and metrics frameworks (AARRR, North Star, cohort analysis)
- A/B testing and experimentation design
- Product-market fit assessment

**Key Frameworks:**
- RICE Scoring: (Reach × Impact × Confidence) ÷ Effort
- ICE Scoring: (Impact + Confidence + Ease) ÷ 3
- MoSCoW Method: Must/Should/Could/Won't Have
- AARRR Pirate Metrics: Acquisition, Activation, Retention, Revenue, Referral
- Jobs-to-be-Done (JTBD)
- North Star Metric
- Sean Ellis PMF Survey: >40% "very disappointed" threshold

**When to Use:**
- Planning product roadmaps or strategies
- Prioritizing features among competing options
- Designing customer research studies
- Setting up analytics frameworks
- Designing A/B tests

### Data Science Expert

**File**: `~/.claude/skills/data-science/references/data-science-expert.md` (40KB)

**Core Capabilities:**
- Statistical analysis and hypothesis testing
- Machine learning pipeline design and deployment
- Data governance frameworks
- Business intelligence dashboard design
- Predictive modeling (classification, regression, clustering, time series)
- Data ethics, privacy, and compliance (GDPR, CCPA, HIPAA)

**Key Frameworks:**
- Analytics Maturity Model: Descriptive → Diagnostic → Predictive → Prescriptive
- ML Lifecycle: Problem definition → Data prep → Model development → Deployment
- Data Quality Framework: Accuracy, Completeness, Consistency, Timeliness
- Privacy Framework: GDPR, CCPA, HIPAA compliance
- Fairness Definitions: Demographic parity, equal opportunity, equalized odds

**When to Use:**
- Conducting statistical analyses
- Building machine learning models
- Designing BI dashboards
- Establishing data governance policies
- Ensuring data privacy compliance

---

## Health & Wellness Skills

### Expert Workplace Health & Wellness Strategy

**File**: `~/.claude/skills/health-wellness/`

**Core Capabilities:**
- **Program Design**: Tier 1 (universal), Tier 2 (targeted), Tier 3 (premium) wellness architectures
- **Mental Health**: EAP, therapy access, resilience training, stigma reduction, crisis support
- **Physical Wellness**: Fitness programs, nutrition counseling, biometric screenings
- **Financial Wellness**: Education, coaching, debt management, retirement planning
- **Analytics & ROI**: 2.5-6x ROI modeling, healthcare cost tracking

**Key Metrics:**
- Program participation rate: 60-80% target
- Employee satisfaction (NPS): 50+ target
- Healthcare cost trend: 3-5% below industry
- Absenteeism reduction: 20-30%
- ROI: 2.5-6x ($2.50-$6.00 per $1 invested)

**Expert Examples:**
- Amazon WorkingWell: 859,000 employees, $300M+ investment
- J&J: 38-year program with significant healthcare savings
- Google: Free healthy meals, on-site gyms/physicians
- Microsoft: $1,500/employee wellness allowance

**Templates Included:**
1. Wellness Program Business Case
2. Annual Wellness Report
3. Health Risk Assessment (HRA) Survey
4. Wellness Challenge Campaign
5. Mental Health Support Communication
6. Wellness Program Participation Tracker

---

## ESG & Sustainability Skills

### Expert ESG & Sustainability Strategy

**File**: `~/.claude/skills/sustainability-esg/`

**Core Capabilities:**
- **Carbon Management**: Scopes 1/2/3 GHG inventory, Science-Based Targets (SBTi), net zero roadmaps
- **Climate Risk**: TCFD-aligned physical and transition risk assessment, scenario analysis
- **Sustainable Supply Chain**: Supplier assessments, audits, human rights due diligence
- **Circular Economy**: Product-as-a-service, material recovery, circular business models
- **ESG Reporting**: GRI, SASB, TCFD, ISSB disclosure, ESG ratings optimization

**Key Metrics:**
- GHG emissions reduction: 42% by 2030 (Scopes 1+2), 25% (Scope 3)
- Renewable energy: 100% electricity by 2030
- Waste diversion: 90%+ from landfill
- Board independence: ≥80%
- ESG in exec comp: 10-20% of incentive

**Regulatory Landscape:**
- SEC Climate Rule (U.S.): Material climate risks in 10-K
- EU CSRD: Mandatory ESG reporting, ESRS standards
- California SB 253/261: Scopes 1/2/3 disclosure
- TCFD: Adopted in UK, EU, Japan, New Zealand

**Expert Examples:**
- Walmart Project Gigaton: 1 billion metric tons GHG reduction by 2030
- Apple: Carbon neutral by 2030, 100% recycled materials goal
- Microsoft: Carbon negative by 2030
- AT&T: 41.2% Scope 1/2 reduction

**Templates Included:**
1. ESG Materiality Assessment
2. GHG Emissions Inventory Workbook
3. Science-Based Targets Commitment
4. TCFD Climate Risk Assessment
5. ESG Report Executive Summary
6. Supplier Sustainability Assessment

---

## Innovation & R&D Skills

### Innovation Management Skill

**File**: `~/.claude/skills/innovation/references/innovation-management-skill.md`

**Core Domains:**
- Innovation Strategy Frameworks (Design Thinking, Stage-Gate, Hybrid models)
- Innovation Portfolio Management (Horizon framework, prioritization matrices)
- Ideation Process Design (structured ideation, continuous systems)
- Innovation Metrics & KPIs (balanced scorecard approach)
- Innovation Culture & Capability Building

**Key Frameworks:**
- Design Thinking 5-phase process
- Stage-Gate with 6 gates (0-5)
- 70/20/10 Horizon portfolio balance
- Innovation Ambition Matrix
- Balanced Innovation Scorecard

### R&D Portfolio Management Skill

**File**: `~/.claude/skills/rd-management/references/rd-portfolio-management-skill.md`

**Core Domains:**
- R&D Portfolio Strategy & Architecture
- Technology Roadmapping (multi-layer framework, TRL-based planning)
- Portfolio Prioritization & Optimization
- Research Methodology & Lab Management
- Academic & Research Partnerships
- Regulatory Pathways (FDA, CE, industry-specific)

**Key Frameworks:**
- Research portfolio allocation (10% Basic, 20% Applied, 35% Advanced Dev, 35% Product Dev)
- Technology Readiness Levels (TRL 1-9)
- 5-layer technology roadmap architecture
- Partnership lifecycle management (6 phases)

### IP Strategy & Technology Scouting Skill

**File**: `~/.claude/skills/rd-management/references/ip-strategy-tech-scouting-skill.md`

**Core Domains:**
- Patent Portfolio Strategy (defensive, offensive, strategic positioning)
- IP Monetization (licensing models, royalty determination)
- Technology Scouting & Horizon Scanning
- Competitive IP Intelligence
- Trade Secret Management
- Open Source Strategy & Compliance

### Corporate Venture & Open Innovation Skill

**File**: `~/.claude/skills/innovation/references/corporate-venture-open-innovation-skill.md`

**Core Domains:**
- Corporate Venture Capital Strategy
- Startup Partnership & Collaboration Models
- Accelerator & Incubator Programs
- Open Innovation (Chesbrough framework)
- Innovation Ecosystem Development
- M&A for Innovation

---

## Key Frameworks Reference

### Strategic Planning
- BCG Growth-Share Matrix
- GE-McKinsey Nine-Box
- Porter's Five Forces
- Blue Ocean Strategy
- Ansoff Growth Matrix
- Value Chain Analysis

### Financial Analysis
- DCF Valuation
- LBO Modeling
- M&A Analysis
- DuPont Analysis
- ROIC Framework
- Capital Allocation

### Operations Excellence
- Lean Six Sigma
- Theory of Constraints
- TPS/Toyota Production System
- Total Quality Management
- Supply Chain Optimization

### People Management
- ADKAR Change Model
- Kotter's 8-Step
- 9-Box Succession Grid
- Total Rewards Philosophy
- DEI Maturity Model

### Sales & Marketing
- MEDDIC/MEDDPICC
- SPIN Selling
- Challenger Sale
- STP Marketing
- Marketing Mix 7Ps
- ABM Frameworks

### Technology & Security
- NIST Cybersecurity Framework
- ISO 27001
- Zero Trust Architecture
- Security by Design
- Data Governance Framework

### Innovation & Product
- Design Thinking
- Stage-Gate Process
- Jobs-to-be-Done
- RICE Prioritization
- North Star Metric
- Product-Market Fit

---

## File Structure

```
~/.claude/skills/
├── business-strategy/
│   ├── SKILL.md
│   └── references/corporate-strategy-advisor.md
├── finance/
│   ├── SKILL.md
│   └── references/
│       ├── corporate-finance-expert.md
│       ├── financial-modeling-master.md
│       └── ma-due-diligence-specialist.md
├── operations/
│   ├── SKILL.md
│   └── references/operations-excellence-skill.md
├── security/
│   ├── SKILL.md
│   └── references/fortune50-information-security.md
├── risk-management/
│   ├── SKILL.md
│   └── references/risk-management.md
├── legal-compliance/
│   ├── SKILL.md
│   └── references/legal-compliance-excellence-skill.md
├── leadership/
│   ├── SKILL.md
│   └── references/fortune-50-executive-leadership.md
├── hr-talent/
│   ├── SKILL.md
│   └── references/fortune-50-hr-strategist.md
├── health-wellness/
│   ├── SKILL.md
│   └── references/
│       ├── fortune50-workplace-health-wellness.md
│       └── health-wellness-templates.md
├── marketing/
│   └── SKILL.md
├── sales/
│   └── SKILL.md
├── product-management/
│   ├── SKILL.md
│   └── references/product-strategy-expert.md
├── innovation/
│   ├── SKILL.md
│   └── references/
│       ├── innovation-management-skill.md
│       └── corporate-venture-open-innovation-skill.md
├── rd-management/
│   ├── SKILL.md
│   └── references/
│       ├── rd-portfolio-management-skill.md
│       └── ip-strategy-tech-scouting-skill.md
├── data-science/
│   ├── SKILL.md
│   └── references/data-science-expert.md
├── sustainability-esg/
│   ├── SKILL.md
│   └── references/
│       ├── fortune50-esg-sustainability-strategy.md
│       └── esg-sustainability-templates.md
├── enterprise-marketing-strategy/
│   ├── SKILL.md
│   └── references/campaign-planning-guide.md
└── enterprise-sales-excellence/
    ├── SKILL.md
    └── references/deal-strategies.md
```

---

## Statistics

| Metric | Count |
|--------|-------|
| Total Skill Folders | 18 |
| SKILL.md Files | 18 |
| Reference Documents | 22 |
| Total Files | 40 |
| Total Content | ~1.3MB |
| Lines of Content | ~50,000+ |

---

## Verification Checklist

All Expert functional areas covered:

- [x] **Strategy** - Business strategy, competitive analysis
- [x] **Finance** - CFO-level financial expertise
- [x] **Operations** - COO-level operational excellence
- [x] **Technology** - CTO/CIO-level tech leadership
- [x] **Security** - CISO-level information security
- [x] **Risk** - CRO-level enterprise risk management
- [x] **Legal** - CLO-level legal and compliance
- [x] **Leadership** - CEO-level executive leadership
- [x] **HR/Talent** - CHRO-level people management
- [x] **Health/Wellness** - Employee wellbeing programs
- [x] **Marketing** - CMO-level marketing strategy
- [x] **Sales** - CRO-level sales excellence
- [x] **Product** - CPO-level product management
- [x] **Innovation** - Innovation management
- [x] **R&D** - Research and development
- [x] **Data Science** - CDO-level analytics strategy
- [x] **Sustainability** - CSO-level ESG and sustainability

---

## Maintenance & Updates

### When to Update

1. **Regulatory Changes**: New privacy laws, compliance requirements
2. **Framework Evolution**: New widely-adopted methodologies
3. **Tool Updates**: Significant changes to standard tools/platforms
4. **Industry Shifts**: Major changes in best practices
5. **Feedback**: Frameworks that prove insufficient in practice

### Update Schedule

| Frequency | What to Review |
|-----------|----------------|
| Quarterly | Emerging technology trends, new regulations, market shifts |
| Annually | Strategic alignment, framework effectiveness, capability gaps |
| Continuous | Best practice evolution, tool changes, benchmarking data |

### How to Update

1. **Review Section**: Identify outdated content
2. **Research Update**: Gather current best practices
3. **Edit in Place**: Update specific sections
4. **Version Control**: Commit with clear message
5. **Document Changes**: Add changelog entry

### Versioning

Add version info to skill frontmatter:

```yaml
---
name: product-management
version: 1.0.0
last_updated: 2025-12-16
---
```

---

## Resources

### Product Management
- Books: "Inspired" (Cagan), "The Lean Startup" (Ries), "Crossing the Chasm" (Moore)
- Frameworks: Intercom (RICE), Amplitude (North Star), Teresa Torres (OST)

### Data Science
- Books: "The Elements of Statistical Learning", "Designing Data-Intensive Applications"
- Frameworks: Google (ML Best Practices), Microsoft (Responsible AI)

### Health & Wellness
- National Business Group on Health (NBGH)
- HERO (Health Enhancement Research Organization)
- WELCOA (Wellness Council of America)

### ESG & Sustainability
- GRI (Global Reporting Initiative): www.globalreporting.org
- SASB/ISSB: www.ifrs.org/sustainability
- SBTi (Science-Based Targets): www.sciencebasedtargets.org
- CDP (Carbon Disclosure Project): www.cdp.net

### Innovation & R&D
- PDMA (Product Development and Management Association)
- IRI (Industrial Research Institute)
- AUTM (Association of University Technology Managers)

---

## Converting Skills to Claude Code Plugins

To make skills available as auto-invoked plugins:

### Option 1: Minimal SKILL.md Wrapper

```yaml
---
name: product-strategy-expert
description: Expert-level Product Management expertise. Use when developing
  product strategies, prioritizing features, planning roadmaps, conducting research,
  analyzing metrics, or managing product lifecycles.
---

# Product Strategy Expert

[Include core content from product-strategy-expert.md]
```

### Option 2: Plugin Package

```
product-strategy-plugin/
├── plugin.json
└── skills/
    └── product-strategy-expert/
        ├── SKILL.md
        └── references/
            ├── prioritization-frameworks.md
            └── analytics-frameworks.md
```

---

## FAQs

**Q: Why aren't all skills auto-invoked?**
A: Some are comprehensive reference documents (27KB-40KB). Auto-invoking them would consume significant context tokens. Better to load specific sections when needed.

**Q: Can I use these in team settings?**
A: Absolutely. Share the files with your team, add to project docs, or create team-specific versions.

**Q: How do these compare to consulting frameworks?**
A: These distill best practices from multiple sources into actionable frameworks optimized for Claude Code consumption.

**Q: Can I modify these skills?**
A: Yes. Fork them, customize for your industry/company, add proprietary frameworks.

**Q: Do these replace domain expertise?**
A: No. They codify best practices but require judgment to apply correctly. They augment expertise, not replace it.

---

*Consolidated: December 16, 2025*
*This guide merges: FORTUNE-50-SKILLS-SUMMARY.md, FORTUNE-50-SKILLS-README.md, fortune50-health-sustainability-skills-overview.md, innovation-rd-skills-summary.md*
