import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { testimonials } from '../../constants/products'

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-1 justify-center mt-4">
      {Array.from({ length: stars }).map((_, i) => (
        <svg key={i} viewBox="0 0 14 14" fill="currentColor" className="w-3 h-3 text-accent-warm">
          <path d="M7 1l1.4 2.84 3.13.45L9.22 6.41l.54 3.13L7 8.1 4.24 9.54l.54-3.13L2.47 4.29l3.13-.45L7 1z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[activeIndex]

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 md:px-10 bg-bg-subtle overflow-hidden">

      {/* Large decorative botanical circle — background element */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none select-none"
        style={{ border: '1px solid rgba(217,208,193,0.35)' }}
        aria-hidden
      />
      <div
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none select-none"
        style={{ border: '1px solid rgba(217,208,193,0.25)' }}
        aria-hidden
      />

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-5 h-px bg-text-secondary/30" />
            <span className="eyebrow text-text-secondary/60">Reviews</span>
            <div className="w-5 h-px bg-text-secondary/30" />
          </div>
          <h2 className="section-heading text-text-primary">
            Warsaw loves<br />
            <span className="italic text-text-secondary/75">fresh stems.</span>
          </h2>
        </motion.div>

        {/* Featured quote */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Large decorative quotation mark */}
          <div
            className="font-brand select-none pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 leading-none"
            style={{
              fontSize: 'clamp(100px, 16vw, 180px)',
              color: 'rgba(125,155,118,0.12)',
            }}
            aria-hidden="true"
          >
            "
          </div>

          {/* Cycling quote */}
          <div className="relative z-10 min-h-[180px] md:min-h-[160px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <p className="font-display text-[22px] md:text-[28px] font-light italic text-text-primary leading-relaxed max-w-2xl">
                  "{t.quote}"
                </p>

                {/* Separator */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-px bg-border" />
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                  <div className="w-8 h-px bg-border" />
                </div>

                <div className="mt-3 font-sans text-[13px] font-[500] text-text-primary">{t.name}</div>
                <div className="font-sans text-[11px] text-text-secondary/50 mt-0.5 tracking-wide">{t.location}</div>
                <StarRating stars={t.stars} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-7 bg-accent'
                    : 'w-1.5 bg-border hover:bg-text-secondary/35'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
