# Evara Intimates & Beauty — Deployment Guide

## Quick Deploy to Vercel

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Stripe
1. Go to [stripe.com](https://stripe.com) → Create an account
2. Dashboard → Developers → API Keys
3. Copy your **Publishable key** and **Secret key**

### 3. Create `.env.local` (copy from `.env.example`)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 4. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

Or push to GitHub and connect via [vercel.com/new](https://vercel.com/new).

### 6. Set Vercel Environment Variables
In your Vercel project → Settings → Environment Variables:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL` (your Vercel URL)

### 7. Set up Stripe Webhook
1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://your-domain.vercel.app/api/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy the **Signing secret** → paste as `STRIPE_WEBHOOK_SECRET`

---

## Test Payments
Use Stripe test card: **4242 4242 4242 4242** · Any future date · Any CVC

## Project Structure
```
src/
├── app/
│   ├── page.tsx              ← Homepage
│   ├── shop/
│   │   ├── page.tsx          ← Shop catalog
│   │   └── [slug]/page.tsx   ← Product detail
│   ├── checkout/success/     ← Success page
│   └── api/
│       ├── checkout/route.ts ← Stripe checkout
│       └── webhook/route.ts  ← Stripe webhook
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── CartDrawer.tsx
├── lib/
│   ├── products.ts           ← Product data
│   └── stripe.ts             ← Stripe client
└── store/
    └── cart.ts               ← Zustand cart store
```

## Adding Real Products
Edit `src/lib/products.ts` to add/update products. For production, replace with a database (Supabase / Sanity CMS recommended).

## Custom Domain
Vercel → Settings → Domains → Add `evaraintimates.com`

---
*Built with Next.js 14 + Stripe + Tailwind CSS. Ready for Vercel deployment.*
