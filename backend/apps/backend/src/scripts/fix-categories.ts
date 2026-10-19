import { IProductModuleService, Modules } from "@medusajs/framework/utils"

const PRODUCT_CATEGORIES: Record<string, string | null> = {
  Roses:         "bestseller",
  Tulips:        "seasonal",
  Peonies:       "premium",
  Wildflowers:   null,
  Eustoma:       null,
  Chrysanthemum: null,
}

export default async function fixCategories({ container }: { container: any }) {
  const logger = container.resolve("logger")
  const productService: IProductModuleService = container.resolve(Modules.PRODUCT)

  // ── 1. Delete wrong categories ────────────────────────────────────────────────
  const [allCategories] = await productService.listAndCountProductCategories(
    {},
    { select: ["id", "handle", "name"] }
  )
  const toRemove = allCategories.filter((c: any) => ["roses", "wildflowers"].includes(c.handle))
  if (toRemove.length > 0) {
    await productService.deleteProductCategories(toRemove.map((c: any) => c.id))
    logger.info(`Deleted categories: ${toRemove.map((c: any) => c.name).join(", ")}`)
  }

  // ── 2. Ensure Bestseller category exists ─────────────────────────────────────
  const [refreshed] = await productService.listAndCountProductCategories(
    {},
    { select: ["id", "handle", "name"] }
  )
  const categoryMap: Record<string, string> = {}
  for (const c of refreshed as any[]) categoryMap[c.handle] = c.id

  if (!categoryMap["bestseller"]) {
    const [created] = await productService.createProductCategories([
      { name: "Bestseller", handle: "bestseller", is_active: true },
    ])
    categoryMap["bestseller"] = (created as any).id
    logger.info("Created category: Bestseller")
  }

  // ── 3. Assign products to categories ─────────────────────────────────────────
  const [products] = await productService.listAndCountProducts(
    {},
    { relations: ["categories"], select: ["id", "title"] }
  )

  for (const product of products as any[]) {
    const targetHandle = PRODUCT_CATEGORIES[product.title]
    const currentHandles: string[] = (product.categories ?? []).map((c: any) => c.handle)

    if (targetHandle === null) {
      if (currentHandles.length > 0) {
        await productService.updateProducts(product.id, { categories: [] })
        logger.info(`${product.title}: removed all categories (standard)`)
      } else {
        logger.info(`${product.title}: no category (standard) — ok`)
      }
    } else {
      const targetId = categoryMap[targetHandle]
      if (!targetId) {
        logger.warn(`${product.title}: category "${targetHandle}" not found — skipped`)
        continue
      }
      if (!currentHandles.includes(targetHandle)) {
        await productService.updateProducts(product.id, { categories: [{ id: targetId }] })
        logger.info(`${product.title}: assigned → ${targetHandle}`)
      } else {
        logger.info(`${product.title}: already in ${targetHandle} — ok`)
      }
    }
  }

  logger.info("Done.")
}