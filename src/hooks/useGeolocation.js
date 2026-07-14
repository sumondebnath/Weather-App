import { useState, useEffect } from 'react';

const GEOLOCATION_TIMEOUT = 10000;

/**
 * Wraps the browser Geolocation API in a Promise-based hook.
 * Returns coordinates on success, or an error on failure/denial/timeout.
 *
 * @returns {{ coords: { lat: number, lon: number } | null, error: string | null, status: 'idle' | 'loading' | 'success' | 'error' }}
 */
export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!navigator.geolocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError('Geolocation is not supported by this browser.');
      setStatus('error');
      return;
    }

    let cancelled = false;

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (cancelled) return;
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setStatus('success');
      },
      (err) => {
        if (cancelled) return;
        let message;
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = 'Location permission denied.';
            break;
          case err.POSITION_UNAVAILABLE:
            message = 'Location information unavailable.';
            break;
          case err.TIMEOUT:
            message = 'Location request timed out.';
            break;
          default:
            message = 'An unknown location error occurred.';
        }
        setError(message);
        setStatus('error');
      },
      {
        enableHighAccuracy: true,
        timeout: GEOLOCATION_TIMEOUT,
        maximumAge: 0,
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return { coords, error, status };
}
