const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!

export type PaystackInitResponse = {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export type PaystackVerifyResponse = {
  status: boolean
  message: string
  data: {
    status: string // 'success' | 'failed' | 'abandoned'
    reference: string
    amount: number
    customer: {
      email: string
      first_name: string
      last_name: string
    }
  }
}

export async function initializeTransaction({
  email,
  amount, // in kobo
  reference,
  metadata,
  callback_url,
}: {
  email: string
  amount: number
  reference: string
  metadata?: Record<string, unknown>
  callback_url: string
}): Promise<PaystackInitResponse> {
  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, amount, reference, metadata, callback_url }),
  })
  return res.json()
}

export async function verifyTransaction(reference: string): Promise<PaystackVerifyResponse> {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  })
  return res.json()
}

export function generateReference() {
  return `EVARA-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}
