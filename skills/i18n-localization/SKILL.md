---
name: i18n-localization
description: Internationalization and localization for global applications. Use when adding multi-language support, handling regional formats, or preparing apps for global markets.
---

# Internationalization & Localization

Comprehensive guide for building globally-ready applications.

## Key Concepts

### Terminology

```
i18n (Internationalization):
- Engineering for multiple languages/regions
- Building the infrastructure
- Happens once, during development

L10n (Localization):
- Adapting for specific locale
- Translation, formatting, content
- Happens per locale, ongoing

Locale:
- Language + Region combination
- Format: language-REGION (e.g., en-US, pt-BR)
- Determines formatting rules
```

### What Needs Localization?

| Category      | Examples                     |
| ------------- | ---------------------------- |
| **Text**      | UI labels, messages, errors  |
| **Numbers**   | 1,234.56 vs 1.234,56         |
| **Dates**     | MM/DD/YYYY vs DD/MM/YYYY     |
| **Times**     | 12-hour vs 24-hour           |
| **Currency**  | $1,234.56 vs €1.234,56       |
| **Plurals**   | 1 item vs 2 items vs 5 items |
| **Direction** | LTR vs RTL                   |
| **Images**    | Cultural appropriateness     |
| **Colors**    | Cultural significance        |
| **Names**     | Order, formality             |

---

## Text & Messages

### Externalize All Strings

```typescript
// DON'T: Hardcoded strings
const message = "Welcome back, " + username;

// DO: Externalized, translatable
const message = t('welcome_back', { name: username });

// Translation file (en.json)
{
  "welcome_back": "Welcome back, {{name}}"
}

// Translation file (es.json)
{
  "welcome_back": "Bienvenido de nuevo, {{name}}"
}
```

### Message Format

```typescript
// ICU Message Format (recommended)
// Handles plurals, select, dates, numbers

// Simple
"greeting": "Hello, {name}!"

// Plural
"items_count": "{count, plural, =0 {No items} one {# item} other {# items}}"

// Select (gender, etc.)
"notification": "{gender, select, male {He} female {She} other {They}} liked your post"

// Nested
"cart": "{itemCount, plural,
  =0 {Your cart is empty}
  one {You have # item in your cart}
  other {You have # items in your cart}
}"
```

### Pluralization

```
Languages have different plural rules:

English: 1 (one), 2+ (other)
French:  0-1 (one), 2+ (other)
Russian: Complex rules for 1, 2-4, 5-20, 21, etc.
Arabic:  6 plural forms!
Chinese: No plural forms

Always use library pluralization, never DIY:
- react-intl / formatjs
- i18next
- Intl.PluralRules API
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/i18n-localization/`).

| Topic | File | Covers |
| --- | --- | --- |
| Date & Time | [`references/date-and-time.md`](references/date-and-time.md) | JavaScript Intl API; Time Zones; Relative Time |
| Numbers & Currency | [`references/numbers-and-currency.md`](references/numbers-and-currency.md) | Number Formatting; Currency Formatting; Currency Best Practices |
| RTL (Right-to-Left) Support | [`references/rtl-right-to-left-support.md`](references/rtl-right-to-left-support.md) | RTL Languages; CSS for RTL; HTML Direction |
| Implementation (React) | [`references/implementation-react.md`](references/implementation-react.md) | react-intl Setup; Using Translations; Translation Files |
| Implementation (Node.js) | [`references/implementation-node-js.md`](references/implementation-node-js.md) | i18next Setup; Express Middleware |
| Translation Workflow | [`references/translation-workflow.md`](references/translation-workflow.md) | File Structure; Key Naming Convention; Translation Management |
| Testing | [`references/testing.md`](references/testing.md) | Pseudo-Localization; Locale Testing Checklist |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Checklist | [`references/checklist.md`](references/checklist.md) | Initial Setup; Per Feature; Launch |
