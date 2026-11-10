---
name: audio-production
description: Professional audio production for music, podcasts, and sound design. Use when working with audio recording, mixing, mastering, or sound design for any medium.
---

# Audio Production

> Rendering, encoding, and audio or image synthesis run only on the owner's designated media host when the private layer defines one, in a dated work folder outside any repository; on other hosts, plan and write source only. Source logos are copy-only.

Comprehensive guide for professional audio production across music, podcasts, video, and interactive media.

## Audio Fundamentals

### The Audio Signal Chain

```
SOURCE → CAPTURE → PROCESS → OUTPUT

Detailed:
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Source  │→→→│   Mic   │→→→│ Preamp  │→→→│Interface│
│(voice,  │   │         │   │         │   │  (A/D)  │
│ instr.) │   │         │   │         │   │         │
└─────────┘   └─────────┘   └─────────┘   └────┬────┘
                                               │
                                               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│Speakers │←←←│  (D/A)  │←←←│   Mix   │←←←│   DAW   │
│Headphone│   │Interface│   │  Master │   │Recording│
└─────────┘   └─────────┘   └─────────┘   └─────────┘
```

### Key Audio Concepts

| Concept           | Definition                   | Standard                        |
| ----------------- | ---------------------------- | ------------------------------- |
| **Sample Rate**   | Samples per second           | 44.1kHz, 48kHz, 96kHz           |
| **Bit Depth**     | Dynamic range resolution     | 16-bit, 24-bit, 32-bit float    |
| **Bit Rate**      | Data per second (compressed) | 128-320 kbps (MP3)              |
| **Dynamic Range** | Loudest to quietest          | ~96dB (16-bit), ~144dB (24-bit) |
| **Headroom**      | Space below 0 dBFS           | -6 to -18 dB typical            |

### Frequency Spectrum

```
20 Hz                                              20,000 Hz
├───────────────────────────────────────────────────────┤

SUB-BASS │  BASS  │  LOW-MID │  MID  │ HIGH-MID │ HIGH
20-60    │ 60-250 │ 250-500  │500-2k │  2k-6k   │ 6k-20k
         │        │          │       │          │
Rumble   │ Warmth │  Body    │ Pres- │ Presence │ Air
Feel     │ Punch  │  Muddiness│ ence  │ Harshness│ Sibilance
```

### Decibel Reference Points

```
dBFS (Full Scale):
 0 dBFS  ████████████  Digital maximum (clipping)
-3 dBFS  ██████████    Peaks (leave headroom)
-6 dBFS  █████████     Recommended peak ceiling
-12 dBFS ███████       Average loud signal
-18 dBFS ██████        Recommended recording level
-24 dBFS ████          Conservative level
-60 dBFS █             Noise floor target
```

---

## Recording

### Microphone Types

| Type          | Principle        | Best For                        |
| ------------- | ---------------- | ------------------------------- |
| **Dynamic**   | Moving coil      | Loud sources, live, durable     |
| **Condenser** | Capacitor        | Studio vocals, acoustic, detail |
| **Ribbon**    | Thin metal strip | Vintage tone, smooth highs      |
| **USB**       | Built-in ADC     | Podcasts, convenience           |

### Polar Patterns

```
CARDIOID          FIGURE-8           OMNI
   ╭─────╮          ╭───╮           ╭─────╮
 ╭─┤     ├─╮      ╭─┤   ├─╮       ╭─┤     ├─╮
│  │     │  │    │  │   │  │     │  │     │  │
│  │  ●  │  │    │  │ ● │  │     │  │  ●  │  │
│  │     │  │    │  │   │  │     │  │     │  │
 ╰─┤     ├─╯      ╰─┤   ├─╯       ╰─┤     ├─╯
   ╰─────╯          ╰───╯           ╰─────╯
 Front pickup    Front + Back      All around
```

### Recording Levels

```
Target Peaks: -12 to -6 dBFS
Average Level: -18 to -12 dBFS

Why?
- Leaves headroom for processing
- Matches analog equipment sweet spot
- Prevents digital clipping
- 24-bit has plenty of resolution
```

### Recording Best Practices

- [ ] Set gain before recording (never during)
- [ ] Record at 24-bit minimum
- [ ] Use 48kHz for video, 44.1kHz for music
- [ ] Monitor with headphones
- [ ] Record a few seconds of room tone
- [ ] Check phase when using multiple mics
- [ ] Label takes immediately

---

## Reference files

Detailed material is in separate files so this overview stays short. Read only the file whose topic matches the task; each one is self-contained. Paths are relative to the folder that holds this `SKILL.md` (in the full toolkit install, `~/.claude/skills/audio-production/`).

| Topic | File | Covers |
| --- | --- | --- |
| Essential Processing | [`references/essential-processing.md`](references/essential-processing.md) | EQ (Equalization); Compression; Reverb; Delay |
| Mixing | [`references/mixing.md`](references/mixing.md) | Gain Staging; Panning Guidelines; Frequency Balancing; Mix Bus Processing |
| Mastering | [`references/mastering.md`](references/mastering.md) | Mastering Goals; Loudness Standards; Mastering Chain (Typical) |
| Podcast Production | [`references/podcast-production.md`](references/podcast-production.md) | Recording Setup; Podcast Processing Chain; Podcast Export Settings |
| Sound Design | [`references/sound-design.md`](references/sound-design.md) | Creating Sounds; Synthesis Types; Layering Formula |
| DAWs (Digital Audio Workstations) | [`references/daws-digital-audio-workstations.md`](references/daws-digital-audio-workstations.md) | 15 lines |
| File Formats | [`references/file-formats.md`](references/file-formats.md) | Export Specifications |
| Best Practices | [`references/best-practices.md`](references/best-practices.md) | DO:; DON'T: |
| Quality Checklist | [`references/quality-checklist.md`](references/quality-checklist.md) | Pre-Export; Final Check |
