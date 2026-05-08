import type { ProductProperty, StemHeight, StemFullness } from '../../../constants/products'

export interface FilterState {
  types: string[]
  properties: ProductProperty[]
  height: StemHeight | null
  fullness: StemFullness | null
  colors: string[]
}

export const EMPTY_FILTERS: FilterState = { types: [], properties: [], height: null, fullness: null, colors: [] }
