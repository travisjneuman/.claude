# Security

Up: [README](./README.md) · Not here: what the repo keeps out of git and why is in [docs/SECURITY.md](./docs/SECURITY.md); what each hook blocks is in [hooks/README.md](./hooks/README.md).

## Reporting a problem

Report privately. On GitHub, open the repository's **Security** tab and choose **Report a vulnerability**. If that button isn't offered, open an issue that says only that you have a security report, with no details, and the maintainer will arrange a private channel.

Please don't put exploit details, credentials, or private paths in a public issue or pull request.

Only the current `master` branch is supported. Fixes land there; there are no maintained release branches.

## What this toolkit trusts, on purpose

This is a configuration for running Claude Code with as few interruptions as possible. That is a deliberate trade, and you should make it knowingly.

| Design choice | What it means for you |
| --- | --- |
| `permissions.defaultMode` is `bypassPermissions` | Claude runs commands and edits files without asking. Your request is the authorization. |
| The guard hook is a seatbelt, not a sandbox | `hooks/guard.js` blocks a short list of destructive commands in Bash and PowerShell (root deletes, force pushes, `reset --hard`, piping a download into a shell, and similar) and writes to secret and key files. It is pattern matching: it stops honest slips, not a determined or cleverly phrased command. It fails open, so a broken hook never blocks your session. |
| Daily background pull | `~/.claude` fast-forwards from its `origin` at most once a day. Whatever that origin publishes, including hook scripts, then runs on your machine. Clone directly and the origin is this repo; use the template and the origin is yours. `PULL_INTERVAL_HOURS=0` turns the pull off. |
| Community marketplaces are unreviewed third-party content | If you run `scripts/init-marketplaces.sh`, about 80 repositories owned by other people are cloned and then pulled daily at their latest commit. Nothing pins or reviews them. The `toolkit-router` skill can read a marketplace `SKILL.md` and follow it, with the same permissions as everything else. A marketplace author, or anyone who takes over one of those repositories, can therefore put instructions in front of Claude. |
| Plugins in `settings.json` | The plugins `settings.json` enables are installed and updated in the background. They are the maintainer's choices; review `enabledPlugins` and make it yours. `PLUGIN_AUTOINSTALL=0` turns this off. |

This is the intended behavior of a full-access setup, not a list of bugs. If it is more trust than you want:

- Don't initialize the marketplaces, or delete the clones you don't want. The toolkit works without them.
- Set `PULL_INTERVAL_HOURS=0`, `PLUGIN_AUTOINSTALL=0`, and `LSP_AUTOINSTALL=0` in `~/.claude/.env.local` and update by hand after reading the diff.
- Change `permissions.defaultMode` in `settings.json` to a mode that asks.
- Install only the skills as a plugin (see the README), which adds no hooks, settings, or background jobs.
- Run Claude Code in a container or a dedicated user account for work on anything you can't afford to lose.

## What counts as a vulnerability here

- A way for repository content to leak something private from a user's machine into a commit or push that the safety gates should have stopped.
- A guard rule that fails to block the exact thing its documentation says it blocks.
- A script that changes git remotes, push URLs, or files outside `~/.claude` without the documented opt-in.
- Anything in this repository that sends data off the machine.

The trade-offs in the table above are not vulnerabilities, but reports of ways to make them safer without adding prompts are welcome.
