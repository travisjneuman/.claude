/**
 * Weather Forecast Widget
 *
 * 5-day weather forecast using Open-Meteo API
 */

import React, { useState, useEffect, useCallback } from 'react';
import { BaseWidget } from './BaseWidget';
import { useWeatherStore } from '../../stores/useWeatherStore';
import { useSettingsStore, formatTemperature } from '../../stores/useSettingsStore';

interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

export const WeatherForecastWidget: React.FC = () => {
  const { coords } = useWeatherStore();
  const temperatureUnit = useSettingsStore((state) => state.temperatureUnit);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Use user's location from weather store with timezone=auto for correct dates
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit&timezone=auto`
      );
      if (!response.ok) throw new Error('Failed to fetch forecast');

      const data = await response.json();
      // Skip today (index 0), show next 5 days (indices 1-5)
      const days: ForecastDay[] = data.daily.time.slice(1, 6).map((date: string, i: number) => ({
        date,
        tempMax: Math.round(data.daily.temperature_2m_max[i + 1]),
        tempMin: Math.round(data.daily.temperature_2m_min[i + 1]),
        weatherCode: data.daily.weathercode[i + 1],
      }));

      setForecast(days);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load forecast');
    } finally {
      setLoading(false);
    }
  }, [coords.lat, coords.lng]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    return '🌤️';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <BaseWidget
      title="Weather Forecast"
      icon="🌤️"
      loading={loading}
      error={error}
      onRefresh={fetchForecast}
    >
      {forecast.length > 0 && (
        <div className="space-y-2">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="flex items-center justify-between p-2 bg-surface-light-elevated dark:bg-surface-dark rounded-button transition-all duration-standard ease-smooth"
            >
              <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary min-w-[80px]">
                {formatDate(day.date)}
              </span>
              <span className="text-2xl">{getWeatherIcon(day.weatherCode)}</span>
              <div className="flex gap-2 text-sm font-medium text-text-light-primary dark:text-text-dark-primary">
                <span>{formatTemperature(day.tempMax, temperatureUnit, false)}</span>
                <span className="text-text-light-secondary dark:text-text-dark-secondary">
                  {formatTemperature(day.tempMin, temperatureUnit, false)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </BaseWidget>
  );
};
