'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { products, CATEGORIES } from '@/lib/products'
import { SlidersHorizontal, X } from 'lucide-react'
import { Suspense } from 'react'

function ShopContent() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'new'>('default')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const filtered = products
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      return 0
    })

  return (
    <div className="pt-32 pb-20 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-3">
            {filtered.length} pieces
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl">The Collection</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-xs tracking-widest uppercase border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-evara-black text-white border-evara-black'
                    : 'border-evara-black/30 text-evara-black hover:border-evara-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-evara-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-xs tracking-widest uppercase bg-transparent border border-evara-black/30 px-3 py-2 focus:outline-none focus:border-evara-gold"
            >
              <option value="default">Featured</option>
              <option value="new">New First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-evara-muted mb-4">No items found</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="btn-outline flex items-center gap-2 mx-auto"
            >
              <X size={14} /> Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-evara-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs tracking-widest uppercase text-evara-muted">Loading</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
