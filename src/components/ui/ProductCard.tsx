import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { type Product } from '../../constants/products'
import { useCart } from '../../hooks/useCart'
import { useToast } from './Toast'

export function ProductCard({ product, index, onOpenModal }: {
  product: Product
  index: number
  onOpenModal?: (p: Product) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { addItem, items, updateQty, removeItem } = useCart()
  const { showToast } = useToast()
  const { t } = useTranslation()

  const cartItem = items.find(i => i.product.id === product.id)
  const qty = cartItem?.quantity ?? 0

  const allImages = [product.image, ...(product.images ?? [])]
  const hasMultiple = allImages.length > 1
  const [imgIndex, setImgIndex] = useState(0)
  const [loadedSrcs, setLoadedSrcs] = useState<Set<string>>(new Set())
  const touchStartX = useRef(0)

  const bgColor = product.color + '38'
  const btnColor = product.color + '65'
  const btnHoverColor = product.color + 'CC'
  const hoverShadow = '0 20px 48px rgba(17,17,16,0.09)'

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation()
    addItem(product)
    showToast(t('products.addedToBag', { name: t(`products.${product.slug}.name`) }))
  }

  function handleDecrement(e: React.MouseEvent) {
    e.stopPropagation()
    if (qty === 1) removeItem(product.id)
    else updateQty(product.id, qty - 1)
  }

  function handleIncrement(e: React.MouseEvent) {
    e.stopPropagation()
    updateQty(product.id, qty + 1)
  }

  function nextImg(e?: React.MouseEvent) {
    e?.stopPropagation()
    setImgIndex(i => (i + 1) % allImages.length)
  }

  function prevImg(e?: React.MouseEvent) {
    e?.stopPropagation()
    setImgIndex(i => (i - 1 + allImages.length) % allImages.length)
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!hasMultiple) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 35) {
      if (dx < 0) nextImg()
      else prevImg()
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="relative flex flex-col rounded-3xl overflow-hidden cursor-pointer p-3 group"
        style={{ backgroundColor: bgColor }}
        whileHover={{ y: -8, scale: 1.01, boxShadow: hoverShadow }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
        onClick={() => onOpenModal?.(product)}
      >
        <div
          className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3.5"
          style={{ backgroundColor: bgColor }}
          onTouchStart={hasMultiple ? onTouchStart : undefined}
          onTouchEnd={hasMultiple ? onTouchEnd : undefined}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={imgIndex}
              src={allImages[imgIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: loadedSrcs.has(allImages[imgIndex]) ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              decoding="async"
              onLoad={() => setLoadedSrcs(prev => new Set([...prev, allImages[imgIndex]]))}
            />
          </AnimatePresence>

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: product.color }}
          />

          {product.tag && (
            <div className="absolute top-3 left-3 bg-surface/85 backdrop-blur-sm font-sans text-[9.5px] font-[500] tracking-[0.12em] uppercase text-text-secondary px-2.5 py-1 rounded-full z-10">
              {t(`products.tag${product.tag}`)}
            </div>
          )}

          {hasMultiple && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-surface/80 backdrop-blur-sm hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-text-primary"
                aria-label={t('modal.prevImage')}
              >
                <ChevronLeft size={13} strokeWidth={2} />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-surface/80 backdrop-blur-sm hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary hover:text-text-primary"
                aria-label={t('modal.nextImage')}
              >
                <ChevronRight size={13} strokeWidth={2} />
              </button>
            </>
          )}

          {hasMultiple && (
            <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-10">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setImgIndex(i) }}
                  className={`h-1 rounded-full transition-all duration-300 bg-surface ${i === imgIndex ? 'w-4 opacity-100' : 'w-1 opacity-50'}`}
                  aria-label={`${t('modal.image')} ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-0.5 px-1 pb-1 flex-1">
          <div className="eyebrow text-text-secondary/45 text-[9.5px]">{product.latinName}</div>
          <h3 className="font-display text-[22px] md:text-[28px] font-[400] text-text-primary leading-tight">{t(`products.${product.slug}.name`)}</h3>
          <div className="font-sans text-[12.5px] font-[500] text-text-primary mt-0.5">
            {product.price}{' '}
            <span className="font-normal text-text-secondary text-[10.5px] md:text-[12px]">{t('modal.perStem')}</span>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {qty === 0 ? (
            <motion.button
              key="add"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              onClick={handleAddToCart}
              className="mt-3 mx-1 mb-1 w-[calc(100%-0.5rem)] h-10 font-sans text-[11px] font-[500] tracking-[0.08em] uppercase rounded-xl overflow-hidden text-text-primary flex items-center justify-center gap-1.5"
              style={{ backgroundColor: btnColor }}
              whileHover={{ backgroundColor: btnHoverColor }}
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag size={11} strokeWidth={2} />
              {t('modal.addToBag')}
            </motion.button>
          ) : (
            <motion.div
              key="qty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mt-3 mx-1 mb-1 h-10 flex items-center justify-between rounded-xl px-3"
              style={{ backgroundColor: btnColor }}
            >
              <button onClick={handleDecrement} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors text-text-primary" aria-label={t('cart.decrease')}>
                <Minus size={12} strokeWidth={2.5} />
              </button>
              <span className="font-sans text-[14px] font-[600] text-text-primary tabular-nums">{qty}</span>
              <button onClick={handleIncrement} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors text-text-primary" aria-label={t('cart.increase')}>
                <Plus size={12} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
