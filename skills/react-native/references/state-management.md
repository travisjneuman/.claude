# react-native: State Management

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## State Management

### Zustand (Recommended)

```tsx
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
```

### React Query

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

// Wrap app
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>;

// Use in component
function ItemList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ItemRow item={item} />}
      keyExtractor={(item) => item.id}
      onRefresh={refetch}
      refreshing={isLoading}
    />
  );
}
```

---
