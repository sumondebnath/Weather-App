import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

/**
 * @param {object} props
 * @param {string} [props.message='Something went wrong']
 * @param {string} [props.subMessage]
 * @param {() => void} [props.onRetry]
 * @param {string} [props.className]
 */
export default function ErrorState({
  message = 'Something went wrong',
  subMessage,
  onRetry,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 gap-4 text-center ${className}`}
      role="alert"
    >
      <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-500" aria-hidden="true" />
      </div>
      <p className="text-sm font-medium text-slate-800">{message}</p>
      {subMessage && <p className="text-sm text-slate-500 max-w-xs">{subMessage}</p>}
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Retry
        </Button>
      )}
    </div>
  );
}
