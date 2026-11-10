# i18n-localization: RTL (Right-to-Left) Support

Part of the `i18n-localization` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## RTL (Right-to-Left) Support

### RTL Languages

```
RTL Languages:
- Arabic (ar)
- Hebrew (he)
- Persian/Farsi (fa)
- Urdu (ur)

Layout considerations:
┌─────────────────────────────┐  ┌─────────────────────────────┐
│ Logo      Menu    Settings  │  │ Settings    Menu      Logo  │
│ ← Back                      │  │                      Back → │
│ [Icon] Label                │  │                Label [Icon] │
│                      Next → │  │ ← Next                      │
└─────────────────────────────┘  └─────────────────────────────┘
        LTR Layout                        RTL Layout
```

### CSS for RTL

```css
/* Use logical properties */
/* DON'T: Physical properties */
.element {
  margin-left: 10px;
  padding-right: 20px;
  text-align: left;
  float: left;
}

/* DO: Logical properties */
.element {
  margin-inline-start: 10px;
  padding-inline-end: 20px;
  text-align: start;
  float: inline-start;
}

/* Set direction based on locale */
html[dir="rtl"] {
  direction: rtl;
}

/* Or use :dir() pseudo-class */
.icon:dir(rtl) {
  transform: scaleX(-1); /* Mirror icons */
}

/* Flexbox auto-reverses in RTL */
.container {
  display: flex;
  /* No need to change for RTL */
}
```

### HTML Direction

```html
<!-- Set at document level -->
<html lang="ar" dir="rtl">
  <!-- Or dynamically -->
  <div dir="auto">
    <!-- Auto-detects text direction -->
    مرحبا بالعالم
  </div>

  <!-- Isolate bidirectional text -->
  <p>The word <bdi>مرحبا</bdi> means "hello".</p>
</html>
```

---
