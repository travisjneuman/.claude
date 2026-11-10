# i18n-localization: Implementation (React)

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Implementation (React)

### react-intl Setup

```typescript
// src/i18n/index.ts
import { createIntl, createIntlCache } from '@formatjs/intl';

const cache = createIntlCache();

const messages = {
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json'),
  fr: () => import('./locales/fr.json'),
};

export async function loadMessages(locale: string) {
  const loader = messages[locale] || messages.en;
  return (await loader()).default;
}

// App.tsx
import { IntlProvider } from 'react-intl';

function App() {
  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState({});

  useEffect(() => {
    loadMessages(locale).then(setMessages);
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <MainApp />
    </IntlProvider>
  );
}
```

### Using Translations

```tsx
import { FormattedMessage, useIntl } from "react-intl";

function ProductCard({ product }) {
  const intl = useIntl();

  return (
    <div>
      {/* Component-based */}
      <h2>
        <FormattedMessage id="product.title" values={{ name: product.name }} />
      </h2>

      {/* Hook-based (for attributes, etc.) */}
      <img
        src={product.image}
        alt={intl.formatMessage({ id: "product.image_alt" })}
      />

      {/* Numbers */}
      <p>
        <FormattedNumber
          value={product.price}
          style="currency"
          currency="USD"
        />
      </p>

      {/* Dates */}
      <p>
        <FormattedDate value={product.createdAt} dateStyle="medium" />
      </p>

      {/* Plurals */}
      <p>
        <FormattedMessage
          id="product.reviews"
          values={{ count: product.reviewCount }}
        />
      </p>
    </div>
  );
}
```

### Translation Files

```json
// locales/en.json
{
  "product.title": "{name}",
  "product.image_alt": "Photo of {name}",
  "product.reviews": "{count, plural, =0 {No reviews} one {# review} other {# reviews}}",
  "cart.empty": "Your cart is empty",
  "cart.checkout": "Proceed to checkout"
}

// locales/es.json
{
  "product.title": "{name}",
  "product.image_alt": "Foto de {name}",
  "product.reviews": "{count, plural, =0 {Sin reseñas} one {# reseña} other {# reseñas}}",
  "cart.empty": "Tu carrito está vacío",
  "cart.checkout": "Proceder al pago"
}
```

---
