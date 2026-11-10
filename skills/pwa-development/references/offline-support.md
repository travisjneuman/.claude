# pwa-development: Offline Support

Part of the `pwa-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Offline Support

### Offline Detection

```tsx
import { useState, useEffect } from "react";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

// Usage
function App() {
  const isOnline = useOnlineStatus();

  return (
    <div>
      {!isOnline && (
        <div className="offline-banner">
          You're offline. Some features may be unavailable.
        </div>
      )}
    </div>
  );
}
```

### Background Sync

```typescript
// In Service Worker
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  const db = await openDB("pending-requests", 1);
  const requests = await db.getAll("requests");

  for (const request of requests) {
    try {
      await fetch(request.url, request.options);
      await db.delete("requests", request.id);
    } catch {
      // Will retry on next sync
    }
  }
}

// Register sync from app
async function queueRequest(url: string, options: RequestInit) {
  await navigator.serviceWorker.ready;

  if ("sync" in window.ServiceWorkerRegistration.prototype) {
    // Store request and trigger sync
    const db = await openDB("pending-requests", 1);
    await db.add("requests", { url, options, id: Date.now() });
    await navigator.serviceWorker.ready.then((reg) =>
      reg.sync.register("sync-data"),
    );
  } else {
    // Fallback to immediate fetch
    await fetch(url, options);
  }
}
```

---
