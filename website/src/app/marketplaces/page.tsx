import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import MarketplaceGrid from "./MarketplaceGrid";
import { getMarketplaceStats } from "@/lib/data/marketplace";

export const metadata = {
  title: "Marketplace | Claude Code Supercharged",
  description: "Browse marketplace repositories and community skills.",
};

export default function MarketplacesPage() {
  const { repos, totalSkills } = getMarketplaceStats();

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
              {totalSkills.toLocaleString()}+ Skills
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Curated from {repos.length} open-source repositories maintained by
              the community.
            </p>
          </div>

          <MarketplaceGrid repos={repos} />

          {repos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--text-muted)]">
                Marketplace data is generated at build time from the
                plugins/marketplaces/ directory.
              </p>
            </div>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
