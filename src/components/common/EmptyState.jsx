import { CloudOff } from 'lucide-react';

/**
 * @param {object} props
 * @param {string} [props.message='No data available']
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className]
 */
export default function EmptyState({ message = 'No data available', icon, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 gap-4 text-center ${className}`}
      role="status"
    >
      <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center">
        {icon || <CloudOff className="w-7 h-7 text-slate-400" aria-hidden="true" />}
      </div>
      <p className="text-sm text-slate-500 max-w-xs">{message}</p>
    </div>
  );
}
