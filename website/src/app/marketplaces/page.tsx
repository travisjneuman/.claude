import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import MarketplaceGrid from "./MarketplaceGrid";
import { getMarketplaceStats } from "@/lib/data/marketplace";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.marketplaces.title,
  description: counts.seo.marketplaces.description,
  alternates: { canonical: "/marketplaces" },
};

export default function MarketplacesPage() {
  const { repos } = getMarketplaceStats();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-green)] tracking-widest uppercase mb-3">
              Community Marketplace
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {counts.marketplaceSkillsDisplay} Skills
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Curated from {repos.length} open-source repositories: unique normalized skill bodies.
              Snapshot as of {counts.asOf} at selected local revisions, including
              pins, not latest upstream. Repo totals overlap; don&apos;t sum them.
            </p>
          </div>

          <MarketplaceGrid repos={repos} />

          {repos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--text-muted)]">
                Marketplace data comes from the canonical public count snapshot.
              </p>
            </div>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
