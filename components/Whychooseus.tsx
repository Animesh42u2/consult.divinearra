// components/WhyChooseUs.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface Pillar {
  title: string;
  description: string;
  icon: ReactNode;
}

const pillars: Pillar[] = [
  {
    title: "Personalized",
    description: "Your chart, your focus.",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </>
    ),
  },
  {
    title: "Authentic",
    description: "Based on classical Vedic principles.",
    icon: (
      <>
        <path d="M12 20c-3.2-1.6-5-4.6-5-8.5 2.2 0 4 1.5 5 4 1-2.5 2.8-4 5-4 0 3.9-1.8 6.9-5 8.5z" />
        <path d="M12 15.5c-1.6-2.2-1.6-5.5 0-8.5 1.6 3 1.6 6.3 0 8.5z" />
        <path d="M4 19.5c2.5.8 5 1 8 1s5.5-.2 8-1" />
      </>
    ),
  },
  {
    title: "Practical",
    description: "Guidance & remedies where relevant.",
    icon: (
      <>
        <path d="M12 20v-9" />
        <path d="M12 11c0-3-2-5-5.5-5 0 3 2 5 5.5 5z" />
        <path d="M12 13c0-3 2-5 5.5-5 0 3-2 5-5.5 5z" />
        <path d="M7 20h10" />
      </>
    ),
  },
  {
    title: "Transparent",
    description: "No false promises, just honest guidance.",
    icon: (
      <>
        <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2.2 2.2L15.5 10" />
      </>
    ),
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`why ${inView ? "is-in" : ""}`}>
      <div className="why-inner">
        <div className="why-copy">
          <h2 className="reveal" style={{ "--i": 0 } as CSSProperties}>
            Why Choose Divine Arra ?
          </h2>
          <p className="tagline reveal" style={{ "--i": 1 } as CSSProperties}>
            Traditional Wisdom. Personalized Interpretation.
          </p>
          <p className="desc reveal" style={{ "--i": 2 } as CSSProperties}>
            At Divine Arra, astrology is more than predictions — it&apos;s a
            traditional system of guidance and self-understanding. Your
            consultation is based on your unique birth chart, not a
            one-size-fits-all reading.
          </p>
        </div>

        <ul className="pillars">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="pillar"
              style={{ "--i": 3 + i } as CSSProperties}
            >
              <span className="pillar-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {p.icon}
                </svg>
              </span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>

        <div className="reveal" style={{ "--i": 7 } as CSSProperties}>
          <Link href="https://www.divinearra.com/" className="why-btn">
            Learn More About Us
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .why {
          background: var(--cream);
          border-top: 1px solid rgba(43, 22, 15, 0.08);
          border-bottom: 1px solid rgba(43, 22, 15, 0.08);
          padding: clamp(40px, 6vw, 72px) clamp(20px, 6vw, 6vw);
          overflow-x: hidden;
        }
        .why-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(28px, 4vw, 48px);
        }

        /* ---------- Reveal ---------- */
        .reveal,
        .pillar {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i, 0) * 90ms);
        }
        .is-in .reveal,
        .is-in .pillar {
          opacity: 1;
          transform: none;
        }

        /* ---------- Copy ---------- */
        .why-copy {
          min-width: 0;
          width: 100%;
          text-align: center;
        }
        h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 800;
          color: var(--royal-red);
          font-size: clamp(24px, 3.2vw, 34px);
          line-height: 1.2;
          margin: 0 0 10px;
        }
        .tagline {
          color: var(--deep-brown);
          font-weight: 600;
          font-size: clamp(14px, 1.5vw, 16px);
          margin: 0 0 12px;
        }
        .desc {
          color: var(--deep-brown);
          font-size: clamp(13px, 1.3vw, 14.5px);
          line-height: 1.7;
          margin: 0 auto;
          max-width: 100ch;
          text-wrap: balance;
        }
        .is-in .desc {
          opacity: 0.78;
        }

        /* Link renders its own <a>, so the class must be global (scoped under .why) */
        .why :global(.why-btn) {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: var(--deep-brown);
          font-weight: 700;
          font-size: clamp(13px, 1.4vw, 14.5px);
          line-height: 1;
          padding: clamp(12px, 1.6vw, 15px) clamp(20px, 2.4vw, 26px);
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 10px 22px rgba(244, 197, 66, 0.35);
          transition: transform 0.25s ease, box-shadow 0.25s ease,
            background 0.25s ease, color 0.25s ease;
        }
        .why :global(.why-btn:hover) {
          background: var(--royal-red);
          color: var(--cream);
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(139, 0, 0, 0.3);
        }
        .why :global(.why-btn:focus-visible) {
          outline: 3px solid var(--royal-red);
          outline-offset: 3px;
        }
        .why :global(.why-btn svg) {
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .why :global(.why-btn:hover svg) {
          transform: translateX(3px);
        }

        /* ---------- Pillars ---------- */
        .pillars {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch;
          width: 100%;
          max-width: 1000px;
        }
        .pillar {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 4px clamp(10px, 1.6vw, 22px);
          cursor: default;
        }
        .pillar + .pillar {
          border-left: 1px solid rgba(43, 22, 15, 0.15);
        }
        .pillar-icon {
          width: clamp(58px, 6vw, 72px);
          height: clamp(58px, 6vw, 72px);
          border-radius: 50%;
          background: var(--maroon, #5c0a0a);
          border: 1px solid var(--maroon, #5c0a0a);
          color: var(--gold);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 10px 22px rgba(92, 10, 10, 0.3);
          transition: background 0.35s ease, color 0.35s ease,
            border-color 0.35s ease,
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .pillar-icon svg {
          width: 46%;
          height: 46%;
        }
        .pillar:hover .pillar-icon {
          background: var(--soft-cream-gold);
          border-color: rgba(244, 197, 66, 0.6);
          color: var(--royal-red);
          transform: translateY(-4px) scale(1.06);
          box-shadow: 0 12px 24px rgba(43, 22, 15, 0.12);
        }
        h3 {
          font-size: clamp(14px, 1.5vw, 16px);
          font-weight: 700;
          color: var(--deep-brown);
          margin: 0 0 6px;
        }
        .pillar p {
          color: #6b5a4c;
          font-size: clamp(12.5px, 1.2vw, 14px);
          line-height: 1.55;
          margin: 0;
          max-width: 18ch;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 1024px) {
          .why-inner {
            grid-template-columns: 1fr;
          }
          .desc {
            max-width: 60ch;
          }
        }
        @media (max-width: 640px) {
          .pillars {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            row-gap: 28px;
          }
          .pillar + .pillar {
            border-left: none;
          }
          .pillar:nth-child(even) {
            border-left: 1px solid rgba(43, 22, 15, 0.15);
          }
        }
        @media (max-width: 380px) {
          .pillars {
            grid-template-columns: 1fr;
          }
          .pillar:nth-child(even) {
            border-left: none;
          }
          .pillar p {
            max-width: 26ch;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .pillar,
          .pillar-icon,
          .why :global(.why-btn),
          .why :global(.why-btn svg) {
            transition: none !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </section>
  );
}