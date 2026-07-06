import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button.jsx'
import LangSwitcher from '../ui/LangSwitcher.jsx'

/**
 * Sticky top navigation. Gains a blurred, slightly opaque background
 * once the page is scrolled past 20px — mirroring the Flowblox header.
 */
export default function Header() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { key: 'about', href: '#about' },
    { key: 'features', href: '#features' },
    { key: 'model', href: '#model' },
    { key: 'contact', href: '#contact' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-dark/5 bg-cream/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-6">
        {/* Left: brand */}
        <a href="#top" className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="h-[36px] w-auto" />
          <span className="font-serif text-lg font-semibold tracking-tight text-dark">
            {t('brand')}
          </span>
        </a>

        {/* Center: nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-sm text-dark/70 transition-colors hover:text-dark"
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </nav>

        {/* Right: lang + CTA */}
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <Button arrow href="#contact" className="hidden sm:inline-flex">
            {t('cta.apply')}
          </Button>
        </div>
      </div>
    </header>
  )
}
