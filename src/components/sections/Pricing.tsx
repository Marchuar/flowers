import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type ComparisonRow = {
  feature: string
  featureNote?: string
  traditional: string
  traditionalNote?: string
  stem: string
  stemNote?: string
}

export default function Pricing() {
  const { t } = useTranslation()
  const comparison = t('pricing.features', { returnObjects: true }) as ComparisonRow[]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [priceRow, ...featureRows] = comparison

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
          <div className="hidden md:grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]">
            <div className="bg-surface px-8 py-7 border-b border-border/50">
              <span className="eyebrow text-text-secondary/50">{t('pricing.colCategory')}</span>
            </div>
            <div className="bg-bg px-7 py-7 border-b border-l border-border/50">
              <div className="eyebrow text-text-secondary/50 mb-2">{t('pricing.colTraditional')}</div>
              <div className="font-display text-[22px] font-[500] text-text-secondary/95 leading-tight">
                {t('pricing.colFloristLabel')}
              </div>
            </div>
            <div className="bg-accent/[0.06] px-7 py-7 border-b border-l border-border/50">
              <div className="eyebrow text-accent mb-2">{t('pricing.colOurOffer')}</div>
              <div className="font-brand tracking-[0.08em] text-[28px] font-[600] text-text-primary leading-tight mb-2">STEM</div>
            </div>
          </div>

          {/* ── MOBILE header (2 cols) ── */}
          <div className="md:hidden grid grid-cols-2">
            <div className="bg-bg px-5 py-5 border-b border-border/50">
              <div className="eyebrow text-text-secondary/50 mb-1.5">{t('pricing.colTraditional')}</div>
              <div className="font-display text-[17px] font-[500] text-text-secondary/95 leading-tight">
                {t('pricing.colFloristLabel')}
              </div>
            </div>
            <div className="bg-accent/[0.06] px-5 py-5 border-b border-l border-border/50">
              <div className="eyebrow text-accent mb-1.5">{t('pricing.colOurOffer')}</div>
              <div className="font-brand tracking-[0.08em] text-[26px] font-[600] text-text-primary leading-tight mb-1.5">STEM</div>
            </div>
          </div>

          {/* ── PRICE HERO ROW ── */}
          {priceRow && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] border-b border-border/40"
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Feature */}
              <div className="bg-surface px-7 py-6 md:px-8 md:py-7 flex items-center justify-center md:justify-start md:border-b-0 border-b border-border/30">
                <div className="text-center md:text-left">
                  <p className="font-editorial text-[18px] md:text-[19px] font-[500] text-text-primary leading-snug">{priceRow.feature}</p>
                  {priceRow.featureNote && (
                    <p className="font-sans text-[12px] text-text-secondary/60 mt-0.5">{priceRow.featureNote}</p>
                  )}
                </div>
              </div>
              {/* Traditional price */}
              <div className="hidden md:flex bg-bg px-7 py-7 border-l border-border/50 flex-col justify-center">
                <p className="font-display text-[28px] font-[500] text-text-secondary/70 leading-none">{priceRow.traditional}</p>
                {priceRow.traditionalNote && (
                  <p className="font-sans text-[12px] text-text-secondary/50 mt-1.5">{priceRow.traditionalNote}</p>
                )}
              </div>
              {/* STEM price */}
              <div className="hidden md:flex bg-accent/[0.06] px-7 py-7 border-l border-border/50 flex-col justify-center">
                <p className="font-display text-[28px] font-[600] text-text-primary leading-none">{priceRow.stem}</p>
                {priceRow.stemNote && (
                  <p className="font-sans text-[12px] text-text-secondary/55 mt-1.5">{priceRow.stemNote}</p>
                )}
              </div>
              {/* Mobile: 2-col price */}
              <div className="md:hidden grid grid-cols-2">
                <div className="bg-bg px-5 py-5 flex flex-col justify-center">
                  <p className="font-display text-[22px] font-[500] text-text-secondary/70 leading-none">{priceRow.traditional}</p>
                  {priceRow.traditionalNote && (
                    <p className="font-sans text-[11px] text-text-secondary/50 mt-1">{priceRow.traditionalNote}</p>
                  )}
                </div>
                <div className="bg-accent/[0.06] px-5 py-5 border-l border-border/50 flex flex-col justify-center">
                  <p className="font-display text-[22px] font-[600] text-text-primary leading-none">{priceRow.stem}</p>
                  {priceRow.stemNote && (
                    <p className="font-sans text-[11px] text-text-secondary/55 mt-1">{priceRow.stemNote}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── DESKTOP feature rows (3 cols) ── */}
          <div className="hidden md:block">
            {featureRows.map((row, i) => {
              const isLast = i === featureRows.length - 1
              return (
                <motion.div
                  key={row.feature}
                  className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,1.2fr)]"
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.42 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`bg-surface px-8 py-6 ${!isLast ? 'border-b border-border/40' : ''} flex items-center`}>
                    <span className="font-editorial text-[18px] font-[450] text-text-primary" style={{ fontVariationSettings: "'opsz' 24" }}>
                      {row.feature}
                    </span>
                  </div>
                  <div className={`bg-bg px-7 py-6 border-l ${!isLast ? 'border-b border-border/40' : ''} border-border/50 flex items-center`}>
                    <span className="font-sans text-[13px] font-[400] text-text-secondary/65 leading-snug">
                      {row.traditional}
                    </span>
                  </div>
                  <div className={`bg-accent/[0.06] px-7 py-6 border-l ${!isLast ? 'border-b border-border/40' : ''} border-border/50 flex flex-col justify-center`}>
                    <span className="font-sans text-[13.5px] font-[500] text-text-primary leading-snug">
                      {row.stem}
                    </span>
                    {row.stemNote && (
                      <span className="font-sans text-[11px] text-accent mt-1">{row.stemNote}</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* ── MOBILE feature rows ── */}
          <div className="md:hidden">
            {featureRows.map((row, i) => {
              const isLast = i === featureRows.length - 1
              return (
                <motion.div
                  key={row.feature}
                  className={!isLast ? 'border-b border-border/40' : ''}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.42 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="bg-surface px-5 py-3 border-b border-border/30 text-center">
                    <span className="font-editorial text-[15px] font-[450] text-text-primary/90" style={{ fontVariationSettings: "'opsz' 20" }}>
                      {row.feature}
                    </span>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="bg-bg px-4 py-4 flex items-start">
                      <span className="font-sans text-[12.5px] font-[400] text-text-secondary/65 leading-snug">
                        {row.traditional}
                      </span>
                    </div>
                    <div className="bg-accent/[0.06] px-4 py-4 border-l border-border/50 flex flex-col">
                      <span className="font-sans text-[13px] font-[500] text-text-primary leading-snug">
                        {row.stem}
                      </span>
                      {row.stemNote && (
                        <span className="font-sans text-[10.5px] text-accent mt-1">{row.stemNote}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </motion.div>

        {/* Bottom — CTA */}
        <motion.div
          className="mt-10 flex justify-end"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75 }}
        >
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