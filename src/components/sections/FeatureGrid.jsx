import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Reveals its target once it scrolls into view. Returns a ref to attach and a
 * `shown` flag. Honours `prefers-reduced-motion` by showing immediately.
 */
function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, shown]
}

/** Feathered, frame-less portrait — its soft studio background dissolves into
 *  the page via a radial mask so the figure appears to float. */
const PHOTO_MASK =
  'radial-gradient(ellipse 60% 72% at 50% 44%, #000 58%, rgba(0,0,0,0) 100%)'

/** Accent dot colour per feature card on mobile (project palette). */
const MOBILE_ACCENTS = ['#2A4A5A', '#5A7A2A', '#853b20', '#C99A00']

/** A single minimalist feature: title + description, no card, no icon.
 *  `align` controls text alignment; reveal slides it in from `side`. */
function Feature({ title, desc, align, side, shown, delay = 0 }) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${align} ${
        shown
          ? 'translate-x-0 opacity-100'
          : `${side === 'left' ? '-translate-x-8' : 'translate-x-8'} opacity-0`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-serif text-xl font-semibold leading-snug text-dark">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  )
}

/**
 * "Everything your child needs" — a minimalist, card-less layout: a centered
 * portrait whose background feathers into the page, framed by the four feature
 * texts (two left, two right) on desktop and stacked beneath it on mobile.
 */
export default function FeatureGrid() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true })
  const [revealRef, shown] = useReveal()

  return (
    <section id="features" ref={revealRef} className="py-24">
      <div className="mx-auto max-w-container px-6">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold leading-tight text-dark md:text-4xl">
            {t('features.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
            {t('features.sub')}
          </p>
        </div>

        {/* ── DESKTOP: text · portrait · text ── */}
        <div className="mt-12 hidden grid-cols-[1fr_minmax(460px,640px)_1fr] items-center gap-10 lg:grid xl:gap-16">
          {/* Left column */}
          <div className="flex flex-col gap-16 text-right">
            <Feature title={items[0].title} desc={items[0].desc} align="text-right" side="left" shown={shown} delay={150} />
            <Feature title={items[1].title} desc={items[1].desc} align="text-right" side="left" shown={shown} delay={300} />
          </div>

          {/* Portrait */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 45%, rgba(255,255,255,0.7), transparent 72%)' }}
            />
            <img
              src="/assets/images/m.png"
              alt=""
              className="mx-auto w-full max-w-[620px] object-contain"
              style={{ WebkitMaskImage: PHOTO_MASK, maskImage: PHOTO_MASK }}
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-16 text-left">
            <Feature title={items[2].title} desc={items[2].desc} align="text-left" side="right" shown={shown} delay={225} />
            <Feature title={items[3].title} desc={items[3].desc} align="text-left" side="right" shown={shown} delay={375} />
          </div>
        </div>

        {/* ── MOBILE / TABLET: portrait on top, neat cards below ── */}
        <div className="mt-8 lg:hidden">
          <div
            className={`relative transition-all duration-1000 ease-out ${
              shown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            <img
              src="/assets/images/m.png"
              alt=""
              className="mx-auto max-h-[480px] w-full max-w-[420px] object-contain"
              style={{ WebkitMaskImage: PHOTO_MASK, maskImage: PHOTO_MASK }}
            />
          </div>

          <div className="mx-auto mt-8 max-w-md space-y-4">
            {items.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-dark/10 bg-white p-5 shadow-sm transition-all duration-500 ease-out ${
                  shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: MOBILE_ACCENTS[i] }}
                  />
                  <h3 className="font-serif text-base font-bold leading-snug text-dark">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
