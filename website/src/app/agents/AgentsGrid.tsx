'use client';

import { useState } from 'react';
import FilterTabs from '@/components/ui/FilterTabs';
import GlowCard from '@/components/ui/GlowCard';

interface AgentItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  model: string;
}

interface AgentsGridProps {
  agents: AgentItem[];
  categories: string[];
}

export default function AgentsGrid({ agents, categories }: AgentsGridProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? agents.filter((a) => a.category === filter) : agents;

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
            badgeColor={
              agent.model === 'opus'
                ? 'var(--accent-yellow)'
                : agent.model === 'sonnet'
                  ? 'var(--accent-purple)'
                  : 'var(--accent-blue)'
            }
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] mt-12">No agents found.</p>
      )}
    </>
  );
}
