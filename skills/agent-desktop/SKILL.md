---
name: agent-desktop
description: Control native desktop apps with agent-desktop accessibility snapshots and actions on macOS, Windows, or Linux. Use for desktop UI tasks, never browser automation or web research.
---

# Agent Desktop

Thin guidance for `vercel-labs/agent-desktop` v1.0.2, an Apache-2.0 Rust shell CLI using macOS AX, Windows UI Automation, and Linux AT-SPI.

## Route and prerequisites

- If a higher-priority desktop-control tool is configured for this host (see local rules), prefer it.
- This is a native desktop route, never a browser/source-intake route. Never scrape or drive browser web research with it.
- If the CLI is missing, report the pinned prerequisite `npm install -g agent-desktop@1.0.2`; install only when authorized.
- On macOS, use `agent-desktop permissions --guide` and ask the user to grant Accessibility. Screenshots also need Screen Recording permission.
- At first use, load both upstream guides rather than guessing command syntax:

```sh
agent-desktop skills get desktop
agent-desktop skills get platform
```

## Work loop

1. Identify the requested app/window with `list-apps` or `list-windows` as needed.
2. Read `agent-desktop snapshot --app "<App>" -i --no-trace`.
3. Use current snapshot refs with `click`, `set-value`, `type`, or `press`, following the loaded guides. Quote refs in PowerShell.
4. Re-snapshot after UI changes before choosing another ref. Use `find`, `get`, or `is` for targeted inspection; use `mouse-click` only when refs cannot address the target.

Prefer `--no-trace`. Keep traces and screenshots out of repositories and avoid capturing credentials or unrelated private content.

## Platform limits and approval

- Default operation is background friendly. Use `--headed` only when needed: it moves the real cursor and can steal focus.
- Windows `type` and right-click require headed mode. Windows/Linux headless key actions need the target focused; do not assume background targeting establishes focus.
- Hyprland/Wayland pointer, drag, and window control are unsupported; report that limit rather than improvising another runtime.
- The CLI has no built-in confirmation or allowlist. Before account writes, purchases, sends, or deletions, require explicit user approval for that exact action and target. Existing action-specific approval suffices.
- Never use `--force` without explicit approval. Stop at permission/provider gates and report the blocker.
- Report what the requested interaction returned; do not claim completion from a successful command alone.
