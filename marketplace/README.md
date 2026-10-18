# Upstream marketplace

`marketplace.json` is the `travisjneuman-upstream` Claude Code marketplace. Each entry points at a third-party plugin's own repository with no pinned `sha` or `ref`, so installs follow the upstream default branch. Curated marketplaces such as `claude-plugins-official` pin a commit and only move when their maintainers re-pin it.

`settings.json` declares this marketplace in `extraKnownMarketplaces` as a `url` source (the raw GitHub URL of this file) with `autoUpdate: true`. `scripts/install-plugins.sh` registers it, refreshes it, installs the enabled plugins and runs `claude plugin update` for plugins from any marketplace marked `autoUpdate: true`. The daily background pull runs that script on every machine.

Where the raw URL can't be fetched (a host that sends AI tools through a scoped proxy), the script registers the toolkit checkout's own `marketplace/marketplace.json` instead. It's the same file and stays current through the toolkit pull. The plugin itself is still cloned from its upstream repo over git. `claude plugin marketplace add` rewrites the `settings.json` entry with its own source and no `autoUpdate`, so the script puts the tracked declaration back afterwards; on such a host Claude's startup reconciler then retries the URL in the background and keeps the file registration when it fails.

Claude Code updates a plugin only when its `plugin.json` `version` changes (the commit SHA is used only when no version is set), so an upstream commit that keeps the version number is picked up at the next version bump.

| Plugin | Upstream | Notes |
| --- | --- | --- |
| `unreal-engine-skills-for-claude-code` | [EpicGames/unreal-engine-skills-for-claude-code-plugin](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin) | Also listed in `claude-plugins-official`; install only this copy so the two never load together. Needs a running Unreal Editor with the ModelContextProtocol and AllToolsets plugins for its MCP tools. |
