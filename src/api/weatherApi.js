import axiosInstance from './axiosInstance';
import { MAX_FORECAST_DAYS } from '../constants';

/**
 * Fetches current weather and forecast for a location.
 * @param {string} query - City name, coordinates, or IP-based auto-detect
 * @param {number} [days=7] - Number of forecast days
 * @returns {Promise<object>} WeatherAPI response data
 */
export async function fetchWeatherData(query, days = MAX_FORECAST_DAYS) {
  const response = await axiosInstance.get('/forecast.json', {
    params: {
      q: query,
      days,
      aqi: 'no',
      alerts: 'no',
    },
  });
  return response.data;
}

/**
 * Fetches city autocomplete suggestions.
 * @param {string} partial - Partial city name to search for
 * @returns {Promise<Array>} Array of matched locations
 */
export async function searchCities(partial) {
  const response = await axiosInstance.get('/search.json', {
    params: { q: partial },
  });
  return response.data;
}
