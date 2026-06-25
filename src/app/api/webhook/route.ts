import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  // Verify webhook signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body)

  switch (event.event) {
    case 'charge.success': {
      const data = event.data
      console.log('✅ Payment successful:', data.reference)
      console.log('Customer:', data.customer.email)
      console.log('Amount:', data.amount / 100, 'NGN')

      // TODO:
      // 1. Save order to database (Supabase / MongoDB)
      // 2. Send confirmation email (Resend / Nodemailer)
      // 3. Update inventory
      // 4. Notify admin via WhatsApp

      break
    }
    case 'charge.failed': {
      console.log('❌ Payment failed:', event.data.reference)
      break
    }
  }

  return NextResponse.json({ received: true })
}
