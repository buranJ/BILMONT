import { useTranslation } from 'react-i18next'

/**
 * Interior gallery — a warm editorial mosaic of the school's spaces.
 *
 * Six photos (d-1.jpg … d-6.jpg) are laid out on a 12-column grid with
 * varied spans that tile without gaps, each with a soft hover zoom.
 * Falls back gracefully if an image is missing.
 */

// [src, span classes] — spans tile the 12-col / 2-row blocks seamlessly.
const PHOTOS = [
  ['d-1.jpg', 'sm:col-span-8 sm:row-span-2'],
  ['d-2.jpg', 'sm:col-span-4'],
  ['d-3.jpg', 'sm:col-span-4'],
  ['d-4.jpg', 'sm:col-span-4 sm:row-span-2'],
  ['d-5.jpg', 'sm:col-span-8'],
  ['d-6.jpg', 'sm:col-span-8'],
]

export default function Interior() {
  const { t } = useTranslation()

  return (
    <section id="interior" className="py-24">
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
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:auto-rows-[190px]">
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
