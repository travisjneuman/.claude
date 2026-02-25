import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import SkillsGrid from "./SkillsGrid";
import { getSkills } from "@/lib/data/skills";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.skills.title,
  description: counts.seo.skills.description,
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  const skills = getSkills();
  const categories = [...new Set(skills.map((s) => s.category))].sort();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-purple)] tracking-widest uppercase mb-3">
              Skills Library
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {skills.length} Expert Skills
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Domain-specific knowledge modules that load on demand to guide
              Claude through specialized workflows.
            </p>
          </div>

          <SkillsGrid
            skills={skills.map((s) => ({
              slug: s.slug,
              name: s.name,
              description: s.description,
              category: s.category,
              content: s.content,
              htmlContent: s.htmlContent,
            }))}
            categories={categories}
          />
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
