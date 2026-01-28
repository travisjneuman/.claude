import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { getDocs } from '@/lib/data/docs';

export const metadata = {
  title: 'Documentation | Claude Code Supercharged',
  description: 'Browse all documentation for the Claude Code configuration framework.',
};

export default function DocsPage() {
  const docs = getDocs();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-yellow)] tracking-widest uppercase mb-3">
              Documentation
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {docs.length} Guides &amp; References
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Setup guides, workflow documentation, architecture references, and operational playbooks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docs.map((doc) => (
              <div key={doc.slug} className="glow-card p-5 group cursor-default">
                <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors mb-2" style={{ fontSize: '15px' }}>
                  {doc.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>
                <div className="mt-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-yellow) 15%, transparent)', color: 'var(--accent-yellow)' }}>
                    {doc.slug}.md
                  </span>
                </div>
              </div>
            ))}
          </div>

          {docs.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-12">
              Documentation data is generated at build time from the docs/ directory.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
