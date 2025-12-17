/**
 * IP Info Widget
 *
 * Shows user's IP address and location information
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';

interface IPData {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  org?: string;
}

export const IPInfoWidget: React.FC = () => {
  const [ipData, setIpData] = useState<IPData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIPInfo = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Using ipapi.co - free tier allows 1000 requests/day
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('Failed to fetch IP info');

      const data = await response.json();
      setIpData({
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        timezone: data.timezone,
        org: data.org,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load IP info');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIPInfo();
  }, [fetchIPInfo]);

  return (
    <BaseWidget
      title="IP Information"
      icon="🌐"
      loading={loading}
      error={error}
      onRefresh={fetchIPInfo}
    >
      {ipData && (
        <div className="space-y-3">
          <div className="text-center p-3 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth">
            <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary mb-1">
              Your IP Address
            </p>
            <p className="text-2xl font-bold text-accent-blue">{ipData.ip}</p>
          </div>

          <div className="space-y-1">
            {ipData.city && (
              <div className="flex justify-between text-sm p-2 rounded-button bg-surface-light-elevated dark:bg-surface-dark transition-all duration-standard ease-smooth">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">Location</span>
                <span className="font-medium text-text-light-primary dark:text-text-dark-primary">
                  {ipData.city}, {ipData.region}
                </span>
              </div>
            )}

            {ipData.country && (
              <div className="flex justify-between text-sm p-2 rounded-button bg-surface-light-elevated dark:bg-surface-dark transition-all duration-standard ease-smooth">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">Country</span>
                <span className="font-medium text-text-light-primary dark:text-text-dark-primary">
                  {ipData.country}
                </span>
              </div>
            )}

            {ipData.timezone && (
              <div className="flex justify-between text-sm p-2 rounded-button bg-surface-light-elevated dark:bg-surface-dark transition-all duration-standard ease-smooth">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">Timezone</span>
                <span className="font-medium text-text-light-primary dark:text-text-dark-primary">
                  {ipData.timezone}
                </span>
              </div>
            )}

            {ipData.org && (
              <div className="flex justify-between text-sm p-2 rounded-button bg-surface-light-elevated dark:bg-surface-dark transition-all duration-standard ease-smooth">
                <span className="text-text-light-secondary dark:text-text-dark-secondary">ISP</span>
                <span className="font-medium text-text-light-primary dark:text-text-dark-primary text-xs">
                  {ipData.org}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </BaseWidget>
  );
};
