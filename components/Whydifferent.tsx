// components/WhyDifferent.tsx
"use client";

import type { ReactNode } from "react";

interface FeatureItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

const features: FeatureItem[] = [
  {
    title: "100% Personalized",
    desc: "Based on your unique birth chart, not generic horoscopes.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M12 6l2.2 3.8L18 12l-3.8 2.2L12 18l-2.2-3.8L6 12l3.8-2.2L12 6z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    title: "Your Questions, Your Session",
    desc: "Discuss the areas that matter most to you.",
    icon: (
      <>
        <path
          d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v7A2.5 2.5 0 0117.5 15H10l-4 3.5V15H6.5A2.5 2.5 0 014 12.5v-7z"
          fill="currentColor"
        />
        <circle cx="9" cy="9.3" r="1" fill="var(--soft-cream-gold, #f6e6bf)" />
        <circle cx="12.5" cy="9.3" r="1" fill="var(--soft-cream-gold, #f6e6bf)" />
        <circle cx="16" cy="9.3" r="1" fill="var(--soft-cream-gold, #f6e6bf)" />
      </>
    ),
  },
  {
    title: "Traditional Vedic Approach",
    desc: "Rooted in authentic astrological principles.",
    icon: (
      <path
        d="M12 21c-4-2.5-6-6-6-9.5C6 8 8.5 5.5 12 3c3.5 2.5 6 5 6 8.5 0 3.5-2 7-6 9.5zm0-3.2c2.4-1.8 3.6-3.8 3.6-6C15.6 9.6 14 7.7 12 6c-2 1.7-3.6 3.6-3.6 5.8 0 2.2 1.2 4.2 3.6 6z"
        fill="currentColor"
      />
    ),
  },
  {
    title: "Private & Confidential",
    desc: "Your information and consultation are always kept secure.",
    icon: (
      <>
        <rect x="5.5" y="10.5" width="13" height="9.5" rx="2" fill="currentColor" />
        <path
          d="M8.2 10.5V8a3.8 3.8 0 017.6 0v2.5"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="12" cy="14.6" r="1.3" fill="var(--soft-cream-gold, #f6e6bf)" />
      </>
    ),
  },
];

export default function WhyDifferent() {
  return (
    <section className="why-different">
      <div className="wd-inner">
        <p className="eyebrow">What Makes It Different?</p>
        <h2>A Truly Personalized Experience</h2>

        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none">
                  {f.icon}
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-different {
          background: var(--cream);
          padding: 64px 6vw;
        }
        .wd-inner {
          max-width: 1160px;
          margin: 0 auto;
        }
        .eyebrow {
          text-align: center;
          color: var(--royal-red);
          font-weight: 700;
          letter-spacing: 0.08em;
          font-size: 13px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        h2 {
          text-align: center;
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--deep-brown, #2b1c12);
          font-size: clamp(24px, 3vw, 32px);
          margin-bottom: 40px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .feature-card {
          background: #fffdf9;
          border: 1px solid #f0e2c8;
          border-radius: 16px;
          padding: 28px 22px;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(139, 0, 0, 0.1);
          border-color: var(--gold);
        }
        .icon-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(150deg, var(--gold, #d8ac41), #c48f2c);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          box-shadow: 0 6px 16px rgba(196, 143, 44, 0.3);
        }
        .icon-circle svg {
          width: 26px;
          height: 26px;
          color: var(--royal-red);
        }
        .feature-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--deep-brown, #2b1c12);
          margin-bottom: 8px;
          line-height: 1.35;
        }
        .feature-card p {
          font-size: 13.5px;
          color: #7a6a5c;
          line-height: 1.55;
        }
        @media (max-width: 900px) {
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}