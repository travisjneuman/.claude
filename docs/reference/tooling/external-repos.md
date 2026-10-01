# External Repository Management

**When to use:** Updating marketplace plugins or other external dependencies.

---

## Overview

External repositories are managed as git submodules or nested repos with **read-only** configuration:

- **Fetch:** Pulls updates from upstream
- **Push:** Blocked via `no_push` URL

This prevents accidental modifications to upstream projects while keeping them updated.

---

## External Repos

All external repos are located in `~/.claude/plugins/marketplaces/`:

| Repo                              | URL                                                                        |
| --------------------------------- | -------------------------------------------------------------------------- |
| aaronontheweb-dotnet-skills       | https://github.com/Aaronontheweb/dotnet-skills.git                         |
| actionbook-rust-skills            | https://github.com/actionbook/rust-skills.git                              |
| affaan-everything-claude          | https://github.com/affaan-m/everything-claude-code.git                     |
| agentskills-agentskills           | https://github.com/agentskills/agentskills.git                             |
| ahmedasmar-devops-skills          | https://github.com/ahmedasmar/devops-claude-skills.git                     |
| akin-ozer-devops                  | https://github.com/akin-ozer/cc-devops-skills.git                          |
| alirezarezvani-claude-skills      | https://github.com/alirezarezvani/claude-skills.git                        |
| anthropic-agent-skills            | https://github.com/anthropics/skills.git                                   |
| anthropic-life-sciences           | https://github.com/anthropics/life-sciences.git                            |
| athola-night-market               | https://github.com/athola/claude-night-market.git                          |
| automazeio-ccpm                   | https://github.com/automazeio/ccpm.git                                     |
| awesome-claude-skills             | https://github.com/ComposioHQ/awesome-claude-skills.git                    |
| bradleygolden-elixir              | https://github.com/bradleygolden/claude-marketplace-elixir.git             |
| brennercruvinel-CCPlugins         | https://github.com/brennercruvinel/CCPlugins.git                           |
| buildwithclaude                   | https://github.com/davepoon/buildwithclaude.git                            |
| ccplugins-awesome                 | https://github.com/ccplugins/awesome-claude-code-plugins.git               |
| claude-code-plugins               | https://github.com/anthropics/claude-code.git                              |
| claude-code-plugins-plus-skills   | https://github.com/jeremylongshore/claude-code-plugins-plus-skills.git     |
| claude-mem                        | https://github.com/thedotmack/claude-mem.git                               |
| claude-plugins-official           | https://github.com/anthropics/claude-plugins-official.git                  |
| claude-scientific-skills          | https://github.com/K-Dense-AI/claude-scientific-skills.git                 |
| danielscholl-sdlc                 | https://github.com/danielscholl/claude-sdlc.git                            |
| davila7-templates                 | https://github.com/davila7/claude-code-templates.git                       |
| daymade-skills                    | https://github.com/daymade/claude-code-skills.git                          |
| devgom-marketplace                | https://github.com/Dev-GOM/claude-code-marketplace.git                     |
| diet103-infrastructure            | https://github.com/diet103/claude-code-infrastructure-showcase.git         |
| disler-hooks-mastery              | https://github.com/disler/claude-code-hooks-mastery.git                    |
| EveryInc-compound                 | https://github.com/EveryInc/compound-engineering-plugin.git                |
| expo-skills                       | https://github.com/expo/skills.git                                         |
| francyjg-agent-skill-creator      | https://github.com/FrancyJGLisboa/agent-skill-creator.git                  |
| georgeguimaraes-elixir            | https://github.com/georgeguimaraes/claude-code-elixir.git                  |
| giuseppe-developer-kit            | https://github.com/giuseppe-trisciuoglio/developer-kit.git                 |
| gmickel-marketplace               | https://github.com/gmickel/gmickel-claude-marketplace.git                  |
| hardikpandya-stop-slop            | https://github.com/hardikpandya/stop-slop.git                              |
| hashicorp-agent-skills            | https://github.com/hashicorp/agent-skills.git                              |
| henkisdabro-marketplace           | https://github.com/henkisdabro/claudecode-marketplace.git                  |
| hesreallyhim-awesome              | https://github.com/hesreallyhim/awesome-claude-code.git                    |
| jeffallan-claude-skills           | https://github.com/Jeffallan/claude-skills.git                             |
| kenryu42-safety-net               | https://github.com/kenryu42/claude-code-safety-net.git                     |
| kivilaid-marketplace              | https://github.com/kivilaid/plugin-marketplace.git                         |
| levnikolaevich-claude-code-skills | https://github.com/levnikolaevich/claude-code-skills.git                   |
| madappgang-claude-code            | https://github.com/MadAppGang/claude-code.git                              |
| manutej-luxor-marketplace         | https://github.com/manutej/luxor-claude-marketplace.git                    |
| mhattingpete-skills               | https://github.com/mhattingpete/claude-skills-marketplace.git              |
| mrgoonie-claudekit-skills         | https://github.com/mrgoonie/claudekit-skills.git                           |
| muratcankoylan-agent-skills       | https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering.git |
| mvanhorn-last30days-skill         | https://github.com/mvanhorn/last30days-skill.git                           |
| neolab-context-kit                | https://github.com/NeoLabHQ/context-engineering-kit.git                    |
| numman-ali-skills                 | https://github.com/numman-ali/n-skills.git                                 |
| obra-superpowers                  | https://github.com/obra/superpowers.git                                    |
| onmax-nuxt-skills                 | https://github.com/onmax/nuxt-skills.git                                   |
| othmanadi-planning                | https://github.com/OthmanAdi/planning-with-files.git                       |
| p47phoenix-plugins                | https://github.com/P47Phoenix/Claude-Plugins.git                           |
| piebald-lsps                      | https://github.com/Piebald-AI/claude-code-lsps.git                         |
| quant-equity-research             | https://github.com/quant-sentiment-ai/claude-equity-research.git           |
| quemsah-awesome                   | https://github.com/quemsah/awesome-claude-plugins.git                      |
| rohitg00-claude-code-toolkit      | https://github.com/rohitg00/awesome-claude-code-toolkit.git                |
| sangrokjung-claude-forge          | https://github.com/sangrokjung/claude-forge.git                            |
| sawyerhood-mart                   | https://github.com/SawyerHood/sawyer-mart.git                              |
| sickn33-antigravity-awesome-skills | https://github.com/sickn33/antigravity-awesome-skills.git                 |
| secondsky-sap-skills              | https://github.com/secondsky/sap-skills.git                                |
| shanraisshan-best-practice        | https://github.com/shanraisshan/claude-code-best-practice.git              |
| sivalabs-marketplace              | https://github.com/sivaprasadreddy/sivalabs-marketplace.git                |
| skill-seekers                     | https://github.com/yusufkaraaslan/Skill_Seekers.git                        |
| skillcreatorai-agent-skills       | https://github.com/skillcreatorai/Ai-Agent-Skills.git                      |
| skillsforge                       | https://github.com/rawveg/skillsforge-marketplace.git                      |
| superpowers-marketplace           | https://github.com/obra/superpowers-marketplace.git                        |
| taches-cc-resources               | https://github.com/glittercowboy/taches-cc-resources.git                   |
| team-attention-plugins            | https://github.com/team-attention/plugins-for-claude-natives.git           |
| trailofbits-skills                | https://github.com/trailofbits/skills.git                                  |
| trailofbits-skills-curated        | https://github.com/trailofbits/skills-curated.git                          |
| vercel-agent-skills               | https://github.com/vercel-labs/agent-skills.git                            |
| voltagent-agent-skills            | https://github.com/VoltAgent/awesome-agent-skills.git                      |
| voltagent-subagents               | https://github.com/VoltAgent/awesome-claude-code-subagents.git             |
| wshobson-agents                   | https://github.com/wshobson/agents.git                                     |
| ykdojo-tips                       | https://github.com/ykdojo/claude-code-tips.git                             |

---

## Updating All External Repos

### Recommended: \_pull-all-repos.sh

```bash
# Pull parent + all submodules + custom directories
~/.claude/_pull-all-repos.sh

# Check status without pulling
~/.claude/_pull-all-repos.sh --status

# Or use slash command in Claude Code
/pull-repos
```

**What gets pulled:**

1. `~/.claude` - Parent repo (travisjneuman/.claude)
2. `~/.claude/plugins/marketplaces/*` - All 81 marketplace repos
3. Custom project directories (if configured) - your own repos
4. Documentation counts updated automatically if any repos changed

**Important:** The script uses a **location-based approach** to determine push access:

| Location                 | no_push? | Why                                 |
| ------------------------ | -------- | ----------------------------------- |
| `~/.claude` (parent)     | ❌ No    | Root level = your repo              |
| `plugins/marketplaces/*` | ✅ Yes   | Marketplace folder = external repos |
| Custom directories       | ❌ No    | You added them = your repos         |

Custom project directories retain full push access because you configured them.

### Adding Your Own Project Directories

Create `~/.claude/.env.local` (gitignored, machine-specific):

```bash
cp ~/.claude/.env.example ~/.claude/.env.local
```

Then set your directories (comma-separated):

```bash
CUSTOM_PROJECT_DIRS="/e/Projects"
# Or multiple: CUSTOM_PROJECT_DIRS="/e/Projects,/c/Users/you/projects"
```

Windows paths in Git Bash: `E:\Projects` → `/e/Projects`

### Alternative: _pull-all-repos.sh

```bash
bash ~/.claude/_pull-all-repos.sh
```

### Manual Update

```bash
cd ~/.claude

# Update all submodules
git submodule update --remote --merge

# Or update each individually
for repo in plugins/marketplaces/*/; do
    (cd "$repo" && git fetch origin && git pull origin main 2>/dev/null || git pull origin master)
done

# Commit the updates
git add plugins/marketplaces
git commit -m "chore: update external repos"
```

---

## Verifying No-Push Configuration

Each external repo should have `no_push` as the push URL:

```bash
# Check a repo's remotes
cd ~/.claude/plugins/marketplaces/obra-superpowers
git remote -v

# Expected output:
# origin  https://github.com/obra/superpowers.git (fetch)
# origin  no_push (push)
```

### Setting No-Push (if missing)

```bash
cd ~/.claude/path/to/repo
git remote set-url --push origin no_push
```

---

## Adding New External Repos

### As a Submodule (Preferred)

```bash
cd ~/.claude

# Add submodule
git submodule add https://github.com/owner/repo.git path/to/repo

# Set no-push
cd path/to/repo
git remote set-url --push origin no_push
```

### As a Nested Repo

```bash
cd ~/.claude

# Clone into location
git clone https://github.com/owner/repo.git path/to/repo

# Set no-push
cd path/to/repo
git remote set-url --push origin no_push

# Add to parent's .gitignore OR track as gitlink
```

---

## Troubleshooting

### Push Rejected

If you see an error trying to push:

```
fatal: 'no_push' does not appear to be a git repository
```

This is **expected behavior**. The repo is configured as read-only.

### Submodule Not Updating

```bash
# Re-initialize submodules
git submodule init
git submodule update --remote
```

### Detached HEAD in Submodule

```bash
cd ~/.claude/plugins/marketplaces/<repo-name>
git checkout main  # or master
git pull origin main
```

---

## Related Documentation

- `~/.claude/docs/MARKETPLACE-GUIDE.md` - Marketplace catalog
- `~/.claude/plugins/README.md` - Plugin marketplace info

---

_External repos: always fetch, never push._
