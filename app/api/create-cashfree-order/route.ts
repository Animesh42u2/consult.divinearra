// app/api/create-cashfree-order/route.ts
//
// Next.js Route Handler equivalent of a Vercel serverless function.
// Creates a Cashfree order server-side and returns the payment_session_id
// the client needs to open checkout — this must run server-side because it
// needs CASHFREE_SECRET_KEY, which should never reach the browser.
//
// Set these in your hosting platform's environment variables (Vercel
// project settings, etc.) — do NOT prefix with NEXT_PUBLIC_, or Next.js
// will bundle them into client-side JS:
//   CASHFREE_APP_ID
//   CASHFREE_SECRET_KEY
//   CASHFREE_ENV   = "sandbox" | "production"

import { NextRequest, NextResponse } from 'next/server'

const CASHFREE_ENV = process.env.CASHFREE_ENV === 'production' ? 'production' : 'sandbox'
const ORDERS_URL =
  CASHFREE_ENV === 'production'
    ? 'https://api.cashfree.com/pg/orders'
    : 'https://sandbox.cashfree.com/pg/orders'

interface CreateOrderBody {
  amount: number
  name: string
  email: string
  phone: string
  description?: string
  note?: string
}

export async function POST(request: NextRequest) {
  let body: CreateOrderBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { amount, name, email, phone, description, note } = body

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
  }
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Missing customer details' }, { status: 400 })
  }

  const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  // Cashfree requires customer_id to be alphanumeric/underscore/hyphen —
  // no spaces or symbols — so this can't just be the raw phone number.
  const customerId = `cust_${phone.replace(/\D/g, '').slice(-10)}_${Date.now()}`

  // request.nextUrl.origin gives the correct scheme+host automatically,
  // no need to read the Host header manually the way a plain Node
  // handler would.
  const origin = request.nextUrl.origin

  try {
    const cfRes = await fetch(ORDERS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID as string,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY as string,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        customer_details: {
          customer_id: customerId,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
        },
        order_meta: {
          // {order_id} is a required placeholder Cashfree substitutes
          // automatically — mainly used for redirect-based payment
          // methods (netbanking, UPI intent) that leave the page.
          return_url: `${origin}/payment-success?order_id={order_id}`,
        },
        order_note: (description ?? note ?? '').slice(0, 200),
      }),
    })

    const data = await cfRes.json()

    if (!cfRes.ok) {
      console.error('Cashfree create order failed:', data)
      return NextResponse.json(
        { error: data.message || 'Failed to create order' },
        { status: cfRes.status }
      )
    }

    return NextResponse.json({
      orderId: data.order_id as string,
      paymentSessionId: data.payment_session_id as string,
    })
  } catch (err) {
    console.error('Cashfree create order error:', err)
    return NextResponse.json(
      { error: 'Failed to create order. Please try again.' },
      { status: 500 }
    )
  }
}