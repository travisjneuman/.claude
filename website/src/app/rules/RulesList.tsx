"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import FilterTabs from "@/components/ui/FilterTabs";
import MarkdownContent from "@/components/ui/MarkdownContent";

interface RuleItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  loadType: "always-loaded" | "on-demand";
  content: string;
  htmlContent: string;
}

interface RulesListProps {
  rules: RuleItem[];
  categories: string[];
}

const categoryColors: Record<string, string> = {
  checklist: "var(--accent-green)",
  stack: "var(--accent-purple)",
  tooling: "var(--accent-cyan)",
  workflow: "var(--accent-yellow)",
};

export default function RulesList({ rules, categories }: RulesListProps) {
  const [selected, setSelected] = useState<RuleItem | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? rules.filter((r) => r.category === filter) : rules;

  return (
    <>
      <div className="mb-8">
        <FilterTabs categories={categories} onFilter={setFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((rule) => {
          const color = categoryColors[rule.category] || "var(--accent-purple)";
          return (
            <div
              key={rule.slug}
              className="glow-card p-5 group cursor-pointer"
              onClick={() => setSelected(rule)}
            >
              <h3
                className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors mb-2"
                style={{ fontSize: "15px" }}
              >
                {rule.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                {rule.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                    color,
                  }}
                >
                  {rule.category}
                </span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                    color: "var(--accent-yellow)",
                  }}
                >
                  {rule.slug.split("/").pop()}.md
                </span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${rule.loadType === "always-loaded" ? "var(--accent-green)" : "var(--accent-blue)"} 15%, transparent)`,
                    color: rule.loadType === "always-loaded" ? "var(--accent-green)" : "var(--accent-blue)",
                  }}
                >
                  {rule.loadType === "always-loaded" ? "always loaded" : "on-demand"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] mt-12">
          No rules match this filter.
        </p>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                {selected.name}
              </h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${categoryColors[selected.category] || "var(--accent-purple)"} 15%, transparent)`,
                  color:
                    categoryColors[selected.category] || "var(--accent-purple)",
                }}
              >
                {selected.category}
              </span>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--accent-yellow) 15%, transparent)",
                  color: "var(--accent-yellow)",
                }}
              >
                {selected.slug.split("/").pop()}.md
              </span>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${selected.loadType === "always-loaded" ? "var(--accent-green)" : "var(--accent-blue)"} 15%, transparent)`,
                  color: selected.loadType === "always-loaded" ? "var(--accent-green)" : "var(--accent-blue)",
                }}
              >
                {selected.loadType === "always-loaded" ? "always loaded" : "on-demand"}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              {selected.description}
            </p>
            <MarkdownContent content={selected.htmlContent} />
          </>
        )}
      </Modal>
    </>
  );
}
