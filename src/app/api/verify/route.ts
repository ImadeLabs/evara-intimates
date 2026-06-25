import { NextRequest, NextResponse } from 'next/server'
import { verifyTransaction } from '@/lib/paystack'

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference')

  if (!reference) {
    return NextResponse.json({ status: 'failed', error: 'No reference' }, { status: 400 })
  }

  try {
    const result = await verifyTransaction(reference)

    if (result.status && result.data.status === 'success') {
      return NextResponse.json({ status: 'success', data: result.data })
    }

    return NextResponse.json({ status: 'failed', message: result.message })
  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json({ status: 'failed', error: 'Verification failed' }, { status: 500 })
  }
}
