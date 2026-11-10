---
name: pwa-development
description: Progressive Web App development for installable, offline-capable web applications. Use when building PWAs, implementing service workers, or creating offline-first experiences.
---

# Progressive Web App (PWA) Development

Build installable, offline-capable web applications that work across all platforms.

## PWA Capabilities

| Feature            | Support               |
| ------------------ | --------------------- |
| Offline access     | All modern browsers   |
| Install prompt     | Chrome, Edge, Samsung |
| Push notifications | All except iOS Safari |
| Background sync    | Chrome, Edge          |
| File handling      | Chrome, Edge          |
| Share target       | Chrome, Edge, Safari  |

---

## Core Requirements

### 1. Web App Manifest

```json
// public/manifest.json
{
  "name": "My Progressive Web App",
  "short_name": "MyPWA",
  "description": "A progressive web application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "orientation": "portrait-primary",
  "scope": "/",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "shortcuts": [
    {
      "name": "New Document",
      "short_name": "New",
      "url": "/new",
      "icons": [{ "src": "/icons/new.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "files",
          "accept": ["image/*", "text/*"]
        }
      ]
    }
  }
}
```

### 2. HTML Meta Tags

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- PWA Meta Tags -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#3b82f6" />
    <meta name="description" content="My Progressive Web App" />

    <!-- iOS Specific -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="MyPWA" />
    <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

    <!-- Windows Specific -->
    <meta name="msapplication-TileColor" content="#3b82f6" />
    <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />

    <title>My PWA</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/pwa-development/`).

| Topic | File | Covers |
| --- | --- | --- |
| Service Worker | [`references/service-worker.md`](references/service-worker.md) | Basic Service Worker; Workbox (Recommended); Service Worker Registration |
| Install Prompt | [`references/install-prompt.md`](references/install-prompt.md) | Custom Install Button |
| Offline Support | [`references/offline-support.md`](references/offline-support.md) | Offline Detection; Background Sync |
| Push Notifications | [`references/push-notifications.md`](references/push-notifications.md) | Request Permission; Handle Push in Service Worker |
| Vite PWA Plugin | [`references/vite-pwa-plugin.md`](references/vite-pwa-plugin.md) | 43 lines |
| Testing PWA | [`references/testing-pwa.md`](references/testing-pwa.md) | Lighthouse Audit; Target Scores |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
