"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import MarkdownContent from "@/components/ui/MarkdownContent";

interface CommandItem {
  slug: string;
  name: string;
  description: string;
  content: string;
  htmlContent: string;
}

export default function CommandsList({
  commands,
}: {
  commands: CommandItem[];
}) {
  const [selected, setSelected] = useState<CommandItem | null>(null);

  return (
    <>
      <div className="space-y-3">
        {commands.map((cmd) => (
          <div
            key={cmd.slug}
            className="glow-card p-5 group cursor-pointer"
            onClick={() => setSelected(cmd)}
          >
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono text-[var(--accent-cyan)] shrink-0 mt-0.5">
                /{cmd.slug}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {cmd.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                /{selected.slug}
              </h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--accent-cyan) 15%, transparent)",
                  color: "var(--accent-cyan)",
                }}
              >
                command
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
