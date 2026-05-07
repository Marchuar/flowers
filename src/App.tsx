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
  // 'pending'    — waiting to see if load is slow (< 350ms, no visual)
  // 'preloading' — slow load detected, showing flower animation
  // 'done'       — fonts ready, app mounts and entrance animations play
  // First visit in session → show preloader (fonts + images uncached)
  // Returning visit → skip preloader (everything cached, instant load)
  const [phase, setPhase] = useState<'pending' | 'preloading' | 'done'>(() =>
    sessionStorage.getItem('stem_v') ? 'pending' : 'preloading'
  )

  useEffect(() => {
    const fontsReady = Promise.all([
      document.fonts.load('300 16px Boska').catch(() => {}),
      document.fonts.load('700 16px Boska').catch(() => {}),
      document.fonts.load('500 16px "General Sans"').catch(() => {}),
    ])

    if (sessionStorage.getItem('stem_v')) {
      // Returning visit — fonts cached, transition to done immediately
      fontsReady.then(() => setPhase('done'))
      return
    }

    // First visit — mark session and keep preloader for full animation
    sessionStorage.setItem('stem_v', '1')
    const shownAt = Date.now()

    fontsReady.then(() => {
      const remaining = Math.max(0, 1600 - (Date.now() - shownAt))
      setTimeout(() => setPhase('done'), remaining)
    })
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
