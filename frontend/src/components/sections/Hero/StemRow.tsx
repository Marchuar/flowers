import React from 'react'
import { Plus, Minus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { products, type Product } from '../../../constants/products'
import { useCart } from '../../../hooks/useCart'
import { useToast } from '../../ui/Toast'
import { FlowerIcon } from '../../ui/flowerIcons'

export type StemRowProps = {
  stemKey: string
  productSlug: string | null
  price: number
  bg: string
  color: string
  onOpenModal?: (p: Product) => void
}

export function StemRow({ stemKey, productSlug, price, bg, color, onOpenModal }: StemRowProps) {
  const { t } = useTranslation()
  const { addItem, items, updateQty, removeItem } = useCart()
  const { showToast } = useToast()

  const product = productSlug ? (products.find(p => p.slug === productSlug) ?? null) : null
  const cartItem = product ? items.find(i => i.product.id === product.id) : null
  const qty = cartItem?.quantity ?? 0

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation()
    if (!product) return
    addItem(product)
    showToast(t('products.addedToBag', { name: t(`hero.card.stems.${stemKey}.name`) }))
  }
  function handleDecrement(e: React.MouseEvent) {
    e.stopPropagation()
    if (!product) return
    if (qty === 1) removeItem(product.id)
    else updateQty(product.id, qty - 1)
  }
  function handleIncrement(e: React.MouseEvent) {
    e.stopPropagation()
    if (!product) return
    updateQty(product.id, qty + 1)
  }

  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface border border-border">
      <button
        type="button"
        onClick={() => product && onOpenModal?.(product)}
        disabled={!product}
        className={`flex items-center gap-3 flex-1 min-w-0 text-left ${product ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: bg, width: '2.875rem', height: '2.875rem' }}
        >
          <FlowerIcon slug={productSlug ?? stemKey} color={color} className="w-7 h-7" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-sans text-[14px] font-[570] text-text-primary leading-none mb-[5px]">
            {t(`hero.card.stems.${stemKey}.name`)}
          </p>
          <div className="flex items-baseline gap-[5px]">
            <span className="font-sans text-[11px] text-text-secondary/60 leading-none truncate">
              {t(`hero.card.stems.${stemKey}.colors`)}
            </span>
            <span className="text-text-secondary/25 text-[9px] leading-none flex-shrink-0">·</span>
            <span className="font-display text-[17px] font-[700] text-text-primary leading-none flex-shrink-0">{price} zł</span>
            <span className="font-sans text-[10px] text-text-secondary/40 leading-none flex-shrink-0">{t('hero.card.perStem')}</span>
          </div>
        </div>
      </button>

      <div className="flex-shrink-0">
        {product ? (
          qty === 0 ? (
            <button
              onClick={handleAdd}
              className="w-7 h-7 rounded-full bg-accent text-bg flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Add to bag"
            >
              <Plus size={13} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-text-primary transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={10} strokeWidth={2.5} />
              </button>
              <span className="font-sans text-[13px] font-[600] text-text-primary w-4 text-center tabular-nums">{qty}</span>
              <button
                onClick={handleIncrement}
                className="w-6 h-6 rounded-full bg-accent text-bg flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Increase quantity"
              >
                <Plus size={10} strokeWidth={2.5} />
              </button>
            </div>
          )
        ) : (
          <span className="font-sans text-[9.5px] font-[550] tracking-[0.1em] uppercase text-text-secondary/35 bg-bg px-2 py-1 rounded-full border border-border/50">
            soon
          </span>
        )}
      </div>
    </div>
  )
}
