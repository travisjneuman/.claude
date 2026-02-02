import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import TerminalDemo from "@/components/terminal/TerminalDemo";
import HeroCanvas from "@/components/3d/HeroCanvas";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CounterAnimation from "@/components/animations/CounterAnimation";
import HomeCards from "./HomeCards";
import { getSkills } from "@/lib/data/skills";
import { getAgents } from "@/lib/data/agents";
import { getMarketplaceStats } from "@/lib/data/marketplace";

// Hand-picked for highest end-user ROI on homepage
const FEATURED_SKILL_SLUGS = [
  "debug-systematic",
  "tdd-workflow",
  "auto-claude",
  "security",
  "generic-react-feature-developer",
  "api-design",
  "ai-ml-development",
  "devops-cloud",
];

const FEATURED_AGENT_SLUGS = [
  "deep-code-reviewer",
  "debugging-specialist",
  "security-auditor",
  "architecture-analyst",
  "performance-optimizer",
  "typescript-expert",
];

function pickFeatured<T extends { slug: string }>(
  items: T[],
  slugs: string[],
): T[] {
  const map = new Map(items.map((i) => [i.slug, i]));
  const result: T[] = [];
  for (const slug of slugs) {
    const item = map.get(slug);
    if (item) result.push(item);
  }
  return result;
}

export default function Home() {
  const skills = getSkills();
  const agents = getAgents();
  const { repos, totalSkills: marketplaceSkills } = getMarketplaceStats();

  const featuredSkills = pickFeatured(skills, FEATURED_SKILL_SLUGS);
  const featuredAgents = pickFeatured(agents, FEATURED_AGENT_SLUGS);

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
              "radial-gradient(ellipse at 30% 20%, rgba(168,85,247,0.15), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(122,162,247,0.1), transparent 60%)",
          }}
        />
        <HeroCanvas />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-sm font-mono text-[var(--accent-pink)] tracking-widest uppercase mb-6 hero-fade-in">
            .claude configuration
          </p>
          <h1
            className="gradient-text font-bold leading-tight mb-6 hero-fade-in hero-delay-1"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            tjn.claude/
          </h1>
          <p
            className="text-lg text-[var(--text-primary)] max-w-2xl mx-auto mb-10 leading-relaxed hero-fade-in hero-delay-2"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            A comprehensive configuration framework with skills, agents,
            commands, and marketplace integrations that transform Claude Code
            into an autonomous engineering platform.
          </p>

          {/* Stats */}
          <div
            className="hero-fade-in hero-delay-3 space-y-5 mb-10"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
          >
            {/* Tier 1: Personal Toolkit */}
            <div className="flex justify-center gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <CounterAnimation end={skills.length} />
                </div>
                <div className="text-xs font-mono text-[var(--accent-pink)] uppercase tracking-wider mt-1">
                  Custom Skills
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <CounterAnimation end={agents.length} />
                </div>
                <div className="text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mt-1">
                  Specialized Agents
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 justify-center">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                plus
              </span>
              <div className="h-px w-12 bg-white/20" />
            </div>

            {/* Tier 2: Community Marketplace */}
            <div className="flex justify-center gap-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <CounterAnimation end={marketplaceSkills} suffix="+" />
                </div>
                <div className="text-xs font-mono text-[var(--accent-yellow)] uppercase tracking-wider mt-1">
                  Marketplace Skills
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  <CounterAnimation end={repos.length} />
                </div>
                <div className="text-xs font-mono text-[var(--accent-yellow)] uppercase tracking-wider mt-1">
                  Open-Source Repos
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap hero-fade-in hero-delay-4">
            <a
              href="/skills"
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-purple), var(--accent-pink))",
              }}
            >
              Explore Skills
            </a>
            <a
              href="https://github.com/travisjneuman/.claude"
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
      <section className="py-16 px-6">
        <ScrollReveal className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm font-mono text-[var(--accent-cyan)] tracking-widest uppercase mb-3">
            Interactive Demo
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            See It In Action
          </h1>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Watch how skills, agents, and commands work together in the
            terminal.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <TerminalDemo />
        </ScrollReveal>
      </section>

      {/* Interactive card sections with modals */}
      <HomeCards
        skills={featuredSkills}
        agents={featuredAgents}
        repos={repos}
        marketplaceSkills={marketplaceSkills}
        totalSkills={skills.length}
        totalAgents={agents.length}
      />

      {/* Getting Started */}
      <section className="py-16 px-6" style={{ background: "var(--surface)" }}>
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Get Started
          </h2>
          <p className="text-[var(--text-secondary)] mb-10">
            Clone the repository and start using the full configuration
            framework.
          </p>

          <div className="glass rounded-xl p-6 font-mono text-left text-sm space-y-4">
            <div>
              <span className="text-[var(--text-muted)]">
                # Clone the configuration
              </span>
              <div className="text-[var(--accent-green)] mt-1">
                $ git clone https://github.com/travisjneuman/.claude.git ~/.claude
              </div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">
                # Run setup (submodules, no_push protection, plugin
                registration)
              </span>
              <div className="text-[var(--accent-green)] mt-1">
                $ cd ~/.claude && bash scripts/setup-new-machine.sh
              </div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">
                # Start Claude Code — skills auto-activate
              </span>
              <div className="text-[var(--accent-green)] mt-1">$ claude</div>
            </div>
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-4">
            The setup script initializes submodules, enforces no_push on all
            marketplace repos, registers marketplaces, and installs plugins.
          </p>
        </ScrollReveal>
      </section>

      <FooterWithDocs />
    </>
  );
}
