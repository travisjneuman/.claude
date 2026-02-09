"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import MarkdownContent from "@/components/ui/MarkdownContent";

interface ScriptItem {
  slug: string;
  name: string;
  filename: string;
  category: string;
  description: string;
  whenToRun: string;
  content: string;
  htmlContent: string;
}

const categoryColors: Record<string, string> = {
  setup: "var(--accent-green)",
  maintenance: "var(--accent-yellow)",
  "repo-management": "var(--accent-blue)",
  utilities: "var(--accent-cyan)",
  "git-hooks": "var(--accent-pink)",
};

const categoryLabels: Record<string, string> = {
  setup: "Setup",
  maintenance: "Maintenance",
  "repo-management": "Repo Management",
  utilities: "Utilities",
  "git-hooks": "Git Hooks",
};

function groupByCategory(
  scripts: ScriptItem[],
): Record<string, ScriptItem[]> {
  const groups: Record<string, ScriptItem[]> = {};
  for (const s of scripts) {
    if (!groups[s.category]) groups[s.category] = [];
    groups[s.category].push(s);
  }
  return groups;
}

export default function ScriptsList({
  scripts,
}: {
  scripts: ScriptItem[];
}) {
  const [selected, setSelected] = useState<ScriptItem | null>(null);
  const groups = groupByCategory(scripts);
  const categoryOrder = [
    "setup",
    "maintenance",
    "repo-management",
    "utilities",
    "git-hooks",
  ];

  return (
    <>
      <div className="space-y-10">
        {categoryOrder.map((cat) => {
          const items = groups[cat];
          if (!items || items.length === 0) return null;
          const color = categoryColors[cat] || "var(--accent-purple)";
          const label = categoryLabels[cat] || cat;

          return (
            <div key={cat}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-mono px-3 py-1 rounded-md font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                    color,
                  }}
                >
                  {label}
                </span>
                <span className="text-xs text-[var(--text-muted)]">
                  {items.length} script{items.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-3">
                {items.map((script) => (
                  <div
                    key={script.slug}
                    className="glow-card p-5 group cursor-pointer"
                    onClick={() => setSelected(script)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-0.5">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                            color,
                          }}
                        >
                          {label}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors mb-1"
                          style={{ fontSize: "15px" }}
                        >
                          {script.filename}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                          {script.description}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1.5 opacity-70">
                          When to run: {script.whenToRun}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {selected.filename}
              </h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${categoryColors[selected.category] || "var(--accent-purple)"} 15%, transparent)`,
                  color:
                    categoryColors[selected.category] || "var(--accent-purple)",
                }}
              >
                {categoryLabels[selected.category] || selected.category}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-2 leading-relaxed">
              {selected.description}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              When to run: {selected.whenToRun}
            </p>
            <MarkdownContent content={selected.htmlContent} />
          </>
        )}
      </Modal>
    </>
  );
}
