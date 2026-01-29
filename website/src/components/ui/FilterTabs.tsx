"use client";

import { useState } from "react";

interface FilterTabsProps {
  categories: string[];
  onFilter: (category: string | null) => void;
}

export default function FilterTabs({ categories, onFilter }: FilterTabsProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => {
          setActive(null);
          onFilter(null);
        }}
        className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
          active === null
            ? "bg-[var(--accent-purple)] text-white"
            : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)]"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setActive(cat);
            onFilter(cat);
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
            active === cat
              ? "bg-[var(--accent-purple)] text-white"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
