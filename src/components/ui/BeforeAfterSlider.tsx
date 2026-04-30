import { useRef, useState, useCallback } from 'react'

interface Props {
  before: string
  after: string
  alt?: string
}

export function BeforeAfterSlider({ before, after, alt = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const dragging = useRef(false)

  const getPos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    return Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setPos(getPos(e.clientX))
  }
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setPos(getPos(e.clientX))
  }
  const onUp = () => { dragging.current = false }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none cursor-ew-resize touch-none"
      style={{ aspectRatio: '16/9' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
    >
      {/* After image — full background (right side) */}
      <img
        src={after}
        alt={`${alt} — after`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image — clipped to left of divider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${alt} — before`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/80 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.18)] flex items-center justify-center gap-[3px]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4.5 7L2.5 5M2.5 7H0.5M2.5 7L4.5 9" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.5 7L11.5 5M11.5 7H13.5M11.5 7L9.5 9" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-2.5 left-2.5 bg-black/45 text-white font-sans text-[9px] font-[600] tracking-[0.1em] uppercase px-2.5 py-[5px] rounded-full backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute top-2.5 right-2.5 bg-accent/80 text-white font-sans text-[9px] font-[600] tracking-[0.1em] uppercase px-2.5 py-[5px] rounded-full backdrop-blur-sm pointer-events-none">
        After
      </span>
    </div>
  )
}
