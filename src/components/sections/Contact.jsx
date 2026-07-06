import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="currentColor" />
  </svg>
)

const SHEET_URL = import.meta.env.VITE_SHEET_URL || ''

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '' })
  const [status, setStatus] = useState('idle') // idle | loading | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('loading')
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone }),
      })
      setStatus('sent')
      setForm({ name: '', phone: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const cards = [
    {
      key: 'whatsapp',
      icon: <WhatsAppIcon />,
      label: t('contact.whatsappLabel'),
      value: t('contact.whatsapp'),
      href: `https://wa.me/${t('contact.whatsapp').replace(/\D/g, '')}`,
    },
    {
      key: 'phone',
      icon: <PhoneIcon />,
      label: t('contact.phoneLabel'),
      value: t('contact.phone'),
      href: `tel:${t('contact.phone').replace(/\s/g, '')}`,
    },
  ]

  return (
    <section id="contact" className="px-6 pb-24">
      <div className="mx-auto max-w-container">
        <div className="relative overflow-hidden rounded-[36px] bg-green px-8 py-16 text-cream md:px-16">
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Left: copy + form */}
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

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
                <input
                  type="text"
                  required
                  placeholder={t('contact.namePlaceholder')}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl border border-cream/20 bg-cream/10 px-4 py-3 text-sm text-cream placeholder-cream/50 outline-none transition focus:border-cream/50 focus:bg-cream/15"
                />
                <input
                  type="tel"
                  required
                  placeholder={t('contact.phonePlaceholder')}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-xl border border-cream/20 bg-cream/10 px-4 py-3 text-sm text-cream placeholder-cream/50 outline-none transition focus:border-cream/50 focus:bg-cream/15"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-cream px-6 py-3 text-sm font-semibold text-dark transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60"
                >
                  {status === 'loading' && (
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                    </svg>
                  )}
                  {status === 'sent' && '✓ Заявка отправлена'}
                  {status === 'error' && '✗ Ошибка, попробуйте снова'}
                  {(status === 'idle' || status === 'loading') && status !== 'loading' && t('contact.submit')}
                  {status === 'idle' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  )}
                </button>
              </form>
            </div>

            {/* Right: contact cards */}
            <div className="flex flex-col gap-4">
              {cards.map((c) => (
                <a
                  key={c.key}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 p-5 transition-colors hover:bg-cream/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream/15 text-cream">
                    {c.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-cream/60">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-base font-medium text-cream">
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
