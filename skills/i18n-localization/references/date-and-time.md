# i18n-localization: Date & Time

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Date & Time

### JavaScript Intl API

```typescript
// Date formatting
const date = new Date("2024-03-15");

new Intl.DateTimeFormat("en-US").format(date);
// "3/15/2024"

new Intl.DateTimeFormat("de-DE").format(date);
// "15.3.2024"

new Intl.DateTimeFormat("ja-JP").format(date);
// "2024/3/15"

// With options
new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(date);
// "Friday, March 15, 2024"
```

### Time Zones

```typescript
// Always store in UTC
const utcDate = new Date().toISOString();
// "2024-03-15T14:30:00.000Z"

// Display in user's timezone
new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  dateStyle: "full",
  timeStyle: "long",
}).format(new Date(utcDate));
// "Friday, March 15, 2024 at 10:30:00 AM EDT"

// Get user's timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
```

### Relative Time

```typescript
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

rtf.format(-1, "day"); // "yesterday"
rtf.format(1, "day"); // "tomorrow"
rtf.format(-3, "hour"); // "3 hours ago"
rtf.format(2, "week"); // "in 2 weeks"

// For automatic unit selection, use a library like date-fns
import { formatDistanceToNow } from "date-fns";
formatDistanceToNow(date, { addSuffix: true });
// "3 days ago"
```

---
