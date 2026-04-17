import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { LikesProvider } from './context/LikesContext'
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
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <LikesProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="bg-bg min-h-screen">
              <Navigation />
              <CartDrawer />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </LikesProvider>
      </CartProvider>
    </ToastProvider>
  )
}

export default App