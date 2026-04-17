import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../../hooks/useIsMobile'

function FlowerSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g filter="url(#eblur)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse key={i} cx="100" cy="100" rx="28" ry="55"
            fill={i % 2 === 0 ? '#F5A27A' : '#E8C4A0'}
            transform={`rotate(${angle} 100 100)`} opacity="0.85" />
        ))}
        <circle cx="100" cy="100" r="26" fill="#FFD166" />
      </g>
      <defs>
        <filter id="eblur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
    </svg>
  )
}

function makeMeteors(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 50}%`,
    left: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 5}s`,
    size: `${0.8 + Math.random() * 1.2}px`,
  }))
}

function MeteorEffect({ count }: { count: number }) {
  const meteors = useRef(makeMeteors(count))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.current.map(m => (
        <span
          key={m.id}
          className="absolute rounded-full bg-surface/25 shadow-[0_0_0_1px_rgba(253,250,245,0.08)]"
          style={{
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size,
            animationName: 'meteor',
            animationDuration: m.duration,
            animationDelay: m.delay,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            transform: 'rotate(215deg)',
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMobile = useIsMobile()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStatus('success')
    }
  }

  const words = ['Never', 'miss', 'a', 'fresh', 'batch.']

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-6 md:px-10 bg-bark overflow-hidden">
      <MeteorEffect count={isMobile ? 4 : 10} />

      {/* Decorative thin rings */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(253,250,245,0.06)' }}
        aria-hidden
      />
      <div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(253,250,245,0.04)' }}
        aria-hidden
      />

      {/* Decorative flower */}
      <motion.div
        className="absolute -bottom-8 -right-8 md:bottom-0 md:right-0 w-44 md:w-64 opacity-[0.18]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlowerSVG />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="w-5 h-px bg-accent/50" />
          <span className="eyebrow text-accent">Fresh stems, weekly</span>
          <div className="w-5 h-px bg-accent/50" />
        </motion.div>

        {/* Headline — word by word */}
        <h2
          className="font-display font-light leading-none text-surface mb-5 tracking-tight"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '-0.025em' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.18em]"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {i === 3 ? <span className="italic text-surface/55">{word}</span> : word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          className="font-sans text-[13.5px] font-light text-surface/45 mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}
        >
          Weekly stems, seasonal picks, and first access to new varieties — straight to your inbox.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
        >
          <AnimatePresence mode="wait">
            {status === 'idle' ? (
              <motion.div
                key="form"
                className="flex flex-col sm:flex-row gap-3 w-full"
                exit={{ opacity: 0, y: -10 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-surface/[0.08] text-surface placeholder:text-surface/25 border border-surface/[0.15] rounded-full px-5 py-3.5 font-sans text-[13px] outline-none focus:border-surface/40 focus:bg-surface/12 transition-all"
                />
                <motion.button
                  type="submit"
                  className="bg-surface text-bark font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full whitespace-nowrap hover:bg-accent hover:text-surface transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                className="w-full flex items-center justify-center gap-3 bg-accent/15 text-surface border border-accent/25 rounded-full px-6 py-3.5"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 5.5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-sans text-[13px]">You're on the list! We'll be in touch.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <motion.p
          className="font-sans text-[11px] text-surface/20 mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          Unsubscribe anytime. No spam.
        </motion.p>
      </div>
    </section>
  )
}
