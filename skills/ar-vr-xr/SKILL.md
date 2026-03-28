---
name: ar-vr-xr
description: AR/VR/XR development with Unity XR, WebXR, ARKit, ARCore, Meta Quest SDK, and spatial computing. Use when building augmented reality, virtual reality, mixed reality applications, or spatial experiences.
---

# AR/VR/XR Development

## Platform Overview

| Platform | SDK | Target Devices |
|----------|-----|----------------|
| **Unity XR** | XR Interaction Toolkit | Quest, Vision Pro, PCVR, mobile |
| **WebXR** | Three.js, A-Frame, Babylon.js | Any WebXR browser |
| **ARKit** | RealityKit, ARKit | iPhone, iPad, Vision Pro |
| **ARCore** | Sceneform, ARCore | Android devices |
| **Meta Quest** | Meta XR SDK | Quest 2/3/Pro |
| **Apple Vision Pro** | visionOS, RealityKit | Vision Pro |

## Unity XR

```csharp
// XR Interaction Toolkit setup
using UnityEngine.XR.Interaction.Toolkit;

public class GrabbableObject : XRGrabInteractable
{
    protected override void OnSelectEntered(SelectEnterEventArgs args)
    {
        base.OnSelectEntered(args);
        // Object grabbed
    }

    protected override void OnSelectExited(SelectExitEventArgs args)
    {
        base.OnSelectExited(args);
        // Object released
    }
}
```

### Unity XR Best Practices
- Target 72-120 FPS (platform-dependent) — frame drops cause nausea
- Use single-pass instanced rendering for stereo
- Bake lighting where possible, limit dynamic lights to 1-2
- Draw calls: <100 for mobile VR, <500 for PCVR
- Use LOD groups aggressively — user can't see distant detail in VR

## WebXR

```javascript
// Three.js WebXR
import * as THREE from 'three';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

renderer.setAnimationLoop((time, frame) => {
    if (frame) {
        const session = renderer.xr.getSession();
        const inputSources = session.inputSources;
        // Handle controller input
    }
    renderer.render(scene, camera);
});
```

## Apple Vision Pro (visionOS)

```swift
import SwiftUI
import RealityKit

struct ImmersiveView: View {
    var body: some View {
        RealityView { content in
            let sphere = MeshResource.generateSphere(radius: 0.1)
            let material = SimpleMaterial(color: .blue, isMetallic: true)
            let entity = ModelEntity(mesh: sphere, materials: [material])
            entity.position = [0, 1.5, -1]
            content.add(entity)
        }
        .gesture(TapGesture().targetedToAnyEntity().onEnded { event in
            // Handle tap on entity
        })
    }
}
```

## XR Design Principles
- **Comfort:** Avoid artificial locomotion, use teleport or room-scale movement
- **Interaction:** Direct manipulation (grab, point) over abstract UI
- **UI placement:** World-space UI at comfortable distance (1-3m), avoid head-locked HUD
- **Performance:** Frame rate is non-negotiable — optimize ruthlessly
- **Accessibility:** Provide seated mode, adjustable scale, color-blind options
- **Spatial audio:** 3D audio for immersion and wayfinding (HRTF, ambisonics)
