'use client';

import { useState } from 'react';
import FilterTabs from '@/components/ui/FilterTabs';
import GlowCard from '@/components/ui/GlowCard';
import Modal from '@/components/ui/Modal';

interface SkillItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  content: string;
}

interface SkillsGridProps {
  skills: SkillItem[];
  categories: string[];
}

export default function SkillsGrid({ skills, categories }: SkillsGridProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<SkillItem | null>(null);

  const filtered = filter ? skills.filter((s) => s.category === filter) : skills;

  return (
    <>
      <div className="mb-8">
        <FilterTabs categories={categories} onFilter={setFilter} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((skill) => (
          <GlowCard
            key={skill.slug}
            title={skill.name}
            description={skill.description}
            category={skill.category}
            onClick={() => setSelected(skill)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] mt-12">No skills found.</p>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{selected.name}</h2>
              <span
                className="text-[11px] font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--accent-purple) 15%, transparent)',
                  color: 'var(--accent-purple)',
                }}
              >
                {selected.category}
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
