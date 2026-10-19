import { useEffect, useState } from 'react'
import { sdk } from '../lib/medusa'
import { products as staticProducts, type Product, type ProductProperty, type StemHeight, type StemFullness } from '../constants/products'

const TAG_TO_PROPERTY: Record<string, ProductProperty> = {
  'pet-safe': 'pet-safe',
  'long-lasting': 'long-lasting',
  'fragrant': 'fragrant',
  'scent-free': 'scent-free',
}

const BADGE_TAGS = new Set(['bestseller', 'seasonal', 'premium'])

function formatPrice(amountInGrosze: number): string {
  return (amountInGrosze / 100).toFixed(2).replace('.', ',') + ' zł'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMedusaProduct(p: any, index: number): Product {
  const meta = p.metadata ?? {}
  const variants: any[] = p.variants ?? []
  const variant = variants[0]
  const price = variant?.calculated_price?.calculated_amount
    ?? variant?.prices?.[0]?.amount
    ?? 0

  const tags: string[] = (p.tags ?? []).map((t: any) => String(t.value).toLowerCase())
  const properties = tags.filter(t => t in TAG_TO_PROPERTY).map(t => TAG_TO_PROPERTY[t])
  const badgeTag = tags.find(t => BADGE_TAGS.has(t))

  const staticFallback = staticProducts[index]

  return {
    id: index + 1,
    slug: p.handle ?? staticFallback?.slug ?? '',
    name: p.title ?? staticFallback?.name ?? '',
    latinName: p.subtitle ?? staticFallback?.latinName ?? '',
    price: formatPrice(price),
    priceNote: 'per stem',
    image: p.images?.[0]?.url ?? staticFallback?.image ?? '',
    images: p.images?.map((img: any) => img.url) ?? staticFallback?.images,
    tag: badgeTag
      ? badgeTag.charAt(0).toUpperCase() + badgeTag.slice(1)
      : staticFallback?.tag,
    color: (meta.color as string) ?? staticFallback?.color ?? '#E8D5C4',
    description: p.description ?? staticFallback?.description,
    careInstructions: staticFallback?.careInstructions,
    properties: properties.length > 0 ? properties : staticFallback?.properties,
    height: (meta.height as StemHeight) ?? staticFallback?.height,
    fullness: (meta.fullness as StemFullness) ?? staticFallback?.fullness,
    featured: meta.featured === true || meta.featured === 'true',
    medusaId: p.id,
    variantId: variant?.id,
  }
}

export function useMedusaProducts() {
  const [products, setProducts] = useState<Product[]>(staticProducts)
  const [loading, setLoading] = useState(false)
  const [fromBackend, setFromBackend] = useState(false)

  useEffect(() => {
    setLoading(true)
    sdk.store.product
      .list({ limit: 20, fields: '*variants,*variants.prices,*images,*tags,metadata' })
      .then(({ products: medusaProducts }) => {
        if (medusaProducts && medusaProducts.length > 0) {
          setProducts(medusaProducts.map(mapMedusaProduct))
          setFromBackend(true)
        }
      })
      .catch(() => {
        // Backend unavailable — static data already set
      })
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, fromBackend }
}