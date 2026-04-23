import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Building2, Coffee, Hotel, Camera, Sparkles, Calendar } from 'lucide-react'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const clients = [
  {
    icon: Building2,
    title: 'Offices & coworking',
    body: 'A weekly arrangement at reception changes the entire feel of a workspace. Fresh stems, delivered on your schedule.',
    color: '#B5CEAA',
  },
  {
    icon: Coffee,
    title: 'Restaurants & cafés',
    body: 'Table flowers that complement your menu and season. We curate what\'s best — you focus on the food.',
    color: '#F5C5A0',
  },
  {
    icon: Hotel,
    title: 'Hotels & boutique stays',
    body: 'From lobby statements to room details — wholesale stems, styled for your brand, delivered fresh.',
    color: '#EFBDBD',
  },
  {
    icon: Calendar,
    title: 'Events & wedding venues',
    body: 'Bulk stems at grower prices for any scale of event. Mix and match varieties for a look that\'s fully yours.',
    color: '#C5B8E8',
  },
  {
    icon: Camera,
    title: 'Photo studios & showrooms',
    body: 'A standing order of fresh flowers makes every shoot effortlessly beautiful. No last-minute scrambles.',
    color: '#E8A0A0',
  },
  {
    icon: Sparkles,
    title: 'Spas & wellness studios',
    body: 'Soft, seasonal stems that match your atmosphere. Changed regularly so they\'re always at their peak.',
    color: '#F0D090',
  },
]

const benefits = [
  {
    number: '01',
    title: 'Wholesale prices',
    body: 'No florist markup. You buy directly at the price we pay — the same stems, a fraction of the cost.',
  },
  {
    number: '02',
    title: 'Flexible delivery',
    body: 'Daily, weekly, or on a custom schedule. We adapt to your rhythm, not the other way around.',
  },
  {
    number: '03',
    title: 'Personal curation',
    body: 'A dedicated manager who learns your space, your palette, and your taste — and keeps things fresh.',
  },
]

const steps = [
  { step: '1', title: 'Tell us about your space', body: 'Share your aesthetic, budget, and how often you\'d like deliveries. A quick conversation is all it takes.' },
  { step: '2', title: 'We curate for you', body: 'Our team selects the best seasonal stems to fit your brief — and refines it over time as we learn what you love.' },
  { step: '3', title: 'We deliver, consistently', body: 'Fresh flowers on your schedule, no chasing required. Always peak condition, always on time.' },
]

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
            <span className="eyebrow text-accent">For Businesses</span>
          </motion.div>

          <div className="overflow-hidden mb-4">
            <motion.h1
              className="text-display text-text-primary"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE_OUT }}
            >
              Flowers for
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-display italic text-accent"
              initial={{ y: '105%' }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease: EASE_OUT }}
            >
              every space.
            </motion.h1>
          </div>

          <motion.p
            className="font-sans text-[15px] font-[450] text-text-secondary leading-relaxed max-w-[480px] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
          >
            Wholesale stems delivered on your schedule — to offices, restaurants, hotels, and every space that deserves to feel alive.
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
              Get a free quote
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-border text-text-secondary font-sans text-[11px] md:text-[12px] font-[450] px-6 py-3.5 rounded-full hover:border-text-primary hover:text-text-primary transition-all duration-200"
            >
              How it works
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-bg-subtle">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">Perfect for</span>
            </div>
            <h2 className="section-heading text-text-primary">Who it's for</h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client, i) => {
              const Icon = client.icon
              return (
                <RevealSection key={client.title} delay={i * 0.06}>
                  <div
                    className="flex flex-col gap-4 p-6 rounded-3xl bg-bg h-full transition-transform duration-300 ease-out hover:-translate-y-1"
                    style={{ willChange: 'transform' }}
                  >
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: client.color + '80' }}
                    >
                      <Icon size={20} strokeWidth={1.6} className="text-text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-[22px] font-[450] text-text-primary leading-tight mb-2">{client.title}</h3>
                      <p className="font-sans text-[13px] text-text-secondary leading-relaxed">{client.body}</p>
                    </div>
                  </div>
                </RevealSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 md:py-28 px-6 md:px-10 bg-bg">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">Our offer</span>
            </div>
            <h2 className="section-heading text-text-primary">What you get</h2>
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
              <span className="eyebrow text-text-secondary/60">Process</span>
            </div>
            <h2 className="section-heading text-text-primary">How it works</h2>
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
              <span className="eyebrow text-surface/40">Let's talk</span>
              <div className="w-5 h-px bg-surface/20" />
            </div>
            <h2
              className="font-display font-[400] text-bg mb-4"
              style={{ fontSize: 'clamp(32px, 6vw, 72px)', lineHeight: '1' }}
            >
              Ready to make your<br />
              <span className="italic text-accent">space bloom?</span>
            </h2>
            <p className="font-sans text-[14px] md:text-[15px] text-surface/50 leading-relaxed max-w-[400px] mx-auto mt-5 mb-10">
              Drop us a message and we'll put together a proposal tailored to your space within 24 hours.
            </p>
            <a
              href="mailto:hello@stem.flowers"
              className="group inline-flex items-center gap-2.5 bg-surface text-text-primary font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.1em] uppercase px-8 py-4 rounded-full hover:bg-accent hover:text-surface transition-colors duration-200"
            >
              Start with a free consultation
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
