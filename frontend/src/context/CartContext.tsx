import { useReducer, useMemo, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { type Product } from '../constants/products'
import { parsePrice } from '../lib/utils'
import { CartContext, type CartItem, type CartContextValue } from './cartContextDef'
import { sdk } from '../lib/medusa'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; qty?: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QTY'; productId: number; qty: number }
  | { type: 'CLEAR_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex(i => i.product.id === action.product.id)
      if (existing >= 0) {
        const updated = [...state.items]
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + (action.qty ?? 1),
        }
        return { items: updated }
      }
      return {
        items: [
          ...state.items,
          {
            product: action.product,
            quantity: action.qty ?? 1,
            numericPrice: parsePrice(action.product.price),
          },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter(i => i.product.id !== action.productId) }
    case 'UPDATE_QTY': {
      if (action.qty <= 0) {
        return { items: state.items.filter(i => i.product.id !== action.productId) }
      }
      return {
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.qty } : i
        ),
      }
    }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

function loadCart(): CartState {
  try {
    const stored = localStorage.getItem('stem-cart')
    return stored ? JSON.parse(stored) : { items: [] }
  } catch {
    return { items: [] }
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const medusaCartIdRef = useRef<string | null>(localStorage.getItem('stem-medusa-cart-id'))

  useEffect(() => {
    localStorage.setItem('stem-cart', JSON.stringify(state))
  }, [state])

  // Ensure a Medusa cart exists (lazy init)
  const ensureMedusaCart = useCallback(async (): Promise<string | null> => {
    if (medusaCartIdRef.current) return medusaCartIdRef.current
    try {
      const { cart } = await sdk.store.cart.create({})
      medusaCartIdRef.current = cart.id
      localStorage.setItem('stem-medusa-cart-id', cart.id)
      return cart.id
    } catch {
      return null
    }
  }, [])

  // Sync a single item add to Medusa cart (best-effort, non-blocking)
  const syncAddToMedusa = useCallback(async (product: Product, qty: number) => {
    if (!product.variantId) return
    const cartId = await ensureMedusaCart()
    if (!cartId) return
    sdk.store.cart
      .createLineItem(cartId, { variant_id: product.variantId, quantity: qty })
      .catch(() => { /* silent — local state is authoritative */ })
  }, [ensureMedusaCart])

  const totalItems = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items])
  const totalPrice = useMemo(
    () => state.items.reduce((s, i) => s + i.numericPrice * i.quantity, 0),
    [state.items]
  )

  const addItem = useCallback((product: Product, qty?: number) => {
    dispatch({ type: 'ADD_ITEM', product, qty })
    syncAddToMedusa(product, qty ?? 1)
  }, [syncAddToMedusa])
  const removeItem = useCallback((productId: number) => dispatch({ type: 'REMOVE_ITEM', productId }), [])
  const updateQty  = useCallback((productId: number, qty: number) => dispatch({ type: 'UPDATE_QTY', productId, qty }), [])
  const clearCart  = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
    localStorage.removeItem('stem-medusa-cart-id')
    medusaCartIdRef.current = null
  }, [])
  const openCart   = useCallback(() => setIsCartOpen(true), [])
  const closeCart  = useCallback(() => setIsCartOpen(false), [])

  const getMedusaCartId = useCallback(() => ensureMedusaCart(), [ensureMedusaCart])

  const value = useMemo<CartContextValue>(() => ({
    items: state.items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    openCart,
    closeCart,
    getMedusaCartId,
  }), [state.items, totalItems, totalPrice, isCartOpen, addItem, removeItem, updateQty, clearCart, openCart, closeCart, getMedusaCartId])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
