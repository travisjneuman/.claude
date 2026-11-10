# accessibility-a11y: ARIA Quick Reference

Part of the `accessibility-a11y` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## ARIA Quick Reference

| Need | Use This | Not This |
|---|---|---|
| Label for input | `<label for="x">` or `aria-labelledby` | `placeholder` as only label |
| Describe input requirements | `aria-describedby` pointing to hint text | Title attribute |
| Hide decorative content | `aria-hidden="true"` | `display: none` (hides from everyone) |
| Mark required field | `aria-required="true"` + `required` | Only visual asterisk |
| Announce error | `role="alert"` or `aria-live="assertive"` | Just changing text color |
| Expandable section | `aria-expanded="true/false"` | Custom `data-open` attribute |

---
