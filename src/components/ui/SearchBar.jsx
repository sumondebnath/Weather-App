import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import useCitySearch from '../../hooks/useCitySearch';

/**
 * City search with autocomplete and coordinate input support.
 *
 * @param {object} props
 * @param {(location: object) => void} props.onSelect - Called when a city or coordinate is selected
 * @param {string} [props.className]
 */
export default function SearchBar({ onSelect, className = '' }) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);

  const { results, loading, coordinateError } = useCitySearch(inputValue);

  const hasResults = results.length > 0;
  const showDropdown = isOpen && (hasResults || (loading && inputValue.length >= 2) || !!coordinateError);

  useEffect(() => {
    if (!showDropdown) return;

    function handlePointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [showDropdown]);

  const handleFocus = () => {
    if (hasResults || inputValue.length >= 2 || coordinateError) {
      setIsOpen(true);
    }
  };

  const handleSelect = useCallback(
    (city) => {
      setInputValue('');
      setIsOpen(false);
      setActiveIndex(-1);
      onSelect(city);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (!showDropdown) return;

      const items = loading ? [] : results;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < items.length) {
            handleSelect(items[activeIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setActiveIndex(-1);
          break;
        default:
          break;
      }
    },
    [showDropdown, results, loading, activeIndex, handleSelect],
  );

  const clearInput = () => {
    setInputValue('');
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} role="combobox" aria-expanded={showDropdown} aria-haspopup="listbox">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search city or coordinates (lat,lon)"
          aria-label="Search for a city or coordinates"
          aria-autocomplete="list"
          aria-controls="search-results-list"
          aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-150 focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {coordinateError && isOpen && (
        <p className="mt-1.5 text-xs text-amber-600" role="alert">
          {coordinateError}
        </p>
      )}

      {showDropdown && (
        <ul
          ref={dropdownRef}
          id="search-results-list"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {loading && (
            <li className="px-4 py-3 text-sm text-slate-500" aria-live="polite">
              Searching...
            </li>
          )}
          {!loading && !coordinateError && results.length === 0 && inputValue.length >= 2 && (
            <li className="px-4 py-3 text-sm text-slate-500">
              No cities found. Try a different search.
            </li>
          )}
          {!loading &&
            results.map((city, index) => (
              <li
                key={city.isCoordinate ? `coord-${city.lat}-${city.lon}` : `${city.name}-${city.lat}-${city.lon}`}
                id={`search-result-${index}`}
                role="option"
                aria-selected={activeIndex === index}
                onClick={() => handleSelect(city)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex items-center gap-2 px-4 py-3 text-sm cursor-pointer transition-colors duration-150 ${
                  activeIndex === index
                    ? 'bg-accent-subtle text-slate-900'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {city.isCoordinate && (
                  <MapPin className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                )}
                <span className="flex-1">
                  {city.isCoordinate ? (
                    <span>
                      <span className="font-medium">Search location</span>
                      <span className="text-slate-400 ml-1">{city.name}</span>
                    </span>
                  ) : (
                    <span>
                      <span className="font-medium">{city.name}</span>
                      {city.region && (
                        <span className="text-slate-400 ml-1">{city.region}</span>
                      )}
                      {city.country && (
                        <span className="text-slate-400 ml-1">, {city.country}</span>
                      )}
                    </span>
                  )}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
