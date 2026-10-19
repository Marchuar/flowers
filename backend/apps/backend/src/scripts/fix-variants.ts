import { IProductModuleService, Modules } from "@medusajs/framework/utils"

export default async function fixVariants({ container }: { container: any }) {
  const logger = container.resolve("logger")
  const productService: IProductModuleService = container.resolve(Modules.PRODUCT)

  const [products] = await productService.listAndCountProducts(
    {},
    { relations: ["variants", "options"], select: ["id", "title"] }
  )

  for (const product of products) {
    const variants: any[] = (product as any).variants ?? []
    const options: any[]  = (product as any).options  ?? []

    // Keep the cheapest/first variant (1 stem), delete the rest
    const sorted = [...variants].sort((a, b) => a.title.localeCompare(b.title))
    const [keep, ...remove] = sorted

    if (remove.length > 0) {
      await productService.deleteProductVariants(remove.map((v: any) => v.id))
      logger.info(`${product.title}: deleted ${remove.length} extra variant(s)`)
    }

    // Rename the kept variant to "Default"
    if (keep) {
      await productService.updateProductVariants(keep.id, { title: "Default" })
    }

    // Delete the "Quantity" option (and its values)
    const quantityOption = options.find((o: any) => o.title === "Quantity")
    if (quantityOption) {
      await productService.deleteProductOptions([quantityOption.id])
      logger.info(`${product.title}: removed Quantity option`)
    }
  }

  logger.info("Done.")
}