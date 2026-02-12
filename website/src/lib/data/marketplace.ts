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
  "get-shit-done": "https://github.com/glittercowboy/get-shit-done",
  "hesreallyhim-awesome-claude-code":
    "https://github.com/hesreallyhim/awesome-claude-code",
  "mhattingpete-skills":
    "https://github.com/mhattingpete/claude-skills-marketplace",
  "obra-superpowers": "https://github.com/obra/superpowers-marketplace",
  "skill-seekers": "https://github.com/yusufkaraaslan/Skill_Seekers",
  skillsforge: "https://github.com/rawveg/skillsforge-marketplace",
  "taches-cc-resources": "https://github.com/glittercowboy/taches-cc-resources",
  "travisvn-awesome-claude-skills":
    "https://github.com/travisvn/awesome-claude-skills",
  "voltagent-awesome-claude-skills":
    "https://github.com/VoltAgent/awesome-claude-skills",
  "voltagent-subagents":
    "https://github.com/VoltAgent/awesome-claude-code-subagents",
  "wshobson-agents": "https://github.com/wshobson/agents",
};

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

  // Use fallback if directory missing, empty, or has <50% of expected repos
  // (handles Cloudflare Pages where only some submodules are cloned)
  if (dirEntries.length < fallbackCounts.repoCount * 0.5) {
    const fallbackRepos: MarketplaceRepo[] = fallbackCounts.repos.map(
      (r: { name: string; displayName: string; skillCount: number }) => ({
        ...r,
        githubUrl:
          GITHUB_URLS[r.name] ||
          `https://github.com/search?q=${encodeURIComponent(r.name)}`,
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
      githubUrl:
        GITHUB_URLS[entryName] ||
        `https://github.com/search?q=${encodeURIComponent(entryName)}`,
    });

    totalSkills += count;
  }

  return {
    repos: repos.sort((a, b) => b.skillCount - a.skillCount),
    totalSkills,
  };
}

// Directories to exclude when counting SKILL.md files.
// Must match the EXCLUDE_SKILL_DIRS array in scripts/update-counts.sh.
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
