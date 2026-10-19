import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { createB2BQuoteWorkflow } from "../../../workflows/create-b2b-quote"

const CreateQuoteSchema = z.object({
  customer_email: z.string().email(),
  company_name: z.string().min(2),
  phone: z.string().optional(),
  message: z.string().min(10),
  estimated_monthly_budget: z.string().optional(),
})

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const parsed = CreateQuoteSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() })
  }

  const { result } = await createB2BQuoteWorkflow(req.scope).run({
    input: parsed.data,
  })

  const quote = result as { id: string; status: string }
  res.status(201).json({ quote_request: { id: quote.id, status: quote.status } })
}
