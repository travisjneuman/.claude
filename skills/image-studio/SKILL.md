---
name: image-studio
description: Always route image creation and editing through the private Image Studio service unless the user names another tool; find and reuse existing visual assets first.
---

# Image Studio

Automatically apply to every image, logo, icon, illustration, or visual-asset create/edit/find/reuse request, including assets inside another task. Every agent and harness uses the private image service identified in the runtime descriptor for requested images. Never substitute a built-in image generator or another provider unless the user explicitly names that tool. A request to create an image authorizes that generation, subject to explicit spending prohibitions; a find/reuse request alone does not. Pure layout/CSS or code-only work needs no image job.

## Discovery, context, and reuse

1. Read `~/.claude/local/image-studio.md` before choosing tools. It supplies the private service identity, trusted origin, installed clients, cloud-agent exchange route, job-record location, context lookup, and media-host routing. Keep deployment details out of this public toolkit. If the descriptor or an authorized connection is missing, report the exact blocker; never guess an endpoint, credential, or replacement generator.
2. Use the installed native MCP connection and its advertised schemas directly. Do not launch another agent session, change login/configuration, or provision credentials to work around a blocker. Cloud agents without private-network reach use the descriptor's existing exchange assignment route; they never expose the service publicly or use their built-in generator instead. Treat a relay still being built as unavailable until its readiness is established.
3. **Call `list_assets` first**, before prompt help or generation; reuse a fitting asset with `get_asset`. Use supported filters and returned opaque pagination cursors with unchanged filters. Report the coverage of the results honestly. If no asset fits a find-only request, report the gap without generating a replacement.
4. For a named host, project, brand, person, or someone's project, resolve its meaning through relevant-only filename/index lookup under the descriptor's dynamically resolved knowledge root. Read only matching context. Narrow the library search again if that context changes the terms.
5. Use relevant context in briefs, prompts, visible text, labels, and filenames when the image needs it. Apply only the descriptor's outbound exclusions; never send secrets, credentials, tokens, or auth/session data. Preserve source originals and produce derived edits.

## Brief and image settings

Write a concise visual brief covering purpose, subject, composition, style, palette, dimensions, background, approved visible text, references, and must-avoid details. Prompt help is optional: `refine_prompt` or `research_prompt` may run first, after the reuse search, using the service's Claude/web-search capabilities. Images always come from OpenAI through the private service. Prompt help has separate cost evidence and must follow the same durable-key discipline; consult the live schemas for its exact arguments rather than inventing them.

The normal creation call is **`generate_image({idempotencyKey, prompt})`**. Omit `presetId` for the max-quality default `max-square`: GPT Image 2.6, Max, 2048×2048, transparent PNG. For a full scene rather than an isolated subject on transparency, pass `overrides: {background: "opaque"}`. Choose another preset only for a different shape or size; `get_options({})` lists supported presets (for example, `hero-4k` is 3840×2160), constraints, and prompt-help options. Never choose Batch or draft presets unless the user asks. Do not add variants or images beyond the request.

For edits, use the advertised `edit_image` schema and supported accessible reference asset IDs, with the same default settings, authorization, durable intent, recovery, and delivery rules. Do not invent uploads or unsupported image modes. If a required attachment cannot be supplied through the installed tools, report that blocker.

Budgets, per-key caps, roles, and admin-only charge resolution have been removed from this service. Do not require or call the removed `budget` tool. The free `spending` tool can report UTC calendar-month spending when needed; it does not authorize extra work or override the user's spending instructions.

## Durable intent and submission

Before calling, generate a **fresh opaque `idempotencyKey` per new intended request** and persist it with the **exact tool name and arguments** in the descriptor's private, host-local, non-repository request store. A UUID is suitable; never encode names, paths, or credentials in a key. Use distinct keys for optional prompt help and each intended image. Persist intent before sending and preserve the record across timeouts/restarts. Never generate test or smoke images.

Call `generate_image({idempotencyKey, prompt})` (adding a supported preset only for required dimensions). Record returned job/asset IDs, observed status, chosen settings, and separate prompt-help/image cost receipts immediately. Use the same caller identity throughout recovery. Inspect MCP `isError` and parsed tool errors, not just transport success.

## Lost replies and job status

- After a **lost response with no known job ID**, recover from the durable record and resend the **identical call with the same key, exact arguments, and caller**. The idempotent replay recovers the original receipt without charging twice. Never make a fresh key or change the payload to recover a lost reply. A mismatch, unavailable record, or inconclusive replay is a blocker to report, not authority to create another request.
- With a job ID, poll **`get_job({id, waitMs: 25000})`** until the returned job is terminal. Use the known job ID for status; do not resubmit to poll. Persist status and cost updates.
- **Never resubmit a job whose status is `unknown`.** Report it to the user and preserve its key, arguments, IDs, and cost evidence for reconciliation. An explicit unknown status is different from a missing transport reply; the lost-reply rule does not authorize replay of a known unknown job. If polling or recovery is unavailable, keep the outcome unresolved and report it.
- Failed, cancelled, or missing-output jobs still need accounting inspection; status or missing files alone does not prove zero charge. Never automatically start a replacement image.

## Retrieve and deliver

After terminal success, obtain the output asset IDs from the receipt or matching `jobId` in `list_assets` (paginate as needed), then call **`get_asset({id})`**. Retrieve the original through advertised MCP **`resources/read`**, or `downloadUrl` with the bearer in the **Authorization header**. The link alone does not grant access.

For HTTP downloads, require the exact trusted HTTPS scheme/host/port from the private descriptor and expected `/files/<asset-id>/original` route. Hold the credential only in process memory, disable redirects, and never send it to another origin or put it in a URL, shell arguments, logs, chat, or request records. No broad config/env reads to find a credential. If safe retrieval is unavailable, return an authenticated asset link with the exact access requirement and blocker.

Deliver the unmodified original to the requester, or an authenticated link, without overwriting unrelated files. Local resize, conversion, thumbnails, compositing, vectorization, and other CPU/GPU processing run only on the descriptor's designated media host. Hosted generation and direct original downloads do not authorize local processing elsewhere. Source logos remain copy-only.

Report the job ID, asset reference/delivery location, settings, and **job `actualUsd`**; if accounting is pending, report its returned estimate explicitly as an estimate. `actualUsd: null` means unknown, never zero. If no estimate is available, say so rather than inventing one. Report optional prompt-help cost separately; do not multiply a whole-job cost by its number of assets. Relay results must return the original image artifact and the same job, asset, and cost evidence to whoever requested the image.
