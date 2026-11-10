# react-native: Performance

Part of the `react-native` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Performance

### FlatList Optimization

```tsx
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  // Performance optimizations
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>;

// Memoize render item
const renderItem = useCallback(
  ({ item }: { item: Item }) => <MemoizedItem item={item} />,
  [],
);

const MemoizedItem = memo(({ item }: { item: Item }) => (
  <View>
    <Text>{item.name}</Text>
  </View>
));
```

### Image Optimization

```tsx
import { Image } from "expo-image";

<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  contentFit="cover"
  placeholder={blurhash}
  transition={200}
  cachePolicy="memory-disk"
/>;
```

---
