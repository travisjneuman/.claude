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

  if (!fs.existsSync(marketDir) || fs.readdirSync(marketDir).length === 0) {
    // Fallback for deployment (Cloudflare Pages) where submodules aren't available
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

  const entries = fs.readdirSync(marketDir, { withFileTypes: true });
  const repos: MarketplaceRepo[] = [];
  let totalSkills = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const repoPath = path.join(marketDir, entry.name);

    // Count SKILL.md files recursively
    let count = 0;
    try {
      count = countSkillFiles(repoPath);
    } catch {
      count = 0;
    }

    const displayName = entry.name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    repos.push({
      name: entry.name,
      displayName,
      skillCount: count,
      githubUrl:
        GITHUB_URLS[entry.name] ||
        `https://github.com/search?q=${encodeURIComponent(entry.name)}`,
    });

    totalSkills += count;
  }

  return {
    repos: repos.sort((a, b) => b.skillCount - a.skillCount),
    totalSkills,
  };
}

function countSkillFiles(dir: string): number {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      !entry.name.startsWith(".") &&
      entry.name !== "node_modules"
    ) {
      count += countSkillFiles(path.join(dir, entry.name));
    } else if (entry.name === "SKILL.md") {
      count++;
    }
  }

  return count;
}
