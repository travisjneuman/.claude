# audio-production: File Formats

Part of the `audio-production` skill. Overview and the list of other reference files: [SKILL.md](../SKILL.md).

## File Formats

| Format   | Type         | Quality  | Use                 |
| -------- | ------------ | -------- | ------------------- |
| **WAV**  | Uncompressed | Lossless | Production, archive |
| **AIFF** | Uncompressed | Lossless | Mac production      |
| **FLAC** | Compressed   | Lossless | Archive, audiophile |
| **ALAC** | Compressed   | Lossless | Apple ecosystem     |
| **MP3**  | Compressed   | Lossy    | Distribution        |
| **AAC**  | Compressed   | Lossy    | Streaming, Apple    |
| **OGG**  | Compressed   | Lossy    | Games, open source  |

### Export Specifications

```
For Mastering:
- Format: WAV
- Bit depth: 24-bit (or 32-bit float)
- Sample rate: Match session (typically 44.1/48kHz)
- Headroom: -6 dBFS peaks

For Distribution:
- Format: WAV or FLAC (lossless)
- Bit depth: 16-bit (with dither)
- Sample rate: 44.1 kHz
- Loudness: Platform target LUFS
```

---
