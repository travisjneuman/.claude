# Risks: Expert Skill Library Enhancement

**Purpose:** What Claude Code might get wrong when enhancing skills
**Researched:** 2025-12-17

## Executive Summary

Claude Code's training data includes outdated prompt engineering patterns and common LLM instruction-following pitfalls. When enhancing ~40 skills from thin guidelines to expert-level guidance, specific anti-patterns could reduce skill activation reliability, token efficiency, and output quality.

**Critical Finding:** Research shows LLMs struggle with overloaded prompts—adding more instructions actually decreases performance by up to 19%. Claude 3.5 Sonnet successfully follows 10 simultaneous instructions only 44-58% of the time. This directly impacts skill authoring.

---

## Deprecated Patterns to Avoid

### 1. Monolithic Skills (The "Everything in One File" Anti-Pattern)

**Claude might generate:**
```markdown
# SKILL.md (25KB)
# Complete Marketing Playbook

## Brand Strategy
[5000 words of frameworks, theory, examples...]

## Campaign Management
[5000 words of campaign types, tactics...]

## Market Research
[5000 words of research methodologies...]

## Analytics & Metrics
[5000 words of KPIs, dashboards...]

[...continues for another 10KB]
```

**Instead use:**
```markdown
# SKILL.md (~8KB max)
# Marketing Expert

## Core Capabilities
When to activate, what you can help with

## Decision Framework
High-level strategy selection

## Quick Reference
- Brand strategy → See references/brand-strategy.md
- Campaigns → See references/campaign-playbook.md
- Research → See references/research-methods.md

[Only most critical decision patterns in SKILL.md]
```

**Why it matters:**
- **Token efficiency**: SKILL.md loads into context when skill activates—every token competes with conversation history
- **Activation reliability**: Claude only reads SKILL.md when relevant; massive files increase processing overhead
- **Maintenance**: Easier to update modular references than monolithic docs
- **Model compatibility**: Haiku struggles more with long instructions than Opus

**Source:** [Claude Docs - Token-efficient Tool Use](https://docs.claude.com/en/docs/agents-and-tools/tool-use/token-efficient-tool-use)

---

### 2. The "Prompt and Pray" Anti-Pattern (Vague Activation Descriptions)

**Claude might generate:**
```markdown
description: "Fortune 50-level marketing expertise. Use for brand strategy, positioning, and growth." (plugin:fortune50-marketing@fortune50-skills)
```

**Why this fails:**
- User says: "Help me with our product launch"
- Skill doesn't activate because "product launch" isn't in description
- Claude defaults to generic advice instead of activating marketing skill

**Instead use:**
```markdown
description: "Use for marketing strategy, campaigns, brand development, product launches, market research, customer segmentation, content strategy, go-to-market planning, positioning, messaging, demand generation, marketing analytics, PR strategy, and growth marketing." (plugin:fortune50-marketing@fortune50-skills)
```

**Why it works:**
- **Natural language matching**: Covers varied ways users describe marketing tasks
- **Explicit task triggers**: "product launch" directly mentioned
- **Breadth over depth**: Description is for activation; depth goes in SKILL.md

**Critical Rule:** Description field is for discovery, not documentation. Include task verbs and natural language phrases users actually say.

**Source:** [Claude Docs - Skill Authoring Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)

---

### 3. The "Theory Over Practice" Anti-Pattern

**Claude might generate:**
```markdown
# Product Prioritization

## RICE Framework
RICE stands for Reach, Impact, Confidence, and Effort. It's a prioritization framework developed at Intercom to evaluate features systematically.

### Reach
Reach measures how many people will be affected by the feature within a given time period, typically measured quarterly.

### Impact
Impact quantifies how much this feature will affect individual users when they encounter it. The scale ranges from minimal to massive.

[...continues with more explanations of concepts...]
```

**Why this fails:**
- Explains WHAT frameworks are
- Doesn't show HOW to apply them
- User still needs to figure out implementation
- Wastes tokens on information readily available online

**Instead use:**
```markdown
# Product Prioritization

When asked to prioritize features, use this step-by-step process:

## Step 1: Score Each Feature with RICE

For each feature, ask user (or infer from context):

**Reach:** How many users per quarter?
- Don't ask for thousands—get actual number
- Example: "This affects checkout flow, so ~50,000 users/quarter"

**Impact:** On scale of 0.25 (minimal) to 3.0 (massive)
- 0.25 = Nice to have, barely noticeable
- 0.5 = Small improvement
- 1.0 = Medium impact
- 2.0 = High impact
- 3.0 = Massive impact, game-changing
- Example: "Reducing checkout friction is 2.0—high impact"

**Confidence:** Percentage certainty (use 100%, 80%, 50%)
- 100% = Strong evidence/data
- 80% = Good evidence but some assumptions
- 50% = Hypothesis, needs validation
- Example: "80% confident based on user testing"

**Effort:** Person-months to ship
- Count full team effort (eng, design, PM)
- Example: "2 months for one engineer = 2 person-months"

**Calculate:** (Reach × Impact × Confidence) / Effort
Example: (50000 × 2.0 × 0.8) / 2 = 40,000 score

## Step 2: Rank and Present

Show features ranked by score with reasoning:
```
1. Checkout Optimization (Score: 40,000)
   - High reach + high impact on conversion
   - Confidence: Strong user testing data
   - Effort: Manageable 2-month project

2. [Next feature]...
```

## Step 3: Sanity Check

Before finalizing, ask:
- Does top priority align with business strategy?
- Are we undervaluing low-effort quick wins?
- Any must-ship dependencies regardless of score?

Present final prioritized list with rationale.
```

**Why this works:**
- **Actionable**: Step-by-step process Claude can execute
- **Concrete**: Specific questions to ask, exact scales to use
- **Examples**: Shows what good looks like at each step
- **Decision-making**: Includes judgment calls and sanity checks

**Rule:** Every framework must include: (1) when to use it, (2) exact steps, (3) what questions to ask, (4) how to score/evaluate, (5) how to present results.

**Source:** [Optimizely - How to Write AI Instructions](https://www.optimizely.com/insights/blog/how-to-write-ai-instructions/)

---

### 4. The "Instruction Overload" Anti-Pattern

**Claude might generate:**
```markdown
# Code Review Checklist

When reviewing code, check ALL of the following:

1. No TypeScript `any` types
2. All functions have JSDoc comments
3. All variables use const/let (never var)
4. No console.log statements
5. All imports are named (not default)
6. No hardcoded strings (use constants)
7. All functions <50 lines
8. No nested ternaries
9. All errors are handled
10. No dangling promises
11. All async functions use try/catch
12. WCAG AA compliance for UI
13. Touch targets ≥44x44px
14. Color contrast ≥4.5:1
15. Keyboard navigation works
16. No innerHTML (use textContent)
17. All inputs sanitized
18. No exposed API keys
19. All deps up to date
20. Bundle size <100KB
[...continues to 50+ items...]
```

**Why this fails:**
- **Proven degradation**: Research shows performance drops 19% when overloading prompts with requirements
- **Instruction following limits**: Claude 3.5 Sonnet successfully follows 10 simultaneous instructions only 44-58% of the time
- **Competing priorities**: Too many rules create conflicts and force tradeoffs
- **Generic output**: When overwhelmed, Claude defaults to surface-level checks

**Instead use:**
```markdown
# Code Review: Tiered Priority System

## P0: Always Check (Must Fix)
1. **Type Safety**: No `any` types—use explicit types or `unknown`
2. **Security**: No innerHTML, no exposed secrets, inputs sanitized
3. **Error Handling**: Async functions use try/catch, no dangling promises
4. **Data Integrity**: State mutations properly handled

## P1: Check for New Code (Should Fix)
5. **Function Size**: Functions <50 lines (flag if >75)
6. **Accessibility**: WCAG AA basics (contrast, keyboard nav, ARIA)
7. **Performance**: No obvious bottlenecks (N+1 queries, unnecessary re-renders)

## P2: Improvement Opportunities (Nice to Have)
8. **Documentation**: Complex logic has comments
9. **Code Style**: Consistent with project patterns
10. **Optimization**: Bundle size, lazy loading opportunities

## Review Process

1. Start with P0 issues—these block merge
2. If P0 is clean, check P1—these should be fixed before merge
3. Only mention P2 if there's a clear, easy improvement
4. **Never list all checks**—only report actual issues found

## Output Format

**Blocking Issues (P0):**
- [List only if found]

**Should Fix (P1):**
- [List only if found]

**Consider (P2):**
- [List only if found and easy fix]

If no issues: "No blocking issues found. Code follows project standards."
```

**Why this works:**
- **Prioritization**: Clear hierarchy prevents overload
- **Selective activation**: Only applies relevant checks
- **Under 10 instructions**: Stays within proven LLM instruction-following limits
- **Actionable**: Clear what must fix vs. nice-to-have

**Research Evidence:**
- Adding requirements beyond ~10 decreases performance by up to 19%
- Under-specified prompts are 2x as likely to regress across model changes
- Breaking complex instructions into focused steps improves reliability

**Sources:**
- [OpenReview - Curse of Instructions](https://openreview.net/forum?id=R6q67CDBCH)
- [ArXiv - Understanding Underspecification in LLM Prompts](https://arxiv.org/html/2505.13360v1)

---

### 5. The "Generic Expert" Anti-Pattern

**Claude might generate:**
```markdown
# Fortune 50 Marketing Expert

You are a world-class CMO with decades of experience leading marketing at Fortune 50 companies. You understand business strategy, brand building, and customer acquisition.

When asked about marketing, provide comprehensive, executive-level guidance...
```

**Why this fails:**
- **Persona theater**: "You are a CMO" doesn't change Claude's knowledge
- **No differentiation**: Generic "expert" framing vs. specific capabilities
- **Missing domain vocabulary**: Doesn't use actual marketing terminology
- **No decision frameworks**: Explains role, not how to do the work

**Instead use:**
```markdown
# Fortune 50 Marketing Expert

## When to Activate

Use for marketing strategy decisions that involve:
- GTM planning, positioning, messaging architecture
- Brand strategy, portfolio management, master brand vs. sub-brands
- Campaign planning with media mix modeling
- Customer segmentation beyond basic demographics
- Marketing analytics (CAC, LTV, attribution modeling)

## Core Frameworks

When asked about marketing strategy, default to:

1. **GTM Decision Tree**
   - Product-led vs. sales-led motion?
   - If revenue <$100K ACV → product-led (PLG)
   - If revenue >$100K ACV → sales-led (SLG)
   - Reasoning: Enterprise sales cost of $50K+ per deal

2. **Positioning Framework (April Dunford)**
   - Best customers: Who gets 10x value?
   - Competitive alternatives: What do they use today?
   - Unique capabilities: What can only you do?
   - Value theorem: Why does it matter?
   - Category: Where do you win?

3. **Message Hierarchy**
   ```
   Master Brand Promise (emotional)
   ↓
   Value Proposition (functional benefit)
   ↓
   Proof Points (evidence/features)
   ↓
   Calls to Action
   ```

## Domain Vocabulary

Use actual marketing terminology:
- **Attribution modeling** (not "tracking conversions")
- **Media mix optimization** (not "choosing channels")
- **Demand waterfall** (not "funnel stages")
- **CAC payback period** (not "return on marketing spend")
- **Share of voice** (not "brand awareness")

## Red Flags to Watch For

When user asks for marketing help, check for:
- ❌ "We need to do social media" → Probe: Why? What's the business objective?
- ❌ "Our brand needs to be modern" → Define: Modern to whom? What behavior change?
- ❌ "We need more leads" → Quality or quantity? What's current conversion rate?

## References

Detailed playbooks in:
- `references/brand-strategy.md` - Portfolio architecture, brand equity
- `references/campaign-playbook.md` - Media mix, campaign execution
- `references/positioning-frameworks.md` - Dunford, Christensen JTBD
```

**Why this works:**
- **Activation clarity**: Specific scenarios when skill is needed
- **Named frameworks**: Uses real methodologies (Dunford, JTBD)
- **Domain expertise**: Actual terminology professionals use
- **Decision support**: Guides which framework to apply when
- **Critical thinking**: Red flags prevent bad requests

**Rule:** Domain skills must demonstrate expertise through frameworks, vocabulary, and decision-making—not just claim expertise.

**Sources:**
- [Claude Docs - Skill Authoring Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [Optimizely - Writing AI Instructions](https://www.optimizely.com/insights/blog/how-to-write-ai-instructions/)

---

## Common Mistakes

### Mistake 1: Ambiguous or Buried Instructions

**What happens:** Critical instructions get lost in long files or conflicting requirements
**Why it's wrong:** LLMs struggle with buried directives—like telling someone to go left while pointing right
**Prevalence:** Extremely common in first-draft skills

**Example:**
```markdown
# Code Review Skill

Review code for quality, security, and performance. Check for bugs and suggest improvements. Make sure the code follows best practices and is well-documented. Look for security issues and performance problems. Ensure accessibility standards are met. By the way, ALWAYS start with security checks first, and never approve code with type safety issues.
```

**Correct approach:**
```markdown
# Code Review Skill

## Priority Order (Follow This Sequence)

1. **Security & Type Safety** (BLOCKING)
   - Check first, before anything else
   - Any issues here = immediate stop, do not continue

2. **Functionality & Logic** (BLOCKING)
   - Only check if security passes

3. **Performance & Optimization** (ADVISORY)
   - Only mention if severe issues found

## Instructions
[Clear, sequential steps...]
```

**Fix:** Use visual hierarchy, delimiters (### CRITICAL ###), and explicit sequencing. Place critical instructions at start or end, never buried mid-text.

**Source:** [HackerNoon - Why Prompts Don't Work](https://hackernoon.com/help-my-prompt-is-not-working)

---

### Mistake 2: Missing Few-Shot Examples

**What happens:** Skill explains what to do but Claude doesn't understand the expected pattern
**Why it's wrong:** LLMs learn format and reasoning style from examples, not just instructions
**When it matters most:** Complex output formats, specific reasoning patterns, domain-specific analysis

**Example - Missing Examples:**
```markdown
# Technical Debt Analysis

Analyze the codebase for technical debt and create a prioritized report with severity levels.

Categories: Architecture, Code Quality, Dependencies, Documentation, Testing
Severity: Critical, High, Medium, Low
```

**Correct Approach - With Examples:**
```markdown
# Technical Debt Analysis

## Output Format

For each issue found, use this structure:

**Example 1:**
```
### [CRITICAL] Hardcoded Database Credentials
**Category:** Security / Architecture
**Location:** `src/db/connection.ts:15-18`
**Impact:** Production data exposure risk, blocks SOC2 compliance
**Effort:** 2 hours (move to environment variables)
**Fix Priority:** P0 - Fix before next deploy

**Rationale:** Committed credentials = immediate security vulnerability. Any dev with repo access has production DB access.
```

**Example 2:**
```
### [HIGH] No Input Validation on User Endpoints
**Category:** Security / Code Quality
**Location:** `src/api/user/*.ts` (12 endpoints)
**Impact:** SQL injection, XSS vulnerabilities
**Effort:** 1 week (add Zod schemas + validation middleware)
**Fix Priority:** P1 - Sprint 1

**Rationale:** User-facing endpoints accept raw input. Found 3 instances of string interpolation in queries (lines 45, 78, 103 in user-service.ts).
```

**Example 3:**
```
### [MEDIUM] Outdated Dependencies (React 16)
**Category:** Dependencies / Maintenance
**Location:** `package.json`
**Impact:** Missing performance improvements, no hooks, security patches unavailable
**Effort:** 2-3 weeks (breaking changes in upgrade path)
**Fix Priority:** P2 - Plan for Q2

**Rationale:** React 16 EOL was 2021. Not urgent but blocks future library updates and team productivity.
```

## When Analyzing Real Code

Follow the pattern above:
1. Lead with severity in heading: [CRITICAL], [HIGH], [MEDIUM], [LOW]
2. Title describes the problem, not the symptom
3. Location = exact file paths and line numbers
4. Impact = business/user consequence, not technical description
5. Effort = realistic time estimate
6. Rationale = why this matters, evidence found

Never just list issues—explain priority logic.
```

**Why examples matter:**
- Shows exact format expected (markdown structure, headings)
- Demonstrates reasoning pattern (impact → effort → priority)
- Clarifies tone and specificity level
- Provides severity calibration (what's "critical" vs "medium")

**Research Finding:** Few-shot learning allows AI to recognize patterns and apply them to new situations. For complicated tasks, 2-3 carefully selected examples are critical.

**Source:** [Medium - 5 Prompt Engineering Mistakes](https://medium.com/@kaushalsinh73/5-prompt-engineering-mistakes-that-cost-me-accuracy-and-how-to-fix-them-83204a638769)

---

### Mistake 3: No Verification or Self-Critique

**What happens:** Skill produces output without quality checks, leading to hallucinations and errors
**Why it's wrong:** LLMs make mistakes but can catch them if prompted to self-critique
**Evidence:** Research shows prompting LLM to critique its own work before final answer significantly reduces errors

**Example - No Verification:**
```markdown
# SQL Query Generator

Generate optimized SQL queries based on user requirements.

## Steps
1. Understand the data model
2. Write the SQL query
3. Return the query to user
```

**Correct Approach - With Verification:**
```markdown
# SQL Query Generator

Generate optimized SQL queries based on user requirements.

## Process

### Step 1: Understand Requirements
- What tables are involved?
- What's the expected output?
- Any performance constraints?

### Step 2: Draft Query
Write initial SQL query.

### Step 3: Self-Critique (REQUIRED)

Before returning query, check:

**Correctness:**
- [ ] Does this actually answer the user's question?
- [ ] Are JOIN conditions correct?
- [ ] Is WHERE clause logic sound?

**Performance:**
- [ ] Are indexes being used? (check EXPLAIN)
- [ ] Any N+1 query patterns?
- [ ] Could this be rewritten to avoid subqueries?

**Safety:**
- [ ] No SQL injection vectors?
- [ ] Parameterized inputs only?
- [ ] Appropriate LIMIT clauses?

### Step 4: Revise if Needed

If any critique flags issues, revise query and re-check.

### Step 5: Present with Explanation

**SQL Query:**
```sql
[Query here]
```

**Why this works:**
- Uses index on `user_id` column (fast lookup)
- JOIN on primary keys (optimized)
- LIMIT prevents runaway results
- Parameterized @userId prevents injection

**Expected Performance:** <100ms for tables <1M rows
```

**Why verification matters:**
- **Reduces hallucinations**: Forces Claude to double-check logic
- **Catches edge cases**: Self-critique reveals overlooked scenarios
- **Builds trust**: User sees reasoning, not just output
- **Improves accuracy**: Research shows significant error reduction

**Critical Rule:** For any skill that generates technical output (code, SQL, config, formulas), include mandatory self-critique step.

**Sources:**
- [Medium - Prompt Engineering Mistakes](https://medium.com/@kaushalsinh73/5-prompt-engineering-mistakes-that-cost-me-accuracy-and-how-to-fix-them-83204a638769)
- [Atlas - Why AI Prompts Fail](https://www.heyatlas.com/blog/ai-prompts-fail-how-to-fix)

---

### Mistake 4: Underspecification (Forcing Claude to Guess)

**What happens:** Skill leaves critical details unspecified, forcing Claude to make assumptions
**Why it's wrong:** Under-specified prompts are 2x more likely to regress across model updates, with accuracy drops exceeding 20%
**When it happens:** Vague output requirements, ambiguous success criteria, missing context about audience/purpose

**Example - Underspecified:**
```markdown
# Documentation Writer

Help create clear documentation for technical projects.

## Instructions
- Write clear explanations
- Use examples where helpful
- Make it understandable
```

**Problem:** "Clear" to whom? "Understandable" by what audience? What format? How long?

**Correct Approach - Fully Specified:**
```markdown
# Documentation Writer

## Required Context (Ask if Not Provided)

Before writing, determine:
1. **Audience**: Beginners / Intermediate developers / Experts?
2. **Purpose**: Getting started / API reference / Conceptual guide?
3. **Format**: README / Wiki page / Tutorial / API docs?
4. **Length constraint**: Quick reference (<500 words) / Comprehensive guide (2000+ words)?

## Writing Standards by Audience

### For Beginners
- **Assume zero prior knowledge** of the domain
- Define every technical term on first use
- Include "why" explanations, not just "how"
- Use analogies to familiar concepts
- Example code must be copy-pasteable and run without modification

### For Intermediate Developers
- **Assume basic familiarity** with domain concepts
- Focus on "how" with brief "why" context
- Link to deeper explanations rather than explaining basics
- Show common patterns and best practices
- Code examples can assume working dev environment

### For Experts
- **Assume deep knowledge** of domain and adjacent areas
- Focus on edge cases, performance, and architecture decisions
- Reference specifications and RFCs
- Highlight tradeoffs and alternatives
- Code examples show advanced patterns

## Structure by Purpose

### Getting Started Guide
1. **What is this?** (1-2 sentences)
2. **Installation** (exact commands)
3. **Quick Start** (minimal working example in <5 minutes)
4. **Next Steps** (links to deeper docs)

### API Reference
1. **Function signature** with types
2. **Parameters** (name, type, description, required/optional)
3. **Returns** (type, description)
4. **Example usage** (realistic, not toy examples)
5. **Edge cases / errors** (what can go wrong)

### Conceptual Guide
1. **Problem statement** (why does this exist?)
2. **Mental model** (how to think about it)
3. **Key concepts** (3-5 main ideas)
4. **Common patterns** (how people actually use it)
5. **Further reading** (links to related topics)

## Quality Checklist (Run Before Delivering)

- [ ] Is the first sentence a clear, jargon-free explanation?
- [ ] Can the reader complete a task after reading this?
- [ ] Are code examples tested and working?
- [ ] Are errors/edge cases documented?
- [ ] Is there a "Next Steps" or "See Also" section?

## Output Format

Always include:

**Target Audience:** [Beginners/Intermediate/Expert]
**Document Type:** [Getting Started/API Reference/Conceptual]

[Documentation content]

**Next Steps:**
- [Where to go from here]
```

**Why full specification matters:**
- **Consistency**: Same inputs produce similar outputs across model versions
- **Reduces rework**: Fewer clarification rounds
- **Prevents regression**: Under-specified prompts are 2x more likely to break with model updates
- **Quality control**: Clear success criteria enable self-critique

**Research Evidence:** Simply adding more requirements doesn't work (can degrade performance 19%), but specifying the RIGHT requirements—audience, format, constraints—improves reliability.

**Source:** [ArXiv - Understanding Underspecification in LLM Prompts](https://arxiv.org/html/2505.13360v1)

---

### Mistake 5: Description Field as Documentation (Not Discovery)

**What happens:** Description field contains detailed explanations instead of trigger phrases
**Why it's wrong:** Description is for skill activation, not for explaining what skill does once active
**Impact:** Skill fails to trigger when user uses natural language

**Example - Wrong:**
```markdown
description: "This skill provides expert-level guidance on technical debt management. It helps engineering teams identify, categorize, and prioritize technical debt across multiple dimensions including code quality, architecture, dependencies, testing, and documentation. Use this skill when conducting code reviews, planning refactoring efforts, or assessing codebase health." (plugin:tech-debt-analyzer@skills)
```

**Why this fails:**
- User says: "Is this codebase maintainable?"
- Skill doesn't activate because "maintainable" isn't in description
- User says: "We have a lot of code smells"
- Skill doesn't activate because "code smells" isn't in description

**Correct Approach:**
```markdown
description: "Use when analyzing technical debt, code quality issues, maintainability problems, code smells, architecture issues, dependency problems, missing documentation, security vulnerabilities, testing gaps, refactoring needs, codebase health assessment, or creating technical debt registers." (plugin:tech-debt-analyzer@skills)
```

**Why this works:**
- **Natural language coverage**: Includes varied phrases users actually say
- **Task-oriented**: "analyzing" "assessing" "creating" = verbs that trigger activation
- **Synonym expansion**: "technical debt" + "code quality issues" + "maintainability problems" cover same concept
- **Concrete outcomes**: "creating technical debt registers" = specific deliverable

**Rule for Description Fields:**

**DO:**
- List task verbs: "analyzing", "planning", "creating", "reviewing"
- Include natural language variations: "technical debt" / "code quality" / "maintainability"
- Name specific deliverables: "creating roadmaps", "writing test plans"
- Use third person: "Use when..." or "Help with..."

**DON'T:**
- Explain what the skill does in detail
- Use qualifier phrases: "expert-level", "comprehensive", "Fortune 50"
- Include methodology explanations
- Write in first person: "I help with..."

**Testing Activation:** After writing description, ask:
- Would this trigger if user said: "Our code is messy"?
- Would this trigger if user said: "Should we refactor this?"
- Would this trigger if user said: "What needs fixing?"

If no, add those phrases to description.

**Source:** [Claude Docs - Skill Authoring Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)

---

## Skill-Specific Gotchas

### Domain Expert Skills (fortune50-*)

#### Issue 1: Generic Business Advice Instead of Domain Expertise

**What happens:** Skill provides general business frameworks anyone could find on Google
**Why it's wrong:** "Fortune 50" implies access to insider frameworks, executive decision-making patterns, and real-world tradeoffs

**Example - Generic:**
```markdown
# Fortune 50 Finance Expert

## Financial Analysis

When analyzing financial performance:
- Look at revenue growth
- Check profitability metrics
- Review cash flow
- Compare to industry benchmarks

Use common metrics like:
- Revenue growth rate
- Gross margin %
- Operating margin %
- EBITDA
- Free cash flow
```

**This is wrong because:**
- Any business student knows these metrics
- No insight into HOW executives actually use them
- Missing decision frameworks that separate good from great analysis
- Doesn't show tradeoffs or prioritization

**Expert-Level Approach:**
```markdown
# Fortune 50 Finance Expert

## Financial Analysis: The CFO Decision Stack

When a CFO reviews financial performance, they follow this prioritization:

### Tier 1: Cash Position (Check First, Always)
1. **Days Cash on Hand** = Cash ÷ (Operating Expenses ÷ 365)
   - <30 days = red alert, survival mode
   - 30-90 days = constrained, focus on AR/AP optimization
   - >90 days = healthy, can invest in growth

2. **Cash Conversion Cycle** = DSO + DIO - DPO
   - Goal: Minimize this number
   - Best-in-class: Negative CCC (Dell model—get paid before you pay suppliers)
   - If >90 days = working capital problem, prioritize before growth initiatives

**Why this matters first:** Companies go bankrupt from cash problems, not P&L problems. A profitable company with poor cash management can fail.

### Tier 2: Unit Economics (If Cash is Healthy)
3. **CAC Payback Period** = CAC ÷ (ARPU × Gross Margin)
   - SaaS benchmark: <12 months
   - If >18 months = unsustainable growth, fix go-to-market efficiency
   - If <6 months = underspending on growth, could accelerate

4. **LTV:CAC Ratio** = (ARPU × Avg Lifetime × Gross Margin) ÷ CAC
   - Healthy: 3:1 or better
   - If <3:1 = retention problem or acquisition too expensive
   - If >5:1 = potentially underspending on sales/marketing

**Why this is second:** Growth doesn't matter if unit economics are broken. Fix this before scaling.

### Tier 3: Growth Efficiency (If Units Work)
5. **Rule of 40** = Revenue Growth % + FCF Margin %
   - Benchmark: >40% = healthy SaaS business
   - If <40% = growing too fast at expense of profitability, or too profitable but not growing
   - Tradeoff: Early stage should prioritize growth (60% growth + -20% margin = 40)
   - Mature: Should prioritize margin (20% growth + 25% margin = 45)

**Why this is third:** Only relevant if you have cash and healthy units.

## Executive Decision Points

**Scenario: Revenue growth is slowing**

CFO decision tree:
1. Check CAC Payback—is it increasing?
   - Yes → GTM efficiency problem, not market problem
   - No → Could be market saturation, need new segments

2. Check Net Revenue Retention (NRR)
   - NRR <100% → Churn problem, fix product/CS before spending on acquisition
   - NRR >110% → Healthy, can invest in new customer acquisition

3. Check Sales Efficiency (New ARR ÷ Sales & Marketing Spend)
   - Decreasing → Diminishing returns, current channels tapped out
   - Stable → Can scale spend proportionally
   - Increasing → Pour gas on fire, increase S&M budget

**This is what separates good CFOs from great ones:** They diagnose ROOT CAUSE before reacting. Slowing growth could mean 5 different things—the metrics tell you which.

## Red Flags to Watch For

When user asks for financial analysis, check for:
- ❌ "We need to cut costs" → WHY? Cash problem or profitability problem? Different solutions.
- ❌ "Revenue is down" → Compared to what? Plan? Last year? Last quarter? Seasonal?
- ❌ "Should we raise prices?" → What's your NRR? If <100%, pricing isn't the problem.

## References

- `references/financial-modeling.md` - DCF, LBO, M&A models
- `references/ratio-analysis.md` - Deep dive on 50+ financial ratios
- `references/investor-relations.md` - Board presentation frameworks
```

**Why this is expert-level:**
- **Prioritization**: Not all metrics matter equally—shows what to check first
- **Decision frameworks**: Explicit if/then logic executives actually use
- **Thresholds**: Specific numbers (30 days cash, 3:1 LTV:CAC) not vague "good/bad"
- **Tradeoffs**: Explains when to prioritize growth vs. profitability
- **Root cause diagnosis**: Shows how to interpret metrics to find real problems
- **Domain vocabulary**: CAC, NRR, Rule of 40 = terms professionals use

**Rule for Domain Expert Skills:**
1. Include executive decision frameworks (if X, then Y)
2. Specify numeric thresholds and benchmarks (not "good margin"—say ">40%")
3. Show prioritization logic (what to check first, second, third)
4. Explain tradeoffs (when to choose A vs. B)
5. Use actual professional terminology
6. Include diagnosis patterns (how to find root causes)

---

#### Issue 2: Missing Industry Context

**What happens:** Skill gives advice that's technically correct but doesn't account for industry-specific constraints
**Why it matters:** What works in tech doesn't work in healthcare; what works in retail doesn't work in manufacturing

**Example - Missing Context:**
```markdown
# Fortune 50 Operations Expert

## Inventory Management

Optimal inventory strategy:
- Minimize inventory holding costs
- Use just-in-time (JIT) delivery
- Target <30 days inventory on hand
- Reduce warehouse footprint
```

**This is wrong because:**
- JIT works for automotive, fails for retail (need stock for seasonal demand)
- Tech companies have different inventory than pharmaceutical (perishability)
- Ignores industry-specific constraints (regulatory, lead times, volatility)

**Correct Approach:**
```markdown
# Fortune 50 Operations Expert

## Inventory Strategy: Industry-Specific Frameworks

### Before Recommending Strategy, Classify Industry

**Ask user:** What industry/business model?

Then apply appropriate framework:

#### Tech Hardware / Automotive (JIT Model)
**When to use:**
- Predictable demand
- Reliable supplier base
- Short product lifecycles (components depreciate fast)

**Strategy:**
- Target: <30 days inventory
- Just-in-time delivery
- Vendor-managed inventory (VMI)
- Focus: Minimize holding costs

**Why:** iPhone component costs drop 20% per quarter—holding inventory = losing money

---

#### Retail / Consumer Goods (Seasonal Buffering)
**When to use:**
- Seasonal demand spikes (holidays)
- Long supplier lead times (overseas manufacturing)
- Price-sensitive customers (can't pass on rush shipping)

**Strategy:**
- Target: 60-90 days inventory (build buffer before peak season)
- ABC analysis: Stock A-items deep, C-items shallow
- Pre-season orders with suppliers
- Focus: Product availability during peak

**Why:** Stockout during holiday season = lost sale forever (customer buys from competitor)

---

#### Pharmaceutical / Medical (Regulatory-Driven)
**When to use:**
- Regulatory expiration dates
- Critical availability requirements (can't stockout)
- Long validation cycles for new suppliers

**Strategy:**
- Target: 120+ days inventory (account for expiration)
- Dual sourcing for critical items
- FEFO (First Expire, First Out)
- Focus: Compliance + availability

**Why:** Switching suppliers requires FDA revalidation (6-12 months)—can't just find new supplier

---

## Decision Framework

**Q: User says "We have too much inventory"**

Before answering, determine:
1. What industry? (Determines "too much" threshold)
2. Inventory turnover ratio? (COGS ÷ Avg Inventory)
   - Tech: >10x is good
   - Retail: >5x is good
   - Manufacturing: >3x is good
3. Obsolescence risk? (Short lifecycle = reduce inventory)
4. Stockout cost? (Critical availability = keep more inventory)

Then recommend strategy based on their specific context.

## References

- `references/supply-chain-optimization.md` - Industry-specific SCM strategies
- `references/inventory-models.md` - EOQ, JIT, VMI, ABC analysis deep dives
```

**Why this works:**
- **Context-aware**: Asks industry before recommending strategy
- **Industry frameworks**: Different advice for tech vs. retail vs. pharma
- **Tradeoffs explicit**: Explains WHY strategies differ (lifecycle, regulation, seasonality)
- **Decision support**: Helps determine which model applies

---

### Generic Code Skills (generic-*)

#### Issue 1: Checklist Without Reasoning

**What happens:** Skill is just a list of things to check, no guidance on prioritization or judgment
**Why it's wrong:** Claude doesn't know WHEN to enforce rules strictly vs. when to be flexible

**Example - Pure Checklist:**
```markdown
# Generic Code Reviewer

## Review Checklist

- [ ] No TypeScript `any` types
- [ ] All functions <50 lines
- [ ] No console.log statements
- [ ] All variables use const/let
- [ ] No hardcoded strings
- [ ] All errors handled
- [ ] WCAG AA compliance
- [ ] Tests included
```

**Problems:**
- No prioritization (are all these equal?)
- No context (50 lines always? or guideline?)
- No judgment (when is breaking a rule OK?)

**Correct Approach:**
```markdown
# Generic Code Reviewer

## Review Philosophy: Surgical Simplicity

Not all rules are equal. Prioritize:
1. **Correctness** - Does it work?
2. **Safety** - Type safety, security, error handling
3. **Maintainability** - Can next dev understand it?
4. **Performance** - Only if user-facing impact

## P0 Issues (Block Merge)

### Type Safety
**Rule:** No `any` types
**Why:** `any` defeats TypeScript's purpose
**Exception:** External library without types → use `unknown` and validate at runtime
**How to flag:** "Found `any` type in X. Use `SomeType` instead, or `unknown` if truly dynamic."

### Security
**Rule:** No `innerHTML`, no exposed secrets, sanitize inputs
**Why:** Prevents XSS, credential leaks, injection
**Exception:** NEVER. Security rules have no exceptions.
**How to flag:** "BLOCKING: Found `innerHTML` at line X. Use `textContent` or DOMPurify."

### Error Handling
**Rule:** Async functions must have try/catch or `.catch()`
**Why:** Unhandled promise rejections crash apps
**Exception:** If error is handled by framework (React Error Boundary, Next.js error.tsx)
**How to flag:** "Async function X doesn't handle errors. Add try/catch or document why framework handles this."

## P1 Issues (Should Fix)

### Function Size
**Guideline:** <50 lines preferred
**Why:** Easier to test, understand, reuse
**Exception:** Complex algorithms where splitting hurts readability (mark with comment explaining)
**How to flag:** "Function X is 87 lines. Consider extracting Y and Z into separate functions."

### Code Duplication
**Guideline:** Extract after 3rd repetition (DRY)
**Why:** Single source of truth
**Exception:** Similar-looking code that serves different purposes (don't force abstraction)
**How to flag:** "Found repeated pattern in X, Y, Z. Consider creating shared utility `doThing()`."

## P2 Issues (Nice to Have)

### Performance
**Guideline:** No obvious bottlenecks
**Why:** User experience
**When to mention:** If you see N+1 queries, unnecessary re-renders, or blocking operations on hot paths
**When to skip:** Micro-optimizations, code that runs once on load
**How to flag:** "This re-renders on every keystroke. Consider debouncing or useMemo."

## Review Output Format

Only report issues found (don't list empty categories):

**Blocking Issues:**
- [Only if found]

**Should Fix:**
- [Only if found]

**Consider:**
- [Only if found]

**If no issues:** "Code looks good. Follows type safety and security standards."

## Judgment Calls

**When user asks "Is this OK?"**

Consider:
- Is this production code or prototype? (Stricter for production)
- Is this hot path or one-time setup? (Performance matters more on hot path)
- Is this public API or internal helper? (More rigor for public APIs)

Adjust expectations accordingly.
```

**Why this works:**
- **Prioritization**: P0/P1/P2 hierarchy prevents overwhelming with minor issues
- **Reasoning**: Explains WHY each rule matters
- **Exceptions**: Shows when rules can flex (prevents rigid enforcement)
- **Judgment**: Guides context-aware decisions
- **Selective output**: Only reports actual issues, not full checklist

---

#### Issue 2: Tech Stack Assumptions

**What happens:** Skill assumes React/TypeScript when user might be using Vue/Python
**Why it's wrong:** "Generic" skills should adapt to user's stack, not impose assumptions

**Example - Assumed Stack:**
```markdown
# Generic Feature Developer

## Component Structure

Create React components following this pattern:

```typescript
interface Props {
  title: string;
}

export function Component({ title }: Props) {
  return <div>{title}</div>;
}
```

Use hooks for state management...
```

**Problem:** User might be building:
- Vue app (use SFCs, not React components)
- Python backend (no TypeScript)
- Static HTML site (no components)

**Correct Approach:**
```markdown
# Generic Feature Developer

## Architecture Guidance (Stack-Agnostic)

### Step 1: Identify Tech Stack

**Before suggesting architecture, determine:**
- What framework/language? (React, Vue, Python, static HTML, etc.)
- What patterns does this project already use?

**Check existing code:**
```bash
# Look for package.json (JavaScript project)
# Look for requirements.txt (Python project)
# Look for *.vue files (Vue project)
# Look for tsx/jsx (React project)
```

### Step 2: Apply Stack-Specific Patterns

#### For React/TypeScript Projects
- Use functional components + hooks
- Props interface required
- Prefer composition over inheritance

```typescript
interface Props { title: string }
export function Component({ title }: Props) {
  return <div>{title}</div>
}
```

---

#### For Vue Projects
- Use Single File Components (SFC)
- Composition API preferred over Options API
- TypeScript with defineProps

```vue
<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div>{{ title }}</div>
</template>
```

---

#### For Python Projects
- Type hints on all functions
- Pydantic for validation
- Dependency injection for services

```python
from pydantic import BaseModel

class UserInput(BaseModel):
    title: str

def process(data: UserInput) -> dict:
    return {"result": data.title}
```

---

#### For Static HTML Sites
- No build step, pure HTML/CSS/JS
- ES6+ syntax OK (modern browsers)
- Event delegation for performance

```html
<div id="app"></div>
<script>
  const app = document.getElementById('app');
  app.textContent = 'Hello';
</script>
```

### Step 3: Follow Project Conventions

**Before suggesting pattern, check:**
- How do existing files structure code?
- What naming conventions are used?
- Are there linting rules to follow?

**Match existing patterns > impose new ones**

## When Stack is Unclear

If you can't determine stack from context:

**Ask:**
"I see this could be [React/Vue/Python/etc.]. What framework are you using? This will help me suggest the right architecture."

**Never assume** and generate code in wrong framework.
```

**Why this works:**
- **Detection first**: Checks project before suggesting patterns
- **Multi-stack support**: Covers common stacks
- **Respects existing**: Follows project conventions over skill preferences
- **Fails safely**: Asks if unclear rather than guessing wrong

---

### Utility Skills (Workflow/Tool Skills)

#### Issue: Tool Description Without Usage Workflow

**What happens:** Skill explains what it CAN do but not HOW/WHEN to use it
**Why it's wrong:** User doesn't know when to invoke skill or what steps to follow

**Example - Tool Description Only:**
```markdown
# Create Slash Command

This skill helps you create custom slash commands for Claude Code.

Slash commands are shortcuts that execute prompts. They can include:
- Static prompts
- Dynamic arguments
- YAML frontmatter
- Conditional logic

The skill generates command files in `.claude/commands/` directory.
```

**Problem:**
- No workflow (what are the steps?)
- No decision guidance (when to use vs. not use?)
- No examples (what does good output look like?)

**Correct Approach:**
```markdown
# Create Slash Command

## When to Use This Skill

**Create a slash command when:**
- User repeats same multi-step task frequently
- Task needs context (arguments, dynamic inputs)
- Workflow is established and reusable

**Don't create a slash command when:**
- Task is one-off or rarely used (just do it directly)
- Workflow is still being figured out (too early to codify)
- Task is simple enough to remember without command

## Workflow: Creating a Slash Command

### Step 1: Gather Requirements

**Ask user (if not provided):**
1. What should the command be called? (e.g., `/deploy`, `/test-feature`)
2. What arguments does it need? (e.g., environment name, feature flag)
3. What's the step-by-step process to automate?
4. Are there any conditional steps? (e.g., skip tests if flag set)

### Step 2: Design Command Structure

**Basic command anatomy:**
```markdown
---
name: command-name
description: What this command does (one line)
arguments:
  - name: arg1
    description: What this argument is for
    required: true
---

# Command: {name}

## What This Does
[Explain the workflow]

## Steps
1. First step
2. Second step
3. Third step

## Example Usage
/command-name value1
```

### Step 3: Write Command File

**File location:** `.claude/commands/{name}.md`

**Example - Deploy Command:**
```markdown
---
name: deploy
description: Deploy application to specified environment
arguments:
  - name: environment
    description: Target environment (staging, production)
    required: true
  - name: skip-tests
    description: Skip test suite (use for hotfixes)
    required: false
---

# Command: Deploy to {environment}

## Pre-Deployment Checks

1. Verify environment is valid:
   - If not "staging" or "production", error and exit

2. Check git status:
   - If uncommitted changes, warn user

3. Run tests (unless skip-tests flag set):
   ```bash
   npm run test
   ```
   - If tests fail, stop deployment

## Deployment Steps

4. Build for {environment}:
   ```bash
   npm run build:{environment}
   ```

5. Deploy to {environment}:
   ```bash
   ./scripts/deploy.sh {environment}
   ```

6. Verify deployment:
   ```bash
   curl https://{environment}.example.com/health
   ```

7. Notify user of success/failure

## Example Usage

Deploy to staging:
```
/deploy staging
```

Deploy to production (skip tests for hotfix):
```
/deploy production --skip-tests
```
```

### Step 4: Test Command

**After creating, verify:**
1. Run `/deploy staging` to test
2. Check that arguments are captured correctly
3. Verify conditional logic works (try `--skip-tests`)

### Step 5: Document for User

**Tell user:**
"Created `/deploy` command at `.claude/commands/deploy.md`

**Usage:**
- Deploy to staging: `/deploy staging`
- Deploy to production: `/deploy production`
- Skip tests (hotfix): `/deploy production --skip-tests`

**Next steps:**
- Test with `/deploy staging` to verify workflow
- Adjust steps if needed"

## Quality Checklist

Before delivering slash command, verify:
- [ ] Name is clear and follows existing command naming
- [ ] Description is one line, concise
- [ ] Arguments are documented with required/optional
- [ ] Steps are numbered and sequential
- [ ] Examples show actual usage
- [ ] Conditional logic is explicit (if X, then Y)

## Common Mistakes to Avoid

**❌ Vague steps:**
```
1. Check environment
2. Deploy code
```

**✅ Specific steps:**
```
1. Verify environment argument is "staging" or "production"
   - If neither, show error: "Invalid environment. Use 'staging' or 'production'"
   - Exit if invalid
2. Run deployment script:
   ```bash
   ./scripts/deploy.sh {environment}
   ```
   - Capture output
   - If exit code ≠ 0, report failure
```

## References

- `.claude/commands/` - Existing commands to reference
- Claude Code docs on slash command syntax
```

**Why this works:**
- **Decision guidance**: When to use vs. not use
- **Step-by-step workflow**: Gather requirements → Design → Write → Test → Document
- **Concrete examples**: Shows complete command file, not just description
- **Quality checks**: Prevents common mistakes
- **Usage examples**: Shows user what they'll get

**Rule for Utility Skills:**
1. Start with "When to use" vs. "When not to use"
2. Provide numbered workflow (Step 1, Step 2, etc.)
3. Include complete examples of outputs
4. Add quality checklist
5. Show common mistakes to avoid

---

## Decision Risks

### Risk: `generic-*` Naming Convention

**Risk Level:** LOW
**Concern:** "Generic" might imply low quality or basic functionality
**Counter-evidence:** Naming matches existing project structure; describes applicability (works across stacks) not quality level
**Mitigation:** Ensure skill descriptions emphasize "works with any stack" not "basic/simple"

**Example:**
- ❌ "Generic code review for simple projects"
- ✅ "Code review for any tech stack - adapts to React, Vue, Python, static sites, etc."

---

### Risk: SKILL.md + references/ Structure

**Risk Level:** MEDIUM
**Concern:** Claude might not read reference files when needed, defaulting to incomplete guidance from SKILL.md
**Real Issue:** If SKILL.md doesn't explicitly cue Claude to check references/ at decision points, deep content might be ignored

**Mitigation Strategies:**

#### 1. Explicit Signposting in SKILL.md

**Instead of:**
```markdown
## Brand Strategy

When developing brand strategy, consider positioning, architecture, and equity.
```

**Use:**
```markdown
## Brand Strategy Decision Point

**For quick brand decisions:** Use framework below
**For comprehensive brand strategy:** READ `references/brand-strategy.md` for portfolio architecture, equity measurement, and master brand vs. sub-brand decisions

### Quick Framework (Use for Simple Cases)
[Condensed guidance]

### When to Go Deep
If user asks about:
- Multi-product brand architecture → READ references/brand-strategy.md
- Brand equity measurement → READ references/brand-strategy.md
- Master brand vs. sub-brand decisions → READ references/brand-strategy.md
```

#### 2. Decision Trees Point to References

```markdown
## Marketing Strategy: Decision Tree

**Question 1:** Is this a product launch or ongoing campaign?
- Product launch → READ references/gtm-playbook.md (comprehensive launch framework)
- Ongoing campaign → Continue to Question 2

**Question 2:** What's the primary goal?
- Demand generation → Use quick framework below
- Brand awareness → READ references/brand-strategy.md
```

#### 3. Reference Inventory in SKILL.md

```markdown
# Fortune 50 Marketing Expert

## Reference Library

When user needs deep guidance, point them to:
- `references/brand-strategy.md` - Portfolio architecture, equity, positioning
- `references/gtm-playbook.md` - Product launch, go-to-market strategy
- `references/campaign-playbook.md` - Campaign planning, media mix
- `references/analytics-frameworks.md` - Attribution, CAC, LTV modeling

**How to use:** When conversation requires depth beyond quick frameworks below, READ relevant reference and apply to user's specific situation.
```

#### 4. Size Threshold Guidance

**SKILL.md should be:**
- ~5-10KB max
- Core decision frameworks
- Activation logic
- Signposts to references

**references/ should contain:**
- Deep dives (10-20KB each)
- Comprehensive frameworks
- Detailed examples
- Industry-specific adaptations

**Test:** If SKILL.md alone can handle 80% of queries effectively, structure is correct. If users frequently need references, consider moving more key content into SKILL.md.

---

### Risk: Inflating Thin Skills with Padding

**Risk Level:** HIGH
**Concern:** Claude might add generic filler to make thin skills appear more substantial
**Why it's dangerous:** Bloated skills waste tokens, reduce activation reliability, and don't actually improve quality

**Example of Padding:**
```markdown
# UX Designer

## Introduction
User experience design is a critical discipline that shapes how users interact with products. Good UX design creates intuitive, accessible, and delightful experiences. Throughout the years, UX has evolved from basic usability testing to comprehensive design thinking methodologies that encompass user research, interaction design, visual design, and usability evaluation.

## History of UX
[3000 words of UX history that doesn't help Claude do the job]

## Importance of UX
[2000 words explaining why UX matters]

## Core Principles
[Generic principles found in any UX textbook]
```

**This is padding because:**
- History doesn't change how Claude should approach UX tasks
- "Importance" doesn't provide actionable guidance
- Generic principles without application context waste tokens

**Correct Approach for Thin Skills:**

If a skill is genuinely thin (limited scope), **keep it thin**:

```markdown
# UX Quick Critique

## When to Use
When user asks for fast UX feedback on specific UI elements or flows (not comprehensive UX strategy).

## Critique Framework

Evaluate against:

1. **Clarity**: Can user understand what this does in <3 seconds?
   - If no: What's confusing? Suggest clearer labels/hierarchy

2. **Accessibility**: Can everyone use this?
   - Check: Color contrast, keyboard navigation, screen reader support
   - Flag issues, suggest fixes

3. **Efficiency**: Minimum steps to complete task?
   - Count clicks/taps
   - If >3 steps for simple task: Suggest streamlining

4. **Consistency**: Matches existing patterns in this product?
   - If deviates: Is there a good reason? If not, align with existing

## Output Format

**Quick Wins:**
- [Easy improvements]

**Accessibility Issues:**
- [WCAG AA violations]

**Suggested Changes:**
- [Specific recommendations]

## When to Use Different Skill

If user needs:
- Complete UX strategy → Use `generic-ux-designer` skill
- Design system → Use `generic-design-system` skill
- User research plan → Use `generic-ux-designer` skill
```

**Why this is correct:**
- Focused scope (quick critiques only)
- Actionable framework (4 criteria with specific checks)
- Acknowledges limitations (points to other skills for comprehensive work)
- No padding (every sentence serves a purpose)

**Rule:**
- 5KB of focused, actionable content > 15KB with padding
- If skill is legitimately narrow scope, keep it narrow
- Add references/ for depth, not padding in SKILL.md
- Every paragraph must answer: "How does this help Claude do the job better?"

**Quality test:** Can you remove any section without reducing Claude's ability to perform the task? If yes, remove it.

---

## Critical Warnings

### 1. Don't Inflate Thin Skills with Padding

**Why:** Bloat wastes tokens, reduces activation reliability, and doesn't improve quality
**How to avoid:** Every sentence must answer "How does this help Claude perform the task?"
**Test:** If you can remove a section without reducing task performance, remove it
**Better approach:** Keep focused skills focused; add references/ for depth, not padding

---

### 2. Don't Lose Backward Compatibility

**Why:** Existing users rely on current activation patterns
**How to avoid:**
- Keep existing description trigger phrases
- Add new triggers, don't replace old ones
- Test that old queries still activate skill
**Example:**
- Old: "Use for marketing strategy"
- New: "Use for marketing strategy, campaigns, brand development, product launches..." (adds triggers, keeps old)

---

### 3. Don't Add Theory Without Application

**Why:** LLMs default to explaining concepts rather than executing tasks
**How to avoid:**
- Every framework must include step-by-step usage
- Every concept must have "when to use" + "how to apply"
- Provide examples showing application, not just explanation
**Test:** After reading skill, can Claude execute the task? Or just explain it?

---

### 4. Don't Forget Activation Testing

**Why:** Skills that don't trigger on natural language are useless
**How to avoid:**
- List 10 ways users might describe this task
- Ensure description field includes those phrases
- Test: Would skill activate if user said "Our code is messy"?
**Tool:** After writing description, generate test queries and verify activation

---

### 5. Don't Exceed ~10 Simultaneous Instructions

**Why:** Research proves LLM performance degrades 19% when overloaded; Claude follows 10+ instructions only 44-58% of the time
**How to avoid:**
- Use tiered priorities (P0/P1/P2) instead of flat lists
- Break complex skills into decision trees
- Group related instructions into single directive
**Test:** Count explicit instructions in skill; if >10, refactor into hierarchy

**Sources:**
- [OpenReview - Curse of Instructions](https://openreview.net/forum?id=R6q67CDBCH)
- [ArXiv - LLM Instruction Following Limits](https://arxiv.org/pdf/2507.11538)

---

### 6. Under-Specification Causes Regression

**Why:** Vague requirements are 2x more likely to break across model updates, with accuracy drops >20%
**How to avoid:**
- Specify audience, format, and constraints explicitly
- Don't rely on Claude to "figure out" what you mean
- Include success criteria and output format
**Test:** Could a different model/version interpret this skill differently? If yes, add specificity

**Source:** [ArXiv - Underspecification in LLM Prompts](https://arxiv.org/html/2505.13360v1)

---

### 7. Always Include Self-Critique for Technical Output

**Why:** Research shows prompting LLM to verify its own work significantly reduces errors
**How to avoid:** Any skill generating code, SQL, configs, or formulas must include mandatory verification step
**Pattern:**
```markdown
## Step N: Self-Critique (REQUIRED)

Before presenting output, check:
- [ ] Correctness: Does this actually work?
- [ ] Edge cases: What could break this?
- [ ] Performance: Any obvious bottlenecks?

If any issues found, revise and re-check.
```

**Source:** [Medium - Prompt Engineering Mistakes](https://medium.com/@kaushalsinh73/5-prompt-engineering-mistakes-that-cost-me-accuracy-and-how-to-fix-them-83204a638769)

---

## Token Efficiency Pitfalls

### Common Token Waste Patterns

1. **Repeating system context in every reference file**
   - ❌ Every references/*.md starts with "You are a Fortune 50 expert..."
   - ✅ Context in SKILL.md once; references assume it

2. **Verbose explanations instead of direct instructions**
   - ❌ "When considering the various factors that might influence..."
   - ✅ "Consider these factors:"

3. **Example bloat (too many examples)**
   - ❌ 10 examples of the same pattern
   - ✅ 2-3 carefully selected examples showing variation

4. **Defensive language and caveats**
   - ❌ "This might not work in all cases, but generally speaking, you could potentially..."
   - ✅ "Use this pattern for X. Exception: Y."

### Token Optimization Strategies

**Concise instruction patterns:**

❌ Verbose:
```markdown
I would recommend that you first take a moment to carefully consider whether or not the user's request is something that would benefit from a comprehensive analysis or if perhaps a quicker, more streamlined response might be more appropriate given the context.
```

✅ Concise:
```markdown
Determine: Does user need comprehensive analysis or quick answer?
- Comprehensive: READ references/deep-dive.md
- Quick: Use framework below
```

**Savings:** 27 tokens → 15 tokens (44% reduction)

---

**Use structured formats over prose:**

❌ Prose:
```markdown
The first thing you should do is check whether the code has any type safety issues. Look for places where the any type is being used, and also make sure that all the TypeScript strict mode checks are enabled in the tsconfig file.
```

✅ Structured:
```markdown
1. Check type safety:
   - No `any` types → Use explicit types or `unknown`
   - Verify tsconfig.json: `"strict": true`
```

**Savings:** 38 tokens → 18 tokens (53% reduction)

---

**Eliminate filler words:**

| Filler | Direct |
|--------|---------|
| "In order to" | "To" |
| "At this point in time" | "Now" |
| "Due to the fact that" | "Because" |
| "It is important to note that" | [Delete entirely] |
| "One of the things that" | [Delete, get to point] |

---

**Reference file structure (token-efficient):**

```markdown
# Brand Strategy Reference

## Portfolio Architecture

### Single Brand
**When:** One product, clear positioning
**Example:** Tesla (one brand, multiple products)

### Master Brand + Sub-brands
**When:** Related products, shared equity
**Example:** Google (master) + Gmail, Maps (sub-brands)

### House of Brands
**When:** Unrelated products, separate positioning
**Example:** P&G (Tide, Gillette, Pampers)

## Decision Framework

Revenue <$10M → Single brand (simplicity)
Revenue $10M-$100M → Master + sub-brands (leverage equity)
Revenue >$100M → Evaluate house of brands (optimize positioning)
```

**No introductions, no conclusions, no "as mentioned above"—just frameworks and decisions.**

---

## Research Methodology

This research synthesized findings from:
- Academic papers on LLM instruction-following limitations
- Claude official documentation on skill authoring
- Prompt engineering best practices (2025)
- Token optimization strategies
- Real-world skill activation failures

**Key insight:** Most prompt/skill failures come from:
1. Overloading (>10 instructions)
2. Under-specification (forcing LLM to guess)
3. Missing examples (LLMs learn from examples, not just rules)
4. Poor activation (description doesn't match natural language)
5. Theory without action (explaining vs. executing)

---

## Sources

- [Lakera - Prompt Engineering Guide 2025](https://www.lakera.ai/blog/prompt-engineering-guide)
- [Latitude - Common LLM Prompt Engineering Challenges](https://latitude-blog.ghost.io/blog/common-llm-prompt-engineering-challenges-and-solutions/)
- [ArXiv - Taxonomy of Prompt Defects](https://arxiv.org/html/2509.14404)
- [Medium - 5 Prompt Engineering Mistakes](https://medium.com/@kaushalsinh73/5-prompt-engineering-mistakes-that-cost-me-accuracy-and-how-to-fix-them-83204a638769)
- [ArXiv - Understanding Underspecification in LLM Prompts](https://arxiv.org/html/2505.13360v1)
- [ODSC - 14 Prompt Engineering Mistakes](https://odsc.com/blog/beyond-prompt-and-pray-14-prompt-engineering-mistakes-youre-probably-still-making/)
- [Palantir - Best Practices for LLM Prompt Engineering](https://www.palantir.com/docs/foundry/aip/best-practices-prompt-engineering)
- [LearnPrompting - LLM Limitations](https://learnprompting.org/docs/basics/pitfalls)
- [Claude Docs - Skill Authoring Best Practices](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices)
- [Optimizely - How to Write AI Instructions](https://www.optimizely.com/insights/blog/how-to-write-ai-instructions/)
- [Claude Docs - Token-Efficient Tool Use](https://docs.claude.com/en/docs/agents-and-tools/tool-use/token-efficient-tool-use)
- [ClaudeLog - Optimizing Token Usage](https://claudelog.com/faqs/how-to-optimize-claude-code-token-usage/)
- [AllAboutAI - Use Less Tokens in Claude](https://www.allaboutai.com/ai-how-to/use-less-tokens-in-claude/)
- [Medium - Optimizing Token Efficiency in Claude Code](https://medium.com/@pierreyohann16/optimizing-token-efficiency-in-claude-code-workflows-managing-large-model-context-protocol-f41eafdab423)
- [Portkey - Optimize Token Efficiency](https://portkey.ai/blog/optimize-token-efficiency-in-prompts/)
- [OpenReview - Curse of Instructions](https://openreview.net/forum?id=R6q67CDBCH)
- [ArXiv - Instruction Hierarchy](https://arxiv.org/html/2404.13208v1)
- [ArXiv - How Many Instructions Can LLMs Follow](https://arxiv.org/pdf/2507.11538)
- [Atlas - Why AI Prompts Fail](https://www.heyatlas.com/blog/ai-prompts-fail-how-to-fix)
- [HackerNoon - Help My Prompt is Not Working](https://hackernoon.com/help-my-prompt-is-not-working)
- [Medium - Why Your AI Prompt Isn't Working](https://medium.com/@AskWithAi/why-your-ai-prompt-isnt-working-and-how-to-fix-it-3122b5ed3662)
- [Medium - Prompt Troubleshooting](https://medium.com/@deudney/prompt-troubleshooting-the-macgyvers-guide-to-fixing-ai-fails-be766bd72fd9)

---

*Research completed: 2025-12-17*
*Next: Use these findings to guide skill enhancement decisions*
