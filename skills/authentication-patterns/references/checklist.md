# authentication-patterns: Checklist

Part of the `authentication-patterns` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Checklist

- [ ] Passwords hashed with argon2id or bcrypt (never plain text, never MD5/SHA)
- [ ] OAuth flows use PKCE for public clients (SPAs, mobile)
- [ ] Access tokens are short-lived (< 30 minutes)
- [ ] Refresh tokens are rotated on use and stored server-side
- [ ] Tokens delivered in httpOnly Secure SameSite cookies (web)
- [ ] Login endpoint rate-limited (by IP and username)
- [ ] MFA available for all users, enforced for admin roles
- [ ] Recovery codes generated during MFA setup
- [ ] RBAC permissions checked on server (middleware) and client (UX)
- [ ] Password reset tokens expire in 1 hour, single-use
- [ ] Account lockout after N failed attempts (with progressive delay)
- [ ] Session invalidation on password change

---
