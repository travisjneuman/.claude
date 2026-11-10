---
name: email-systems
description: >-
  Transactional email (Resend, SendGrid, SES), templates (React Email, MJML), deliverability (SPF/DKIM/DMARC), and inboxing best practices. Use when building email infrastructure, designing templates, or troubleshooting deliverability.
---

# Email Systems

## Overview

This skill covers building reliable email systems for web applications, including transactional email sending, template design, deliverability optimization, and inbox placement. It addresses integration with email service providers (Resend, AWS SES, SendGrid, Postmark), building responsive HTML email templates with React Email and MJML, configuring DNS records for deliverability (SPF, DKIM, DMARC), managing email types (transactional, notification, marketing), queue management, and bounce/complaint handling.

Use this skill when sending welcome emails, password resets, order confirmations, notification digests, marketing campaigns, or any system-generated email. Also use when debugging deliverability issues or migrating between email providers.

---

## Core Principles

1. **Transactional and marketing are different** - Transactional emails (password reset, receipt) must arrive instantly and reliably. Marketing emails (newsletter, promo) can be batched and should have unsubscribe links. Never mix them on the same sending domain.
2. **HTML email is not web development** - Email clients render HTML from 2004. No flexbox, no grid, no modern CSS. Use tables for layout, inline styles, and test across clients. React Email and MJML abstract this pain.
3. **Deliverability is earned** - SPF, DKIM, and DMARC are table stakes, not guarantees. Maintain low bounce rates (< 2%), low complaint rates (< 0.1%), and warm up new sending domains gradually.
4. **Queue everything** - Never send email synchronously in a request handler. Queue email sends to avoid blocking user requests and to enable retry on failure.
5. **Test before sending** - Use Mailtrap or Ethereal in development, preview in multiple clients (Litmus, Email on Acid), and verify every link works.

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/email-systems/`).

| Topic | File | Covers |
| --- | --- | --- |
| Key Patterns | [`references/key-patterns.md`](references/key-patterns.md) | Pattern 1: React Email Templates with Resend; Pattern 2: Email Queue with Retry Logic; Pattern 3: DNS Configuration for Deliverability; Pattern 4: Bounce and Complaint Handling |
| Anti-Patterns | [`references/anti-patterns.md`](references/anti-patterns.md) | 14 lines |
| Checklist | [`references/checklist.md`](references/checklist.md) | 18 lines |

## Email Provider Comparison

| Provider | Best For | Pricing | React Email | Key Feature |
|---|---|---|---|---|
| **Resend** | Developer-friendly transactional | 100/day free, $20/mo for 50k | Native | Best DX, React Email team |
| **AWS SES** | High volume, cost optimization | $0.10 per 1,000 | Via render | Cheapest at scale |
| **SendGrid** | Marketing + transactional | 100/day free | Via render | Marketing automation |
| **Postmark** | Transactional reliability | $15/mo for 10k | Via render | Best transactional deliverability |

---

## Related Resources

- **Skills:** `authentication-patterns` (password reset emails), `payment-integration` (invoice/receipt emails)
- **Skills:** `event-driven-architecture` (email as async event)
- **Rules:** `docs/reference/stacks/react-typescript.md` (React Email component patterns)
