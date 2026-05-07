import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { products, type Product } from '../../constants/products'
import { ProductCard } from '../ui/ProductCard'
import ProductModal from '../ui/ProductModal'

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
