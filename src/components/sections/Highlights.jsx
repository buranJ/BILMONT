import { useTranslation } from 'react-i18next'

/**
 * Three-column highlight strip that sits directly beneath the hero slider,
 * mirroring the Flowblox "Real-Time Collaboration · Task & Project Tracking ·
 * Performance Insights" row — bold title over a short muted description, with
 * thin vertical dividers between columns.
 */
export default function Highlights() {
  const { t } = useTranslation()
  const items = t('highlights.items', { returnObjects: true })

  return (
    <section className="mx-auto max-w-3xl px-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
        {items.map((item, i) => (
          <div
            key={i}
            className={`px-2 text-center sm:px-6 ${
              i > 0 ? 'sm:border-l sm:border-dark/10' : ''
            }`}
          >
            <h3 className="text-sm font-semibold text-dark">{item.title}</h3>
            <p className="mx-auto mt-2 max-w-[16rem] text-xs leading-relaxed text-muted">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
