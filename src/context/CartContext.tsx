import { useReducer, useMemo, useState, useCallback, useEffect, type ReactNode } from 'react'
import { type Product } from '../constants/products'
import { parsePrice } from '../lib/utils'
import { CartContext, type CartItem, type CartContextValue } from './cartContextDef'

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

  useEffect(() => {
    localStorage.setItem('stem-cart', JSON.stringify(state))
  }, [state])

  const totalItems = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items])
  const totalPrice = useMemo(
    () => state.items.reduce((s, i) => s + i.numericPrice * i.quantity, 0),
    [state.items]
  )

  const addItem    = useCallback((product: Product, qty?: number) => dispatch({ type: 'ADD_ITEM', product, qty }), [])
  const removeItem = useCallback((productId: number) => dispatch({ type: 'REMOVE_ITEM', productId }), [])
  const updateQty  = useCallback((productId: number, qty: number) => dispatch({ type: 'UPDATE_QTY', productId, qty }), [])
  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const openCart   = useCallback(() => setIsCartOpen(true), [])
  const closeCart  = useCallback(() => setIsCartOpen(false), [])

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
  }), [state.items, totalItems, totalPrice, isCartOpen, addItem, removeItem, updateQty, clearCart, openCart, closeCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
