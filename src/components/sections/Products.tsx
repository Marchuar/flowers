import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShoppingBag, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { products, type Product } from '../../constants/products'
import { useCart } from '../../context/CartContext'
import { useToast } from '../ui/Toast'
import ProductModal from '../ui/ProductModal'

export function ProductCard({ product, index, onOpenModal }: { product: Product; index: number; onOpenModal?: (p: Product) => void }) {
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
        {/* Image */}
        <div
          className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3.5"
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
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              loading="lazy"
            />
          </AnimatePresence>

          {/* Color tint overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: product.color }}
          />

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-3 left-3 bg-surface/85 backdrop-blur-sm font-sans text-[9.5px] font-[500] tracking-[0.12em] uppercase text-text-secondary px-2.5 py-1 rounded-full z-10">
              {t(`products.tag${product.tag}`)}
            </div>
          )}

          {/* Desktop gallery arrows */}
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

          {/* Image dots */}
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

        {/* Info */}
        <div className="flex flex-col gap-0.5 px-1 pb-1 flex-1">
          <div className="eyebrow text-text-secondary/45 text-[9.5px]">{product.latinName}</div>
          <h3 className="font-display text-[22px] md:text-[28px] font-[400] text-text-primary leading-tight">{t(`products.${product.slug}.name`)}</h3>
          <div className="font-sans text-[12.5px] font-[500] text-text-primary mt-0.5">
            {product.price}{' '}
            <span className="font-normal text-text-secondary text-[10.5px] md:text-[12px]">{t('modal.perStem')}</span>
          </div>
        </div>

        {/* CTA — Add to bag or quantity controls */}
        <AnimatePresence mode="wait" initial={false}>
          {qty === 0 ? (
            <motion.button
              key="add"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              onClick={handleAddToCart}
              className="mt-3 mx-1 mb-1 w-[calc(100%-0.5rem)] font-sans text-[11px] font-[500] tracking-[0.08em] uppercase py-3 rounded-xl overflow-hidden text-text-primary flex items-center justify-center gap-1.5"
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
              className="mt-3 mx-1 mb-1 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{ backgroundColor: btnColor }}
            >
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors text-text-primary"
                aria-label={t('cart.decrease')}
              >
                <Minus size={12} strokeWidth={2.5} />
              </button>
              <span className="font-sans text-[14px] font-[600] text-text-primary tabular-nums">{qty}</span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 active:bg-black/20 transition-colors text-text-primary"
                aria-label={t('cart.increase')}
              >
                <Plus size={12} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function Products() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { t } = useTranslation()

  const [featured, ...rest] = products

  return (
    <section id="products" className="py-20 md:py-28 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="w-5 h-px bg-text-secondary/30" />
              <span className="eyebrow text-text-secondary/60">{t('products.eyebrow')}</span>
            </motion.div>
            <motion.h2
              className="section-heading text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('products.heading')}<br />
              <span className="italic text-text-secondary/80">{t('products.headingItalic')}</span>
            </motion.h2>
          </div>

          <motion.div
            className="hidden md:block pb-1"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 font-sans text-[12px] text-text-secondary hover:text-text-primary transition-colors"
            >
              {t('products.viewAll')}
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-3.5 md:hidden">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onOpenModal={setSelectedProduct} />
          ))}
        </div>

        {/* Desktop bento grid */}
        <div className="hidden md:grid grid-cols-4 gap-5">
          {/* Featured — large, spans 2 cols × 2 rows */}
          <div className="col-span-2 row-span-2">
            <ProductCard product={featured} index={0} onOpenModal={setSelectedProduct} />
          </div>
          {/* Top-right two smaller cards */}
          {rest.slice(0, 2).map((product, i) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} index={i + 1} onOpenModal={setSelectedProduct} />
            </div>
          ))}
          {/* Bottom row — 3 cards */}
          {rest.slice(2).map((product, i) => (
            <div key={product.id} className={i === 2 ? 'col-span-2' : 'col-span-1'}>
              <ProductCard product={product} index={i + 3} onOpenModal={setSelectedProduct} />
            </div>
          ))}
        </div>

        {/* View all — mobile only */}
        <motion.div
          className="mt-10 text-center md:hidden"
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-sans text-[12.5px] text-text-secondary hover:text-text-primary transition-colors border-b border-border hover:border-text-primary pb-0.5"
          >
            {t('products.viewAllFlowers')}
          </Link>
        </motion.div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
