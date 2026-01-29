import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { getMarketplaceStats } from '@/lib/data/marketplace';

export const metadata = {
  title: 'Marketplace | Claude Code Supercharged',
  description: 'Browse marketplace repositories and community skills.',
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
              Curated from {repos.length} open-source repositories maintained by the community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <div key={repo.name} className="glow-card p-6 group cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors">
                    {repo.displayName}
                  </h3>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: 'var(--accent-green)',
                      color: 'var(--accent-green)',
                    }}
                  >
                    {repo.skillCount} skills
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)] font-mono">{repo.name}</p>
              </div>
            ))}
          </div>

          {repos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[var(--text-muted)]">
                Marketplace data is generated at build time from the plugins/marketplaces/ directory.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
