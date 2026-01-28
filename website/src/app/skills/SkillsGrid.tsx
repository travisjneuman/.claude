'use client';

import { useState } from 'react';
import FilterTabs from '@/components/ui/FilterTabs';
import GlowCard from '@/components/ui/GlowCard';

interface SkillItem {
  slug: string;
  name: string;
  description: string;
  category: string;
}

interface SkillsGridProps {
  skills: SkillItem[];
  categories: string[];
}

export default function SkillsGrid({ skills, categories }: SkillsGridProps) {
  const [filter, setFilter] = useState<string | null>(null);

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
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-[var(--text-muted)] mt-12">No skills found.</p>
      )}
    </>
  );
}
