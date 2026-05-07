import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { type Product } from '../../../constants/products'
import { StemRow } from './StemRow'
import ProductModal from '../../ui/ProductModal'

const SEASON_STEMS = [
  { key: 'tulip',      productSlug: 'tulips',  price: 3, bg: '#F9E4EE', color: '#E8A0C8' },
  { key: 'peony',      productSlug: 'peonies', price: 9, bg: '#FCE8EF', color: '#F5B8C8' },
  { key: 'ranunculus', productSlug: null,       price: 7, bg: '#FDEEE6', color: '#F5A07A' },
]

export function SeasonCard() {
  const today   = new Date()
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
  const { t, i18n } = useTranslation()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const localDayName = (() => {
    try {
      return new Intl.DateTimeFormat(i18n.language, { weekday: 'long' }).format(today)
    } catch {
      return dayName
    }
  })()

  const dayMessage = t(`hero.card.days.${dayName}`)

  return (
    <>
      <div className="w-full rounded-2xl overflow-hidden border border-border bg-surface shadow-[0_8px_48px_rgba(0,0,0,0.09)]">
        <div className="px-6 pt-6 pb-5 bg-bg-subtle border-b border-border">
          <p className="font-sans text-[10px] font-[600] tracking-[0.18em] uppercase text-text-secondary/50 mb-2">
            {t('hero.card.today')}
          </p>
          <p className="font-display text-[32px] font-[650] text-text-primary leading-none mb-2 capitalize">
            {localDayName}
          </p>
          <p className="font-sans text-[13px] text-text-secondary leading-snug">{dayMessage}</p>
        </div>

        <div className="px-5 pt-5 pb-2 bg-bg">
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="font-sans text-[10px] font-[600] tracking-[0.16em] uppercase text-text-secondary/50">
              {t('hero.card.stemsInSeason')}
            </p>
            <span className="font-sans text-[11px] font-[550] text-accent">{t('hero.card.springPeak')}</span>
          </div>
          <div className="flex flex-col gap-2">
            {SEASON_STEMS.map(({ key, productSlug, price, bg, color }) => (
              <StemRow
                key={key}
                stemKey={key}
                productSlug={productSlug}
                price={price}
                bg={bg}
                color={color}
                onOpenModal={setSelectedProduct}
              />
            ))}
          </div>
        </div>

        <div className="px-5 pb-5 pt-4 bg-bg">
          <Link
            to="/shop"
            className="group flex items-center justify-center gap-2 w-full bg-text-primary text-bg font-sans text-[12px] font-[500] tracking-[0.07em] uppercase py-4 rounded-xl hover:bg-accent transition-colors duration-300"
          >
            {t('hero.card.buildOrder')}
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
