// components/WhatCanWeDiscuss.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface Topic {
  label: string;
  icon: ReactNode;
}

const topics: Topic[] = [
  {
    label: "Career & Finance",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18M12 12v2.5" />
      </>
    ),
  },
  {
    label: "Love & Relationships",
    icon: (
      <path d="M12 20.5s-8-4.7-8-10.3A4.5 4.5 0 0112 7.5a4.5 4.5 0 018 2.7c0 5.6-8 10.3-8 10.3z" />
    ),
  },
  {
    label: "Marriage & Compatibility",
    icon: (
      <>
        <circle cx="9" cy="14.5" r="4.5" />
        <circle cx="15.5" cy="14.5" r="4.5" />
        <path d="M9.5 4.5L11 3l1.5 1.5L11 7z" />
      </>
    ),
  },
  {
    label: "Family & Personal Life",
    icon: (
      <>
        <path d="M3 11l9-7.5 9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M10 20v-5.5a2 2 0 014 0V20" />
      </>
    ),
  },
  {
    label: "Education & Exams",
    icon: (
      <>
        <path d="M12 6.5C9.800 5 6.800 4.500 4 5v13c2.800-.5 5.800 0 8 1.500 2.200-1.500 5.200-2 8-1.500V5c-2.800-.5-5.800 0-8 1.500z" />
        <path d="M12 6.5v13" />
      </>
    ),
  },
  {
    label: "Business & Growth",
    icon: (
      <>
        <path d="M5 20v-4M11 20v-8M17 20V9" />
        <path d="M4 11l5-4 4 2 6-5" />
        <path d="M15 4h4v4" />
      </>
    ),
  },
  {
    label: "Remedies & Spiritual Guidance",
    icon: (
      <>
        <path d="M12 20c-3.200-1.600-5-4.600-5-8.500 2.200 0 4 1.500 5 4 1-2.500 2.800-4 5-4 0 3.900-1.800 6.900-5 8.500z" />
        <path d="M12 15.500c-1.600-2.200-1.600-5.500 0-8.500 1.600 3 1.600 6.300 0 8.500z" />
        <path d="M4 19.500c2.500.8 5 1 8 1s5.500-.2 8-1" />
      </>
    ),
  },
];

export default function WhatCanWeDiscuss() {
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`discuss ${inView ? "is-in" : ""}`}>
      <div className="discuss-inner">
        <h2 className="reveal" style={{ "--i": 0 } as CSSProperties}>
          What Can We Discuss?
        </h2>
        <p className="sub reveal" style={{ "--i": 1 } as CSSProperties}>
          Choose the areas that matter most to you.
        </p>

        <ul className="topic-grid">
          {topics.map((t, i) => (
            <li
              key={t.label}
              className="topic-card"
              style={{ "--i": 2 + i } as CSSProperties}
            >
              <span className="topic-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {t.icon}
                </svg>
              </span>
              <span className="topic-label">{t.label}</span>
            </li>
          ))}
        </ul>

        <div className="topic-cta reveal" style={{ "--i": 9 } as CSSProperties}>
          <Link href="/checkout" className="cta-btn">
            Book Your Consultation
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
        .discuss {
          position: relative;
          background: linear-gradient(160deg, var(--maroon) 0%, var(--royal-red) 100%);
          padding: clamp(40px, 6vw, 80px) clamp(20px, 6vw, 6vw);
          overflow: hidden;
        }
        .discuss-inner {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ---------- Reveal ---------- */
        .reveal,
        .topic-card {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i, 0) * 80ms);
        }
        .is-in .reveal,
        .is-in .topic-card {
          opacity: 1;
          transform: none;
        }

        /* ---------- Heading ---------- */
        h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--cream);
          font-size: clamp(26px, 4vw, 40px);
          line-height: 1.2;
          margin: 0 0 10px;
        }
        .sub {
          color: rgba(255, 248, 231, 0.85);
          font-weight: 500;
          font-size: clamp(14px, 1.6vw, 17px);
          margin: 0 0 clamp(22px, 3.4vw, 36px);
        }

        /* ---------- Grid ---------- */
        .topic-grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 1.8vw, 20px);
        }
        .topic-card {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(244, 197, 66, 0.3);
          border-radius: 16px;
          padding: clamp(20px, 2.6vw, 32px) clamp(12px, 1.6vw, 20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 1.6vw, 16px);
          text-align: center;
          min-height: clamp(132px, 14vw, 172px);
          cursor: default;
        }
        .is-in .topic-card {
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease,
            background 0.35s ease;
          transition-delay: calc(var(--i, 0) * 80ms), 0s, 0s, 0s, 0s;
        }
        .is-in .topic-card:hover {
          transform: translateY(-6px);
          border-color: var(--gold);
          background: var(--soft-cream-gold);
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.35);
        }

        .topic-icon {
          width: clamp(48px, 5vw, 58px);
          height: clamp(48px, 5vw, 58px);
          border-radius: 50%;
          background: var(--gold);
          border: 1px solid var(--gold);
          color: var(--deep-brown);
          box-shadow: 0 8px 18px rgba(244, 197, 66, 0.22);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 0.35s ease, color 0.35s ease,
            box-shadow 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .topic-icon svg {
          width: 55%;
          height: 55%;
          transition: stroke-width 0.35s ease;
        }
        .topic-card:hover .topic-icon svg {
          stroke-width: 2.1;
        }
        .topic-card:hover .topic-icon {
          background: var(--maroon, #5c0a0a);
          border-color: var(--maroon, #5c0a0a);
          color: var(--gold);
          box-shadow: 0 10px 22px rgba(92, 10, 10, 0.35);
          transform: scale(1.08) rotate(-5deg);
        }
        .topic-label {
          color: var(--cream);
          font-size: clamp(13px, 1.4vw, 15.5px);
          font-weight: 600;
          line-height: 1.35;
          max-width: 14ch;
          transition: color 0.35s ease;
        }
        .topic-card:hover .topic-label {
          color: var(--deep-brown);
        }

        /* ---------- CTA button ---------- */
        .topic-cta {
          display: flex;
          justify-content: center;
          margin-top: clamp(26px, 4vw, 44px);
        }
        /* Link renders its own <a>, so the class must be global (scoped under .discuss) */
        .discuss :global(.cta-btn) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 10px);
          background: var(--gold);
          color: var(--deep-brown);
          font-weight: 700;
          font-size: clamp(14px, 3.6vw, 16px);
          line-height: 1;
          padding: clamp(14px, 3.6vw, 17px) clamp(22px, 6vw, 34px);
          border-radius: 10px;
          text-decoration: none;
          text-align: center;
          max-width: 100%;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(244, 197, 66, 0.28);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .discuss :global(.cta-btn:hover) {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(244, 197, 66, 0.4);
        }
        .discuss :global(.cta-btn:focus-visible) {
          outline: 3px solid var(--cream);
          outline-offset: 3px;
        }
        .discuss :global(.cta-btn svg) {
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .discuss :global(.cta-btn:hover svg) {
          transform: translateX(3px);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .topic-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .topic-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .topic-card:last-child {
            grid-column: 1 / -1;
          }
          .topic-label {
            max-width: none;
          }
        }
        @media (max-width: 380px) {
          .topic-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .topic-card,
          .topic-icon,
          .discuss :global(.cta-btn),
          .discuss :global(.cta-btn svg) {
            transition: none !important;
            transition-delay: 0s !important;
          }
        }
      `}</style>
    </section>
  );
}