'use client'

import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/products'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total } = useCartStore()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            image: i.product.images[0],
          })),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="overlay" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-evara-cream z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-evara-gold/20">
          <div>
            <h2 className="font-serif text-2xl tracking-wide">Your Bag</h2>
            <p className="text-xs text-evara-muted tracking-widest uppercase mt-0.5">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="text-evara-black hover:text-evara-gold transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-evara-gold/40" />
              <p className="font-serif text-xl text-evara-muted">Your bag is empty</p>
              <p className="text-sm text-evara-muted">Add something luxurious</p>
              <button
                onClick={closeCart}
                className="btn-primary text-sm mt-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 pb-6 border-b border-evara-gold/10 last:border-0"
              >
                <div className="relative w-20 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base leading-tight">{item.product.name}</h3>
                  {item.size && (
                    <p className="text-xs text-evara-muted mt-0.5">Size: {item.size}</p>
                  )}
                  <p className="text-sm font-medium text-evara-gold mt-1">
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-evara-gold/30">
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity - 1, item.size)}
                        className="p-1.5 hover:bg-evara-gold/10 transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.product.id, item.quantity + 1, item.size)}
                        className="p-1.5 hover:bg-evara-gold/10 transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-xs text-evara-muted hover:text-red-500 transition-colors tracking-wider uppercase"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-evara-gold/20 bg-white/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm tracking-widest uppercase text-evara-muted">Subtotal</span>
              <span className="font-serif text-xl">{formatPrice(total())}</span>
            </div>
            <p className="text-xs text-evara-muted mb-4 text-center">
              Shipping calculated at checkout
            </p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-evara-black text-white py-4 text-sm tracking-widest uppercase font-medium hover:bg-evara-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? 'Redirecting…' : (
                <>
                  Checkout <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
