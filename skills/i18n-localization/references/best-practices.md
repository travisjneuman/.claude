# i18n-localization: Best Practices

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Best Practices

### DO:

- Externalize ALL user-facing strings
- Use ICU message format for complex strings
- Support locale switching without reload
- Test with pseudo-localization
- Store dates in UTC, display in local time
- Use native Intl APIs when possible
- Plan for text expansion (30-50% longer)
- Support RTL from the start

### DON'T:

- Hardcode any user-facing text
- Concatenate strings for messages
- Assume date/number formats
- Handle plurals manually
- Forget about cultural context
- Translate in code (use translation files)
- Ignore bidirectional text issues
- Skip testing with real languages

---
