import WeatherCard from './WeatherCard';
import useUnit from '../../hooks/useUnit';
import { formatHour } from '../../utils/formatters';

/**
 * @param {object} props
 * @param {Array} props.hours - Array of hourly forecast objects from WeatherAPI
 * @param {string} [props.className]
 */
export default function HourlyForecast({ hours = [], className = '' }) {
  const { unit } = useUnit();

  if (!hours.length) return null;

  const now = new Date();
  const currentHour = now.getHours();

  const upcomingHours = hours.filter((h) => {
    const hourTime = parseInt(h.time?.split(':')[0] ?? '0', 10);
    return hourTime >= currentHour;
  });

  const displayHours = upcomingHours.length > 0 ? upcomingHours : hours.slice(0, 12);

  return (
    <div
      className={`flex overflow-x-auto gap-1 pb-2 -mx-1 px-1 snap-x snap-mandatory ${className}`}
      role="list"
      aria-label="Hourly forecast"
    >
      {displayHours.map((hour, index) => (
        <div key={hour.time || index} className="snap-start" role="listitem">
          <WeatherCard
            variant="hourly"
            label={index === 0 ? 'Now' : formatHour(hour.time)}
            tempC={hour.temp_c}
            conditionCode={hour.condition?.code}
            isDay={hour.is_day === 1}
            unit={unit}
          />
        </div>
      ))}
    </div>
  );
}
