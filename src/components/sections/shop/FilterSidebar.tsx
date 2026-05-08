import { PawPrint } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { products, type ProductProperty, type StemHeight, type StemFullness } from '../../../constants/products'
import { type FilterState, EMPTY_FILTERS } from './filterTypes'
import { FlowerIcon } from '../../ui/flowerIcons'

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

function chipCls(active: boolean) {
  return `font-sans text-[12.5px] font-[450] px-3 py-2 rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 ${
    active
      ? 'bg-accent text-surface border-accent'
      : 'bg-surface text-text-primary border-border hover:border-accent/40'
  }`
}


interface FilterSidebarProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  hasAnyFilter: boolean
}

export function FilterSidebar({ filters, onChange, hasAnyFilter }: FilterSidebarProps) {
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
                <FlowerIcon slug={p.slug} color={filters.types.includes(p.slug) ? '#FAFAF7' : p.color} />
                <span className="leading-tight">{t(`products.${p.slug}.name`)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

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
