import { useState } from 'react'
import { mentors } from '../../data/mentors.js'

/**
 * Single portrait card. Falls back to a tinted gradient block when the
 * image file is missing so the layout never breaks before real photos
 * are added. The `offset` produces the gentle arc seen in the mockup.
 */
function MentorCard({ mentor }) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className="relative h-[260px] w-[180px] shrink-0 overflow-hidden rounded-[20px] shadow-sm"
      style={{ marginTop: mentor.offset, background: mentor.tone }}
    >
      {!failed && (
        <img
          src={mentor.img}
          alt={mentor.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
      {failed && (
        <div
          className="flex h-full w-full items-end p-3"
          style={{
            background: `linear-gradient(160deg, ${mentor.tone} 0%, rgba(0,0,0,0.35) 100%)`,
          }}
        >
          <div className="text-cream">
            <p className="text-sm font-semibold leading-tight">{mentor.name}</p>
            <p className="text-[11px] opacity-80">{mentor.role}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Infinite horizontal portrait slider. The mentor array is tripled so the
 * CSS keyframe (translateX -33.333%) loops seamlessly. Edges fade out via
 * the `mask-fade-x` utility; the track pauses on hover.
 */
export default function MentorSlider() {
  const loop = [...mentors, ...mentors, ...mentors]

  return (
    <div className="relative mask-fade-x">
      <div className="slider-track flex w-max gap-4 animate-scrollLeft pb-4">
        {loop.map((m, i) => (
          <MentorCard key={`${m.id}-${i}`} mentor={m} />
        ))}
      </div>
    </div>
  )
}
