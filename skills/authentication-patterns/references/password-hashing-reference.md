# authentication-patterns: Password Hashing Reference

Part of the `authentication-patterns` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Password Hashing Reference

| Algorithm | Recommended | Cost Factor | Notes |
|---|---|---|---|
| **argon2id** | Best | Memory: 64MB, Iterations: 3 | Best protection against GPU/ASIC attacks |
| **bcrypt** | Good | Rounds: 12-14 | Widely supported, proven track record |
| **scrypt** | Good | N: 2^15, r: 8, p: 1 | Memory-hard, good alternative to argon2 |
| **PBKDF2** | Acceptable | Iterations: 600,000+ (SHA-256) | NIST recommended, but not memory-hard |
| **MD5/SHA-256** | Never | N/A | Not a password hash -- too fast, no salt |

---
