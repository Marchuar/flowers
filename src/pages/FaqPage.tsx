import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

type FaqQuestion = { q: string; a: string }
type FaqCategory = { id: string; label: string; questions: FaqQuestion[] }

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-start gap-3.5">
          <span className="eyebrow text-text-secondary/35 mt-0.5 w-5 shrink-0 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-playfair text-[16px] md:text-[18px] font-[450] text-black leading-snug group-hover:text-accent transition-colors duration-200">
            {q}
          </span>
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="shrink-0 mt-1"
        >
          <Plus size={18} strokeWidth={1.8} className="text-text-secondary/50" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-sans text-[13.5px] font-[450] text-text-secondary leading-relaxed pb-5 pl-8 max-w-[640px]">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CategorySection({ cat, delay }: { cat: FaqCategory; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-px bg-accent/50" />
        <span className="eyebrow text-accent">{cat.label}</span>
      </div>
      <div className="bg-surface rounded-3xl px-6 md:px-8 divide-y-0">
        {cat.questions.map((item, i) => (
          <AccordionItem key={i} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function FaqPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const { t } = useTranslation()

  const categories = t('faq.categories', { returnObjects: true }) as FaqCategory[]

  return (
    <div className="bg-bg min-h-screen">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20 px-6 md:px-10">
<div ref={heroRef} className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <div className="w-6 h-px bg-accent" />
            <span className="eyebrow text-accent">{t('faq.eyebrow')}</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-display text-text-primary"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE_OUT }}
            >
              {t('faq.heading1')}
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-display italic text-accent"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease: EASE_OUT }}
            >
              {t('faq.heading2')}
            </motion.h1>
          </div>

          <motion.p
            className="font-sans text-[15px] font-[450] text-text-secondary leading-relaxed max-w-[460px]"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
          >
            {t('faq.description')}
          </motion.p>
        </div>
      </section>

      {/* ── FAQ CATEGORIES ── */}
      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">
          {categories.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ── */}
      <section className="py-20 px-6 md:px-10 bg-bg-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-5 h-px bg-text-secondary/20" />
            <span className="eyebrow text-text-secondary/50">{t('faq.stillUnsure')}</span>
            <div className="w-5 h-px bg-text-secondary/20" />
          </div>
          <h2 className="font-display text-[clamp(28px,5vw,48px)] font-[400] text-text-primary leading-tight mb-4">
            {t('faq.weAreAway')}
          </h2>
          <p className="font-sans text-[13.5px] text-text-secondary leading-relaxed max-w-[360px] mx-auto mb-8">
            {t('faq.cantFind')}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:hello@stem.flowers"
              className="group inline-flex items-center gap-2.5 bg-text-primary text-bg font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.08em] uppercase px-6 py-3.5 rounded-full hover:bg-accent transition-colors duration-200"
            >
              {t('faq.emailUs')}
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/business"
              className="inline-flex items-center gap-2 border border-border text-text-secondary font-sans text-[11px] md:text-[12px] font-[450] px-6 py-3.5 rounded-full hover:border-text-primary hover:text-text-primary transition-all duration-200"
            >
              {t('faq.businessEnquiries')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
