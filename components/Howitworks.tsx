// components/HowItWorks.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface StepItem {
  number: string;
  title: string;
  desc: string;
  icon: ReactNode;
}

const steps: StepItem[] = [
  {
    number: "01",
    title: "Book",
    desc: "Share your birth details and key questions.",
    icon: (
      <>
        <rect x="4" y="6" width="16" height="14" rx="2" fill="currentColor" />
        <rect x="4" y="6" width="16" height="3.6" rx="1" fill="var(--gold)" />
        <rect x="7.5" y="12" width="2.4" height="2.4" rx="0.4" fill="var(--soft-cream-gold)" />
        <rect x="10.8" y="12" width="2.4" height="2.4" rx="0.4" fill="var(--soft-cream-gold)" />
        <rect x="14.1" y="12" width="2.4" height="2.4" rx="0.4" fill="var(--soft-cream-gold)" />
      </>
    ),
  },
  {
    number: "02",
    title: "Consult",
    desc: "Join your private 1-on-1 session at your scheduled time.",
    icon: (
      <>
        <circle cx="12" cy="9" r="3.4" fill="currentColor" />
        <path
          d="M5.5 19c0-3.3 2.9-5.6 6.5-5.6s6.5 2.3 6.5 5.6"
          fill="currentColor"
        />
        <circle cx="12" cy="9" r="1.2" fill="var(--soft-cream-gold)" />
      </>
    ),
  },
  {
    number: "03",
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
        <path d="M15.5 7H20v4.5" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export default function HowItWorks() {
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

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
      <div
        className={`hiw-inner${isVisible ? " is-visible" : ""}`}
        ref={innerRef}
      >
        <p className="eyebrow">How It Works</p>
        <h2>Get Clarity in 3 Simple Steps</h2>

        <div className="step-row">
          {steps.map((s, i) => (
            <div className="step-wrap" key={s.number} style={{ transitionDelay: `${i * 0.12}s` }}>
              <div className="step-card">
                <div className="icon-ring">
                  <div className="icon-circle">
                    <svg viewBox="0 0 24 24" fill="none">
                      {s.icon}
                    </svg>
                  </div>
                </div>
                <div className="step-text">
                  <span className="step-number">{s.number}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>

              {i < steps.length - 1 && <span className="arrow">→</span>}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .how-it-works {
          background: var(--cream);
          padding: clamp(40px, 7vw, 56px) clamp(16px, 6vw, 6vw) clamp(48px, 8vw, 72px);
        }
        .hiw-inner {
          max-width: 1160px;
          margin: 0 auto;
        }
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
          margin-bottom: clamp(28px, 5vw, 44px);
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
        .step-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(4px, 1vw, 8px);
        }
        .step-wrap {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 0;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .hiw-inner.is-visible .step-wrap {
          opacity: 1;
          transform: translateY(0);
        }
        .step-card {
          display: flex;
          align-items: center;
          gap: clamp(10px, 1.6vw, 16px);
          background: var(--soft-cream-gold);
          border: 1px solid var(--light-gold);
          border-radius: 999px;
          padding: clamp(12px, 1.8vw, 14px) clamp(16px, 2.4vw, 24px) clamp(12px, 1.8vw, 14px) clamp(10px, 1.4vw, 14px);
          width: 100%;
          min-width: 0;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 28px rgba(139, 0, 0, 0.1);
        }
        .icon-ring {
          flex: 0 0 auto;
          width: clamp(46px, 6vw, 62px);
          height: clamp(46px, 6vw, 62px);
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(
            from 200deg,
            var(--royal-red),
            var(--gold),
            var(--maroon),
            var(--royal-red)
          );
        }
        .icon-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--deep-brown);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--cream);
        }
        .icon-circle svg {
          width: clamp(18px, 2.4vw, 24px);
          height: clamp(18px, 2.4vw, 24px);
          color: var(--gold);
        }
        .step-text {
          min-width: 0;
        }
        .step-number {
          display: block;
          font-size: clamp(11px, 1.4vw, 13px);
          font-weight: 700;
          color: var(--maroon);
          opacity: 0.55;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }
        .step-text h3 {
          font-family: var(--font-playfair), serif;
          font-size: clamp(15px, 1.8vw, 17px);
          font-weight: 700;
          color: var(--deep-brown);
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .step-text p {
          font-size: clamp(11.5px, 1.4vw, 12.5px);
          color: var(--maroon);
          opacity: 0.75;
          line-height: 1.45;
          overflow-wrap: break-word;
        }
        .arrow {
          flex: 0 0 auto;
          font-size: clamp(16px, 2vw, 20px);
          color: var(--royal-red);
          padding: 0 clamp(4px, 1vw, 10px);
          opacity: 0;
          transition: opacity 0.5s ease 0.3s;
        }
        .hiw-inner.is-visible .arrow {
          opacity: 1;
        }

        /* Tablets: keep the row but tighten spacing before stacking */
        @media (max-width: 1000px) {
          .step-card {
            gap: 10px;
            padding: 10px 14px 10px 10px;
          }
        }

        /* Stack vertically once the row gets too tight */
        @media (max-width: 820px) {
          .step-row {
            flex-direction: column;
            align-items: stretch;
            gap: 4px;
          }
          .step-wrap {
            flex-direction: column;
          }
          .step-card {
            padding: 16px 20px 16px 14px;
          }
          .arrow {
            transform: rotate(90deg);
            padding: 6px 0;
          }
        }

        /* Phones: simplify further */
        @media (max-width: 420px) {
          .step-card {
            flex-direction: column;
            text-align: center;
            gap: 10px;
            padding: 20px 16px;
            border-radius: 20px;
          }
          .step-text p {
            font-size: 12.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .step-card,
          .eyebrow,
          h2,
          .step-wrap,
          .arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}