#!/bin/bash
# Publication safety only: no generation, staging, checks, tests or consumer writes.
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"
exec node "$ROOT/scripts/hooks/staged-public-safety.mjs"
