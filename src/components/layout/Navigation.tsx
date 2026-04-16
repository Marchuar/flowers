import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop', primary: true },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const { totalItems, openCart } = useCart()

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
            backgroundColor: scrolled ? 'rgba(253,250,245,0.94)' : 'rgba(253,250,245,0)',
            backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'blur(0px)',
            borderBottomColor: scrolled ? 'rgba(217,208,193,0.6)' : 'rgba(217,208,193,0)',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
          }}
          transition={{ duration: 0.35 }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="font-brand text-[23px] font-bold tracking-[0.22em] text-text-primary hover:text-accent transition-colors duration-300"
          >
            STEM
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.primary ? (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={({ isActive }) =>
                    `relative font-sans text-[13.5px] font-[600] tracking-wide transition-all duration-200 px-3 py-1 rounded-full ${
                      isActive
                        ? 'bg-text-primary text-surface'
                        : 'text-text-primary bg-text-primary/8 hover:bg-text-primary hover:text-surface'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    `relative font-sans text-[13.5px] font-[450] tracking-wide transition-colors group ${
                      isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-px bg-text-primary transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              )
            ))}
          </nav>

          {/* CTA + Cart */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-text-primary text-surface font-sans text-[9px] font-bold flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <Link
              to="/shop"
              className="group relative overflow-hidden bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase px-5 py-2.5 rounded-full transition-colors duration-300 hover:bg-accent"
            >
              Order now
            </Link>
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
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-editorial transition-colors leading-none ${
                  link.primary
                    ? `text-[52px] font-light ${isActive ? 'text-accent' : 'text-text-primary hover:text-accent'}`
                    : `text-[52px] font-light ${isActive ? 'text-accent' : 'text-text-primary hover:text-accent'}`
                }`
              }
            >
              {({ isActive }) => (
                <motion.span
                  className={`block ${isActive ? 'italic' : ''} ${link.primary ? 'underline underline-offset-4 decoration-2 decoration-accent/40' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  {link.label}
                </motion.span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto mb-12 flex flex-col gap-3">
          <button
            onClick={() => { setMobileOpen(false); openCart() }}
            className="flex items-center justify-center gap-2 w-full border border-border font-sans text-[12px] font-[500] tracking-[0.1em] uppercase px-6 py-4 rounded-full text-text-primary hover:bg-bg-subtle transition-colors"
          >
            <ShoppingBag size={14} />
            Bag {totalItems > 0 && `(${totalItems})`}
          </button>
          <Link
            to="/shop"
            onClick={() => setMobileOpen(false)}
            className="block text-center w-full bg-text-primary text-surface font-sans text-[12px] font-[500] tracking-[0.1em] uppercase px-6 py-4 rounded-full hover:bg-accent transition-colors"
          >
            Order now
          </Link>
        </div>
      </motion.div>
    </>
  )
}
