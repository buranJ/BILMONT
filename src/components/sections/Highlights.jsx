import { useTranslation } from 'react-i18next'

/** Accent dot colour per highlight card on mobile (project palette). */
const ACCENTS = ['#2A4A5A', '#5A7A2A', '#853b20']

/**
 * Highlight strip beneath the hero slider. On mobile each highlight is a neat,
 * self-contained card (accent dot + title + description); from `sm` up it
 * collapses into a clean three-column row with thin vertical dividers.
 */
export default function Highlights() {
  const { t } = useTranslation()
  const items = t('highlights.items', { returnObjects: true })

  return (
    <section className="mx-auto max-w-3xl px-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0">
        {items.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border border-dark/10 bg-white/60 p-5 text-left shadow-sm sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:px-6 sm:text-center sm:shadow-none ${
              i > 0 ? 'sm:border-l sm:border-dark/10' : ''
            }`}
          >
            <div className="flex items-center gap-2.5 sm:block">
              <span
                className="h-2 w-2 shrink-0 rounded-full sm:hidden"
                style={{ backgroundColor: ACCENTS[i] }}
              />
              <h3 className="font-serif text-base font-bold text-dark sm:font-sans sm:text-sm sm:font-semibold">
                {item.title}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:mx-auto sm:max-w-[16rem] sm:text-xs">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
