'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { openCart, itemCount } = useCartStore()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '/shop', label: 'Shop All' },
    { href: '/shop?category=lingerie', label: 'Lingerie' },
    { href: '/shop?category=perfume', label: 'Perfumes' },
    { href: '/shop?category=robe', label: 'Silk Robes' },
    { href: '/shop?category=nightwear', label: 'Nightwear' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-evara-cream/95 backdrop-blur-md shadow-sm border-b border-evara-gold/20'
            : 'bg-transparent'
        }`}
      >
        {/* Top announcement bar */}
        <div className="bg-evara-black text-evara-gold-light text-center py-2 text-xs tracking-widest uppercase">
          Free delivery on orders over ₦20,000 · Limited drops every Friday
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Mobile menu + desktop nav */}
            <div className="flex items-center gap-8">
              <button
                className="lg:hidden text-evara-black"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs tracking-widest uppercase text-evara-black hover:text-evara-gold transition-colors duration-200 font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-center"
            >
              <p className="font-serif text-2xl tracking-[0.15em] text-evara-black leading-none">
                EVARA
              </p>
              <p className="text-[9px] tracking-[0.4em] uppercase text-evara-gold font-medium">
                Intimates & Beauty
              </p>
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:block text-evara-black hover:text-evara-gold transition-colors">
                <Search size={18} />
              </button>
              <button className="hidden sm:block text-evara-black hover:text-evara-gold transition-colors">
                <Heart size={18} />
              </button>
              <button
                onClick={openCart}
                className="relative text-evara-black hover:text-evara-gold transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-evara-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-evara-cream flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-evara-gold/20">
            <span className="font-serif text-2xl tracking-widest">EVARA</span>
            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col p-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl text-evara-black hover:text-evara-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-8 border-t border-evara-gold/20">
            <p className="text-xs tracking-widest uppercase text-evara-muted">
              ✦ Limited drops every Friday ✦
            </p>
          </div>
        </div>
      )}
    </>
  )
}
