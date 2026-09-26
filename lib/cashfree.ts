// lib/cashfree.ts
//
// Client-side helper that talks to the two route handlers above and opens
// Cashfree's hosted checkout UI. Cashfree can't be opened purely
// client-side — it needs a payment_session_id minted by the backend first,
// since that step requires the secret key.

import { load, type Cashfree as CashfreeInstance } from '@cashfreepayments/cashfree-js'

// "sandbox" while testing, "production" once live. Safe to expose — it's
// not a secret, just a mode flag for the SDK. In Next.js, only variables
// prefixed NEXT_PUBLIC_ are available in client-side code.
const MODE =
  process.env.NEXT_PUBLIC_CASHFREE_MODE === 'production' ? 'production' : 'sandbox'

// Cache the SDK load so it only happens once per page, not on every
// checkout attempt.
let cashfreePromise: Promise<CashfreeInstance> | null = null
function getCashfree() {
  if (!cashfreePromise) {
    cashfreePromise = load({ mode: MODE })
  }
  return cashfreePromise
}

interface CreateOrderParams {
  amount: number
  name: string
  email: string
  phone: string
  description?: string
  note?: string
}

interface CreateOrderResult {
  orderId: string
  paymentSessionId: string
}

async function createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  const res = await fetch('/api/create-cashfree-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Could not start payment. Please try again.')
  }
  return res.json()
}

export async function verifyPayment(
  orderId: string
): Promise<{ status: string; amount: number }> {
  const res = await fetch(`/api/verify-cashfree-payment?order_id=${encodeURIComponent(orderId)}`)
  if (!res.ok) throw new Error('Could not verify payment status.')
  return res.json()
}

export async function openCashfreeCheckout({
  amount,
  name,
  email,
  phone,
  description,
  note,
  onSuccess,
  onFailure,
}: CreateOrderParams & {
  onSuccess: (orderId: string) => void
  onFailure: (message: string) => void
}) {
  try {
    const { orderId, paymentSessionId } = await createOrder({
      amount,
      name,
      email,
      phone,
      description,
      note,
    })
    const cashfree = await getCashfree()

    const result = await cashfree.checkout({
      paymentSessionId,
      redirectTarget: '_modal',
    })

    if (result.error) {
      // Covers both "user closed the popup" and an actual payment error —
      // Cashfree doesn't cleanly distinguish the two here.
      onFailure(result.error.message || 'Payment was not completed.')
      return
    }

    if (result.paymentDetails) {
      // The checkout UI finishing does NOT mean the payment succeeded —
      // always confirm the real outcome server-side.
      const verified = await verifyPayment(orderId)
      if (verified.status === 'PAID') {
        onSuccess(orderId)
      } else {
        onFailure(
          `Payment could not be confirmed (order ${orderId}). If money was deducted, it will be refunded automatically — otherwise, please try again.`
        )
      }
    }
  } catch (err) {
    onFailure(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
  }
}