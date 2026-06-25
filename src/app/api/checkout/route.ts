import { NextRequest, NextResponse } from 'next/server'
import { initializeTransaction, generateReference } from '@/lib/paystack'

type LineItem = {
  id: string
  name: string
  price: number   // in kobo
  quantity: number
  image?: string
}

export async function POST(req: NextRequest) {
  try {
    const { items, email }: { items: LineItem[]; email?: string } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const reference = generateReference()

    // Total in kobo
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    const result = await initializeTransaction({
      email: email || 'customer@evaraintimates.com',
      amount: totalAmount,
      reference,
      callback_url: `${appUrl}/checkout/success?reference=${reference}`,
      metadata: {
        order_items: items.map((i) => ({ id: i.id, name: i.name, qty: i.quantity })),
        custom_fields: [
          {
            display_name: 'Order Reference',
            variable_name: 'order_reference',
            value: reference,
          },
        ],
      },
    })

    if (!result.status) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    return NextResponse.json({ url: result.data.authorization_url, reference })
  } catch (error) {
    console.error('Paystack checkout error:', error)
    return NextResponse.json({ error: 'Failed to initialize payment' }, { status: 500 })
  }
}
