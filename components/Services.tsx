// components/Services.tsx
"use client";

import type { ReactNode } from "react";

interface ServiceItem {
  title: string;
  desc: string;
  icon: ReactNode;
}

const services: ServiceItem[] = [
  {
    title: "Love & Relationship",
    desc: "Find harmony and true compatibility",
    icon: (
      <path
        d="M12 21s-6.7-4.1-9.1-8C.9 9.8 1.9 6.6 4.9 5.8c2.1-.5 4 .4 6.1 2.6 1.9-2.1 3.9-3.1 6-2.6 3 .8 4 4 2 7.2-2.4 3.9-9 8-9 8z"
        fill="currentColor"
      />
    ),
  },
  {
    title: "Career & Business",
    desc: "Make the right career decisions",
    icon: (
      <>
        <path
          d="M9 7V6a3 3 0 013-3h0a3 3 0 013 3v1"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="3" y="7" width="18" height="13" rx="2.2" fill="currentColor" />
        <rect x="9.6" y="12" width="4.8" height="2.4" rx="0.6" fill="var(--soft-cream-gold, #f6e6bf)" />
      </>
    ),
  },
  {
  title: "Money & Wealth",
  desc: "Attract prosperity and financial growth",
  icon: (
    <>
      <path
        d="M12 2c1 3 3 4 3 7a3 3 0 01-6 0c0-3 2-4 3-7z"
        fill="currentColor"
      />
      <path
        d="M4 13c3-1 5 0 6 2M20 13c-3-1-5 0-6 2"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="18" rx="7" ry="2.2" fill="currentColor" />
    </>
  ),
},
  {
    title: "Family & Home",
    desc: "Peace and happiness in family life",
    icon: (
      <>
        <path
          d="M3 11.5L12 4l9 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 10.5V19a1 1 0 001 1h11a1 1 0 001-1v-8.5"
          fill="currentColor"
        />
        <rect
          x="10.3"
          y="13.5"
          width="3.4"
          height="6.5"
          rx="0.4"
          fill="var(--soft-cream-gold, #f6e6bf)"
        />
      </>
    ),
  },
  {
    title: "Health & Wellness",
    desc: "Better health & a happier you",
    icon: (
      <>
        <path
          d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6a4.6 4.6 0 018.8-1.9A4.6 4.6 0 0120.8 8.6z"
          fill="currentColor"
        />
        <path
          d="M5.5 10.2h2.3l1.3-2.4 1.6 4.6 1.2-2.2h3.4"
          stroke="var(--soft-cream-gold, #f6e6bf)"
          strokeWidth="1.1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Foreign Settlement",
    desc: "Guidance for education & travel opportunities",
    icon: (
      <path
        d="M21 12l-8-3.5V3.8a1.3 1.3 0 00-2.6 0v4.7L2 12v1.6l8.4-2.6v5.2L8 17.6v1.3l4-1 4 1v-1.3l-2.4-1.4v-5.2L21 13.6V12z"
        fill="currentColor"
      />
    ),
  },
];

export default function Services() {
  return (
    <section className="services">
      <div className="services-inner">
        <div className="section-head">
          <h2>What Do You Want Guidance On?</h2>
          <p>Explore our specialized astrology consultation services</p>
        </div>

        <div className="service-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="icon-circle">
                <svg viewBox="0 0 24 24" fill="none">
                  {s.icon}
                </svg>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .services {
          background: var(--cream);
          padding: 72px 6vw;
        }
        .services-inner {
          max-width: 1320px;
          margin: 0 auto;
        }
        .section-head {
          text-align: center;
          margin-bottom: 44px;
        }
        .section-head h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--royal-red);
          font-size: clamp(26px, 2.8vw, 34px);
          margin-bottom: 10px;
        }
        .section-head p {
          color: #6b5a4c;
          font-size: 15px;
        }
        .service-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .service-card {
          position: relative;
          background: #fff;
          border: 1px solid #f0e2c8;
          border-radius: 16px;
          padding: 30px 26px;
          text-align: center;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(216, 172, 65, 0.08), transparent 55%);
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(139, 0, 0, 0.12);
          border-color: var(--gold);
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(150deg, var(--gold, #d8ac41), #c48f2c);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          box-shadow: 0 6px 16px rgba(196, 143, 44, 0.35);
          transition: transform 0.25s ease;
        }
        .service-card:hover .icon-circle {
          transform: scale(1.08) rotate(-4deg);
        }
        .icon-circle svg {
          width: 28px;
          height: 28px;
          color: var(--royal-red);
        }
        .service-card h3 {
          font-family: var(--font-playfair), serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--deep-brown, #2b1c12);
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .service-card p {
          font-size: 13.5px;
          color: #7a6a5c;
          line-height: 1.55;
        }
        @media (min-width: 1001px) {
          .service-grid {
            grid-template-columns: repeat(6, 1fr);
          }
          .service-card {
            padding: 26px 20px;
          }
        }
        @media (max-width: 1000px) and (min-width: 601px) {
          .service-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 600px) {
          .service-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .service-card {
            padding: 22px 18px;
          }
          .icon-circle {
            width: 50px;
            height: 50px;
            margin: 0 auto 14px;
          }
          .icon-circle svg {
            width: 24px;
            height: 24px;
          }
          .service-card h3 {
            font-size: 16px;
          }
        }
        @media (max-width: 380px) {
          .service-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}