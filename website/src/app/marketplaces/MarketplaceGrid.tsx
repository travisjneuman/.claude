'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';

interface RepoItem {
  name: string;
  displayName: string;
  skillCount: number;
  githubUrl: string;
}

export default function MarketplaceGrid({ repos }: { repos: RepoItem[] }) {
  const [selected, setSelected] = useState<RepoItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <div
            key={repo.name}
            className="glow-card p-6 group cursor-pointer"
            onClick={() => setSelected(repo)}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors">
                {repo.displayName}
              </h3>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: 'var(--accent-green)',
                  color: 'var(--accent-green)',
                }}
              >
                {repo.skillCount} skills
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] font-mono">{repo.name}</p>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--accent-green) 15%, transparent)',
                color: 'var(--accent-green)',
              }}
            >
              <span className="text-xs font-mono">{selected.skillCount} skills</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              {selected.displayName}
            </h2>
            <p className="text-sm text-[var(--text-muted)] font-mono mb-6">{selected.name}</p>
            <a
              href={selected.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm border border-[var(--border)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] text-[var(--text-primary)] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View on GitHub
            </a>
          </div>
        )}
      </Modal>
    </>
  );
}
