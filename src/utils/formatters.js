/**
 * Converts Celsius to Fahrenheit.
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

/**
 * Formats a temperature value based on the current unit.
 * @param {number} tempC - Temperature in Celsius
 * @param {'celsius'|'fahrenheit'} unit - Target unit
 * @returns {string} Formatted temperature with unit symbol
 */
function formatTemperature(tempC, unit) {
  if (tempC == null) return '--';
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(tempC) : Math.round(tempC);
  const symbol = unit === 'fahrenheit' ? '°F' : '°C';
  return `${value}${symbol}`;
}

/**
 * Formats a date string to a short day name.
 * @param {string} dateStr - ISO date string (e.g. "2024-01-15")
 * @returns {string} Short day name (e.g. "Mon")
 */
export function formatDayName(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

/**
 * Formats a date string to a long date.
 * @param {string} dateStr - ISO date string (e.g. "2024-01-15")
 * @returns {string} Formatted date (e.g. "Jan 15, 2024")
 */
export function formatFullDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Formats an ISO time string (HH:mm) to 12-hour format.
 * @param {string} timeStr - Time string from API (e.g. "14:00")
 * @returns {string} Formatted time (e.g. "2 PM")
 */
export function formatHour(timeStr) {
  if (!timeStr) return '';
  const [hours] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  if (hour === 0) return '12 AM';
  if (hour === 12) return '12 PM';
  return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
}

/**
 * Formats wind speed with the appropriate unit.
 * @param {number} speedKph - Wind speed in km/h
 * @param {'metric'|'imperial'} system - Unit system
 * @returns {string} Formatted wind speed
 */
export function formatWindSpeed(speedKph, system = 'metric') {
  if (speedKph == null) return '--';
  if (system === 'imperial') {
    const mph = Math.round(speedKph * 0.621371);
    return `${mph} mph`;
  }
  return `${Math.round(speedKph)} km/h`;
}

/**
 * Formats the feels-like temperature for display.
 * @param {number} tempC - Feels-like temp in Celsius
 * @param {'celsius'|'fahrenheit'} unit - Target unit
 * @returns {string} Formatted feels-like string
 */
export function formatFeelsLike(tempC, unit) {
  return `Feels like ${formatTemperature(tempC, unit)}`;
}
