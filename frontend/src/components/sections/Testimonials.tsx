import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface TestimonialItem {
  quote: string
  name: string
  location: string
  stars: number
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: stars }).map((_, i) => (
        <svg key={i} viewBox="0 0 14 14" fill="currentColor" className="w-2.5 h-2.5 text-accent-warm">
          <path d="M7 1l1.4 2.84 3.13.45L9.22 6.41l.54 3.13L7 8.1 4.24 9.54l.54-3.13L2.47 4.29l3.13-.45L7 1z"/>
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ item, index }: { item: TestimonialItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 bg-surface rounded-2xl p-6 border border-border/50 hover:border-border transition-colors duration-300"
    >
      <StarRating stars={item.stars} />
      <p className="font-playfair text-[17px] md:text-[19px] font-[400] italic text-text-primary leading-relaxed flex-1">
        "{item.quote}"
      </p>
      <div className="pt-3 border-t border-border/40">
        <div className="font-sans text-[13px] font-[500] text-text-primary">{item.name}</div>
        <div className="font-sans text-[11px] font-[500] text-text-secondary/65 mt-0.5">{item.location}</div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const items = t('testimonials.items', { returnObjects: true }) as TestimonialItem[]

  return (
    <section ref={ref} className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">{t('testimonials.eyebrow')}</span>
            </div>
            <h2 className="section-heading text-text-primary">
              {t('testimonials.heading')}<br />
              <span className="italic text-text-secondary/75">{t('testimonials.headingItalic')}</span>
            </h2>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-6 pb-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div className="text-right">
              <div className="font-display text-[42px] font-light text-text-primary leading-none tabular-nums">5.0</div>
              <div className="font-sans text-[11px] md:text-[12px] text-text-secondary/50 mt-1 uppercase tracking-[0.1em]">{t('testimonials.ratingLabel')}</div>
            </div>
          </motion.div>
        </div>

        {/* Cards — masonry-style on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Left column — 2 short cards */}
          <div className="flex flex-col gap-4 md:gap-5">
            <TestimonialCard item={items[0]} index={0} />
            <TestimonialCard item={items[3]} index={3} />
          </div>
          {/* Center column — 1 tall card (featured) */}
          <div>
            <motion.div
              className="relative flex flex-col gap-4 bg-text-primary rounded-2xl p-6 border border-text-primary h-full"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 14 14" fill="currentColor" className="w-2.5 h-2.5 text-accent-warm">
                    <path d="M7 1l1.4 2.84 3.13.45L9.22 6.41l.54 3.13L7 8.1 4.24 9.54l.54-3.13L2.47 4.29l3.13-.45L7 1z"/>
                  </svg>
                ))}
              </div>
              <p className="font-playfair text-[22px] md:text-[26px] font-[400] italic text-surface leading-relaxed flex-1">
                "{items[2]?.quote}"
              </p>
              <div className="pt-3 border-t border-surface/10">
                <div className="font-sans text-[13px] font-[500] text-surface/80">{items[2]?.name}</div>
                <div className="font-sans text-[11px] font-[500] text-surface/35 mt-0.5">{items[2]?.location}</div>
              </div>
            </motion.div>
          </div>
          {/* Right column — 2 short cards */}
          <div className="flex flex-col gap-4 md:gap-5">
            <TestimonialCard item={items[1]} index={1} />
            <TestimonialCard item={items[4]} index={4} />
          </div>
        </div>

      </div>
    </section>
  )
}
