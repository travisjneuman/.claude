# audio-production: Mixing

Part of the `audio-production` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Mixing

### Gain Staging

```
Signal Flow Levels:
┌─────────────────────────────────────────┐
│ Input:     -18 dBFS (sweet spot)        │
│            ↓                            │
│ Plugin 1:  Output matches input level   │
│            ↓                            │
│ Plugin 2:  Output matches input level   │
│            ↓                            │
│ Fader:     Unity (0 dB) ideally         │
│            ↓                            │
│ Bus:       -12 to -6 dBFS peaks         │
│            ↓                            │
│ Master:    -6 dBFS peaks (before limit) │
└─────────────────────────────────────────┘
```

### Panning Guidelines

```
Stereo Field:
Hard L    L    L-C    CENTER    R-C    R    Hard R
  │       │     │        │        │     │       │
  │       │     │        │        │     │       │
Rhythm   Gtr1  Keys1   Vocal    Keys2  Gtr2   Rhythm
 Gtr            BVox1   Bass    BVox2          Gtr
                        Kick
                        Snare

Common Positions:
- Center (0): Lead vocal, bass, kick, snare
- Slight L/R: Main instruments, harmonies
- Wide L/R: Rhythm guitars, stereo keys
- Hard L/R: Doubled parts, effects
```

### Frequency Balancing

```
Making space (subtractive EQ approach):
┌────────────────────────────────────────────┐
│ Kick:  Boost 60Hz   │ Cut from Bass here   │
│ Bass:  Boost 80-100 │ Cut from Kick here   │
│ Gtr:   Owns 1-3kHz  │ Cut vocal slightly   │
│ Vocal: Boost 3-5kHz │ Cut guitar slightly  │
└────────────────────────────────────────────┘

Each element should have its own frequency "home"
```

### Mix Bus Processing

```
Typical Chain:
1. Subtle EQ (tonal shaping)
2. Light compression (2:1, 1-3dB GR)
3. Stereo enhancement (if needed)
4. Limiter (only for reference bounce)

Keep mix bus processing minimal!
Leave headroom for mastering.
```

---
