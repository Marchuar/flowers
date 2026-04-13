import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Browse & choose',
    body: 'Pick your stems from our daily selection. What you see is what arrives — no substitutions, no surprises.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
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
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
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
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-8 h-8">
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

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section id="how-it-works" ref={ref} className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="eyebrow text-text-secondary/60 mb-3">Process</div>
          <h2 className="section-heading text-text-primary">
            Simple, fast,<br />
            <span className="italic text-text-secondary">honest.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative"
        >
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(33%-1px)] right-[calc(33%-1px)] h-px bg-border pointer-events-none" />

          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={itemVariants}
              className="relative flex flex-col gap-5 p-6 md:p-0"
            >
              {/* Step number */}
              <div className="relative">
                <span
                  className="font-display font-light select-none absolute -top-4 -left-4 text-[7rem] leading-none text-border/60"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <div className="relative z-10 w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-text-secondary mt-2">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="mt-6">
                <h3 className="font-display text-2xl md:text-3xl font-[400] text-text-primary mb-2">{step.title}</h3>
                <p className="font-sans text-[14px] font-light text-text-secondary leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.div
          className="mt-14 pt-10 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-text-secondary"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-sans text-[13px]">Orders accepted 9:00–21:00 every day</span>
          </div>
          <div className="hidden sm:block text-border">·</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-sans text-[13px]">Delivery within Warsaw · 2 hour window</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
