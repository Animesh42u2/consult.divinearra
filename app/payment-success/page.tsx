'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const params = useSearchParams()
  const orderId = params.get('orderId') ?? ''
  const product = params.get('product') ?? 'your consultation'
  const amount = params.get('amount') ?? ''
  const name = params.get('name') ?? ''

  return (
    <div className="ps-page">
      <style>{`
        .ps-page {
          min-height: 100vh;
          background: #ffffff;
          font-family: 'Playfair Display', Georgia, serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(24px, 6vw, 60px);
        }
        .ps-card {
          max-width: 480px;
          width: 100%;
          background: #fffbf2;
          border: 1px solid rgba(196,122,30,0.25);
          border-radius: 20px;
          padding: clamp(28px, 5vw, 44px);
          text-align: center;
          box-shadow: 0 20px 50px -20px rgba(196,122,30,0.25);
        }
        .ps-check {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 32px;
          margin: 0 auto 20px;
        }
        .ps-title { font-size: clamp(22px, 5vw, 28px); font-weight: 700; color: #1a0a00; margin: 0 0 10px; }
        .ps-sub { font-family: sans-serif; font-size: 14px; color: #7a5030; line-height: 1.65; margin: 0 0 24px; }
        .ps-row { display: flex; justify-content: space-between; font-family: sans-serif; font-size: 13px; color: #7a5030; padding: 6px 0; border-bottom: 1px dashed rgba(196,122,30,0.2); }
        .ps-row span:last-child { color: #1a0a00; font-weight: 600; }
        .ps-details { margin-bottom: 24px; }
        .ps-home {
          display: inline-block;
          margin-top: 8px;
          padding: 12px 28px;
          background: linear-gradient(135deg, #7a2020, #5c1717);
          color: #fff5e8;
          border-radius: 10px;
          text-decoration: none;
          font-family: sans-serif;
          font-weight: 700;
          font-size: 14px;
        }
      `}</style>

      <div className="ps-card">
        <div className="ps-check">✓</div>
        <h1 className="ps-title">Booking Confirmed{name ? `, ${name}` : ''}!</h1>
        <p className="ps-sub">
          Thank you for booking {product}. We&apos;ll reach out on your WhatsApp number shortly
          to schedule your session.
        </p>

        <div className="ps-details">
          {orderId && (
            <div className="ps-row">
              <span>Order ID</span>
              <span>{orderId}</span>
            </div>
          )}
          {amount && (
            <div className="ps-row">
              <span>Amount Paid</span>
              <span>{amount}/-</span>
            </div>
          )}
        </div>

        <Link href="/" className="ps-home">Back to Home</Link>
      </div>
    </div>
  )
}

// useSearchParams() requires a Suspense boundary in the App Router,
// otherwise Next.js will fail the build.
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  )
}