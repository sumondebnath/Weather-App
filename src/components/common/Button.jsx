/**
 * @param {object} props
 * @param {'button'|'submit'|'reset'} [props.type='button']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {'primary'|'secondary'|'ghost'} [props.variant='primary']
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {string} [props.className]
 * @param {string} [props.ariaLabel]
 */
export default function Button({
  type = 'button',
  size = 'md',
  variant = 'primary',
  disabled = false,
  children,
  onClick,
  className = '',
  ariaLabel,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-hover',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
