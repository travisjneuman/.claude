import fs from 'fs';
import path from 'path';

export interface MarketplaceRepo {
  name: string;
  displayName: string;
  skillCount: number;
}

export function getMarketplaceStats(): { repos: MarketplaceRepo[]; totalSkills: number } {
  const marketDir = path.resolve(process.cwd(), '..', 'plugins', 'marketplaces');

  if (!fs.existsSync(marketDir)) {
    return { repos: [], totalSkills: 0 };
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
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    repos.push({
      name: entry.name,
      displayName,
      skillCount: count,
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
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      count += countSkillFiles(path.join(dir, entry.name));
    } else if (entry.name === 'SKILL.md') {
      count++;
    }
  }

  return count;
}
