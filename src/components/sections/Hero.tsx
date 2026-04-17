import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '../../hooks/useIsMobile'

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
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { scrollY } = useScroll()

  const flowersY = useTransform(scrollY, [0, 500], isMobile ? [0, -50] : [0, -90])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, isMobile ? 1 : 0.25])

  useEffect(() => {
    if (!headlineRef.current) return
    const words = headlineRef.current.querySelectorAll('.word')
    const ctx = gsap.context(() => {
      // On mobile: skip rotateX (avoids 3D perspective compositing cost)
      gsap.fromTo(
        words,
        isMobile ? { y: 40, opacity: 0 } : { y: 90, opacity: 0, rotateX: -40 },
        isMobile
          ? { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
          : { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-start md:justify-center overflow-hidden bg-bg">

      {/* Base background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg to-bg-subtle pointer-events-none" />

      {/* Warm spotlight from upper-right */}
      <div
        className="absolute top-0 right-0 w-[65%] h-[80%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(194,113,79,0.07) 0%, rgba(234,196,188,0.05) 40%, transparent 70%)' }}
      />

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(107,100,86,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 45%, transparent 65%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 45%, transparent 65%)',
        }}
      />

      {/* Floating flowers */}
      <motion.div style={{ y: flowersY }} className="absolute inset-0 pointer-events-none">

        {/* Blue flower — large, upper right */}
        <motion.div
          className="absolute w-52 md:w-72 lg:w-80 top-[10%] right-[6%] md:right-[10%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* will-change: transform promotes element+filter to GPU layer — blur computed once, not per frame */}
          <div
            className="animate-float-mobile md:animate-float drop-shadow-[0_24px_48px_rgba(107,140,255,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerBlue />
          </div>
        </motion.div>

        {/* Coral flower — mid right */}
        <motion.div
          className="absolute w-40 md:w-52 lg:w-60 top-[48%] right-[1%] md:right-[3%]"
          initial={{ scale: 0.7, opacity: 0, rotate: 15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile-delay md:animate-float-delay drop-shadow-[0_20px_40px_rgba(245,162,122,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerCoral />
          </div>
        </motion.div>

        {/* Green flower — lower left */}
        <motion.div
          className="absolute w-28 md:w-36 bottom-[12%] left-[4%] md:left-[6%]"
          initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float-mobile-slow md:animate-float-slow drop-shadow-[0_20px_40px_rgba(92,184,92,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerGreen />
          </div>
        </motion.div>

        {/* Purple flower — hidden on mobile (2 fewer compositor layers) */}
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

        {/* Pink flower — hidden on mobile */}
        <motion.div
          className="absolute w-16 md:w-24 bottom-[28%] right-[18%] md:right-[22%] hidden md:block"
          initial={{ scale: 0.5, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 0.7, rotate: 0 }}
          transition={{ duration: 1.1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="animate-float drop-shadow-[0_16px_32px_rgba(242,160,184,0.3)]"
            style={{ willChange: 'transform' }}
          >
            <FlowerPink />
          </div>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div style={isMobile ? undefined : { opacity: heroOpacity }} className="relative z-10 px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full pt-12 pb-12 md:py-20">

        {/* Eyebrow with leading rule */}
        <motion.div
          className="flex items-center gap-3 mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="h-px bg-text-secondary/30 origin-left"
            style={{ width: '28px' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <span className="eyebrow text-text-secondary">Warsaw · Delivery in 2 hours</span>
        </motion.div>

        {/* Main headline */}
        <div
          ref={headlineRef}
          className="overflow-hidden"
          style={isMobile ? undefined : { perspective: '1000px' }}
        >
          <div className="text-display text-text-primary leading-none">
            <div className="overflow-hidden">
              <span className="word inline-block">Fresh&nbsp;</span>
              <span className="word inline-block">flowers,</span>
            </div>
            <div className="overflow-hidden mt-1 md:mt-2 ml-[6%] md:ml-[12%]">
              <span className="word inline-block italic font-display text-accent-warm" style={{
                fontSize: 'clamp(60px, 9vw, 128px)',
                fontWeight: 300,
                lineHeight: 0.93,
              }}>
                not&nbsp;
              </span>
              <span className="word inline-block">bouquets.</span>
            </div>
          </div>
        </div>

        {/* Thin rule below headline */}
        <motion.div
          className="mt-8 md:mt-10 h-px bg-border/60 origin-left"
          style={{ maxWidth: '380px' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Subtext */}
        <motion.p
          className="font-sans text-[14.5px] md:text-[16px] font-light text-text-secondary mt-6 md:mt-7 max-w-[340px] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          Flowers at wholesale price. No bouquets,<br />
          no floristry markup. Delivered in 2 hours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <Link
            to="/shop"
            className="group relative overflow-hidden bg-text-primary text-surface font-sans text-[12px] font-[500] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full transition-colors duration-300 hover:bg-accent inline-flex items-center gap-2"
          >
            <span>Shop flowers</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            to="/how-it-works"
            className="group font-sans text-[12px] font-[400] text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-text-primary px-7 py-3.5 rounded-full inline-flex items-center gap-2 duration-300"
          >
            How it works
          </Link>
        </motion.div>

        {/* Trust note */}
        <motion.div
          className="flex items-center gap-5 mt-10 md:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="flex -space-x-2">
            {['#E8A0A0','#F5C5A0','#B5CEAA','#C5B8E8'].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-bg"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div className="w-px h-6 bg-border/60" />
          <p className="font-sans text-[12px] text-text-secondary">
            <span className="text-text-primary font-[500]">500+</span> happy customers in Warsaw
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-text-secondary/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="w-px h-14 bg-gradient-to-b from-transparent to-text-secondary/25" />
        <span className="font-sans text-[9px] tracking-[0.2em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
