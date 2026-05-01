import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function TulipIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      <line x1="16" y1="28" x2="16" y2="18" stroke="#6B7C5A" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 23 Q12 21 12 17 Q14 20 16 23Z" fill="#7A9468"/>
      <path d="M13 19 C11 15 12 10 16 8 C20 10 21 15 19 19 Q18 21 16 22 Q14 21 13 19Z" fill="#E8A0C8" opacity="0.9"/>
      <path d="M10 18 C9 14 11 10 14 9 C13 12 12 16 13 19 Q11 19 10 18Z" fill="#D494BA" opacity="0.8"/>
      <path d="M22 18 C23 14 21 10 18 9 C19 12 20 16 19 19 Q21 19 22 18Z" fill="#D494BA" opacity="0.8"/>
    </svg>
  )
}

function PeonyIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      {[0,45,90,135,180,225,270,315].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="3.5" ry="7.5"
          fill="#F5B8C8" opacity="0.65"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      {[22,67,112,157,202,247].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="2.8" ry="5.5"
          fill="#F9CDD8" opacity="0.85"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      <circle cx="16" cy="16" r="3" fill="#FFF0F3"/>
      <circle cx="16" cy="16" r="1.2" fill="#F5A0B8"/>
    </svg>
  )
}

function RanunculusIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
      {[0,40,80,120,160,200,240,280,320].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="3" ry="7"
          fill="#F5A07A" opacity="0.55"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      {[20,60,100,140,180,220,260,300,340].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="2.5" ry="5.5"
          fill="#F5B090" opacity="0.75"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      {[0,60,120,180,240,300].map((a, i) => (
        <ellipse key={i} cx="16" cy="16" rx="2" ry="4"
          fill="#F09060" opacity="0.9"
          transform={`rotate(${a} 16 16)`}/>
      ))}
      <circle cx="16" cy="16" r="2.5" fill="#FFD4A0"/>
    </svg>
  )
}

const SEASON_STEMS = [
  { name: 'Tulip',      colors: 'pink & purple', price: 3, bg: '#F9E4EE', Icon: TulipIcon },
  { name: 'Peony',      colors: 'blush & white', price: 9, bg: '#FCE8EF', Icon: PeonyIcon },
  { name: 'Ranunculus', colors: 'salmon & cream', price: 7, bg: '#FDEEE6', Icon: RanunculusIcon },
]

const DAY_MESSAGES: Record<string, string> = {
  Monday:    'Fresh week — start it beautifully',
  Tuesday:   'Mid-week pick-me-up for someone you love',
  Wednesday: 'Halfway there — treat yourself',
  Thursday:  'Almost the weekend — order ahead',
  Friday:    'Weekend flowers, delivered today',
  Saturday:  'Saturday market picks, just arrived',
  Sunday:    'Sunday stems — slow morning vibes',
}

function SeasonCard() {
  const today   = new Date()
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
  const message = DAY_MESSAGES[dayName] ?? 'Fresh flowers, delivered today'

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-border bg-surface shadow-[0_8px_48px_rgba(0,0,0,0.09)]">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 bg-bg-subtle border-b border-border">
        <p className="font-sans text-[10px] font-[600] tracking-[0.18em] uppercase text-text-secondary/50 mb-2">Today</p>
        <p className="font-display text-[32px] font-[650] text-text-primary leading-none mb-2">{dayName}</p>
        <p className="font-sans text-[13px] text-text-secondary leading-snug">{message}</p>
      </div>

      {/* Stems list */}
      <div className="px-5 pt-5 pb-2 bg-bg">
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="font-sans text-[10px] font-[600] tracking-[0.16em] uppercase text-text-secondary/50">Stems in season</p>
          <span className="font-sans text-[11px] font-[550] text-accent">Spring peak</span>
        </div>

        <div className="flex flex-col gap-2">
          {SEASON_STEMS.map(({ name, colors, price, bg, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-4 px-3 py-3 rounded-xl bg-surface border border-border"
            >
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: bg, width: '3.25rem', height: '3.25rem' }}
              >
                <Icon />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[15px] font-[560] text-text-primary leading-none mb-1">{name}</p>
                <p className="font-sans text-[12px] text-text-secondary leading-none">{colors}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-display text-[19px] font-[650] text-text-primary leading-none">{price} zł</p>
                <p className="font-sans text-[10px] text-text-secondary/50 mt-1">per stem</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-4 bg-bg">
        <Link
          to="/shop"
          className="group flex items-center justify-center gap-2 w-full bg-text-primary text-bg font-sans text-[12px] font-[500] tracking-[0.07em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-300"
        >
          Build your order
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

function FlowerBlue() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g filter="url(#blur1)">
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="28" ry="55"
            fill="#6B8CFF" transform={`rotate(${angle} 100 100)`} opacity="0.9" />
        ))}
        <circle cx="100" cy="100" r="28" fill="#E8A0C8" />
      </g>
      <defs>
        <filter id="blur1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  )
}

function FlowerCoral() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g filter="url(#blur2)">
        {[0,36,72,108,144,180,216,252,288,324].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="22" ry="48"
            fill="#F5A27A" transform={`rotate(${angle} 100 100)`} opacity="0.88" />
        ))}
        <circle cx="100" cy="100" r="24" fill="#FFD166" />
      </g>
      <defs>
        <filter id="blur2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
    </svg>
  )
}

function FlowerGreen() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M100 180 Q90 140 100 110" stroke="#5CB85C" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M100 150 Q70 130 75 110 Q90 125 100 150Z" fill="#5CB85C" />
      <g filter="url(#blur3)">
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse key={i} cx="100" cy="90" rx="20" ry="40"
            fill="#5CB85C" transform={`rotate(${angle} 100 90)`} opacity="0.9" />
        ))}
        <circle cx="100" cy="90" r="22" fill="#A8E063" />
      </g>
      <defs>
        <filter id="blur3" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
    </svg>
  )
}

function FlowerPurple() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g filter="url(#blur4)">
        {[0,45,90,135,180,225,270,315].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="25" ry="50"
            fill="#B47FD4" transform={`rotate(${angle} 100 100)`} opacity="0.85" />
        ))}
        <circle cx="100" cy="100" r="26" fill="#E8C4E8" />
      </g>
      <defs>
        <filter id="blur4" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  )
}

function FlowerPink() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g filter="url(#blur5)">
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="18" ry="42"
            fill="#F2A0B8" transform={`rotate(${angle} 100 100)`} opacity="0.9" />
        ))}
        <circle cx="100" cy="100" r="20" fill="#FFE4EA" />
      </g>
      <defs>
        <filter id="blur5" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
    </svg>
  )
}

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
      {/* Gradient glow — fades in slowly */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.8, ease: 'easeOut', delay: 0.2 }}
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

      {/* Floating flowers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-52 md:w-80 lg:w-96 xl:w-[28rem] top-[2%] right-[2%] md:right-[5%] lg:right-[8%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile md:animate-float md:drop-shadow-[0_24px_48px_rgba(107,140,255,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerBlue />
          </div>
        </motion.div>

        <motion.div
          className="absolute w-40 md:w-60 lg:w-72 xl:w-80 top-[58%] right-[-3%] md:right-[-1%] lg:right-[1%]"
          initial={{ scale: 0.7, opacity: 0, rotate: 15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile-delay md:animate-float-delay md:drop-shadow-[0_20px_40px_rgba(245,162,122,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerCoral />
          </div>
        </motion.div>

        <motion.div
          className="absolute w-28 md:w-36 bottom-[12%] left-[4%] md:left-[6%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile-slow md:animate-float-slow md:drop-shadow-[0_20px_40px_rgba(92,184,92,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerGreen />
          </div>
        </motion.div>

        <motion.div
          className="absolute w-20 md:w-28 top-[18%] left-[2%] md:left-[4%] hidden md:block"
          initial={{ scale: 0.7, opacity: 0, rotate: 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-delay2 drop-shadow-[0_20px_40px_rgba(180,127,212,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerPurple />
          </div>
        </motion.div>

        <motion.div
          className="absolute w-28 md:w-44 lg:w-52 bottom-[4%] right-[16%] md:right-[20%] lg:right-[24%] hidden md:block"
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float drop-shadow-[0_16px_32px_rgba(242,160,184,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerPink />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 xl:px-16 h-full">
        <div className="flex flex-col md:flex-row md:items-stretch md:min-h-[calc(100svh-4rem)]">

          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div className="flex flex-col pt-10 pb-12 md:py-14 lg:mr-8 xl:mr-12 lg:w-[50%] xl:w-[44%] md:justify-between gap-7 md:gap-0">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-6 h-px bg-accent" />
              <span className="eyebrow text-accent">{t('hero.eyebrow')}</span>
            </motion.div>

            {/* Headline */}
            <div>
              <div className="overflow-hidden pb-[0.12em]">
                <motion.div
                  className="text-display text-text-primary"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t('hero.line1')}
                </motion.div>
              </div>
              <div className="overflow-hidden pb-[0.12em]">
                <motion.div
                  className="text-display italic text-accent"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.33, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t('hero.line2')}
                </motion.div>
              </div>
              <div className="overflow-hidden mt-1 pb-[0.2em]">
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

            {/* Bottom: description + CTA + stats */}
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

              {/* Stats row */}
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

            {/* Mobile + tablet (< lg) season card */}
            <motion.div
              className="lg:hidden mt-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              <SeasonCard />
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — season card (lg+ only) ── */}
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