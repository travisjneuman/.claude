/**
 * Wikipedia Random Article Widget
 * Daily learning with random Wikipedia articles
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  url: string;
}

export const WikipediaWidget: React.FC = () => {
  const [article, setArticle] = useState<WikiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary');
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setArticle({
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail,
        url: data.content_urls.desktop.page,
      });
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return (
    <BaseWidget title="Wikipedia" icon="📚" loading={loading} error={error} onRefresh={fetchArticle}>
      {article && (
        <div className="space-y-3">
          {article.thumbnail && (
            <img
              src={article.thumbnail.source}
              alt={article.title}
              className="w-full h-32 object-cover rounded-button transition-all duration-standard ease-smooth"
            />
          )}
          <div>
            <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary line-clamp-4">
              {article.extract}
            </p>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-accent-blue hover:underline"
          >
            Read more →
          </a>
        </div>
      )}
    </BaseWidget>
  );
};
