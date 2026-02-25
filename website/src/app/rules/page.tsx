import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import RulesList from "./RulesList";
import { getRules } from "@/lib/data/rules";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.rules.title,
  description: counts.seo.rules.description,
  alternates: { canonical: "/rules" },
};

export default function RulesPage() {
  const rules = getRules();
  const categories = [...new Set(rules.map((r) => r.category))].sort();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-cyan)] tracking-widest uppercase mb-3">
              Rules & Guidelines
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {rules.length} Contextual Rules
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Modular checklists, stack guides, workflow methodologies, and
              tooling references — loaded on demand based on task context.
            </p>
          </div>

          <RulesList rules={rules} categories={categories} />

          {rules.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-12">
              Rules data is generated at build time from the rules/ directory.
            </p>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
