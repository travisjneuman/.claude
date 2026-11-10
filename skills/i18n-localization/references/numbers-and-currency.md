# i18n-localization: Numbers & Currency

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Numbers & Currency

### Number Formatting

```typescript
const number = 1234567.89;

new Intl.NumberFormat("en-US").format(number);
// "1,234,567.89"

new Intl.NumberFormat("de-DE").format(number);
// "1.234.567,89"

new Intl.NumberFormat("fr-FR").format(number);
// "1 234 567,89"

// Percentages
new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
}).format(0.256);
// "25.6%"
```

### Currency Formatting

```typescript
const amount = 1234.56;

new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format(amount);
// "$1,234.56"

new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
}).format(amount);
// "1.234,56 €"

new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
}).format(amount);
// "¥1,235" (no decimal for JPY)
```

### Currency Best Practices

```typescript
// Store amount + currency code
interface Money {
  amount: number; // In smallest unit (cents)
  currency: string; // ISO 4217 code (USD, EUR, etc.)
}

// Format for display
function formatMoney(money: Money, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currency,
  }).format(money.amount / 100); // Convert cents to units
}

// Handle exchange rates on backend
// Never convert currencies client-side
```

---
