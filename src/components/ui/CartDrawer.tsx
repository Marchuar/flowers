import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart()
  const { t } = useTranslation()

  useEffect(() => {
    if (!isCartOpen) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [isCartOpen])

  const deliveryCost = totalPrice >= 80 ? 0 : 9
  const orderTotal = totalPrice + deliveryCost

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[10002] bg-ink/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-[10003] w-full max-w-[420px] bg-surface flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%', transition: { duration: 0.22, ease: [0.32, 0.72, 0, 1] } }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={17} className="text-text-primary" />
                <span className="font-brand text-[18px] font-bold tracking-[0.1em] text-text-primary">{t('cart.title')}</span>
                {totalItems > 0 && (
                  <span className="bg-text-primary text-surface font-sans text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full hover:bg-bg flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                aria-label={t('cart.closeCart')}
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-bg flex items-center justify-center">
                    <ShoppingBag size={22} className="text-text-secondary/50" />
                  </div>
                  <div>
                    <p className="font-editorial text-[22px] font-light text-text-primary mb-1" style={{ fontVariationSettings: "'opsz' 36" }}>{t('cart.empty')}</p>
                    <p className="font-sans text-[13px] text-text-secondary">{t('cart.emptyDesc')}</p>
                  </div>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="mt-2 font-sans text-[11.5px] font-[500] tracking-[0.08em] uppercase text-surface bg-text-primary px-5 py-2.5 rounded-full hover:bg-accent transition-colors"
                  >
                    {t('cart.startBrowsing')}
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence mode="popLayout">
                    {items.map(item => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="flex gap-3.5 bg-bg rounded-2xl p-3"
                      >
                        {/* Image */}
                        <div
                          className="w-[72px] h-[88px] rounded-xl overflow-hidden flex-shrink-0"
                          style={{ backgroundColor: item.product.color + '40' }}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <p className="font-display text-[17px] font-light text-text-primary leading-tight">{item.product.name}</p>
                            <p className="font-sans text-[11px] text-text-secondary mt-0.5">{item.product.price}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Qty stepper */}
                            <div className="flex items-center gap-1.5 bg-surface rounded-full px-1.5 py-1 border border-border/60">
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity - 1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg transition-colors"
                                aria-label={t('cart.decrease')}
                              >
                                <Minus size={10} />
                              </button>
                              <span className="font-sans text-[12px] font-[500] text-text-primary w-5 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQty(item.product.id, item.quantity + 1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg transition-colors"
                                aria-label={t('cart.increase')}
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-sans text-[13px] font-[500] text-text-primary">
                                {(item.numericPrice * item.quantity).toFixed(2)} zł
                              </span>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="w-6 h-6 flex items-center justify-center text-text-secondary/40 hover:text-accent-warm transition-colors"
                                aria-label={t('cart.remove')}
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border/50 bg-surface">
                {/* Delivery note */}
                <div className="flex justify-between items-center mb-2 text-text-secondary">
                  <span className="font-sans text-[12.5px]">{t('cart.delivery')}</span>
                  <span className="font-sans text-[12.5px]">
                    {deliveryCost === 0 ? (
                      <span className="text-accent font-[500]">{t('cart.free')}</span>
                    ) : (
                      `${deliveryCost.toFixed(2)} zł`
                    )}
                  </span>
                </div>
                {deliveryCost > 0 && (
                  <p className="font-sans text-[11px] text-text-secondary/60 mb-3">
                    {t('cart.freeThreshold')}
                  </p>
                )}

                {/* Total */}
                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-sans text-[13px] font-[500] text-text-primary">{t('cart.total')}</span>
                  <span className="font-brand text-[22px] font-bold text-text-primary">{orderTotal.toFixed(2)} zł</span>
                </div>

                {/* CTA */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.08em] uppercase py-4 rounded-2xl hover:bg-accent transition-colors duration-300"
                >
                  {t('cart.checkout')}
                </Link>

                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="block w-full text-center mt-2 font-sans text-[11.5px] text-text-secondary hover:text-text-primary transition-colors py-2"
                >
                  {t('cart.viewCart')}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
