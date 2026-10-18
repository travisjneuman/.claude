# Upstream marketplace

`marketplace.json` is the `travisjneuman-upstream` Claude Code marketplace. Each entry points at a third-party plugin's own repository with no pinned `sha` or `ref`, so installs follow the upstream default branch. Curated marketplaces such as `claude-plugins-official` pin a commit and only move when their maintainers re-pin it.

`settings.json` declares this marketplace in `extraKnownMarketplaces` as a `url` source (the raw GitHub URL of this file) with `autoUpdate: true`. `scripts/install-plugins.sh` registers it, refreshes it, installs the enabled plugins and runs `claude plugin update` for plugins from any marketplace marked `autoUpdate: true`. The daily background pull runs that script on every machine.

Claude Code updates a plugin only when its `plugin.json` `version` changes (the commit SHA is used only when no version is set), so an upstream commit that keeps the version number is picked up at the next version bump.

| Plugin | Upstream | Notes |
| --- | --- | --- |
| `unreal-engine-skills-for-claude-code` | [EpicGames/unreal-engine-skills-for-claude-code-plugin](https://github.com/EpicGames/unreal-engine-skills-for-claude-code-plugin) | Also listed in `claude-plugins-official`; install only this copy so the two never load together. Needs a running Unreal Editor with the ModelContextProtocol and AllToolsets plugins for its MCP tools. |
