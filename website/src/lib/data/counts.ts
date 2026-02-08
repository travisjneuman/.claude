import { getSkills } from "./skills";
import { getAgents } from "./agents";
import { getMarketplaceStats } from "./marketplace";

export function getCounts() {
  const skills = getSkills();
  const agents = getAgents();
  const { repos, totalSkills } = getMarketplaceStats();
  const marketplaceRounded = Math.floor(totalSkills / 100) * 100;

  return {
    skills: skills.length,
    agents: agents.length,
    marketplaceSkills: marketplaceRounded,
    repos: repos.length,
    tagline: `${skills.length} Skills, ${agents.length} Agents & ${marketplaceRounded.toLocaleString()}+ Marketplace Skills for Claude Code`,
    description: `A comprehensive Claude Code configuration with ${skills.length} local skills, ${agents.length} specialized agents, and ${marketplaceRounded.toLocaleString()}+ marketplace skills across ${repos.length} repos. Supercharge your AI-assisted development.`,
    footerText: `Supercharge your Claude Code with ${skills.length} skills, ${agents.length} agents, and ${marketplaceRounded.toLocaleString()}+ marketplace skills across ${repos.length} repos.`,
    consoleText: `${skills.length} Skills  \u2022  ${agents.length} Agents  \u2022  ${marketplaceRounded.toLocaleString()}+ Marketplace Skills  \u2022  ${repos.length} Repos`,
  };
}
