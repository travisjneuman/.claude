'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface DocItem {
  slug: string;
  name: string;
  description: string;
  content: string;
}

export default function DocsList({ docs }: { docs: DocItem[] }) {
  const [selected, setSelected] = useState<DocItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div
            key={doc.slug}
            className="glow-card p-5 group cursor-pointer"
            onClick={() => setSelected(doc)}
          >
            <h3
              className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors mb-2"
              style={{ fontSize: '15px' }}
            >
              {doc.name}
            </h3>
            <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
              {doc.description}
            </p>
            <div className="mt-3">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent-yellow) 15%, transparent)',
                  color: 'var(--accent-yellow)',
                }}
              >
                {doc.slug}.md
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{selected.name}</h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent-yellow) 15%, transparent)',
                  color: 'var(--accent-yellow)',
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
    </>
  );
}
