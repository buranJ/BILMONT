import { useTranslation } from 'react-i18next'

const LANGS = ['KG', 'RU', 'EN']

/**
 * Three-segment language pill (KG · RU · EN) wired to i18next.
 * The active language is highlighted with a filled segment.
 */
export default function LangSwitcher() {
  const { i18n } = useTranslation()
  const current = (i18n.resolvedLanguage || 'ru').toUpperCase()

  return (
    <div className="inline-flex items-center rounded-full border border-dark/10 bg-white/40 p-0.5">
      {LANGS.map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            onClick={() => i18n.changeLanguage(lng.toLowerCase())}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200 ${
              active ? 'bg-dark text-cream' : 'text-muted hover:text-dark'
            }`}
            aria-pressed={active}
          >
            {lng}
          </button>
        )
      })}
    </div>
  )
}
