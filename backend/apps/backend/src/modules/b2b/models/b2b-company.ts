// eslint-disable-next-line @typescript-eslint/no-require-imports
const { model } = require("@medusajs/framework/utils") as { model: any }

const B2BCompany = model.define("b2b_company", {
  id: model.id().primaryKey(),
  name: model.text(),
  customer_id: model.text().unique(),
  vat_number: model.text().nullable(),
  discount_percent: model.number().default(10),
  credit_limit: model.number().nullable(),
  notes: model.text().nullable(),
  is_active: model.boolean().default(true),
})

export default B2BCompany
