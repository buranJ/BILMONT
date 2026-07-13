import { useTranslation } from 'react-i18next'

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87.99 1.02-3.76-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.47-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" fill="currentColor" />
  </svg>
)

const TelegramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M21.94 4.3 19.2 19.1c-.2 1.1-.86 1.37-1.74.85l-4.8-3.54-2.32 2.24c-.26.26-.47.47-.96.47l.34-4.9 8.9-8.04c.39-.34-.08-.53-.6-.19L6.99 12.9 2.25 11.4c-1.03-.32-1.05-1.03.22-1.52l18.2-7.02c.86-.31 1.61.2 1.27 1.44z" fill="currentColor" />
  </svg>
)

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Always-visible contact dock, pinned to the bottom-right corner.
 *
 * Numbers come from the same locale keys the Contact section uses, so there is
 * a single place to update them. Labels are revealed on hover (desktop) and the
 * dock keeps clear of iOS home-indicator via safe-area padding.
 */
export default function FloatingContacts() {
  const { t } = useTranslation()

  const phone = t('contact.phone')
  const whatsapp = t('contact.whatsapp')
  const telegram = t('contact.telegram')

  const links = [
    {
      key: 'whatsapp',
      label: t('contact.whatsappLabel'),
      href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
      icon: <WhatsAppIcon />,
      color: '#25D366',
      external: true,
    },
    {
      key: 'telegram',
      label: t('contact.telegramLabel'),
      href: `https://t.me/${telegram.replace(/^@/, '')}`,
      icon: <TelegramIcon />,
      color: '#229ED9',
      external: true,
    },
    {
      key: 'phone',
      label: t('contact.phoneLabel'),
      href: `tel:${phone.replace(/\s/g, '')}`,
      icon: <PhoneIcon />,
      color: 'rgb(133,59,32)',
      external: false,
    },
  ]

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          aria-label={l.label}
          className="group flex items-center gap-0 rounded-full text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 active:scale-95"
          style={{ backgroundColor: l.color }}
        >
          {/* Label expands on hover — hidden on touch screens where hover is absent */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[10rem] group-hover:pl-4 lg:block">
            {l.label}
          </span>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center">
            {l.icon}
          </span>
        </a>
      ))}
    </div>
  )
}
