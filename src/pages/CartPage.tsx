import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart()

  const deliveryCost = totalPrice >= 80 ? 0 : 9
  const orderTotal = totalPrice + deliveryCost

  return (
    <div ref={ref} className="pt-28 pb-24 px-6 md:px-10 min-h-dvh bg-bg">
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
            <span className="eyebrow text-text-secondary/60">
              {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? 's' : ''}` : 'Empty'}
            </span>
          </div>
          <h1 className="section-heading text-text-primary">Your bag</h1>
        </motion.div>

        {items.length === 0 ? (
          /* Empty state */
          <motion.div
            className="flex flex-col items-center justify-center py-24 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-20 h-20 rounded-full bg-bg-subtle flex items-center justify-center">
              <ShoppingBag size={26} className="text-text-secondary/40" />
            </div>
            <div>
              <p className="font-editorial text-[28px] font-light text-text-primary mb-2" style={{ fontVariationSettings: "'opsz' 36" }}>
                Your bag is empty
              </p>
              <p className="font-sans text-[14px] text-text-secondary">Add some stems and come back here.</p>
            </div>
            <Link
              to="/shop"
              className="mt-2 bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase px-6 py-3.5 rounded-full hover:bg-accent transition-colors duration-300"
            >
              Browse flowers
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* Items list */}
            <div className="flex-1">
              <div className="flex flex-col gap-3">
                <AnimatePresence>
                  {items.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="flex gap-5 bg-surface rounded-2xl p-4 border border-border/40"
                    >
                      {/* Image */}
                      <div
                        className="w-[100px] h-[120px] rounded-xl overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: item.product.color + '40' }}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <p className="font-sans text-[10px] tracking-[0.1em] uppercase text-text-secondary/50 mb-0.5">
                            {item.product.latinName}
                          </p>
                          <p className="font-display text-[22px] font-light text-text-primary leading-tight">
                            {item.product.name}
                          </p>
                          <p className="font-sans text-[12.5px] text-text-secondary mt-1">
                            {item.product.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-3">
                          {/* Qty stepper */}
                          <div className="flex items-center gap-2 bg-bg rounded-full px-2 py-1.5 border border-border/60">
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-sans text-[13px] font-[500] text-text-primary w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                              aria-label="Increase"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-sans text-[15px] font-[600] text-text-primary">
                              {(item.numericPrice * item.quantity).toFixed(2)} zł
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-full text-text-secondary/40 hover:text-accent-warm hover:bg-bg transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Promo code */}
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 bg-surface border border-border/60 rounded-xl px-4 py-2.5 font-sans text-[13px] text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-text-primary transition-colors"
                />
                <button className="bg-bg border border-border/60 font-sans text-[12px] font-[500] text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-xl transition-colors hover:bg-bg-subtle">
                  Apply
                </button>
              </div>
            </div>

            {/* Order summary */}
            <motion.div
              className="w-full lg:w-[340px] lg:sticky lg:top-24 bg-surface rounded-2xl border border-border/40 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              <h2 className="font-brand text-[17px] font-bold tracking-[0.08em] text-text-primary mb-5">
                Order summary
              </h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-text-secondary">
                  <span className="font-sans text-[13px]">Subtotal ({totalItems} items)</span>
                  <span className="font-sans text-[13px]">{totalPrice.toFixed(2)} zł</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span className="font-sans text-[13px]">Delivery</span>
                  <span className="font-sans text-[13px]">
                    {deliveryCost === 0 ? (
                      <span className="text-accent font-[500]">Free</span>
                    ) : (
                      `${deliveryCost.toFixed(2)} zł`
                    )}
                  </span>
                </div>
                {deliveryCost > 0 && (
                  <p className="font-sans text-[11.5px] text-text-secondary/60">
                    Add {(80 - totalPrice).toFixed(2)} zł more for free delivery
                  </p>
                )}
              </div>

              <div className="border-t border-border/40 pt-4 mb-5 flex justify-between items-baseline">
                <span className="font-sans text-[13.5px] font-[500] text-text-primary">Total</span>
                <span className="font-brand text-[26px] font-bold text-text-primary">{orderTotal.toFixed(2)} zł</span>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.1em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-300"
              >
                Proceed to checkout →
              </Link>

              <Link
                to="/shop"
                className="block w-full text-center mt-3 font-sans text-[11.5px] text-text-secondary hover:text-text-primary transition-colors py-1.5"
              >
                ← Continue shopping
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
