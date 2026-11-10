# email-systems: Checklist

Part of the `email-systems` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Checklist

- [ ] SPF record configured for sending domain
- [ ] DKIM signing enabled and verified
- [ ] DMARC policy set (start with `p=none`, escalate to `p=quarantine`)
- [ ] Email templates tested in Gmail, Outlook, Apple Mail, Yahoo
- [ ] Emails sent through a queue with retry logic
- [ ] Bounce and complaint webhooks configured
- [ ] Suppression list checked before every send
- [ ] Unsubscribe link present in all notification/marketing emails
- [ ] Marketing emails include the sender's physical postal address; opt-outs honored within 10 business days (CAN-SPAM)
- [ ] Separate sending domains for transactional vs marketing
- [ ] Development environment uses test mode (Mailtrap/Ethereal)
- [ ] Rate limiting configured to stay within ESP quotas
- [ ] Return-path / bounce domain configured

---
