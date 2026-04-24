import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Building2, Coffee, Hotel, Camera, Sparkles, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const clientIcons = [Building2, Coffee, Hotel, Calendar, Camera, Sparkles]
const clientColors = ['#B5CEAA', '#F5C5A0', '#EFBDBD', '#C5B8E8', '#E8A0A0', '#F0D090']

function RevealSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function BusinessPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const { t } = useTranslation()

  const clients = [
    { title: t('business.client1Title'), body: t('business.client1Body'), color: clientColors[0], Icon: clientIcons[0] },
    { title: t('business.client2Title'), body: t('business.client2Body'), color: clientColors[1], Icon: clientIcons[1] },
    { title: t('business.client3Title'), body: t('business.client3Body'), color: clientColors[2], Icon: clientIcons[2] },
    { title: t('business.client4Title'), body: t('business.client4Body'), color: clientColors[3], Icon: clientIcons[3] },
    { title: t('business.client5Title'), body: t('business.client5Body'), color: clientColors[4], Icon: clientIcons[4] },
    { title: t('business.client6Title'), body: t('business.client6Body'), color: clientColors[5], Icon: clientIcons[5] },
  ]

  const benefits = [
    { number: '01', title: t('business.benefit1Title'), body: t('business.benefit1Body') },
    { number: '02', title: t('business.benefit2Title'), body: t('business.benefit2Body') },
    { number: '03', title: t('business.benefit3Title'), body: t('business.benefit3Body') },
  ]

  const steps = [
    { step: '1', title: t('business.step1Title'), body: t('business.step1Body') },
    { step: '2', title: t('business.step2Title'), body: t('business.step2Body') },
    { step: '3', title: t('business.step3Title'), body: t('business.step3Body') },
  ]

  return (
    <div className="bg-bg min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 px-6 md:px-10">

<div ref={heroRef} className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <div className="w-6 h-px bg-accent" />
            <span className="eyebrow text-accent">{t('business.eyebrow')}</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-display text-text-primary"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE_OUT }}
            >
              {t('business.heading1')}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-display italic text-accent"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease: EASE_OUT }}
            >
              {t('business.heading2')}
            </motion.h1>
          </div>

          <motion.p
            className="font-sans text-[15px] font-[450] text-text-secondary leading-relaxed max-w-[480px] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
          >
            {t('business.heroPara')}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65, ease: EASE_OUT }}
          >
            <a
              href="mailto:hello@stem.flowers"
              className="group inline-flex items-center gap-2.5 bg-text-primary text-bg font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.08em] uppercase px-6 py-3.5 rounded-full hover:bg-accent transition-colors duration-200"
            >
              {t('business.getFreeQuote')}
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-border text-text-secondary font-sans text-[11px] md:text-[12px] font-[450] px-6 py-3.5 rounded-full hover:border-text-primary hover:text-text-primary transition-all duration-200"
            >
              {t('nav.howItWorks')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">{t('business.clientsSubEyebrow')}</span>
            </div>
            <h2 className="section-heading text-text-primary">{t('business.clientsHeading')}</h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client, i) => {
              const Icon = client.Icon
              return (
                <RevealSection key={client.title} delay={i * 0.06}>
                  <div
                    className="flex flex-col gap-4 p-6 rounded-3xl bg-bg h-full transition-transform duration-300 ease-out hover:-translate-y-1"
                    style={{ willChange: 'transform' }}
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: client.color + '80' }}
                    >
                      <Icon size={20} strokeWidth={1.6} className="text-text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-[22px] font-[450] text-text-primary leading-tight mb-2">{client.title}</h3>
                      <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{client.body}</p>
                    </div>
                  </div>
                </RevealSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-bg">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">{t('business.benefitsEyebrow')}</span>
            </div>
            <h2 className="section-heading text-text-primary">{t('business.benefitsHeading')}</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <RevealSection key={b.number} delay={i * 0.1}>
                <div className="flex flex-col h-full p-8 bg-bg-subtle rounded-3xl border-t-2 border-accent">
                  <span className="eyebrow text-accent mb-6">{b.number}</span>
                  <h3 className="font-display text-[28px] font-[400] text-text-primary leading-tight mb-3">{b.title}</h3>
                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{b.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">{t('business.stepsEyebrow')}</span>
            </div>
            <h2 className="section-heading text-text-primary">{t('business.stepsHeading')}</h2>
          </RevealSection>

          {steps.map((s, i) => (
            <RevealSection key={s.step} delay={i * 0.1}>
              <div className="flex gap-8 items-start py-8 border-b border-border last:border-0">
                <span className="font-display text-[52px] font-light text-text-secondary/55 leading-none shrink-0 w-12">{s.step}</span>
                <div className="pt-2">
                  <h3 className="font-display text-[24px] md:text-[28px] font-[400] text-text-primary leading-tight mb-2">{s.title}</h3>
                  <p className="font-sans text-[14px] text-text-secondary leading-relaxed max-w-[520px]">{s.body}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-text-primary">
        <div className="max-w-5xl mx-auto text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-5 h-px bg-surface/20" />
              <span className="eyebrow text-surface/40">{t('business.ctaEyebrow')}</span>
              <div className="w-5 h-px bg-surface/20" />
            </div>
            <h2
              className="font-display font-[400] text-bg mb-4"
              style={{ fontSize: 'clamp(32px, 6vw, 72px)', lineHeight: '1' }}
            >
              {t('business.ctaHeading')}<br />
              <span className="italic text-accent">{t('business.ctaHeadingItalic')}</span>
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-surface/50 leading-relaxed max-w-[400px] mx-auto mt-5 mb-10">
              {t('business.ctaDesc')}
            </p>
            <a
              href="mailto:hello@stem.flowers"
              className="group inline-flex items-center gap-2.5 bg-surface text-text-primary font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-accent hover:text-surface transition-colors duration-200"
            >
              {t('business.ctaGetStarted')}
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
