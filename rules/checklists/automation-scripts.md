# Automation & Scripts Checklist

**When to use:** Any task involving automation scripts, batch processing, data transformation, or programmatic operations.

---

## Pre-Execution Requirements

### 1. Dry Run First (MANDATORY)

```bash
# ALWAYS test with dry run before live execution
DRY_RUN=true python automation/script.py
DRY_RUN=true node scripts/process.js

# Or use --dry-run flag if supported
./script.sh --dry-run
```

- [ ] Dry run completed
- [ ] Output reviewed and matches expectations
- [ ] No unexpected side effects identified

### 2. Understand the Blast Radius

Before running any automation:

- [ ] What data will be modified?
- [ ] Is data reversible/recoverable?
- [ ] What's the rollback plan if something goes wrong?
- [ ] Are there backups?

---

## Implementation Checklist

### Input Validation

- [ ] All inputs validated before processing
- [ ] Edge cases handled (empty, null, malformed)
- [ ] File paths sanitized
- [ ] API responses validated

### Error Handling

- [ ] Graceful failure on errors (don't crash silently)
- [ ] Meaningful error messages
- [ ] Partial failures handled (resume capability)
- [ ] Logging for debugging

### Output Verification

- [ ] Output format matches specification
- [ ] Data integrity maintained
- [ ] No data loss during transformation
- [ ] Results can be verified independently

---

## Testing Matrix

| Test Type | Status |
|-----------|--------|
| Happy path (normal data) | [ ] |
| Empty input | [ ] |
| Malformed input | [ ] |
| Large dataset | [ ] |
| Network failure (if applicable) | [ ] |
| Permission errors | [ ] |

---

## Environment Variables

Scripts should NEVER hardcode:

```python
# WRONG
api_key = "sk-abc123..."
database_url = "postgres://prod..."

# RIGHT
api_key = os.environ.get("API_KEY")
database_url = os.environ.get("DATABASE_URL")
```

### Required Environment Check

- [ ] All required env vars documented
- [ ] Script fails fast if vars missing
- [ ] No secrets in code or logs

---

## Logging Best Practices

```python
# Good logging
logger.info(f"Processing {len(items)} items")
logger.debug(f"Item details: {item.id}")
logger.error(f"Failed to process: {error}")

# Bad logging
print("processing...")  # No context
logger.info(f"API key: {api_key}")  # NEVER log secrets
```

- [ ] Progress logged for long operations
- [ ] Errors include context
- [ ] No sensitive data in logs

---

## Performance Considerations

- [ ] Batch operations where possible
- [ ] Rate limiting for API calls
- [ ] Memory usage acceptable for dataset size
- [ ] Timeout handling for network operations

---

## Pre-Commit Checklist

Before committing automation scripts:

- [ ] Dry run tested
- [ ] Edge cases tested
- [ ] Error handling verified
- [ ] Environment variables documented
- [ ] No hardcoded secrets
- [ ] Logging appropriate
- [ ] README/docs updated if behavior changes

---

## Related Skills

| Skill | When to Use |
|-------|-------------|
| `data-science` | Data processing, ML pipelines |
| `test-specialist` | Testing automation scripts |
| `security` | Security considerations |
| `tech-debt-analyzer` | Script code quality |

### Invoke with:
```
Skill(data-science)
Skill(test-specialist)
```

---

## Related Documentation

- `~/.claude/skills/README.md` - Skills overview
- `~/.claude/CLAUDE.md` - Core rules (Security Checklist)
- `~/.claude/templates/task-template.md` - Task planning

---

## Common Anti-Patterns

- [ ] Running scripts without dry run first
- [ ] No rollback plan
- [ ] Hardcoded credentials
- [ ] Silent failures (no error handling)
- [ ] No logging for long operations
- [ ] Testing only happy path

---

## Emergency Recovery

If automation goes wrong:

1. **STOP** - Kill the process immediately
2. **ASSESS** - What was affected?
3. **RESTORE** - Use backups if available
4. **INVESTIGATE** - Root cause before re-running
5. **FIX** - Address the issue
6. **TEST** - Dry run again before live

---

*Always DRY_RUN first. Always have a rollback plan.*
