# i18n-localization: Testing

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Testing

### Pseudo-Localization

```typescript
// Transforms: "Hello" → "[Ħëľľö!!!]"
// Helps identify:
// - Hardcoded strings
// - Text truncation issues
// - Character encoding problems
// - Layout issues with longer text

function pseudoLocalize(text: string): string {
  const charMap: Record<string, string> = {
    a: "ä",
    b: "β",
    c: "ç",
    d: "δ",
    e: "ë",
    // ... etc
  };

  const transformed = text
    .split("")
    .map((c) => charMap[c.toLowerCase()] || c)
    .join("");

  // Add padding (most translations are 30% longer)
  const padding = "!".repeat(Math.ceil(text.length * 0.3));

  return `[${transformed}${padding}]`;
}
```

### Locale Testing Checklist

```
FOR EACH LOCALE:
□ All strings translated
□ No hardcoded text visible
□ Dates format correctly
□ Numbers format correctly
□ Currency displays properly
□ Plurals work for all cases
□ UI accommodates text length
□ RTL layout correct (if applicable)
□ Images are appropriate
□ No encoding issues
□ Forms validate appropriately
```

---
