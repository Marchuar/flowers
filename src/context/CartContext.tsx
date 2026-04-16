import { createContext, useContext, useReducer, useMemo, useState, type ReactNode } from 'react'
import { type Product } from '../constants/products'
import { parsePrice } from '../lib/utils'

export interface CartItem {
  product: Product
  quantity: number
  numericPrice: number
}

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

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, qty?: number) => void
  removeItem: (productId: number) => void
  updateQty: (productId: number, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items])
  const totalPrice = useMemo(
    () => state.items.reduce((s, i) => s + i.numericPrice * i.quantity, 0),
    [state.items]
  )

  const value: CartContextValue = {
    items: state.items,
    addItem: (product, qty) => dispatch({ type: 'ADD_ITEM', product, qty }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
    updateQty: (productId, qty) => dispatch({ type: 'UPDATE_QTY', productId, qty }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    totalItems,
    totalPrice,
    isCartOpen,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
