'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { type Product, formatPrice } from '@/lib/products'
import { useCartStore } from '@/store/cart'

type Props = {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCartStore()

  return (
    <div className="group relative card-hover">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isLimitedDrop && (
          <span className="bg-evara-black text-evara-gold text-[9px] tracking-widest uppercase px-2 py-1 font-bold">
            Limited Drop
          </span>
        )}
        {product.isNew && !product.isLimitedDrop && (
          <span className="bg-evara-gold text-white text-[9px] tracking-widest uppercase px-2 py-1 font-bold">
            New
          </span>
        )}
        {product.originalPrice && (
          <span className="bg-evara-blush-deep text-white text-[9px] tracking-widest uppercase px-2 py-1 font-bold">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
        <Heart size={14} className="text-evara-black hover:text-red-400 transition-colors" />
      </button>

      {/* Image */}
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-evara-black/90 py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
            <ShoppingBag size={14} className="text-evara-gold" />
            <span className="text-white text-xs tracking-widest uppercase">Quick Add</span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-2">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-serif text-lg leading-tight hover:text-evara-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-evara-muted mt-1 truncate">{product.shortDesc}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="border border-evara-gold text-evara-gold font-semibold text-sm px-2 py-0.5 tracking-wide">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-evara-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <button
        onClick={() => addItem(product)}
        className="w-full border border-evara-black text-evara-black text-xs tracking-widest uppercase py-2.5 mt-1 hover:bg-evara-black hover:text-white transition-all duration-300"
      >
        Add to Bag
      </button>
    </div>
  )
}
