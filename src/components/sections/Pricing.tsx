import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const { t } = useTranslation()
  const comparison = t('pricing.features', { returnObjects: true }) as { feature: string; traditional: string; stem: string }[]
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
            onUpdate: () => { el.textContent = counter.val.toFixed(2) },
          })
        },
        once: true,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-5 h-px bg-text-secondary/30" />
            <span className="eyebrow text-text-secondary/60">{t('pricing.eyebrow')}</span>
            <div className="w-5 h-px bg-text-secondary/30" />
          </motion.div>
          <motion.h2
            className="section-heading text-text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('pricing.heading')}<br />
            <span className="italic text-accent-warm">{t('pricing.headingEm')}</span>
          </motion.h2>
          <motion.p
            className="font-sans text-[14px] font-[400] text-text-secondary max-w-md mx-auto mt-4 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('pricing.description')}
          </motion.p>
        </div>

        {/* ── COMPARISON TABLE ── */}
        <motion.div
          className="rounded-3xl overflow-hidden shadow-xl border border-border/60"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >

          {/* ── DESKTOP header (3 cols) ── */}
          <div className="hidden md:grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <div className="bg-surface px-8 py-6 border-b border-border/50">
              <span className="eyebrow text-text-secondary/60">{t('pricing.colCategory')}</span>
            </div>
            <div className="bg-bg px-6 py-6 border-b border-l border-border/50 text-center">
              <div className="eyebrow text-text-secondary/55 mb-1.5">{t('pricing.colTraditional')}</div>
              <div className="font-playfair text-[20px] font-[400] text-text-secondary/85">
                {t('pricing.colFloristLabel')}
              </div>
            </div>
            <div className="bg-text-primary px-6 py-6 border-b border-l border-surface/[0.08] flex flex-col items-center justify-center gap-2 text-center">
              <span className="eyebrow text-[9px] tracking-[0.22em] uppercase text-surface/60">{t('pricing.bestValue')}</span>
              <span className="font-brand text-[26px] tracking-[0.2em] text-surface leading-none">STEM</span>
              <span className="bg-accent/20 text-accent font-sans text-[9px] tracking-[0.1em] uppercase px-3 py-1 rounded-full">
                {t('pricing.wholesalePrices')}
              </span>
            </div>
          </div>

          {/* ── MOBILE header (2 cols) ── */}
          <div className="md:hidden grid grid-cols-2">
            <div className="bg-bg px-5 py-5 border-b border-border/50 text-center">
              <div className="eyebrow text-text-secondary/55 mb-1.5">{t('pricing.colTraditional')}</div>
              <div className="font-playfair text-[18px] font-[400] text-text-secondary/85">
                {t('pricing.colFloristLabel')}
              </div>
            </div>
            <div className="bg-text-primary px-5 py-5 border-b border-l border-surface/[0.08] flex flex-col items-center justify-center gap-1.5 text-center">
              <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-surface/40">{t('pricing.bestValue')}</span>
              <span className="font-brand text-[22px] tracking-[0.2em] text-surface leading-none">STEM</span>
              <span className="bg-accent/20 text-accent font-sans text-[9px] tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full">
                {t('pricing.wholesalePrices')}
              </span>
            </div>
          </div>

          {/* ── DESKTOP rows (3 cols) ── */}
          <div className="hidden md:block">
            {comparison.map((row, i) => {
              const isLast = i === comparison.length - 1
              return (
                <motion.div
                  key={row.feature}
                  className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`bg-surface px-8 py-6 ${!isLast ? 'border-b border-border/40' : ''} flex items-center`}>
                    <span className="font-editorial text-[19px] font-[450] text-text-primary" style={{ fontVariationSettings: "'opsz' 24" }}>
                      {row.feature}
                    </span>
                  </div>
                  <div className={`bg-bg px-6 py-6 border-l ${!isLast ? 'border-b border-border/40' : ''} border-border/50 flex items-center justify-center`}>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-border/60 flex items-center justify-center flex-shrink-0">
                        <X size={9} className="text-text-secondary/50" strokeWidth={2.5} />
                      </div>
                      <span className="font-sans text-[13px] font-[450] text-text-secondary/65 text-center leading-tight">
                        {row.traditional}
                      </span>
                    </div>
                  </div>
                  <div className={`bg-text-primary px-6 py-6 border-l border-surface/[0.07] ${!isLast ? 'border-b border-surface/[0.07]' : ''} flex items-center justify-center`}>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Check size={10} className="text-accent" strokeWidth={2.5} />
                      </div>
                      <span className="font-sans text-[14px] font-[500] text-surface text-center leading-tight">
                        {row.stem}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ── MOBILE rows (feature name full-width, then 2 cols) ── */}
          <div className="md:hidden">
            {comparison.map((row, i) => {
              const isLast = i === comparison.length - 1
              return (
                <motion.div
                  key={row.feature}
                  className={!isLast ? 'border-b border-border/40' : ''}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Feature name — full width */}
                  <div className="bg-surface px-5 py-3 border-b border-border/30 text-center">
                    <span className="font-editorial text-[15px] font-[450] text-text-primary/90" style={{ fontVariationSettings: "'opsz' 20" }}>
                      {row.feature}
                    </span>
                  </div>
                  {/* Values — 2 equal columns */}
                  <div className="grid grid-cols-2">
                    <div className="bg-bg px-4 py-4 flex items-center justify-center">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-border/60 flex items-center justify-center flex-shrink-0">
                          <X size={8} className="text-text-secondary/50" strokeWidth={2.5} />
                        </div>
                        <span className="font-sans text-[13px] font-[450] text-text-secondary/70 leading-tight">
                          {row.traditional}
                        </span>
                      </div>
                    </div>
                    <div className="bg-text-primary px-4 py-4 border-l border-surface/[0.07] flex items-center justify-center">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Check size={9} className="text-accent" strokeWidth={2.5} />
                        </div>
                        <span className="font-sans text-[13.5px] font-[500] text-surface leading-tight">
                          {row.stem}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </motion.div>

        {/* Bottom — price counter + CTA */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75 }}
        >
          <div className="flex items-end gap-2">
            <span className="font-sans text-[13px] text-text-secondary/60 mb-1.5">{t('pricing.from')}</span>
            <span ref={priceRef} className="font-display text-[56px] font-light leading-none text-text-primary tabular-nums">0.00</span>
            <div className="mb-1.5">
              <div className="font-sans text-[16px] font-[400] text-text-primary leading-none">zł</div>
              <div className="font-sans text-[10.5px] md:text-[12px] font-[500] text-text-secondary/60 mt-0.5">{t('pricing.perStem')}</div>
            </div>
          </div>

          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase text-surface bg-text-primary px-7 py-3.5 rounded-full hover:bg-accent transition-colors duration-300"
          >
            {t('pricing.shopAll')}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}