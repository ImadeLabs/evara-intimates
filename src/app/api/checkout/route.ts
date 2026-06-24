import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

type LineItem = {
  id: string
  name: string
  price: number    // in kobo (NGN smallest unit)
  quantity: number
  image?: string
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: LineItem[] } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'ngn',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          // Stripe uses smallest currency unit (kobo for NGN)
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/shop`,
      shipping_address_collection: {
        allowed_countries: ['NG', 'GH', 'KE', 'ZA', 'GB', 'US'],
      },
      custom_text: {
        submit: {
          message: 'Evara will send your order confirmation by email.',
        },
      },
      metadata: {
        order_items: JSON.stringify(items.map((i) => ({ id: i.id, qty: i.quantity }))),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
