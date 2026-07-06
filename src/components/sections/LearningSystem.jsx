import { useTranslation } from 'react-i18next'

/**
 * Branded line icons for the three pillars (replacing the generic emoji):
 * a target, a chip/robot, and a heart — drawn in the school's olive green.
 */
const PILLAR_ICONS = [
  // AI personalization — target
  <g key="t" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
  </g>,
  // STEM & robotics — chip
  <g key="c" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 6V3.5M15 6V3.5M9 20.5V18M15 20.5V18M6 9H3.5M6 15H3.5M20.5 9H18M20.5 15H18" />
  </g>,
  // Guidance & SEL — heart
  <path
    key="h"
    d="M12 20s-7-4.6-7-9.6A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 7 3.4C19 15.4 12 20 12 20z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinejoin="round"
  />,
]

/**
 * Line icons for the 6 Development Compass dimensions, keyed by their stable
 * letter (A/S/E/B/T/L) so the mapping holds across all three languages.
 */
const DIMENSION_ICONS = {
  // Academic growth — graduation cap
  A: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 5 2.5 9.2 12 13.4 21.5 9.2 12 5Z" />
      <path d="M6.5 11.2v4.3c0 1 2.5 2.2 5.5 2.2s5.5-1.2 5.5-2.2v-4.3" />
      <path d="M21.5 9.2v4.4" />
    </g>
  ),
  // Social skills — two people
  S: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6" />
      <path d="M17 13.4a5.5 5.5 0 0 1 3.5 5.1" />
    </g>
  ),
  // Emotional growth — smile
  E: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 14a4.5 4.5 0 0 0 7 0" />
      <circle cx="9" cy="10" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  // Behavior — shield with check
  B: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 3 5 5.5v5c0 4.2 3 7.2 7 8.5 4-1.3 7-4.3 7-8.5v-5L12 3Z" />
      <path d="m9 11.5 2 2 3.5-3.8" />
    </g>
  ),
  // Talents & interests — star
  T: (
    <path
      d="M12 3.5l2.4 5 5.5.8-4 3.9.95 5.5L12 16.9 7.15 18.7 8.1 13.2l-4-3.9 5.5-.8L12 3.5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  ),
  // Learning style — lightbulb
  L: (
    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 17h5" />
      <path d="M10 20h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.5 1 .5 1.6h6c0-.6 0-1.2.5-1.6A6 6 0 0 0 12 3Z" />
    </g>
  ),
}

/**
 * "How learning works" section — rebranded in the school's warm, editorial
 * style (away from the cold, minimal "Apple" look):
 *  - left-aligned serif heading with an olive accent rule
 *  - three pillars as numbered cards with line icons and a green index
 *  - the Development Compass on a solid olive-green panel (brand colour),
 *    with the 6 dimensions as cream chips
 *  - the three languages as one editorial band split by hairline dividers
 *
 * Content is unchanged (the `learning` namespace).
 */
export default function LearningSystem() {
  const { t } = useTranslation()
  const pillars = t('learning.pillars', { returnObjects: true })
  const compass = t('learning.compass', { returnObjects: true })
  const languages = t('learning.languages', { returnObjects: true })

  return (
    <section id="model" className="py-14 md:py-24">
      <div className="mx-auto max-w-container px-6">
        {/* Heading in a brand-brown block. On desktop it slides up under the
            FeatureGrid portrait so the girl appears to rise out of the block;
            the block (later in the DOM) paints over her lower body while her
            upper body stays above its top edge. */}
        <div className="relative z-0 overflow-hidden rounded-[36px] bg-[rgb(133,59,32)] px-6 py-8 sm:px-10 lg:-mt-56 lg:px-14 lg:pb-12 lg:pt-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-xs font-medium text-cream ring-1 ring-cream/25">
              {t('learning.tag')}
            </span>
            <h2 className="mt-5 flex items-start gap-4 font-serif text-3xl font-bold leading-tight text-cream md:text-[2.6rem]">
              <span className="mt-2 hidden h-10 w-1.5 shrink-0 rounded-full bg-cream/50 sm:block" />
              <span>{t('learning.title')}</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/75 sm:pl-[2.375rem]">
              {t('learning.sub')}
            </p>
          </div>
        </div>

        {/* Three pillars — numbered cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-[28px] border border-green/15 bg-gradient-to-b from-white/60 to-cream p-8 transition-all hover:border-green/40 hover:shadow-lg hover:shadow-green/5"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green/10 text-green">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    {PILLAR_ICONS[i] ?? PILLAR_ICONS[0]}
                  </svg>
                </span>
                <span className="font-serif text-4xl font-bold text-green/25">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-dark">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
              <span className="mt-6 block h-px w-10 bg-green/40 transition-all group-hover:w-16" />
            </article>
          ))}
        </div>

        {/* Development Compass — olive-green brand panel */}
        <div className="mt-5 overflow-hidden rounded-[32px] bg-green p-8 md:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-3 py-1 text-xs font-medium text-cream/80">
                {compass.label}
              </span>
              <h3 className="mt-5 font-serif text-3xl font-bold text-cream md:text-4xl">
                {compass.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">
                {compass.desc}
              </p>
              <span className="mt-6 block h-px w-16 bg-cream/40" />
            </div>

            {/* 6 dimensions as cream chips */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {compass.dimensions.map((d) => (
                <div
                  key={d.k}
                  className="rounded-2xl border border-cream/15 bg-green-dark/30 p-4 text-center backdrop-blur-sm"
                >
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-cream text-green-dark">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      {DIMENSION_ICONS[d.k] ?? DIMENSION_ICONS.A}
                    </svg>
                  </span>
                  <p className="mt-3 text-xs leading-snug text-cream/90">
                    {d.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Three languages — one editorial band */}
        {/* <div className="mt-16">
          <div className="flex flex-col items-baseline gap-2 sm:flex-row sm:justify-between">
            <h3 className="font-serif text-2xl font-bold text-dark md:text-3xl">
              {languages.title}
            </h3>
            <p className="text-sm italic text-muted">{languages.sub}</p>
          </div>

          <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-[28px] border border-green/15 bg-white/40 sm:grid-cols-3">
            {languages.items.map((l, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-7 ${
                  i > 0 ? 'border-t border-green/15 sm:border-l sm:border-t-0' : ''
                }`}
              >
                <span className="text-4xl">{l.flag}</span>
                <div>
                  <p className="font-serif text-lg font-semibold text-dark">
                    {l.name}
                  </p>
                  <p className="text-sm text-muted">{l.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  )
}
