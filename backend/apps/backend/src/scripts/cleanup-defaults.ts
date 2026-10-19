import {
  IProductModuleService,
  IRegionModuleService,
  ISalesChannelModuleService,
  IFulfillmentModuleService,
  IInventoryService,
  IStockLocationService,
  Modules,
} from "@medusajs/framework/utils"

export default async function cleanupDefaults({ container }: { container: any }) {
  const logger = container.resolve("logger")

  const productService: IProductModuleService     = container.resolve(Modules.PRODUCT)
  const regionService: IRegionModuleService       = container.resolve(Modules.REGION)
  const scService: ISalesChannelModuleService     = container.resolve(Modules.SALES_CHANNEL)
  const fulfillmentService: IFulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const inventoryService: IInventoryService       = container.resolve(Modules.INVENTORY)
  const stockLocationService: IStockLocationService   = container.resolve(Modules.STOCK_LOCATION)

  // ── 1. Default products ───────────────────────────────────────────────────────
  const defaultProductTitles = ["Medusa T-Shirt", "Medusa Sweatpants", "Medusa Shorts", "Medusa Sweatshirt"]
  const [allProducts] = await productService.listAndCountProducts({}, { select: ["id", "title"] })
  const productsToDelete = allProducts.filter((p: any) => defaultProductTitles.includes(p.title))
  if (productsToDelete.length > 0) {
    await productService.deleteProducts(productsToDelete.map((p: any) => p.id))
    logger.info(`Deleted products: ${productsToDelete.map((p: any) => p.title).join(", ")}`)
  } else {
    logger.info("Default products — skipped (already gone)")
  }

  // ── 2. Default categories ─────────────────────────────────────────────────────
  const defaultCategoryHandles = ["shirts", "sweatshirts", "pants", "merch"]
  const [allCategories] = await productService.listAndCountProductCategories({}, { select: ["id", "handle", "name"] })
  const categoriesToDelete = allCategories.filter((c: any) => defaultCategoryHandles.includes(c.handle))
  if (categoriesToDelete.length > 0) {
    await productService.deleteProductCategories(categoriesToDelete.map((c: any) => c.id))
    logger.info(`Deleted categories: ${categoriesToDelete.map((c: any) => c.name).join(", ")}`)
  } else {
    logger.info("Default categories — skipped (already gone)")
  }

  // ── 3. Default Europe region ──────────────────────────────────────────────────
  const [allRegions] = await regionService.listAndCountRegions({}, { select: ["id", "name", "currency_code"] })
  const europeRegion = allRegions.find((r: any) => r.name === "Europe" || r.currency_code === "eur")
  if (europeRegion) {
    await regionService.deleteRegions([europeRegion.id])
    logger.info(`Deleted region: ${europeRegion.name}`)
  } else {
    logger.info("Europe region — skipped (already gone)")
  }

  // ── 4. Default Sales Channel ──────────────────────────────────────────────────
  const [allChannels] = await scService.listAndCountSalesChannels({}, { select: ["id", "name"] })
  const defaultSC = allChannels.find((c: any) => c.name === "Default Sales Channel")
  if (defaultSC) {
    await scService.deleteSalesChannels([defaultSC.id])
    logger.info("Deleted: Default Sales Channel")
  } else {
    logger.info("Default Sales Channel — skipped (already gone)")
  }

  // ── 5. Default shipping options (Express / Standard) ─────────────────────────
  const [allShippingOptions] = await fulfillmentService.listAndCountShippingOptions(
    {},
    { select: ["id", "name"] }
  )
  const defaultShippingNames = ["Express Shipping", "Standard Shipping"]
  const shippingToDelete = allShippingOptions.filter((o: any) => defaultShippingNames.includes(o.name))
  if (shippingToDelete.length > 0) {
    await fulfillmentService.deleteShippingOptions(shippingToDelete.map((o: any) => o.id))
    logger.info(`Deleted shipping options: ${shippingToDelete.map((o: any) => o.name).join(", ")}`)
  } else {
    logger.info("Default shipping options — skipped (already gone)")
  }

  // ── 6. Default inventory items (from Medusa demo products) ───────────────────
  const [allInventoryItems] = await inventoryService.listAndCountInventoryItems(
    {},
    { select: ["id", "sku"] }
  )
  const stemSkus = new Set(["ROSES", "TULIPS", "PEONIES", "WILDFLOWERS", "EUSTOMA", "CHRYSANTHEMUM"])
  const inventoryToDelete = allInventoryItems.filter((i: any) => !stemSkus.has(i.sku ?? ""))
  if (inventoryToDelete.length > 0) {
    await inventoryService.deleteInventoryItems(inventoryToDelete.map((i: any) => i.id))
    logger.info(`Deleted ${inventoryToDelete.length} default inventory item(s)`)
  } else {
    logger.info("Default inventory items — skipped (already gone)")
  }

  // ── 7. European Warehouse stock location ─────────────────────────────────────
  const [allLocations] = await stockLocationService.listAndCountStockLocations(
    {},
    { select: ["id", "name"] }
  )
  const euroWarehouse = allLocations.find((l: any) => l.name === "European Warehouse")
  if (euroWarehouse) {
    await stockLocationService.deleteStockLocations([euroWarehouse.id])
    logger.info("Deleted stock location: European Warehouse")
  } else {
    logger.info("European Warehouse — skipped (already gone)")
  }

  logger.info("────────────────────────────────")
  logger.info("Cleanup complete.")
}