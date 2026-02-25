import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import HooksList from "./HooksList";
import { getHooks } from "@/lib/data/hooks";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.hooks.title,
  description: counts.seo.hooks.description,
  alternates: { canonical: "/hooks" },
};

export default function HooksPage() {
  const hooks = getHooks();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-green)] tracking-widest uppercase mb-3">
              Lifecycle Hooks
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {hooks.length} Automation Hooks
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Bash scripts that run automatically at key points during a Claude
              Code session — from startup to shutdown.
            </p>
          </div>

          <HooksList hooks={hooks} />

          {hooks.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-12">
              Hook data is generated at build time from the hooks/ directory.
            </p>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
