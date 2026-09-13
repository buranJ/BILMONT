import { useTranslation } from 'react-i18next'
import Logo from '../ui/Logo.jsx'

/**
 * Site footer with brand, navigation, contacts and legal line.
 */
export default function Footer() {
  const { t } = useTranslation()

  const links = ['about', 'features', 'model', 'admissions', 'contact']

  return (
    <footer className="border-t border-dark/5">
      <div className="mx-auto max-w-container px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <Logo size={26} />
              <span className="font-serif text-lg font-semibold text-dark">
                {t('brand')}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t('footer.nav')}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((k) => (
                <li key={k}>
                  <a
                    href={`#${k}`}
                    className="text-sm text-dark/70 transition-colors hover:text-green"
                  >
                    {t(`nav.${k}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              {t('footer.contacts')}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-dark/70">
              <li>
                <a href="mailto:admission@bilmont.kg" className="hover:text-green">
                  admission@bilmont.kg
                </a>
              </li>
              <li>
                <a href="https://www.bilmont.school" className="hover:text-green">
                  www.bilmont.school
                </a>
              </li>
              <li>
                <a
                  href="https://go.2gis.com/hd4aP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green"
                >
                  {t('map.fullAddress')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="mt-12 flex flex-col items-start justify-center gap-2 border-t border-dark/5 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Nawrec Edtech OÜ. {t('footer.rights')}
          </span>
        </div> */}

        <p className="mt-12 text-center text-[11px] text-muted/50">
          {t('footer.credit')}{' '}
          <a
            href="https://itdos.dev"
            target="_blank"
            rel="noopener"
            className="transition-colors hover:text-muted"
          >
            itdos.dev
          </a>
        </p>
      </div>
    </footer>
  )
}
