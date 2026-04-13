import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { testimonials } from '../../constants/products'

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: stars }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-accent-warm">
          <path d="M6 1l1.12 2.27 2.51.36-1.82 1.77.43 2.5L6 6.77l-2.24 1.18.43-2.5L2.37 3.63l2.51-.36L6 1z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow text-text-secondary/60 mb-3">Reviews</div>
          <h2 className="section-heading text-text-primary">
            Warsaw loves<br />
            <span className="italic text-text-secondary">fresh stems.</span>
          </h2>
        </motion.div>

        {/* Scrolling marquee rows */}
        <div className="overflow-hidden -mx-6 md:-mx-10 px-6 md:px-0">
          {/* Row 1 */}
          <div
            className="flex gap-4 w-max mb-4"
            style={{ animation: 'marquee 40s linear infinite' }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-72 md:w-80 flex-shrink-0 bg-surface border border-border rounded-2xl p-5">
                <div className="font-display text-4xl text-border leading-none mb-2">"</div>
                <p className="font-sans text-[14px] font-light text-text-secondary leading-relaxed mb-4">{t.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-sans text-[12px] font-[500] text-text-primary">{t.name}</div>
                    <div className="font-sans text-[11px] text-text-secondary/60">{t.location}</div>
                  </div>
                  <StarRating stars={t.stars} />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 — reversed */}
          <div
            className="flex gap-4 w-max"
            style={{ animation: 'marquee 50s linear infinite reverse' }}
          >
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((t, i) => (
              <div key={i} className="w-72 md:w-80 flex-shrink-0 bg-surface border border-border rounded-2xl p-5">
                <div className="font-display text-4xl text-border leading-none mb-2">"</div>
                <p className="font-sans text-[14px] font-light text-text-secondary leading-relaxed mb-4">{t.quote}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-sans text-[12px] font-[500] text-text-primary">{t.name}</div>
                    <div className="font-sans text-[11px] text-text-secondary/60">{t.location}</div>
                  </div>
                  <StarRating stars={t.stars} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
