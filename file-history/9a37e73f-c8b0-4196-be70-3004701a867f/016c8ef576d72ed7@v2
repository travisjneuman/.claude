/**
 * Sports Scores Widget
 * Live sports scores (using free ESPN scraping approach)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface Game {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
}

export const SportsWidget: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Using ESPN's public API endpoint (no auth required)
      const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard');
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      const gameList: Game[] = data.events.slice(0, 5).map((event: any) => ({
        homeTeam: event.competitions[0].competitors.find((c: any) => c.homeAway === 'home')?.team.displayName || 'TBD',
        awayTeam: event.competitions[0].competitors.find((c: any) => c.homeAway === 'away')?.team.displayName || 'TBD',
        homeScore: parseInt(event.competitions[0].competitors.find((c: any) => c.homeAway === 'home')?.score || '0'),
        awayScore: parseInt(event.competitions[0].competitors.find((c: any) => c.homeAway === 'away')?.score || '0'),
        status: event.status.type.shortDetail || 'Scheduled',
      }));

      setGames(gameList);
    } catch (err) {
      setError('Failed to load scores. Using demo data.');
      // Fallback demo data
      setGames([
        { homeTeam: 'Lakers', awayTeam: 'Celtics', homeScore: 108, awayScore: 102, status: 'Final' },
        { homeTeam: 'Warriors', awayTeam: 'Heat', homeScore: 95, awayScore: 98, status: 'Final' },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return (
    <BaseWidget title="NBA Scores" icon="🏀" loading={loading} error={error} onRefresh={fetchScores}>
      <div className="space-y-2">
        {games.map((game, idx) => (
          <div key={idx} className="bg-surface-light-elevated dark:bg-surface-dark rounded-button p-2 transition-all duration-standard ease-smooth">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-text-light-primary dark:text-text-dark-primary font-medium">
                {game.awayTeam}
              </span>
              <span className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary">
                {game.awayScore}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-light-primary dark:text-text-dark-primary font-medium">
                {game.homeTeam}
              </span>
              <span className="text-sm font-bold text-text-light-primary dark:text-text-dark-primary">
                {game.homeScore}
              </span>
            </div>
            <div className="text-xs text-text-light-secondary dark:text-text-dark-secondary text-center mt-1 border-t border-border-light dark:border-border-dark pt-1">
              {game.status}
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
};
