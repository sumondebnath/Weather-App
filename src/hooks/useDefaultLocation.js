import { useState, useEffect, useCallback } from 'react';
import useGeolocation from './useGeolocation';
import { fetchWeatherData } from '../api/weatherApi';
import { DEFAULT_LOCATION } from '../constants';

/**
 * Coordinates the initial location resolution chain:
 * 1. Try browser geolocation
 * 2. Fall back to IP-based auto-detect
 * 3. Surface error if both fail
 *
 * @returns {{ query: string | null, status: 'detecting' | 'resolved' | 'error', errorMessage: string | null }}
 */
export default function useDefaultLocation() {
  const { coords, status: geoStatus } = useGeolocation();
  const [query, setQuery] = useState(null);
  const [status, setStatus] = useState('detecting');
  const [errorMessage, setErrorMessage] = useState(null);

  const tryAutoIp = useCallback(async () => {
    try {
      await fetchWeatherData(DEFAULT_LOCATION);
      setQuery(DEFAULT_LOCATION);
      setStatus('resolved');
    } catch {
      setQuery(null);
      setStatus('error');
      setErrorMessage("Couldn't detect your location. Search for a city instead.");
    }
  }, []);

  const tryGeolocationCoords = useCallback(async (coordQuery) => {
    try {
      await fetchWeatherData(coordQuery);
      setQuery(coordQuery);
      setStatus('resolved');
    } catch {
      tryAutoIp();
    }
  }, [tryAutoIp]);

  useEffect(() => {
    if (geoStatus === 'idle' || geoStatus === 'loading') {
      return;
    }

    if (geoStatus === 'success' && coords) {
      const coordQuery = `${coords.lat},${coords.lon}`;
      // tryGeolocationCoords is async — setState runs in microtask callbacks, not synchronously.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      tryGeolocationCoords(coordQuery);
      return;
    }

    if (geoStatus === 'error') {
      tryAutoIp();
    }
  }, [geoStatus, coords, tryAutoIp, tryGeolocationCoords]);

  return { query, status, errorMessage };
}
