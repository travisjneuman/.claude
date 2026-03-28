---
name: devex-sdk-design
description: Developer experience (DX) engineering, SDK design patterns, API ergonomics, CLI tooling design, documentation-driven development, and developer onboarding. Use when designing SDKs, improving API ergonomics, building developer tools, or creating developer documentation.
---

# Developer Experience & SDK Design

## SDK Design Principles

### API Ergonomics
```typescript
// Bad: too many required params, unclear ordering
createUser(name, email, role, true, false, null, 'active');

// Good: builder pattern with named properties
const user = await sdk.users.create({
  name: 'Alice',
  email: 'alice@example.com',
  role: 'admin',
});

// Good: fluent API for complex operations
const results = await sdk.query('users')
  .where('role', '=', 'admin')
  .orderBy('createdAt', 'desc')
  .limit(10)
  .execute();
```

### Progressive Disclosure
```typescript
// Simple case: just works with defaults
const client = new MySDK('api-key');
const result = await client.doThing();

// Advanced case: full control available
const client = new MySDK({
  apiKey: 'api-key',
  baseUrl: 'https://custom.endpoint.com',
  timeout: 30000,
  retries: { maxAttempts: 3, backoff: 'exponential' },
  middleware: [loggingMiddleware, authRefreshMiddleware],
});
```

## Error Design

```typescript
// SDK errors should be structured and actionable
class SDKError extends Error {
  constructor(
    message: string,
    public readonly code: string,        // machine-readable
    public readonly statusCode?: number,  // HTTP status if applicable
    public readonly retryable: boolean = false,
    public readonly docs?: string,        // link to relevant docs
  ) {
    super(message);
  }
}

// User sees:
// SDKError: Rate limit exceeded (rate_limit_exceeded)
//   Retryable: true, retry after 2.3s
//   Docs: https://docs.example.com/rate-limits
```

## CLI Design

### Command Structure
```
mycli <command> <subcommand> [flags]

mycli init                    # Interactive setup
mycli deploy --env production # Explicit flags
mycli logs --follow           # Streaming output
mycli config set key value    # Noun-verb pattern
```

### CLI Best Practices
- **Sensible defaults:** Work out of the box, `--flag` for customization
- **Progressive output:** Spinners for long ops, `--verbose` for debug, `--json` for machines
- **Confirmation prompts:** Destructive actions require `--yes` or interactive confirm
- **Shell completion:** Generate for bash/zsh/fish/PowerShell
- **Exit codes:** 0 = success, 1 = error, 2 = usage error

## Documentation-Driven Development

### README Structure (for SDKs)
1. **One-liner:** What it does in one sentence
2. **Quick start:** Copy-paste working example (< 10 lines)
3. **Installation:** Package manager commands
4. **Usage:** Common patterns with code examples
5. **API reference:** Auto-generated from types/docstrings
6. **Error handling:** Common errors and solutions
7. **Migration guide:** Breaking changes between versions

### Code Examples
- Every public method needs a usage example
- Examples must compile/run — test them in CI
- Show the happy path first, then edge cases
- Include expected output in comments

## Developer Onboarding Metrics
- **Time to Hello World:** < 5 minutes from docs to working code
- **Time to first API call:** < 10 minutes including auth setup
- **Copy-paste success rate:** Quick start examples work on first try
- **Error resolution time:** Error messages lead directly to fix

## Versioning & Breaking Changes
- Semantic versioning strictly followed
- Deprecation warnings 2 minor versions before removal
- Migration codemods for major version upgrades
- Changelog with every release (keep-a-changelog format)
