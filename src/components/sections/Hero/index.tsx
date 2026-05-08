import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SeasonCard } from './SeasonCard'
import { FlowerBlue, FlowerCoral, FlowerGreen, FlowerPink } from './heroFlowers'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { t } = useTranslation()

  const stats = [
    { value: t('hero.statDeliveryValue'), label: t('hero.statDeliveryLabel') },
    { value: '100%',                      label: t('hero.statWholesaleLabel') },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden md:min-h-[calc(100svh-4rem)] bg-[#FAFAF7]"
    >
      {/* Gradient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.2 }}
        style={{
          background: `
            radial-gradient(ellipse 90% 80% at 105% 0%, rgba(180,127,212,0.22) 0%, transparent 65%),
            radial-gradient(ellipse 85% 75% at -5% 105%, rgba(200,98,42,0.24) 0%, transparent 65%),
            radial-gradient(ellipse 40% 45% at 15% 30%, rgba(180,127,212,0.06) 0%, transparent 65%)
          `,
        }}
      />

      {/* Top border rule */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-border z-10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Background flowers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-36 md:w-52 md:top-[25%] lg:w-64 lg:top-[65%] lg:right-[-2%] right-[0%] hidden md:block"
          initial={{ scale: 0.7, opacity: 0, rotate: 15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile-delay md:animate-float-delay"
            style={{ willChange: 'transform', filter: 'blur(2.5px) drop-shadow(0 20px 40px rgba(245,162,122,0.3))' }}
          >
            <FlowerCoral />
          </div>
        </motion.div>

        <motion.div
            className="absolute w-20 bottom-[55%] left-[2%] lg:bottom-[4%] hidden lg:block"
            initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
              className="animate-float-mobile-slow md:animate-float-slow"
              style={{ willChange: 'transform', filter: 'blur(2px) drop-shadow(0 20px 40px rgba(92,184,92,0.3))' }}
          >
            <FlowerGreen />
          </div>
        </motion.div>
      </div>

      {/* Foreground flowers — all fully within screen bounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[25]">
        <motion.div
          className="absolute w-56 top-[1%] right-[1%] md:w-56 md:right-[2%] lg:w-60 lg:top-[0%] lg:right-[-3%] xl:w-72 xl:right-[0%] xl:top-[-2%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile md:animate-float"
            style={{ willChange: 'transform', filter: 'blur(3px) drop-shadow(0 24px 48px rgba(107,140,255,0.28))' }}
          >
            <FlowerBlue />
          </div>
        </motion.div>

        <motion.div
          className="md:hidden absolute w-32 top-[25%] right-[2%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float"
            style={{ willChange: 'transform', filter: 'blur(2.5px) drop-shadow(0 16px 32px rgba(242,160,184,0.28))' }}
          >
            <FlowerPink />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1840px] mx-auto px-6 md:px-10 lg:px-12 xl:px-16 h-full">
        <div className="flex flex-col md:flex-row md:items-stretch md:min-h-[calc(100svh-4rem)]">

          {/* Left column */}
          <div className="flex flex-col pt-10 pb-12 md:w-[100%] md:py-14 lg:mr-8 xl:mr-12 lg:w-[58%] xl:w-[54%] md:justify-between gap-7 md:gap-0">

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-6 h-px bg-accent" />
              <span className="eyebrow text-accent">{t('hero.eyebrow')}</span>
            </motion.div>

            <div>
              <div className="pb-[0.12em]" style={{ clipPath: 'inset(0 -5rem 0 -5rem)' }}>
                <motion.div
                  className="text-display text-text-primary"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t('hero.line1')}
                </motion.div>
              </div>
              <div className="pb-[0.12em]" style={{ clipPath: 'inset(0 -5rem 0 -5rem)' }}>
                <motion.div
                  className="text-display italic text-accent"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.33, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t('hero.line2')}
                </motion.div>
              </div>
              <div className="mt-1 pb-[0.2em]" style={{ clipPath: 'inset(0 -5rem 0 -5rem)' }}>
                <motion.div
                  className="text-display text-text-primary"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t('hero.line3pre')}
                  <span className="italic text-accent-warm">{t('hero.line3em')}</span>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="flex flex-col gap-6 md:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <p className="font-sans text-[14px] md:text-[15px] font-[450] text-text-secondary leading-relaxed max-w-[340px]">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2.5 bg-text-primary text-bg font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.08em] uppercase px-5 md:px-6 py-3 md:py-3.5 rounded-full hover:bg-accent transition-colors duration-300"
                >
                  {t('hero.shopNow')}
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 border border-border text-text-secondary font-sans text-[11px] md:text-[12px] font-[450] px-5 md:px-6 py-3 md:py-3.5 rounded-full hover:border-text-primary hover:text-text-primary transition-colors duration-300"
                >
                  {t('hero.howItWorks')}
                </Link>
              </div>

              <div className="flex items-center gap-6 md:gap-8 pt-2 border-t border-border">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08 }}
                  >
                    <div className="font-display text-[20px] md:text-[22px] font-[600] text-text-primary leading-none">{s.value}</div>
                    <div className="font-sans text-[10px] md:text-[11px] font-[500] text-text-secondary mt-0.5 uppercase tracking-[0.1em]">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Season card — mobile/tablet only */}
            <motion.div
              className="lg:hidden mt-6 md:flex items-center justify-center py-14 relative z-20"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <SeasonCard />
            </motion.div>
          </div>

          {/* Right column — season card, lg+ only */}
          <div className="hidden lg:flex flex-1 items-center justify-center py-14 relative z-20 pl-4">
            <motion.div
              className="w-full max-w-[380px] xl:max-w-[440px]"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <SeasonCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue — desktop only */}
      <motion.div
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="w-px h-10 bg-border origin-top"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
        />
        <span className="eyebrow text-text-secondary/40 text-[9px]">{t('hero.scroll')}</span>
      </motion.div>
    </section>
  )
}
