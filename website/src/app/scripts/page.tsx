import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import ScriptsList from "./ScriptsList";
import { getScripts } from "@/lib/data/scripts";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.scripts.title,
  description: counts.seo.scripts.description,
  alternates: { canonical: "/scripts" },
};

export default function ScriptsPage() {
  const scripts = getScripts();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-orange)] tracking-widest uppercase mb-3">
              Automation Scripts
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {scripts.length} Automation Scripts
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Setup, maintenance, repo management, and utility scripts that keep
              the toolkit running smoothly.
            </p>
          </div>

          <ScriptsList scripts={scripts} />

          {scripts.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-12">
              Script data is generated at build time from the scripts/ directory.
            </p>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
