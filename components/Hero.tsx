// components/Hero.tsx
"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setAngle((a) => (a + 0.3) % 360), 16);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      <style jsx>{`
        .hero {
          position: relative;
          background: radial-gradient(
              ellipse at 75% 30%,
              rgba(244, 197, 66, 0.12),
              transparent 55%
            ),
            linear-gradient(
              160deg,
              var(--maroon) 0%,
              var(--royal-red) 55%,
              var(--maroon) 100%
            );
          overflow: hidden;
          padding: 104px 6vw 64px;
        }

        .starfield {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(
              1.5px 1.5px at 15% 20%,
              rgba(255, 248, 231, 0.5) 50%,
              transparent 51%
            ),
            radial-gradient(
              1.5px 1.5px at 85% 15%,
              rgba(255, 248, 231, 0.4) 50%,
              transparent 51%
            ),
            radial-gradient(
              1.5px 1.5px at 40% 70%,
              rgba(255, 248, 231, 0.35) 50%,
              transparent 51%
            ),
            radial-gradient(
              1.5px 1.5px at 65% 55%,
              rgba(255, 248, 231, 0.3) 50%,
              transparent 51%
            ),
            radial-gradient(
              1.5px 1.5px at 25% 85%,
              rgba(255, 248, 231, 0.3) 50%,
              transparent 51%
            );
        }

        .lotus {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          filter: brightness(0) saturate(100%) invert(78%) sepia(46%)
            saturate(620%) hue-rotate(1deg) brightness(103%);
        }
        .lotus--bl {
          bottom: -6%;
          left: -6%;
          width: clamp(180px, 18vw, 280px);
          opacity: 0.4;
        }
        .lotus--br {
          bottom: -6%;
          right: -6%;
          width: clamp(180px, 18vw, 280px);
          opacity: 0.4;
          transform: scaleX(-1);
        }
        .lotus--tr {
          top: -4%;
          right: -3%;
          width: clamp(160px, 16vw, 240px);
          opacity: 0.35;
          transform: rotate(180deg);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 56px;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-weight: 600;
          font-size: clamp(13px, 1vw, 15px);
          letter-spacing: 0.14em;
          margin-bottom: 22px;
        }

        .headline {
          font-family: var(--font-playfair), serif;
          font-weight: 800;
          color: var(--cream);
          font-size: clamp(34px, 5vw, 64px);
          line-height: 1.12;
          margin-bottom: 6px;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.25);
        }
        .headline .accent {
          color: var(--gold);
          display: block;
          background: linear-gradient(90deg, var(--gold), #ffe08a 60%, var(--gold));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtext {
          color: rgba(255, 248, 231, 0.82);
          font-size: clamp(15px, 1.5vw, 18px);
          line-height: 1.7;
          max-width: 520px;
          margin: 24px 0 36px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #ffdd7a, var(--gold));
          color: var(--deep-brown);
          font-weight: 700;
          font-size: clamp(15px, 1.1vw, 17px);
          padding: 17px 32px;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(244, 197, 66, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(244, 197, 66, 0.4);
        }
        .cta svg {
          transition: transform 0.25s ease;
        }
        .cta:hover svg {
          transform: translateX(3px);
        }

        .stats {
          display: flex;
          flex-wrap: nowrap;
          gap: 24px;
          margin-top: 48px;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 248, 231, 0.18);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .stats::-webkit-scrollbar {
          display: none;
        }
        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 248, 231, 0.9);
          font-size: clamp(12px, 1.05vw, 15px);
          font-weight: 500;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .stat svg {
          color: var(--gold);
          flex-shrink: 0;
        }

        .wheel-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .chakra-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 118%;
          height: 118%;
          object-fit: contain;
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }
        .glow {
          position: absolute;
          inset: 6%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(244, 197, 66, 0.35) 0%,
            rgba(244, 197, 66, 0.08) 45%,
            transparent 70%
          );
          filter: blur(2px);
          z-index: 1;
        }
        .ring-outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(244, 197, 66, 0.35);
          z-index: 1;
        }
        .ring-inner {
          position: absolute;
          inset: 14%;
          border-radius: 50%;
          border: 1px solid rgba(244, 197, 66, 0.25);
          z-index: 1;
        }
        .hero-portrait {
          position: relative;
          width: 72%;
          height: auto;
          z-index: 2;
          filter: drop-shadow(0 0 30px rgba(244, 197, 66, 0.25));
          object-fit: contain;
        }

        /* ---------- Responsive ---------- */

        /* Large desktop / wide monitors */
        @media (min-width: 1600px) {
          .hero-inner {
            max-width: 1640px;
            gap: 72px;
          }
          .wheel-wrap {
            max-width: 720px;
          }
        }

        /* Small laptops / tablets landscape */
        @media (max-width: 1100px) {
          .hero-inner {
            gap: 40px;
          }
          .wheel-wrap {
            max-width: 480px;
          }
        }

        /* Tablets portrait */
        @media (max-width: 900px) {
          .hero {
            padding: 72px 6vw 48px;
          }
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 44px;
            text-align: center;
          }
          .eyebrow {
            justify-content: center;
          }
          .subtext {
            margin-left: auto;
            margin-right: auto;
          }
          .cta {
            margin: 0 auto;
          }
          .stats {
            justify-content: flex-start;
          }
          .wheel-wrap {
            order: -1;
            max-width: 440px;
          }
        }

        /* Phones */
        @media (max-width: 520px) {
          .hero {
            padding: 56px 6vw 40px;
          }
          .lotus--tr {
            width: clamp(110px, 24vw, 160px);
          }
          .lotus--bl,
          .lotus--br {
            width: clamp(130px, 26vw, 190px);
          }
          .stats {
            gap: 16px;
          }
          .cta {
            width: 100%;
            justify-content: center;
            padding: 16px 26px;
          }
          .wheel-wrap {
            max-width: 340px;
          }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .headline {
            font-size: clamp(28px, 8vw, 36px);
          }
          .subtext {
            font-size: 14px;
          }
          .stats {
            flex-direction: column;
            align-items: flex-start;
            overflow-x: visible;
          }
          .wheel-wrap {
            max-width: 300px;
          }
        }
      `}</style>

      <div className="starfield" />

      <img src="/lotus.png" alt="" aria-hidden="true" className="lotus lotus--bl" />
      <img src="/lotus.png" alt="" aria-hidden="true" className="lotus lotus--br" />
      <img src="/lotus.png" alt="" aria-hidden="true" className="lotus lotus--tr" />

      <div className="hero-inner">
        {/* LEFT: copy */}
        <div>
          <div className="eyebrow">Ancient Wisdom • Modern Guidance</div>

          <h1 className="headline">
            Your Kundli Holds
            <span className="accent">the Answers.</span>
          </h1>

          <p className="subtext">
            Get clarity in Love, Career, Money, Health and Life&apos;s
            important decisions with expert guidance.
          </p>

          <a href="#" className="cta">
            Book Your Consultation
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Stats row */}
          <div className="stats">
            <div className="stat">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path
                  d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5l7-3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              100% Confidential
            </div>
            <div className="stat">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M3 19c0-3 2.7-5 6-5s6 2 6 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M15 14.2c2.6.4 4.3 2.2 4.3 4.8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              10,000+ Happy Clients
            </div>
            <div className="stat">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path
                  d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              4.9/5 Rating
            </div>
            <div className="stat">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <path
                  d="M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1v-6h3M4 17v-4h3v6H6a2 2 0 01-2-2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              Online Consultation
            </div>
          </div>
        </div>

        {/* RIGHT: zodiac wheel + rotating chakra background + hero image */}
        <div className="wheel-wrap">
          <img
            src="/chakra.png"
            alt=""
            aria-hidden="true"
            className="chakra-bg"
            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          />
          <div className="glow" />
          <div className="ring-outer" />
          <div className="ring-inner" />
          <img src="/hero.png" alt="Astrologer" className="hero-portrait" />
        </div>
      </div>
    </section>
  );
}