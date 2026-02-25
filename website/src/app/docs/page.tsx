import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import DocsList from "./DocsList";
import { getDocs } from "@/lib/data/docs";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.docs.title,
  description: counts.seo.docs.description,
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  const docs = getDocs();
  const categories = [...new Set(docs.map((d) => d.category))].sort();

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

          <DocsList docs={docs} categories={categories} />

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
