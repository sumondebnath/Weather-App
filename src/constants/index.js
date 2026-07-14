export const DEFAULT_LOCATION = 'auto:ip';

export const API_ERROR_CODES = {
  1003: 'Invalid API key. Please check your configuration.',
  1004: 'API key quota has been reached. Please try again later.',
  1005: 'Weather service is currently unavailable.',
  1006: 'City not found. Please check the spelling and try again.',
  1007: 'Multiple locations match your query. Please be more specific.',
  2006: 'API key has expired. Please contact support.',
  2008: 'API key has been suspended. Please contact support.',
  9000: 'Invalid request format.',
  9001: 'Too many requests. Please slow down.',
  9002: 'Internal server error. Please try again later.',
  9999: 'An unexpected error occurred. Please try again.',
};

export const GENERIC_ERROR_MESSAGES = {
  network: 'Network error. Please check your connection and try again.',
  api: 'Something went wrong fetching weather data. Please try again.',
  unknown: 'An unexpected error occurred.',
};

export const DEBOUNCE_DELAY = 300;

export const MAX_FORECAST_DAYS = 7;

export const SEARCH_MIN_CHARS = 2;
