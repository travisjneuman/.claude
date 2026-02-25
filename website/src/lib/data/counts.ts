import { getSkills } from "./skills";
import { getAgents } from "./agents";
import { getMarketplaceStats } from "./marketplace";

export function getCounts() {
  const skills = getSkills();
  const agents = getAgents();
  const { repos, totalSkills } = getMarketplaceStats();
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
        description: `Drop-in ~/.claude config with ${skills.length} skills, ${agents.length} agents, ${repos.length} marketplace repos (${mktDisplay}+ community skills), 30 commands, and 10 hooks. Auto-activates the right resources from your prompt.`,
      },
      skills: {
        title: `${skills.length} Claude Code Skills \u2014 Domain Expertise for AI Development`,
        description: `Browse ${skills.length} expert skills spanning security, DevOps, databases, React, Python, Go, payments, auth, and more. Each skill auto-activates based on your prompt.`,
      },
      agents: {
        title: `${agents.length} Specialist Agents for Claude Code \u2014 Code Review, Security, DevOps`,
        description: `Browse ${agents.length} specialized agents for code review, debugging, security auditing, architecture analysis, and framework-specific expertise. Spawn parallel workers for complex tasks.`,
      },
      commands: {
        title: "30 Slash Commands for Claude Code \u2014 Workflow Automation",
        description: "Browse 30 slash commands for committing, reviewing, deploying, testing, and managing Claude Code workflows. One-keystroke access to common operations.",
      },
      hooks: {
        title: "10 Lifecycle Hooks for Claude Code \u2014 Safety & Automation",
        description: "Browse 10 lifecycle hooks that guard against dangerous commands, scan for secrets, inject context, and automate session management.",
      },
      rules: {
        title: "Claude Code Rules \u2014 Quality Guardrails & Best Practices",
        description: "Browse modular rules including checklists, stack guides, workflow patterns, and tooling references that enforce quality across every session.",
      },
      scripts: {
        title: "Claude Code Scripts \u2014 Setup, Maintenance & Automation",
        description: "Browse automation scripts for first-time setup, count synchronization, repo management, and cross-platform utilities.",
      },
      marketplaces: {
        title: `${repos.length} Marketplace Repos (${mktDisplay}+ Skills) for Claude Code`,
        description: `Browse ${repos.length} open-source marketplace repositories contributing ${mktDisplay}+ community skills. Auto-updated on every session start.`,
      },
      docs: {
        title: "Documentation \u2014 Setup, Architecture & Guides",
        description: `Comprehensive documentation for the Claude Code toolkit: setup guide, architecture overview, marketplace integration, agent teams, MCP servers, and more.`,
      },
    },
  };
}
