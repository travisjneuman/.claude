#!/bin/bash
# After a pull or merge: rebuild settings.json from its layers when that applies.
# Today this is a no-op (see scripts/build-settings.mjs); it never fails a merge.
ROOT="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
command -v node >/dev/null 2>&1 || exit 0
[ -f "$ROOT/scripts/build-settings.mjs" ] && node "$ROOT/scripts/build-settings.mjs" --quiet
exit 0
