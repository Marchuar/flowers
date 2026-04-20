import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const leftLinks = [
  { label: 'Home', href: '/', end: true },
  { label: 'Shop', href: '/shop', primary: true },
]

const rightLinks = [
  { label: 'How it works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
]

const allLinks = [...leftLinks, ...rightLinks]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const { totalItems, openCart } = useCart()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
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
          className="relative h-full px-6 md:px-10"
          animate={{
            backgroundColor: scrolled ? 'rgba(250, 250, 247, 0.94)' : 'rgba(250, 250, 247, 0)',
            backdropFilter: scrolled ? 'blur(20px) saturate(1.5)' : 'blur(0px)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient bottom border on scroll */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(90deg, rgba(200,98,42,0.4) 0%, rgba(221,216,207,0.6) 40%, rgba(180,127,212,0.4) 100%)',
            }}
          />

          {/* ── DESKTOP layout: left links · STEM · right links + actions ── */}
          <div className="hidden md:flex h-full items-center">

            {/* Left nav */}
            <nav className="flex items-center gap-0.5 flex-1">
              {leftLinks.map(link => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  end={link.end}
                  className="group font-sans text-[13px] font-[500] tracking-[0.03em] px-3 py-1.5"
                >
                  {({ isActive }) => (
                    <span className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-text-primary underline underline-offset-4 decoration-1 decoration-text-primary/50'
                        : 'text-text-secondary group-hover:text-text-primary'
                    }`}>
                      {link.label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Center: logo */}
            <Link
              to="/"
              className="font-telma text-[32px] font-bold tracking-[0.22em] text-text-primary hover:text-accent transition-colors duration-300 absolute left-1/2 -translate-x-1/2"
            >
              STEM
            </Link>

            {/* Right nav + actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">
              {rightLinks.map(link => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className="group font-sans text-[13px] font-[500] tracking-[0.03em] px-3 py-1.5"
                >
                  {({ isActive }) => (
                    <span className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-text-primary underline underline-offset-4 decoration-1 decoration-text-primary/50'
                        : 'text-text-secondary group-hover:text-text-primary'
                    }`}>
                      {link.label}
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="w-px h-4 bg-border" />

              <button
                onClick={openCart}
                className="relative p-2.5 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={19} />
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
                className="bg-text-primary text-surface font-sans text-[11px] md:text-[12px] font-[500] tracking-[0.1em] uppercase px-4 py-2 rounded-full hover:bg-accent transition-colors duration-300"
              >
                Order now
              </Link>
            </div>
          </div>

          {/* ── MOBILE layout ── */}
          <div className="md:hidden flex h-full items-center justify-between">
            <Link
              to="/"
              className="font-telma text-[28px] font-bold tracking-[0.22em] text-text-primary"
            >
              STEM
            </Link>

            <div className="flex items-center gap-1">
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={openCart}
                    className="relative p-2 text-text-primary"
                    aria-label="Open cart"
                  >
                    <ShoppingBag size={20} />
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-text-primary text-surface font-sans text-[9px] font-bold flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-text-primary"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-bg flex flex-col pt-20 px-8 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20, pointerEvents: mobileOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {allLinks.map((link, i) => (
            <NavLink
              key={link.label}
              to={link.href}
              end={('end' in link ? link.end : false) as boolean}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `font-editorial transition-colors leading-none text-[52px] font-light ${
                  isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                }`
              }
            >
              {({ isActive }) => (
                <motion.span
                  className={`block ${isActive ? 'italic' : ''} ${'primary' in link && link.primary ? 'underline underline-offset-4 decoration-2 decoration-accent/40' : ''}`}
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
            className="block text-center w-full bg-text-primary text-surface font-sans text-[12px] font-[500] tracking-[0.1em] uppercase px-6 py-4 rounded-full hover:bg-accent hover:text-bg transition-colors"
          >
            Order now
          </Link>
        </div>
      </motion.div>
    </>
  )
}
