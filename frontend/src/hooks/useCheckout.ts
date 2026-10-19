import { useState, useCallback } from 'react'
import { sdk } from '../lib/medusa'
import { useCart } from './useCart'

type CheckoutAddress = {
  first_name: string
  last_name: string
  address_1: string
  address_2?: string
  city: string
  country_code: string
  phone: string
  email: string
}

type CheckoutState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'requires_payment'; clientSecret: string; cartId: string }
  | { status: 'success'; orderId: string }
  | { status: 'error'; message: string }

export function useCheckout() {
  const { getMedusaCartId, clearCart } = useCart()
  const [state, setState] = useState<CheckoutState>({ status: 'idle' })

  const initCheckout = useCallback(async (
    address: CheckoutAddress,
    shippingOptionId: string,
    notes?: string
  ) => {
    setState({ status: 'loading' })
    try {
      let cartId = await getMedusaCartId()
      if (!cartId) throw new Error('Cart not available')

      // 1. Set shipping address
      await sdk.store.cart.update(cartId, {
        shipping_address: {
          first_name: address.first_name,
          last_name: address.last_name,
          address_1: address.address_1,
          address_2: address.address_2 ?? '',
          city: address.city,
          country_code: address.country_code,
          phone: address.phone,
        },
        email: address.email,
        metadata: notes ? { delivery_notes: notes } : undefined,
      })

      // 2. Add shipping method (delivery time slot)
      await sdk.store.cart.addShippingMethod(cartId, {
        option_id: shippingOptionId,
      })

      // 3. Initiate Stripe payment session
      const { cart } = await sdk.store.cart.retrieve(cartId)
      const paymentCollection = await sdk.store.payment.initiatePaymentSession(cart, {
        provider_id: 'pp_stripe_stripe',
      })

      const stripeSession = paymentCollection?.payment_sessions?.find(
        (s: any) => s.provider_id === 'pp_stripe_stripe'
      )
      const clientSecret = stripeSession?.data?.client_secret as string | undefined

      if (!clientSecret) throw new Error('Could not get Stripe client secret')

      setState({ status: 'requires_payment', clientSecret, cartId })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Checkout failed'
      setState({ status: 'error', message: msg })
    }
  }, [getMedusaCartId])

  const completeOrder = useCallback(async (cartId: string) => {
    setState({ status: 'loading' })
    try {
      const { type, order } = await sdk.store.cart.complete(cartId)
      if (type === 'order' && order) {
        clearCart()
        setState({ status: 'success', orderId: order.id })
        return order.display_id?.toString() ?? order.id
      }
      throw new Error('Order not created')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not complete order'
      setState({ status: 'error', message: msg })
      return null
    }
  }, [clearCart])

  return { state, initCheckout, completeOrder }
}
