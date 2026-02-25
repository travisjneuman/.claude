import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import FooterWithDocs from "@/components/layout/FooterWithDocs";
import CommandsList from "./CommandsList";
import { getCommands } from "@/lib/data/commands";
import { getCounts } from "@/lib/data/counts";

const counts = getCounts();

export const metadata: Metadata = {
  title: counts.seo.commands.title,
  description: counts.seo.commands.description,
  alternates: { canonical: "/commands" },
};

export default function CommandsPage() {
  const commands = getCommands();

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-[var(--accent-cyan)] tracking-widest uppercase mb-3">
              Command Reference
            </p>
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              {commands.length} Slash Commands
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Quick-access commands that trigger workflows, tools, and
              automations from the CLI.
            </p>
          </div>

          <CommandsList commands={commands} />

          {commands.length === 0 && (
            <p className="text-center text-[var(--text-muted)] mt-12">
              Command data is generated at build time from the commands/
              directory.
            </p>
          )}
        </div>
      </main>
      <FooterWithDocs />
    </>
  );
}
