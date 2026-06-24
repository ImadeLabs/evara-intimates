'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Heart } from 'lucide-react'
import { useCartStore } from '@/store/cart'

export default function SuccessPage() {
  const { clearCart } = useCartStore()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CheckCircle size={64} className="text-evara-gold" />
            <Heart
              size={20}
              className="absolute -bottom-1 -right-1 fill-evara-blush-deep text-evara-blush-deep"
            />
          </div>
        </div>

        <p className="text-evara-gold text-xs tracking-[0.4em] uppercase mb-4">
          Order Confirmed
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-4">Thank You, Queen</h1>
        <p className="text-gray-600 mb-2 leading-relaxed">
          Your order has been received and is being processed.
          You'll receive a confirmation email shortly.
        </p>
        <p className="text-sm text-evara-muted mb-10">
          Estimated delivery: 1–3 business days (Lagos), 3–7 days (other locations).
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="btn-primary flex items-center justify-center gap-2"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
          <Link href="/" className="btn-outline">
            Back Home
          </Link>
        </div>

        <div className="mt-10 p-6 bg-evara-cream border border-evara-gold/20">
          <p className="text-xs tracking-widest uppercase text-evara-gold mb-2">
            Follow Us
          </p>
          <p className="text-sm text-gray-600">
            Tag us on Instagram & TikTok{' '}
            <span className="font-semibold text-evara-black">@evaraintimates</span>
            {' '}to get featured!
          </p>
        </div>
      </div>
    </div>
  )
}
