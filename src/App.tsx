import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './components/ui/Toast'
import CartDrawer from './components/ui/CartDrawer'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'

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
        <BrowserRouter>
          <ScrollToTop />
          <div className="bg-bg min-h-screen">
            <Navigation />
            <CartDrawer />
            <main className="pt-16">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/"            element={<HomePage />} />
                  <Route path="/shop"        element={<ShopPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about"       element={<AboutPage />} />
                  <Route path="/cart"        element={<CartPage />} />
                  <Route path="/checkout"    element={<CheckoutPage />} />
                  <Route path="/business"    element={<BusinessPage />} />
                  <Route path="/faq"         element={<FaqPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
