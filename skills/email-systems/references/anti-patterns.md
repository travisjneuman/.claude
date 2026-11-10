# email-systems: Anti-Patterns

Part of the `email-systems` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|---|---|---|
| Sending email in the request handler | Blocks user response, no retry | Queue with background worker |
| Same domain for transactional + marketing | Marketing reputation affects password resets | Separate subdomains (mail.app.com vs news.app.com) |
| No suppression list | Repeated bounces destroy sender reputation | Maintain and check suppression list before every send |
| Using `<div>` layout in email HTML | Broken rendering in Outlook, Gmail | Use `<table>` layout or React Email/MJML |
| No unsubscribe link in notification emails | CAN-SPAM violation, spam complaints | One-click unsubscribe header + visible link |
| Testing with real email addresses | Spam to real people, complaints | Use Mailtrap, Ethereal, or Resend test mode |
| Sending from a no-reply address | Users can't respond, feels impersonal | Use a monitored reply-to address |

---
