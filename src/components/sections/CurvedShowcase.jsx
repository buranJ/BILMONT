import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mentors } from '../../data/mentors.js'
import Button from '../ui/Button.jsx'
import Highlights from './Highlights.jsx'

/** Muted studio tones for placeholder cards (dark, like the mockup). */
const STUDIO_TONES = ['#6E5E63', '#4A4A55', '#5E5650', '#7A5E66', '#6B5E55', '#4F5A52']

const CARD_W = 168 // base card width (px)
const GAP = 32 // gap between cards (px)
const SPEED = 0.55 // px per frame
const MIN_SCALE = 0.72 // smallest — at the centre
const MAX_SCALE = 1.18 // largest — toward the edges

/** One portrait. Real photo when present, dark gradient placeholder otherwise. */
function WallCard({ mentor, tone }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="h-[244px] w-full overflow-hidden rounded-2xl shadow-xl shadow-black/15"
      style={{ background: tone }}
    >
      {!failed ? (
        <img
          src={mentor.img}
          alt={mentor.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-end p-3"
          style={{ background: `linear-gradient(165deg, ${tone} 0%, rgba(18,16,20,0.9) 100%)` }}
        >
          <div className="text-cream/90">
            <p className="text-sm font-semibold leading-tight">{mentor.name}</p>
            <p className="text-[11px] opacity-70">{mentor.role}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Pixel-perfect reproduction of the Flowblox hero centrepiece — a NEW,
 * separate section (the original infinite slider stays in the Hero).
 *
 * A "coverflow" carousel: the track scrolls infinitely to the left, and on
 * every animation frame each card is scaled by its distance from the
 * horizontal centre — smallest in the middle, growing toward the edges —
 * exactly as in the reference. JS is required because the size depends on
 * each card's live on-screen position, which CSS alone can't express.
 */
export default function CurvedShowcase() {
  const { t } = useTranslation()
  const viewportRef = useRef(null)
  const trackRef = useRef(null)

  // Triple the list so the loop never shows a gap.
  const cards = [...mentors, ...mentors, ...mentors]

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Width of one third of the track = one full mentor set.
    const setWidth = (CARD_W + GAP) * mentors.length
    let pos = -setWidth // start mid-track so both edges are filled
    let raf

    const frame = () => {
      if (!prefersReduced) {
        pos -= SPEED
        if (pos <= -setWidth * 2) pos += setWidth
      }
      track.style.transform = `translate3d(${pos}px, 0, 0)`

      // Re-scale each card by its distance from the viewport centre.
      const vpRect = viewport.getBoundingClientRect()
      const centerX = vpRect.left + vpRect.width / 2
      const half = vpRect.width / 2

      for (const el of track.children) {
        const r = el.getBoundingClientRect()
        const cardCenter = r.left + r.width / 2
        const dist = Math.min(Math.abs(cardCenter - centerX) / half, 1) // 0 centre → 1 edge
        const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * dist
        el.style.transform = `scale(${scale})`
        el.style.zIndex = String(Math.round(dist * 10))
      }

      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="overflow-hidden pt-6">
      {/* CTA button */}
      {/* <div className="flex justify-center">
        <Button arrow href="#contact">
          {t('hero.cta')}
        </Button>
      </div> */}

      {/* Coverflow carousel */}
      <div ref={viewportRef} className="mt-12 mask-fade-x overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-[300px] items-center will-change-transform"
          style={{ gap: `${GAP}px` }}
        >
          {cards.map((m, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: `${CARD_W}px` }}
            >
              <WallCard mentor={m} tone={STUDIO_TONES[i % STUDIO_TONES.length]} />
            </div>
          ))}
        </div>
      </div>

      {/* Three-column highlight strip */}
      <div className="mt-32">
        <Highlights />
      </div>
    </section>
  )
}
