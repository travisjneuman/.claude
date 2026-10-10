# tjn.claude/ Website

Showcase website for the `.claude` configuration framework.

**Live:** https://claude.travisjneuman.com

## Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Hosting:** Cloudflare Pages (GitHub integration, auto-deploy on push)
- **Build output:** Static HTML (`output: "export"` in `next.config.ts`)

## Development

```bash
cd website
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Output goes to `website/out/` as static files.

## Deployment

Deployed via **GitHub > Cloudflare Pages** pipeline:

1. Push to `master` triggers Cloudflare Pages build
2. Cloudflare clones the repo (marketplace clones are gitignored, so none are present)
3. Build runs `npm run build` inside `website/`
4. Static output (`out/`) is deployed to the CDN

### Important: Canonical marketplace snapshots

Marketplaces are manifest-only: `.gitmodules` lists public identities; local clones are gitignored. **Both local and Cloudflare builds** use the exact same generated `src/lib/data/marketplace-counts.json`, with manifest URLs, complete membership, globally deduplicated committed-HEAD skill bodies, selected source revisions and date. There is no live rawcount path, incomplete-coverage fallback or summation of overlapping per-repo totals.

`scripts/generate-counts.mjs` writes this snapshot only in an explicitly authorized source refresh. Pre-commit never regenerates/stages it. The matching root `counts.json` supplies public core counts and identity lists; legacy or mismatched snapshots fail visibly before publication. See [Count pipeline](../docs/COUNT-PIPELINE.md).

### Cloudflare Pages configuration

| Setting | Value |
| --- | --- |
| Production branch | `master` |
| Build command | `cd website && npm install && npm run build` |
| Build output directory | `website/out` |
| Root directory | `/` |

## Data sources

| Data | Source | Fallback |
| --- | --- | --- |
| Skills | `counts.json` public identity list + listed real `../skills/` source files | No private/linked/synced fallback |
| Agents | `counts.json` public identity list + listed real `../agents/` source files | None |
| Commands | Canonical base-command identities; router wrappers have a separate count/list | None |
| Hooks | Canonical wired file/event/matcher identities (not the dispatcher) + listed source | Description metadata only |
| Rules | `../rules/*.md` (path-scoped via `paths:` frontmatter) and `../docs/reference/` | None needed |
| Scripts | `../scripts/` (`.sh`, `.ps1`, `.mjs`), `../scripts/hooks/`, `../_pull-all-repos.sh` | None needed |
| Marketplace repos | `marketplace-counts.json` committed source snapshot, same locally/hosted | No recount or fallback |

## Updating counts

When reviewed public sources change and publication is authorized, perform an explicit source write:

```bash
bash ~/.claude/scripts/update-counts.sh
```

This runs `scripts/generate-counts.mjs`, which preflights complete source coverage and all destinations, updates owned current numeric documentation, and writes matching `counts.json` and `marketplace-counts.json`. It does not run the index, tests/checks/builds, media, Git staging, or implicit cross-repo consumers. If needed, explicitly refresh the index before counts because the index can update public `settings.json`.

## Architecture Notes

### Prebuild Script

There is no prebuild step: marketplaces are manifest-only, so builds never contain marketplace clones to clean up.

### Scripts Data Layer

`src/lib/data/scripts.ts` follows the hooks.ts pattern — a `SCRIPT_METADATA` record maps each script slug to its name, category, description, and "when to run" text. The `getScripts()` function reads `.sh`, `.ps1`, and `.mjs` files from `../scripts/`, `../scripts/hooks/`, and `../_pull-all-repos.sh`, wraps raw content in markdown code blocks, and converts to HTML with remark. Scripts are grouped by category on the `/scripts` page and summarized on the homepage.

### Dynamic Counts

`src/lib/data/counts.ts` formats the canonical root `counts.json` fields directly, without parsing every Markdown resource just to count it. Website collectors use the same generated identity lists for content. Homepage animated totals use the canonical numeric display lower bound; marketplace headings/metadata use its corresponding formatted string. Both local and hosted builds therefore show the same population/date. These strings feed existing metadata, footer, console greeting and components; no redesign is involved.

### Component Props

- **ConsoleGreeting** accepts a `stats` prop with formatted count strings for the ASCII art greeting.
- **Footer** accepts a `counts` prop for displaying skill/agent/marketplace totals.
- **FooterWithDocs** passes counts from `getCounts()` into Footer.
- **layout.tsx** uses `getCounts()` to populate metadata descriptions.
