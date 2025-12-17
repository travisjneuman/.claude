/**
 * Stock Market Widget
 * Real-time stock prices using Yahoo Finance API (free, no rate limits)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
}

const DEFAULT_STOCKS = ['AAPL', 'GOOGL', 'TSLA', 'MSFT'];

export const StockMarketWidget: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Using Yahoo Finance API (free, no authentication needed)
      const stockPromises = DEFAULT_STOCKS.map(async (symbol) => {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
        );
        if (!response.ok) throw new Error('Failed to fetch stock data');

        const data = await response.json();
        const quote = data.chart.result[0];
        const meta = quote.meta;
        const currentPrice = meta.regularMarketPrice || 0;
        const previousClose = meta.chartPreviousClose || meta.previousClose || 0;
        const change = currentPrice - previousClose;
        const percentChange = previousClose > 0 ? (change / previousClose) * 100 : 0;

        return {
          symbol,
          price: currentPrice,
          change,
          percentChange,
        };
      });

      const stockData = await Promise.all(stockPromises);
      setStocks(stockData);
    } catch (err) {
      setError('Failed to fetch stock data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 60000); // Every minute
    return () => clearInterval(interval);
  }, [fetchStocks]);

  return (
    <BaseWidget title="Stock Market" icon="📈" loading={loading} error={error} onRefresh={fetchStocks}>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="flex justify-between items-center p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth"
          >
            <div>
              <div className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                {stock.symbol}
              </div>
              <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                ${stock.price.toFixed(2)}
              </div>
            </div>
            <div className={`text-right ${stock.change >= 0 ? 'text-status-success' : 'text-status-error'}`}>
              <div className="font-semibold">
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
              </div>
              <div className="text-sm">
                {stock.percentChange >= 0 ? '+' : ''}{stock.percentChange.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
};
