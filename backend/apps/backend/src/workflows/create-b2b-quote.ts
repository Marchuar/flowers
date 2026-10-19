import { createStep, createWorkflow, StepResponse } from "@medusajs/framework/workflows-sdk"
import { B2B_MODULE } from "../modules/b2b"
import B2BModuleService from "../modules/b2b/service"

type CreateB2BQuoteInput = {
  customer_email: string
  company_name: string
  phone?: string
  message: string
  estimated_monthly_budget?: string
}

const createB2BQuoteStep = createStep(
  "create-b2b-quote-step",
  async (input: CreateB2BQuoteInput, { container }) => {
    const b2bService: B2BModuleService = container.resolve(B2B_MODULE)

    const quoteRequest = await b2bService.createB2BQuoteRequests({
      customer_email: input.customer_email,
      company_name: input.company_name,
      phone: input.phone ?? null,
      message: input.message,
      estimated_monthly_budget: input.estimated_monthly_budget ?? null,
    })

    return new StepResponse(quoteRequest, quoteRequest.id)
  },
  async (quoteId: string, { container }) => {
    const b2bService: B2BModuleService = container.resolve(B2B_MODULE)
    await b2bService.deleteB2BQuoteRequests(quoteId)
  }
)

export const createB2BQuoteWorkflow = createWorkflow(
  "create-b2b-quote",
  (input: CreateB2BQuoteInput) => {
    const quote = createB2BQuoteStep(input)
    return quote
  }
)
