import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/products'

const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4)
const newArrivals = products.filter((p) => p.isNew).slice(0, 4)

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-evara-black">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80"
            alt="Evara hero"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-evara-black/60 via-evara-black/30 to-evara-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in">
          <p className="text-evara-gold text-xs tracking-[0.5em] uppercase mb-6">
            ✦ New Collection 2025 ✦
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl leading-none mb-6 tracking-tight">
            Dress the
            <br />
            <em className="text-gradient-gold">Woman Within</em>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 font-light">
            Premium lingerie, silk robes & body perfumes crafted for the woman who commands attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-evara-gold text-evara-black px-10 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-evara-gold-light transition-all duration-300 flex items-center justify-center gap-2"
            >
              Shop the Collection <ArrowRight size={16} />
            </Link>
            <Link
              href="/shop?category=robe"
              className="border border-white text-white px-10 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-white hover:text-evara-black transition-all duration-300"
            >
              View Silk Robes
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────────── */}
      <div className="bg-evara-gold overflow-hidden py-3">
        <div className="flex gap-16 animate-shimmer whitespace-nowrap">
          {Array(6).fill(null).map((_, i) => (
            <span
              key={i}
              className="text-evara-black text-[11px] tracking-[0.4em] uppercase font-semibold"
            >
              ✦ Free Delivery Over ₦20,000 &nbsp;&nbsp; ✦ Limited Friday Drops &nbsp;&nbsp; ✦ Premium Packaging &nbsp;&nbsp; ✦ Secured by Stripe
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORY GRID ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-3">Discover</p>
          <h2 className="font-serif text-4xl sm:text-5xl">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Lingerie',
              href: '/shop?category=lingerie',
              img: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80',
            },
            {
              label: 'Silk Robes',
              href: '/shop?category=robe',
              img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
            },
            {
              label: 'Perfumes',
              href: '/shop?category=perfume',
              img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80',
            },
            {
              label: 'Nightwear',
              href: '/shop?category=nightwear',
              img: 'https://images.unsplash.com/photo-1618085219724-c59ba48e08cd?w=600&q=80',
            },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="relative aspect-[3/4] group overflow-hidden bg-gray-100"
            >
              <Image
                src={cat.img}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl text-white">{cat.label}</h3>
                <p className="text-evara-gold text-[10px] tracking-widest uppercase mt-1 flex items-center gap-1">
                  Shop Now <ArrowRight size={10} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-3">Most Loved</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Best Sellers</h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-sm tracking-widest uppercase text-evara-muted hover:text-evara-black transition-colors"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── BUNDLE CALLOUT ────────────────────────────────────────────────────── */}
      <section className="bg-evara-black py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
              alt="Bundle offer"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-white md:w-1/2">
            <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-4">
              ✦ Bundle & Save
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
              The Signature
              <br />
              Evara Bundle
            </h2>
            <p className="text-gray-400 mb-3">Noir Lace Set + Velvet Oud Mist</p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl text-evara-gold">₦14,900</span>
              <span className="text-gray-600 line-through text-sm">₦18,400</span>
              <span className="bg-evara-gold/20 text-evara-gold text-xs px-2 py-0.5 tracking-wider">
                Save 19%
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              Our most iconic combo — beautifully gift-boxed with satin ribbon and a handwritten Evara note. Perfect for yourself or as a luxury gift.
            </p>
            <Link
              href="/shop/perfume-lingerie-bundle"
              className="inline-flex items-center gap-2 bg-evara-gold text-evara-black px-8 py-3 text-sm tracking-widest uppercase font-semibold hover:bg-evara-gold-light transition-all duration-300"
            >
              Get the Bundle <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-3">Just Landed</p>
            <h2 className="font-serif text-4xl sm:text-5xl">New Arrivals</h2>
          </div>
          <Link
            href="/shop?filter=new"
            className="hidden sm:flex items-center gap-2 text-sm tracking-widest uppercase text-evara-muted hover:text-evara-black transition-colors"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-evara-blush/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-3">Reviews</p>
          <h2 className="font-serif text-4xl sm:text-5xl mb-14">She Loves It</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Adaeze O.',
                review:
                  'The Noir Lace Set is everything. Quality is 100% and it arrived in the most beautiful packaging. Will always shop Evara.',
                rating: 5,
              },
              {
                name: 'Chisom N.',
                review:
                  'Velvet Oud is my signature scent now. So luxurious and long-lasting. My friends keep asking what I\'m wearing!',
                rating: 5,
              },
              {
                name: 'Fatima A.',
                review:
                  'I bought the silk robe as a birthday gift for myself and I have no regrets. Feels absolutely premium. Evara is different.',
                rating: 5,
              },
            ].map((t) => (
              <div key={t.name} className="bg-white p-8 text-left">
                <div className="flex gap-0.5 mb-4">
                  {Array(t.rating).fill(null).map((_, i) => (
                    <Star key={i} size={12} className="fill-evara-gold text-evara-gold" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.review}"</p>
                <p className="text-xs tracking-widest uppercase font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIMITED DROP BANNER ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-evara-black text-center">
        <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-4">
          Every Friday • Limited Quantity
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-white mb-4">
          Join the Drop List
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
          Be first to shop our Friday limited drops. Exclusive pieces, never restocked.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-5 py-3 text-sm focus:outline-none focus:border-evara-gold"
          />
          <button
            type="submit"
            className="bg-evara-gold text-evara-black px-8 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-evara-gold-light transition-colors"
          >
            Join
          </button>
        </form>
      </section>
    </>
  )
}
