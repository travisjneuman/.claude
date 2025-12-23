---
description: AI-powered skill recommendation based on your problem description
arguments:
  - name: problem
    description: "Describe what you're trying to accomplish or the problem you're facing"
    required: true
---

# Skill Finder - AI-Powered Recommendation

Analyzes your problem and recommends the best skills, agents, and marketplace resources.

## Analysis: `{{problem}}`

### Step 1: Problem Classification

Classify the problem into categories:

| Category | Indicators |
|----------|------------|
| **Build/Create** | "build", "create", "implement", "add", "new" |
| **Fix/Debug** | "fix", "debug", "error", "broken", "not working" |
| **Optimize** | "slow", "performance", "improve", "optimize" |
| **Review/Quality** | "review", "check", "quality", "audit" |
| **Design/Plan** | "design", "architecture", "plan", "structure" |
| **Learn/Explore** | "understand", "how does", "explain", "explore" |

### Step 2: Domain Detection

Scan for domain keywords (same as /start-task):
- Frontend, Backend, Database, DevOps
- Mobile (iOS, Android, React Native, Flutter)
- Testing, Security, Documentation
- Business, Design, AI/ML

### Step 3: Recommend Resources

**Based on analysis, recommend:**

#### Primary Skill
The most relevant skill for this exact problem.

#### Supporting Skills
Additional skills that may help.

#### Relevant Agents
Specialized agents via Task tool.

#### Marketplace Resources
Skills from installed marketplaces.

#### Decision Frameworks (if applicable)
- `/consider:first-principles` - Technical choices
- `/consider:eisenhower-matrix` - Prioritization
- `/consider:5-whys` - Root cause analysis

---

## Example Recommendations

### Problem: "My React app is slow"
**Primary:** `Skill(performance-optimizer)` via Task agent
**Supporting:** `Skill(generic-react-code-reviewer)`
**Agent:** `Task(performance-optimizer)`
**Marketplace:** Check wshobson-agents for react-performance

### Problem: "Design a REST API for users"
**Primary:** `Skill(api-design)`
**Supporting:** `Skill(database-expert)`, `Skill(security)`
**Agent:** `Task(api-designer)`
**Decision:** `/consider:first-principles` for API style

### Problem: "Set up CI/CD for my project"
**Primary:** `Skill(devops-cloud)`
**Agent:** `Task(devops-specialist)`
**Marketplace:** wshobson-agents has CI/CD specialists
**Route:** Consider `/gsd:new-project` for multi-step setup

---

## Quick Match Reference

| If problem involves... | Use these skills |
|------------------------|------------------|
| React/frontend | `generic-react-*`, `frontend-enhancer` |
| API/backend | `api-design`, `database-expert` |
| Mobile | `ios-development`, `android-development` |
| Testing | `test-specialist`, `tdd-workflow` |
| Performance | Task agent: `performance-optimizer` |
| Security | `security`, Task agent: `security-auditor` |
| DevOps | `devops-cloud`, Task agent: `devops-specialist` |
| Documentation | `codebase-documenter` |
| Business | `startup-launch`, `business-strategy` |

---

## After Recommendation

Once skills are identified:
1. Load primary skill: `Skill(name)`
2. Use `/start-task` for intelligent routing
3. Or invoke agent directly via Task tool
