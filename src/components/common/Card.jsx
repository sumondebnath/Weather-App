/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {'div'|'section'|'article'|'aside'} [props.as='div']
 * @param {string} [props.padding='p-6']
 */
export default function Card({
  children,
  className = '',
  as: Tag = 'div',
  padding = 'p-6',
}) {
  return (
    <Tag
      className={`bg-white rounded-xl border border-slate-200 shadow-sm ${padding} ${className}`}
    >
      {children}
    </Tag>
  );
}
