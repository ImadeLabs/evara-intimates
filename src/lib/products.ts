export type Product = {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  category: 'lingerie' | 'perfume' | 'nightwear' | 'robe' | 'accessories'
  description: string
  shortDesc: string
  images: string[]
  sizes?: string[]
  isNew?: boolean
  isBestSeller?: boolean
  isLimitedDrop?: boolean
  stripePriceId?: string // set after creating in Stripe dashboard
}

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'lingerie', label: 'Lingerie Sets' },
  { id: 'perfume', label: 'Body Perfumes' },
  { id: 'nightwear', label: 'Nightwear' },
  { id: 'robe', label: 'Silk Robes' },
  { id: 'accessories', label: 'Accessories' },
]

export const products: Product[] = [
  // ── LINGERIE ────────────────────────────────────────────────────────────────
  {
    id: 'ling-001',
    name: 'Noir Lace Set',
    slug: 'noir-lace-set',
    price: 8900,
    category: 'lingerie',
    shortDesc: 'Delicate black lace bralette & brief set',
    description:
      'Our signature Noir Lace Set features intricate French lace, a plunge bralette with adjustable straps, and a matching high-waist brief. Designed to make you feel powerful and feminine.',
    images: [
      'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isBestSeller: true,
  },
  {
    id: 'ling-002',
    name: 'Rose Satin Set',
    slug: 'rose-satin-set',
    price: 9500,
    originalPrice: 12000,
    category: 'lingerie',
    shortDesc: 'Blush satin bralette with ruched brief',
    description:
      'Crafted from premium satin with a soft blush hue, this set features a delicate ruched brief and balconette bralette with gold hardware details — effortlessly feminine.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
  },
  {
    id: 'ling-003',
    name: 'Gold Dust Body Set',
    slug: 'gold-dust-body-set',
    price: 11500,
    category: 'lingerie',
    shortDesc: 'Luxe mesh bodysuit with gold detailing',
    description:
      'A statement bodysuit in sheer nude mesh with golden thread embroidery. Snap closure at base, adjustable straps, and fully lined. Limited edition drop.',
    images: [
      'https://images.unsplash.com/photo-1616091238212-c3e02a2ab0d3?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L'],
    isLimitedDrop: true,
  },

  // ── PERFUMES ────────────────────────────────────────────────────────────────
  {
    id: 'perf-001',
    name: 'Velvet Oud Mist',
    slug: 'velvet-oud-mist',
    price: 6500,
    category: 'perfume',
    shortDesc: 'Rich oud, amber & vanilla body mist',
    description:
      'A captivating blend of aged oud, warm amber, and creamy vanilla. Lasts up to 8 hours on skin. 150ml luxe glass bottle with gold pump.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
    ],
    isBestSeller: true,
  },
  {
    id: 'perf-002',
    name: 'Rose & Neroli Elixir',
    slug: 'rose-neroli-elixir',
    price: 7200,
    category: 'perfume',
    shortDesc: 'Fresh floral with rose petals & neroli',
    description:
      'A fresh, feminine fragrance opening with bright neroli and heart notes of Turkish rose. The dry-down settles into a soft musky base. 100ml.',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    ],
    isNew: true,
  },
  {
    id: 'perf-003',
    name: 'Midnight Jasmine Parfum',
    slug: 'midnight-jasmine-parfum',
    price: 9800,
    category: 'perfume',
    shortDesc: 'Intense jasmine, sandalwood & patchouli',
    description:
      'Our most concentrated fragrance — a sensual night-blooming jasmine layered over rich sandalwood and patchouli. 50ml eau de parfum, limited quantity.',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80',
    ],
    isLimitedDrop: true,
  },

  // ── NIGHTWEAR ───────────────────────────────────────────────────────────────
  {
    id: 'night-001',
    name: 'Silk Slip Dress',
    slug: 'silk-slip-dress',
    price: 14500,
    category: 'nightwear',
    shortDesc: 'Pure silk charmeuse slip — champagne',
    description:
      'Crafted from 100% silk charmeuse with bias-cut drape and delicate lace trim at the bust. Adjustable spaghetti straps. Champagne colorway.',
    images: [
      'https://images.unsplash.com/photo-1618085219724-c59ba48e08cd?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isBestSeller: true,
  },
  {
    id: 'night-002',
    name: 'Satin Pyjama Set',
    slug: 'satin-pyjama-set',
    price: 13200,
    category: 'nightwear',
    shortDesc: 'Classic button-up satin pyjama set',
    description:
      'A timeless satin pyjama set with a relaxed-fit shirt and wide-leg trousers. Pearl buttons, contrast piping, and chest pocket. Available in blush & ivory.',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
  },

  // ── SILK ROBES ──────────────────────────────────────────────────────────────
  {
    id: 'robe-001',
    name: 'Evara Silk Robe — Black',
    slug: 'evara-silk-robe-black',
    price: 18500,
    category: 'robe',
    shortDesc: 'Floor-length silk robe with gold monogram',
    description:
      'Our hero piece. A floor-length robe in 22-momme silk with a deep shawl collar, tie waist, and subtle gold monogram embroidery at the cuff. The ultimate luxury essential.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    ],
    sizes: ['S/M', 'L/XL'],
    isBestSeller: true,
  },
  {
    id: 'robe-002',
    name: 'Blush Satin Robe',
    slug: 'blush-satin-robe',
    price: 12800,
    category: 'robe',
    shortDesc: 'Short satin robe in blush pink',
    description:
      'A knee-length satin robe in our signature blush pink. Kimono-style sleeves, self-tie belt, and a delicate lace trim. Perfect as bridal or loungewear.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    ],
    sizes: ['S/M', 'L/XL'],
    isNew: true,
  },

  // ── ACCESSORIES ─────────────────────────────────────────────────────────────
  {
    id: 'acc-001',
    name: 'Satin Sleep Mask',
    slug: 'satin-sleep-mask',
    price: 2800,
    category: 'accessories',
    shortDesc: 'Padded satin sleep mask — blush & gold',
    description:
      'A plush padded sleep mask in blush satin with a gold elastic strap and Evara embossed logo. Includes a velvet drawstring pouch.',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
    ],
  },
  {
    id: 'acc-002',
    name: 'Perfume & Lingerie Bundle',
    slug: 'perfume-lingerie-bundle',
    price: 14900,
    originalPrice: 18400,
    category: 'accessories',
    shortDesc: 'Noir Lace Set + Velvet Oud Mist — save 19%',
    description:
      'Our most popular bundle: the Noir Lace Set paired with Velvet Oud Mist. Beautifully gift-boxed with a satin ribbon. Perfect for yourself or as a gift.',
    images: [
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    ],
    isBestSeller: true,
  },
]

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug)

export const getProductsByCategory = (category: string) =>
  category === 'all' ? products : products.filter((p) => p.category === category)

export const formatPrice = (priceInKobo: number) =>
  `₦${(priceInKobo / 100).toLocaleString('en-NG')}`
