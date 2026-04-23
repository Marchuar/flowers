import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CreditCard, Smartphone, Building2, Apple, Lock, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import FloatingInput from '../components/ui/FloatingInput'

const timeSlots = [
  { id: '9-12',  label: '9:00–12:00',  note: 'Morning'   },
  { id: '12-15', label: '12:00–15:00', note: 'Midday'    },
  { id: '15-18', label: '15:00–18:00', note: 'Afternoon' },
  { id: '18-21', label: '18:00–21:00', note: 'Evening'   },
]

const paymentMethods = [
  { id: 'card',  label: 'Card',          icon: CreditCard  },
  { id: 'blik',  label: 'BLIK',          icon: Smartphone  },
  { id: 'bank',  label: 'Bank transfer', icon: Building2   },
  { id: 'apple', label: 'Apple Pay',     icon: Apple       },
]

export default function CheckoutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { items, totalPrice, clearCart } = useCart()

  const [selectedSlot,    setSelectedSlot]    = useState('')
  const [selectedPayment, setSelectedPayment] = useState('card')
  const [orderPlaced,     setOrderPlaced]     = useState(false)
  const [orderNumber]                         = useState(() => `STEM-${Math.floor(10000 + Math.random() * 90000)}`)

  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [phone,     setPhone]     = useState('')
  const [street,    setStreet]    = useState('')
  const [apartment, setApartment] = useState('')
  const [notes,     setNotes]     = useState('')

  const deliveryCost = totalPrice >= 80 ? 0 : 9
  const orderTotal   = totalPrice + deliveryCost

  function handlePlaceOrder() {
    setOrderPlaced(true)
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (orderPlaced) {
    return (
      <div className="pt-12 pb-24 px-6 md:px-10 min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Check size={28} className="text-accent" strokeWidth={2.5} />
          </motion.div>

          <h1 className="font-editorial text-[38px] font-light text-text-primary mb-3 leading-tight" style={{ fontVariationSettings: "'opsz' 48" }}>
            Order placed!
          </h1>
          <p className="font-sans text-[14px] text-text-secondary mb-2 leading-relaxed">
            Your stems are on their way. We'll send a confirmation to your email.
          </p>
          <p className="font-sans text-[12px] text-text-secondary/60 mb-8">
            Order #{orderNumber}
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-accent transition-colors duration-300"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="block mt-3 font-sans text-[12px] text-text-secondary hover:text-text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={ref} className="pt-12 pb-24 px-6 md:px-10 min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-px bg-text-secondary/30" />
            <span className="eyebrow text-text-secondary/60">Final step</span>
          </div>
          <h1 className="section-heading text-text-primary">Checkout</h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* Left — form */}
          <div className="flex-1 space-y-8">

            {/* 1. Delivery details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h2 className="font-brand text-[15px] font-bold tracking-[0.08em] text-text-primary mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-text-primary text-surface flex items-center justify-center font-sans text-[10px] font-bold">1</span>
                Delivery details
              </h2>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <FloatingInput label="First name" autoComplete="given-name"  value={firstName} onChange={setFirstName} required half />
                  <FloatingInput label="Last name"  autoComplete="family-name" value={lastName}  onChange={setLastName}  required half />
                </div>
                <FloatingInput label="Email"                      type="email" autoComplete="email"         value={email}     onChange={setEmail}     required />
                <FloatingInput label="Phone"                      type="tel"   autoComplete="tel"           value={phone}     onChange={setPhone}     required />
                <FloatingInput label="Street address"                          autoComplete="address-line1" value={street}    onChange={setStreet}    required />
                <FloatingInput label="Apartment / flat (optional)"             autoComplete="address-line2" value={apartment} onChange={setApartment}          />
                <FloatingInput label="Delivery notes (optional)"                                            value={notes}     onChange={setNotes}              />
              </div>
            </motion.div>

            {/* 2. Delivery time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <h2 className="font-brand text-[15px] font-bold tracking-[0.08em] text-text-primary mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-text-primary text-surface flex items-center justify-center font-sans text-[10px] font-bold">2</span>
                Delivery time
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {timeSlots.map(slot => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`relative flex flex-col items-center justify-center gap-0.5 py-4 px-3 rounded-xl border transition-all duration-200 ${
                      selectedSlot === slot.id
                        ? 'bg-text-primary text-surface border-text-primary'
                        : 'bg-surface border-border/60 text-text-primary hover:border-text-primary/40 hover:bg-bg'
                    }`}
                  >
                    <span className={`font-sans text-[13px] font-[500] ${selectedSlot === slot.id ? 'text-surface' : 'text-text-primary'}`}>
                      {slot.label}
                    </span>
                    <span className={`font-sans text-[10.5px] ${selectedSlot === slot.id ? 'text-surface/70' : 'text-text-secondary'}`}>
                      {slot.note}
                    </span>
                    {selectedSlot === slot.id && (
                      <motion.div
                        className="absolute top-2 right-2 w-4 h-4 rounded-full bg-surface/20 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      >
                        <Check size={9} strokeWidth={2.5} className="text-surface" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* 3. Payment method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <h2 className="font-brand text-[15px] font-bold tracking-[0.08em] text-text-primary mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-text-primary text-surface flex items-center justify-center font-sans text-[10px] font-bold">3</span>
                Payment method
              </h2>

              <div className="grid grid-cols-2 gap-2.5">
                {paymentMethods.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPayment(id)}
                    className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                      selectedPayment === id
                        ? 'bg-text-primary text-surface border-text-primary'
                        : 'bg-surface border-border/60 text-text-primary hover:border-text-primary/40 hover:bg-bg'
                    }`}
                  >
                    <Icon size={17} className={selectedPayment === id ? 'text-surface/80' : 'text-text-secondary'} />
                    <span className={`font-sans text-[13px] font-[500] ${selectedPayment === id ? 'text-surface' : 'text-text-primary'}`}>
                      {label}
                    </span>
                    {selectedPayment === id && (
                      <motion.div
                        className="absolute top-2 right-2 w-4 h-4 rounded-full bg-surface/20 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      >
                        <Check size={9} strokeWidth={2.5} className="text-surface" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — order summary */}
          <motion.div
            className="w-full lg:w-[340px] lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div className="bg-surface rounded-2xl border border-border/40 p-6">
              <h2 className="font-brand text-[17px] font-bold tracking-[0.08em] text-text-primary mb-5">
                Order summary
              </h2>

              <div className="space-y-3 mb-5">
                <AnimatePresence>
                  {items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: item.product.color + '40' }}
                      >
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[12.5px] font-[500] text-text-primary truncate">{item.product.name}</p>
                        <p className="font-sans text-[11px] text-text-secondary">× {item.quantity}</p>
                      </div>
                      <span className="font-sans text-[12.5px] font-[500] text-text-primary flex-shrink-0">
                        {(item.numericPrice * item.quantity).toFixed(2)} zł
                      </span>
                    </div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="border-t border-border/40 pt-4 space-y-2.5 mb-5">
                <div className="flex justify-between text-text-secondary">
                  <span className="font-sans text-[12.5px]">Subtotal</span>
                  <span className="font-sans text-[12.5px]">{totalPrice.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span className="font-sans text-[12.5px]">Delivery</span>
                  <span className="font-sans text-[12.5px]">
                    {deliveryCost === 0
                      ? <span className="text-accent font-[500]">Free</span>
                      : `${deliveryCost.toFixed(2)} zł`
                    }
                  </span>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4 mb-5 flex justify-between items-baseline">
                <span className="font-sans text-[13.5px] font-[500] text-text-primary">Total</span>
                <span className="font-brand text-[26px] font-bold text-text-primary">{orderTotal.toFixed(2)} zł</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-300"
              >
                Place order
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <Lock size={10} className="text-text-secondary/50" />
                <p className="font-sans text-[11px] text-text-secondary/50">SSL secured · 256-bit encryption</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
