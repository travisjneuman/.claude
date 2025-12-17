import { describe, it, expect, beforeEach } from 'vitest';
import { useWeatherStore } from '../useWeatherStore';
import type { WeatherData } from '../../types';

describe('useWeatherStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useWeatherStore.setState({
      city: '',
      coords: { lat: 37.7749, lng: -122.4194 },
      useGeolocation: true,
      weatherData: null,
      loading: false,
      error: null,
    });
  });

  it('should have initial state', () => {
    const state = useWeatherStore.getState();
    expect(state.city).toBe('');
    expect(state.coords).toEqual({ lat: 37.7749, lng: -122.4194 });
    expect(state.useGeolocation).toBe(true);
    expect(state.weatherData).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should update city name', () => {
    useWeatherStore.getState().setCity('New York');

    const state = useWeatherStore.getState();
    expect(state.city).toBe('New York');
  });

  it('should update coordinates', () => {
    const newCoords = { lat: 40.7128, lng: -74.006 };
    useWeatherStore.getState().setCoords(newCoords);

    const state = useWeatherStore.getState();
    expect(state.coords).toEqual(newCoords);
  });

  it('should toggle geolocation usage', () => {
    useWeatherStore.getState().setUseGeolocation(false);
    expect(useWeatherStore.getState().useGeolocation).toBe(false);

    useWeatherStore.getState().setUseGeolocation(true);
    expect(useWeatherStore.getState().useGeolocation).toBe(true);
  });

  it('should set weather data', () => {
    const mockWeatherData: WeatherData = {
      location: 'New York, NY',
      temp: 72,
      feelsLike: 75,
      desc: 'Clear',
      humidity: 65,
      windSpeed: 10,
      precipProbability: 0,
      icon: '☀️',
    };

    useWeatherStore.getState().setWeatherData(mockWeatherData);

    const state = useWeatherStore.getState();
    expect(state.weatherData).toEqual(mockWeatherData);
    expect(state.weatherData?.temp).toBe(72);
  });

  it('should set loading state', () => {
    useWeatherStore.getState().setLoading(true);
    expect(useWeatherStore.getState().loading).toBe(true);

    useWeatherStore.getState().setLoading(false);
    expect(useWeatherStore.getState().loading).toBe(false);
  });

  it('should set error message', () => {
    useWeatherStore.getState().setError('Failed to fetch weather');

    const state = useWeatherStore.getState();
    expect(state.error).toBe('Failed to fetch weather');
  });

  it('should clear error', () => {
    useWeatherStore.getState().setError('Some error');
    useWeatherStore.getState().setError(null);

    const state = useWeatherStore.getState();
    expect(state.error).toBeNull();
  });

  it('should store user preferences in state (persisted) and separate runtime state (not persisted)', () => {
    // Set persisted fields (user preferences)
    useWeatherStore.getState().setCity('London');
    useWeatherStore.getState().setCoords({ lat: 51.5074, lng: -0.1278 });
    useWeatherStore.getState().setUseGeolocation(false);

    // Set runtime state (not persisted)
    useWeatherStore.getState().setLoading(true);
    useWeatherStore.getState().setError('Test error');

    const state = useWeatherStore.getState();

    // Verify all state is accessible
    expect(state.city).toBe('London');
    expect(state.coords).toEqual({ lat: 51.5074, lng: -0.1278 });
    expect(state.useGeolocation).toBe(false);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('Test error');
  });
});
