import useUnit from '../../hooks/useUnit';

/**
 * Toggle between Celsius and Fahrenheit.
 *
 * @param {object} props
 * @param {string} [props.className]
 */
export default function UnitToggle({ className = '' }) {
  const { unit, toggleUnit } = useUnit();

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-slate-200 bg-white p-0.5 ${className}`}
      role="radiogroup"
      aria-label="Temperature unit"
    >
      <button
        type="button"
        role="radio"
        aria-checked={unit === 'celsius'}
        onClick={() => unit !== 'celsius' && toggleUnit()}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 cursor-pointer ${
          unit === 'celsius'
            ? 'bg-accent text-white'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={unit === 'fahrenheit'}
        onClick={() => unit !== 'fahrenheit' && toggleUnit()}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 cursor-pointer ${
          unit === 'fahrenheit'
            ? 'bg-accent text-white'
            : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        °F
      </button>
    </div>
  );
}
