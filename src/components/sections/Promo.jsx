import { useTranslation } from 'react-i18next'

const cards = [
  {
    pct: '30%',
    color: '#5A7A2A',
    badge: '🏆',
    key: 'first',
  },
  {
    pct: '20%',
    color: '#853b20',
    badge: '⏰',
    key: 'early',
  },
  {
    pct: '10%',
    color: '#FFC200',
    badge: '👨‍👩‍👧',
    key: 'family',
  },
]

export default function Promo() {
  const { t } = useTranslation()
  const items = t('promo.cards', { returnObjects: true })

  return (
    <section id="promo" className="py-14 md:py-24 ">
      <div className="mx-auto max-w-container px-6 mt-10">
        {/* Header */}
        <div className="max-w-xl ">
          <span className="inline-flex items-center gap-2 rounded-full border border-green/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            {t('promo.tag')}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-dark md:text-5xl">
            {t('promo.title')}
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const item = items[i]
            return (
              <div
                key={c.key}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-dark/8 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                {/* Top accent line */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl" style={{ backgroundColor: c.color }} />

                {/* Badge */}
                <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
                  style={{ backgroundColor: c.color + '15' }}>
                  {c.badge}
                </span>

                {/* Percentage */}
                <div className="flex items-end gap-1 leading-none">
                  <span
                    className="font-serif text-[80px] font-bold leading-none"
                    style={{ color: c.color }}
                  >
                    {c.pct}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-dark/8" />

                {/* Title */}
                <h3 className="font-serif text-xl font-bold leading-snug text-dark">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>

                {/* CTA link */}
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: c.color }}
                >
                  {t('promo.cta')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
