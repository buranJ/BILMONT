/**
 * Pill button matching the Flowblox CTA style.
 *
 * Variants:
 *  - primary : dark pill, white text, hovers to brand green
 *  - outline : transparent with a subtle border
 *  - ghost   : text-only, no background
 *
 * @param {object} props
 * @param {'primary'|'outline'|'ghost'} [props.variant='primary']
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.arrow=false]  Show a trailing arrow pill.
 * @param {string} [props.href]          Render as an anchor when provided.
 * @param {string} [props.className]
 */
export default function Button({
  variant = 'primary',
  children,
  arrow = false,
  href,
  className = '',
  ...rest
}) {
  const base =
    'group inline-flex items-center gap-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap'

  const sizing = arrow ? 'pl-6 pr-2 py-2' : 'px-6 py-3'

  const variants = {
    primary: 'bg-dark text-cream hover:bg-green',
    outline: 'border border-dark/15 text-dark hover:border-dark/40 px-6 py-3',
    ghost: 'text-dark hover:text-green px-2 py-1',
  }

  const cls = `${base} ${variant === 'primary' ? sizing : ''} ${variants[variant]} ${className}`

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream transition-transform duration-300 group-hover:translate-x-0.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }

  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
