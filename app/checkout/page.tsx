'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { openCashfreeCheckout } from '@/lib/cashfree'

// ── The single fixed consultation being sold on this page ──
// Adjust title/price/features/image to match your real offering.
const CONSULTATION = {
  title: 'Personal Vedic Consultation',
  tagline: 'A one-on-one session with our astrologer covering career, love, health, and life direction.',
  image: '/hero.png', // swap for a real consultation photo/graphic if you have one
  originalPrice: '₹2,499',
  discountedPrice: '₹750',
  features: [
    { label: '45-minute live video/audio session', included: true },
    { label: 'Personalized birth chart analysis', included: true },
    { label: 'Written summary after the call', included: true },
    { label: 'Follow-up questions via WhatsApp (7 days)', included: true },
    { label: 'Physical printed report', included: false },
  ],
}

// Parse "₹799" (or "799") → a plain rupee amount for Cashfree.
// Note: unlike Razorpay (paise, i.e. amount * 100), Cashfree's
// order_amount is the actual rupee value, decimals allowed.
function toRupees(priceStr: string): number {
  const digits = priceStr.replace(/[^\d.]/g, '')
  return parseFloat(digits)
}

type FormState = {
  name: string
  email: string
  whatsapp: string
  gender: string
  dob: string
  time: string
  place: string
  pincode: string
  language: string
}

const EMPTY_FORM: FormState = {
  name: '', email: '', whatsapp: '', gender: '',
  dob: '', time: '', place: '', pincode: '', language: '',
}

export default function CheckoutPage() {
  const router = useRouter()

  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paying, setPaying] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [placeSuggestions, setPlaceSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }))
      if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }))
    }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {}
    if (!form.name.trim())      e.name = 'Please enter your full name.'
    if (!form.email.trim())     e.email = 'Please enter your email address.'
    if (!form.whatsapp.trim())  e.whatsapp = 'Please enter your WhatsApp number.'
    if (!form.gender)           e.gender = 'Please select your gender.'
    if (!form.dob)              e.dob = 'Please enter your date of birth.'
    if (!form.time)             e.time = 'Please enter your time of birth.'
    if (!form.place.trim())     e.place = 'Please enter your birth place.'
    if (!form.pincode.trim())   e.pincode = 'Please enter your pin code.'
    if (!form.language)         e.language = 'Please select a preferred language.'
    return e
  }

  async function handlePlaceInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setForm((p) => ({ ...p, place: value }))
    if (value.length < 3) { setPlaceSuggestions([]); setShowSuggestions(false); return }
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&addressdetails=1`
    )
    const data = await res.json()
    setPlaceSuggestions(data.map((item: { display_name: string }) => item.display_name))
    setShowSuggestions(true)
  }

  // Birth details aren't sent to Cashfree the way they might be stuffed
  // into a generic "notes" object — Cashfree's order_note is capped at
  // 200 characters. The short summary below goes to Cashfree for your own
  // reference in their dashboard; if you need the full form tied to each
  // order, log it to your own store (a sheet, a database) keyed by the
  // orderId returned from create-cashfree-order, at the point this
  // function is called.
  async function handlePayment() {
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }

    setPaying(true)
    setErrorMsg('')

    await openCashfreeCheckout({
      amount:      toRupees(CONSULTATION.discountedPrice),
      name:        form.name,
      email:       form.email,
      phone:       form.whatsapp,
      description: CONSULTATION.title,
      note:        `DOB:${form.dob} | Time:${form.time} | Place:${form.place} | Lang:${form.language}`,

      onSuccess(orderId) {
        setPaying(false)
        router.push(
          `/payment-success?orderId=${encodeURIComponent(orderId)}&product=${encodeURIComponent(CONSULTATION.title)}&amount=${encodeURIComponent(CONSULTATION.discountedPrice)}&name=${encodeURIComponent(form.name)}&whatsapp=${encodeURIComponent(form.whatsapp)}`
        )
      },

      onFailure(message) {
        setPaying(false)
        setErrorMsg(message)
      },
    })
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .co-page {
          background: #ffffff;
          min-height: 100vh;
          font-family: 'Playfair Display', Georgia, serif;
        }

        .co-hero {
          background: #ffffff;
          padding: clamp(32px, 5vw, 56px) clamp(20px, 6%, 80px);
          text-align: center;
        }
        .co-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #a06010;
          text-transform: uppercase;
          background: rgba(196,122,30,0.1);
          border: 1px solid rgba(196,122,30,0.3);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 16px;
        }
        .co-hero-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c47a1e;
          display: inline-block;
        }
        .co-hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(28px, 5.5vw, 52px);
          font-weight: 700;
          color: #1a0a00;
          margin: 0;
          line-height: 1.25;
        }
        .co-hero h1 span { color: #b86010; }

        .co-trust-bar {
          background: #fff;
          padding: 8px clamp(16px,5%,80px);
          display: flex;
          justify-content: center;
          gap: clamp(12px,3vw,32px);
          flex-wrap: wrap;
        }
        .co-trust-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: sans-serif;
          font-size: 13px;
          color: #7a5030;
          font-weight: 600;
        }

        .co-inner {
          max-width: 1060px;
          margin: 0 auto;
          padding: clamp(28px, 5vw, 56px) clamp(16px, 5%, 40px);
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 800px) { .co-inner { grid-template-columns: 1fr; } }

        .co-plan-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid rgba(196,122,30,0.2);
          box-shadow: 0 1px 0 rgba(196,122,30,0.1), 0 8px 32px rgba(196,122,30,0.08);
          overflow: hidden;
          position: sticky;
          top: 24px;
        }
        @media (max-width: 800px) { .co-plan-card { position: static; } }

        .co-plan-img {
          background: linear-gradient(160deg, #fff3d6 0%, #f5d990 100%);
          height: 210px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .co-plan-img img {
          height: 100%; max-height: 170px; object-fit: contain;
          filter: drop-shadow(0 6px 20px rgba(100,50,0,0.2));
        }
        .co-plan-body { padding: 22px 22px 24px; }
        .co-plan-name { font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 700; color: #1a0a00; margin: 0 0 5px; }
        .co-plan-tagline { font-family: sans-serif; font-size: 12.5px; color: #9a7050; margin: 0 0 16px; line-height: 1.55; }
        .co-price-box {
          background: linear-gradient(135deg, #fff8e8, #fdeabb);
          border: 1px solid rgba(196,122,30,0.25);
          border-radius: 12px; padding: 14px 16px; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 8px 12px;
        }
        .co-price-orig { font-family: sans-serif; font-size: 12px; color: #b09070; text-decoration: line-through; }
        .co-price-disc { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(21px, 5vw, 26px); font-weight: 700; color: #b86010; }
        .co-price-save {
          font-family: sans-serif; font-size: 10px; font-weight: 700;
          background: rgba(196,122,30,0.15); color: #a06010;
          padding: 3px 10px; border-radius: 100px; letter-spacing: 0.5px;
          border: 1px solid rgba(196,122,30,0.2);
        }
        .co-features-title { font-family: sans-serif; font-size: 10px; font-weight: 800; color: #c47a1e; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; }
        .co-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .co-feature-item { font-family: sans-serif; font-size: 13px; color: #4a2a0a; display: flex; align-items: center; gap: 10px; line-height: 1.4; }
        .co-feature-item.off { color: #c0a080; text-decoration: line-through; }
        .co-feature-dot { width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 10px; }
        .co-feature-dot.on  { background: rgba(196,122,30,0.12); color: #c47a1e; }
        .co-feature-dot.off { background: rgba(0,0,0,0.05); color: #c0a080; }
        .co-plan-divider { height: 1px; background: rgba(196,122,30,0.12); margin: 20px 0; }
        .co-secure-note { display: flex; align-items: center; gap: 7px; font-family: sans-serif; font-size: 11.5px; color: #9a7050; }

        .co-form-card {
          background: #fff; border-radius: 20px;
          border: 1px solid rgba(196,122,30,0.15);
          box-shadow: 0 1px 0 rgba(196,122,30,0.08), 0 8px 32px rgba(196,122,30,0.06);
          padding: clamp(24px, 4vw, 40px);
        }
        .co-form-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
        .co-form-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(19px, 4.5vw, 24px); font-weight: 700; color: #1a0a00; margin: 0 0 5px; }
        .co-form-sub { font-family: sans-serif; font-size: 13px; color: #9a7050; margin: 0; line-height: 1.55; }
        .co-step-badge {
          flex-shrink: 0; background: #fff8e8; color: #a06010;
          border: 1px solid rgba(196,122,30,0.3);
          font-family: sans-serif; font-size: 11px; font-weight: 700;
          padding: 6px 14px; border-radius: 100px; white-space: nowrap; letter-spacing: 0.5px;
        }
        .co-section-label {
          font-family: sans-serif; font-size: 10px; font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase; color: #c47a1e;
          margin: 0 0 16px; display: flex; align-items: center; gap: 8px;
        }
        .co-section-label::after { content: ''; flex: 1; height: 1px; background: rgba(196,122,30,0.15); }
        .co-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 20px; margin-bottom: 24px; }
        @media (max-width: 540px) { .co-form-grid { grid-template-columns: 1fr; } }
        .co-field { display: flex; flex-direction: column; gap: 7px; }
        .co-field.span-2 { grid-column: span 2; }
        @media (max-width: 540px) { .co-field.span-2 { grid-column: span 1; } }
        .co-label { font-family: sans-serif; font-size: 11px; font-weight: 700; color: #8a6030; text-transform: uppercase; letter-spacing: 0.8px; }
        .co-label span { color: #c47a1e; margin-left: 1px; }
        .co-input {
          padding: 11px 14px; border: 1.5px solid #e4cfa8; border-radius: 10px;
          font-size: 14px; color: #1a0a00; background: #fffcf7; outline: none;
          font-family: sans-serif; transition: border-color 0.18s, box-shadow 0.18s; width: 100%;
        }
        .co-input::placeholder { color: #c0a07080; }
        .co-input:hover  { border-color: #d4a860; }
        .co-input:focus  { border-color: #c47a1e; box-shadow: 0 0 0 3px rgba(196,122,30,0.1); background: #fff; }

        .co-summary {
          background: #fffbf2; border: 1px solid rgba(196,122,30,0.2);
          border-radius: 14px; padding: 16px 18px; margin-bottom: 18px;
        }
        .co-summary-row { display: flex; justify-content: space-between; align-items: center; font-family: sans-serif; font-size: 15px; color: #7a5030; padding: 5px 0; }
        .co-summary-row.total { border-top: 1px dashed rgba(196,122,30,0.25); margin-top: 8px; padding-top: 12px; }
        .co-summary-row.total span:first-child { font-weight: 700; font-size: 16px; color: #1a0a00; }
        .co-summary-row.total span:last-child  { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(20px, 5vw, 26px); font-weight: 700; color: #b86010; }

        .co-terms { font-family: sans-serif; font-size: 12px; color: #9a7050; margin-bottom: 18px; line-height: 1.65; text-align: center; }
        .co-terms a { color: #c47a1e; text-decoration: underline; text-underline-offset: 2px; }

        .co-error {
          display: flex; align-items: center; gap: 8px;
          background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;
          border-radius: 10px; padding: 10px 14px; margin-bottom: 18px;
          font-family: sans-serif; font-size: 13px;
        }

        .co-pay-btn {
          position: relative;
          overflow: hidden;
          width: clamp(220px, 55%, 420px);
          max-width: 100%;
          margin: 0 auto;
          display: flex;
          padding: clamp(14px, 3vw, 17px) clamp(18px, 4vw, 24px);
          background: linear-gradient(135deg, #7a2020, #5c1717);
          color: #fff5e8; border: none; border-radius: 14px;
          font-family: 'Playfair Display', Georgia, serif; font-size: clamp(16px, 4.2vw, 21px); font-weight: 800;
          cursor: pointer; letter-spacing: 0.02em;
          transition: opacity 0.18s, transform 0.15s;
          align-items: center; justify-content: center; gap: 10px;
          white-space: nowrap;
        }
        .co-pay-btn:hover:not(:disabled)  { opacity: 0.92; transform: translateY(-2px); }
        .co-pay-btn:active:not(:disabled) { transform: translateY(0); }
        .co-pay-btn:disabled { opacity: 0.65; cursor: not-allowed; }
        .co-pay-btn:disabled .co-pay-btn-shine { animation-play-state: paused; }

        .co-pay-btn-shine {
          position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-20deg);
          animation: coPayShine 2.8s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes coPayShine {
          0%   { left: -75%; }
          50%  { left: 125%; }
          100% { left: 125%; }
        }

        @keyframes co-spin { to { transform: rotate(360deg); } }
        .co-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: co-spin 0.7s linear infinite; flex-shrink: 0;
        }
        .co-form-divider { height: 1px; background: rgba(196,122,30,0.12); margin: 24px 0; }

        @media (max-width: 640px) {
          .co-plan-body { padding: 18px 18px 20px; }
          .co-form-card { padding: clamp(20px, 5vw, 28px); }
          .co-plan-img { height: 180px; }
        }
        @media (max-width: 540px) {
          /* iOS Safari auto-zooms on focus if an input's font-size is
             below 16px — bump to 16px on mobile without affecting desktop. */
          .co-input { font-size: 16px; }
          .co-pay-btn { width: 100%; }
        }
        @media (max-width: 380px) {
          .co-hero-eyebrow { font-size: 9px; padding: 4px 12px; letter-spacing: 3px; }
          .co-plan-body { padding: 16px 14px 18px; }
          .co-form-card { padding: 18px 14px; }
          .co-trust-bar { gap: 10px 16px; }
          .co-trust-item { font-size: 12px; }
        }
      `}</style>

      <div className="co-page">
        <div className="co-hero">
          <div className="co-hero-eyebrow">Secure Checkout</div>
          <h1>Book Your <span>{CONSULTATION.title}</span></h1>
        </div>

        <div className="co-trust-bar">
          {[
            { icon: '🔒', label: '100% Secure Payment' },
            { icon: '📜', label: 'Vedic Astrology Experts' },
            { icon: '⚡', label: 'Fast Scheduling' },
            { icon: '✅', label: 'Satisfaction Guaranteed' },
          ].map((t) => (
            <div className="co-trust-item" key={t.label}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>
              {t.label}
            </div>
          ))}
        </div>

        <div className="co-inner">
          {/* ── LEFT: Plan Card ── */}
          <div className="co-plan-card">
            <div className="co-plan-img">
              <img src={CONSULTATION.image} alt={CONSULTATION.title} />
            </div>
            <div className="co-plan-body">
              <h3 className="co-plan-name">{CONSULTATION.title}</h3>
              <p className="co-plan-tagline">{CONSULTATION.tagline}</p>
              <div className="co-price-box">
                <div>
                  <div className="co-price-orig">{CONSULTATION.originalPrice}</div>
                  <div className="co-price-disc">{CONSULTATION.discountedPrice}/-</div>
                </div>
                <div className="co-price-save">Limited Offer</div>
              </div>
              <p className="co-features-title">What&apos;s Included</p>
              <ul className="co-features">
                {CONSULTATION.features.map((f) => (
                  <li key={f.label} className={`co-feature-item${f.included ? '' : ' off'}`}>
                    <span className={`co-feature-dot ${f.included ? 'on' : 'off'}`}>
                      {f.included ? '✓' : '✕'}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>
              <div className="co-plan-divider" />
              <div className="co-secure-note">
                <span>🔒</span>
                <span>Payments are 100% secure &amp; encrypted</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Form ── */}
          <div className="co-form-card">
            <div className="co-form-header">
              <div>
                <h2 className="co-form-title">Enter Your Details</h2>
                <p className="co-form-sub">
                  Fill in your details and birth information — we&apos;ll schedule your session on WhatsApp.
                </p>
              </div>
              <div className="co-step-badge">Step 1 of 2</div>
            </div>

            {errorMsg && (
              <div className="co-error">⚠️ {errorMsg}</div>
            )}

            <p className="co-section-label">Personal Information</p>
            <div className="co-form-grid">
              <div className="co-field">
                <label className="co-label">Full Name <span>*</span></label>
                <input className="co-input" type="text" placeholder="Your full name" value={form.name} onChange={set('name')} />
                {errors.name && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.name}</p>}
              </div>
              <div className="co-field">
                <label className="co-label">Email Address <span>*</span></label>
                <input className="co-input" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} />
                {errors.email && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.email}</p>}
              </div>
              <div className="co-field">
                <label className="co-label">WhatsApp Number <span>*</span></label>
                <input className="co-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.whatsapp} onChange={set('whatsapp')} />
                {errors.whatsapp && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.whatsapp}</p>}
              </div>
              <div className="co-field">
                <label className="co-label">Gender <span>*</span></label>
                <select className="co-input" value={form.gender} onChange={set('gender')}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.gender}</p>}
              </div>
            </div>

            <p className="co-section-label">Birth Details</p>
            <div className="co-form-grid">
              <div className="co-field">
                <label className="co-label">Date of Birth <span>*</span></label>
                <input className="co-input" type="date" value={form.dob} onChange={set('dob')} />
                {errors.dob && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.dob}</p>}
              </div>
              <div className="co-field">
                <label className="co-label">Time of Birth <span>*</span></label>
                <input className="co-input" type="time" value={form.time} onChange={set('time')} />
                {errors.time && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.time}</p>}
              </div>
              <div className="co-field" style={{ position: 'relative' }}>
                <label className="co-label">Birth Place <span>*</span></label>
                <input
                  className="co-input"
                  type="text"
                  placeholder="City, State"
                  value={form.place}
                  onChange={handlePlaceInput}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  autoComplete="off"
                />
                {errors.place && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.place}</p>}
                {showSuggestions && placeSuggestions.length > 0 && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: '#fff', border: '1.5px solid #e4cfa8',
                    borderRadius: 10, zIndex: 100, marginTop: 4,
                    boxShadow: '0 8px 24px rgba(196,122,30,0.15)',
                    overflow: 'hidden',
                  }}>
                    {placeSuggestions.map((s, i) => (
                      <div
                        key={i}
                        onMouseDown={() => {
                          setForm((p) => ({ ...p, place: s }))
                          setShowSuggestions(false)
                        }}
                        style={{
                          padding: '10px 14px', fontSize: 13, color: '#4a2a0a',
                          cursor: 'pointer',
                          borderBottom: i < placeSuggestions.length - 1 ? '1px solid #f0e0c8' : 'none',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#fff8ee')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="co-field">
                <label className="co-label">Pin Code <span>*</span></label>
                <input className="co-input" type="text" placeholder="Your pin code" value={form.pincode} onChange={set('pincode')} />
                {errors.pincode && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.pincode}</p>}
              </div>
              <div className="co-field span-2">
                <label className="co-label">Preferred Language <span>*</span></label>
                <select className="co-input" value={form.language} onChange={set('language')}>
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
                {errors.language && <p style={{ color: '#d94040', fontSize: '0.78rem', margin: 0 }}>{errors.language}</p>}
              </div>
            </div>

            <div className="co-form-divider" />

            <div className="co-summary">
              <div className="co-summary-row">
                <span>{CONSULTATION.title}</span>
                <span>{CONSULTATION.originalPrice}</span>
              </div>
              <div className="co-summary-row" style={{ color: '#4a8a4a' }}>
                <span>Discount Applied</span>
                <span>Limited Offer</span>
              </div>
              <div className="co-summary-row total">
                <span>Total (Incl. GST)</span>
                <span>{CONSULTATION.discountedPrice}/-</span>
              </div>
            </div>

            <p className="co-terms">
              By proceeding, you agree to our{' '}
              <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>.
            </p>

            <button className="co-pay-btn" onClick={handlePayment} disabled={paying}>
              <span className="co-pay-btn-shine" />
              {paying ? (
                <><span className="co-spinner" /> Processing Payment…</>
              ) : (
                <>Book Now</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}