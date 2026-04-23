import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const categories = [
  {
    id: 'ordering',
    label: 'Ordering & Products',
    questions: [
      {
        q: 'What\'s the difference between buying here and going to a florist?',
        a: 'At a traditional florist you pay for labour, arrangement, and packaging markup — often 2–3× the raw stem price. We sell wholesale: individual stems at the same price we pay directly from the grower. You choose what you want, we deliver it fresh.',
      },
      {
        q: 'Can I order individual stems, or only pre-made bundles?',
        a: 'Individual stems only — that\'s the whole point. You pick exactly what you want, as many or as few as you like. No filler, no forced combinations, no surprises.',
      },
      {
        q: 'Is there a minimum order value?',
        a: 'No minimum order. Order a single stem or fifty — completely up to you. Delivery is free on orders over 80 zł; below that there\'s a flat 9 zł delivery fee.',
      },
      {
        q: 'How far in advance do I need to order?',
        a: 'Orders placed before 21:00 are delivered the same day within 2 hours. For next-day delivery, you can order any time. For events or large orders, a few days\' notice lets us ensure the exact varieties are available.',
      },
      {
        q: 'Is availability seasonal?',
        a: 'Yes — we stock what\'s actually in season from Polish and Dutch growers. This keeps prices low and quality high. The selection updates regularly; what you see in the shop is what\'s available today.',
      },
      {
        q: 'Can I add a gift message or card?',
        a: 'Yes. At checkout there\'s a field for a personal note. We include it as a handwritten card with every order at no extra charge.',
      },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    questions: [
      {
        q: 'Which areas do you deliver to?',
        a: 'We deliver across Warsaw within the city limits. If you\'re unsure whether your address is covered, enter it at checkout — it\'ll flag if we can\'t reach you.',
      },
      {
        q: 'How fast is delivery?',
        a: 'Within 2 hours from the moment you place your order, between 9:00 and 21:00. We don\'t do next-morning slots: if you order at 20:45, you get your flowers by 22:45.',
      },
      {
        q: 'How much does delivery cost?',
        a: 'Free on orders over 80 zł. A flat 9 zł for orders below that. No hidden fees.',
      },
      {
        q: 'Can I schedule a specific delivery time?',
        a: 'You can request an approximate window (morning / afternoon / evening) at checkout and we\'ll do our best to hit it. For time-critical gifts — a birthday dinner, a wedding — reach out directly and we\'ll coordinate.',
      },
      {
        q: 'What if nobody is home when the courier arrives?',
        a: 'The courier will call or text first. If there\'s no response, they can leave the order with a neighbour or in a safe spot you specify. Flowers left unattended for over an hour in heat can wilt, so we always try to reach you first.',
      },
      {
        q: 'Do you deliver on weekends and public holidays?',
        a: 'Yes — we operate every day of the year, 9:00–21:00 including weekends and holidays. Flowers don\'t take days off.',
      },
    ],
  },
  {
    id: 'care',
    label: 'Freshness & Care',
    questions: [
      {
        q: 'How long will my flowers last?',
        a: 'Depending on the variety: roses and tulips typically 7–10 days; peonies 5–7 days; chrysanthemums and eustoma up to 14 days. Follow the care instructions included with your order and you\'ll get the full life out of them.',
      },
      {
        q: 'What are the basic care rules?',
        a: 'Cut 2–3 cm off the stems at a 45° angle before placing in water. Change the water every 2 days. Keep flowers away from direct sunlight, drafts, and fruit (ethylene gas speeds up wilting). Remove any leaves sitting below the waterline.',
      },
      {
        q: 'What if my flowers arrive in bad condition?',
        a: 'That shouldn\'t happen — but if it does, send us a photo within 24 hours and we\'ll re-deliver at no cost. No forms, no fuss. Fresh flowers or your money back, guaranteed.',
      },
      {
        q: 'Are the flowers treated with chemicals or preservatives?',
        a: 'Our stems come directly from growers with standard post-harvest treatment — the same industry process every professional florist uses to extend vase life. We include a small sachet of flower food with every order; use it and your flowers will last noticeably longer.',
      },
    ],
  },
  {
    id: 'business',
    label: 'Business & Wholesale',
    questions: [
      {
        q: 'Do you offer lower prices for businesses?',
        a: 'Yes. Wholesale pricing is available for recurring orders — offices, restaurants, hotels, event venues, and studios. The more consistent the volume, the better the rate. Get in touch for a tailored quote.',
      },
      {
        q: 'Can I set up a recurring delivery schedule?',
        a: 'Absolutely — daily, twice weekly, weekly, or any cadence that works for you. We\'ll set it up once and handle it automatically. You\'ll always get a heads-up if a variety changes.',
      },
      {
        q: 'What types of businesses do you work with?',
        a: 'Offices and coworking spaces, restaurants and cafés, hotels, event venues, photo studios, showrooms, spas, and wellness studios. If your space benefits from fresh flowers, we can work with you.',
      },
      {
        q: 'How do I get a business quote?',
        a: 'Email us at hello@stem.flowers with a brief description of your space, the frequency you\'re thinking about, and your rough budget. We\'ll come back with a proposal within 24 hours.',
      },
      {
        q: 'Do you handle flowers for weddings or one-off events?',
        a: 'Yes — bulk stem orders for events at wholesale prices. You get the varieties you want, we deliver them the morning of the event. We don\'t do arrangement services, but we work well alongside florists and decorators who need a reliable stem source.',
      },
    ],
  },
]

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
          <span className="font-display text-[18px] md:text-[20px] font-[450] text-text-primary leading-snug group-hover:text-accent transition-colors duration-200">
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

function CategorySection({ cat, delay }: { cat: typeof categories[0]; delay: number }) {
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
            <span className="eyebrow text-accent">Help & FAQ</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-display text-text-primary"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE_OUT }}
            >
              Questions,
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-display italic text-accent"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease: EASE_OUT }}
            >
              answered.
            </motion.h1>
          </div>

          <motion.p
            className="font-sans text-[15px] font-[450] text-text-secondary leading-relaxed max-w-[460px]"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
          >
            Everything you need to know about ordering, delivery, flower care, and working with us at scale.
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
            <span className="eyebrow text-text-secondary/50">Still unsure?</span>
            <div className="w-5 h-px bg-text-secondary/20" />
          </div>
          <h2 className="font-display text-[clamp(28px,5vw,48px)] font-[400] text-text-primary leading-tight mb-4">
            We're a message away
          </h2>
          <p className="font-sans text-[13.5px] text-text-secondary leading-relaxed max-w-[360px] mx-auto mb-8">
            Can't find what you're looking for? Drop us a line and we'll get back to you the same day.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:hello@stem.flowers"
              className="group inline-flex items-center gap-2.5 bg-text-primary text-bg font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.08em] uppercase px-6 py-3.5 rounded-full hover:bg-accent transition-colors duration-200"
            >
              Email us
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/business"
              className="inline-flex items-center gap-2 border border-border text-text-secondary font-sans text-[11px] md:text-[12px] font-[450] px-6 py-3.5 rounded-full hover:border-text-primary hover:text-text-primary transition-all duration-200"
            >
              Business enquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
