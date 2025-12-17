/**
 * AI News Widget
 * Latest AI research papers from arXiv
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface Paper {
  title: string;
  authors: string[];
  summary: string;
  link: string;
  published: string;
}

export const AINewsWidget: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPapers = useCallback(async (retryCount = 0) => {
    setLoading(true);
    setError(null);

    try {
      // arXiv API - search for AI/ML papers
      const response = await fetch(
        'https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL&sortBy=submittedDate&sortOrder=descending&max_results=5',
        {
          signal: AbortSignal.timeout(10000) // 10 second timeout
        }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const text = await response.text();

      // Check if response is actually XML
      if (!text.includes('<?xml')) {
        throw new Error('Invalid XML response');
      }

      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'application/xml');

      // Check for XML parsing errors
      const parseError = xml.querySelector('parsererror');
      if (parseError) {
        throw new Error('XML parsing error');
      }

      const entries = xml.querySelectorAll('entry');

      if (entries.length === 0) {
        throw new Error('No papers found');
      }

      const paperList: Paper[] = [];
      entries.forEach((entry) => {
        const title = entry.querySelector('title')?.textContent?.trim() || '';
        const summary = entry.querySelector('summary')?.textContent?.trim() || '';
        const link = entry.querySelector('id')?.textContent || '';
        const published = entry.querySelector('published')?.textContent || '';

        const authors: string[] = [];
        entry.querySelectorAll('author name').forEach((author) => {
          const name = author.textContent?.trim();
          if (name) authors.push(name);
        });

        if (title) {
          paperList.push({
            title: title.replace(/\s+/g, ' '),
            authors: authors.slice(0, 3),
            summary: summary.replace(/\s+/g, ' ').slice(0, 150) + '...',
            link,
            published: new Date(published).toLocaleDateString(),
          });
        }
      });

      setPapers(paperList);
    } catch (err) {
      // Retry once on failure
      if (retryCount === 0) {
        console.log('arXiv API failed, retrying...');
        setTimeout(() => fetchPapers(1), 1000);
      } else {
        setError('Failed to load papers. Please try refreshing.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  return (
    <BaseWidget title="AI Research" icon="🤖" loading={loading} error={error} onRefresh={fetchPapers}>
      <div className="space-y-3">
        {papers.map((paper, idx) => (
          <a
            key={idx}
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button hover:bg-surface-light dark:hover:bg-surface-dark-elevated transition-all duration-standard ease-smooth"
          >
            <h3 className="font-semibold text-text-light-primary dark:text-text-dark-primary text-sm line-clamp-2 mb-1">
              {paper.title}
            </h3>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
              {paper.authors.join(', ')}
              {paper.authors.length === 3 && ' et al.'}
            </p>
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary line-clamp-2">
              {paper.summary}
            </p>
            <p className="text-xs text-accent-blue mt-1">{paper.published}</p>
          </a>
        ))}
      </div>
    </BaseWidget>
  );
};
