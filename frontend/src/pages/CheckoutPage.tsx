import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Lock, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../hooks/useCart'
import { useCheckout } from '../hooks/useCheckout'
import { useShippingOptions } from '../hooks/useShippingOptions'
import { formatPrice } from '../lib/utils'
import FloatingInput from '../components/ui/FloatingInput'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ?? '')

function StripePaymentForm({ cartId, onSuccess }: { cartId: string; onSuccess: (orderId: string) => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const { completeOrder } = useCheckout()
  const [paying, setPaying] = useState(false)
  const [stripeError, setStripeError] = useState<string | null>(null)

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setPaying(true)
    setStripeError(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/checkout' },
      redirect: 'if_required',
    })

    if (error) {
      setStripeError(error.message ?? 'Payment failed')
      setPaying(false)
      return
    }

    const orderId = await completeOrder(cartId)
    if (orderId) onSuccess(orderId)
    else { setStripeError('Order could not be placed. Please contact support.'); setPaying(false) }
  }

  return (
    <form onSubmit={handlePay} className="space-y-4">
      <PaymentElement options={{ layout: 'tabs' }} />
      {stripeError && <p className="font-sans text-[12px] text-red-500">{stripeError}</p>}
      <button
        type="submit"
        disabled={!stripe || paying}
        className="w-full bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-300 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {paying ? 'Processing...' : 'Pay now'}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { items, totalPrice } = useCart()
  const { t } = useTranslation()
  const { state: checkoutState, initCheckout } = useCheckout()

  const [medusaCartId, setMedusaCartId] = useState<string | null>(
    () => localStorage.getItem('stem-medusa-cart-id')
  )
  useEffect(() => {
    const stored = localStorage.getItem('stem-medusa-cart-id')
    if (stored) setMedusaCartId(stored)
  }, [])
  const shippingOptionMap = useShippingOptions(medusaCartId)

  const timeSlots = useMemo(() => [
    { id: 'morning',   label: '9:00–13:00',  note: t('checkout.slotMorning')   },
    { id: 'afternoon', label: '13:00–17:00', note: t('checkout.slotMidday')    },
    { id: 'evening',   label: '17:00–21:00', note: t('checkout.slotEvening')   },
  ], [t])

  const [selectedSlot, setSelectedSlot] = useState('')
  const [orderNumber]                   = useState(() => `STEM-${Math.floor(10000 + Math.random() * 90000)}`)
  const [localSuccess, setLocalSuccess] = useState(false)
  const [successOrderId, setSuccessOrderId] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [phone,     setPhone]     = useState('')
  const [street,    setStreet]    = useState('')
  const [apartment, setApartment] = useState('')
  const [notes,     setNotes]     = useState('')

  const deliveryCost = totalPrice >= 80 ? 0 : 9
  const orderTotal   = totalPrice + deliveryCost

  const handleStripeSuccess = useCallback((orderId: string) => {
    setSuccessOrderId(orderId)
    setLocalSuccess(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault()
    // Try Medusa checkout; fall back to demo success if backend is unavailable
    try {
      await initCheckout(
        {
          first_name: firstName,
          last_name: lastName,
          address_1: street,
          address_2: apartment,
          city: 'Warsaw',
          country_code: 'pl',
          phone,
          email,
        },
        shippingOptionMap[selectedSlot] ?? shippingOptionMap['afternoon'] ?? selectedSlot,
        notes || undefined
      )
    } catch {
      // Backend unavailable — demo mode
      setLocalSuccess(true)
      setSuccessOrderId(orderNumber)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const orderPlaced = localSuccess || checkoutState.status === 'success'
  const displayOrderId = successOrderId || (checkoutState.status === 'success' ? checkoutState.orderId : orderNumber)

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
            {t('checkout.successTitle')}
          </h1>
          <p className="font-sans text-[14px] text-text-secondary mb-2 leading-relaxed">
            {t('checkout.successDesc')}
          </p>
          <p className="font-sans text-[12px] text-text-secondary/60 mb-8">
            {t('checkout.orderPrefix')} #{displayOrderId}
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase px-7 py-3.5 rounded-full hover:bg-accent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {t('checkout.continueShopping')}
          </Link>
          <Link
            to="/"
            className="block mt-3 font-sans text-[12px] text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded"
          >
            {t('checkout.backToHome')}
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
            <span className="eyebrow text-text-secondary/60">{t('checkout.eyebrow')}</span>
          </div>
          <h1 className="section-heading text-text-primary">{t('checkout.heading')}</h1>
        </motion.div>

        <form onSubmit={handlePlaceOrder}>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

            {/* Left — form fields */}
            <div className="flex-1 space-y-8">

              {/* 1. Delivery details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <h2 className="font-brand text-[15px] font-bold tracking-[0.08em] text-text-primary mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-text-primary text-surface flex items-center justify-center font-sans text-[10px] font-bold" aria-hidden="true">1</span>
                  {t('checkout.step1')}
                </h2>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <FloatingInput label={t('checkout.firstName')} name="given-name"   autoComplete="given-name"   value={firstName} onChange={setFirstName} required half />
                    <FloatingInput label={t('checkout.lastName')}  name="family-name"  autoComplete="family-name"  value={lastName}  onChange={setLastName}  required half />
                  </div>
                  <FloatingInput label={t('checkout.email')} name="email"   type="email" autoComplete="email" value={email}     onChange={setEmail}     required />
                  <FloatingInput label={t('checkout.phone')} name="tel"     type="tel"   autoComplete="tel"   value={phone}     onChange={setPhone}     required />
                  <FloatingInput label={t('checkout.street')}    name="address-line1" autoComplete="address-line1" value={street}    onChange={setStreet}    required />
                  <FloatingInput label={t('checkout.apartment')} name="address-line2" autoComplete="address-line2" value={apartment} onChange={setApartment}          />
                  <FloatingInput label={t('checkout.notes')}     name="notes"                                      value={notes}     onChange={setNotes}              />
                </div>
              </motion.div>

              {/* 2. Delivery time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                <h2 className="font-brand text-[15px] font-bold tracking-[0.08em] text-text-primary mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-text-primary text-surface flex items-center justify-center font-sans text-[10px] font-bold" aria-hidden="true">2</span>
                  {t('checkout.step2')}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup" aria-label={t('checkout.step2')}>
                  {timeSlots.map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      role="radio"
                      aria-checked={selectedSlot === slot.id}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`relative flex flex-col items-center justify-center gap-0.5 py-4 px-3 rounded-xl border transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
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

              {/* 3. Payment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.3 }}
              >
                <h2 className="font-brand text-[15px] font-bold tracking-[0.08em] text-text-primary mb-5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-text-primary text-surface flex items-center justify-center font-sans text-[10px] font-bold" aria-hidden="true">3</span>
                  {t('checkout.paymentMethod')}
                </h2>

                {checkoutState.status === 'requires_payment' ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret: checkoutState.clientSecret,
                      appearance: { theme: 'stripe', variables: { colorPrimary: '#3d5a3e', borderRadius: '12px' } },
                    }}
                  >
                    <StripePaymentForm cartId={checkoutState.cartId} onSuccess={handleStripeSuccess} />
                  </Elements>
                ) : (
                  <div className="rounded-xl border border-border/40 bg-surface px-5 py-4 flex items-center gap-3">
                    <Lock size={14} className="text-text-secondary/50" />
                    <p className="font-sans text-[13px] text-text-secondary">
                      Card, BLIK & Apple Pay — available after confirming your details above.
                    </p>
                  </div>
                )}

                {checkoutState.status === 'error' && (
                  <p className="mt-2 font-sans text-[12px] text-red-500">{checkoutState.message}</p>
                )}
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
                  {t('cart.orderSummary')}
                </h2>

                <div className="space-y-3 mb-5">
                  <AnimatePresence>
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                          style={{ backgroundColor: item.product.color + '40' }}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-[12.5px] font-[500] text-text-primary truncate">{item.product.name}</p>
                          <p className="font-sans text-[11px] text-text-secondary tabular-nums">× {item.quantity}</p>
                        </div>
                        <span className="font-sans text-[12.5px] font-[500] text-text-primary flex-shrink-0 tabular-nums">
                          {formatPrice(item.numericPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-border/40 pt-4 space-y-2.5 mb-5">
                  <div className="flex justify-between text-text-secondary">
                    <span className="font-sans text-[12.5px]">{t('checkout.subtotal')}</span>
                    <span className="font-sans text-[12.5px] tabular-nums">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span className="font-sans text-[12.5px]">{t('checkout.delivery')}</span>
                    <span className="font-sans text-[12.5px] tabular-nums">
                      {deliveryCost === 0
                        ? <span className="text-accent font-[500]">{t('checkout.free')}</span>
                        : formatPrice(deliveryCost)
                      }
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/40 pt-4 mb-5 flex justify-between items-baseline">
                  <span className="font-sans text-[13.5px] font-[500] text-text-primary">{t('checkout.total')}</span>
                  <span className="font-brand text-[26px] font-bold text-text-primary tabular-nums">{formatPrice(orderTotal)}</span>
                </div>

                {checkoutState.status !== 'requires_payment' && (
                  <button
                    type="submit"
                    disabled={checkoutState.status === 'loading'}
                    className="w-full bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-300 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {checkoutState.status === 'loading' ? 'Please wait...' : t('checkout.placeOrder')}
                  </button>
                )}

                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <Lock size={10} className="text-text-secondary/50" aria-hidden="true" />
                  <p className="font-sans text-[11px] text-text-secondary/50">SSL secured · 256-bit encryption</p>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  )
}
