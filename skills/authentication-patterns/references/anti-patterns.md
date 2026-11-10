# authentication-patterns: Anti-Patterns

Part of the `authentication-patterns` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Better Approach |
|---|---|---|
| Storing passwords in plain text | Single breach exposes all passwords | Use argon2id or bcrypt with per-user salt |
| JWT in localStorage | XSS can steal tokens | httpOnly Secure cookies |
| Long-lived access tokens (days/weeks) | Extended damage window if stolen | 15-minute access tokens + refresh token rotation |
| Checking permissions only on the client | Client-side checks are bypassable | Server-side middleware + client-side UX |
| Custom OAuth implementation | Subtle security bugs (state, PKCE, redirect) | Use established libraries (Auth.js, Passport) |
| SMS-based 2FA as only MFA option | SIM swapping vulnerability | Offer TOTP and WebAuthn alongside SMS |
| No rate limiting on login endpoint | Brute force attacks | Rate limit by IP and username |
| Password reset tokens that don't expire | Token can be used indefinitely | 1-hour expiry, single-use, invalidate on password change |

---
