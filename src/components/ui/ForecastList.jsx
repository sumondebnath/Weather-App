import WeatherCard from './WeatherCard';
import useUnit from '../../hooks/useUnit';
import { formatDayName } from '../../utils/formatters';

/**
 * @param {object} props
 * @param {Array} props.forecast - Array of forecast day objects from WeatherAPI
 * @param {string} [props.className]
 */
export default function ForecastList({ forecast = [], className = '' }) {
  const { unit } = useUnit();

  if (!forecast.length) return null;

  return (
    <div className={`flex flex-col gap-1 ${className}`} role="list" aria-label="7-day forecast">
      {forecast.map((day, index) => (
        <div key={day.date || index} role="listitem">
          <WeatherCard
            variant="daily"
            label={index === 0 ? 'Today' : formatDayName(day.date)}
            tempC={day.day?.avgtemp_c}
            maxTempC={day.day?.maxtemp_c}
            minTempC={day.day?.mintemp_c}
            conditionCode={day.day?.condition?.code}
            isDay
            conditionText={day.day?.condition?.text}
            unit={unit}
          />
        </div>
      ))}
    </div>
  );
}
