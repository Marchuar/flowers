import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function AboutPage() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })
  const { t } = useTranslation()

  const stats = [
    { value: '1-2d', label: t('about.stat2Label'), note: t('about.stat2Note') },
    { value: '9–21', label: t('about.stat3Label'), note: t('about.stat3Note') },
    { value: '0%',   label: t('about.stat4Label'), note: t('about.stat4Note') },
  ]

  const values = [
    { label: t('about.value1Label'), desc: t('about.value1Desc') },
    { label: t('about.value2Label'), desc: t('about.value2Desc') },
    { label: t('about.value3Label'), desc: t('about.value3Desc') },
  ]

  return (
    <section ref={ref} className="pb-24 bg-bg">

      {/* Hero area with gradient */}
      <div
        className="relative px-6 md:px-10 pt-16 pb-20 md:pb-28 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 70% at 100% 0%, rgba(107,140,255,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 0% 100%, rgba(200,98,42,0.11) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 50% 45%, rgba(180,127,212,0.04) 0%, transparent 70%),
            #FAFAF7
          `,
        }}
      >
        {/* Large decorative watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-8 md:pr-16 pointer-events-none select-none overflow-hidden" aria-hidden>
          <span
            className="font-brand font-bold leading-none tracking-[0.08em] text-text-primary"
            style={{ fontSize: 'clamp(140px, 22vw, 340px)', opacity: 0.025 }}
          >
            STEM
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-start md:gap-20">

            {/* Left: text content */}
            <div className="md:w-[55%]">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="w-5 h-px bg-text-secondary/30" />
                <span className="eyebrow text-text-secondary/60">{t('about.eyebrow')}</span>
              </motion.div>

              <motion.h1
                className="section-heading text-text-primary mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t('about.heading')}<br />
                <span className="italic text-text-secondary">{t('about.headingItalic')}</span>
              </motion.h1>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="font-sans text-[16px] font-[400] text-text-secondary leading-relaxed">{t('about.para1')}</p>
                <p className="font-sans text-[16px] font-[400] text-text-secondary leading-relaxed">{t('about.para2')}</p>
                <p className="font-sans text-[16px] font-[400] text-text-secondary leading-relaxed">{t('about.para3')}</p>
              </motion.div>
            </div>

            {/* Right: key values */}
            <motion.div
              className="hidden md:flex flex-col gap-6 md:w-[45%] pt-16"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {values.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-surface border border-border/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                  <div>
                    <div className="font-sans text-[13px] font-[600] text-text-primary mb-1">{item.label}</div>
                    <div className="font-sans text-[13px] font-[400] text-text-secondary leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dark stats panel */}
      <div ref={statsRef} className="bg-ink px-6 md:px-10 py-16 md:py-20 overflow-hidden relative">

        {/* Subtle watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
          <span
            className="font-brand font-bold leading-none tracking-[0.08em] whitespace-nowrap text-ink-text"
            style={{ fontSize: 'clamp(120px, 22vw, 320px)', opacity: 0.03 }}
          >
            STEM
          </span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="w-5 h-px bg-ink-text/20" />
            <span className="eyebrow text-ink-text/40">{t('about.byNumbers')}</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="font-editorial font-light text-ink-text leading-none mb-2"
                  style={{
                    fontSize: 'clamp(44px, 6vw, 72px)',
                    fontVariationSettings: "'opsz' 72",
                  }}
                >
                  {stat.value}
                </div>
                <div className="font-sans text-[13px] font-[500] text-ink-text/80 mb-1">{stat.label}</div>
                <div className="font-sans text-[11px] font-[450] text-ink-text/50">{stat.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
