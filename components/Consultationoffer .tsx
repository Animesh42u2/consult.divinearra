// components/ConsultationOffer.tsx
"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";

interface Feature {
  label: string;
}

interface Bonus {
  title: string;
  description: string;
  image: string;
}

const ORIGINAL_PRICE = 2499;
const OFFER_PRICE = 750;
const DISCOUNT_PERCENT = Math.round(((ORIGINAL_PRICE - OFFER_PRICE) / ORIGINAL_PRICE) * 100); // 70
const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const features: Feature[] = [
  { label: "Personalized Kundali Analysis" },
  { label: "1-on-1 Question-Based Guidance" },
  { label: "Relevant Dasha & Planetary Insights" },
  { label: "Practical Remedies (Where Appropriate)" },
];

const bonuses: Bonus[] = [
  {
    title: "Personalized Kundali Report",
    description: "A detailed report based on your birth chart.",
    image: "/bonus-kundali-report.webp",
  },
  {
    title: "Personalized Remedy Guidance",
    description: "Simple and effective remedies where relevant.",
    image: "/bonus-remedy-guidance.webp",
  },
];

const CheckIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
    <path
      d="M5 13l4 4L19 7"
      stroke="var(--deep-brown)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <circle cx="12" cy="12" r="9" stroke="var(--deep-brown)" strokeWidth="1.6" />
    <path
      d="M12 7v5l3.5 2"
      stroke="var(--deep-brown)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <path
      d="M6 3.5h8l4 4V20a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5z"
      stroke="var(--deep-brown)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M14 3.5V8h4" stroke="var(--deep-brown)" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8 12.5h8M8 15.5h8M8 9.5h3" stroke="var(--deep-brown)" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = (): ReactNode => (
  <svg viewBox="0 0 24 24" fill="none" width="13" height="13">
    <path
      d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ConsultationOffer() {
  return (
    <section className="offer" id="consultation">
      <div className="offer-inner">
        {/* Top row: hero image + checklist */}
        <div className="offer-top">
          <div className="offer-image" style={{ position: "relative", overflow: "hidden" }}>
  <Image
    src="/consultation-books-stack.webp"
    alt="Stack of books labeled Career, Finance, Health and Business beside an oil lamp and crystal ball"
    width={1200}
    height={900}
    sizes="(max-width: 900px) 100vw, 55vw"
    priority
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center top",
    }}
  />
</div>

          <div className="offer-checklist">
            <span className="eyebrow">Your Consultation Includes</span>
            <h2>More Than Just Predictions</h2>
            <ul>
              {features.map((f) => (
                <li key={f.label}>
                  <span className="check-badge">
                    <CheckIcon />
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row: pricing card + bonuses */}
        <div className="offer-bottom">
          <div className="pricing-card">
            <span className="special-badge">Special Offer</span>
            <h3>1-On-1 Personalized Consultation</h3>

            <div className="price-row">
              <span className="price-old">{formatINR(ORIGINAL_PRICE)}</span>
              <span className="price-new">{formatINR(OFFER_PRICE)}</span>
              <span className="discount-badge">{DISCOUNT_PERCENT}% OFF</span>
            </div>

            <div className="meta-row">
              <div className="meta-item">
                <ClockIcon />
                <span>30-Minute Private Session</span>
              </div>
              <div className="meta-divider" />
              <div className="meta-item">
                <FileIcon />
                <span>Free Personalized Kundali Report</span>
              </div>
            </div>

            <Link href="/checkout" className="cta-btn">
              Book Your Consultation
              <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="var(--cream)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="trust-row">
              <span>
                <ShieldIcon /> Secure Booking
              </span>
              <span>
                <ShieldIcon /> Private &amp; Confidential
              </span>
              <span>
                <ShieldIcon /> Personalized Guidance
              </span>
            </div>
          </div>

          <div className="bonuses-card">
            <span className="bonuses-title">Exclusive Bonuses</span>
            <ul className="bonus-list">
              {bonuses.map((b) => (
                <li key={b.title}>
                  <span className="bonus-thumb">
  <Image
    src={b.image}
    alt={b.title}
    width={56}
    height={56}
    sizes="56px"
    style={{ objectFit: "cover", borderRadius: 10 }}
  />
</span>
                  <span className="bonus-text">
                    <strong>{b.title}</strong>
                    <span>{b.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .offer {
          --overlap: clamp(24px, 4vw, 48px);
          background: var(--cream);
          padding: clamp(28px, 5vw, 56px) clamp(16px, 5vw, 6vw) clamp(40px, 6vw, 72px);
          overflow-x: hidden;
        }
        .offer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ---- Top row ---- */
        .offer-top {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          align-items: stretch;
          border-radius: 18px;
          overflow: hidden;
        }
        .offer-image {
          position: relative;
          min-height: calc(clamp(320px, 38vw, 460px) + var(--overlap));
        }
        .offer-checklist {
          background: var(--soft-cream-gold);
          padding: clamp(24px, 3vw, 40px) clamp(20px, 3.5vw, 44px);
          padding-bottom: calc(clamp(24px, 3vw, 40px) + var(--overlap));
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }
        .eyebrow {
          color: var(--royal-red);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .offer-checklist h2 {
          font-family: var(--font-playfair), serif;
          color: var(--deep-brown);
          font-size: clamp(20px, 2.6vw, 27px);
          line-height: 1.25;
          margin-bottom: 18px;
        }
        .offer-checklist ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .offer-checklist li {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--deep-brown);
          font-size: clamp(13.5px, 1.5vw, 15px);
          font-weight: 500;
        }
        .check-badge {
          flex: 0 0 auto;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ---- Bottom row (no overlap, so the image and checklist are never covered) ---- */
        .offer-bottom {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 24px;
          margin-top: calc(var(--overlap) * -1);
          padding: 0 clamp(8px, 2vw, 24px);
          position: relative;
          z-index: 1;
          align-items: stretch;
        }

        .pricing-card,
        .bonuses-card {
          background: var(--cream);
          border-radius: 16px;
          box-shadow: 0 18px 40px rgba(43, 22, 15, 0.14);
          padding: clamp(20px, 3vw, 32px);
          min-width: 0;
        }

        .special-badge {
          display: inline-block;
          background: var(--royal-red);
          color: var(--cream);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 14px;
        }
        .pricing-card h3 {
          font-family: var(--font-playfair), serif;
          color: var(--deep-brown);
          font-size: clamp(20px, 2.4vw, 26px);
          line-height: 1.3;
          margin-bottom: 16px;
          max-width: 20ch;
        }
        .price-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 12px;
          margin-bottom: 20px;
        }
        .price-old {
          position: relative;
          color: #9a8f86;
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 600;
        }
        .price-old::after {
          content: "";
          position: absolute;
          left: -2px;
          right: -2px;
          top: 52%;
          height: 2px;
          background: var(--royal-red);
          transform: rotate(-6deg);
        }
        .price-new {
          color: var(--royal-red);
          font-size: clamp(30px, 4vw, 40px);
          font-weight: 800;
          line-height: 1;
        }
        .discount-badge {
          display: inline-flex;
          align-items: center;
          background: var(--gold);
          color: var(--deep-brown);
          font-size: clamp(12px, 1.4vw, 13.5px);
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 6px 12px;
          border-radius: 999px;
          box-shadow: 0 4px 10px rgba(43, 22, 15, 0.15);
          white-space: nowrap;
        }

        .meta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--deep-brown);
          font-size: clamp(12.5px, 1.3vw, 13.5px);
          font-weight: 600;
        }
        .meta-divider {
          width: 1px;
          height: 22px;
          background: rgba(43, 22, 15, 0.2);
        }

        /* Link renders its own <a>, so the class must be global (scoped under .offer) */
        .offer :global(.cta-btn) {
          display: inline-flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--royal-red);
          color: var(--cream);
          text-decoration: none;
          border: none;
          border-radius: 10px;
          padding: clamp(13px, 2.6vw, 16px) 20px;
          font-size: clamp(14px, 1.8vw, 16px);
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 12px 24px rgba(139, 0, 0, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .offer :global(.cta-btn:hover) {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(139, 0, 0, 0.32);
        }
        .offer :global(.cta-btn:focus-visible) {
          outline: 3px solid var(--gold);
          outline-offset: 2px;
        }

        .trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 16px;
          margin-top: 16px;
        }
        .trust-row span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--deep-brown);
          opacity: 0.75;
          font-size: 11.5px;
          font-weight: 600;
        }

        .bonuses-card {
     align-self: start;
   }

   .bonuses-title {
          display: block;
          color: var(--royal-red);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .bonus-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .bonus-list li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .bonus-thumb {
          position: relative;
          flex: 0 0 auto;
          width: 56px;
          height: 56px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(43, 22, 15, 0.18);
        }
        .bonus-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .bonus-text strong {
          color: var(--deep-brown);
          font-size: clamp(13.5px, 1.5vw, 14.5px);
          font-weight: 700;
        }
        .bonus-text span {
          color: var(--deep-brown);
          opacity: 0.7;
          font-size: clamp(12px, 1.3vw, 13px);
          line-height: 1.4;
        }

        /* ---- Responsive ---- */
        @media (max-width: 1024px) {
          .offer-top {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          }
          .offer-bottom {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
            gap: 18px;
          }
        }

        @media (max-width: 900px) {
          .offer-top {
            grid-template-columns: 1fr;
          }
          .offer-image {
            min-height: 0;
            aspect-ratio: 16 / 10;
          }
          .offer-bottom {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .pricing-card h3 {
            max-width: none;
          }
        }

        @media (max-width: 640px) {
          .offer-image {
            aspect-ratio: 4 / 3;
          }
          .offer-top {
            border-radius: 14px;
          }
          .offer-checklist ul {
            gap: 12px;
          }
        }

        @media (max-width: 480px) {
          .meta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .meta-divider {
            display: none;
          }
          .trust-row {
            flex-direction: column;
            gap: 8px;
          }
          .bonus-thumb {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </section>
  );
}