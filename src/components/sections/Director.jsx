import { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Director / founder spotlight. A creative split layout:
 *  - left: large portrait inside a rounded olive-green frame with an
 *    overlapping name plate and a floating "founder" badge
 *  - right: oversized serif pull-quote, short bio, and a signature line
 *
 * The portrait reads from /assets/images/director.jpg and degrades to a
 * monogram placeholder until the real photo is dropped in.
 */
export default function Director() {
  const { t } = useTranslation()
  const [failed, setFailed] = useState(false)

  return (
    <section id="director" className="py-14 md:py-24">
      <div className="mx-auto max-w-container px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Decorative offset panel */}
            <div className="absolute -bottom-5 -right-5 hidden h-full w-full rounded-[32px] bg-green/15 md:block" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] bg-green">
              {!failed ? (
                <img
                  src="/assets/images/dir.jpg"
                  alt={t('director.name')}
                  onError={() => setFailed(true)}
                  className="h-[104%] w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-light to-green-dark">
                  <span className="font-serif text-7xl font-bold text-cream/90">
                    B
                  </span>
                </div>
              )}

              {/* Bottom gradient + name plate */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-6">
                <p className="font-serif text-xl font-semibold text-cream">
                  {t('director.name')}
                </p>
                <p className="text-sm text-cream/80">{t('director.role')}</p>
              </div>
            </div>

            {/* Floating badge */}
            {/* <span className="absolute -left-4 top-6 rounded-full bg-dark px-4 py-2 text-xs font-medium text-cream shadow-lg">
             {t('director.tag')} 
            </span> */}
          </div>

          {/* Quote + bio */}
          <div>
            <span className="font-serif text-6xl leading-none text-green/40">
              &ldquo;
            </span>
            <blockquote className="-mt-6 font-serif text-3xl font-medium italic leading-snug text-dark md:text-4xl">
              {t('director.quote')}
            </blockquote>

            <p className="mt-8 max-w-md text-base leading-relaxed text-muted">
              {t('director.bio')}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-green" />
              <span className="text-sm font-medium text-dark">
                {t('director.signature')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
