import { createContext, useState, useCallback } from 'react';

const UnitContext = createContext(null);

/**
 * Provides global temperature unit state.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function UnitProvider({ children }) {
  const [unit, setUnit] = useState('celsius');

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, []);

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export default UnitContext;
