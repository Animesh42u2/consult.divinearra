// components/FeelingUncertain.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface Question {
  text: string;
  icon: ReactNode;
}

const leftQuestions: Question[] = [
  {
    text: "Which career direction is right for me ?",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
      </>
    ),
  },
  {
    text: "When will I get married ?",
    icon: (
      <>
        <circle cx="9" cy="14" r="4.5" />
        <circle cx="15" cy="14" r="4.5" />
        <path d="M10 4.5l2-1.500 2 1.500-2 2z" />
      </>
    ),
  },
  {
    text: "Will my finances improve ?",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.500 9.200C14.100 8.400 13.200 8 12 8c-1.400 0-2.500.7-2.500 1.800S10.500 11.300 12 11.700s2.500.8 2.500 1.900S13.400 16 12 16c-1.200 0-2.100-.4-2.500-1.200M12 6v2M12 16v2" />
      </>
    ),
  },
  {
    text: "What does my current dasha indicate ?",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
];

const rightQuestions: Question[] = [
  {
    text: "Is this the right time for a big decision ?",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.500 8.500l-2 5-5 2 2-5z" />
      </>
    ),
  },
  {
    text: "Why do I face repeated delays ?",
    icon: <path d="M7 3h10M7 21h10M8 3v3.500L12 12l-4 5.500V21M16 3v3.500L12 12l4 5.500V21" />,
  },
  {
    text: "What does my chart say about love and relationships ?",
    icon: (
      <path d="M12 20.500s-8-4.700-8-10.300A4.500 4.500 0 0112 7.500a4.500 4.500 0 018 2.700c0 5.600-8 10.300-8 10.300z" />
    ),
  },
  {
    text: "How can I overcome challenges and obstacles ?",
    icon: (
      <>
        <path d="M3 20l6-10 4 6 2-3 6 7z" />
        <path d="M9 10V4l4 1.500L9 7" />
      </>
    ),
  },
];

export default function FeelingUncertain() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
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
    <section ref={ref} className={`feeling-uncertain ${inView ? "is-in" : ""}`}>
      <div className="fu-inner">
        <h2 className="reveal" style={{ "--i": 0 } as CSSProperties}>
          Feeling Uncertain About What Comes Next ?
        </h2>
        <p className="sub reveal" style={{ "--i": 1 } as CSSProperties}>
          You&apos;re not alone. Many people have the same questions...
        </p>

        <div className="fu-columns">
          <ul className="fu-list">
            {leftQuestions.map((item, i) => (
              <li
                key={item.text}
                className="fu-item"
                style={{ "--i": 2 + i } as CSSProperties}
              >
                <span className="icon icon--red">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </span>
                <span className="q">{item.text}</span>
              </li>
            ))}
          </ul>

          <ul className="fu-list">
            {rightQuestions.map((item, i) => (
              <li
                key={item.text}
                className="fu-item"
                style={{ "--i": 2 + i } as CSSProperties}
              >
                <span className="icon icon--red">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </svg>
                </span>
                <span className="q">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fu-callout reveal" style={{ "--i": 7 } as CSSProperties}>
          <span className="callout-icon-wrap">
            <svg
              className="callout-icon"
              viewBox="0 0 48 48"
              width="40"
              height="40"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="flame"
                d="M24 6c4 5 6 9 6 13s-2.700 7-6 7-6-3-6-7 2-8 6-13z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="19" r="1.8" fill="currentColor" />
              <path
                d="M8 32c5 0 9 2 16 2s11-2 16-2M12 38c4 2 8 3 12 3s8-1 12-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p>
            Instead of relying on generic predictions,{" "}
            <strong>understand what your own birth chart indicates.</strong>
          </p>
        </div>
      </div>

      <style jsx>{`
        .feeling-uncertain {
          position: relative;
          background: var(--cream);
          padding: clamp(44px, 7vw, 88px) clamp(16px, 5vw, 6vw);
          overflow: hidden;
        }
        .fu-inner {
          position: relative;
          max-width: 1040px;
          margin: 0 auto;
        }

        /* ---------- Reveal ---------- */
        .reveal,
        .fu-item {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: calc(var(--i, 0) * 90ms);
        }
        .is-in .reveal,
        .is-in .fu-item {
          opacity: 1;
          transform: none;
        }

        /* ---------- Heading ---------- */
        h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 800;
          color: var(--royal-red);
          font-size: clamp(22px, 3.6vw, 40px);
          line-height: 1.15;
          text-align: center;
          margin: 0 0 14px;
          padding-bottom: 16px;
          position: relative;
        }
        h2::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          height: 3px;
          width: 0;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--royal-red), var(--gold, #f4c542));
          transition: width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s;
        }
        .is-in h2::after {
          width: clamp(64px, 9vw, 110px);
        }
        .sub {
          color: #6b5a4c;
          text-align: center;
          font-weight: 500;
          font-size: clamp(14px, 1.7vw, 18px);
          margin: 0 0 clamp(24px, 3.4vw, 36px);
        }

        /* ---------- Questions ---------- */
        .fu-columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(12px, 1.8vw, 18px);
          margin-bottom: clamp(24px, 3.4vw, 34px);
        }
        .fu-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-auto-rows: 1fr;
          gap: clamp(12px, 1.8vw, 18px);
        }
        .fu-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fffdf9;
          border: 1px solid #f0e2c8;
          border-radius: 14px;
          padding: clamp(12px, 1.6vw, 16px) clamp(14px, 2vw, 20px);
          color: #6b5a4c;
          font-size: clamp(13.5px, 1.45vw, 16px);
          line-height: 1.45;
        }
        .is-in .fu-item {
          transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.35s ease, box-shadow 0.35s ease,
            border-color 0.35s ease, color 0.35s ease;
          transition-delay: calc(var(--i, 0) * 90ms), 0s, 0s, 0s, 0s;
        }
        .is-in .fu-item:hover {
          transform: translateX(6px);
          border-color: var(--gold, #f4c542);
          box-shadow: 0 10px 22px rgba(139, 0, 0, 0.08);
          color: var(--deep-brown, #2b160f);
        }
        .icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .icon svg {
          width: 20px;
          height: 20px;
        }
        .icon--red {
          background: var(--royal-red);
          color: var(--gold, #f4c542);
        }
        .icon--gold {
          background: linear-gradient(150deg, var(--gold, #f4c542), #d8ac41);
          color: var(--royal-red);
        }
        .fu-item:hover .icon {
          transform: scale(1.1) rotate(-6deg);
        }
        .q {
          min-width: 0;
        }

        /* ---------- Callout ---------- */
        .fu-callout {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(14px, 2.4vw, 24px);
          background: var(--soft-cream-gold, #fff1c7);
          border: 1px solid #f0e2c8;
          border-radius: 18px;
          padding: clamp(16px, 2.4vw, 24px) clamp(18px, 3vw, 32px);
        }
        .callout-icon-wrap {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #fffdf9;
          border: 1px solid #f0e2c8;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--royal-red);
        }
        .flame {
          transform-origin: 24px 26px;
          animation: flicker 3.2s ease-in-out infinite;
        }
        @keyframes flicker {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          30% {
            transform: scale(1.05, 1.1) rotate(-2deg);
          }
          60% {
            transform: scale(0.97, 1.03) rotate(2deg);
          }
        }
        .fu-callout p {
          margin: 0;
          color: var(--royal-red);
          font-size: clamp(13px, 1.5vw, 17px);
          line-height: 1.6;
          text-align: center;
        }
        .fu-callout strong {
          font-weight: 700;
          color: var(--deep-brown, #2b160f);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 720px) {
          .fu-columns {
            grid-template-columns: 1fr;
          }
          .fu-list {
            grid-auto-rows: auto;
          }
          .fu-callout p br {
            display: none;
          }
        }
        @media (max-width: 420px) {
          .fu-callout {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .icon {
            width: 36px;
            height: 36px;
          }
          .icon svg {
            width: 18px;
            height: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .fu-item,
          h2::after,
          .icon {
            transition: none !important;
            transition-delay: 0s !important;
          }
          .flame {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}