import React from 'react';
import { getWeatherIcon } from '../../utils/weatherIcons';

/**
 * Renders a weather condition icon using createElement to avoid
 * the React Compiler flagging dynamic component creation during render.
 *
 * @param {object} props
 * @param {number} props.code - WeatherAPI condition code
 * @param {boolean} [props.isDay=true]
 * @param {string} [props.className]
 */
function ConditionIcon({ code, isDay = true, className = '' }) {
  const Icon = getWeatherIcon(code, isDay);
  return React.createElement(Icon, { className, 'aria-hidden': true });
}

function formatTemp(c, unit) {
  if (c == null) return '--';
  const val = unit === 'fahrenheit' ? Math.round((c * 9) / 5 + 32) : Math.round(c);
  return `${val}°`;
}

function formatTempFull(c, unit) {
  if (c == null) return '--';
  const val = unit === 'fahrenheit' ? Math.round((c * 9) / 5 + 32) : Math.round(c);
  return `${val}°${unit === 'fahrenheit' ? 'F' : 'C'}`;
}

/**
 * Reusable weather card for current, hourly, and daily views.
 *
 * @param {object} props
 * @param {'current'|'hourly'|'daily'} [props.variant='current']
 * @param {string} [props.label] - e.g. day name, hour
 * @param {number} [props.tempC] - Temperature in Celsius
 * @param {'celsius'|'fahrenheit'} [props.unit='celsius']
 * @param {number} [props.conditionCode] - WeatherAPI condition code
 * @param {boolean} [props.isDay=true]
 * @param {string} [props.conditionText]
 * @param {number} [props.maxTempC]
 * @param {number} [props.minTempC]
 * @param {string} [props.className]
 */
export default function WeatherCard({
  variant = 'current',
  label,
  tempC,
  unit = 'celsius',
  conditionCode,
  isDay = true,
  conditionText,
  maxTempC,
  minTempC,
  className = '',
}) {
  if (variant === 'current') {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        {label && <p className="text-sm text-slate-500 font-medium">{label}</p>}
        <ConditionIcon code={conditionCode} isDay={isDay} className="w-16 h-16 text-slate-400" />
        <p className="text-5xl font-semibold text-slate-900 tracking-tight" aria-label={`Temperature ${formatTempFull(tempC, unit)}`}>
          {formatTemp(tempC, unit)}
        </p>
        {conditionText && (
          <p className="text-base text-slate-600">{conditionText}</p>
        )}
      </div>
    );
  }

  if (variant === 'hourly') {
    return (
      <div className={`flex flex-col items-center gap-2 min-w-[80px] p-3 ${className}`}>
        {label && <p className="text-xs text-slate-500 font-medium">{label}</p>}
        <ConditionIcon code={conditionCode} isDay={isDay} className="w-8 h-8 text-slate-400" />
        <p className="text-lg font-semibold text-slate-900">{formatTemp(tempC, unit)}</p>
      </div>
    );
  }

  if (variant === 'daily') {
    return (
      <div className={`flex items-center justify-between gap-4 p-4 ${className}`}>
        {label && (
          <p className="text-sm font-medium text-slate-700 w-20 shrink-0">{label}</p>
        )}
        <ConditionIcon code={conditionCode} isDay={isDay} className="w-6 h-6 text-slate-400 shrink-0" />
        <div className="flex items-center gap-2 flex-1 justify-end">
          {maxTempC != null && (
            <span className="text-sm font-semibold text-slate-900">{formatTemp(maxTempC, unit)}</span>
          )}
          {minTempC != null && (
            <span className="text-sm text-slate-400">{formatTemp(minTempC, unit)}</span>
          )}
        </div>
      </div>
    );
  }

  return null;
}
