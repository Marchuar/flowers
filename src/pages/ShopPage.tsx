import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { products } from '../constants/products'
import { parsePrice } from '../lib/utils'
import { ProductCard } from '../components/sections/Products'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

const allTypes = [...new Set(products.map(p => p.name))]
const allColors = [...new Set(products.map(p => ({ name: p.name, color: p.color })))]

interface FilterSidebarProps {
  selectedTypes: string[]
  onToggle: (name: string) => void
  onClear: () => void
}

function FilterSidebar({ selectedTypes, onToggle, onClear }: FilterSidebarProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Flower type */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-4">Flower type</div>
        <div className="flex flex-col gap-2.5">
          {allTypes.map(name => (
            <label key={name} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => onToggle(name)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all cursor-pointer flex-shrink-0 ${
                  selectedTypes.includes(name)
                    ? 'bg-text-primary border-text-primary'
                    : 'border-border/70 group-hover:border-text-primary/50'
                }`}
              >
                {selectedTypes.includes(name) && (
                  <svg className="w-2.5 h-2.5 text-surface" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                onClick={() => onToggle(name)}
                className="font-sans text-[13px] text-text-secondary group-hover:text-text-primary transition-colors"
              >
                {name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Color swatches */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-4">Colour</div>
        <div className="flex flex-wrap gap-2.5">
          {allColors.map(({ name, color }) => (
            <button
              key={name}
              onClick={() => onToggle(name)}
              title={name}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                selectedTypes.includes(name) ? 'border-text-primary scale-110' : 'border-transparent hover:border-text-primary/40'
              }`}
              style={{ backgroundColor: color }}
              aria-label={name}
            />
          ))}
        </div>
      </div>

      {/* Price note */}
      <div className="bg-bg-subtle rounded-xl p-4">
        <div className="eyebrow text-text-secondary/50 mb-2">Price range</div>
        <p className="font-sans text-[12px] text-text-secondary leading-relaxed">
          Stems from <span className="font-[500] text-text-primary">2.20 zł</span> to <span className="font-[500] text-text-primary">6.90 zł</span> each.
          <br />Minimum order: <span className="font-[500] text-text-primary">10 stems</span>.
        </p>
      </div>

      {/* Clear filters */}
      {selectedTypes.length > 0 && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 font-sans text-[12px] text-text-secondary hover:text-accent-warm transition-colors"
        >
          <X size={13} />
          Clear filters
        </button>
      )}
    </div>
  )
}

export default function ShopPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  function toggleType(name: string) {
    setSelectedTypes(prev =>
      prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]
    )
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.name))
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
        break
      case 'price-desc':
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return result
  }, [selectedTypes, sortBy])

  return (
    <div ref={ref} className="pt-8 pb-24 px-6 md:px-10 min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-5 h-px bg-text-secondary/30" />
            <span className="eyebrow text-text-secondary/60">Shop</span>
          </div>
          <h1 className="section-heading text-text-primary">
            All flowers,<br />
            <span className="italic text-text-secondary/80">your choice.</span>
          </h1>
        </motion.div>

        {/* Sort bar + mobile filter toggle */}
        <motion.div
          className="flex items-center justify-between mb-8 pb-4 border-b border-border/40"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <p className="font-sans text-[13px] text-text-secondary">
            {filtered.length} {filtered.length === 1 ? 'stem' : 'stems'}
            {selectedTypes.length > 0 && (
              <span className="ml-1.5 text-text-secondary/60">
                · filtered
              </span>
            )}
          </p>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 font-sans text-[12px] text-text-secondary border border-border/60 rounded-full px-3 py-1.5 hover:bg-bg-subtle transition-colors"
            >
              <SlidersHorizontal size={12} />
              Filters {selectedTypes.length > 0 && `(${selectedTypes.length})`}
            </button>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border border-border/60 rounded-full font-sans text-[12px] text-text-secondary px-3 py-1.5 focus:outline-none focus:border-text-primary cursor-pointer hover:bg-bg-subtle transition-colors"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="name-asc">Name: A–Z</option>
            </select>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="flex gap-10 items-start">

          {/* Sidebar — desktop */}
          <motion.aside
            className="hidden md:block w-56 flex-shrink-0 sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <FilterSidebar selectedTypes={selectedTypes} onToggle={toggleType} onClear={() => setSelectedTypes([])} />
          </motion.aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-4 text-center">
                <p className="font-editorial text-[24px] font-light text-text-primary" style={{ fontVariationSettings: "'opsz' 36" }}>
                  No stems match
                </p>
                <p className="font-sans text-[13px] text-text-secondary">Try removing some filters</p>
                <button
                  onClick={() => setSelectedTypes([])}
                  className="mt-2 font-sans text-[12px] text-text-secondary border border-border rounded-full px-4 py-2 hover:bg-bg-subtle transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters overlay */}
      {mobileFiltersOpen && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-text-primary/40" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-brand text-[16px] font-bold tracking-[0.08em] text-text-primary">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-text-secondary hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <FilterSidebar selectedTypes={selectedTypes} onToggle={toggleType} onClear={() => setSelectedTypes([])} />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-text-primary text-surface font-sans text-[12px] font-[500] tracking-[0.08em] uppercase py-3.5 rounded-xl"
            >
              Show {filtered.length} results
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
