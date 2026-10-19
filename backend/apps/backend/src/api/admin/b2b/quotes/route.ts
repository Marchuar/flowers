import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { B2B_MODULE } from "../../../../modules/b2b"
import B2BModuleService from "../../../../modules/b2b/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const b2bService = req.scope.resolve(B2B_MODULE) as any as B2BModuleService & {
    listB2BQuoteRequests: (filter?: object, config?: object) => Promise<unknown[]>
  }
  const quoteRequests = await b2bService.listB2BQuoteRequests(
    {},
    { order: { created_at: "DESC" }, take: 50 }
  )
  res.json({ quote_requests: quoteRequests })
}
