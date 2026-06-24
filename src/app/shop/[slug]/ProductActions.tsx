'use client'

import { useState } from 'react'
import { ShoppingBag, Heart } from 'lucide-react'
import { type Product } from '@/lib/products'
import { useCartStore } from '@/store/cart'

export function ProductActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] ?? '')
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem(product, selectedSize || undefined)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Size selector */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-widest uppercase font-medium">Size</span>
            <a href="#" className="text-xs text-evara-gold hover:underline tracking-widest uppercase">
              Size Guide
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border text-sm transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-evara-black text-white border-evara-black'
                    : 'border-evara-black/30 hover:border-evara-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-4 text-sm tracking-widest uppercase font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            added
              ? 'bg-green-600 text-white'
              : 'bg-evara-black text-white hover:bg-evara-gold'
          }`}
        >
          <ShoppingBag size={16} />
          {added ? 'Added to Bag ✓' : 'Add to Bag'}
        </button>
        <button className="sm:w-14 py-4 border border-evara-black/30 hover:border-evara-black flex items-center justify-center transition-colors">
          <Heart size={18} />
        </button>
      </div>
    </>
  )
}
