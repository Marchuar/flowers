import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Ticker from './components/sections/Ticker'
import Products from './components/sections/Products'
import HowItWorks from './components/sections/HowItWorks'
import Pricing from './components/sections/Pricing'
import Testimonials from './components/sections/Testimonials'
import EmailCapture from './components/sections/EmailCapture'
import WhatsAppButton from './components/layout/WhatsAppButton'

function App() {
  return (
    <div className="bg-bg min-h-dvh overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Ticker />
        <Products />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <EmailCapture />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
