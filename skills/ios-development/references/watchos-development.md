# ios-development: watchOS Development

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## watchOS Development

```swift
// watchOS app with SwiftUI
@main
struct MyWatchApp: App {
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                ContentView()
            }
        }
    }
}

// Complications / Widgets
struct MyWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "myWidget", provider: Provider()) { entry in
            MyWidgetView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .supportedFamilies([
            .accessoryCircular,
            .accessoryRectangular,
            .accessoryInline,
        ])
    }
}

// Watch Connectivity for iPhone <-> Watch communication
import WatchConnectivity

class ConnectivityManager: NSObject, WCSessionDelegate {
    func session(_ session: WCSession, didReceiveMessage message: [String: Any]) {
        // Handle message from paired device
    }
}
```
