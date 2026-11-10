# i18n-localization: Implementation (Node.js)

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Implementation (Node.js)

### i18next Setup

```typescript
import i18next from "i18next";
import Backend from "i18next-fs-backend";

await i18next.use(Backend).init({
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "es", "fr", "de"],
  backend: {
    loadPath: "./locales/{{lng}}/{{ns}}.json",
  },
  interpolation: {
    escapeValue: false,
  },
});

// Usage
const t = i18next.t;

t("welcome", { name: "John" });
// "Welcome, John!"

// Change language
await i18next.changeLanguage("es");
```

### Express Middleware

```typescript
import { Request, Response, NextFunction } from "express";

function detectLocale(req: Request, res: Response, next: NextFunction) {
  // Priority: Query param > Cookie > Accept-Language header > Default
  const locale =
    req.query.locale ||
    req.cookies.locale ||
    req.acceptsLanguages(["en", "es", "fr"]) ||
    "en";

  req.locale = locale;
  req.t = i18next.getFixedT(locale);

  next();
}

app.use(detectLocale);

app.get("/api/greeting", (req, res) => {
  res.json({
    message: req.t("greeting", { name: req.user.name }),
  });
});
```

---
