import { useTranslation } from 'react-i18next'

/**
 * Interior gallery — a warm editorial mosaic of the school's spaces.
 *
 * Ten photos are laid out on a 12-column grid with balanced spans that tile
 * seamlessly across five rows, each with a soft hover zoom. No cell is extreme
 * in aspect, so `object-cover` crops stay gentle. Falls back gracefully if an
 * image is missing.
 *
 * Row map (12 cols):
 *   1: [ d-1  8×2 ][ d-2 4 ]      3: [ d-4 4 ][ d-5 4×2 ][ d-6 4×2 ]
 *   2:            [ d-3 4 ]       4: [ d-7 4 ]
 *   5: [ d-8 4 ][ d-9 4 ][ d-10 4 ]
 */

// [src, span classes]
const PHOTOS = [
  ['d-10.webp', 'sm:col-span-8 sm:row-span-2'],
  ['d-2.webp', 'sm:col-span-4'],
  ['d-3.webp', 'sm:col-span-4'],
  ['d-4.webp', 'sm:col-span-4'],
  ['d-5.webp', 'sm:col-span-4 sm:row-span-2'],
  ['d-6.webp', 'sm:col-span-4 sm:row-span-2'],
  ['d-7.webp', 'sm:col-span-4'],
  ['d-8.webp', 'sm:col-span-4'],
  ['d-9.webp', 'sm:col-span-4'],
  ['d-1.webp', 'sm:col-span-4'],
]

export default function Interior() {
  const { t } = useTranslation()

  return (
    <section id="interior" className="py-14 md:py-24">
      <div className="mx-auto max-w-container px-6">
        {/* Heading — editorial, left-aligned */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-green px-3 py-1 text-xs font-medium text-cream">
            {t('interior.tag')}
          </span>
          <h2 className="mt-5 flex items-start gap-4 font-serif text-3xl font-bold leading-tight text-dark md:text-[2.6rem]">
            <span className="mt-2 hidden h-10 w-1.5 shrink-0 rounded-full bg-green sm:block" />
            <span>{t('interior.title')}</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:pl-[2.375rem]">
            {t('interior.sub')}
          </p>
        </div>

        {/* Mosaic */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:auto-rows-[230px]">
          {PHOTOS.map(([file, span], i) => (
            <figure
              key={file}
              className={`group relative h-60 overflow-hidden rounded-[24px] bg-green/10 sm:h-auto ${span}`}
            >
              <img
                src={`/assets/images/${file}`}
                alt={t('interior.tag')}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle bottom vignette on the lead image */}
              {i === 0 && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/25 to-transparent" />
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
