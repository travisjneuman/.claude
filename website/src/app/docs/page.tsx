import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import DocsList from "./DocsList";
import { getDocs } from "@/lib/data/docs";

export const metadata = {
  title: "Documentation | Claude Code Supercharged",
  description:
    "Browse all documentation for the Claude Code configuration framework.",
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
              Setup guides, workflow documentation, architecture references, and
              operational playbooks.
            </p>
          </div>

          <DocsList docs={docs} />

          {docs.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-12">
              Documentation data is generated at build time from the docs/
              directory.
            </p>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
