// components/FeelingUncertain.tsx
"use client";

import type { ReactNode } from "react";

interface FocusItem {
  label: string;
  icon: ReactNode;
}

const focusAreas: FocusItem[] = [
  {
    label: "Career Growth",
    icon: (
      <path
        d="M12 21s-6.7-4.1-9.1-8C.9 9.8 1.9 6.6 4.9 5.8c2.1-.5 4 .4 6.1 2.6 1.9-2.1 3.9-3.1 6-2.6 3 .8 4 4 2 7.2-2.4 3.9-9 8-9 8z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "Relationships & Marriage",
    icon: (
      <>
        <rect x="4.5" y="3.5" width="15" height="17" rx="1.6" fill="currentColor" />
        <path
          d="M8 9l2.4 3 2.2-2.6L16 12"
          stroke="var(--soft-cream-gold, #fff1c7)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    label: "Finance & Wealth",
    icon: (
      <>
        <rect x="4" y="14" width="3.2" height="6" rx="0.6" fill="currentColor" />
        <rect x="10.4" y="9.5" width="3.2" height="10.5" rx="0.6" fill="currentColor" />
        <rect x="16.8" y="5.5" width="3.2" height="14.5" rx="0.6" fill="currentColor" />
        <path
          d="M4 9.5l5-3.5 4 2 6-4"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    label: "Important Life Decisions",
    icon: (
      <>
        <circle cx="8" cy="7" r="2.3" fill="currentColor" />
        <circle cx="16" cy="7" r="2.3" fill="currentColor" />
        <path
          d="M3.5 19c.4-3 2.3-5 4.5-5s3.6 1.4 4 3"
          fill="currentColor"
        />
        <path
          d="M12.5 17c.4-2.4 2-4 3.9-4 2.1 0 3.8 1.9 4.1 4.6"
          fill="currentColor"
        />
      </>
    ),
  },
];

export default function FeelingUncertain() {
  return (
    <section className="feeling-uncertain">
      <div className="fu-inner">
        <div className="fu-text">
          <p className="eyebrow">Feeling Uncertain?</p>
          <h2>
            When Life Feels Confusing,
            <br />
            You Need Personal Guidance.
          </h2>
          <p className="sub">
            Career, marriage, relationships, finance or an important decision — get
            clarity through a personalized interpretation of your Kundali.
          </p>
        </div>

        <div className="fu-cards">
          {focusAreas.map((f) => (
            <div className="fu-card" key={f.label}>
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none">
                  {f.icon}
                </svg>
              </div>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .feeling-uncertain {
          background: var(--cream);
          padding: clamp(40px, 6vw, 64px) clamp(16px, 5vw, 6vw);
        }
        .fu-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: clamp(24px, 4vw, 40px);
          align-items: center;
        }
        .eyebrow {
          color: var(--royal-red);
          font-weight: 700;
          letter-spacing: 0.06em;
          font-size: clamp(12px, 1.4vw, 13px);
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--deep-brown, #2b160f);
          font-size: clamp(24px, 3.4vw, 34px);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .sub {
          color: #6b5a4c;
          font-size: clamp(13.5px, 1.6vw, 15px);
          line-height: 1.6;
          max-width: 52ch;
        }
        .fu-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(10px, 1.6vw, 14px);
        }
        .fu-card {
          background: #fffdf9;
          border: 1px solid #f0e2c8;
          border-radius: 16px;
          padding: clamp(16px, 2vw, 20px) clamp(10px, 1.4vw, 14px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .fu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 28px rgba(139, 0, 0, 0.1);
          border-color: var(--gold);
        }
        .icon-circle {
          width: clamp(44px, 5vw, 52px);
          height: clamp(44px, 5vw, 52px);
          border-radius: 50%;
          background: linear-gradient(150deg, var(--gold, #f4c542), #d8ac41);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 14px rgba(196, 143, 44, 0.3);
        }
        .icon-circle svg {
          width: 22px;
          height: 22px;
          color: var(--royal-red);
        }
        .fu-card span {
          font-size: clamp(12px, 1.4vw, 13.5px);
          font-weight: 700;
          color: var(--deep-brown, #2b160f);
          line-height: 1.3;
        }
        @media (max-width: 980px) {
          .fu-inner {
            grid-template-columns: 1fr;
          }
          .fu-cards {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 560px) {
          .fu-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}