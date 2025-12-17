/**
 * Package Stats Widget
 * NPM package download statistics
 */

import React, { useState } from 'react';
import { BaseWidget } from './BaseWidget';

interface PackageStats {
  package: string;
  downloads: number;
  period: string;
}

export const PackageStatsWidget: React.FC = () => {
  const [packageName, setPackageName] = useState('');
  const [stats, setStats] = useState<PackageStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (pkg: string) => {
    if (!pkg.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // NPM registry API - last week downloads
      const response = await fetch(
        `https://api.npmjs.org/downloads/point/last-week/${pkg}`
      );
      if (!response.ok) throw new Error('Package not found');

      const data = await response.json();
      setStats({
        package: data.package,
        downloads: data.downloads,
        period: 'Last 7 days',
      });
    } catch (err) {
      setError('Package not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(packageName);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <BaseWidget title="NPM Stats" icon="📦" loading={loading} error={error}>
      <div className="space-y-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="Package name..."
            className="flex-1 px-3 py-2 text-sm rounded-button bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light-primary dark:text-text-dark-primary focus:ring-2 focus:ring-accent-blue transition-all duration-standard ease-smooth"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-accent-blue hover:bg-accent-blue-hover text-white rounded-button text-sm font-medium transition-all duration-standard ease-smooth"
          >
            Check
          </button>
        </form>

        {stats && (
          <div className="space-y-2">
            <div className="bg-surface-light-elevated dark:bg-surface-dark rounded-button p-3 text-center transition-all duration-standard ease-smooth">
              <div className="text-3xl font-bold text-accent-blue">
                {formatNumber(stats.downloads)}
              </div>
              <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                downloads
              </div>
            </div>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">Package:</span>
                <span className="text-text-light-primary dark:text-text-dark-primary font-mono">
                  {stats.package}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">Period:</span>
                <span className="text-text-light-primary dark:text-text-dark-primary">
                  {stats.period}
                </span>
              </div>
            </div>

            <a
              href={`https://www.npmjs.com/package/${stats.package}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-accent-blue hover:underline"
            >
              View on NPM →
            </a>
          </div>
        )}

        {!stats && !loading && !error && (
          <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary text-center py-4">
            Enter a package name to see stats
          </p>
        )}
      </div>
    </BaseWidget>
  );
};
