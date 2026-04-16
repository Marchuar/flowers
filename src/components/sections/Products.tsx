import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShoppingBag, Check } from 'lucide-react'
import { products, type Product } from '../../constants/products'
import { useCart } from '../../context/CartContext'
import { useToast } from '../ui/Toast'

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  const bgColor = product.color + '38'
  const btnColor = product.color + '65'
  const btnHoverColor = product.color + 'CC'

  function handleAddToCart() {
    if (added) return
    addItem(product)
    showToast(`${product.name} added to bag`)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative flex flex-col rounded-3xl overflow-hidden cursor-pointer p-3 group"
        style={{ backgroundColor: bgColor }}
        whileHover={{ y: -8, scale: 1.01, boxShadow: '0 20px 48px rgba(28,26,23,0.11)' }}
        transition={{ duration: 0.38, ease: [0.25, 0.8, 0.25, 1] }}
      >
        {/* Image */}
        <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-3.5">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />
          {/* Color tint overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ backgroundColor: product.color }}
          />
          {product.tag && (
            <div className="absolute top-3 left-3 bg-surface/85 backdrop-blur-sm font-sans text-[9.5px] font-[500] tracking-[0.12em] uppercase text-text-secondary px-2.5 py-1 rounded-full">
              {product.tag}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5 px-1 pb-1 flex-1">
          <div className="eyebrow text-text-secondary/45 text-[9.5px]">{product.latinName}</div>
          <h3 className="font-display text-[22px] md:text-[28px] font-light text-text-primary leading-tight">{product.name}</h3>
          <div className="font-sans text-[12.5px] font-[500] text-text-primary mt-0.5">
            {product.price}{' '}
            <span className="font-normal text-text-secondary text-[10.5px]">/ stem</span>
          </div>
        </div>

        {/* CTA button */}
        <motion.button
          onClick={handleAddToCart}
          className="mt-3 mx-1 mb-1 w-[calc(100%-0.5rem)] font-sans text-[11px] font-[500] tracking-[0.08em] uppercase py-3 rounded-xl overflow-hidden text-text-primary flex items-center justify-center gap-1.5 relative"
          style={{ backgroundColor: added ? product.color + 'AA' : btnColor }}
          animate={{ backgroundColor: added ? product.color + 'AA' : btnColor }}
          whileHover={!added ? { backgroundColor: btnHoverColor } : {}}
          whileTap={!added ? { scale: 0.97 } : {}}
          transition={{ duration: 0.25 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {added ? (
              <motion.span
                key="check"
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Check size={11} strokeWidth={2.5} />
                Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingBag size={11} strokeWidth={2} />
                Add to bag
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function Products() {
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

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
              <span className="eyebrow text-text-secondary/60">Flowers</span>
            </motion.div>
            <motion.h2
              className="section-heading text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Single stems,<br />
              <span className="italic text-text-secondary/80">pure beauty.</span>
            </motion.h2>
          </div>

          {/* View all link — desktop */}
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
              View all
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
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
            View all flowers →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
