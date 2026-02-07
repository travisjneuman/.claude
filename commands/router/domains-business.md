# Business Domain Reference

Load this file when business/strategy keywords detected.

## Domain Detection Keywords

| Domain           | Keywords                                                                           |
| ---------------- | ---------------------------------------------------------------------------------- |
| `startup`        | startup, launch, mvp, validate, pivot, founder, venture                            |
| `finance`        | finance, financial, valuation, dcf, lbo, investment, roi, budget, cashflow         |
| `marketing`      | marketing, campaign, brand awareness, seo, analytics, funnel, growth, acquisition  |
| `sales`          | sales, pipeline, crm, revenue, deals, quota, forecast, commission                  |
| `product`        | product, roadmap, prioritization, backlog, feature, user story, prd, sprint        |
| `strategy`       | strategy, competitive, market analysis, swot, positioning, moat                    |
| `operations`     | operations, supply chain, logistics, process, efficiency, workflow                 |
| `hr`             | hr, hiring, talent, recruiting, culture, onboarding, retention, performance review |
| `leadership`     | leadership, management, team, org, 1:1, feedback, delegation, coaching             |
| `legal`          | legal, compliance, gdpr, privacy, terms, contract, ip, trademark                   |
| `risk`           | risk, mitigation, contingency, insurance, audit, liability                         |
| `innovation`     | innovation, r&d, patents, ideation, disruption, research                           |
| `sustainability` | sustainability, esg, environmental, carbon, green, social responsibility           |
| `monetization`   | pricing, monetization, revenue model, saas, subscription, freemium, premium        |
| `health`         | wellness, health, employee, ergonomic, mental health, benefits                     |
| `rd`             | r&d, research, development, experiment, prototype                                  |
| `customer-success` | support, ticketing, knowledge base, chatbot, helpdesk, zendesk, intercom         |
| `growth`         | growth, plg, product-led, experimentation, feature flags, a/b testing, funnel      |
| `project-mgmt`   | project management, agile, scrum, kanban, jira, sprint planning, velocity          |

## Resource Mapping

| Domain           | Skill                          | Agent                 |
| ---------------- | ------------------------------ | --------------------- |
| `startup`        | `Skill(startup-launch)`        | `startup-advisor`     |
| `finance`        | `Skill(finance)`               | -                     |
| `marketing`      | `Skill(marketing)`             | -                     |
| `sales`          | `Skill(sales)`                 | -                     |
| `product`        | `Skill(product-management)`    | -                     |
| `strategy`       | `Skill(business-strategy)`     | -                     |
| `operations`     | `Skill(operations)`            | -                     |
| `hr`             | `Skill(hr-talent)`             | -                     |
| `leadership`     | `Skill(leadership)`            | -                     |
| `legal`          | `Skill(legal-compliance)`      | -                     |
| `risk`           | `Skill(risk-management)`       | -                     |
| `innovation`     | `Skill(innovation)`            | -                     |
| `sustainability` | `Skill(sustainability-esg)`    | -                     |
| `monetization`   | `Skill(monetization-strategy)` | `monetization-expert` |
| `health`         | `Skill(health-wellness)`       | -                     |
| `rd`             | `Skill(rd-management)`         | -                     |
| `customer-success` | `Skill(customer-success)`    | -                     |
| `growth`         | `Skill(growth-engineering)`    | -                     |
| `project-mgmt`   | `Skill(product-management)`   | -                     |

## Marketplace Resources for Business

| Domain           | Marketplace Repos                             | Notes                        |
| ---------------- | --------------------------------------------- | ---------------------------- |
| Finance/Equity   | `quant-equity-research`                       | Quantitative equity research |
| Enterprise/SAP   | `secondsky-sap-skills` (33)                   | SAP enterprise tools         |
| General business | `davila7-templates`, `madappgang-claude-code` | Templates and patterns       |

Search for business-specific marketplace skills:

```bash
find ~/.claude/plugins/marketplaces -name "SKILL.md" | xargs grep -li "<business keyword>"
```
