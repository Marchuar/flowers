// eslint-disable-next-line @typescript-eslint/no-require-imports
const { model } = require("@medusajs/framework/utils") as { model: any }

export enum QuoteStatus {
  PENDING = "pending",
  REVIEWED = "reviewed",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

const B2BQuoteRequest = model.define("b2b_quote_request", {
  id: model.id().primaryKey(),
  customer_email: model.text(),
  company_name: model.text(),
  phone: model.text().nullable(),
  message: model.text(),
  estimated_monthly_budget: model.text().nullable(),
  status: model.enum(QuoteStatus).default(QuoteStatus.PENDING),
  admin_notes: model.text().nullable(),
})

export default B2BQuoteRequest
