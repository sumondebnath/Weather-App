import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWeatherData } from '../api/weatherApi';
import { toast } from 'sonner';
import { API_ERROR_CODES, GENERIC_ERROR_MESSAGES } from '../constants';

/**
 * Manages fetching and caching weather data for a given query.
 * Skips fetching when query is null (e.g. while location is resolving).
 *
 * @param {string | null} query - Location query (city name, coords, IP auto-detect), or null to skip
 * @returns {{ data, loading, error, refetch }}
 */
export default function useWeather(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const fetchData = useCallback(async (q, signal) => {
    try {
      const result = await fetchWeatherData(q);
      if (mountedRef.current && !signal?.aborted) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current && !signal?.aborted) {
        const message =
          API_ERROR_CODES[err.code] || err.message || GENERIC_ERROR_MESSAGES.api;
        setError({ message, code: err.code });
        toast.error(message);
      }
    } finally {
      if (mountedRef.current && !signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    abortRef.current = controller;

    // setLoading is synchronous here to immediately show skeleton UI on query change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetchData(query, controller.signal);

    return () => {
      controller.abort();
    };
  }, [query, fetchData]);

  const refetch = useCallback(() => {
    if (query) {
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      fetchData(query, controller.signal);
    }
  }, [query, fetchData]);

  return { data, loading, error, refetch };
}
