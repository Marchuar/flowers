import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Browse and choose',
    body: 'Pick your stems from our daily selection. What you see is what arrives — no substitutions, no surprises.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 8 Q25 14 20 20 Q15 14 20 8Z" fill="currentColor" opacity="0.15" stroke="none"/>
        <path d="M20 8 Q25 14 20 20 Q15 14 20 8Z" />
        <path d="M20 32 Q15 26 20 20 Q25 26 20 32Z" opacity="0.5"/>
        <path d="M8 20 Q14 15 20 20 Q14 25 8 20Z" opacity="0.5"/>
        <path d="M32 20 Q26 25 20 20 Q26 15 32 20Z" opacity="0.3"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'We pack in kraft',
    body: 'Your stems are wrapped in recycled kraft paper with a handwritten care card. Minimal, beautiful, eco.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M10 28 L20 10 L30 28 Z" />
        <path d="M14 22 H26" />
        <path d="M12 28 H28 V32 H12Z" />
        <path d="M20 10 V8" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Fresh to your door',
    body: 'A courier delivers within 2 hours. Order by 9 PM and receive same-day. Freshness guaranteed or we re-deliver.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path d="M6 20 H28 L34 26 V32 H6 Z" />
        <circle cx="13" cy="32" r="3" />
        <circle cx="27" cy="32" r="3" />
        <path d="M28 20 L28 14 L34 20" />
        <path d="M6 24 H28" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={ref} className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-text-secondary/30" />
            <span className="eyebrow text-text-secondary/60">Process</span>
          </div>
          <h2 className="section-heading text-text-primary">
            Simple, fast,<br />
            <span className="italic text-text-secondary/80">honest.</span>
          </h2>
        </motion.div>

        {/* Steps — staggered vertical list */}
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-6 md:gap-10 py-8 border-b border-border/40 last:border-b-0 md:hover:pl-3 transition-[padding-left] duration-400"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-14 md:w-20">
                <span
                  className="font-editorial font-light text-text-secondary/20 select-none leading-none block"
                  style={{
                    fontSize: 'clamp(42px, 5vw, 64px)',
                    fontVariationSettings: "'opsz' 72",
                  }}
                  aria-hidden="true"
                >
                  {step.num}
                </span>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0 w-[52px] h-[52px] rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary shadow-sm mt-1 group-hover:border-accent/50 transition-colors duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3
                  className="font-editorial text-[24px] md:text-[28px] font-light text-text-primary mb-2.5 leading-tight"
                  style={{ fontVariationSettings: "'opsz' 36" }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-[13.5px] font-light text-text-secondary leading-relaxed max-w-lg">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-text-secondary"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-sans text-[12.5px]">Orders accepted 9:00–21:00 every day</span>
          </div>
          <div className="hidden sm:block text-border">·</div>
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-sans text-[12.5px]">Delivery within Warsaw · 2 hour window</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
