---
description: Explicitly refresh public toolkit and committed marketplace source snapshots and numeric documentation
disable-model-invocation: true
---

Refresh the existing public count pipeline only when publication is authorized:

```bash
bash ~/.claude/scripts/update-counts.sh --as-of=YYYY-MM-DD
```

The wrapper defaults to `--write`. An explicit `--check` is read-only; passing both modes is an error. Checking, testing, linting, building, or sample runs require separate owner authorization; they are not part of a source refresh.

The producer measures public real toolkit files and every manifest marketplace's **committed HEAD blobs**, not dirty/untracked plugin installations. It rejects incomplete/unreadable/misidentified clones, records selected revisions and clean/modified state, and writes one public snapshot with identity lists. Pins are snapshots, not a promise of latest upstream content.

It updates `counts.json`, the website's `marketplace-counts.json`, `plugin.json`, and specifically owned current numeric documentation (including `skills/README.md`). The website consumes these same snapshots locally and on hosted builds; it never recounts clones. Historical changelog counts remain historical.

It does **not** regenerate the index, stage/commit/push, render images, or update other repositories implicitly. If the discovery index needs refresh, explicitly run `node ~/.claude/scripts/generate-index.mjs --write` **before** the count write, because the index may update public `settings.json`.

Optional explicit consumers, measured in the same single pass:

```bash
node ~/.claude/scripts/generate-counts.mjs --write --as-of=YYYY-MM-DD \
  --travis-repo /path/to/travisjneuman --portfolio-repo /path/to/tjn.portfolio
```

All destinations must preflight before any write. The profile requires `claude-counts` README markers and existing public Claude facts; the portfolio receives JSON only. Review the resulting diff and producer output. Do not rerun both consumer wrappers to remeasure the same inputs.

See [Count pipeline](../docs/COUNT-PIPELINE.md) for definitions, provenance, exact outputs, failure behavior, and the separate DESK-only media contract.
