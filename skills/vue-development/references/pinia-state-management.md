# vue-development: Pinia State Management

Part of the `vue-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Pinia State Management

### Store Definition (Composition Style)

```typescript
// stores/user.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useUserStore = defineStore("user", () => {
  // State
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters (computed)
  const isLoggedIn = computed(() => !!user.value);
  const displayName = computed(() => user.value?.name ?? "Guest");

  // Actions
  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Login failed");

      user.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
      throw e;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isLoggedIn,
    displayName,
    // Actions
    login,
    logout,
  };
});
```

### Using Stores in Components

```vue
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

// Use storeToRefs for destructuring state/getters
const { user, isLoggedIn, loading } = storeToRefs(userStore);

// Actions can be destructured directly
const { login, logout } = userStore;

async function handleLogin() {
  try {
    await login(email.value, password.value);
    router.push("/dashboard");
  } catch {
    // Error handled in store
  }
}
</script>
```

### Store with Persistence

```typescript
// stores/settings.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const theme = ref<"light" | "dark">("light");
  const locale = ref("en");

  // Load from storage on init
  const stored = localStorage.getItem("settings");
  if (stored) {
    const parsed = JSON.parse(stored);
    theme.value = parsed.theme ?? "light";
    locale.value = parsed.locale ?? "en";
  }

  // Persist changes
  watch([theme, locale], () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        theme: theme.value,
        locale: locale.value,
      }),
    );
  });

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }

  return { theme, locale, toggleTheme };
});
```

---
