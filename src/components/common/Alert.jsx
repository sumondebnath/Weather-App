import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

/**
 * @param {object} props
 * @param {'info'|'success'|'warning'|'error'} [props.type='info']
 * @param {string} props.message
 * @param {() => void} [props.onDismiss]
 * @param {string} [props.className]
 */
export default function Alert({ type = 'info', message, onDismiss, className = '' }) {
  const config = {
    info: {
      icon: Info,
      bg: 'bg-accent-subtle border-accent/20',
      text: 'text-accent',
      iconColor: 'text-accent',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-accent-subtle border-accent/20',
      text: 'text-accent',
      iconColor: 'text-accent',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-600',
      iconColor: 'text-amber-600',
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-600',
      iconColor: 'text-red-600',
    },
  };

  const { icon: Icon, bg, text, iconColor } = config[type];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 border rounded-lg p-4 ${bg} ${className}`}
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} aria-hidden="true" />
      <p className={`text-sm flex-1 ${text}`}>{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className={`text-sm font-medium hover:underline transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded ${text} cursor-pointer`}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
