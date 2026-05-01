import { useState, useMemo, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, PawPrint } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { products, type Product, type ProductProperty, type StemHeight, type StemFullness } from '../constants/products'
import { parsePrice } from '../lib/utils'
import { ProductCard } from '../components/sections/Products'
import ProductModal from '../components/ui/ProductModal'

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

interface FilterState {
  types: string[]
  properties: ProductProperty[]
  height: StemHeight | null
  fullness: StemFullness | null
  colors: string[]
}

const EMPTY_FILTERS: FilterState = { types: [], properties: [], height: null, fullness: null, colors: [] }

const PROPERTIES: { key: ProductProperty; labelKey: string }[] = [
  { key: 'pet-safe',      labelKey: 'shop.propPetSafe' },
  { key: 'long-lasting',  labelKey: 'shop.propLongLasting' },
  { key: 'fragrant',      labelKey: 'shop.propFragrant' },
  { key: 'scent-free',    labelKey: 'shop.propScentFree' },
]
const HEIGHTS: { key: StemHeight; labelKey: string }[] = [
  { key: 'short',  labelKey: 'shop.heightShort' },
  { key: 'medium', labelKey: 'shop.heightMedium' },
  { key: 'tall',   labelKey: 'shop.heightTall' },
]
const FULLNESS_OPTIONS: { key: StemFullness; labelKey: string }[] = [
  { key: 'lush',    labelKey: 'shop.fullnessLush' },
  { key: 'minimal', labelKey: 'shop.fullnessMinimal' },
]

function FlowerChipIcon({ slug, color, active }: { slug: string; color: string; active: boolean }) {
  const c = active ? '#FAFAF7' : color
  const c2 = active ? 'rgba(250,250,247,0.55)' : `${color}99`
  switch (slug) {
    case 'roses': return (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
        {[0,60,120,180,240,300].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="3" ry="6" fill={c} opacity="0.7" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[30,90,150,210,270,330].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="2" ry="4.5" fill={c} opacity="0.9" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2.5" fill={c}/>
      </svg>
    )
    case 'tulips': return (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
        <line x1="10" y1="18" x2="10" y2="12" stroke={c2} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 12 C6 9 7 5 10 4 C13 5 14 9 13 12 Q12 13.5 10 14 Q8 13.5 7 12Z" fill={c}/>
        <path d="M5 11 C4 8 5.5 5 8 5 C7 7 7 10 7 12 Q5.5 12 5 11Z" fill={c} opacity="0.75"/>
        <path d="M15 11 C16 8 14.5 5 12 5 C13 7 13 10 13 12 Q14.5 12 15 11Z" fill={c} opacity="0.75"/>
      </svg>
    )
    case 'peonies': return (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="2.5" ry="6" fill={c} opacity="0.6" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[22,67,112,157,202,247].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="2" ry="4.5" fill={c} opacity="0.85" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2" fill={active ? '#FAFAF7' : '#fff'} opacity="0.6"/>
      </svg>
    )
    case 'wildflowers': return (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
        <line x1="10" y1="18" x2="10" y2="11" stroke={c2} strokeWidth="1.5" strokeLinecap="round"/>
        {[0,40,80,120,160,200,240,280,320].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="1.5" ry="5" fill={c} opacity="0.75" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2.2" fill={active ? '#FAFAF7' : '#F5D060'}/>
      </svg>
    )
    case 'eustoma': return (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
        <line x1="10" y1="18" x2="10" y2="13" stroke={c2} strokeWidth="1.5" strokeLinecap="round"/>
        {[0,60,120,180,240,300].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="2.5" ry="6" fill={c} opacity="0.65" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[30,90,150,210,270,330].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="1.8" ry="4" fill={c} opacity="0.85" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="2" fill={c}/>
      </svg>
    )
    case 'chrysanthemum': return (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0">
        {[0,24,48,72,96,120,144,168,192,216,240,264,288,312,336].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="1.2" ry="5.5" fill={c} opacity="0.7" transform={`rotate(${a} 10 10)`}/>
        ))}
        {[12,36,60,84,108,132,156,180,204,228,252,276,300,324,348].map((a,i)=>(
          <ellipse key={i} cx="10" cy="10" rx="1" ry="4" fill={c} opacity="0.85" transform={`rotate(${a} 10 10)`}/>
        ))}
        <circle cx="10" cy="10" r="1.8" fill={c}/>
      </svg>
    )
    default: return <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: c }}/>
  }
}

function chipCls(active: boolean) {
  return `font-sans text-[12.5px] font-[450] px-3 py-2 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
    active
      ? 'bg-text-primary text-surface border-text-primary'
      : 'bg-surface text-text-primary border-border hover:border-text-primary/40'
  }`
}

interface FilterSidebarProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  hasAnyFilter: boolean
}

function FilterSidebar({ filters, onChange, hasAnyFilter }: FilterSidebarProps) {
  const { t } = useTranslation()

  function toggleMulti<T extends string>(field: 'types' | 'properties' | 'colors', value: T) {
    const current = filters[field] as T[]
    onChange({
      ...filters,
      [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
    })
  }

  function toggleSingle<T extends string>(field: 'height' | 'fullness', value: T) {
    onChange({ ...filters, [field]: filters[field] === value ? null : value })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-[15px] font-[600] text-text-primary">{t('shop.filters')}</span>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="font-sans text-[12px] text-text-secondary underline underline-offset-2 hover:text-accent-warm transition-colors focus:outline-none"
          >
            {t('shop.clearAll')}
          </button>
        )}
      </div>
      <div className="h-px bg-border/40" />

      {/* Flower type — 2-col grid chips */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-3">{t('shop.flowerType')}</div>
        <div className="flex flex-col gap-1.5 items-start">
          {products.map(p => (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggleMulti('types', p.slug)}
              className={chipCls(filters.types.includes(p.slug))}
            >
              <span className="flex items-center gap-2 min-w-0">
                <FlowerChipIcon slug={p.slug} color={p.color} active={filters.types.includes(p.slug)} />
                <span className="leading-tight">{t(`products.${p.slug}.name`)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Properties */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-3">{t('shop.properties')}</div>
        <div className="flex flex-wrap gap-1.5">
          {PROPERTIES.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleMulti('properties', key)}
              className={chipCls(filters.properties.includes(key))}
            >
              <span className="flex items-center gap-1.5">
                {key === 'pet-safe' && <PawPrint size={12} className="flex-shrink-0" />}
                {t(labelKey)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Stem height */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-3">{t('shop.stemHeight')}</div>
        <div className="flex gap-1.5">
          {HEIGHTS.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleSingle('height', key)}
              className={`flex-1 ${chipCls(filters.height === key)}`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Fullness */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-3">{t('shop.fullness')}</div>
        <div className="flex gap-1.5">
          {FULLNESS_OPTIONS.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleSingle('fullness', key)}
              className={`flex-1 ${chipCls(filters.fullness === key)}`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* Colour swatches */}
      <div>
        <div className="eyebrow text-text-secondary/50 mb-3">{t('shop.colour')}</div>
        <div className="flex flex-wrap gap-2">
          {products.map(p => (
            <button
              key={p.slug}
              type="button"
              onClick={() => toggleMulti('colors', p.color)}
              title={t(`products.${p.slug}.name`)}
              className={`w-8 h-8 rounded-full border-2 transition-[border-color,transform] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                filters.colors.includes(p.color) ? 'border-text-primary scale-110' : 'border-transparent hover:border-text-primary/40'
              }`}
              style={{ backgroundColor: p.color }}
              aria-label={t(`products.${p.slug}.name`)}
              aria-pressed={filters.colors.includes(p.color)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const { t } = useTranslation()

  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS)
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const hasAnyFilter =
    filters.types.length > 0 ||
    filters.properties.length > 0 ||
    filters.height !== null ||
    filters.fullness !== null ||
    filters.colors.length > 0

  const filtered = useMemo(() => {
    let result = [...products]
    if (filters.types.length > 0)
      result = result.filter(p => filters.types.includes(p.slug))
    if (filters.properties.length > 0)
      result = result.filter(p => filters.properties.every(prop => p.properties?.includes(prop)))
    if (filters.height)
      result = result.filter(p => p.height === filters.height)
    if (filters.fullness)
      result = result.filter(p => p.fullness === filters.fullness)
    if (filters.colors.length > 0)
      result = result.filter(p => filters.colors.includes(p.color))
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break
      case 'price-desc': result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break
      case 'name-asc':   result.sort((a, b) => t(`products.${a.slug}.name`).localeCompare(t(`products.${b.slug}.name`))); break
    }
    return result
  }, [filters, sortBy, t])

  return (
    <>
    <div ref={ref} className="pb-24 min-h-screen bg-bg">

      {/* Page header */}
      <div className="relative px-6 md:px-10 pt-10 pb-10 md:pb-14 overflow-hidden">

        {/* Flowers — desktop, behind stats */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
          <motion.div
            className="absolute w-56 -top-8 right-16 opacity-55"
            initial={{ scale: 0.7, opacity: 0, rotate: -12 }}
            animate={inView ? { scale: 1, opacity: 0.55, rotate: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="animate-float-slow" style={{ willChange: 'transform' }}>
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <g filter="url(#sh1)">
                  {[0,45,90,135,180,225,270,315].map((a,i) => (
                    <ellipse key={i} cx="100" cy="100" rx="28" ry="55" fill="#6B8CFF" transform={`rotate(${a} 100 100)`} opacity="0.9" />
                  ))}
                  <circle cx="100" cy="100" r="28" fill="#E8A0C8" />
                </g>
                <defs><filter id="sh1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" /></filter></defs>
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="absolute w-40 top-6 right-2 opacity-45"
            initial={{ scale: 0.7, opacity: 0, rotate: 14 }}
            animate={inView ? { scale: 1, opacity: 0.45, rotate: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="animate-float-delay" style={{ willChange: 'transform' }}>
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <g filter="url(#sh2)">
                  {[0,36,72,108,144,180,216,252,288,324].map((a,i) => (
                    <ellipse key={i} cx="100" cy="100" rx="22" ry="48" fill="#F5A27A" transform={`rotate(${a} 100 100)`} opacity="0.88" />
                  ))}
                  <circle cx="100" cy="100" r="24" fill="#FFD166" />
                </g>
                <defs><filter id="sh2" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" /></filter></defs>
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="absolute w-28 -top-2 right-52 opacity-35"
            initial={{ scale: 0.7, opacity: 0, rotate: 6 }}
            animate={inView ? { scale: 1, opacity: 0.35, rotate: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="animate-float-delay2" style={{ willChange: 'transform' }}>
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <g filter="url(#sh3)">
                  {[0,45,90,135,180,225,270,315].map((a,i) => (
                    <ellipse key={i} cx="100" cy="100" rx="25" ry="50" fill="#B47FD4" transform={`rotate(${a} 100 100)`} opacity="0.85" />
                  ))}
                  <circle cx="100" cy="100" r="26" fill="#E8C4E8" />
                </g>
                <defs><filter id="sh3" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" /></filter></defs>
              </svg>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            {/* Left: title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-text-secondary/30" />
                <span className="eyebrow text-text-secondary/60">{t('shop.eyebrow')}</span>
              </div>
              <h1 className="section-heading text-text-primary">
                {t('shop.heading')}<br />
                <span className="italic text-text-secondary/75">{t('shop.headingItalic')}</span>
              </h1>
            </motion.div>

            {/* Right: editorial stats */}
            <motion.div
              className="hidden md:flex items-center gap-6 pb-1"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="text-right">
                <div className="font-display text-[42px] font-light text-text-primary leading-none tabular-nums">6</div>
                <div className="font-sans text-[11px] font-[500] text-text-secondary/50 mt-1 uppercase tracking-[0.1em]">{t('shop.varieties')}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-right">
                <div className="font-display text-[42px] font-light text-text-primary leading-none">1-2d</div>
                <div className="font-sans text-[11px] font-[500] text-text-secondary/50 mt-1 uppercase tracking-[0.1em]">{t('shop.deliveryLabel')}</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-right">
                <div className="font-display text-[42px] font-light text-text-primary leading-none tabular-nums">2.20</div>
                <div className="font-sans text-[11px] font-[500] text-text-secondary/50 mt-1 uppercase tracking-[0.1em]">{t('shop.fromLabel')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Sort bar + mobile filter toggle */}
        <motion.div
          className="flex items-center justify-between mb-8 pb-4 border-b border-border/40"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          <p className="font-sans text-[13px] text-text-secondary">
            {filtered.length} {filtered.length === 1 ? t('shop.stem') : t('shop.stems')}
            {hasAnyFilter && (
              <span className="ml-1.5 text-text-secondary/60">
                · {t('shop.filtered')}
              </span>
            )}
          </p>

          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-1.5 font-sans text-[12px] text-text-secondary border border-border/60 rounded-full px-3 py-1.5 hover:bg-bg-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
            >
              <SlidersHorizontal size={12} />
              {t('shop.filters')} {hasAnyFilter && `(${[filters.types, filters.properties, filters.colors].flat().length + (filters.height ? 1 : 0) + (filters.fullness ? 1 : 0)})`}
            </button>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border border-border/60 rounded-full font-sans text-[12px] text-text-secondary px-3 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 cursor-pointer hover:bg-bg-subtle transition-colors"
            >
              <option value="default">{t('shop.sortDefault')}</option>
              <option value="price-asc">{t('shop.sortPriceAsc')}</option>
              <option value="price-desc">{t('shop.sortPriceDesc')}</option>
              <option value="name-asc">{t('shop.sortNameAsc')}</option>
            </select>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="flex gap-10 items-start">

          {/* Sidebar — desktop */}
          <motion.aside
            className="hidden md:block w-64 flex-shrink-0 sticky top-24"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <FilterSidebar filters={filters} onChange={setFilters} hasAnyFilter={hasAnyFilter} />
          </motion.aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-4 text-center">
                <p className="font-editorial text-[24px] font-light text-text-primary" style={{ fontVariationSettings: "'opsz' 36" }}>
                  {t('shop.noResultsTitle')}
                </p>
                <p className="font-sans text-[13px] text-text-secondary">{t('shop.noResultsDesc')}</p>
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_FILTERS)}
                  className="mt-2 font-sans text-[12px] text-text-secondary border border-border rounded-full px-4 py-2 hover:bg-bg-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
                >
                  {t('shop.clearAllFilters')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} onOpenModal={setSelectedProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Mobile filters overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/40"
              onClick={() => setMobileFiltersOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t('shop.filters')}
              className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              style={{ overscrollBehavior: 'contain' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-brand text-[16px] font-bold tracking-[0.08em] text-text-primary">{t('shop.filters')}</span>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-text-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 rounded"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} hasAnyFilter={hasAnyFilter} />
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full bg-text-primary text-surface font-sans text-[12px] font-[500] tracking-[0.08em] uppercase py-3.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {t('shop.showResults', { count: filtered.length })}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
