# vue-development: Component Patterns

Part of the `vue-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Component Patterns

### Provider/Inject Pattern

```typescript
// context/auth.ts
import { provide, inject, type InjectionKey } from "vue";

interface AuthContext {
  user: Ref<User | null>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthKey: InjectionKey<AuthContext> = Symbol("auth");

// Provider component
export function provideAuth() {
  const user = ref<User | null>(null);

  async function login(email: string, password: string) {
    // Implementation
  }

  function logout() {
    user.value = null;
  }

  const context = { user, login, logout };
  provide(AuthKey, context);
  return context;
}

// Consumer hook
export function useAuth(): AuthContext {
  const context = inject(AuthKey);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
```

### Smart/Dumb Components

```vue
<!-- components/UserCard.vue (Dumb - Presentational) -->
<script setup lang="ts">
interface Props {
  name: string;
  email: string;
  avatar?: string;
}

defineProps<Props>();
defineEmits<{ click: [] }>();
</script>

<template>
  <div class="user-card" @click="$emit('click')">
    <img :src="avatar ?? '/default-avatar.png'" :alt="name" />
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
  </div>
</template>
```

```vue
<!-- views/UserList.vue (Smart - Container) -->
<script setup lang="ts">
import { useFetch } from "@/composables/useFetch";
import UserCard from "@/components/UserCard.vue";

const { data: users, loading, error } = useFetch<User[]>("/api/users");

function handleUserClick(user: User) {
  router.push(`/users/${user.id}`);
}
</script>

<template>
  <div class="user-list">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <template v-else>
      <UserCard
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :email="user.email"
        :avatar="user.avatar"
        @click="handleUserClick(user)"
      />
    </template>
  </div>
</template>
```

---
