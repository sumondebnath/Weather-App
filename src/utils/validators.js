const COORD_PATTERN = /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/;

/**
 * Checks if a string looks like a coordinate input (latitude,longitude).
 * @param {string} value - Raw input string
 * @returns {{ valid: boolean, lat: number | null, lon: number | null, isCoordinateFormat: boolean }}
 */
export function parseCoordinateInput(value) {
  if (!value || typeof value !== 'string') {
    return { valid: false, lat: null, lon: null, isCoordinateFormat: false };
  }

  const match = value.match(COORD_PATTERN);
  if (!match) {
    return { valid: false, lat: null, lon: null, isCoordinateFormat: false };
  }

  const lat = parseFloat(match[1]);
  const lon = parseFloat(match[2]);

  const latValid = lat >= -90 && lat <= 90;
  const lonValid = lon >= -180 && lon <= 180;

  return {
    valid: latValid && lonValid,
    lat,
    lon,
    isCoordinateFormat: true,
  };
}
