// components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [angle, setAngle] = useState(0);
  const reducedMotion = useRef(false);
  const [loaded, setLoaded] = useState({
    bl: false,
    br: false,
    tr: false,
    hero: false,
    chakra: false,
  });

  const blRef = useRef<HTMLImageElement>(null);
  const brRef = useRef<HTMLImageElement>(null);
  const trRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLImageElement>(null);
  const chakraRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const refs = {
      bl: blRef,
      br: brRef,
      tr: trRef,
      hero: heroRef,
      chakra: chakraRef,
    } as const;

    setLoaded((prev) => {
      const next = { ...prev };
      (Object.keys(refs) as (keyof typeof refs)[]).forEach((key) => {
        if (refs[key].current?.complete) {
          next[key] = true;
        }
      });
      return next;
    });
  }, []);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion.current) return;

    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      // ~0.3deg per 16ms frame, framerate-independent
      setAngle((a) => (a + (0.3 * dt) / 16) % 360);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="hero">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .hero {
          position: relative;
          width: 100%;
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
          padding: clamp(56px, 9vw, 104px) clamp(20px, 6vw, 80px)
            clamp(40px, 6vw, 64px);
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
          max-width: none;
          opacity: 0;
          transition: opacity 0.6s ease;
          filter: brightness(0) saturate(100%) invert(78%) sepia(46%)
            saturate(620%) hue-rotate(1deg) brightness(103%);
        }
        .lotus--bl {
          bottom: -6%;
          left: -6%;
          width: clamp(130px, 18vw, 280px);
        }
        .lotus--bl.is-loaded {
          opacity: 0.4;
        }
        .lotus--br {
          bottom: -6%;
          right: -6%;
          width: clamp(130px, 18vw, 280px);
          transform: scaleX(-1);
        }
        .lotus--br.is-loaded {
          opacity: 0.4;
        }
        .lotus--tr {
          top: -4%;
          right: -3%;
          width: clamp(100px, 16vw, 240px);
          transform: rotate(180deg);
        }
        .lotus--tr.is-loaded {
          opacity: 0.35;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(28px, 5vw, 56px);
          align-items: center;
        }

        .copy {
          min-width: 0;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-weight: 600;
          font-size: clamp(12px, 1vw, 15px);
          letter-spacing: 0.14em;
          margin-bottom: 22px;
        }

        .headline {
          font-family: var(--font-playfair), serif;
          font-weight: 800;
          color: var(--cream);
          font-size: clamp(30px, 5vw, 64px);
          line-height: 1.12;
          margin: 0 0 6px;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.25);
          overflow-wrap: break-word;
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
          font-size: clamp(14px, 1.5vw, 18px);
          line-height: 1.7;
          max-width: 520px;
          margin: 20px 0 32px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #ffdd7a, var(--gold));
          color: var(--deep-brown);
          font-weight: 700;
          font-size: clamp(14px, 1.1vw, 17px);
          padding: clamp(14px, 1.6vw, 17px) clamp(22px, 3vw, 32px);
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(244, 197, 66, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          max-width: 100%;
        }
        .cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(244, 197, 66, 0.4);
        }
        .cta svg {
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .cta:hover svg {
          transform: translateX(3px);
        }

        .stats {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(14px, 2vw, 24px);
          margin-top: clamp(32px, 5vw, 48px);
          padding-top: clamp(20px, 3vw, 30px);
          border-top: 1px solid rgba(255, 248, 231, 0.18);
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
          max-width: 640px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }
        .chakra-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 118%;
          height: 118%;
          max-width: none;
          object-fit: contain;
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
          transition: opacity 0.6s ease;
        }
        .chakra-bg.is-loaded {
          opacity: 0.5;
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
        .hero-portrait {
          position: relative;
          width: 72%;
          max-width: 100%;
          height: auto;
          z-index: 2;
          opacity: 0;
          filter: drop-shadow(0 0 30px rgba(244, 197, 66, 0.25));
          object-fit: contain;
          transition: opacity 0.6s ease;
        }
        .hero-portrait.is-loaded {
          opacity: 1;
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
            gap: 36px;
          }
          .wheel-wrap {
            max-width: 460px;
          }
        }

        /* Tablets portrait */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .copy {
            max-width: 640px;
            margin: 0 auto;
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
            justify-content: center;
          }
          .wheel-wrap {
            order: -1;
            max-width: 420px;
          }
        }

        /* Phones */
        @media (max-width: 520px) {
          .lotus--tr {
            width: clamp(90px, 24vw, 160px);
          }
          .lotus--bl,
          .lotus--br {
            width: clamp(110px, 26vw, 190px);
          }
          .cta {
            width: 100%;
          }
          .wheel-wrap {
            max-width: 320px;
          }
        }

        /* Very small phones */
        @media (max-width: 380px) {
          .headline {
            font-size: clamp(26px, 8vw, 34px);
          }
          .subtext {
            font-size: 14px;
          }
          .stats {
            gap: 12px 20px;
          }
          .wheel-wrap {
            max-width: 260px;
          }
        }

        /* Short / landscape phones */
        @media (max-height: 480px) and (orientation: landscape) {
          .hero {
            padding-top: 32px;
            padding-bottom: 24px;
          }
          .hero-inner {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
            text-align: left;
          }
          .copy {
            margin: 0;
          }
          .eyebrow {
            justify-content: flex-start;
          }
          .subtext {
            margin-left: 0;
          }
          .cta {
            margin: 0;
            width: auto;
          }
          .stats {
            justify-content: flex-start;
          }
          .wheel-wrap {
            order: 0;
            max-width: 220px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .chakra-bg {
            transition: none;
          }
        }
      `}</style>

      <div className="starfield" />

      {/* eslint-disable @next/next/no-img-element */}
      <img
        ref={blRef}
        src="/lotus.png"
        alt=""
        aria-hidden="true"
        className="lotus lotus--bl"
        style={{ opacity: loaded.bl ? 0.4 : 0 }}
        onLoad={() => setLoaded((s) => ({ ...s, bl: true }))}
      />
      <img
        ref={brRef}
        src="/lotus.png"
        alt=""
        aria-hidden="true"
        className="lotus lotus--br"
        style={{ opacity: loaded.br ? 0.4 : 0 }}
        onLoad={() => setLoaded((s) => ({ ...s, br: true }))}
      />
      <img
        ref={trRef}
        src="/lotus.png"
        alt=""
        aria-hidden="true"
        className="lotus lotus--tr"
        style={{ opacity: loaded.tr ? 0.35 : 0 }}
        onLoad={() => setLoaded((s) => ({ ...s, tr: true }))}
      />

      <div className="hero-inner">
        {/* LEFT: copy */}
        <div className="copy">
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
            ref={chakraRef}
            src="/chakra.png"
            alt=""
            aria-hidden="true"
            className="chakra-bg"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              opacity: loaded.chakra ? 0.5 : 0,
            }}
            onLoad={() => setLoaded((s) => ({ ...s, chakra: true }))}
          />
          <div className="glow" />
          <img
            ref={heroRef}
            src="/hero.png"
            alt="Astrologer"
            className="hero-portrait"
            style={{ opacity: loaded.hero ? 1 : 0 }}
            onLoad={() => setLoaded((s) => ({ ...s, hero: true }))}
          />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </div>
    </section>
  );
}