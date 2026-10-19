import { useEffect, useState } from 'react'
import { sdk } from '../lib/medusa'

type ShippingOptionMap = Record<string, string> // type.code → option id

export function useShippingOptions(cartId?: string | null) {
  const [optionMap, setOptionMap] = useState<ShippingOptionMap>({})

  useEffect(() => {
    if (!cartId) return
    sdk.store.fulfillment
      .listCartOptions({ cart_id: cartId })
      .then(({ shipping_options }) => {
        const map: ShippingOptionMap = {}
        for (const opt of shipping_options ?? []) {
          const code = (opt as any).type?.code as string | undefined
          if (code && opt.id) map[code] = opt.id
        }
        setOptionMap(map)
      })
      .catch(() => {})
  }, [cartId])

  return optionMap
}