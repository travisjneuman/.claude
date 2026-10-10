#!/bin/bash
# Canonical generator wrapper. Default: write. Explicit --check: read-only.
# No index generation, Git staging, implicit consumers, or media rendering.
# Pass explicit --marketplace-snapshot-file=name=/absolute/existing/file through
# unchanged; only the producer validates reviewed exports, never a fallback here.
set -euo pipefail
BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE=--write
for arg in "$@"; do
    case "$arg" in
        --check|--write) MODE="" ;;
    esac
done
if [ -n "$MODE" ]; then
    node "$BASE/scripts/generate-counts.mjs" "$MODE" "$@"
else
    node "$BASE/scripts/generate-counts.mjs" "$@"
fi
