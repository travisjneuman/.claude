---
name: hermes-tweet
description: Hermes Agent X/Twitter automation through Xquik. Use when monitoring X, researching accounts, reading tweets, checking trends, or planning approval-gated social actions with the Hermes Tweet plugin.
---

# Hermes Tweet

Use Hermes Tweet when Claude Code work needs X/Twitter context through a native
Hermes Agent plugin. It is best for social listening, launch monitoring,
support triage, account research, trend checks, and safe draft planning before
any public action.

## Source

- Repository: <https://github.com/Xquik-dev/hermes-tweet>
- Package: `hermes-tweet`
- Plugin entry point: `hermes_agent.plugins`
- Runtime toolset: `hermes-tweet`

## Setup

Install and enable the plugin on the Hermes runtime host:

```bash
hermes plugins install Xquik-dev/hermes-tweet --enable
```

If the install ran without an interactive prompt, configure `XQUIK_API_KEY` in
the runtime environment or `~/.hermes/.env`, then reload the active Hermes
session.

Verify the plugin state:

```bash
hermes plugins list
hermes tools list
```

## Workflow

1. Start with `tweet_explore` for no-network planning and tool discovery.
2. Use read tools only after `XQUIK_API_KEY` is configured.
3. Treat write actions as sensitive. Require `HERMES_TWEET_ENABLE_ACTIONS=true`
   and explicit user approval before posting, replying, following, or liking.
4. Keep X/Twitter findings source-linked and separate observations from
   recommendations.
5. Summarize rate limits, missing credentials, disabled tools, or failed reads
   as operational blockers instead of guessing.

## Safety Rules

- Prefer read-first workflows.
- Never invent tweet content, account state, metrics, or trend data.
- Never use action tools for diagnostics.
- Ask before any public or account-mutating action.
- Do not paste API keys, cookies, tokens, or private account data into prompts,
  issues, PRs, or logs.

## Useful Prompts

```text
Use Hermes Tweet to inspect current X/Twitter context for this launch. Read only.
```

```text
Plan a reply strategy from these X/Twitter findings. Do not post anything.
```

```text
Check whether Hermes Tweet is installed and enabled, then explain any missing setup.
```
