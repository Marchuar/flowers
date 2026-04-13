import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

function MeteorEffect() {
  const meteors = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 40}%`,
    left: `${10 + Math.random() * 80}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: `${1 + Math.random()}px`,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteors.map(m => (
        <span
          key={m.id}
          className="absolute rounded-full bg-surface/20 shadow-[0_0_0_1px_rgba(253,250,245,0.1)] rotate-[215deg]"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStatus('success')
    }
  }

  const words = ['Order', 'for', 'tomorrow.']

  return (
    <section ref={ref} className="relative py-24 md:py-36 px-6 md:px-10 bg-bark overflow-hidden">
      <MeteorEffect />

      {/* Decorative flower */}
      <motion.div
        className="absolute -bottom-8 -right-8 md:bottom-0 md:right-0 w-40 md:w-64 opacity-20"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FlowerSVG />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          className="eyebrow text-accent mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Delivery in Warsaw
        </motion.div>

        {/* Headline — word by word */}
        <h2
          className="font-display text-[56px] md:text-[80px] lg:text-[96px] font-light leading-none text-surface mb-4 tracking-tight"
          style={{ letterSpacing: '-0.02em' }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.2em]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {i === 1 ? <span className="italic text-surface/60">{word}</span> : word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          className="font-sans text-[14px] font-light text-surface/50 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Get early access. We'll notify you when we launch.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
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
                  className="flex-1 bg-surface/10 text-surface placeholder:text-surface/30 border border-surface/20 rounded-full px-5 py-3 font-sans text-[13px] outline-none focus:border-surface/50 focus:bg-surface/15 transition-all"
                />
                <motion.button
                  type="submit"
                  className="relative overflow-hidden bg-surface text-bark font-sans text-[12px] font-[500] tracking-[0.08em] uppercase px-6 py-3 rounded-full whitespace-nowrap hover:bg-accent hover:text-surface transition-colors duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Join the list →
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                className="w-full flex items-center justify-center gap-3 bg-accent/20 text-surface border border-accent/30 rounded-full px-6 py-3"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <span className="text-accent text-lg">✓</span>
                <span className="font-sans text-[13px]">You're on the list! We'll be in touch.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <motion.p
          className="font-sans text-[11px] text-surface/25 mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Free pickup on your first order. Zero spam.
        </motion.p>
      </div>
    </section>
  )
}
