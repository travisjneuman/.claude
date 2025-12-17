/**
 * GitHub Trending Repos Widget
 * Top trending repositories on GitHub
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface TrendingRepo {
  name: string;
  owner: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

export const GitHubTrendingWidget: React.FC = () => {
  const [repos, setRepos] = useState<TrendingRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // GitHub API - search for repos created in last week, sorted by stars
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const dateStr = oneWeekAgo.toISOString().split('T')[0];

      const response = await fetch(
        `https://api.github.com/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=5`
      );
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      const repoList: TrendingRepo[] = data.items.map((item: any) => ({
        name: item.name,
        owner: item.owner.login,
        description: item.description || 'No description',
        stars: item.stargazers_count,
        language: item.language || 'Unknown',
        url: item.html_url,
      }));

      setRepos(repoList);
    } catch (err) {
      setError('Failed to load trending repos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  const formatStars = (stars: number) => {
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
    return stars.toString();
  };

  return (
    <BaseWidget
      title="GitHub Trending"
      icon="🔥"
      loading={loading}
      error={error}
      onRefresh={fetchTrending}
    >
      <div className="space-y-2">
        {repos.map((repo, idx) => (
          <a
            key={idx}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button hover:bg-surface-light dark:hover:bg-surface-dark-elevated transition-all duration-standard ease-smooth"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary text-sm">
                  {repo.owner}/{repo.name}
                </h3>
                <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary line-clamp-2 mt-0.5">
                  {repo.description}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                  <span>{repo.language}</span>
                  <span>⭐ {formatStars(repo.stars)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </BaseWidget>
  );
};
