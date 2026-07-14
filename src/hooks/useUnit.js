import { useContext } from 'react';
import UnitContext from '../contexts/UnitContext';

/**
 * @returns {{ unit: 'celsius'|'fahrenheit', toggleUnit: () => void }}
 */
export default function useUnit() {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
}
