import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../constants/products'
import { useLikes } from '../context/LikesContext'
import { ProductCard } from '../components/sections/Products'

export default function WishlistPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { likedIds } = useLikes()
  const likedProducts = products.filter(p => likedIds.has(p.id))

  return (
    <div ref={ref} className="pt-24 pb-24 px-6 md:px-10 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-px bg-text-secondary/30" />
            <span className="eyebrow text-text-secondary/60">Saved</span>
          </div>
          <h1 className="section-heading text-text-primary">
            Your wishlist
            {likedProducts.length > 0 && (
              <span className="ml-4 font-sans text-[18px] font-normal text-text-secondary/60">
                {likedProducts.length}
              </span>
            )}
          </h1>
        </motion.div>

        {likedProducts.length === 0 ? (
          <motion.div
            className="flex flex-col items-center py-24 gap-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="w-16 h-16 rounded-full bg-bg-subtle flex items-center justify-center">
              <Heart size={22} className="text-text-secondary/40" />
            </div>
            <div>
              <p className="font-editorial text-[26px] font-light text-text-primary mb-1.5" style={{ fontVariationSettings: "'opsz' 36" }}>
                Nothing saved yet
              </p>
              <p className="font-sans text-[13px] text-text-secondary">
                Tap the heart on any flower to save it here
              </p>
            </div>
            <Link
              to="/shop"
              className="mt-2 font-sans text-[11.5px] font-[500] tracking-[0.08em] uppercase text-surface bg-text-primary px-6 py-3 rounded-full hover:bg-accent transition-colors"
            >
              Browse flowers
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {likedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}