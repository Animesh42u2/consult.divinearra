// components/HowItWorks.tsx
"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface StepItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

const steps: StepItem[] = [
  {
    title: "Book",
    desc: "Share your birth details and key questions.",
    icon: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2" fill="currentColor" />
        <rect x="4" y="6" width="16" height="3.6" rx="1" fill="var(--soft-cream-gold)" />
        <rect x="7.5" y="12" width="2.4" height="2.4" rx="0.4" fill="var(--soft-cream-gold)" />
        <rect x="10.8" y="12" width="2.4" height="2.4" rx="0.4" fill="var(--soft-cream-gold)" />
        <rect x="14.1" y="12" width="2.4" height="2.4" rx="0.4" fill="var(--soft-cream-gold)" />
      </>
    ),
  },
  {
    title: "Consult",
    desc: "Join your private 1-on-1 session at your scheduled time.",
    icon: (
      <>
        <circle cx="12" cy="9" r="3.4" fill="currentColor" />
        <path d="M5.5 19c0-3.3 2.9-5.6 6.5-5.6s6.5 2.3 6.5 5.6" fill="currentColor" />
        <circle cx="12" cy="9" r="1.2" fill="var(--maroon)" />
      </>
    ),
  },
  {
    title: "Understand",
    desc: "Receive clear and personalized guidance based on your Kundali.",
    icon: (
      <>
        <path
          d="M4 17l5-5 3.5 3L20 7"
          stroke="currentColor"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 7H20v4.5"
          stroke="currentColor"
          strokeWidth="1.9"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

// When the travelling arrow reaches each badge (seconds into the 4s loop)
const pingDelays = ["0.1s", "1.9s", "3.4s"];

export default function HowItWorks() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works">
      <div className={`hiw-inner${isVisible ? " is-visible" : ""}`} ref={innerRef}>
        <p className="eyebrow">How It Works</p>
        <h2>Get Clarity in 3 Simple Steps</h2>

        <div className="track">
          <div className="line" aria-hidden="true" />

          <div className="arrow-wrap" aria-hidden="true">
            <span className="arrow-glow" />
            <span className="arrow-trail" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient id="hiwArrowGrad" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8b0000" />
                  <stop offset="100%" stopColor="#d8ac41" />
                </linearGradient>
              </defs>
              <path
                d="M9 6l6 6-6 6"
                stroke="url(#hiwArrowGrad)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="steps">
            {steps.map((s, i) => (
              <div
                className="step"
                key={s.title}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="badge" style={{ "--d": pingDelays[i] } as CSSProperties}>
                  {i + 1}
                </div>

                <div className="card">
                  <div className="icon-wrap">
                    <span className="dash-ring" />
                    <span className="sparkle" style={{ top: 2, left: 6 }}>✦</span>
                    <span className="sparkle" style={{ bottom: 4, right: 2, fontSize: 8 }}>✦</span>
                    <span className="sparkle" style={{ top: 10, right: -2, fontSize: 7 }}>✦</span>
                    <div className="icon-circle">
                      <svg viewBox="0 0 24 24" fill="none">
                        {s.icon}
                      </svg>
                    </div>
                  </div>

                  <div className="divider">
                    <span className="divider-line" />
                    <span className="divider-icon">❖</span>
                    <span className="divider-line" />
                  </div>

                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>

                  <div className="flourish">
                    <span className="flourish-line" />
                    <span className="flourish-icon">❧</span>
                    <span className="flourish-line" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          background: var(--cream);
          padding: clamp(40px, 7vw, 56px) clamp(16px, 6vw, 6vw) clamp(48px, 8vw, 80px);
          overflow-x: hidden;
        }
        .hiw-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ---------- Heading ---------- */
        .eyebrow {
          text-align: center;
          color: var(--royal-red);
          font-weight: 700;
          letter-spacing: 0.08em;
          font-size: clamp(12px, 1.6vw, 13px);
          text-transform: uppercase;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        h2 {
          text-align: center;
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--deep-brown);
          font-size: clamp(22px, 3.6vw, 32px);
          margin-bottom: clamp(32px, 5vw, 56px);
          padding: 0 8px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease 0.08s, transform 0.6s ease 0.08s;
        }
        .hiw-inner.is-visible .eyebrow,
        .hiw-inner.is-visible h2 {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------- Track (line + travelling arrow) ---------- */
        .track {
          --gap: clamp(1.25rem, 3vw, 2.5rem);
          /* centre of column 1 and column 3 */
          --c1: calc((100% - 2 * var(--gap)) / 6);
          --c3: calc(100% - (100% - 2 * var(--gap)) / 6);
          position: relative;
        }
        .line {
          position: absolute;
          top: 17px;
          left: var(--c1);
          right: var(--c1);
          height: 1.5px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(196, 143, 44, 0.65) 10%,
            rgba(196, 143, 44, 0.65) 90%,
            transparent
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.6s ease 0.3s;
        }
        .hiw-inner.is-visible .line {
          opacity: 1;
        }

        .arrow-wrap {
          position: absolute;
          top: 17px;
          left: var(--c1);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translate(-50%, -50%);
          z-index: 2;
          opacity: 0;
          pointer-events: none;
        }
        .hiw-inner.is-visible .arrow-wrap {
          animation: arrow-move 4s cubic-bezier(0.45, 0, 0.55, 1) 1s infinite;
        }
        .arrow-glow {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 197, 66, 0.55) 0%, rgba(244, 197, 66, 0) 70%);
          filter: blur(3px);
          animation: arrow-pulse 1.5s ease-in-out infinite;
        }
        .arrow-trail {
          position: absolute;
          top: 50%;
          right: 100%;
          width: 26px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(139, 0, 0, 0.55));
          transform: translateY(-50%);
        }
        .arrow-wrap svg {
          position: relative;
          filter: drop-shadow(0 2px 5px rgba(92, 10, 10, 0.45));
        }
        @keyframes arrow-pulse {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }
        @keyframes arrow-move {
          0% {
            left: var(--c1);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            left: var(--c3);
            opacity: 0;
          }
        }

        /* ---------- Steps ---------- */
        .steps {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: var(--gap);
          align-items: stretch;
        }
        .step {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 38px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hiw-inner.is-visible .step {
          opacity: 1;
          transform: translateY(0);
        }

        .badge {
          position: absolute;
          top: 17px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: linear-gradient(150deg, var(--maroon), var(--royal-red));
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-playfair), serif;
          font-weight: 800;
          font-size: 1.05rem;
          z-index: 10;
          box-shadow: 0 0 0 5px var(--cream), 0 0 0 6px rgba(244, 197, 66, 0.5),
            0 6px 16px rgba(92, 10, 10, 0.4), 0 0 0 0 rgba(244, 197, 66, 0);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hiw-inner.is-visible .badge {
          animation: badge-ping 4s ease-out calc(1s + var(--d, 0s)) infinite;
        }
        .step:hover .badge {
          transform: translate(-50%, -50%) scale(1.1) rotate(-4deg);
        }
        @keyframes badge-ping {
          0% {
            box-shadow: 0 0 0 5px var(--cream), 0 0 0 6px rgba(244, 197, 66, 0.5),
              0 6px 16px rgba(92, 10, 10, 0.4), 0 0 0 0 rgba(244, 197, 66, 0);
          }
          6% {
            box-shadow: 0 0 0 5px var(--cream), 0 0 0 7px rgba(244, 197, 66, 0.95),
              0 6px 16px rgba(92, 10, 10, 0.4), 0 0 22px 6px rgba(244, 197, 66, 0.55);
          }
          24%,
          100% {
            box-shadow: 0 0 0 5px var(--cream), 0 0 0 6px rgba(244, 197, 66, 0.5),
              0 6px 16px rgba(92, 10, 10, 0.4), 0 0 0 0 rgba(244, 197, 66, 0);
          }
        }

        /* ---------- Card ---------- */
        .card {
          flex: 1;
          width: 100%;
          max-width: 380px;
          text-align: center;
          padding: 2.3rem 1.5rem 1.6rem;
          border: 1.5px solid transparent;
          border-radius: 18px;
          background-image: linear-gradient(165deg, #fffdf9 0%, var(--soft-cream-gold) 100%),
            linear-gradient(135deg, var(--gold) 0%, var(--royal-red) 50%, var(--gold) 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          box-shadow: 0 1px 2px rgba(43, 22, 15, 0.04), 0 12px 28px rgba(43, 22, 15, 0.07);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .step:hover .card {
          transform: translateY(-8px);
          box-shadow: 0 4px 10px rgba(43, 22, 15, 0.06), 0 24px 48px rgba(139, 0, 0, 0.15);
        }

        .icon-wrap {
          position: relative;
          width: 96px;
          height: 96px;
          margin: 0.5rem auto 0.9rem;
        }
        .dash-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px dashed rgba(196, 143, 44, 0.8);
          animation: spin 22s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .icon-circle {
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, var(--royal-red) 0%, var(--maroon) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 14px rgba(92, 10, 10, 0.3);
        }
        .icon-circle svg {
          width: 40px;
          height: 40px;
          color: var(--gold);
        }
        .sparkle {
          position: absolute;
          color: var(--gold);
          font-size: 10px;
          opacity: 0.85;
        }

        .divider,
        .flourish {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }
        .divider {
          margin: 0.2rem 0 0.8rem;
        }
        .divider-line,
        .flourish-line {
          width: 30px;
          height: 1px;
          background: rgba(196, 143, 44, 0.7);
        }
        .divider-icon,
        .flourish-icon {
          color: var(--royal-red);
          font-size: 0.65rem;
        }
        .flourish-icon {
          font-size: 0.85rem;
        }

        .card h3 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(19px, 2.4vw, 22px);
          font-weight: 700;
          color: var(--deep-brown);
          margin: 0 0 0.6rem;
          line-height: 1.2;
        }
        .card p {
          font-size: clamp(14px, 1.7vw, 16px);
          color: var(--maroon);
          opacity: 0.8;
          line-height: 1.7;
          margin: 0 0 1rem;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 768px) {
          .steps {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            max-width: 400px;
            margin: 0 auto;
          }
          .line,
          .arrow-wrap {
            display: none;
          }
          .hiw-inner.is-visible .badge {
            animation: none;
          }
          .card {
            max-width: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eyebrow,
          h2,
          .step,
          .line,
          .card,
          .badge {
            transition: none;
          }
          .dash-ring,
          .arrow-glow,
          .hiw-inner.is-visible .arrow-wrap,
          .hiw-inner.is-visible .badge {
            animation: none;
          }
          .arrow-wrap {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}