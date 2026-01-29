'use client';

import { useState } from 'react';
import FilterTabs from '@/components/ui/FilterTabs';
import GlowCard from '@/components/ui/GlowCard';
import Modal from '@/components/ui/Modal';

interface AgentItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  model: string;
  tools: string[];
  content: string;
}

interface AgentsGridProps {
  agents: AgentItem[];
  categories: string[];
}

export default function AgentsGrid({ agents, categories }: AgentsGridProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<AgentItem | null>(null);

  const filtered = filter ? agents.filter((a) => a.category === filter) : agents;

  const modelColor = (model: string) =>
    model === 'opus'
      ? 'var(--accent-yellow)'
      : model === 'sonnet'
        ? 'var(--accent-purple)'
        : 'var(--accent-blue)';

  return (
    <>
      <div className="mb-8">
        <FilterTabs categories={categories} onFilter={setFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((agent) => (
          <GlowCard
            key={agent.slug}
            title={agent.name}
            description={agent.description}
            category={agent.category}
            badge={agent.model}
            badgeColor={modelColor(agent.model)}
            onClick={() => setSelected(agent)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] mt-12">No agents found.</p>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{selected.name}</h2>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: modelColor(selected.model),
                  color: modelColor(selected.model),
                }}
              >
                {selected.model}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              {selected.description}
            </p>
            {selected.tools.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">Tools</h3>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] text-[var(--text-secondary)] border border-[var(--border)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <pre className="text-sm text-[var(--text-muted)] whitespace-pre-wrap font-mono leading-relaxed bg-[var(--surface-elevated)] rounded-lg p-4 border border-[var(--border)]">
              {selected.content}
            </pre>
          </>
        )}
      </Modal>
    </>
  );
}
