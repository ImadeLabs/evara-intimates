import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Star, Shield, Truck, RotateCcw } from 'lucide-react'
import { getProductBySlug, formatPrice, products } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'
import { ProductActions } from './ProductActions'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-evara-muted mb-10">
          <Link href="/" className="hover:text-evara-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-evara-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-evara-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isLimitedDrop && (
              <div className="absolute top-4 left-4 bg-evara-black text-evara-gold text-[9px] tracking-widest uppercase px-3 py-1.5 font-bold">
                Limited Drop
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            {/* Badges & rating */}
            <div className="flex items-center gap-3 mb-4">
              {product.isBestSeller && (
                <span className="text-[9px] tracking-widest uppercase text-evara-gold border border-evara-gold px-2 py-1">
                  Best Seller
                </span>
              )}
              {product.isNew && (
                <span className="text-[9px] tracking-widest uppercase bg-evara-gold text-white px-2 py-1">
                  New
                </span>
              )}
              <div className="flex items-center gap-1">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} size={10} className="fill-evara-gold text-evara-gold" />
                ))}
                <span className="text-xs text-evara-muted ml-1">(24 reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl mb-3">{product.name}</h1>
            <p className="text-evara-muted text-sm mb-6">{product.shortDesc}</p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-serif text-3xl border-2 border-evara-gold text-evara-gold px-4 py-1.5 tracking-wide">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-evara-muted line-through text-base">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-evara-blush text-evara-blush-deep text-xs px-2 py-0.5 tracking-wider">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Client-side interactive actions */}
            <ProductActions product={product} />

            {/* Description */}
            <div className="border-t border-evara-gold/20 pt-6 mb-6">
              <h3 className="text-xs tracking-widest uppercase font-semibold mb-3">Details</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-evara-gold/20 pt-6">
              {[
                { icon: <Truck size={16} />, label: 'Fast Delivery', sub: 'Lagos 24h' },
                { icon: <Shield size={16} />, label: 'Secure Pay', sub: 'via Stripe' },
                { icon: <RotateCcw size={16} />, label: 'Easy Returns', sub: '7 days' },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className="flex justify-center text-evara-gold mb-1">{b.icon}</div>
                  <p className="text-[10px] font-semibold tracking-wider uppercase">{b.label}</p>
                  <p className="text-[10px] text-evara-muted">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-2">You May Also Like</p>
                <h2 className="font-serif text-3xl sm:text-4xl">Complete the Look</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-2 text-sm tracking-widest uppercase text-evara-muted hover:text-evara-black transition-colors"
              >
                <ArrowLeft size={14} /> Back to Shop
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
