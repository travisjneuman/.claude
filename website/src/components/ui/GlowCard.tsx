'use client';

interface GlowCardProps {
  title: string;
  description: string;
  category?: string;
  badge?: string;
  badgeColor?: string;
  href?: string;
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  development: 'var(--accent-purple)',
  design: 'var(--accent-pink)',
  creative: 'var(--accent-yellow)',
  business: 'var(--accent-green)',
  architecture: 'var(--accent-cyan)',
  infrastructure: 'var(--accent-blue)',
  platform: 'var(--accent-purple)',
  frontend: 'var(--accent-purple)',
  backend: 'var(--accent-blue)',
  quality: 'var(--accent-cyan)',
  mobile: 'var(--accent-green)',
};

export default function GlowCard({
  title,
  description,
  category,
  badge,
  badgeColor,
  onClick,
}: GlowCardProps) {
  const color = category ? categoryColors[category] || 'var(--accent-purple)' : 'var(--accent-purple)';

  return (
    <div className="glow-card p-5 cursor-pointer group" onClick={onClick}>
      <div className="flex items-start justify-between mb-2">
        <h3
          className="font-semibold text-[var(--text-primary)] group-hover:text-white transition-colors"
          style={{ fontSize: '15px' }}
        >
          {title}
        </h3>
        {badge && (
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              borderColor: badgeColor || color,
              color: badgeColor || color,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
        {description}
      </p>
      {category && (
        <div className="mt-3">
          <span
            className="text-[11px] font-mono px-2 py-0.5 rounded-md"
            style={{
              backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
              color,
            }}
          >
            {category}
          </span>
        </div>
      )}
    </div>
  );
}
