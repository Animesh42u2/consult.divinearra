// components/Cta.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const badges = [
  {
    label: "Vedic Astrology Based",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 7v5l3.5 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Personalized",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Private",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
        <path
          d="M12 2L4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function CTA() {
  const [hovered, setHovered] = useState(false);

  const scrollToConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="cta">
      <span className="mandala left" aria-hidden="true" />
      <span className="mandala right" aria-hidden="true" />

      <div className="cta-inner">
        <span className="eyebrow">Your Chart. Your Questions. Your Clarity.</span>
        <h2>Ready to Take the Next Step?</h2>
        <p>
          Book your 1-on-1 personalized consultation and gain a clearer
          astrological perspective on the areas that matter to you.
        </p>

        <Link
          href="#consultation"
          onClick={scrollToConsultation}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(6px, 2vw, 10px)",
            background: "var(--gold)",
            color: "var(--deep-brown)",
            fontWeight: 600,
            fontSize: "clamp(13px, 3.6vw, 15px)",
            padding: "clamp(12px, 3.6vw, 16px) clamp(20px, 6vw, 32px)",
            borderRadius: "8px",
            textDecoration: "none",
            textAlign: "center",
            maxWidth: "100%",
            border: "none",
            lineHeight: 1,
            boxShadow: hovered
              ? "0 14px 28px rgba(244, 197, 66, 0.35)"
              : "0 10px 24px rgba(244, 197, 66, 0.25)",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          Book My Consultation
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="badges">
          {badges.map((badge, i) => (
            <span className="badge" key={badge.label}>
              <span className="badge-icon">{badge.icon}</span>
              {badge.label}
              {i < badges.length - 1 && <span className="divider" aria-hidden="true">|</span>}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cta {
          position: relative;
          background: linear-gradient(160deg, var(--maroon) 0%, var(--royal-red) 100%);
          padding: clamp(48px, 9vw, 80px) 6vw;
          text-align: center;
          overflow: hidden;
        }

        .mandala {
          position: absolute;
          top: 0;
          bottom: 0;
          height: 100%;
          width: 320px;
          opacity: 0.35;
          background-color: var(--gold);
          -webkit-mask-image: url("/design.png");
          mask-image: url("/design.png");
          -webkit-mask-size: cover;
          mask-size: cover;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          pointer-events: none;
        }
        .mandala.left {
          left: -105px;
          transform: scaleX(-1);
        }
        .mandala.right {
          right: -105px;
          transform: none;
        }

        @media (max-width: 600px) {
          .mandala {
            width: 160px;
            opacity: 0.25;
          }
          .mandala.left {
            left: -180px;
          }
          .mandala.right {
            right: -180px;
          }
        }

        .cta-inner {
          position: relative;
          max-width: 640px;
          margin: 0 auto;
        }

        .eyebrow {
          display: block;
          color: var(--gold);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-size: clamp(11px, 2.6vw, 13px);
          margin-bottom: clamp(10px, 2vw, 14px);
        }

        .cta h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--cream);
          font-size: clamp(26px, 5vw, 40px);
          line-height: 1.2;
          margin-bottom: clamp(10px, 2vw, 14px);
        }

        .cta p {
          color: rgba(255, 248, 231, 0.8);
          font-size: clamp(14px, 2.6vw, 16px);
          max-width: 480px;
          margin: 0 auto clamp(24px, 5vw, 34px);
          line-height: 1.5;
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 14px);
          margin-top: clamp(20px, 4vw, 28px);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 248, 231, 0.85);
          font-size: clamp(12px, 2.6vw, 14px);
          font-weight: 500;
          white-space: nowrap;
        }

        .badge-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid var(--gold);
          color: var(--gold);
        }

        .divider {
          margin-left: clamp(8px, 2vw, 14px);
          color: rgba(255, 248, 231, 0.4);
        }

        @media (max-width: 480px) {
          .badges {
            flex-direction: column;
            gap: 10px;
          }
          .divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}