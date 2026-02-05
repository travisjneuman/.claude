"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import MarkdownContent from "@/components/ui/MarkdownContent";

interface HookItem {
  slug: string;
  name: string;
  event: string;
  matcher: string;
  description: string;
  content: string;
  htmlContent: string;
}

const eventColors: Record<string, string> = {
  SessionStart: "var(--accent-green)",
  UserPromptSubmit: "var(--accent-blue)",
  PreToolUse: "var(--accent-yellow)",
  PostToolUse: "var(--accent-cyan)",
  Stop: "var(--accent-pink)",
};

export default function HooksList({ hooks }: { hooks: HookItem[] }) {
  const [selected, setSelected] = useState<HookItem | null>(null);

  return (
    <>
      <div className="space-y-3">
        {hooks.map((hook) => {
          const color = eventColors[hook.event] || "var(--accent-purple)";
          return (
            <div
              key={hook.slug}
              className="glow-card p-5 group cursor-pointer"
              onClick={() => setSelected(hook)}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex flex-col gap-1.5 mt-0.5">
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                      color,
                    }}
                  >
                    {hook.event}
                  </span>
                  {hook.matcher && (
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--accent-purple) 15%, transparent)",
                        color: "var(--accent-purple)",
                      }}
                    >
                      {hook.matcher}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3
                    className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    {hook.slug}.sh
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {hook.description}
                  </p>
                </div>
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
                {selected.slug}.sh
              </h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${eventColors[selected.event] || "var(--accent-purple)"} 15%, transparent)`,
                  color: eventColors[selected.event] || "var(--accent-purple)",
                }}
              >
                {selected.event}
              </span>
              {selected.matcher && (
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--accent-purple) 15%, transparent)",
                    color: "var(--accent-purple)",
                  }}
                >
                  {selected.matcher}
                </span>
              )}
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
