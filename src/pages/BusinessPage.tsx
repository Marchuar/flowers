import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Building2, Coffee, Hotel, Camera, Sparkles, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BeforeAfterSlider } from '../components/ui/BeforeAfterSlider'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const clientIcons = [Building2, Coffee, Hotel, Calendar, Camera, Sparkles]
const clientColors = ['#B5CEAA', '#F5C5A0', '#EFBDBD', '#C5B8E8', '#E8A0A0', '#F0D090']
const clientImages = [
  { before: '/images/before-after/office-before.png',     after: '/images/before-after/office-after.png' },
  { before: '/images/before-after/restaurant-before.png', after: '/images/before-after/restaurant-after.png' },
  { before: '/images/before-after/hotel-before.png',      after: '/images/before-after/hotel-after.png' },
  { before: '/images/before-after/events-before.png',     after: '/images/before-after/events-after.png' },
  { before: '/images/before-after/studio-before.png',     after: '/images/before-after/studio-after.png' },
  { before: '/images/before-after/spa-before.png',        after: '/images/before-after/spa-after.png' },
]
const sectionBg = ['bg-bg', 'bg-bg-subtle', 'bg-bg', 'bg-bg-subtle', 'bg-bg', 'bg-bg-subtle']

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
    { title: t('business.client1Title'), body: t('business.client1Body'), feats: [t('business.client1Feat1'), t('business.client1Feat2'), t('business.client1Feat3')], slogan: t('business.client1Slogan'), color: clientColors[0], Icon: clientIcons[0], ...clientImages[0] },
    { title: t('business.client2Title'), body: t('business.client2Body'), feats: [t('business.client2Feat1'), t('business.client2Feat2'), t('business.client2Feat3')], slogan: t('business.client2Slogan'), color: clientColors[1], Icon: clientIcons[1], ...clientImages[1] },
    { title: t('business.client3Title'), body: t('business.client3Body'), feats: [t('business.client3Feat1'), t('business.client3Feat2'), t('business.client3Feat3')], slogan: t('business.client3Slogan'), color: clientColors[2], Icon: clientIcons[2], ...clientImages[2] },
    { title: t('business.client4Title'), body: t('business.client4Body'), feats: [t('business.client4Feat1'), t('business.client4Feat2'), t('business.client4Feat3')], slogan: t('business.client4Slogan'), color: clientColors[3], Icon: clientIcons[3], ...clientImages[3] },
    { title: t('business.client5Title'), body: t('business.client5Body'), feats: [t('business.client5Feat1'), t('business.client5Feat2'), t('business.client5Feat3')], slogan: t('business.client5Slogan'), color: clientColors[4], Icon: clientIcons[4], ...clientImages[4] },
    { title: t('business.client6Title'), body: t('business.client6Body'), feats: [t('business.client6Feat1'), t('business.client6Feat2'), t('business.client6Feat3')], slogan: t('business.client6Slogan'), color: clientColors[5], Icon: clientIcons[5], ...clientImages[5] },
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

      {/* ── WHO IT'S FOR — HEADER ── */}
      <section className="pt-20 md:pt-28 pb-14 md:pb-16 px-6 md:px-10 bg-bg-subtle">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">{t('business.clientsSubEyebrow')}</span>
            </div>
            <h2 className="section-heading text-text-primary mb-3">{t('business.clientsHeading')}</h2>
            <p className="font-sans text-[13px] text-text-secondary/60 mt-1 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-text-secondary/30" />
              {t('business.clientsDesc')}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── WHO IT'S FOR — SECTIONS ── */}
      {clients.map((client, i) => {
        const Icon = client.Icon
        const isEven = i % 2 === 0
        return (
          <section key={client.title} className={`py-20 md:py-24 px-6 md:px-10 ${sectionBg[i]}`}>
            <div className="max-w-6xl mx-auto">
              <RevealSection>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}>

                  {/* ── Slider column ── */}
                  <div className="w-full lg:w-[58%] shrink-0">
                    <div className="rounded-2xl overflow-hidden shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
                      <BeforeAfterSlider before={client.before} after={client.after} alt={client.title} />
                    </div>
                    <div className="flex items-center gap-2.5 mt-4">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: client.color + '90' }}
                      >
                        <Icon size={15} strokeWidth={1.6} className="text-text-primary" />
                      </div>
                      <span className="eyebrow text-text-secondary/50">{client.title}</span>
                    </div>
                  </div>

                  {/* ── Content column ── */}
                  <div className="flex-1 min-w-0">

                    {/* Slogan — headline anchor */}
                    <p
                      className="font-display italic text-text-primary leading-snug mb-8"
                      style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}
                    >
                      {client.slogan}
                    </p>

                    {/* Deliverables list */}
                    <ul className="space-y-4 mb-8">
                      {client.feats.map((feat) => (
                        <li key={feat} className="flex items-start gap-3.5">
                          <span
                            className="mt-[3px] w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: client.color + '70' }}
                          >
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                              <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#2C5F3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="font-sans text-[13.5px] text-text-secondary leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="w-10 h-px bg-border mb-7" />

                    {/* Body */}
                    <p className="font-sans text-[13.5px] text-text-secondary/70 leading-relaxed max-w-[360px]">
                      {client.body}
                    </p>

                  </div>
                </div>
              </RevealSection>
            </div>
          </section>
        )
      })}

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
