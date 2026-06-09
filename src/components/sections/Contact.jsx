import { useTranslation } from 'react-i18next'
import Button from '../ui/Button.jsx'

/** Small inline icon set for contact rows. */
const icons = {
  email: (
    <path d="M4 6h16v12H4z M4 6l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  phone: (
    <path d="M6 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ),
  site: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none">
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16 M12 4c2.5 2.5 2.5 13 0 16 M12 4c-2.5 2.5-2.5 13 0 16" />
    </g>
  ),
  address: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </g>
  ),
}

/**
 * Closing contact section — a large rounded olive-green panel with the
 * call-to-action headline, a 2×2 grid of contact details, and the apply
 * button. Mirrors the warm, oversized-card feel of the reference.
 */
export default function Contact() {
  const { t } = useTranslation()

  const rows = [
    { key: 'email', value: t('contact.email'), href: `mailto:${t('contact.email')}` },
    { key: 'phone', value: t('contact.phone'), href: `tel:${t('contact.phone').replace(/\s/g, '')}` },
    // { key: 'site', value: t('contact.site'), href: `https://${t('contact.site')}` },
    { key: 'address', value: t('contact.address'), href: null },
  ]

  return (
    <section id="contact" className="px-6 pb-24">
      <div className="mx-auto max-w-container">
        <div className="relative overflow-hidden rounded-[36px] bg-green px-8 py-16 text-cream md:px-16">
          {/* Soft decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-green-light/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-green-dark/40 blur-2xl" />

          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Copy + CTA */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3 py-1 text-xs font-medium text-cream/80">
                <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                {t('contact.tag')}
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold leading-tight md:text-4xl">
                {t('contact.title')}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/85">
                {t('contact.sub')}
              </p>
              <div className="mt-8">
                <Button
                  arrow
                  href={`mailto:${t('contact.email')}`}
                  className="bg-cream text-dark hover:bg-dark hover:text-cream"
                >
                  {t('contact.cta')}
                </Button>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {rows.map((r) => {
                const Wrapper = r.href ? 'a' : 'div'
                return (
                  <Wrapper
                    key={r.key}
                    {...(r.href ? { href: r.href } : {})}
                    className="group rounded-2xl border border-cream/15 bg-cream/5 p-5 transition-colors hover:bg-cream/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream">
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        {icons[r.key]}
                      </svg>
                    </span>
                    <p className="mt-3 text-xs uppercase tracking-wide text-cream/60">
                      {t(`contact.${r.key}Label`)}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-cream">
                      {r.value}
                    </p>
                  </Wrapper>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
