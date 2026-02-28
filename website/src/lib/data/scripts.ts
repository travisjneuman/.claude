import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface Script {
  slug: string;
  name: string;
  filename: string;
  category:
    | "setup"
    | "maintenance"
    | "repo-management"
    | "utilities"
    | "git-hooks";
  description: string;
  whenToRun: string;
  content: string;
  htmlContent: string;
}

const SCRIPT_METADATA: Record<
  string,
  {
    name: string;
    category: Script["category"];
    description: string;
    whenToRun: string;
  }
> = {
  // Setup
  install: {
    name: "Install",
    category: "setup",
    description: "One-line installer (curl-pipe) for first-time setup.",
    whenToRun: "First-time setup on any machine",
  },
  "setup-new-machine": {
    name: "Setup New Machine",
    category: "setup",
    description:
      "Complete setup including plugins, hooks, and verification.",
    whenToRun: "After cloning the repo",
  },
  "init-marketplaces": {
    name: "Init Marketplaces",
    category: "setup",
    description: "Clone all 101 marketplace repos from upstreams.",
    whenToRun: "After cloning, or to fix broken submodules",
  },
  "setup-hooks": {
    name: "Setup Hooks",
    category: "setup",
    description: "Install git hooks into .git/hooks/ directory.",
    whenToRun: "After cloning (called by setup-new-machine.sh)",
  },

  // Maintenance
  "update-counts": {
    name: "Update Counts",
    category: "maintenance",
    description: "Update all hardcoded counts across documentation.",
    whenToRun: "After adding/removing skills, agents, or marketplace repos",
  },
  "regenerate-index": {
    name: "Regenerate Index",
    category: "maintenance",
    description: "Regenerate skills/MASTER_INDEX.md from skill files.",
    whenToRun: "After adding/removing skills",
  },
  "update-plugins": {
    name: "Update Plugins",
    category: "maintenance",
    description: "Update plugin registrations in settings.",
    whenToRun: "After enabling/disabling plugins",
  },
  "fix-remotes": {
    name: "Fix Remotes",
    category: "maintenance",
    description: "Fix remote URLs on marketplace repos.",
    whenToRun: "If remotes are misconfigured after a pull",
  },

  // Repo Management
  "update-external-repos": {
    name: "Update External Repos",
    category: "repo-management",
    description: "Pull all marketplace repos from upstream.",
    whenToRun: "Use _pull-all-repos.sh instead (recommended)",
  },
  "update-marketplaces": {
    name: "Update Marketplaces",
    category: "repo-management",
    description: "Update marketplace submodule pointers.",
    whenToRun: "After upstream changes",
  },
  "force-sync-repos": {
    name: "Force Sync Repos",
    category: "repo-management",
    description: "Force-sync all repos (nuclear option).",
    whenToRun: "When repos are severely broken",
  },

  // Utilities
  "fix-plugin-line-endings": {
    name: "Fix Plugin Line Endings",
    category: "utilities",
    description: "Convert CRLF to LF in plugin files (Linux/Mac).",
    whenToRun: "After encountering line ending issues",
  },
  "fix-plugin-line-endings-ps1": {
    name: "Fix Plugin Line Endings (PowerShell)",
    category: "utilities",
    description: "Convert CRLF to LF in plugin files (Windows).",
    whenToRun: "After encountering line ending issues on Windows",
  },
  "fix-marketplace-paths": {
    name: "Fix Marketplace Paths",
    category: "utilities",
    description:
      "Fix OS-specific paths in known_marketplaces.json for cross-platform compatibility.",
    whenToRun: "After running claude plugins install on a new machine",
  },

  // Root-level script
  "_pull-all-repos": {
    name: "Pull All Repos",
    category: "repo-management",
    description:
      "Primary user-facing script: pulls parent repo, all 101 marketplace repos, enforces no_push, and updates counts.",
    whenToRun: "Regularly, to keep all repos up to date",
  },

  // Git Hooks
  "pre-commit": {
    name: "Pre-Commit Hook",
    category: "git-hooks",
    description:
      "Block secrets, validate SKILL.md files, check .gitignore.",
    whenToRun: "Automatically before every commit",
  },
  "commit-msg": {
    name: "Commit Message Hook",
    category: "git-hooks",
    description: "Enforce conventional commit message format.",
    whenToRun: "Automatically on every commit",
  },
  "pre-push": {
    name: "Pre-Push Hook",
    category: "git-hooks",
    description:
      "Block force-push to master/main, warn about submodule changes.",
    whenToRun: "Automatically before every push",
  },
  "session-start": {
    name: "Session Start Hook",
    category: "git-hooks",
    description:
      "SessionStart hook template (legacy — current hooks are in ~/.claude/hooks/).",
    whenToRun: "Legacy template, not actively used",
  },
};

function buildSlug(filePath: string, filename: string): string {
  if (filename.endsWith(".ps1")) {
    return filename.replace(".ps1", "") + "-ps1";
  }
  return filename.replace(/\.sh$/, "").replace(/\.mjs$/, "");
}

export function getScripts(): Script[] {
  const repoRoot = path.resolve(process.cwd(), "..");
  const scriptsDir = path.join(repoRoot, "scripts");
  const hooksDir = path.join(scriptsDir, "hooks");
  const scripts: Script[] = [];

  const addScript = (filePath: string, slug: string, filename: string) => {
    if (!fs.existsSync(filePath)) return;
    const raw = fs.readFileSync(filePath, "utf-8");
    const meta = SCRIPT_METADATA[slug];
    if (!meta) return;

    const lang = filename.endsWith(".ps1") ? "powershell" : "bash";
    const markdownContent = [
      `## ${meta.description}`,
      "",
      `\`\`\`${lang}`,
      raw.trim(),
      "```",
    ].join("\n");

    const htmlResult = remark().use(remarkHtml).processSync(markdownContent);

    scripts.push({
      slug,
      name: meta.name,
      filename,
      category: meta.category,
      description: meta.description,
      whenToRun: meta.whenToRun,
      content: raw.slice(0, 8000),
      htmlContent: String(htmlResult),
    });
  };

  // scripts/*.sh
  if (fs.existsSync(scriptsDir)) {
    const files = fs
      .readdirSync(scriptsDir)
      .filter((f) => f.endsWith(".sh") || f.endsWith(".ps1"))
      .sort();
    for (const file of files) {
      const slug = buildSlug(file, file);
      addScript(path.join(scriptsDir, file), slug, file);
    }
  }

  // scripts/hooks/*.sh
  if (fs.existsSync(hooksDir)) {
    const hookFiles = fs
      .readdirSync(hooksDir)
      .filter((f) => f.endsWith(".sh"))
      .sort();
    for (const file of hookFiles) {
      const slug = file.replace(".sh", "");
      addScript(path.join(hooksDir, file), slug, `hooks/${file}`);
    }
  }

  // Root-level _pull-all-repos.sh
  const pullScript = path.join(repoRoot, "_pull-all-repos.sh");
  addScript(pullScript, "_pull-all-repos", "_pull-all-repos.sh");

  // Sort by category order, then by name
  const categoryOrder: Record<string, number> = {
    setup: 0,
    maintenance: 1,
    "repo-management": 2,
    utilities: 3,
    "git-hooks": 4,
  };

  scripts.sort((a, b) => {
    const catDiff = (categoryOrder[a.category] ?? 9) - (categoryOrder[b.category] ?? 9);
    if (catDiff !== 0) return catDiff;
    return a.name.localeCompare(b.name);
  });

  return scripts;
}
