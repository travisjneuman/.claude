# i18n-localization: Translation Workflow

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Translation Workflow

### File Structure

```
locales/
├── en/
│   ├── common.json       # Shared strings
│   ├── auth.json         # Auth-related
│   ├── products.json     # Product-related
│   └── errors.json       # Error messages
├── es/
│   └── ...
├── fr/
│   └── ...
└── _source/
    └── en.json           # Source of truth
```

### Key Naming Convention

```json
{
  // Feature.element.description
  "auth.login.button": "Sign In",
  "auth.login.error.invalid_credentials": "Invalid email or password",

  // Or flat with prefixes
  "btn_login": "Sign In",
  "err_invalid_credentials": "Invalid email or password"

  // Consistent, descriptive, unique
}
```

### Translation Management

```
TOOLS:
- Lokalise, Crowdin, Phrase (SaaS platforms)
- Weblate (open source)
- POEditor, Transifex

WORKFLOW:
1. Extract strings from code
2. Upload to translation platform
3. Translators work in context
4. Review translations
5. Download and integrate
6. Test in app
7. Repeat for changes

AUTOMATION:
- CI/CD integration
- Automatic string extraction
- Translation memory
- Machine translation + human review
```

---
