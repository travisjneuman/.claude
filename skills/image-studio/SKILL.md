---
name: image-studio
description: Create, edit, find, or reuse images, logos, icons, illustrations, and visual assets through a private Image Studio library and MCP workflow.
---

# Image Studio

Use for any request to create, edit, find, or reuse an image, logo, icon, illustration, or visual asset, including assets needed inside another task. Start automatically; no slash command is required. An explicit request for another tool still wins. Pure layout/CSS or code-only changes do not require an image job.

## Private context and reuse

1. Read `~/.claude/local/image-studio.md` before calling tools. It supplies the trusted origin, native server names, dynamic knowledge-root resolution, confidentiality exclusions, job-record location, and local media routing. Keep those details private. If it is missing, stop service operations and report the missing descriptor; never guess an endpoint or credential.
2. Discover the connected native MCP server and its advertised schemas. Use its operations directly; do not manufacture a tool name or connection. A missing or unauthenticated connection is a setup blocker, never authority to use another paid provider or change login state.
3. **Call `list_assets` first**, with only safe filters, before refinement or generation. Use optional `q`, `project`, `favorite`, `limit` (1–100), and the returned opaque `nextCursor` as `cursor` with unchanged filters. Reuse a fitting asset via `get_asset`; do not regenerate an adequate match. Token-scoped results cover only accessible assets, not the full library. For a find-only request, stop after reuse/search results or explain the gap; finding does not authorize a paid replacement.
4. For a named host, project, brand, person, or someone's project, resolve its meaning with a relevant-only filename/index search under the descriptor's dynamically resolved knowledge root. Read only matching context. If context changes the safe search terms, narrow the library search again. Do not send private names as search/project metadata merely to find their meaning.
5. Private knowledge may guide interpretation locally. It must not enter provider briefs, prompts, reference images, labels, filenames, idempotency keys, or service metadata. Apply the descriptor's exclusions to all outbound fields and references. Use a safe visual abstraction (shape, palette, mood, composition) that carries no confidential identity or facts. If the task cannot be represented safely, ask for an allowed abstraction or explain the blocker; do not silently disclose. Recheck the refined prompt before image submission.

## Brief, options, and admission

Write a concise, sanitized visual brief: purpose, subject, composition, style, palette, aspect/dimensions, background/transparency, exact approved visible text, references, and must-avoid details. Include only what the asset needs. Preserve source originals; editing requires a derived result.

Call `get_options` (`{}`) for supported preset IDs, model IDs, constraints, prices, and refinement availability; call `budget` (`{}`) before paid work. Select supported combinations rather than guessing IDs or features. A reservation or estimate is not an actual charge or a guaranteed ceiling. Respect existing authorization and caps. Stop on paused, stale balance, missing cycle, expiry, allowance, token-cap, or project restrictions; never switch tokens, increase limits, or use a new key to bypass a denial.

Default prompt refinement for an authorized new image/edit is `refine_prompt` using **Claude Opus 5.5**, model `claude-opus-5-5`, effort `high`, unless the user requests otherwise. This is a task-specific service setting, not a change to the agent's own model. Confirm that pair in `get_options`; if unavailable or refinement is not authorized, report the limitation and obtain the user's choice before substituting a paid model. Refinement itself spends Anthropic budget. A find/reuse task needs no refinement.

Use **Later / Batch** when the user allows waiting and the catalog supports it. Explain the longer completion window and estimate; do not imply a local queue is discounted Batch. Otherwise use standard delivery. Never create extra variants or larger image counts merely because a cap allows them.

## Durable intent and submission

Before each paid operation, persist a unique opaque idempotency key and the exact sanitized payload in the descriptor's private, non-repository request store. Use separate keys for refinement and each intended image. A key contains no host, person, project, path, or credential; a UUID is suitable. Default to one image per intended job (`n: 1`); requested variants are separate intended jobs with separate keys. Preserve all keys across restarts and lost replies. Record returned job/asset IDs, provider receipts, observed status, and separate refinement/image cost evidence immediately; do not rely on chat memory. Never persist credentials there.

Current input contracts (live advertised schemas take precedence):

- `refine_prompt`: `{idempotencyKey, prompt, presetId, model?, effort?, project?}` → `{prompt, usd}`. Pin the selected model and effort explicitly. Sanitize its result before the next call.
- `generate_image`: `{idempotencyKey, prompt, presetId, project?, overrides?}` → `{job, created}`.
- `edit_image`: generation fields plus `referenceAssetIds` (1–16 existing accessible asset IDs, subject to model limits) → `{job, created}`. There is **no external-image upload tool or route**. A local attachment cannot be turned into an asset ID by inventing an upload operation; report that constraint.
- `overrides`: supported `model`, `quality`, `size`, `background`, `outputFormat`, `n`, `outputCompression`, `moderation`, and edit-only `inputFidelity`. Do not send `kind` or `mode` to single-image tools, or image reasoning controls that the catalog does not support.
- `submit_batch`: `{items: [...]}` (1–100); each item has the creation fields and its own key, optional `kind` (`generate` or `edit`), and edit `referenceAssetIds`. One model and kind per batch; mode is batch. Returns `{jobs}`. Persist every returned ID and its key mapping.

Additional properties are rejected. Successful MCP results are JSON inside a text content block; inspect `isError` and the parsed error, not just HTTP success.

## Status and uncertain outcomes

Poll `get_job({id})` using a known job ID at a modest interval, backing off for Batch. Never resubmit to ask for status. `queued`, `dispatching`, and `submitted` are in progress; `succeeded`, `failed`, and `cancelled` need final accounting inspection. `unknown` requires human reconciliation: stop automatic paid actions and preserve the reservation and original request.

**Never automatically resend after a timeout, lost reply, connection error, or unknown outcome**, even under the same key. Do not create a fresh key to get past uncertainty. Existing idempotency protects exact same-caller/key/payload receipt replay, but does not authorize an automatic replay or a new generation. A deliberately new paid attempt after reconciliation needs explicit user intent and a new key.

If a response was lost without a job ID:

1. Read the durable request record and any existing native tool receipt. `list_assets` can recover an output's `jobId`; match evidence, never infer absence from missing files.
2. There is no MCP `list_jobs` or lookup-by-key tool. The existing authenticated, same-origin read-only HTTP `GET /api/jobs?limit=100` returns `{items, nextCursor}` with job `idempotencyKey`; match the original key locally and paginate with the unchanged returned cursor. Use only the existing credential route described privately; never print whole job listings or introduce new authentication. Persist the recovered ID, then use `get_job`.
3. If that read-only route is unavailable, inaccessible, or inconclusive, ask the maintainer to locate the original job by the preserved opaque key/time. Keep the outcome uncertain and do not resend. An empty current list does not establish no charge.
4. Refinements are separate charge records, not image jobs. MCP has no refinement status lookup; admin-only `GET /api/charges` can support maintainer reconciliation. Agent tokens cannot administer it. Keep the refinement key and payload; do not invoke refinement again to discover status or repeat it with a new key.

## Retrieve and report

On success, locate outputs by matching `jobId` in `list_assets`; paginate with `nextCursor` until found/exhausted, then call `get_asset({id})`. It returns metadata plus `downloadUrl`; the URL alone does not authorize a download.

Validate that `downloadUrl` has exactly the trusted HTTPS scheme/host/port from the private descriptor and the expected `/files/<asset-id>/original` route. Download with the same bearer credential using the existing private credential mechanism. Never send a bearer to another origin, follow credential-bearing redirects, put a token in a URL, or expose it in shell arguments, history, logs, chat, or files. Stop on an unexpected URL. No broad config reads or secret dumps to locate a credential. If safe download access is unavailable, return the asset ID/link with its authentication requirement and exact blocker.

Save the unmodified original at the requested permitted location without overwriting unrelated files, or return an authenticated asset link. Respect the descriptor's local media routing for resizing, thumbnailing, compositing, vectorization, and other processing; cloud-only calls and direct downloads do not authorize local rendering on another host. Do not promise SVG/vector output, uploads, or unsupported generation modes. Copy-only source-logo rules still apply.

Report asset/job IDs or permitted links, delivery location, chosen settings, and cost evidence: refinement `usd` separately from image `actualUsd`; label estimates and `reservedUsd` as such. `actualUsd: null` means unknown, never zero. Job status or missing assets alone do not prove no charge; charged success can lack files and charged failure can retain some files. Do not multiply a whole-job cost by its number of assets. State incomplete status, recovery needs, and cost uncertainty plainly.
