/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { openCashfreeCheckout } from '@/lib/cashfree'

// ── Offer config ──
const CONSULTATION = {
  title: '1-On-1 Personalized Consultation',
  badge: '30-Minute Session',
  originalPrice: '₹2,499',
  discountedPrice: '₹750',
  includes: [
    '30-Minute 1-On-1 Consultation',
    'Personalized Kundali Analysis',
    'Question-Based Guidance',
    'Relevant Dasha & Planetary Insights',
    'Practical Remedies (Where Appropriate)',
    'Free Personalized Kundali Report',
  ],
  bonuses: [
    { title: 'Personalized Kundali Report', desc: 'A detailed report based on your birth chart.', price: '₹799', img: '/bonus-kundali-report.webp' },
    { title: 'Varshphal Report 2026', desc: 'Your personalized yearly forecast.', price: '₹599', img: '/bonus-varshphal-2026.webp' },
    { title: 'Personalized Remedy Guidance', desc: 'Simple and effective remedies where relevant.', price: '₹399', img: '/bonus-remedy-guidance.webp' },
  ],
}

// Cashfree's order_amount is in rupees (not paise).
const toRupees = (p: string) => parseFloat(p.replace(/[^\d.]/g, ''))

type FormState = {
  name: string; email: string; countryCode: string; whatsapp: string
  dob: string; time: string; place: string; concern: string
}
const EMPTY: FormState = {
  name: '', email: '', countryCode: '+91', whatsapp: '',
  dob: '', time: '', place: '', concern: '',
}
const MAX_CONCERN = 500

const Icon = ({ d }: { d: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a1c1c" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
)
const Err = ({ message }: { message?: string }) => (message ? <p className="ck-err">{message}</p> : null)
const UpiLogo = () => (
  <svg width="46" height="20" viewBox="0 0 46 20" role="img" aria-label="UPI">
    <text x="0" y="15" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="800" fontStyle="italic" fill="#3b3b3b">UPI</text>
    <polygon points="33,3 37,3 42,10 38,10" fill="#f47920" />
    <polygon points="38,10 42,10 37,17 33,17" fill="#097939" />
  </svg>
)
const VisaLogo = () => (
  <svg width="48" height="20" viewBox="0 0 48 20" role="img" aria-label="Visa">
    <text x="1" y="16" fontFamily="Arial Black, Arial, sans-serif" fontSize="18" fontWeight="900" fontStyle="italic" letterSpacing="-0.5" fill="#1a1f71">VISA</text>
  </svg>
)
const MastercardLogo = () => (
  <svg width="40" height="26" viewBox="0 0 40 26" role="img" aria-label="Mastercard">
    <defs><clipPath id="mc-red"><circle cx="15" cy="13" r="10" /></clipPath></defs>
    <circle cx="15" cy="13" r="10" fill="#eb001b" />
    <circle cx="25" cy="13" r="10" fill="#f79e1b" />
    <circle cx="25" cy="13" r="10" fill="#ff5f00" clipPath="url(#mc-red)" />
  </svg>
)
const RupayLogo = () => (
  <svg width="56" height="20" viewBox="0 0 56 20" role="img" aria-label="RuPay">
    <text x="0" y="15" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="800" fontStyle="italic">
      <tspan fill="#1b4a9c">Ru</tspan><tspan fill="#f58220">Pay</tspan>
    </text>
    <polygon points="46,3 49,3 54,10 51,10" fill="#f58220" />
    <polygon points="51,10 54,10 49,17 46,17" fill="#0a8a3c" />
  </svg>
)
const ICONS = {
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  phone: 'M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z',
  cal: 'M5 5h14v15H5zM5 10h14M9 3v4M15 3v4',
  clock: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  chat: 'M4 5h16v11H9l-5 4zM8 9h8M8 12h5',
  shield: 'M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  card: 'M3 6h18v12H3zM3 10h18',
}

export default function CheckoutPage() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [paying, setPaying] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }))
      if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }))
    }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = 'Please enter a valid email address.'
    if (form.whatsapp.replace(/\D/g, '').length < 10) e.whatsapp = 'Please enter a valid WhatsApp number.'
    if (!form.dob) e.dob = 'Please enter your date of birth.'
    if (!form.time) e.time = 'Please enter your time of birth.'
    if (!form.place.trim()) e.place = 'Please enter your place of birth.'
    if (!form.concern.trim()) e.concern = 'Please tell us what you would like to discuss.'
    return e
  }

  async function handlePlaceInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setForm((p) => ({ ...p, place: value }))
    if (errors.place) setErrors((er) => ({ ...er, place: '' }))
    if (value.length < 3) { setSuggestions([]); setShowSuggestions(false); return }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(value)}&format=json&limit=5&addressdetails=1`
      )
      const data = await res.json()
      setSuggestions(data.map((i: { display_name: string }) => i.display_name))
      setShowSuggestions(true)
    } catch { setShowSuggestions(false) }
  }

  // Cashfree order_note is capped at 200 chars, so keep it short.
  // Log the full form to your own store keyed by orderId if you need it.
  async function handlePayment() {
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setPaying(true)
    setErrorMsg('')
    const phone = `${form.countryCode}${form.whatsapp.replace(/\D/g, '')}`

    await openCashfreeCheckout({
      amount: toRupees(CONSULTATION.discountedPrice),
      name: form.name,
      email: form.email,
      phone,
      description: CONSULTATION.title,
      note: `DOB:${form.dob} | Time:${form.time} | Place:${form.place} | Q:${form.concern}`.slice(0, 200),

      onSuccess(orderId) {
        setPaying(false)
        router.push(
          `/payment-success?orderId=${encodeURIComponent(orderId)}&product=${encodeURIComponent(CONSULTATION.title)}&amount=${encodeURIComponent(CONSULTATION.discountedPrice)}&name=${encodeURIComponent(form.name)}&whatsapp=${encodeURIComponent(phone)}`
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
        img, svg { max-width:100%; }
        .ck { --maroon:#7a1414; --maroon-d:#4e0b0b; --gold:#e9b23c; --ink:#2a1208; --muted:#7a5d48;
          --line:rgba(196,140,50,.25); --cream:#fffaf0;
          min-height:100vh; color:var(--ink); font-family: sans-serif;
          background: radial-gradient(1200px 500px at 50% -100px, #fff3d6 0%, transparent 70%), #fdf6e7; position:relative; overflow-x:hidden; }
        .ck h1,.ck h2,.ck h3,.ck .serif { font-family:'Playfair Display', Georgia, serif; }

        /* Header */
        .ck-head { position:relative; text-align:center; padding:28px 20px 26px; border-bottom:1px solid var(--line); overflow:hidden; }
        .ck-back { position:absolute; left:clamp(12px,4vw,44px); top:26px; z-index:3; display:inline-flex; align-items:center; gap:8px;
          background:#fffdf7; border:1px solid var(--line); border-radius:100px; padding:9px 18px; font-size:14px; font-weight:600; color:var(--ink); text-decoration:none; }
        .ck-deco { position:absolute; top:0; height:100%; width:min(44%,540px); object-fit:cover; pointer-events:none; mix-blend-mode:multiply; z-index:0; }
        .ck-deco.l { left:0; object-position:left center;
          -webkit-mask-image:linear-gradient(to right,#000 45%,transparent 100%); mask-image:linear-gradient(to right,#000 45%,transparent 100%); }
        .ck-deco.r { right:0; object-position:right center;
          -webkit-mask-image:linear-gradient(to left,#000 45%,transparent 100%); mask-image:linear-gradient(to left,#000 45%,transparent 100%); }
        .ck-steps { position:relative; z-index:2; display:flex; align-items:flex-start; justify-content:center; gap:0; margin:0 auto 18px; max-width:420px; }
        .ck-step { display:flex; flex-direction:column; align-items:center; gap:6px; font-size:13px; color:var(--muted); width:90px; text-align:center; }
        .ck-step b { width:34px; height:34px; border-radius:50%; display:grid; place-items:center; font-size:15px; border:2px solid var(--gold); background:#fff; color:var(--ink); }
        .ck-step.on b { background:var(--gold); color:#3a1a00; }
        .ck-step-line { flex:1; height:2px; background:var(--gold); margin-top:17px; opacity:.5; }
        .ck-head h1 { position:relative; z-index:2; margin:0 0 8px; font-size:clamp(28px,6vw,50px); font-weight:700; line-height:1.15; }
        .ck-head h1 em { font-style:normal; color:var(--maroon); }
        .ck-sub { position:relative; z-index:2; margin:0 0 20px; font-size:clamp(14px,2.4vw,17px); color:#4a3020; }
        .ck-assure { position:relative; z-index:2; display:flex; justify-content:center; flex-wrap:wrap; gap:14px 34px; }
        .ck-assure div { display:flex; align-items:center; gap:10px; text-align:left; font-size:12.5px; color:var(--muted); line-height:1.35; }
        .ck-assure strong { display:block; font-size:14px; color:var(--ink); }
        .ck-ico { width:44px; height:44px; flex-shrink:0; border-radius:50%; background:#fff3d3; border:1px solid var(--line); display:grid; place-items:center; }

        /* Layout */
        .ck-main { max-width:1120px; margin:0 auto; padding:26px clamp(14px,3vw,30px) 50px; display:grid;
          grid-template-columns:minmax(0,1fr) clamp(300px,34vw,380px); gap:26px; align-items:start; }
        .ck-card { background:var(--cream); border:1px solid var(--line); border-radius:20px; padding:clamp(16px,3vw,30px); box-shadow:0 10px 30px rgba(120,70,10,.07); min-width:0; }
        .ck-sec { display:flex; gap:14px; align-items:center; margin-bottom:20px; }
        .ck-num { width:40px; height:40px; flex-shrink:0; border-radius:50%; background:radial-gradient(circle at 35% 30%, #a42222, #6d1010); color:#fff; display:grid; place-items:center; font-weight:700; font-size:18px; }
        .ck-sec h2 { margin:0; font-size:clamp(19px,3.6vw,26px); color:#4a0e0e; line-height:1.2; }
        .ck-sec p { margin:2px 0 0; font-size:13.5px; color:var(--muted); }

        /* Fields — label is 20px tall + 6px gap, so icon margin-top:26px lines up with the input */
        .ck-row { display:flex; gap:14px; align-items:flex-start; margin-bottom:16px; }
        .ck-row > .ck-ico { border-radius:12px; margin-top:26px; width:48px; height:48px; }
        .ck-row.two { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .ck-row.two .ck-row { margin:0; min-width:0; }
        .ck-f { flex:1; min-width:0; display:flex; flex-direction:column; gap:6px; position:relative; }
        .ck-lab { font-size:14px; font-weight:600; color:#3a1c0c; line-height:20px; }
        .ck-lab i { color:#b01818; font-style:normal; }
        .ck-in { width:100%; min-width:0; min-height:48px; padding:12px 14px; border:1.5px solid #ead9b8; border-radius:10px; background:#fffdf8; font-size:14.5px; color:var(--ink); font-family:inherit; outline:none; transition:border-color .15s, box-shadow .15s; }
        .ck-in::placeholder { color:#b9a48a; }
        .ck-in:focus { border-color:#c98a1c; box-shadow:0 0 0 3px rgba(233,178,60,.2); background:#fff; }
        textarea.ck-in { min-height:110px; resize:vertical; line-height:1.5; }
        .ck-wa { display:flex; gap:8px; }
        .ck-wa select { width:86px; flex-shrink:0; }
        .ck-count { text-align:right; font-size:12px; color:#a89070; margin-top:-2px; }
        .ck-err { margin:0; font-size:12.5px; color:#c02a2a; }
        .ck-sug { position:absolute; top:100%; left:0; right:0; margin-top:4px; background:#fff; border:1.5px solid #ead9b8; border-radius:10px; z-index:50; overflow:hidden; box-shadow:0 10px 26px rgba(120,70,10,.15); }
        .ck-sug div { padding:10px 14px; font-size:13px; cursor:pointer; border-bottom:1px solid #f3e7d0; overflow-wrap:anywhere; }
        .ck-sug div:last-child { border-bottom:none; }
        .ck-sug div:hover { background:#fff6e3; }

        /* Payment method */
        .ck-pay-sec { margin-top:30px; }
        .ck-method { display:flex; align-items:center; gap:14px; flex-wrap:wrap; padding:14px 16px; border:1.5px solid var(--gold); border-radius:12px; background:#fffbee; }
        .ck-radio { width:22px; height:22px; border-radius:50%; border:2px solid var(--gold); display:grid; place-items:center; flex-shrink:0; }
        .ck-radio::after { content:''; width:11px; height:11px; border-radius:50%; background:var(--gold); }
        .ck-method strong { font-size:19px; }
        .ck-method small { display:block; font-size:12px; color:var(--muted); }
        .ck-chips { margin-left:auto; display:flex; gap:8px; flex-wrap:wrap; }
        .ck-chips span { display:flex; align-items:center; justify-content:center; height:38px; min-width:60px; padding:0 10px; border:1px solid #ead9b8; background:#fff; border-radius:8px; }

        .ck-error { background:#fef2f2; border:1px solid #fecaca; color:#b91c1c; border-radius:10px; padding:10px 14px; margin:16px 0 0; font-size:13.5px; }
        .ck-terms { margin:16px 0 0; text-align:center; font-size:12.5px; color:var(--muted); line-height:1.6; }
        .ck-terms a { color:var(--maroon); text-decoration:underline; text-underline-offset:2px; }
        .ck-btn { position:relative; overflow:hidden; margin-top:14px; width:100%; display:flex; align-items:center; justify-content:center; gap:10px;
          padding:18px 20px; border:none; border-radius:12px; cursor:pointer; color:#fff5e6; font-size:clamp(18px,4vw,23px); font-weight:700;
          font-family:'Playfair Display', Georgia, serif; background:linear-gradient(180deg,#9a1c1c,#640f0f); box-shadow:0 8px 20px rgba(110,15,15,.3); transition:transform .15s, opacity .15s; }
        .ck-btn:hover:not(:disabled){ transform:translateY(-2px); }
        .ck-btn:disabled { opacity:.7; cursor:not-allowed; }
        .ck-btn:focus-visible, .ck-back:focus-visible { outline:3px solid var(--gold); outline-offset:2px; }
        .ck-spin { width:20px; height:20px; border:2px solid rgba(255,255,255,.35); border-top-color:#fff; border-radius:50%; animation:ck-spin .7s linear infinite; }
        @keyframes ck-spin { to { transform:rotate(360deg); } }
        @media (prefers-reduced-motion: reduce){ .ck-spin{ animation-duration:2s; } .ck-btn{ transition:none; } }
        .ck-trust { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-top:20px; }
        .ck-trust div { display:flex; align-items:center; gap:8px; font-size:12px; color:var(--muted); line-height:1.3; }
        .ck-trust .ck-ico { width:38px; height:38px; }

        /* Sidebar */
        .ck-side { display:flex; flex-direction:column; gap:18px; position:sticky; top:16px; min-width:0; }
        .ck-order { border-radius:20px; overflow:hidden; border:1px solid var(--line); background:var(--cream); box-shadow:0 10px 30px rgba(120,70,10,.07); }
        .ck-order-top { position:relative; padding:24px 22px 26px; color:#fff3dc; background:radial-gradient(500px 240px at 90% 80%, #7a2a10 0%, transparent 70%), linear-gradient(160deg,#5a0d0d,#2c0606); overflow:hidden; }
        .ck-order-top h3 { position:relative; z-index:2; margin:0 0 14px; font-size:22px; font-weight:600; }
        .ck-tags { position:relative; z-index:2; display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:14px; }
        .ck-tag { background:var(--gold); color:#3a1a00; font-weight:700; font-size:14px; padding:7px 16px; border-radius:100px; }
        .ck-ltd { font-size:12px; border:1px solid rgba(233,178,60,.6); border-radius:8px; padding:6px 10px; color:#ffd98a; }
        .ck-order-top h4 { position:relative; z-index:2; margin:0 0 18px; max-width:58%; font-family:'Playfair Display', Georgia, serif; font-size:clamp(22px,3.4vw,28px); font-weight:600; line-height:1.15; }
        .ck-order-img { position:absolute; right:0; top:58px; height:calc(100% - 58px); width:54%; max-width:none; object-fit:cover; object-position:70% center; pointer-events:none; z-index:1;
          -webkit-mask-image:linear-gradient(to right,transparent 0%,#000 55%),linear-gradient(to bottom,transparent 0%,#000 25%);
          mask-image:linear-gradient(to right,transparent 0%,#000 55%),linear-gradient(to bottom,transparent 0%,#000 25%);
          -webkit-mask-composite:source-in; mask-composite:intersect; }
        .ck-order-top h3, .ck-order-top h4, .ck-price { text-shadow:0 2px 14px rgba(20,0,0,.6); }
        .ck-price { position:relative; z-index:2; display:flex; flex-wrap:wrap; align-items:baseline; gap:4px 14px; }
        .ck-price s { font-size:clamp(20px,3.4vw,24px); color:#e8b9a0; text-decoration-color:#ff6b4a; }
        .ck-price b { font-family:'Playfair Display', Georgia, serif; font-size:clamp(36px,6vw,48px); color:var(--gold); line-height:1; }
        .ck-incl { padding:20px 22px 22px; display:flex; gap:14px; align-items:stretch; }
        .ck-incl-main { flex:1; min-width:0; }
        .ck-orn { width:56px; flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:6px; padding-top:2px; }
        .ck-orn img { width:100%; height:auto; object-fit:contain; }
        .ck-orn i { flex:1; width:1px; max-height:70px; background:linear-gradient(#e9b23c, transparent); }
        .ck-incl h3, .ck-bon h3 { margin:0 0 12px; font-size:19px; color:#4a0e0e; }
        .ck-incl ul { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }
        .ck-incl li { display:flex; align-items:center; gap:10px; font-size:13.5px; }
        .ck-tick { width:20px; height:20px; border-radius:50%; background:#e9a824; color:#fff; font-size:12px; font-weight:800; display:grid; place-items:center; flex-shrink:0; }
        .ck-bon { padding:20px 18px; }
        .ck-bon-head { display:flex; align-items:center; gap:10px; margin-bottom:14px; }
        .ck-bon-head h3 { margin:0; }
        .ck-free { background:#8a1c1c; color:#fff; font-size:11px; font-weight:800; letter-spacing:.5px; padding:4px 12px; border-radius:100px; }
        .ck-bi { display:flex; align-items:center; gap:12px; padding:10px; border:1px solid var(--line); border-radius:12px; background:#fffdf7; margin-bottom:10px; }
        .ck-bi:last-child { margin-bottom:0; }
        .ck-bi img { width:64px; height:64px; border-radius:8px; object-fit:cover; flex-shrink:0; }
        .ck-bi div { flex:1; min-width:0; }
        .ck-bi strong { display:block; font-size:14px; margin-bottom:2px; }
        .ck-bi p { margin:0; font-size:12.5px; color:var(--muted); line-height:1.4; }
        .ck-bp { text-align:center; flex-shrink:0; flex:none !important; }
        .ck-bp span { display:block; background:var(--gold); color:#3a1a00; font-weight:800; font-size:12px; padding:5px 10px; border-radius:6px; }
        .ck-bp s { font-size:12px; font-weight:700; color:#6a4a30; }
        .ck-safe { display:flex; gap:14px; align-items:center; padding:16px 18px; border-radius:16px; background:var(--cream); border:1px solid var(--line); }
        .ck-safe strong { display:block; font-size:14px; margin-bottom:2px; }
        .ck-safe p { margin:0; font-size:12.5px; color:var(--muted); line-height:1.45; }

        /* ── Responsive ── */
        @media (max-width:1024px){
          .ck-trust { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:900px){
          .ck-main { grid-template-columns:minmax(0,1fr); }
          .ck-side { position:static; }
          .ck-head { padding:18px 16px 22px; }
          .ck-back { position:relative; left:auto; top:auto; margin:0 auto 16px; display:flex; width:max-content; }
          .ck-assure { gap:12px 20px; }
          .ck-deco { top:auto; bottom:0; height:auto; width:56%; opacity:.4; -webkit-mask-composite:source-in; mask-composite:intersect; }
          .ck-deco.l { -webkit-mask-image:linear-gradient(to right,#000 45%,transparent 100%),linear-gradient(to top,#000 50%,transparent 100%); mask-image:linear-gradient(to right,#000 45%,transparent 100%),linear-gradient(to top,#000 50%,transparent 100%); }
          .ck-deco.r { -webkit-mask-image:linear-gradient(to left,#000 45%,transparent 100%),linear-gradient(to top,#000 50%,transparent 100%); mask-image:linear-gradient(to left,#000 45%,transparent 100%),linear-gradient(to top,#000 50%,transparent 100%); }
        }
        @media (max-width:640px){
          .ck-row { gap:10px; }
          .ck-row.two { grid-template-columns:1fr; gap:16px; }
          .ck-row > .ck-ico { width:40px; height:40px; margin-top:26px; border-radius:10px; }
          .ck-row > .ck-ico svg { width:18px; height:18px; }
          .ck-in { font-size:16px; }
          .ck-wa select { width:78px; }
          .ck-steps { max-width:100%; }
          .ck-step { width:72px; font-size:12px; }
          .ck-method { flex-direction:column; align-items:flex-start; }
          .ck-chips { margin-left:0; width:100%; }
          .ck-chips span { flex:1; min-width:0; padding:0 6px; }
          .ck-assure { flex-direction:column; align-items:center; }
          .ck-assure div { width:100%; max-width:320px; }
          .ck-sec { gap:10px; align-items:flex-start; }
          .ck-num { width:34px; height:34px; font-size:16px; }
          .ck-sec p { font-size:12.5px; }
          .ck-btn { padding:16px; }
        }
        @media (max-width:480px){
          .ck-main { padding:18px 12px 40px; }
          .ck-row > .ck-ico { display:none; }
          .ck-card { padding:16px; border-radius:16px; }
          .ck-order-top { padding:20px 16px 22px; }
          .ck-order-img { width:50%; }
          .ck-order-top h4 { max-width:60%; font-size:22px; }
          .ck-incl { padding:16px; }
          .ck-bon { padding:16px 14px; }
          .ck-bi { flex-wrap:wrap; }
          .ck-bi img { width:52px; height:52px; }
          .ck-trust { grid-template-columns:1fr; }
          .ck-safe { padding:14px; gap:12px; }
        }
        @media (max-width:380px){
          .ck-orn { display:none; }
          .ck-step { width:64px; font-size:11px; }
          .ck-wa select { width:70px; padding:12px 6px; }
        }
      `}</style>

      <div className="ck">
        {/* ── Header ── */}
        <header className="ck-head">
          <img className="ck-deco l" src="/left.png" alt="" />
          <img className="ck-deco r" src="/right.png" alt="" />
          <Link href="/" className="ck-back">← Back to Website</Link>

          <div className="ck-steps" aria-label="Checkout progress">
            <div className="ck-step on"><b>1</b>Your Details</div>
            <div className="ck-step-line" />
            <div className="ck-step"><b>2</b>Payment</div>
            <div className="ck-step-line" />
            <div className="ck-step"><b>3</b>Confirmation</div>
          </div>

          <h1>Complete <em>Your Booking</em></h1>
          <p className="ck-sub">You&apos;re one step closer to getting personalized astrological guidance.</p>

          <div className="ck-assure">
            <div><span className="ck-ico"><Icon d={ICONS.shield} /></span><span><strong>Secure Payment</strong>256-bit encrypted</span></div>
            <div><span className="ck-ico"><Icon d={ICONS.user} /></span><span><strong>Private &amp; Confidential</strong>Your information is safe</span></div>
            <div><span className="ck-ico"><Icon d={ICONS.bolt} /></span><span><strong>Instant Confirmation</strong>Get booking details immediately</span></div>
          </div>
        </header>

        <div className="ck-main">
          {/* ── LEFT: form ── */}
          <section className="ck-card">
            <div className="ck-sec">
              <span className="ck-num">1</span>
              <div>
                <h2>Your Consultation Details</h2>
                <p>Please fill in the details below so we can prepare for your personalized consultation.</p>
              </div>
            </div>

            <div className="ck-row">
              <span className="ck-ico"><Icon d={ICONS.user} /></span>
              <div className="ck-f">
                <label className="ck-lab" htmlFor="ck-name">Full Name <i>*</i></label>
                <input id="ck-name" className="ck-in" placeholder="Enter your full name" value={form.name} onChange={set('name')} autoComplete="name" />
                <Err message={errors.name} />
              </div>
            </div>

            <div className="ck-row">
              <span className="ck-ico"><Icon d={ICONS.mail} /></span>
              <div className="ck-f">
                <label className="ck-lab" htmlFor="ck-email">Email Address <i>*</i></label>
                <input id="ck-email" className="ck-in" type="email" placeholder="Enter your email address" value={form.email} onChange={set('email')} autoComplete="email" />
                <Err message={errors.email} />
              </div>
            </div>

            <div className="ck-row">
              <span className="ck-ico"><Icon d={ICONS.phone} /></span>
              <div className="ck-f">
                <label className="ck-lab" htmlFor="ck-wa">WhatsApp Number <i>*</i></label>
                <div className="ck-wa">
                  <select className="ck-in" value={form.countryCode} onChange={set('countryCode')} aria-label="Country code">
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                    <option value="+61">+61</option>
                    <option value="+65">+65</option>
                  </select>
                  <input id="ck-wa" className="ck-in" type="tel" inputMode="numeric" placeholder="Enter your WhatsApp number" value={form.whatsapp} onChange={set('whatsapp')} autoComplete="tel-national" />
                </div>
                <Err message={errors.whatsapp} />
              </div>
            </div>

            <div className="ck-row two">
              <div className="ck-row">
                <span className="ck-ico"><Icon d={ICONS.cal} /></span>
                <div className="ck-f">
                  <label className="ck-lab" htmlFor="ck-dob">Date of Birth <i>*</i></label>
                  <input id="ck-dob" className="ck-in" type="date" value={form.dob} onChange={set('dob')} />
                  <Err message={errors.dob} />
                </div>
              </div>
              <div className="ck-row">
                <span className="ck-ico"><Icon d={ICONS.clock} /></span>
                <div className="ck-f">
                  <label className="ck-lab" htmlFor="ck-time">Time of Birth <i>*</i></label>
                  <input id="ck-time" className="ck-in" type="time" value={form.time} onChange={set('time')} />
                  <Err message={errors.time} />
                </div>
              </div>
            </div>

            <div className="ck-row">
              <span className="ck-ico"><Icon d={ICONS.pin} /></span>
              <div className="ck-f">
                <label className="ck-lab" htmlFor="ck-place">Place of Birth <i>*</i></label>
                <input
                  id="ck-place" className="ck-in" placeholder="Enter city, state, country"
                  value={form.place} onChange={handlePlaceInput}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  autoComplete="off"
                />
                <Err message={errors.place} />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="ck-sug">
                    {suggestions.map((s, i) => (
                      <div key={i} onMouseDown={() => { setForm((p) => ({ ...p, place: s })); setShowSuggestions(false) }}>{s}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ck-row">
              <span className="ck-ico"><Icon d={ICONS.chat} /></span>
              <div className="ck-f">
                <label className="ck-lab" htmlFor="ck-concern">What would you like to discuss? <i>*</i></label>
                <textarea
                  id="ck-concern" className="ck-in" maxLength={MAX_CONCERN}
                  placeholder={'Tell us your main questions or areas of concern\n(e.g. career, marriage, finance, business, health, etc.)'}
                  value={form.concern} onChange={set('concern')}
                />
                <div className="ck-count">{form.concern.length}/{MAX_CONCERN}</div>
                <Err message={errors.concern} />
              </div>
            </div>

            {/* Payment */}
            <div className="ck-pay-sec">
              <div className="ck-sec">
                <span className="ck-num">2</span>
                <div>
                  <h2>Choose Payment Method</h2>
                  <p>Complete your payment securely to confirm your consultation.</p>
                </div>
              </div>

              <div className="ck-method">
                <span className="ck-radio" aria-hidden />
                <div>
                  <strong className="serif">Cashfree Payments</strong>
                  <small>UPI, Cards, Net Banking, Wallets</small>
                </div>
                <div className="ck-chips" aria-label="Accepted: UPI, Visa, Mastercard, RuPay"><span><UpiLogo /></span><span><VisaLogo /></span><span><MastercardLogo /></span><span><RupayLogo /></span></div>
              </div>

              {errorMsg && <div className="ck-error" role="alert">⚠️ {errorMsg}</div>}

              <p className="ck-terms">
                By proceeding, you agree to our{' '}
                <Link href="https://www.divinearra.com/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</Link>{' '}and{' '}
                <Link href="https://www.divinearra.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
              </p>

              <button className="ck-btn" onClick={handlePayment} disabled={paying}>
                {paying ? (<><span className="ck-spin" /> Processing Payment…</>) : (<>🔒 Pay {CONSULTATION.discountedPrice} Now</>)}
              </button>

              <div className="ck-trust">
                <div><span className="ck-ico"><Icon d={ICONS.shield} /></span>100% Secure Payment</div>
                <div><span className="ck-ico"><Icon d={ICONS.card} /></span>SSL Encrypted Transaction</div>
                <div><span className="ck-ico"><Icon d={ICONS.user} /></span>Private &amp; Confidential</div>
                <div><span className="ck-ico"><Icon d={ICONS.bolt} /></span>Instant Confirmation</div>
              </div>
            </div>
          </section>

          {/* ── RIGHT: summary ── */}
          <aside className="ck-side">
            <div className="ck-order">
              <div className="ck-order-top">
                <h3>Your Order Summary</h3>
                <div className="ck-tags">
                  <span className="ck-tag">{CONSULTATION.badge}</span>
                </div>
                <h4>{CONSULTATION.title}</h4>
                <img className="ck-order-img" src="/check.png" alt="" />
                <div className="ck-price">
                  <s>{CONSULTATION.originalPrice}</s>
                  <b>{CONSULTATION.discountedPrice}</b>
                </div>
              </div>
              <div className="ck-incl">
                <div className="ck-orn" aria-hidden>
                  <img src="/logo.jpeg" alt="" />
                  <i />
                  <img src="/sticker.png" alt="" />
                </div>
                <div className="ck-incl-main">
                  <h3>What&apos;s Included</h3>
                  <ul>
                    {CONSULTATION.includes.map((t) => (
                      <li key={t}><span className="ck-tick">✓</span>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="ck-order ck-bon">
              <div className="ck-bon-head">
                <span aria-hidden style={{ fontSize: 22 }}>🎁</span>
                <h3>Exclusive Bonuses</h3>
                <span className="ck-free">FREE</span>
              </div>
              {CONSULTATION.bonuses.map((b) => (
                <div className="ck-bi" key={b.title}>
                  <img src={b.img} alt={b.title} />
                  <div><strong>{b.title}</strong><p>{b.desc}</p></div>
                  <div className="ck-bp"><span>FREE</span><s>{b.price}</s></div>
                </div>
              ))}
            </div>

            <div className="ck-safe">
              <span className="ck-ico" style={{ width: 52, height: 52 }}><Icon d={ICONS.shield} /></span>
              <div>
                <strong>Your Information is Safe</strong>
                <p>We value your privacy. Your personal information and consultation details are kept strictly confidential.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}