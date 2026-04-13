import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { products } from '../../constants/products'

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-surface rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ y: -6 }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[3/4] bg-bg-subtle">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        {/* Color overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ backgroundColor: product.color }}
        />
        {/* Tag */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm font-sans text-[10px] font-[500] tracking-[0.1em] uppercase text-text-secondary px-2.5 py-1 rounded-full">
            {product.tag}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="eyebrow text-text-secondary/60 text-[10px]">{product.latinName}</div>
        <h3 className="font-display text-2xl font-light text-text-primary leading-tight">{product.name}</h3>
        <div className="flex items-end justify-between mt-auto pt-3">
          <div>
            <div className="font-sans text-[13px] font-[500] text-text-primary">{product.price}</div>
            <div className="font-sans text-[11px] text-text-secondary">{product.priceNote}</div>
          </div>
          <motion.button
            className="font-sans text-[11px] font-[500] tracking-[0.08em] uppercase text-text-secondary border border-border px-3 py-1.5 rounded-full hover:bg-text-primary hover:text-surface hover:border-text-primary transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add →
          </motion.button>
        </div>
      </div>

      {/* Border beam effect on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-border group-hover:ring-accent/40 transition-all duration-300 pointer-events-none" />
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
        <div ref={titleRef} className="mb-12 md:mb-16">
          <motion.div
            className="eyebrow text-text-secondary/60 mb-3"
            initial={{ opacity: 0, y: 15 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Flowers
          </motion.div>
          <motion.h2
            className="section-heading text-text-primary max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Single stems,<br />
            <span className="italic text-text-secondary">pure beauty.</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
          {products.map((product, i) => (
            <div key={product.id} className={i >= 4 ? 'hidden xl:block' : ''}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-sans text-[13px] text-text-secondary hover:text-text-primary transition-colors border-b border-border hover:border-text-primary pb-0.5"
          >
            View all flowers →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
