'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/products'

export type CartItem = {
  product: Product
  quantity: number
  size?: string
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, size?: string) => void
  removeItem: (productId: string, size?: string) => void
  updateQty: (productId: string, qty: number, size?: string) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product, size) => {
        const items = get().items
        const key = size ? `${product.id}-${size}` : product.id
        const existing = items.find(
          (i) => (size ? `${i.product.id}-${i.size}` : i.product.id) === key
        )
        if (existing) {
          set({
            items: items.map((i) =>
              (size ? `${i.product.id}-${i.size}` : i.product.id) === key
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { product, quantity: 1, size }] })
        }
        set({ isOpen: true })
      },

      removeItem: (productId, size) => {
        set({
          items: get().items.filter((i) => {
            const key = size ? `${i.product.id}-${i.size}` : i.product.id
            const targetKey = size ? `${productId}-${size}` : productId
            return key !== targetKey
          }),
        })
      },

      updateQty: (productId, qty, size) => {
        if (qty <= 0) {
          get().removeItem(productId, size)
          return
        }
        set({
          items: get().items.map((i) => {
            const key = size ? `${i.product.id}-${i.size}` : i.product.id
            const targetKey = size ? `${productId}-${size}` : productId
            return key === targetKey ? { ...i, quantity: qty } : i
          }),
        })
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'evara-cart' }
  )
)
