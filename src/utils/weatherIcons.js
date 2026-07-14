import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, CloudFog, CloudSun, CloudMoon, Moon, Snowflake } from 'lucide-react';

const CODE_MAP = {
  1000: Sun,
  1003: Cloud,
  1006: Cloud,
  1009: Cloud,
  1030: CloudFog,
  1135: CloudFog,
  1147: CloudFog,
  1063: CloudRain,
  1180: CloudRain,
  1183: CloudRain,
  1186: CloudRain,
  1189: CloudRain,
  1192: CloudRain,
  1195: CloudRain,
  1198: CloudRain,
  1201: CloudRain,
  1240: CloudDrizzle,
  1243: CloudDrizzle,
  1246: CloudDrizzle,
  1273: CloudDrizzle,
  1276: CloudDrizzle,
  1087: CloudLightning,
  1279: CloudLightning,
  1282: CloudLightning,
  1114: Snowflake,
  1117: Snowflake,
  1210: Snowflake,
  1213: Snowflake,
  1216: Snowflake,
  1219: Snowflake,
  1222: Snowflake,
  1225: Snowflake,
  1255: Snowflake,
  1258: Snowflake,
  1069: CloudSnow,
  1204: CloudSnow,
  1207: CloudSnow,
  1249: CloudSnow,
  1252: CloudSnow,
  1261: CloudSnow,
  1264: CloudSnow,
};

/**
 * Maps a WeatherAPI condition code to a Lucide React icon component.
 * @param {number} code - Condition code from WeatherAPI
 * @param {boolean} [isDay=true] - Whether it's daytime
 * @returns {React.ComponentType} Lucide icon component
 */
export function getWeatherIcon(code, isDay = true) {
  if (code === 1000) return isDay ? Sun : Moon;
  if (code === 1003 || code === 1006 || code === 1009) return isDay ? CloudSun : CloudMoon;
  return CODE_MAP[code] || Cloud;
}
