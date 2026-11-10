# ios-development: visionOS and Spatial Computing

Part of the `ios-development` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## visionOS and Spatial Computing

```swift
// visionOS app structure
@main
struct MyVisionApp: App {
    var body: some Scene {
        // 2D window
        WindowGroup {
            ContentView()
        }

        // Immersive space
        ImmersiveSpace(id: "immersiveScene") {
            ImmersiveView()
        }

        // 3D volume
        WindowGroup(id: "3dContent") {
            Model3D(named: "Globe") { model in
                model.resizable()
                    .aspectRatio(contentMode: .fit)
            } placeholder: {
                ProgressView()
            }
        }
        .windowStyle(.volumetric)
    }
}

// RealityKit integration
import RealityKit

struct ImmersiveView: View {
    var body: some View {
        RealityView { content in
            let sphere = MeshResource.generateSphere(radius: 0.5)
            let material = SimpleMaterial(color: .blue, isMetallic: true)
            let entity = ModelEntity(mesh: sphere, materials: [material])
            content.add(entity)
        }
        .gesture(TapGesture().targetedToAnyEntity().onEnded { value in
            // Handle spatial tap
        })
    }
}
```

---
