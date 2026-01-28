import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import TerminalDemo from '@/components/terminal/TerminalDemo';
import GlowCard from '@/components/ui/GlowCard';
import HeroCanvas from '@/components/3d/HeroCanvas';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StaggerReveal from '@/components/animations/StaggerReveal';
import CounterAnimation from '@/components/animations/CounterAnimation';
import TextReveal from '@/components/animations/TextReveal';
import { getSkills } from '@/lib/data/skills';
import { getAgents } from '@/lib/data/agents';
import { getMarketplaceStats } from '@/lib/data/marketplace';

export default function Home() {
  const skills = getSkills();
  const agents = getAgents();
  const { repos, totalSkills: marketplaceSkills } = getMarketplaceStats();

  const featuredSkills = skills.slice(0, 8);
  const featuredAgents = agents.slice(0, 6);

  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.15), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(122,162,247,0.1), transparent 60%)',
          }}
        />
        <HeroCanvas />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-sm font-mono text-[var(--accent-purple)] tracking-widest uppercase mb-6 hero-fade-in">
            .claude configuration
          </p>
          <h1
            className="gradient-text font-bold leading-tight mb-6 hero-fade-in hero-delay-1"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Claude Code Supercharged
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed hero-fade-in hero-delay-2">
            A comprehensive configuration framework with skills, agents, commands, and marketplace
            integrations that transform Claude Code into an autonomous engineering platform.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 hero-fade-in hero-delay-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                <CounterAnimation end={skills.length} />
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Skills
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                <CounterAnimation end={agents.length} />
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Agents
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                <CounterAnimation end={marketplaceSkills || 1496} suffix="+" />
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Marketplace
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--text-primary)]">
                <CounterAnimation end={repos.length || 23} />
              </div>
              <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">
                Repos
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap hero-fade-in hero-delay-4">
            <a
              href="/skills"
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{
                background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-pink))',
              }}
            >
              Explore Skills
            </a>
            <a
              href="https://github.com/tjndavis/dotclaude"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Terminal Demo */}
      <section className="py-24 px-6">
        <ScrollReveal className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm font-mono text-[var(--accent-cyan)] tracking-widest uppercase mb-3">
            Interactive Demo
          </p>
          <TextReveal
            text="See It In Action"
            tag="h2"
            className="text-3xl font-bold text-[var(--text-primary)] mb-4"
          />
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Watch how skills, agents, and commands work together in the terminal.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <TerminalDemo />
        </ScrollReveal>
      </section>

      {/* Skills Overview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-purple)] tracking-widest uppercase mb-3">
              Skills Library
            </p>
            <TextReveal
              text={`${skills.length} Expert Skills`}
              tag="h2"
              className="text-3xl font-bold text-[var(--text-primary)] mb-4"
            />
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Domain-specific knowledge loaded on demand. From debugging methodologies to full-stack
              design systems.
            </p>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredSkills.map((skill) => (
              <GlowCard
                key={skill.slug}
                title={skill.name}
                description={skill.description}
                category={skill.category}
              />
            ))}
          </StaggerReveal>

          <ScrollReveal className="text-center mt-10" delay={0.4}>
            <a
              href="/skills"
              className="text-sm font-mono text-[var(--accent-purple)] hover:text-[var(--accent-pink)] transition-colors"
            >
              Explore All {skills.length} Skills &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Agents Showcase */}
      <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-blue)] tracking-widest uppercase mb-3">
              Specialized Agents
            </p>
            <TextReveal
              text={`${agents.length} Expert Agents`}
              tag="h2"
              className="text-3xl font-bold text-[var(--text-primary)] mb-4"
            />
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Autonomous sub-agents that handle complex tasks. Each tuned for specific domains with
              curated tool access.
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
                badgeColor={
                  agent.model === 'opus'
                    ? 'var(--accent-yellow)'
                    : agent.model === 'sonnet'
                      ? 'var(--accent-purple)'
                      : 'var(--accent-blue)'
                }
              />
            ))}
          </StaggerReveal>

          <ScrollReveal className="text-center mt-10" delay={0.4}>
            <a
              href="/agents"
              className="text-sm font-mono text-[var(--accent-blue)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              View All {agents.length} Agents &rarr;
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Marketplace Stats */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-sm font-mono text-[var(--accent-green)] tracking-widest uppercase mb-3">
              Marketplace
            </p>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              <CounterAnimation end={marketplaceSkills || 1496} suffix="+" /> Community Skills
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
              Curated from {repos.length || 23} open-source repositories. Discover, install, and
              extend your capabilities.
            </p>
          </ScrollReveal>

          {repos.length > 0 && (
            <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {repos.slice(0, 8).map((repo) => (
                <div key={repo.name} className="glass p-3 rounded-lg text-left">
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

      {/* Getting Started */}
      <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Get Started</h2>
          <p className="text-[var(--text-secondary)] mb-10">
            Clone the repository and start using the full configuration framework.
          </p>

          <div className="glass rounded-xl p-6 font-mono text-left text-sm space-y-4">
            <div>
              <span className="text-[var(--text-muted)]"># Clone the configuration</span>
              <div className="text-[var(--accent-green)] mt-1">
                $ git clone https://github.com/tjndavis/dotclaude.git ~/.claude
              </div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]"># Initialize submodules (marketplace plugins)</span>
              <div className="text-[var(--accent-green)] mt-1">
                $ cd ~/.claude && git submodule update --init --recursive
              </div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]"># Start Claude Code — skills auto-activate</span>
              <div className="text-[var(--accent-green)] mt-1">$ claude</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  );
}
