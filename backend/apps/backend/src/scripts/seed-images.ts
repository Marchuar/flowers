import { IProductModuleService, Modules } from "@medusajs/framework/utils"

const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173"

const PRODUCT_IMAGES: Record<string, { primary: string; extra: string[] }> = {
  Roses: {
    primary: `${FRONTEND_URL}/images/products/roses.png`,
    extra: [
      "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
    ],
  },
  Tulips: {
    primary: `${FRONTEND_URL}/images/products/tulips.png`,
    extra: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
    ],
  },
  Peonies: {
    primary: `${FRONTEND_URL}/images/products/peonies.png`,
    extra: [
      "https://images.unsplash.com/photo-1559181567-c3190b1f11f8?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
    ],
  },
  Wildflowers: {
    primary: `${FRONTEND_URL}/images/products/wildflowers.png`,
    extra: [
      "https://images.unsplash.com/photo-1455103683-2561c5b33a17?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1490750967868-88df5691cc52?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
    ],
  },
  Eustoma: {
    primary: `${FRONTEND_URL}/images/products/eustoma.png`,
    extra: [
      "https://images.unsplash.com/photo-1505188799714-5e0b2e67ef4d?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1548973600-7a0d02f7c879?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
    ],
  },
  Chrysanthemum: {
    primary: `${FRONTEND_URL}/images/products/chrysanthemum.png`,
    extra: [
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
    ],
  },
}

export default async function seedImages({ container }: { container: any }) {
  const logger = container.resolve("logger")
  const productService: IProductModuleService = container.resolve(Modules.PRODUCT)

  const [products] = await productService.listAndCountProducts(
    {},
    { select: ["id", "title"] }
  )

  let updated = 0
  for (const product of products) {
    const config = PRODUCT_IMAGES[product.title]
    if (!config) {
      logger.warn(`No image config for "${product.title}" — skipped`)
      continue
    }

    await productService.updateProducts(product.id, {
      images: [
        { url: config.primary },
        ...config.extra.map((url) => ({ url })),
      ],
    })

    logger.info(`Updated images for: ${product.title}`)
    updated++
  }

  logger.info(`Done. Updated ${updated}/${products.length} products.`)
}