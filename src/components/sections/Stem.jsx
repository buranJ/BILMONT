import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const stages = [
  { key: 'g12',  color: '#5A7A2A', img: '/assets/images/a-1.jpg' },
  { key: 'g34',  color: '#853b20', img: '/assets/images/a-2.jpg' },
  { key: 'g56',  color: '#5A7A2A', img: '/assets/images/a-3.jpg' },
  { key: 'g78',  color: '#853b20', img: '/assets/images/a-4.jpg' },
  { key: 'g911', color: '#5A7A2A', img: '/assets/images/a-5.jpg' },
]

export default function Stem() {
  const { t } = useTranslation()
  const items = t('stem.stages', { returnObjects: true })

  const sliderRef = useRef(null)
  const mobileRef = useRef(null)
  const [mobileIdx, setMobileIdx] = useState(0)
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, velX: 0, lastX: 0, rafId: null })

  const mobileScroll = (dir) => {
    const el = mobileRef.current
    if (!el) return
    const next = Math.max(0, Math.min(stages.length - 1, mobileIdx + dir))
    const cardWidth = el.offsetWidth - 48 + 16 // card width + gap
    el.scrollTo({ left: next * cardWidth, behavior: 'smooth' })
    setMobileIdx(next)
  }

  const onMouseDown = (e) => {
    const el = sliderRef.current
    if (!el) return
    if (drag.current.rafId) cancelAnimationFrame(drag.current.rafId)
    drag.current = { active: true, startX: e.pageX, scrollLeft: el.scrollLeft, velX: 0, lastX: e.pageX, rafId: null }
    el.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    if (!drag.current.active) return
    e.preventDefault()
    const el = sliderRef.current
    const dx = e.pageX - drag.current.startX
    drag.current.velX = e.pageX - drag.current.lastX
    drag.current.lastX = e.pageX
    el.scrollLeft = drag.current.scrollLeft - dx
  }

  const onMouseUp = () => {
    const el = sliderRef.current
    if (!el || !drag.current.active) return
    drag.current.active = false
    el.style.cursor = 'grab'
    // momentum
    let vel = -drag.current.velX * 1.5
    const momentum = () => {
      if (Math.abs(vel) < 0.5) return
      el.scrollLeft += vel
      vel *= 0.92
      drag.current.rafId = requestAnimationFrame(momentum)
    }
    drag.current.rafId = requestAnimationFrame(momentum)
  }

  const onMouseLeave = () => {
    if (drag.current.active) onMouseUp()
  }

  return (
    <section id="stem" className="py-24">
      {/* Header */}
      <div className="mx-auto max-w-container px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-green">
            {t('stem.tag')}
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-dark md:text-5xl">
            {t('stem.title')}
          </h2>
          <p className="mt-4 text-base italic leading-relaxed text-muted">
            {t('stem.sub')}
          </p>
        </div>
      </div>

      {/* ── MOBILE: one-card touch slider ── */}
      <div
        ref={mobileRef}
        className="mt-10 flex overflow-x-scroll lg:hidden"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingLeft: '24px',
          paddingRight: '24px',
          gap: '16px',
        }}
      >
        {stages.map((s, i) => {
          const item = items[i]
          return (
            <div
              key={s.key}
              className="relative shrink-0 overflow-hidden"
              style={{
                width: 'calc(100vw - 48px)',
                height: '460px',
                borderRadius: '24px',
                scrollSnapAlign: 'start',
              }}
            >
              <img
                src={s.img}
                alt={item.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 30%, rgba(0,0,0,0.88) 100%)',
                }}
              />
              <div className="absolute left-5 top-5">
                <span
                  className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(0,0,0,0.30)' }}
                >
                  {item.grade}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif text-[48px] font-bold leading-none text-white/20 select-none" aria-hidden="true">
                  {item.grade.replace(/[^\d–-]/g, '')}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.desc}</p>
                <div className="mt-4 h-0.5 w-10 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile controls */}
      <div className="mt-5 flex items-center justify-between px-6 lg:hidden">
        {/* Dots */}
        <div className="flex gap-2">
          {stages.map((s, i) => (
            <button
              key={i}
              onClick={() => mobileScroll(i - mobileIdx)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: mobileIdx === i ? '24px' : '6px',
                backgroundColor: mobileIdx === i ? stages[i].color : '#C4C4C4',
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => mobileScroll(-1)}
            disabled={mobileIdx === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/15 bg-white shadow-sm transition disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button
            onClick={() => mobileScroll(1)}
            disabled={mobileIdx === stages.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/15 bg-white shadow-sm transition disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP: drag-scroll photo slider ── */}
      <div
        ref={sliderRef}
        className="mt-14 hidden cursor-grab select-none overflow-x-scroll lg:flex"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          paddingLeft:  'max(32px, calc((100vw - 1200px) / 2 + 32px))',
          paddingRight: 'max(32px, calc((100vw - 1200px) / 2 + 32px))',
          gap: '20px',
          alignItems: 'center',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {stages.map((s, i) => {
          const item = items[i]
          return (
            <div
              key={s.key}
              className="relative shrink-0 overflow-hidden"
              style={{
                /* show 3 full cards + 30% of 4th:
                   available ≈ min(100vw−64, 1136)px, 3 gaps = 60px
                   width = (available − 60) / 3.3                    */
                width: 'calc((min(100vw - 64px, 1136px) - 60px) / 3.3)',
                height: '520px',
                borderRadius: '28px',
                scrollSnapAlign: 'start',
              }}
            >
              {/* Photo */}
              <img
                src={s.img}
                alt={item.name}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 30%, rgba(0,0,0,0.88) 100%)',
                }}
              />

              {/* Grade badge top-left */}
              <div className="absolute left-5 top-5">
                <span
                  className="rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(0,0,0,0.30)' }}
                >
                  {item.grade}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="font-serif text-[56px] font-bold leading-none text-white/20 select-none" aria-hidden="true">
                  {item.grade.replace(/[^\d–-]/g, '')}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {item.desc}
                </p>
                <div className="mt-5 h-0.5 w-10 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
