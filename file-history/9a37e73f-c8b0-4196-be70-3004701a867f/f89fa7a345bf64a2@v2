/**
 * Crypto Price Tracker Widget
 *
 * Displays BTC, ETH, SOL prices with 24h change
 * https://api.coingecko.com/api/v3/simple/price
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';
import { useWidgetStore } from '../../stores/useWidgetStore';

interface CryptoPrice {
  usd: number;
  usd_24h_change: number;
}

interface CryptoData {
  bitcoin: CryptoPrice;
  ethereum: CryptoPrice;
  solana: CryptoPrice;
}

export const CryptoWidget: React.FC = () => {
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const settings = useWidgetStore((state) => state.getWidgetSettings('crypto'));

  const fetchCrypto = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
      );
      if (!response.ok) throw new Error('Failed to fetch crypto prices');

      const data = await response.json();
      setCrypto(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prices');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCrypto();
  }, [fetchCrypto]);

  // Auto-refresh (crypto prices change frequently)
  useEffect(() => {
    if (!settings.refreshRate) return;

    const interval = setInterval(() => {
      fetchCrypto();
    }, settings.refreshRate * 60 * 1000);

    return () => clearInterval(interval);
  }, [settings.refreshRate, fetchCrypto]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-status-success';
    if (change < 0) return 'text-status-error';
    return 'text-text-light-secondary dark:text-text-dark-secondary';
  };

  return (
    <BaseWidget
      title="Crypto Tracker"
      icon="₿"
      loading={loading}
      error={error}
      onRefresh={fetchCrypto}
    >
      {crypto && (
        <div className="space-y-3">
          {/* Bitcoin */}
          <div className="flex items-center justify-between p-3 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
            <div className="flex items-center gap-2">
              <span className="text-2xl">₿</span>
              <div>
                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                  Bitcoin
                </p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  {formatPrice(crypto.bitcoin.usd)}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium ${getChangeColor(crypto.bitcoin.usd_24h_change)}`}>
              {formatChange(crypto.bitcoin.usd_24h_change)}
            </span>
          </div>

          {/* Ethereum */}
          <div className="flex items-center justify-between p-3 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
            <div className="flex items-center gap-2">
              <span className="text-2xl">Ξ</span>
              <div>
                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                  Ethereum
                </p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  {formatPrice(crypto.ethereum.usd)}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium ${getChangeColor(crypto.ethereum.usd_24h_change)}`}>
              {formatChange(crypto.ethereum.usd_24h_change)}
            </span>
          </div>

          {/* Solana */}
          <div className="flex items-center justify-between p-3 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
            <div className="flex items-center gap-2">
              <span className="text-2xl">◎</span>
              <div>
                <p className="font-semibold text-text-light-primary dark:text-text-dark-primary">
                  Solana
                </p>
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  {formatPrice(crypto.solana.usd)}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium ${getChangeColor(crypto.solana.usd_24h_change)}`}>
              {formatChange(crypto.solana.usd_24h_change)}
            </span>
          </div>
        </div>
      )}
    </BaseWidget>
  );
};
