"use client";

import { useState } from "react";
import GlowCard from "@/components/ui/GlowCard";
import Modal from "@/components/ui/Modal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import TextReveal from "@/components/animations/TextReveal";
import CounterAnimation from "@/components/animations/CounterAnimation";

interface SkillItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  content: string;
}

interface AgentItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  model: string;
  tools: string[];
  content: string;
}

interface RepoItem {
  name: string;
  displayName: string;
  skillCount: number;
  githubUrl: string;
}

interface ScriptCategorySummary {
  category: string;
  label: string;
  count: number;
  color: string;
  description: string;
}

interface HomeCardsProps {
  skills: SkillItem[];
  agents: AgentItem[];
  repos: RepoItem[];
  marketplaceSkills: number;
  totalSkills: number;
  totalAgents: number;
  scriptCategories: ScriptCategorySummary[];
  totalScripts: number;
}

const modelColor = (model: string) =>
  model === "opus"
    ? "var(--accent-yellow)"
    : model === "sonnet"
      ? "var(--accent-purple)"
      : "var(--accent-blue)";

export default function HomeCards({
  skills,
  agents,
  repos,
  marketplaceSkills,
  totalSkills,
  totalAgents,
  scriptCategories,
  totalScripts,
}: HomeCardsProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AgentItem | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);

  const featuredSkills = skills.slice(0, 8);
  const featuredAgents = agents.slice(0, 6);

  return (
    <>
      {/* Skills Overview */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-purple)] tracking-widest uppercase mb-3">
              Skills Library
            </p>
            <TextReveal
              text={`${totalSkills} Expert Skills`}
              tag="h2"
              className="text-3xl font-bold text-[var(--text-primary)] mb-4"
            />
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Domain-specific knowledge loaded on demand. From debugging
              methodologies to full-stack design systems.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSkills.map((skill) => (
              <GlowCard
                key={skill.slug}
                title={skill.name}
                description={skill.description}
                category={skill.category}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </StaggerReveal>

          <ScrollReveal className="text-center mt-10" delay={0.4}>
            <a
              href="/skills"
              className="text-sm font-mono text-[var(--accent-purple)] hover:text-[var(--accent-pink)] transition-colors"
            >
              Explore All {totalSkills} Skills &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Agents Showcase */}
      <section className="py-16 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-blue)] tracking-widest uppercase mb-3">
              Specialized Agents
            </p>
            <TextReveal
              text={`${totalAgents} Expert Agents`}
              tag="h2"
              className="text-3xl font-bold text-[var(--text-primary)] mb-4"
            />
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Autonomous sub-agents that handle complex tasks. Each tuned for
              specific domains with curated tool access.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredAgents.map((agent) => (
              <GlowCard
                key={agent.slug}
                title={agent.name}
                description={agent.description}
                category={agent.category}
                badge={agent.model}
                badgeColor={modelColor(agent.model)}
                onClick={() => setSelectedAgent(agent)}
              />
            ))}
          </StaggerReveal>

          <ScrollReveal className="text-center mt-10" delay={0.4}>
            <a
              href="/agents"
              className="text-sm font-mono text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              View All {totalAgents} Agents &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Marketplace Stats */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-[var(--accent-green)] tracking-widest uppercase mb-3">
              Marketplace
            </p>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              <CounterAnimation end={marketplaceSkills} suffix="+" /> Community
              Skills
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
              Curated from {repos.length} open-source repositories. Discover,
              install, and extend your capabilities.
            </p>
          </ScrollReveal>

          {repos.length > 0 && (
            <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {repos.slice(0, 8).map((repo) => (
                <div
                  key={repo.name}
                  className="glass p-3 rounded-lg text-left cursor-pointer hover:border-[var(--accent-green)] transition-colors"
                  onClick={() => setSelectedRepo(repo)}
                >
                  <div className="text-sm font-mono text-[var(--text-primary)] truncate">
                    {repo.displayName}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    {repo.skillCount} skills
                  </div>
                </div>
              ))}
            </StaggerReveal>
          )}

          <ScrollReveal className="mt-10" delay={0.3}>
            <a
              href="/marketplaces"
              className="text-sm font-mono text-[var(--accent-green)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              Browse Marketplace &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Automation Scripts */}
      <section className="py-16 px-6" style={{ background: "var(--surface)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-[var(--accent-orange)] tracking-widest uppercase mb-3">
              Automation Scripts
            </p>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              {totalScripts} Scripts
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
              Setup, maintenance, and repo management automation that keeps the
              toolkit running smoothly.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {scriptCategories.map((cat) => (
              <div
                key={cat.category}
                className="glass p-4 rounded-lg text-center"
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: cat.color }}
                >
                  {cat.count}
                </div>
                <div className="text-sm font-mono text-[var(--text-primary)] mb-1">
                  {cat.label}
                </div>
                <div className="text-xs text-[var(--text-muted)] leading-snug">
                  {cat.description}
                </div>
              </div>
            ))}
          </StaggerReveal>

          <ScrollReveal className="mt-10" delay={0.3}>
            <a
              href="/scripts"
              className="text-sm font-mono text-[var(--accent-orange)] hover:text-[var(--accent-yellow)] transition-colors"
            >
              View All {totalScripts} Scripts &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Skill Modal */}
      <Modal open={!!selectedSkill} onClose={() => setSelectedSkill(null)}>
        {selectedSkill && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {selectedSkill.name}
              </h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--accent-purple) 15%, transparent)",
                  color: "var(--accent-purple)",
                }}
              >
                {selectedSkill.category}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              {selectedSkill.description}
            </p>
            <pre className="text-sm text-[var(--text-muted)] whitespace-pre-wrap font-mono leading-relaxed bg-[var(--surface-elevated)] rounded-lg p-4 border border-[var(--border)]">
              {selectedSkill.content}
            </pre>
          </>
        )}
      </Modal>

      {/* Agent Modal */}
      <Modal open={!!selectedAgent} onClose={() => setSelectedAgent(null)}>
        {selectedAgent && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {selectedAgent.name}
              </h2>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: modelColor(selectedAgent.model),
                  color: modelColor(selectedAgent.model),
                }}
              >
                {selectedAgent.model}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              {selectedAgent.description}
            </p>
            {Array.isArray(selectedAgent.tools) &&
              selectedAgent.tools.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Tools
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedAgent.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            <pre className="text-sm text-[var(--text-muted)] whitespace-pre-wrap font-mono leading-relaxed bg-[var(--surface-elevated)] rounded-lg p-4 border border-[var(--border)]">
              {selectedAgent.content}
            </pre>
          </>
        )}
      </Modal>

      {/* Marketplace Modal */}
      <Modal open={!!selectedRepo} onClose={() => setSelectedRepo(null)}>
        {selectedRepo && (
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--accent-green) 15%, transparent)",
                color: "var(--accent-green)",
              }}
            >
              <span className="text-xs font-mono">
                {selectedRepo.skillCount} skills
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              {selectedRepo.displayName}
            </h2>
            <p className="text-sm text-[var(--text-muted)] font-mono mb-6">
              {selectedRepo.name}
            </p>
            <a
              href={selectedRepo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-[var(--border)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] text-[var(--text-primary)] transition-all"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          </div>
        )}
      </Modal>
    </>
  );
}
