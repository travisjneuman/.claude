# Design System

Colors, typography, spacing, and visual patterns for professional macOS apps.

<semantic_colors>
```swift
import SwiftUI

extension Color {
    // Use semantic colors that adapt to light/dark mode
    static let background = Color(NSColor.windowBackgroundColor)
    static let secondaryBackground = Color(NSColor.controlBackgroundColor)
    static let tertiaryBackground = Color(NSColor.underPageBackgroundColor)

    // Text
    static let primaryText = Color(NSColor.labelColor)
    static let secondaryText = Color(NSColor.secondaryLabelColor)
    static let tertiaryText = Color(NSColor.tertiaryLabelColor)
    static let quaternaryText = Color(NSColor.quaternaryLabelColor)

    // Controls
    static let controlAccent = Color.accentColor
    static let controlBackground = Color(NSColor.controlColor)
    static let selectedContent = Color(NSColor.selectedContentBackgroundColor)

    // Separators
    static let separator = Color(NSColor.separatorColor)
    static let gridLine = Color(NSColor.gridColor)
}

// Usage
Text("Hello")
    .foregroundStyle(.primaryText)
    .background(.background)
```
</semantic_colors>

<custom_colors>
```swift
extension Color {
    // Define once, use everywhere
    static let appPrimary = Color("AppPrimary")  // From asset catalog
    static let appSecondary = Color("AppSecondary")

    // Or programmatic
    static let success = Color(red: 0.2, green: 0.8, blue: 0.4)
    static let warning = Color(red: 1.0, green: 0.8, blue: 0.0)
    static let error = Color(red: 0.9, green: 0.3, blue: 0.3)
}

// Asset catalog with light/dark variants
// Assets.xcassets/AppPrimary.colorset/Contents.json:
/*
{
  "colors" : [
    {
      "color" : { "color-space" : "srgb", "components" : { "red" : "0.2", "green" : "0.5", "blue" : "1.0" } },
      "idiom" : "universal"
    },
    {
      "appearances" : [ { "appearance" : "luminosity", "value" : "dark" } ],
      "color" : { "color-space" : "srgb", "components" : { "red" : "0.4", "green" : "0.7", "blue" : "1.0" } },
      "idiom" : "universal"
    }
  ]
}
*/
```
</custom_colors>

<typography>
```swift
extension Font {
    // System fonts
    static let displayLarge = Font.system(size: 34, weight: .bold, design: .default)
    static let displayMedium = Font.system(size: 28, weight: .semibold)
    static let displaySmall = Font.system(size: 22, weight: .semibold)

    static let headlineLarge = Font.system(size: 17, weight: .semibold)
    static let headlineMedium = Font.system(size: 15, weight: .semibold)
    static let headlineSmall = Font.system(size: 13, weight: .semibold)

    static let bodyLarge = Font.system(size: 15, weight: .regular)
    static let bodyMedium = Font.system(size: 13, weight: .regular)
    static let bodySmall = Font.system(size: 11, weight: .regular)

    // Monospace for code
    static let codeLarge = Font.system(size: 14, weight: .regular, design: .monospaced)
    static let codeMedium = Font.system(size: 12, weight: .regular, design: .monospaced)
    static let codeSmall = Font.system(size: 10, weight: .regular, design: .monospaced)
}

// Usage
Text("Title")
    .font(.displayMedium)

Text("Body text")
    .font(.bodyMedium)

Text("let x = 42")
    .font(.codeMedium)
```
</typography>

<spacing>
```swift
enum Spacing {
    static let xxxs: CGFloat = 2
    static let xxs: CGFloat = 4
    static let xs: CGFloat = 8
    static let sm: CGFloat = 12
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
    static let xxxl: CGFloat = 64
}

// Usage
VStack(spacing: Spacing.md) {
    Text("Title")
    Text("Subtitle")
}
.padding(Spacing.lg)

HStack(spacing: Spacing.sm) {
    Image(systemName: "star")
    Text("Favorite")
}
```
</spacing>

<corner_radius>
```swift
enum CornerRadius {
    static let small: CGFloat = 4
    static let medium: CGFloat = 8
    static let large: CGFloat = 12
    static let xlarge: CGFloat = 16
}

// Usage
RoundedRectangle(cornerRadius: CornerRadius.medium)
    .fill(.secondaryBackground)

Text("Tag")
    .padding(.horizontal, Spacing.sm)
    .padding(.vertical, Spacing.xxs)
    .background(.controlBackground, in: RoundedRectangle(cornerRadius: CornerRadius.small))
```
</corner_radius>

<shadows>
```swift
extension View {
    func cardShadow() -> some View {
        shadow(color: .black.opacity(0.1), radius: 4, x: 0, y: 2)
    }

    func elevatedShadow() -> some View {
        shadow(color: .black.opacity(0.15), radius: 8, x: 0, y: 4)
    }

    func subtleShadow() -> some View {
        shadow(color: .black.opacity(0.05), radius: 2, x: 0, y: 1)
    }
}

// Usage
CardView()
    .cardShadow()
```
</shadows>

<component_styles>
<buttons>
```swift
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headlineMedium)
            .foregroundStyle(.white)
            .padding(.horizontal, Spacing.md)
            .padding(.vertical, Spacing.sm)
            .background(
                RoundedRectangle(cornerRadius: CornerRadius.medium)
                    .fill(Color.accentColor)
            )
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headlineMedium)
            .foregroundStyle(.accentColor)
            .padding(.horizontal, Spacing.md)
            .padding(.vertical, Spacing.sm)
            .background(
                RoundedRectangle(cornerRadius: CornerRadius.medium)
                    .stroke(Color.accentColor, lineWidth: 1)
            )
            .opacity(configuration.isPressed ? 0.8 : 1.0)
    }
}

// Usage
Button("Save") { save() }
    .buttonStyle(PrimaryButtonStyle())

Button("Cancel") { cancel() }
    .buttonStyle(SecondaryButtonStyle())
```
</buttons>

<cards>
```swift
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(Spacing.md)
            .background(
                RoundedRectangle(cornerRadius: CornerRadius.large)
                    .fill(.secondaryBackground)
            )
            .cardShadow()
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}

// Usage
VStack {
    Text("Card Title")
    Text("Card content")
}
.cardStyle()
```
</cards>

<list_rows>
```swift
struct ItemRow: View {
    let item: Item
    let isSelected: Bool

    var body: some View {
        HStack(spacing: Spacing.sm) {
            Image(systemName: item.icon)
                .foregroundStyle(isSelected ? .white : .secondaryText)

            VStack(alignment: .leading, spacing: Spacing.xxs) {
                Text(item.name)
                    .font(.headlineSmall)
                    .foregroundStyle(isSelected ? .white : .primaryText)

                Text(item.subtitle)
                    .font(.bodySmall)
                    .foregroundStyle(isSelected ? .white.opacity(0.8) : .secondaryText)
            }

            Spacer()

            Text(item.date.formatted(date: .abbreviated, time: .omitted))
                .font(.bodySmall)
                .foregroundStyle(isSelected ? .white.opacity(0.8) : .tertiaryText)
        }
        .padding(.horizontal, Spacing.sm)
        .padding(.vertical, Spacing.xs)
        .background(
            RoundedRectangle(cornerRadius: CornerRadius.small)
                .fill(isSelected ? Color.accentColor : .clear)
        )
    }
}
```
</list_rows>

<text_fields>
```swift
struct StyledTextField: View {
    let placeholder: String
    @Binding var text: String

    var body: some View {
        TextField(placeholder, text: $text)
            .textFieldStyle(.plain)
            .font(.bodyMedium)
            .padding(Spacing.sm)
            .background(
                RoundedRectangle(cornerRadius: CornerRadius.medium)
                    .fill(.controlBackground)
            )
            .overlay(
                RoundedRectangle(cornerRadius: CornerRadius.medium)
                    .stroke(.separator, lineWidth: 1)
            )
    }
}
```
</text_fields>
</component_styles>

<icons>
```swift
// Use SF Symbols
Image(systemName: "doc.text")
Image(systemName: "folder.fill")
Image(systemName: "gear")

// Consistent sizing
Image(systemName: "star")
    .font(.system(size: 16, weight: .medium))

// With colors
Image(systemName: "checkmark.circle.fill")
    .symbolRenderingMode(.hierarchical)
    .foregroundStyle(.green)

// Multicolor
Image(systemName: "externaldrive.badge.checkmark")
    .symbolRenderingMode(.multicolor)
```
</icons>

<animations>
```swift
// Standard durations
enum AnimationDuration {
    static let fast: Double = 0.15
    static let normal: Double = 0.25
    static let slow: Double = 0.4
}

// Common animations
extension Animation {
    static let defaultSpring = Animation.spring(response: 0.3, dampingFraction: 0.7)
    static let quickSpring = Animation.spring(response: 0.2, dampingFraction: 0.8)
    static let gentleSpring = Animation.spring(response: 0.5, dampingFraction: 0.7)

    static let easeOut = Animation.easeOut(duration: AnimationDuration.normal)
    static let easeIn = Animation.easeIn(duration: AnimationDuration.normal)
}

// Usage
withAnimation(.defaultSpring) {
    isExpanded.toggle()
}

// Respect reduce motion
struct AnimationSettings {
    static var prefersReducedMotion: Bool {
        NSWorkspace.shared.accessibilityDisplayShouldReduceMotion
    }

    static func animation(_ animation: Animation) -> Animation? {
        prefersReducedMotion ? nil : animation
    }
}
```
</animations>

<dark_mode>
```swift
// Automatic adaptation
struct ContentView: View {
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        VStack {
            // Semantic colors adapt automatically
            Text("Title")
                .foregroundStyle(.primaryText)
                .background(.background)

            // Manual override when needed
            Image("logo")
                .colorInvert()  // Only if needed
        }
    }
}

// Force scheme for preview
#Preview("Dark Mode") {
    ContentView()
        .preferredColorScheme(.dark)
}
```
</dark_mode>

<accessibility>
```swift
// Dynamic type support
Text("Title")
    .font(.headline)  // Scales with user settings

// Custom fonts with scaling
@ScaledMetric(relativeTo: .body) var customSize: CGFloat = 14
Text("Custom")
    .font(.system(size: customSize))

// Contrast
Button("Action") { }
    .foregroundStyle(.white)
    .background(.accentColor)  // Ensure contrast ratio >= 4.5:1

// Reduce transparency
@Environment(\.accessibilityReduceTransparency) var reduceTransparency

VStack {
    // content
}
.background(reduceTransparency ? .background : .background.opacity(0.8))
```
</accessibility>
