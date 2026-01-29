import Link from "next/link";

const footerLinks = {
  Explore: [
    { href: "/skills", label: "Skills Library" },
    { href: "/agents", label: "Agent Directory" },
    { href: "/commands", label: "Commands" },
    { href: "/marketplaces", label: "Marketplace" },
  ],
  Documentation: [
    { href: "/docs", label: "Setup Guide" },
    { href: "/docs", label: "Workflow" },
    { href: "/docs", label: "Maintenance" },
  ],
  Community: [
    {
      href: "https://github.com/travisjneuman/.claude",
      label: "GitHub",
      external: true,
    },
    {
      href: "https://github.com/travisjneuman/.claude/issues",
      label: "Issues",
      external: true,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold gradient-text">Claude Code</span>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Supercharge your Claude Code with 72 skills, 36 agents, and 1,700+
              marketplace skills across 50 repos.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[var(--border)] text-center text-sm text-[var(--text-muted)]">
          Built by{" "}
          <a
            href="https://travisjneuman.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-purple)] hover:underline"
          >
            travisjneuman
          </a>
        </div>
      </div>
    </footer>
  );
}
