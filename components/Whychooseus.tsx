// components/WhyChooseUs.tsx
"use client";

import type { ReactNode } from "react";
import Image from "next/image";

interface WhyPoint {
  title: string;
  desc: string;
  icon: ReactNode;
}

const points: WhyPoint[] = [
  {
    title: "Experienced Astrologers",
    desc: "Years of deep knowledge and real experience",
    icon: (
      <path
        d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Personalized Solutions",
    desc: "Guidance tailored to your unique birth chart",
    icon: (
      <path
        d="M12 2l7 3v6c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V5l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    ),
  },
  {
    title: "Trusted by Thousands",
    desc: "10,000+ satisfied clients across the world",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15 14.2c2.6.4 4.3 2.2 4.3 4.8" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
  {
    title: "Vedic & Modern Approach",
    desc: "Traditional wisdom with practical solutions",
    icon: (
      <path
        d="M12 4c1.5 3 1.5 5-1 7 2.5-1 4 0 5 2-3-1-4.3.3-4.5 3 1.8-1.2 3.3-1 4.5 1-3-.3-4.2 1-5.5 3-1.3-2-2.5-3.3-5.5-3 1.2-2 2.7-2.2 4.5-1-.2-2.7-1.5-4-4.5-3 1-2 2.5-3 5-2-2.5-2-2.5-4-1-7z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why">
      <div className="why-inner">
        <div className="why-head">
          <span className="vel-wrap">
            <Image src="/vel.png" alt="" width={70} height={26} className="vel" />
          </span>
          <h2>Why Choose Divine Arra?</h2>
          <span className="vel-wrap right">
            <Image src="/vel.png" alt="" width={70} height={26} className="vel flip" />
          </span>
        </div>

        <div className="why-grid">
          {points.map((p) => (
            <div className="why-item" key={p.title}>
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  {p.icon}
                </svg>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why {
          position: relative;
          background: linear-gradient(160deg, var(--maroon) 0%, var(--royal-red) 100%);
          padding: 76px 6vw;
          overflow: hidden;
        }
        .why-inner {
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          position: relative;
        }
        .why-head {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 52px;
          flex-wrap: nowrap;
        }
        .vel-wrap {
          width: 70px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
          flex-shrink: 0;
        }
        .why-head :global(.vel) {
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        .why-head :global(.flip) {
          transform: scaleX(-1);
        }
        .why-head h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--cream);
          font-size: clamp(18px, 2.8vw, 32px);
          white-space: nowrap;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .why-item {
          color: var(--cream);
        }
        .why-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 18px;
          border-radius: 50%;
          border: 1.5px solid rgba(244, 197, 66, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .why-icon svg {
          width: 26px;
          height: 26px;
          color: var(--gold);
        }
        .why-item h3 {
          font-family: var(--font-playfair), serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .why-item p {
          font-size: 13.5px;
          color: rgba(255, 248, 231, 0.75);
          line-height: 1.55;
          max-width: 220px;
          margin: 0 auto;
        }
        @media (max-width: 860px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 40px;
          }
        }
        @media (max-width: 480px) {
          .why-head {
            gap: 8px;
          }
          .vel-wrap {
            width: 32px;
            height: 14px;
          }
          .why-head h2 {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
}