import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Shop', href: '#products' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="h-full px-6 md:px-10 flex items-center justify-between"
          animate={{
            backgroundColor: scrolled ? 'rgba(253,250,245,0.92)' : 'rgba(253,250,245,0)',
            backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
            borderBottomColor: scrolled ? 'rgba(217,208,193,0.8)' : 'rgba(217,208,193,0)',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <a href="#" className="font-display text-2xl font-light tracking-[0.25em] text-text-primary hover:text-accent transition-colors">
            STEM
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[13px] font-[400] text-text-secondary hover:text-text-primary transition-colors tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-2 bg-text-primary text-surface font-sans text-[12px] font-[500] tracking-[0.08em] uppercase px-5 py-2.5 rounded-full hover:bg-accent transition-colors duration-300">
              Order now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-primary"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-surface flex flex-col pt-20 px-8 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20, pointerEvents: mobileOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-5xl font-light text-text-primary hover:text-accent transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
              transition={{ delay: i * 0.06 + 0.1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>
        <div className="mt-auto mb-12">
          <button className="w-full bg-text-primary text-surface font-sans text-[13px] font-[500] tracking-[0.08em] uppercase px-6 py-4 rounded-full hover:bg-accent transition-colors">
            Order now
          </button>
        </div>
      </motion.div>
    </>
  )
}
