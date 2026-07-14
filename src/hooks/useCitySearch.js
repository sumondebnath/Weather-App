import { useState, useEffect, useCallback, useRef } from 'react';
import { searchCities } from '../api/weatherApi';
import useDebounce from './useDebounce';
import { DEBOUNCE_DELAY, SEARCH_MIN_CHARS } from '../constants';
import { parseCoordinateInput } from '../utils/validators';

/**
 * Manages city search with debounced autocomplete and coordinate input detection.
 * @param {string} searchTerm - Raw input from user
 * @returns {{ results, loading, error, coordinateError }}
 */
export default function useCitySearch(searchTerm) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinateError, setCoordinateError] = useState(null);
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  const debouncedSearch = useDebounce(searchTerm, DEBOUNCE_DELAY);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const fetchCities = useCallback(async (term, signal) => {
    if (!term || term.length < SEARCH_MIN_CHARS) {
      if (mountedRef.current) {
        setResults([]);
        setLoading(false);
      }
      return;
    }

    try {
      const data = await searchCities(term);
      if (mountedRef.current && !signal?.aborted) {
        setResults(data);
        setError(null);
      }
    } catch (err) {
      if (mountedRef.current && !signal?.aborted) {
        setError(err.message);
        setResults([]);
      }
    } finally {
      if (mountedRef.current && !signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCoordinateError(null);

    if (!debouncedSearch || debouncedSearch.length < SEARCH_MIN_CHARS) {
      setResults([]);
      setLoading(false);
      return;
    }

    const parsed = parseCoordinateInput(debouncedSearch);

    if (parsed.isCoordinateFormat) {
      if (parsed.valid) {
        setResults([{
          name: `${parsed.lat}, ${parsed.lon}`,
          region: '',
          country: '',
          lat: parsed.lat,
          lon: parsed.lon,
          isCoordinate: true,
        }]);
        setError(null);
        setLoading(false);
      } else {
        setResults([]);
        setCoordinateError('Enter coordinates as latitude,longitude (e.g. 23.81,90.41)');
        setLoading(false);
      }
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    fetchCities(debouncedSearch, controller.signal);

    return () => {
      controller.abort();
    };
  }, [debouncedSearch, fetchCities]);

  return { results, loading, error, coordinateError };
}
