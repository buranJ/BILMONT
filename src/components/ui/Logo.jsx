/**
 * Bilmont "B" mark — two stacked rounded shapes in the brand olive green.
 *
 * @param {object} props
 * @param {number} [props.size=28]   Pixel width/height of the square mark.
 * @param {string} [props.color]     Fill color (defaults to brand green).
 */
export default function Logo({ size = 28, color = '#5A7A2A' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1322 1322"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill={color}
        d="M409 300h345a205 205 0 0 1 0 410H451a42 42 0 0 1-42-42V300z"
      />
      <path
        fill={color}
        d="M409 670h375a200 200 0 0 1 0 400H451a42 42 0 0 1-42-42V670z"
      />
    </svg>
  )
}
