import { Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2 text-slate-900 hover:text-accent transition-colors duration-150">
          <Cloud className="w-5 h-5 text-accent" aria-hidden="true" />
          <span className="text-base font-semibold tracking-tight">Weather</span>
        </Link>
        <p className="text-xs text-slate-400 hidden sm:block">Powered by WeatherAPI</p>
      </nav>
    </header>
  );
}
