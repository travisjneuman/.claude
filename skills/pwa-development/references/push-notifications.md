# pwa-development: Push Notifications

Part of the `pwa-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Push Notifications

### Request Permission

```typescript
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    // Send subscription to server
    await fetch("/api/push/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
    });
  }
}
```

### Handle Push in Service Worker

```typescript
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge.png",
      data: data.url,
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.notification.data) {
    event.waitUntil(clients.openWindow(event.notification.data));
  }
});
```

---
