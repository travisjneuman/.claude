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
    description:
      "One-line installer (curl-pipe) for a fresh machine with no ~/.claude yet.",
    whenToRun: "First-time setup on a clean machine",
  },
  "install-in-place": {
    name: "Install In Place",
    category: "setup",
    description:
      "Turns an existing ~/.claude (created by Claude Code itself) into a checkout of the toolkit without deleting anything. Tracked files it would overwrite are backed up first, extra settings.json keys are merged back, and it only fast-forwards.",
    whenToRun: "Installing on a machine where Claude Code has already run",
  },
  "setup-new-machine": {
    name: "Setup New Machine",
    category: "setup",
    description:
      "Full setup pass: no_push protection on marketplace clones, marketplace registration, plugin installs, and verification.",
    whenToRun: "After cloning the repo",
  },
  "init-marketplaces": {
    name: "Init Marketplaces",
    category: "setup",
    description:
      "Clone every marketplace listed in the .gitmodules manifest fresh from its upstream, with push disabled (no_push).",
    whenToRun: "To re-clone marketplaces or fix wrong remotes",
  },
  "setup-hooks": {
    name: "Setup Hooks",
    category: "setup",
    description:
      "Install the repo's git hooks as thin wrappers that exec the tracked scripts in scripts/hooks/, so hook updates arrive with a normal pull.",
    whenToRun: "After cloning",
  },

  // Maintenance
  "generate-index": {
    name: "Generate Index",
    category: "maintenance",
    description:
      "Build the discovery layer from what is on disk: INDEX.md, index/graph.json, skills/MASTER_INDEX.md, and the name-only skillOverrides in settings.json (core tiers come from index/tiers.json).",
    whenToRun: "Explicitly after public discovery/tiering changes, before refreshing counts",
  },
  "generate-counts": {
    name: "Generate Counts",
    category: "maintenance",
    description:
      "Canonical public-source snapshot producer: committed marketplace HEAD blobs, complete manifest coverage, revisions/digests/date, public identity lists, numeric docs and explicit consumer destinations. --check is read-only; conflicting modes are rejected.",
    whenToRun: "Explicitly after reviewed source changes, when publication is authorized",
  },
  "generate-showcase-images": {
    name: "Generate Showcase Images",
    category: "maintenance",
    description:
      "Render count-bearing showcase screenshots from counts.json only through an explicit reviewed DESK renderer/work-folder contract. No implicit portfolio delivery.",
    whenToRun: "Separately approved media operation after reviewing changed counts",
  },
  "update-counts": {
    name: "Update Counts",
    category: "maintenance",
    description: "Wrapper around the canonical count generator (generate-counts.mjs).",
    whenToRun: "After adding/removing skills, agents, or marketplace repos",
  },
  "regenerate-index": {
    name: "Regenerate Index",
    category: "maintenance",
    description: "Regenerate skills/MASTER_INDEX.md from skill files.",
    whenToRun: "After adding/removing skills",
  },

  // Repo Management
  "add-marketplace": {
    name: "Add Marketplace",
    category: "repo-management",
    description:
      "Add a marketplace: writes a manifest-only .gitmodules entry (no gitlink, no content), clones it locally into the gitignored plugins/marketplaces/ with no_push, and regenerates the index.",
    whenToRun: "When adding a new marketplace repo",
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
      "Fast-forward pulls the toolkit, every marketplace clone in the .gitmodules manifest (cloning missing ones), and optionally your project repos, enforcing no_push. Skips dirty or detached repos and never commits or pushes.",
    whenToRun: "Runs daily in the background at session start; /pull-repos forces it",
  },

  // Git Hooks
  "pre-commit": {
    name: "Pre-Commit Hook",
    category: "git-hooks",
    description:
      "Block staged marketplace clones/gitlinks, private-pattern leaks, credentials and ignored runtime files. No automatic generation, staging, budget checks or tests.",
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
      "Block unapproved non-fast-forward pushes to main/master and gitlinks or marketplace content in HEAD.",
    whenToRun: "Automatically before every push",
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

    const lang = filename.endsWith(".ps1")
      ? "powershell"
      : filename.endsWith(".mjs")
        ? "javascript"
        : "bash";
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

  // scripts/*.sh, *.ps1, *.mjs
  if (fs.existsSync(scriptsDir)) {
    const files = fs
      .readdirSync(scriptsDir)
      .filter(
        (f) => f.endsWith(".sh") || f.endsWith(".ps1") || f.endsWith(".mjs"),
      )
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
