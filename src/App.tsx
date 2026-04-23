import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './components/ui/Toast'
import CartDrawer from './components/ui/CartDrawer'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import HowItWorksPage from './pages/HowItWorksPage'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import BusinessPage from './pages/BusinessPage'
import FaqPage from './pages/FaqPage'

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="bg-bg min-h-screen">
            <Navigation />
            <CartDrawer />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/business" element={<BusinessPage />} />
                <Route path="/faq" element={<FaqPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
