import { useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Fallback tones shown until the background photo loads (or if it's missing). */
const TILE_TONES = ['#7A9E3A', '#2A4A5A', '#9E7A5A', '#5A7A2A']

/**
 * A single feature tile: a full-bleed background photo with the title and
 * description pinned to the bottom inside a frosted (backdrop-blur) panel
 * that stays readable over any image. Degrades to a solid tone if the
 * photo is missing.
 *
 * @param {object} props
 * @param {string} props.img    Background image src.
 * @param {string} props.tone   Fallback background colour.
 * @param {string} props.title
 * @param {string} props.desc
 */
function FeatureTile({ img, tone, title, desc }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="relative min-h-[340px] overflow-hidden rounded-[28px]"
      style={{ background: tone }}
    >
      {!failed && (
        <img
          src={img}
          alt={title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Gentle darkening from the bottom for extra legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

      {/* Frosted, readable text panel — full width along the bottom */}
      <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-dark/35 px-6 py-4 backdrop-blur-sm">
        <h3 className="font-serif text-xl font-semibold text-cream">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-cream/90">{desc}</p>
      </div>
    </div>
  )
}

/**
 * "Everything your child needs" section — a 2×2 grid of feature tiles, each
 * with a background photo (p-1.png … p-4.png) and a frosted caption panel.
 */
export default function FeatureGrid() {
  const { t } = useTranslation()
  const items = t('features.items', { returnObjects: true })

  return (
    <section id="features" className="py-24">
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

        {/* 2×2 grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <FeatureTile
              key={i}
              img={`/assets/images/p-${i + 1}.png`}
              tone={TILE_TONES[i % TILE_TONES.length]}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
