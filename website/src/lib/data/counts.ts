import { getSkills } from "./skills";
import { getAgents } from "./agents";
import { getMarketplaceStats } from "./marketplace";
import { getCommands } from "./commands";
import { getHooks } from "./hooks";

export function getCounts() {
  const skills = getSkills();
  const agents = getAgents();
  const { repos, totalSkills } = getMarketplaceStats();
  const commandCount = getCommands().length;
  const hookCount = getHooks().length;
  const marketplaceRounded = Math.floor(totalSkills / 100) * 100;
  const mktDisplay = marketplaceRounded.toLocaleString();

  return {
    skills: skills.length,
    agents: agents.length,
    marketplaceSkills: marketplaceRounded,
    repos: repos.length,
    tagline: `${skills.length} Skills, ${agents.length} Agents & ${mktDisplay}+ Marketplace Skills for Claude Code`,
    description: `A comprehensive Claude Code configuration with ${skills.length} local skills, ${agents.length} specialized agents, and ${mktDisplay}+ marketplace skills across ${repos.length} repos. Supercharge your AI-assisted development.`,
    footerText: `Supercharge your Claude Code with ${skills.length} skills, ${agents.length} agents, and ${mktDisplay}+ marketplace skills across ${repos.length} repos.`,
    consoleText: `${skills.length} Skills  \u2022  ${agents.length} Agents  \u2022  ${mktDisplay}+ Marketplace Skills  \u2022  ${repos.length} Repos`,
    seo: {
      home: {
        title: "tjn.claude/ \u2014 The Ultimate Claude Code Toolkit",
        description: `Drop-in ~/.claude config with ${skills.length} skills, ${agents.length} agents, ${repos.length} marketplace repos (${mktDisplay}+ community skills), ${commandCount} commands, and ${hookCount} hooks. A small core stays in context; a generated index and the toolkit-router skill find everything else on demand.`,
      },
      skills: {
        title: `${skills.length} Claude Code Skills \u2014 Domain Expertise for AI Development`,
        description: `Browse ${skills.length} expert skills spanning security, DevOps, databases, React, Python, Go, payments, auth, and more. Core skills keep their full description in context; the rest are listed by name and found through the toolkit-router skill.`,
      },
      agents: {
        title: `${agents.length} Specialist Agents for Claude Code \u2014 Code Review, Security, DevOps`,
        description: `Browse ${agents.length} specialized agents for code review, debugging, security auditing, architecture analysis, and framework-specific expertise. Spawn parallel workers for complex tasks.`,
      },
      commands: {
        title: `${commandCount} Slash Commands for Claude Code \u2014 Workflow Automation`,
        description: `Browse ${commandCount} slash commands for reviewing, deploying, testing, pulling repos, and managing Claude Code workflows. One-keystroke access to common operations.`,
      },
      hooks: {
        title: `${hookCount} Lifecycle Hooks for Claude Code \u2014 Safety & Automation`,
        description: `Browse ${hookCount} lifecycle hooks that block footguns before Bash and file writes, flag secrets after writes, keep repos pulled and healthy across sessions, and draw the status line.`,
      },
      rules: {
        title: "Claude Code Rules \u2014 Quality Guardrails & Best Practices",
        description: "Browse path-scoped language rules that load only for matching files, plus reference checklists, stack guides, workflow patterns, and tooling guides.",
      },
      scripts: {
        title: "Claude Code Scripts \u2014 Setup, Maintenance & Automation",
        description: "Browse automation scripts for first-time and in-place setup, index and count generation, marketplace and repo management, git hooks, and cross-platform utilities.",
      },
      marketplaces: {
        title: `${repos.length} Marketplace Repos (${mktDisplay}+ Skills) for Claude Code`,
        description: `Browse ${repos.length} open-source marketplace repositories contributing ${mktDisplay}+ community skills. Listed in a manifest, cloned locally with push disabled, and refreshed at most daily.`,
      },
      docs: {
        title: "Documentation \u2014 Setup, Architecture & Guides",
        description: `Comprehensive documentation for the Claude Code toolkit: setup guide, architecture overview, marketplace integration, agent teams, MCP servers, and more.`,
      },
    },
  };
}
