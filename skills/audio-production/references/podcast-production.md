# audio-production: Podcast Production

Part of the `audio-production` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## Podcast Production

### Recording Setup

```
Recommended Signal Chain:
Mic → Audio Interface → DAW

Equipment Tiers:
┌─────────────────────────────────────────┐
│ Budget:    USB Mic (Blue Yeti, AT2020)  │
│ Mid:       SM7B + Cloudlifter + Interface│
│ Pro:       Large diaphragm condenser    │
│            + high-end preamp            │
└─────────────────────────────────────────┘
```

### Podcast Processing Chain

```
1. Noise Reduction
   └─→ Remove room noise, hum

2. De-essing
   └─→ Tame harsh "s" sounds

3. Compression
   └─→ Even out volume (3:1-4:1)

4. EQ
   └─→ HPF at 80Hz, presence boost

5. Limiter
   └─→ Catch peaks, -1 dBFS ceiling

Target: -16 LUFS (mono), -19 LUFS (stereo)
True Peak: -1 dBTP
```

### Podcast Export Settings

```
Standard:
- Format: MP3 or AAC
- Bitrate: 128 kbps (mono), 192 kbps (stereo)
- Sample rate: 44.1 kHz

High Quality:
- Format: AAC
- Bitrate: 256 kbps
- Sample rate: 48 kHz

Chapters: Use ID3 tags for chapter markers
Artwork: 3000x3000 minimum, JPG or PNG
```

---
