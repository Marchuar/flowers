import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const INSTAGRAM_URL = 'https://instagram.com/stem_pl'

const posts = [
  { id: 1, src: '/images/products/roses.png',       alt: 'Roses' },
  { id: 2, src: '/images/products/peonies.png',     alt: 'Peonies' },
  { id: 3, src: '/images/products/tulips.png',      alt: 'Tulips' },
  { id: 4, src: '/images/products/wildflowers.png', alt: 'Wildflowers' },
]

function IgIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function ImageCard({ post, aspectRatio, delay, inView }: {
  post: typeof posts[0]
  aspectRatio: string
  delay: number
  inView: boolean
}) {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl block bg-bg-subtle"
      style={{ aspectRatio }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
    >
      <img
        src={post.src}
        alt={post.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex items-center justify-center">
        <div className="scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100
                        transition-all duration-300">
          <IgIcon className="w-10 h-10 text-white" />
        </div>
      </div>
    </motion.a>
  )
}

export default function InstagramPromo() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative bg-bg py-20 md:py-28 px-6 md:px-10 overflow-hidden">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(44,95,62,0.13) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <IgIcon className="w-4 h-4 text-text-secondary" />
              <span className="eyebrow text-text-secondary">{t('instagram.eyebrow')}</span>
            </div>

            <h2
              className="font-display font-bold text-text-primary leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(36px, 4.5vw, 58px)' }}
            >
              {t('instagram.heading')}
            </h2>

            <p className="font-sans text-[14px] text-text-secondary leading-relaxed mb-8 max-w-sm">
              {t('instagram.subtitle')}
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-10 h-10 rounded-full border border-bark/20 flex items-center justify-center
                               group-hover:bg-ink group-hover:border-ink transition-colors duration-300">
                <IgIcon className="w-4 h-4 text-text-primary group-hover:text-ink-text transition-colors duration-300" />
              </span>
              <span className="font-sans text-[13px] text-text-primary group-hover:text-accent transition-colors duration-300">
                {t('instagram.cta')}
              </span>
              <svg viewBox="0 0 16 16" fill="none"
                className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Right — staggered 2-col image grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <ImageCard post={posts[0]} aspectRatio="4/5" delay={0.1} inView={inView} />
              <ImageCard post={posts[2]} aspectRatio="1/1" delay={0.2} inView={inView} />
            </div>
            <div className="flex flex-col gap-3 pt-10">
              <ImageCard post={posts[1]} aspectRatio="1/1" delay={0.2} inView={inView} />
              <ImageCard post={posts[3]} aspectRatio="4/5" delay={0.3} inView={inView} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
