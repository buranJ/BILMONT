import { useTranslation } from 'react-i18next'

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

export default function Map() {
  const { t } = useTranslation()

  return (
    <section id="location" className="px-6 pb-24">
      <div className="mx-auto max-w-container">
        <div className="relative overflow-hidden rounded-[36px] bg-green">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-light/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-green-dark/50 blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_1.6fr]">
            {/* Left: info panel */}
            <div className="flex flex-col justify-center px-8 py-14 md:px-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3 py-1 text-xs font-medium text-cream/80 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                {t('map.tag')}
              </span>

              <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-cream md:text-4xl">
                {t('map.title')}
              </h2>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-cream/15 bg-cream/5 p-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream">
                  <PinIcon />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-cream/60">
                    {t('map.addressLabel')}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-cream">
                    {t('map.fullAddress')}
                  </p>
                </div>
              </div>

              <a
                href="https://go.2gis.com/hd4aP"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-dark transition-opacity hover:opacity-90"
              >
                {t('map.directions')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* Right: map embed */}
            <div className="relative min-h-[360px] overflow-hidden rounded-b-[36px] md:rounded-b-none md:rounded-r-[36px]">
              <iframe
                title="Bilmont School — Молодая Гвардия 27, Бишкек"
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aee40fd49ddfaaaa914092abc7b3a6f09d3ab420a34cea83f177b7a47b04495e3&source=constructor"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
