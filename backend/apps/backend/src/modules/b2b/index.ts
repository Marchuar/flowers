import B2BModuleService from "./service"

export const B2B_MODULE = "b2bModule"

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Module } = require("@medusajs/framework/utils") as {
  Module: (key: string, opts: { service: unknown }) => unknown
}

export default Module(B2B_MODULE, { service: B2BModuleService })
