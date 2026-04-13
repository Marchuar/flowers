import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const comparison = [
  { feature: 'Price per stem', traditional: '9–15 zł', stem: '2.90–7 zł', win: true },
  { feature: 'Bouquet assembly', traditional: 'Mandatory', stem: 'Your choice', win: true },
  { feature: 'Plastic wrapping', traditional: 'Lots of it', stem: 'Zero', win: true },
  { feature: 'Same-day delivery', traditional: 'Rare', stem: 'Always', win: true },
  { feature: 'Care instructions', traditional: 'Never', stem: 'Every order', win: true },
]

export default function Pricing() {
  const ref = useRef<HTMLElement>(null)
  const priceRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!priceRef.current) return
    const el = priceRef.current
    const counter = { val: 0 }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            val: 2.9,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = counter.val.toFixed(2)
            },
          })
        },
        once: true,
      })
    })
    return () => ctx.revert()
  }, [])

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    show: (i: number) => ({
      opacity: 1, x: 0,
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const }
    }),
  }

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-28 px-6 md:px-10 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <motion.div
              className="eyebrow text-text-secondary/60 mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Transparency
            </motion.div>
            <motion.h2
              className="section-heading text-text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              A florist charges<br />
              <span className="italic text-accent-warm">300% more.</span>
            </motion.h2>
            <motion.p
              className="font-sans text-[15px] font-light text-text-secondary leading-relaxed mb-8 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We buy directly from wholesale markets and deliver with no middlemen.
              The difference goes back in your pocket.
            </motion.p>
            <motion.a
              href="#"
              onClick={(e: React.MouseEvent) => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex items-center gap-2 font-sans text-[13px] font-[500] tracking-[0.06em] uppercase text-text-primary border border-text-primary px-6 py-3 rounded-full hover:bg-text-primary hover:text-surface transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Check prices →
            </motion.a>
          </div>

          {/* Right — price callout + comparison */}
          <div className="relative">
            {/* Big price display */}
            <motion.div
              className="relative mb-10 pl-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {/* Watermark */}
              <div
                className="absolute -top-6 -left-4 font-display font-light text-[8rem] md:text-[10rem] leading-none select-none pointer-events-none"
                style={{ color: 'rgba(217,208,193,0.4)' }}
                aria-hidden="true"
              >
                STEM
              </div>
              <div className="relative z-10">
                <div className="eyebrow text-text-secondary/50 mb-1">From</div>
                <div className="flex items-end gap-2">
                  <span ref={priceRef} className="font-display text-[72px] md:text-[96px] font-light leading-none text-text-primary">0.00</span>
                  <div className="mb-3">
                    <div className="font-sans text-lg font-light text-text-primary">zł</div>
                    <div className="font-sans text-[11px] text-text-secondary">per stem</div>
                  </div>
                </div>
                <div className="font-sans text-[12px] text-text-secondary/60 mt-1">vs. 9–15 zł at a traditional florist</div>
              </div>
            </motion.div>

            {/* Comparison table */}
            <div className="border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-bg-subtle px-4 py-2.5 border-b border-border">
                <div className="font-sans text-[10px] font-[500] tracking-[0.1em] uppercase text-text-secondary/50"></div>
                <div className="font-sans text-[10px] font-[500] tracking-[0.1em] uppercase text-text-secondary/50 text-center">Florist</div>
                <div className="font-sans text-[10px] font-[500] tracking-[0.1em] uppercase text-accent text-center">STEM</div>
              </div>
              {comparison.map((row, i) => (
                <motion.div
                  key={row.feature}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  className="grid grid-cols-3 px-4 py-3 border-b border-border/50 last:border-0 items-center"
                >
                  <div className="font-sans text-[12px] text-text-secondary">{row.feature}</div>
                  <div className="font-sans text-[12px] text-text-secondary/50 text-center">{row.traditional}</div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="font-sans text-[12px] font-[500] text-text-primary">{row.stem}</span>
                    <span className="text-accent text-sm">✓</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
