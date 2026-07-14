import { useState, useMemo } from 'react';
import { MapPin, Droplets, Wind, Thermometer, Sun } from 'lucide-react';
import { toast } from 'sonner';

import { Card, Skeleton, Alert } from '../components/common';
import SearchBar from '../components/ui/SearchBar';
import UnitToggle from '../components/ui/UnitToggle';
import WeatherCard from '../components/ui/WeatherCard';
import ForecastList from '../components/ui/ForecastList';
import HourlyForecast from '../components/ui/HourlyForecast';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

import useWeather from '../hooks/useWeather';
import useUnit from '../hooks/useUnit';
import useDefaultLocation from '../hooks/useDefaultLocation';
import {
  formatFeelsLike,
  formatWindSpeed,
  formatFullDate,
} from '../utils/formatters';

function CurrentWeatherSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <Skeleton variant="circle" width="64px" height="64px" />
        <Skeleton variant="text" width="120px" height="48px" />
        <Skeleton variant="text" width="100px" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} padding="p-4">
            <Skeleton variant="text" width="80px" className="mb-2" />
            <Skeleton variant="text" width="60px" height="24px" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 7 }).map((_, i) => (
        <Card key={i} padding="p-4">
          <div className="flex items-center justify-between">
            <Skeleton variant="text" width="80px" />
            <Skeleton variant="circle" width="24px" height="24px" />
            <div className="flex gap-2">
              <Skeleton variant="text" width="40px" />
              <Skeleton variant="text" width="40px" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function HourlySkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 min-w-[80px] p-3">
          <Skeleton variant="text" width="40px" />
          <Skeleton variant="circle" width="32px" height="32px" />
          <Skeleton variant="text" width="36px" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { query: defaultQuery, status: locationStatus, errorMessage: locationError } = useDefaultLocation();
  const [manualQuery, setManualQuery] = useState(null);

  const activeQuery = manualQuery ?? defaultQuery;
  const { unit } = useUnit();
  const { data, loading, error, refetch } = useWeather(activeQuery);

  const handleCitySelect = (city) => {
    const q = `${city.name}, ${city.country}`;
    setManualQuery(q);
    toast.success(`Weather for ${city.name} loaded`);
  };

  const current = data?.current;
  const location = data?.location;
  const forecastDays = data?.forecast?.forecastday ?? [];
  const todayHours = forecastDays[0]?.hour ?? [];

  const isLoadingLocation = locationStatus === 'detecting';
  const isLoadingWeather = loading;
  const showSkeleton = isLoadingLocation || isLoadingWeather;

  const stats = useMemo(() => {
    if (!current) return [];
    return [
      {
        label: 'Feels like',
        value: formatFeelsLike(current.feelslike_c, unit),
        icon: Thermometer,
      },
      {
        label: 'Humidity',
        value: `${current.humidity}%`,
        icon: Droplets,
      },
      {
        label: 'Wind',
        value: formatWindSpeed(current.wind_kph, unit === 'fahrenheit' ? 'imperial' : 'metric'),
        icon: Wind,
      },
      {
        label: 'UV Index',
        value: `${current.uv ?? '--'}`,
        icon: Sun,
      },
    ];
  }, [current, unit]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <SearchBar onSelect={handleCitySelect} className="flex-1 w-full sm:max-w-md" />
        <UnitToggle />
      </section>

      {locationStatus === 'error' && !showSkeleton && (
        <Alert
          type="warning"
          message={locationError}
        />
      )}

      {error && !showSkeleton && !data && (
        <ErrorState
          message={error.message}
          subMessage="Please try again."
          onRetry={refetch}
        />
      )}

      {showSkeleton && (
        <>
          <CurrentWeatherSkeleton />
          <div>
            <Skeleton variant="text" width="160px" height="20px" className="mb-4" />
            <HourlySkeleton />
          </div>
          <div>
            <Skeleton variant="text" width="140px" height="20px" className="mb-4" />
            <ForecastSkeleton />
          </div>
        </>
      )}

      {!showSkeleton && !data && !error && (
        <EmptyState message="Search for a city to see the weather forecast." />
      )}

      {!showSkeleton && data && (
        <>
          <section aria-label="Current weather">
            <Card>
              <div className="flex flex-col items-center gap-2 mb-6">
                {location && (
                  <div className="flex items-center gap-1.5 text-slate-500 mb-2">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    <span className="text-sm">
                      {location.name}
                      {location.region && location.region !== location.name
                        ? `, ${location.region}`
                        : ''}
                      {location.country ? `, ${location.country}` : ''}
                    </span>
                  </div>
                )}

                <WeatherCard
                  variant="current"
                  label={location ? formatFullDate(location.localtime?.split(' ')[0]) : undefined}
                  tempC={current?.temp_c}
                  unit={unit}
                  conditionCode={current?.condition?.code}
                  isDay={current?.is_day === 1}
                  conditionText={current?.condition?.text}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-1.5 bg-slate-50 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <stat.icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="text-xs font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {todayHours.length > 0 && (
            <section aria-label="Hourly forecast">
              <h2 className="text-base font-semibold text-slate-800 mb-3">
                Hourly Forecast
              </h2>
              <Card padding="p-3">
                <HourlyForecast hours={todayHours} />
              </Card>
            </section>
          )}

          {forecastDays.length > 0 && (
            <section aria-label="7-day forecast">
              <h2 className="text-base font-semibold text-slate-800 mb-3">
                7-Day Forecast
              </h2>
              <Card padding="p-2">
                <ForecastList forecast={forecastDays} />
              </Card>
            </section>
          )}

          {!loading && error && (
            <Alert
              type="error"
              message={error.message}
            />
          )}
        </>
      )}
    </div>
  );
}
