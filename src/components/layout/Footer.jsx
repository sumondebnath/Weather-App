export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Weather App
        </p>
        <p className="text-xs text-slate-400">
          Data provided by{' '}
          <a
            href="https://www.weatherapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600 transition-colors duration-150"
          >
            WeatherAPI.com
          </a>
        </p>
      </div>
    </footer>
  );
}
