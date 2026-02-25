import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import AgentsGrid from "./AgentsGrid";
import { getAgents } from "@/lib/data/agents";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.agents.title,
  description: counts.seo.agents.description,
  alternates: { canonical: "/agents" },
};

export default function AgentsPage() {
  const agents = getAgents();
  const categories = [...new Set(agents.map((a) => a.category))].sort();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-blue)] tracking-widest uppercase mb-3">
              Agent Gallery
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {agents.length} Specialized Agents
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Autonomous sub-agents tuned for specific domains with curated tool
              access and model selection.
            </p>
          </div>

          <AgentsGrid
            agents={agents.map((a) => ({
              slug: a.slug,
              name: a.name,
              description: a.description,
              category: a.category,
              model: a.model,
              tools: a.tools,
              content: a.content,
              htmlContent: a.htmlContent,
            }))}
            categories={categories}
          />
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
