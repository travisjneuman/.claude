import { getPublicCounts } from "./snapshot";

export function getCounts() {
  const counts = getPublicCounts();
  const { skills, agents, repos, marketplaceSkillsDisplay: mktDisplay } = counts;
  const commandCount = counts.commands;
  const hookCount = counts.hooks;

  return {
    skills,
    agents,
    marketplaceSkills: counts.marketplaceSkills,
    marketplaceSkillsDisplayValue: counts.marketplaceSkillsDisplayValue,
    marketplaceSkillsDisplay: mktDisplay,
    repos,
    asOf: counts.asOf,
    tagline: `${skills} Skills, ${agents} Agents & ${mktDisplay} Marketplace Skills for Claude Code`,
    description: `A comprehensive Claude Code configuration with ${skills} local skills, ${agents} specialized agents, and ${mktDisplay} marketplace skills across ${repos} repos. Supercharge your AI-assisted development.`,
    footerText: `Supercharge your Claude Code with ${skills} skills, ${agents} agents, and ${mktDisplay} marketplace skills across ${repos} repos.`,
    consoleText: `${skills} Skills  \u2022  ${agents} Agents  \u2022  ${mktDisplay} Marketplace Skills  \u2022  ${repos} Repos`,
    seo: {
      home: {
        title: "tjn.claude/ \u2014 The Ultimate Claude Code Toolkit",
        description: `Drop-in ~/.claude config with ${skills} skills, ${agents} agents, ${repos} marketplace repos (${mktDisplay} community skills), ${commandCount} commands, and ${hookCount} hooks. A small core stays in context; a generated index and the toolkit-router skill find everything else on demand.`,
      },
      skills: {
        title: `${skills} Claude Code Skills \u2014 Domain Expertise for AI Development`,
        description: `Browse ${skills} expert skills spanning security, DevOps, databases, React, Python, Go, payments, auth, and more. Core skills keep their full description in context; the rest are listed by name and found through the toolkit-router skill.`,
      },
      agents: {
        title: `${agents} Specialist Agents for Claude Code \u2014 Code Review, Security, DevOps`,
        description: `Browse ${agents} specialized agents for code review, debugging, security auditing, architecture analysis, and framework-specific expertise. Spawn parallel workers for complex tasks.`,
      },
      commands: {
        title: `${commandCount} Slash Commands for Claude Code \u2014 Workflow Automation`,
        description: `Browse ${commandCount} slash commands for reviewing, deploying, testing, pulling repos, and managing Claude Code workflows. One-keystroke access to common operations.`,
      },
      hooks: {
        title: `${hookCount} Lifecycle Hooks for Claude Code \u2014 Safety & Automation`,
        description: `Browse ${hookCount} wired public hooks that block footguns before Bash and file writes, flag secrets after writes, keep repos pulled and healthy across sessions, and draw the status line.`,
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
        title: `${repos} Marketplace Repos (${mktDisplay} Skills) for Claude Code`,
        description: `Browse ${repos} manifest repositories contributing ${mktDisplay} unique community skill bodies. Counts are committed source snapshots measured ${counts.asOf}, not a latest-upstream guarantee.`,
      },
      docs: {
        title: "Documentation \u2014 Setup, Architecture & Guides",
        description: "Comprehensive documentation for the Claude Code toolkit: setup guide, architecture overview, marketplace integration, agent teams, MCP servers, and more.",
      },
    },
  };
}
