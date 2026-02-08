"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

interface DocItem {
  slug: string;
  name: string;
  description: string;
  content: string;
}

const SLUG_TO_LABEL: Record<string, string> = {
  "SETUP-GUIDE": "Setup Guide",
  "WORKFLOW-GUIDE": "Workflow",
  MAINTENANCE: "Maintenance",
};

const footerLinks = {
  Explore: [
    { href: "/skills", label: "Skills Library" },
    { href: "/agents", label: "Agent Directory" },
    { href: "/commands", label: "Commands" },
    { href: "/marketplaces", label: "Marketplace" },
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

interface FooterProps {
  docs?: DocItem[];
}

export default function Footer({ docs }: FooterProps) {
  const [selected, setSelected] = useState<DocItem | null>(null);

  const docLinks = docs?.length
    ? docs.map((d) => ({
        label: SLUG_TO_LABEL[d.slug] || d.name,
        doc: d,
      }))
    : [
        { label: "Setup Guide", href: "/docs" },
        { label: "Workflow", href: "/docs" },
        { label: "Maintenance", href: "/docs" },
      ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold gradient-text">Claude Code</span>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Supercharge your Claude Code with 89 skills, 47 agents, and 3,900+
              marketplace skills across 68 repos.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.Explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
              Documentation
            </h3>
            <ul className="space-y-2">
              {docLinks.map((item) => (
                <li key={item.label}>
                  {"doc" in item ? (
                    <button
                      onClick={() => setSelected(item.doc)}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
              Community
            </h3>
            <ul className="space-y-2">
              {footerLinks.Community.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
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

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {selected.name}
              </h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                  color: "var(--accent-yellow)",
                }}
              >
                {selected.slug}.md
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              {selected.description}
            </p>
            <pre className="text-sm text-[var(--text-muted)] whitespace-pre-wrap font-mono leading-relaxed bg-[var(--surface-elevated)] rounded-lg p-4 border border-[var(--border)]">
              {selected.content}
            </pre>
          </>
        )}
      </Modal>
    </footer>
  );
}
