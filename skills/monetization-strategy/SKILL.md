---
name: monetization-strategy
description: Revenue models, pricing strategies, and business monetization. Use when designing pricing, choosing business models, or optimizing revenue for products and services.
---

# Monetization Strategy

Comprehensive guide for monetizing products and services effectively.

## Revenue Model Types

### Overview

| Model             | How It Works               | Best For                  |
| ----------------- | -------------------------- | ------------------------- |
| **Subscription**  | Recurring payment          | SaaS, content, services   |
| **Transactional** | Pay per use/purchase       | E-commerce, marketplaces  |
| **Freemium**      | Free tier + paid upgrades  | Consumer apps, tools      |
| **Advertising**   | Sponsors pay for attention | Media, social, free tools |
| **Marketplace**   | Take % of transactions     | Two-sided platforms       |
| **Licensing**     | Pay for usage rights       | Software, IP, content     |
| **Affiliate**     | Commission on referrals    | Content, reviews          |
| **Data**          | Sell insights/data         | Analytics, research       |

---

## Subscription Models

### Pricing Tiers

```
GOOD-BETTER-BEST Framework:
┌─────────────────────────────────────────┐
│ BASIC (Good)                            │
│ Entry point, core features only         │
│ Price anchor, volume driver             │
├─────────────────────────────────────────┤
│ PROFESSIONAL (Better) ← Target tier     │
│ Most popular, best value                │
│ Features most users need                │
├─────────────────────────────────────────┤
│ ENTERPRISE (Best)                       │
│ Premium features, support, SLAs         │
│ High-value customers, custom pricing    │
└─────────────────────────────────────────┘

Typical ratio: 1x : 2.5x : 6x+ pricing
```

### SaaS Metrics

| Metric    | Formula                                 | Target      |
| --------- | --------------------------------------- | ----------- |
| **MRR**   | Monthly Recurring Revenue               | Growing     |
| **ARR**   | MRR × 12                                | Growing     |
| **ARPU**  | Revenue / Users                         | Increasing  |
| **Churn** | Lost Revenue / Total                    | <5% monthly |
| **LTV**   | ARPU × Average Lifespan                 | > 3× CAC    |
| **CAC**   | Sales+Marketing / New Customers         | < ⅓ LTV     |
| **NRR**   | (Start MRR + Expansion - Churn) / Start | >100%       |

### Subscription Best Practices

```
DO:
✓ Offer annual discount (15-20%)
✓ Make cancellation friction-free
✓ Send value reminders (usage emails)
✓ Offer downgrade before cancel
✓ Build expansion revenue paths

DON'T:
✗ Hide pricing
✗ Make cancellation difficult
✗ Surprise users with charges
✗ Neglect failed payment recovery
✗ Ignore inactive subscribers
```

---

## Freemium Models

### Freemium Types

| Type                | Free Tier Limit | Examples           |
| ------------------- | --------------- | ------------------ |
| **Feature-limited** | Core only       | Slack, Notion      |
| **Usage-limited**   | Quantity caps   | Mailchimp, Dropbox |
| **Time-limited**    | Trial period    | Netflix, Spotify   |
| **Seat-limited**    | User count      | Figma, Zoom        |
| **Support-limited** | Community only  | Open source tools  |

### Conversion Funnel

```
Free Users (100%)
     │
     ▼
Active Users (40-60%)
     │
     ▼
Engaged Users (10-20%)
     │
     ▼
Conversion Ready (3-5%)
     │
     ▼
Paid Users (2-5%)

Target: 2-5% free-to-paid conversion
Top performers: 10%+
```

### Designing the Free Tier

```
Free tier should:
┌─────────────────────────────────────────┐
│ ✓ Deliver real value (not crippled)     │
│ ✓ Showcase premium features naturally   │
│ ✓ Create habit/dependency               │
│ ✓ Encourage sharing/virality            │
│ ✓ Cost nearly nothing to serve          │
└─────────────────────────────────────────┘

Upgrade triggers:
- Usage limits (storage, API calls)
- Collaboration (team features)
- Advanced features (analytics, exports)
- Support (priority, SLA)
- Integration (API access, SSO)
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/monetization-strategy/`).

| Topic | File | Covers |
| --- | --- | --- |
| Pricing Psychology | [`references/pricing-psychology.md`](references/pricing-psychology.md) | Key Principles; Price Presentation; The Decoy Effect |
| Pricing Strategy | [`references/pricing-strategy.md`](references/pricing-strategy.md) | Cost-Based vs. Value-Based; Value-Based Pricing Process; Pricing Research Methods; Van Westendorp Questions |
| Revenue Optimization | [`references/revenue-optimization.md`](references/revenue-optimization.md) | Expansion Revenue; Reducing Churn; Failed Payment Recovery |
| Marketplace Monetization | [`references/marketplace-monetization.md`](references/marketplace-monetization.md) | Take Rate Models; Two-Sided Pricing |
| B2B Pricing | [`references/b2b-pricing.md`](references/b2b-pricing.md) | Enterprise Considerations; Sales-Assisted Pricing; Volume Discounts |
| Consumer Pricing | [`references/consumer-pricing.md`](references/consumer-pricing.md) | Mobile App Monetization; Gaming Monetization |
| Pricing Page Best Practices | [`references/pricing-page-best-practices.md`](references/pricing-page-best-practices.md) | Layout; Conversion Elements |
| International Pricing | [`references/international-pricing.md`](references/international-pricing.md) | Localization Strategies; PPP Considerations |
| Pricing Experiments | [`references/pricing-experiments.md`](references/pricing-experiments.md) | A/B Testing Pricing; Grandfather Pricing |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Pricing Checklist | [`references/pricing-checklist.md`](references/pricing-checklist.md) | Strategy; Execution; Optimization |
