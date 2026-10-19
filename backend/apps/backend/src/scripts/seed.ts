import {
  createApiKeysWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"
import { ExecArgs } from "@medusajs/framework/types"
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Modules, ContainerRegistrationKeys } = require("@medusajs/framework/utils") as {
  Modules: Record<string, string>
  ContainerRegistrationKeys: Record<string, string>
}

export default async function seedStem({ container }: ExecArgs) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = container as any
  const logger = c.resolve(ContainerRegistrationKeys.LOGGER)
  const remoteLink = c.resolve(ContainerRegistrationKeys.REMOTE_LINK)
  const query = c.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = c.resolve(Modules.FULFILLMENT)
  const salesChannelModuleService = c.resolve(Modules.SALES_CHANNEL)
  const storeModuleService = c.resolve(Modules.STORE)

  logger.info("Seeding STEM store data...")

  // ── 1. Get or reuse existing sales channel ──────────────────────────────────
  const { data: existingChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })

  let salesChannelId: string
  const stemChannel = existingChannels.find((c: any) => c.name === "Storefront")
  if (stemChannel) {
    salesChannelId = stemChannel.id
    logger.info(`Reusing sales channel: ${salesChannelId}`)
  } else {
    const { result } = await salesChannelModuleService.createSalesChannels([
      { name: "Storefront", description: "STEM online store" },
    ])
    salesChannelId = result[0].id
    logger.info(`Created sales channel: ${salesChannelId}`)
  }

  // ── 2. Add PLN to store supported currencies ─────────────────────────────────
  // Use query.graph to get currencies with is_default field (listStores doesn't return it)
  const { data: storeData } = await query.graph({
    entity: "store",
    fields: ["id", "supported_currencies.currency_code", "supported_currencies.is_default"],
  })
  const store = storeData[0]
  const currencies = (store.supported_currencies ?? []) as Array<{ currency_code: string; is_default?: boolean }>
  const hasPln = currencies.some((c: any) => c.currency_code === "pln")
  if (!hasPln) {
    // Ensure at least one currency keeps is_default: true
    const hasDefault = currencies.some((c: any) => c.is_default)
    await updateStoresWorkflow(container).run({
      input: {
        selector: { id: store.id },
        update: {
          supported_currencies: [
            ...currencies.map((c: any, i: number) => ({
              currency_code: c.currency_code,
              is_default: c.is_default ?? (!hasDefault && i === 0),
            })),
            { currency_code: "pln", is_default: false },
          ],
        },
      },
    })
    logger.info("Added PLN to store currencies")
  }

  // ── 3. Create Poland region ───────────────────────────────────────────────────
  const { data: existingRegions } = await query.graph({
    entity: "region",
    fields: ["id", "name"],
  })

  let regionId: string
  const plRegion = existingRegions.find((r: any) => r.name === "Poland")
  if (plRegion) {
    regionId = plRegion.id
    logger.info(`Reusing Poland region: ${regionId}`)
  } else {
    logger.info("Creating Poland region...")
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Poland",
            currency_code: "pln",
            countries: ["pl"],
            payment_providers: ["pp_stripe_stripe"],
          },
        ],
      },
    })
    regionId = regionResult[0].id

    // Tax region for Poland — code is required in Medusa v2.14+
    const { data: existingTaxRegions } = await query.graph({
      entity: "tax_region",
      fields: ["id", "country_code"],
    })
    const plTaxExists = existingTaxRegions.some((t: any) => t.country_code === "pl")
    if (!plTaxExists) {
      await createTaxRegionsWorkflow(container).run({
        input: [
          {
            country_code: "pl",
            provider_id: "tp_system",
            default_tax_rate: { rate: 23, name: "VAT PL", code: "VAT_PL" },
          },
        ],
      })
      logger.info("Created Poland tax region")
    }
  }

  // ── 4. Get existing shipping profile ─────────────────────────────────────────
  const { data: profileData } = await query.graph({
    entity: "shipping_profile",
    fields: ["id", "name"],
  })
  let shippingProfileId = profileData[0]?.id

  if (!shippingProfileId) {
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: { data: [{ name: "Warsaw Delivery", type: "default" }] },
    })
    shippingProfileId = result[0].id
  }

  // ── 5. Warsaw fulfillment set & stock location ────────────────────────────────
  const { data: existingLocations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })

  let stockLocationId: string
  const warsawLocation = existingLocations.find((l: any) => l.name === "Warsaw Warehouse")
  if (warsawLocation) {
    stockLocationId = warsawLocation.id
  } else {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [{ name: "Warsaw Warehouse", address: { address_1: "Warsaw", city: "Warsaw", country_code: "pl" } as any }],
      },
    })
    stockLocationId = result[0].id
    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: { id: stockLocationId, add: [salesChannelId] },
    })
  }

  // ── 6. Warsaw fulfillment set with delivery time slots ───────────────────────
  const allFulfillmentSets = await fulfillmentModuleService.listFulfillmentSets(
    { name: "Warsaw Local Delivery" },
    { relations: ["service_zones"] }
  )

  let serviceZoneId: string
  if (allFulfillmentSets.length > 0) {
    serviceZoneId = allFulfillmentSets[0].service_zones[0]?.id
    logger.info("Reusing Warsaw fulfillment set")
  } else {
    const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: "Warsaw Local Delivery",
      type: "local",
      service_zones: [
        { name: "Warsaw", geo_zones: [{ type: "country", country_code: "pl" }] },
      ],
    })
    serviceZoneId = fulfillmentSet.service_zones[0].id

    await remoteLink.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationId },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    })
    await remoteLink.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocationId },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })
  }

  // Create shipping options (slots) only if they don't exist
  const { data: existingOptions } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name"],
  })
  const stemSlotNames = ["Rano (9:00–13:00)", "Po południu (13:00–17:00)", "Wieczór (17:00–21:00)"]
  const slotsExist = stemSlotNames.every((n) => existingOptions.some((o: any) => o.name === n))

  if (!slotsExist) {
    logger.info("Creating Warsaw delivery time slots...")
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Rano (9:00–13:00)",
          price_type: "flat",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfileId,
          provider_id: "manual_manual",
          type: { label: "Morning delivery", description: "9:00–13:00", code: "morning" },
          prices: [{ currency_code: "pln", amount: 0 }],
        },
        {
          name: "Po południu (13:00–17:00)",
          price_type: "flat",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfileId,
          provider_id: "manual_manual",
          type: { label: "Afternoon delivery", description: "13:00–17:00", code: "afternoon" },
          prices: [{ currency_code: "pln", amount: 0 }],
        },
        {
          name: "Wieczór (17:00–21:00)",
          price_type: "flat",
          service_zone_id: serviceZoneId,
          shipping_profile_id: shippingProfileId,
          provider_id: "manual_manual",
          type: { label: "Evening delivery", description: "17:00–21:00", code: "evening" },
          prices: [{ currency_code: "pln", amount: 0 }],
        },
      ],
    })
  }

  // ── 7. Create product categories ─────────────────────────────────────────────
  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "handle"],
  })
  const categoryHandles = ["bestseller", "seasonal", "premium"]
  const missingCategories = categoryHandles.filter(
    (h) => !existingCategories.some((c: any) => c.handle === h)
  )

  const categoryMap: Record<string, string> = {}
  existingCategories.forEach((c: any) => { categoryMap[c.handle] = c.id })

  if (missingCategories.length > 0) {
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((h) => ({
          name: h.charAt(0).toUpperCase() + h.slice(1),
          handle: h,
          is_active: true,
        })),
      },
    })
    result.forEach((c) => { categoryMap[c.handle] = c.id })
  }

  // ── 8. Create publishable API key ─────────────────────────────────────────────
  const { data: existingKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "title", "token"],
    filters: { type: "publishable" },
  })
  const stemKey = existingKeys.find((k: any) => k.title === "Storefront")

  let publishableKey: string
  if (stemKey) {
    publishableKey = stemKey.token
    logger.info(`Reusing API key: ${stemKey.id}`)
  } else {
    const { result: keyResult } = await createApiKeysWorkflow(container).run({
      input: { api_keys: [{ title: "Storefront", type: "publishable", created_by: "" }] },
    })
    publishableKey = keyResult[0].token
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: { id: keyResult[0].id, add: [salesChannelId] },
    })
  }

  // ── 9. Create STEM products (skip if handle already exists) ──────────────────
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  })
  const existingHandles = new Set(existingProducts.map((p: any) => p.handle as string))

  const stemProducts = [
    {
      handle: "roses", title: "Roses", subtitle: "Rosa",
      description: "A classic for a reason. Roses reward a little daily attention with days of quiet elegance.",
      tag: "bestseller", color: "#E8A0A0", height: "medium", fullness: "lush", featured: true,
      tags: ["bestseller", "fragrant", "long-lasting"], categoryHandle: "bestseller",
      image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      price: 350,
    },
    {
      handle: "tulips", title: "Tulips", subtitle: "Tulipa",
      description: "Wonderfully independent flowers. Tulips actually continue growing after being cut — they have a mind of their own.",
      tag: "seasonal", color: "#F5C5A0", height: "medium", fullness: "minimal", featured: true,
      tags: ["seasonal", "scent-free", "long-lasting"], categoryHandle: "seasonal",
      image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      price: 290,
    },
    {
      handle: "peonies", title: "Peonies", subtitle: "Paeonia",
      description: "Worth every bit of fuss. With the right care, peonies open into breathtaking, pillowy blossoms.",
      tag: "premium", color: "#EFBDBD", height: "short", fullness: "lush", featured: true,
      tags: ["premium", "fragrant"], categoryHandle: "premium",
      image: "https://images.unsplash.com/photo-1559181567-c3190b1f11f8?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      price: 690,
    },
    {
      handle: "wildflowers", title: "Wildflowers", subtitle: "Mixed stems",
      description: "A joyful seasonal mix, unique in every bunch. Just as wildflowers should be — never the same twice.",
      tag: undefined, color: "#B5CEAA", height: "short", fullness: "minimal", featured: false,
      tags: ["pet-safe", "scent-free"], categoryHandle: undefined,
      image: "https://images.unsplash.com/photo-1455103683-2561c5b33a17?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      price: 220,
    },
    {
      handle: "eustoma", title: "Eustoma", subtitle: "Lisianthus",
      description: "Elegant and exceptionally long-lasting. Eustoma offers outstanding value — up to two weeks of quiet beauty.",
      tag: undefined, color: "#C5B8E8", height: "tall", fullness: "lush", featured: false,
      tags: ["pet-safe", "long-lasting"], categoryHandle: undefined,
      image: "https://images.unsplash.com/photo-1505188799714-5e0b2e67ef4d?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      price: 450,
    },
    {
      handle: "chrysanthemum", title: "Chrysanthemum", subtitle: "Chrysanthemum",
      description: "Hardy and cheerful. Chrysanthemums are the champions of longevity — up to 3 weeks with simple care.",
      tag: undefined, color: "#F0D090", height: "medium", fullness: "lush", featured: false,
      tags: ["long-lasting", "scent-free"], categoryHandle: undefined,
      image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?w=600&h=800&q=85&fit=crop&crop=center&auto=format",
      price: 320,
    },
  ]

  const newProducts = stemProducts.filter((p) => !existingHandles.has(p.handle))

  if (newProducts.length > 0) {
    logger.info(`Creating ${newProducts.length} STEM products...`)

    await createProductsWorkflow(container).run({
      input: {
        products: newProducts.map((p) => ({
          title: p.title,
          handle: p.handle,
          subtitle: p.subtitle,
          description: p.description,
          status: "published" as const,
          sales_channels: [{ id: salesChannelId }],
          shipping_profile_id: shippingProfileId,
          categories: p.categoryHandle && categoryMap[p.categoryHandle]
            ? [{ id: categoryMap[p.categoryHandle] }]
            : [],
          images: [{ url: p.image }],
          variants: [
            {
              title: "Default",
              sku: p.handle.toUpperCase(),
              manage_inventory: false,
              prices: [{ currency_code: "pln", amount: p.price }],
            },
          ],
          metadata: {
            color: p.color,
            height: p.height,
            fullness: p.fullness,
            featured: p.featured,
          },
        })),
      },
    })
    logger.info("✅ Products created")
  } else {
    logger.info("Products already exist, skipping")
  }

  logger.info("─────────────────────────────────────────────")
  logger.info("✅ STEM seed complete!")
  logger.info(`📦 Publishable API key: ${publishableKey}`)
  logger.info("👆 Copy this key into frontend/.env.local as VITE_MEDUSA_PUBLISHABLE_KEY")
  logger.info("─────────────────────────────────────────────")
}
