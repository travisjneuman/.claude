import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import CommandsList from "./CommandsList";
import { getCommands } from "@/lib/data/commands";

export const metadata = {
  title: "Commands | Claude Code Supercharged",
  description:
    "Browse all slash commands available in the Claude Code configuration.",
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
      <Footer />
    </>
  );
}
