import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Droplets, Scissors, Sun, Leaf, Snowflake, AlertTriangle, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { type Product, type CareIcon } from '../../constants/products'
import { useCart } from '../../context/CartContext'
import { useToast } from './Toast'

const iconMap: Record<CareIcon, React.ElementType> = {
  water: Droplets,
  scissors: Scissors,
  sun: Sun,
  leaf: Leaf,
  snowflake: Snowflake,
  warning: AlertTriangle,
}

const imageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '55%' : '-55%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-55%' : '55%', opacity: 0 }),
}

interface Props {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: Props) {
  const { addItem, items, updateQty, removeItem } = useCart()
  const { showToast } = useToast()
  const { t } = useTranslation()
  const [imgIndex, setImgIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [prevProductId, setPrevProductId] = useState(product?.id)
  const touchStartX = useRef(0)

  // Reset gallery index when product changes (during render, not in effect)
  if (product?.id !== prevProductId) {
    setPrevProductId(product?.id)
    setImgIndex(0)
    setDirection(0)
  }

  const cartItem = product ? items.find(i => i.product.id === product.id) : null
  const qty = cartItem?.quantity ?? 0

  const allImages = product ? [product.image, ...(product.images ?? [])] : []
  const hasMultiple = allImages.length > 1

  const goNext = useCallback(() => {
    setDirection(1)
    setImgIndex(i => (i + 1) % allImages.length)
  }, [allImages.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setImgIndex(i => (i - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  useEffect(() => {
    if (!product) return
    // iOS Safari ignores overflow:hidden on body — use position:fixed trick instead
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasMultiple) goNext()
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', handler)
    }
  }, [product, onClose, hasMultiple, goNext, goPrev])

  function goTo(i: number) {
    setDirection(i > imgIndex ? 1 : -1)
    setImgIndex(i)
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!hasMultiple) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) goNext()
      else goPrev()
    }
  }

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    if (!product) return
    addItem(product)
    showToast(t('products.addedToBag', { name: t(`products.${product.slug}.name`) }))
  }

  function handleDecrement() {
    if (!product) return
    if (qty === 1) removeItem(product.id)
    else updateQty(product.id, qty - 1)
  }

  function handleIncrement() {
    if (!product) return
    updateQty(product.id, qty + 1)
  }

  return createPortal(
    <AnimatePresence>
      {product && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 overscroll-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[4px]"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-bg rounded-3xl shadow-2xl"
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface/70 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
              aria-label={t('modal.close')}
            >
              <X size={14} strokeWidth={2} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* ── Image gallery ── */}
              <div
                className="relative h-72 md:h-auto md:w-[44%] flex-shrink-0 overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none select-none"
                onTouchStart={hasMultiple ? onTouchStart : undefined}
                onTouchEnd={hasMultiple ? onTouchEnd : undefined}
              >
                {/* Animated image */}
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.img
                    key={imgIndex}
                    src={allImages[imgIndex]}
                    alt={`${t(`products.${product.slug}.name`)} — ${t('modal.image')} ${imgIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Color tint overlay */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none z-[1]"
                  style={{ backgroundColor: product.color }}
                />

                {/* Tag */}
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-surface/85 backdrop-blur-sm font-sans text-[9.5px] font-[500] tracking-[0.12em] uppercase text-text-secondary px-2.5 py-1 rounded-full">
                    {t(`products.tag${product.tag}`)}
                  </div>
                )}

                {/* Arrow buttons — desktop */}
                {hasMultiple && (
                  <>
                    <button
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm hidden md:flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                      aria-label={t('modal.prevImage')}
                    >
                      <ChevronLeft size={14} strokeWidth={2} />
                    </button>
                    <button
                      onClick={goNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-surface/80 backdrop-blur-sm hidden md:flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface transition-colors duration-200"
                      aria-label={t('modal.nextImage')}
                    >
                      <ChevronRight size={14} strokeWidth={2} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {hasMultiple && (
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {allImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === imgIndex
                            ? 'w-5 bg-surface'
                            : 'w-1.5 bg-surface/50 hover:bg-surface/75'
                        }`}
                        aria-label={`${t('modal.image')} ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* ── Content ── */}
              <div className="flex flex-col flex-1 gap-5 p-7 md:p-8">
                {/* Product header */}
                <div>
                  <div className="eyebrow text-text-secondary/50 text-[9.5px] mb-0.5">{product.latinName}</div>
                  <h2 className="font-display text-[38px] md:text-[44px] font-light text-text-primary leading-[0.95]">{t(`products.${product.slug}.name`)}</h2>
                  <div className="font-sans text-[13px] font-[500] text-text-primary mt-2">
                    {product.price}{' '}
                    <span className="font-normal text-text-secondary text-[11px]">{t('modal.perStem')}</span>
                  </div>
                  {product.description && (
                    <p className="font-sans text-[12.5px] text-text-secondary leading-relaxed mt-3 max-w-[320px]">
                      {t(`products.${product.slug}.description`)}
                    </p>
                  )}
                </div>

                {/* Care instructions */}
                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div>
                    <div className="w-full h-px bg-border mb-5" />
                    <h3 className="font-display text-[22px] md:text-[26px] leading-tight mb-1 text-accent" style={{ fontWeight: 500 }}>
                      {t('modal.careTitle')}
                    </h3>
                    <p className="font-sans text-[12px] text-text-secondary mb-4 leading-relaxed">
                      {t('modal.careSubtitle')}
                    </p>
                    <div className="flex flex-col gap-4">
                      {product.careInstructions.map((tip, i) => {
                        const Icon = iconMap[tip.icon]
                        return (
                          <div key={i} className="flex gap-3.5 items-start">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ backgroundColor: product.color + '80' }}
                            >
                              <Icon size={15} strokeWidth={1.8} className="text-text-primary" />
                            </div>
                            <div>
                              <div className="font-sans text-[13px] font-[600] text-text-primary leading-tight">{t(`products.${product.slug}.care${i + 1}Title`)}</div>
                              <div className="font-sans text-[12px] text-text-secondary leading-relaxed mt-0.5">{t(`products.${product.slug}.care${i + 1}Body`)}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto pt-1">
                  <AnimatePresence mode="wait" initial={false}>
                    {qty === 0 ? (
                      <motion.button
                        key="add"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        onClick={handleAdd}
                        className="w-full flex items-center justify-center gap-2 bg-text-primary text-surface font-sans text-[11.5px] font-[500] tracking-[0.08em] uppercase py-3.5 rounded-xl hover:bg-accent transition-colors duration-200"
                      >
                        <ShoppingBag size={13} strokeWidth={2} />
                        {t('modal.addToBag')}
                      </motion.button>
                    ) : (
                      <motion.div
                        key="qty"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center justify-between rounded-xl px-4 py-3"
                        style={{ backgroundColor: product.color + '70' }}
                      >
                        <button
                          onClick={handleDecrement}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors text-text-primary"
                          aria-label={t('cart.decrease')}
                        >
                          <Minus size={13} strokeWidth={2.5} />
                        </button>
                        <span className="font-sans text-[14px] font-[600] text-text-primary tabular-nums">{t('modal.inBag', { qty })}</span>
                        <button
                          onClick={handleIncrement}
                          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors text-text-primary"
                          aria-label={t('cart.increase')}
                        >
                          <Plus size={13} strokeWidth={2.5} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
