# audio-production: Essential Processing

Part of the `audio-production` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Essential Processing

### EQ (Equalization)

```
Types:
- High-pass filter (HPF): Removes low frequencies
- Low-pass filter (LPF): Removes high frequencies
- Bell/Peak: Boost or cut specific frequency
- Shelf: Boost or cut above/below frequency

Common Applications:
┌─────────────────────────────────────────┐
│ Vocal:                                  │
│ HPF at 80-100Hz (remove rumble)         │
│ Cut 200-300Hz (reduce mud)              │
│ Boost 3-5kHz (presence)                 │
│ Shelf boost 10kHz+ (air)                │
├─────────────────────────────────────────┤
│ Kick Drum:                              │
│ Boost 50-80Hz (sub)                     │
│ Cut 300-400Hz (boxiness)                │
│ Boost 3-5kHz (attack/click)             │
├─────────────────────────────────────────┤
│ Electric Guitar:                        │
│ HPF at 80Hz                             │
│ Cut 400-600Hz if muddy                  │
│ Boost 2-4kHz (bite)                     │
└─────────────────────────────────────────┘
```

### Compression

```
Parameters:
┌────────────────────────────────────────────────┐
│ Threshold: Level where compression starts      │
│ Ratio: Amount of compression (4:1, 8:1, etc.) │
│ Attack: Time to engage (fast=punch, slow=body)│
│ Release: Time to disengage                     │
│ Knee: Hard (sudden) or soft (gradual)         │
│ Makeup Gain: Restore lost volume               │
└────────────────────────────────────────────────┘

Common Settings:
┌─────────────────────────────────────────┐
│ Vocals: 3:1-4:1, medium attack/release  │
│ Drums: 4:1-8:1, fast attack             │
│ Bass: 4:1, medium attack                │
│ Mix Bus: 2:1-3:1, slow attack, 1-3dB GR│
└─────────────────────────────────────────┘
```

### Reverb

| Type        | Character       | Use                 |
| ----------- | --------------- | ------------------- |
| **Room**    | Small, tight    | Natural ambience    |
| **Hall**    | Large, spacious | Orchestral, ballads |
| **Plate**   | Bright, smooth  | Vocals, snare       |
| **Spring**  | Vintage, boingy | Guitar, lo-fi       |
| **Chamber** | Warm, dense     | Natural depth       |

```
Key Parameters:
- Pre-delay: Time before reverb (50-100ms for vocals)
- Decay/RT60: How long it lasts
- Damping: High-frequency absorption
- Size: Room dimensions
- Mix/Wet-Dry: Balance with original
```

### Delay

| Type           | Application                    |
| -------------- | ------------------------------ |
| **Slapback**   | 50-150ms, rockabilly, presence |
| **Stereo**     | Different L/R times, width     |
| **Ping-pong**  | Alternating L/R, interest      |
| **Tempo-sync** | 1/4, 1/8 notes, rhythmic       |

---
