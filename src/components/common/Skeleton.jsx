/**
 * Reusable skeleton loader component.
 *
 * @param {object} props
 * @param {'text'|'circle'|'rect'|'card'} [props.variant='rect']
 * @param {string} [props.width]
 * @param {string} [props.height]
 * @param {string} [props.className]
 */
export default function Skeleton({ variant = 'rect', width, height, className = '' }) {
  const base = 'animate-pulse bg-slate-200 rounded-lg';

  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
    card: 'rounded-xl h-48',
  };

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`${base} ${variants[variant]} ${className}`}
      style={{ width, height }}
    />
  );
}
