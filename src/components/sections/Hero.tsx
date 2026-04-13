import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// SVG flower components
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
      {/* Stem */}
      <path d="M100 180 Q90 140 100 110" stroke="#5CB85C" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Leaf */}
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

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const flowersY = useTransform(scrollY, [0, 500], [0, -80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3])

  useEffect(() => {
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll('.word')
    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { y: 90, opacity: 0, rotateX: -40 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-bg pt-16">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-bg-subtle pointer-events-none" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-bg-subtle/50 to-transparent pointer-events-none" />

      {/* Floating flowers */}
      <motion.div style={{ y: flowersY }} className="absolute inset-0 pointer-events-none">
        {/* Blue flower — large, overlapping headline */}
        <motion.div
          className="absolute w-48 md:w-64 lg:w-72 top-[15%] right-[8%] md:right-[12%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float drop-shadow-[0_20px_40px_rgba(107,140,255,0.35)]">
            <FlowerBlue />
          </div>
        </motion.div>

        {/* Coral flower — mid right */}
        <motion.div
          className="absolute w-36 md:w-48 lg:w-56 top-[45%] right-[3%] md:right-[5%]"
          initial={{ scale: 0.7, opacity: 0, rotate: 15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float-delay drop-shadow-[0_20px_40px_rgba(245,162,122,0.35)]">
            <FlowerCoral />
          </div>
        </motion.div>

        {/* Green flower — lower left */}
        <motion.div
          className="absolute w-28 md:w-36 bottom-[15%] left-[5%] md:left-[8%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float-slow drop-shadow-[0_20px_40px_rgba(92,184,92,0.35)]">
            <FlowerGreen />
          </div>
        </motion.div>

        {/* Purple flower — upper left */}
        <motion.div
          className="absolute w-20 md:w-28 top-[20%] left-[3%] md:left-[6%]"
          initial={{ scale: 0.7, opacity: 0, rotate: 10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="animate-float-delay2 drop-shadow-[0_20px_40px_rgba(180,127,212,0.35)]">
            <FlowerPurple />
          </div>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full py-20">
        {/* Eyebrow */}
        <motion.div
          className="eyebrow text-text-secondary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Warsaw · Delivery in 2 hours
        </motion.div>

        {/* Main headline */}
        <div
          ref={headlineRef}
          className="overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          <div className="text-display text-text-primary leading-none">
            <div className="overflow-hidden">
              <span className="word inline-block">Fresh&nbsp;</span>
              <span className="word inline-block">flowers,</span>
            </div>
            <div className="overflow-hidden mt-1 md:mt-2 ml-[8%] md:ml-[15%]">
              <span className="word inline-block italic font-display text-accent-warm" style={{
                fontSize: 'clamp(56px, 8vw, 120px)',
                fontWeight: 300,
                lineHeight: 0.93,
              }}>
                not&nbsp;
              </span>
              <span className="word inline-block">bouquets.</span>
            </div>
          </div>
        </div>

        {/* Subtext */}
        <motion.p
          className="font-sans text-[15px] md:text-[17px] font-light text-text-secondary mt-6 md:mt-8 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Wholesale price. Zero floristry.<br />
          Delivered in Warsaw within 2 hours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <a
            href="#"
            onClick={e => { e.preventDefault(); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group relative overflow-hidden bg-text-primary text-surface font-sans text-[13px] font-[500] tracking-[0.08em] uppercase px-7 py-3.5 rounded-full transition-all duration-300 hover:bg-accent"
          >
            Shop flowers →
          </a>
          <a
            onClick={e => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="font-sans text-[13px] font-[400] text-text-secondary hover:text-text-primary transition-colors border border-border px-7 py-3.5 rounded-full hover:border-text-primary"
          >
            How it works
          </a>
        </motion.div>

        {/* Trust note */}
        <motion.div
          className="flex items-center gap-6 mt-10 md:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex -space-x-2">
            {['#E8A0A0','#F5C5A0','#B5CEAA','#C5B8E8'].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-bg" style={{ backgroundColor: c }} />
            ))}
          </div>
          <p className="font-sans text-[12px] text-text-secondary">
            <span className="text-text-primary font-[500]">500+</span> happy customers in Warsaw
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-text-secondary/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-text-secondary/30" />
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
