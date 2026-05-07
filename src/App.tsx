import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './components/ui/Toast'
import CartDrawer from './components/ui/CartDrawer'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/ui/Preloader'

const HomePage       = lazy(() => import('./pages/HomePage'))
const ShopPage       = lazy(() => import('./pages/ShopPage'))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'))
const AboutPage      = lazy(() => import('./pages/AboutPage'))
const CartPage       = lazy(() => import('./pages/CartPage'))
const CheckoutPage   = lazy(() => import('./pages/CheckoutPage'))
const BusinessPage   = lazy(() => import('./pages/BusinessPage'))
const FaqPage        = lazy(() => import('./pages/FaqPage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-px h-10 bg-border animate-pulse" />
    </div>
  )
}

function App() {
  // 'pending'    — checking load state (< 350ms, no visual)
  // 'preloading' — slow load detected, showing flower animation
  // 'done'       — ready, app mounts and entrance animations play
  const [phase, setPhase] = useState<'pending' | 'preloading' | 'done'>(() =>
    document.readyState === 'complete' && document.fonts.status === 'loaded'
      ? 'done'
      : 'pending'
  )

  useEffect(() => {
    // Fast path already handled by lazy initializer above
    if (document.readyState === 'complete' && document.fonts.status === 'loaded') return

    const loading = Promise.all([
      document.fonts.ready,
      new Promise<void>(r => {
        if (document.readyState === 'complete') r()
        else window.addEventListener('load', () => r(), { once: true })
      }),
    ])

    let shownAt: number | null = null

    // Only show preloader if loading takes longer than 350ms
    const threshold = setTimeout(() => {
      shownAt = Date.now()
      setPhase('preloading')
    }, 350)

    loading.then(() => {
      clearTimeout(threshold)
      if (shownAt === null) {
        // Fast load — skip preloader, go straight to app
        setPhase('done')
      } else {
        // Preloader was shown — keep it until animation completes (1600ms from appearance)
        const remaining = Math.max(0, 1600 - (Date.now() - shownAt))
        setTimeout(() => setPhase('done'), remaining)
      }
    })

    return () => clearTimeout(threshold)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    const update = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80
      html.style.backgroundColor = nearBottom ? '#111110' : '#FAFAF7'
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <ToastProvider>
      <CartProvider>
        {/* Preloader overlays everything; dismissed when loading done */}
        <AnimatePresence>
          {phase === 'preloading' && <Preloader key="preloader" />}
        </AnimatePresence>

        {/* App mounts only when done — entrance animations play fresh */}
        {phase === 'done' && (
          <BrowserRouter>
            <ScrollToTop />
            <div className="bg-bg min-h-screen">
              <Navigation />
              <CartDrawer />
              <main className="pt-16">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/"             element={<HomePage />} />
                    <Route path="/shop"         element={<ShopPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/about"        element={<AboutPage />} />
                    <Route path="/cart"         element={<CartPage />} />
                    <Route path="/checkout"     element={<CheckoutPage />} />
                    <Route path="/business"     element={<BusinessPage />} />
                    <Route path="/faq"          element={<FaqPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        )}
      </CartProvider>
    </ToastProvider>
  )
}

export default App
