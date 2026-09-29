import fs from "fs";
import path from "path";
import fallbackCounts from "./marketplace-counts.json";

export interface MarketplaceRepo {
  name: string;
  displayName: string;
  skillCount: number;
  githubUrl: string;
}

const GITHUB_URLS: Record<string, string> = {
  "alirezarezvani-claude-skills":
    "https://github.com/alirezarezvani/claude-skills",
  "alvinunreal-awesome-claude": "https://github.com/alvinunreal/awesome-claude",
  "anthropic-agent-skills": "https://github.com/anthropics/skills",
  "awesome-claude-skills":
    "https://github.com/ComposioHQ/awesome-claude-skills",
  "behisecc-awesome-claude-skills":
    "https://github.com/BehiSecc/awesome-claude-skills",
  "claude-code-plugins": "https://github.com/anthropics/claude-code",
  "claude-code-plugins-plus-skills":
    "https://github.com/jeremylongshore/claude-code-plugins-plus-skills",
  "claude-mem": "https://github.com/thedotmack/claude-mem",
  "claude-plugins-official":
    "https://github.com/anthropics/claude-plugins-official",
  "claude-scientific-skills":
    "https://github.com/K-Dense-AI/claude-scientific-skills",
  "gsd-core": "https://github.com/open-gsd/gsd-core",
  "hesreallyhim-awesome": "https://github.com/hesreallyhim/awesome-claude-code",
  "mhattingpete-skills":
    "https://github.com/mhattingpete/claude-skills-marketplace",
  "obra-superpowers": "https://github.com/obra/superpowers",
  "skill-seekers": "https://github.com/yusufkaraaslan/Skill_Seekers",
  skillsforge: "https://github.com/rawveg/skillsforge-marketplace",
  "taches-cc-resources": "https://github.com/glittercowboy/taches-cc-resources",
  "travisvn-awesome": "https://github.com/travisvn/awesome-claude-skills",
  "voltagent-agent-skills": "https://github.com/VoltAgent/awesome-agent-skills",
  "voltagent-subagents":
    "https://github.com/VoltAgent/awesome-claude-code-subagents",
  "wshobson-agents": "https://github.com/wshobson/agents",
};

// Marketplaces are manifest-only: .gitmodules (tracked) lists each path + url,
// while the clones themselves are gitignored and exist only on machines that
// pulled them. Reading the manifest gives every repo its real upstream link,
// including on Cloudflare builds where no clone exists. GITHUB_URLS above is
// the fallback when the manifest is unavailable.
function readManifestUrls(): Record<string, string> {
  const manifest = path.resolve(process.cwd(), "..", ".gitmodules");
  const urls: Record<string, string> = {};
  if (!fs.existsSync(manifest)) return urls;

  let currentName = "";
  for (const line of fs.readFileSync(manifest, "utf-8").split(/\r?\n/)) {
    const trimmed = line.trim();
    const pathMatch = trimmed.match(/^path\s*=\s*plugins\/marketplaces\/(.+)$/);
    if (pathMatch) {
      currentName = pathMatch[1].trim();
      continue;
    }
    if (trimmed.startsWith("[")) {
      currentName = "";
      continue;
    }
    const urlMatch = trimmed.match(/^url\s*=\s*(\S+)$/);
    if (urlMatch && currentName && /^https:\/\/github\.com\//.test(urlMatch[1])) {
      urls[currentName] = urlMatch[1].replace(/\.git$/, "");
    }
  }
  return urls;
}

export function getMarketplaceStats(): {
  repos: MarketplaceRepo[];
  totalSkills: number;
} {
  const marketDir = path.resolve(
    process.cwd(),
    "..",
    "plugins",
    "marketplaces",
  );

  const dirEntries = fs.existsSync(marketDir)
    ? fs.readdirSync(marketDir).filter((e) =>
        fs.statSync(path.join(marketDir, e)).isDirectory(),
      )
    : [];

  const manifestUrls = readManifestUrls();
  const githubUrlFor = (name: string) =>
    manifestUrls[name] ||
    GITHUB_URLS[name] ||
    `https://github.com/search?q=${encodeURIComponent(name)}`;

  // Use fallback if directory missing, empty, or has <50% of expected repos
  // (Cloudflare builds never have clones: marketplace clones are gitignored)
  if (dirEntries.length < fallbackCounts.repoCount * 0.5) {
    const fallbackRepos: MarketplaceRepo[] = fallbackCounts.repos.map(
      (r: { name: string; displayName: string; skillCount: number }) => ({
        ...r,
        githubUrl: githubUrlFor(r.name),
      }),
    );
    return { repos: fallbackRepos, totalSkills: fallbackCounts.totalSkills };
  }

  const repos: MarketplaceRepo[] = [];
  let totalSkills = 0;

  for (const entryName of dirEntries) {
    const repoPath = path.join(marketDir, entryName);

    // Count SKILL.md files recursively
    let count = 0;
    try {
      count = countSkillFiles(repoPath);
    } catch {
      count = 0;
    }

    const displayName = entryName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    repos.push({
      name: entryName,
      displayName,
      skillCount: count,
      githubUrl: githubUrlFor(entryName),
    });

    totalSkills += count;
  }

  return {
    repos: repos.sort((a, b) => b.skillCount - a.skillCount),
    totalSkills,
  };
}

// Directories to exclude when counting SKILL.md files.
// Must match excludeSkillDirs in scripts/generate-counts.mjs.
const EXCLUDE_SKILL_DIRS = new Set([
  "backups",
  "backup",
  "tests",
  "test",
  "examples",
  "example",
  "docs",
  "workspace",
  "lab",
  "archive",
  "archived",
  "deprecated",
  "draft",
  "drafts",
  "planned-skills",
  "planned",
  "templates",
  "template",
  "node_modules",
  "web-app",
  "public",
]);

function countSkillFiles(dir: string): number {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      !entry.name.startsWith(".") &&
      !EXCLUDE_SKILL_DIRS.has(entry.name.toLowerCase())
    ) {
      count += countSkillFiles(path.join(dir, entry.name));
    } else if (entry.name === "SKILL.md") {
      count++;
    }
  }

  return count;
}
