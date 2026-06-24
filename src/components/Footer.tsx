import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'
import { NewsletterFormVertical } from '@/components/NewsletterForm'

export function Footer() {
  return (
    <footer className="bg-evara-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-3xl tracking-[0.15em] mb-2">EVARA</p>
            <p className="text-[10px] tracking-[0.4em] uppercase text-evara-gold mb-4">
              Intimates & Beauty
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Luxury lingerie, silk robes & body perfumes — crafted for the modern woman.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-evara-gold transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-evara-gold transition-colors"
              >
                {/* TikTok icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-evara-gold transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-evara-gold mb-6">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'Lingerie Sets', 'Body Perfumes', 'Nightwear', 'Silk Robes', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link
                    href="/shop"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-evara-gold mb-6">Help</h4>
            <ul className="space-y-3">
              {['Sizing Guide', 'Shipping & Delivery', 'Returns Policy', 'FAQs', 'Contact Us', 'Wholesale'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-evara-gold mb-6">
              Join the Inner Circle
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              Get early access to limited drops, exclusive offers & style inspo.
            </p>
            <NewsletterFormVertical />
            <p className="text-xs text-gray-600 mt-3">
              WhatsApp us: <a href="https://wa.me/2348000000000" className="text-evara-gold hover:underline">+234 800 000 0000</a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Evara Intimates & Beauty. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400">Terms of Service</a>
            {/* Payment icons */}
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-xs">Secured by</span>
              <span className="text-xs font-bold text-evara-gold">Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
