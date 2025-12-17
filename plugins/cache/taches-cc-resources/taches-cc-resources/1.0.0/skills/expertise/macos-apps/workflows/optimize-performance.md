# Workflow: Optimize App Performance

<required_reading>
**Read these reference files NOW:**
1. references/cli-observability.md
2. references/concurrency-patterns.md
3. references/swiftui-patterns.md
</required_reading>

<philosophy>
Measure first, optimize second. Never optimize based on assumptions.
Profile → Identify bottleneck → Fix → Measure again → Repeat
</philosophy>

<process>
## Step 1: Define the Problem

Ask the user:
- What feels slow? (startup, specific action, scrolling, etc.)
- How slow? (seconds, milliseconds, "laggy")
- When did it start? (always, after recent change, with more data)

## Step 2: Measure Current Performance

**CPU Profiling:**
```bash
# Record 30 seconds of activity
xcrun xctrace record \
  --template 'Time Profiler' \
  --time-limit 30s \
  --output profile.trace \
  --launch -- ./build/Build/Products/Debug/AppName.app/Contents/MacOS/AppName
```

**Memory:**
```bash
# While app is running
vmmap --summary AppName
heap AppName
leaks AppName
```

**Startup time:**
```bash
# Measure launch to first frame
time open -W ./build/Build/Products/Debug/AppName.app
```

## Step 3: Identify Bottlenecks

**From Time Profiler:**
- Look for functions with high "self time"
- Check main thread for blocking operations
- Look for repeated calls that could be cached

**From memory tools:**
- Large allocations that could be lazy-loaded
- Objects retained longer than needed
- Duplicate data in memory

**SwiftUI re-renders:**
```swift
// Add to any view to see why it re-renders
var body: some View {
    let _ = Self._printChanges()
    // ...
}
```

## Step 4: Common Optimizations

### Main Thread

**Problem:** Heavy work on main thread
```swift
// Bad
func loadData() {
    let data = expensiveComputation() // blocks UI
    self.items = data
}

// Good
func loadData() async {
    let data = await Task.detached {
        expensiveComputation()
    }.value
    await MainActor.run {
        self.items = data
    }
}
```

### SwiftUI

**Problem:** Unnecessary re-renders
```swift
// Bad - entire view rebuilds when any state changes
struct ListView: View {
    @State var items: [Item]
    @State var searchText: String
    // ...
}

// Good - extract subviews with their own state
struct ListView: View {
    var body: some View {
        VStack {
            SearchBar() // has its own @State
            ItemList()  // only rebuilds when items change
        }
    }
}
```

**Problem:** Expensive computation in body
```swift
// Bad
var body: some View {
    List(items.sorted().filtered()) // runs every render

// Good
var sortedItems: [Item] { // or use .task modifier
    items.sorted().filtered()
}
var body: some View {
    List(sortedItems)
}
```

### Data Loading

**Problem:** Loading all data upfront
```swift
// Bad
init() {
    self.allItems = loadEverything() // slow startup
}

// Good - lazy loading
func loadItemsIfNeeded() async {
    guard items.isEmpty else { return }
    items = await loadItems()
}
```

**Problem:** No caching
```swift
// Bad
func getImage(for url: URL) async -> NSImage {
    return await downloadImage(url) // downloads every time
}

// Good
private var imageCache: [URL: NSImage] = [:]
func getImage(for url: URL) async -> NSImage {
    if let cached = imageCache[url] { return cached }
    let image = await downloadImage(url)
    imageCache[url] = image
    return image
}
```

### Collections

**Problem:** O(n²) operations
```swift
// Bad - O(n) lookup in array
items.first { $0.id == targetId }

// Good - O(1) lookup with dictionary
itemsById[targetId]
```

**Problem:** Repeated filtering
```swift
// Bad
let activeItems = items.filter { $0.isActive } // called repeatedly

// Good - compute once, update when needed
@Published var activeItems: [Item] = []
func updateActiveItems() {
    activeItems = items.filter { $0.isActive }
}
```

## Step 5: Measure Again

After each optimization:
```bash
# Re-run profiler
xcrun xctrace record --template 'Time Profiler' ...

# Compare metrics
```

Did it actually improve? If not, revert and try different approach.

## Step 6: Prevent Regression

Add performance tests:
```swift
func testStartupPerformance() {
    measure {
        // startup code
    }
}

func testScrollingPerformance() {
    measure(metrics: [XCTCPUMetric(), XCTMemoryMetric()]) {
        // scroll simulation
    }
}
```
</process>

<performance_targets>
| Metric | Target | Unacceptable |
|--------|--------|--------------|
| App launch | < 1 second | > 3 seconds |
| Button response | < 100ms | > 500ms |
| List scrolling | 60 fps | < 30 fps |
| Memory (idle) | < 100MB | > 500MB |
| Memory growth | Stable | Unbounded |
</performance_targets>

<tools_reference>
```bash
# CPU profiling
xcrun xctrace record --template 'Time Profiler' --attach AppName

# Memory snapshot
vmmap --summary AppName
heap AppName

# Allocations over time
xcrun xctrace record --template 'Allocations' --attach AppName

# Energy impact
xcrun xctrace record --template 'Energy Log' --attach AppName

# System trace (comprehensive)
xcrun xctrace record --template 'System Trace' --attach AppName
```
</tools_reference>
