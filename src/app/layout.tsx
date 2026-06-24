import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'Evara Intimates & Beauty | Luxe Femme Collection',
  description:
    'Discover premium lingerie sets, body perfumes, silk robes, and nightwear. Evara Intimates — where luxury meets femininity.',
  keywords: 'luxury lingerie, body perfume, silk robe, nightwear, intimate wear, Nigeria',
  openGraph: {
    title: 'Evara Intimates & Beauty',
    description: 'Luxury lingerie, silk robes & body perfumes.',
    type: 'website',
    locale: 'en_NG',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
