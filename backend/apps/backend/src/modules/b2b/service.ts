// eslint-disable-next-line @typescript-eslint/no-require-imports
const { MedusaService } = require("@medusajs/framework/utils") as { MedusaService: any }
import B2BCompany from "./models/b2b-company"
import B2BQuoteRequest from "./models/b2b-quote-request"

class B2BModuleService extends MedusaService({ B2BCompany, B2BQuoteRequest }) {}

export default B2BModuleService
