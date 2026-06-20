#!/bin/bash
# update-counts.sh — canonical count generator wrapper
# Usage: bash ~/.claude/scripts/update-counts.sh [--sync-consumers]

set -euo pipefail
BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node "$BASE/scripts/generate-counts.mjs" --write "$@"
