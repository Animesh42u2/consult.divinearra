// components/ConsultationIntro.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface ListItem {
  label: string;
  icon: ReactNode;
}

const items: ListItem[] = [
  {
    label: "Your Questions",
    icon: (
      <path
        d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v7A2.5 2.5 0 0117.5 15H10l-4 3.5V15H6.5A2.5 2.5 0 014 12.5v-7z"
        fill="currentColor"
      />
    ),
  },
  {
    label: "Your Kundali",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M12 3.6v16.8M3.6 12h16.8M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1" />
      </>
    ),
  },
  {
    label: "Personal Guidance",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" fill="currentColor" />
        <path d="M5.5 19c0-3.3 2.9-5.7 6.5-5.7s6.5 2.4 6.5 5.7" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Clear Perspective",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.4" fill="currentColor" />
        <path d="M5.5 19c0-3.3 2.9-5.7 6.5-5.7s6.5 2.4 6.5 5.7" fill="currentColor" />
      </>
    ),
  },
];

export default function ConsultationIntro() {
  const [hovered, setHovered] = useState(false);

  const scrollToConsultation = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("consultation")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="consult-intro">
      <div className="ci-inner">
        <div className="ci-text">
          <span className="badge">• Introducing</span>
          <h2>1-On-1 Personalized Consultation</h2>
          <p>
            A dedicated session where your birth chart becomes the center of the
            conversation. Ask your questions and get guidance tailored to your
            unique Kundali.
          </p>
                    <Link
            href="#consultation"
            onClick={scrollToConsultation}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "var(--gold)",
              color: "var(--deep-brown)",
              border: "none",
              borderRadius: "8px",
              padding: "clamp(12px, 3vw, 16px) clamp(20px, 5vw, 28px)",
              fontSize: "clamp(13px, 2vw, 15px)",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: hovered
                ? "0 14px 28px rgba(244, 197, 66, 0.35)"
                : "0 10px 24px rgba(244, 197, 66, 0.25)",
              transform: hovered ? "translateY(-2px)" : "translateY(0)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
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
          </Link>
        </div>

        <div className="ci-right">
          <ul className="ci-list">
            {items.map((it) => (
              <li key={it.label}>
                <span className="icon-ring">
                  <svg viewBox="0 0 24 24" fill="none">
                    {it.icon}
                  </svg>
                </span>
                {it.label}
              </li>
            ))}
          </ul>

          <div className="ci-image">
            <Image
              src="/vedic-astrology-advanced.webp"
              alt="An open astrology chart book beside a lit candle"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 900px) 60vw, 420px"
              style={{ objectFit: "cover" }}
              priority={false}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .consult-intro {
          background: linear-gradient(160deg, var(--maroon) 0%, var(--royal-red) 100%);
          padding: clamp(40px, 6vw, 64px) clamp(16px, 5vw, 6vw);
        }
        .ci-inner {
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: center;
        }
        .badge {
          display: inline-block;
          border: 1px solid rgba(244, 197, 66, 0.5);
          color: var(--gold);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 16px;
        }
        h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--cream);
          font-size: clamp(24px, 3.4vw, 34px);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .ci-text p {
          color: rgba(255, 248, 231, 0.85);
          font-size: clamp(13.5px, 1.6vw, 15px);
          line-height: 1.65;
          max-width: 46ch;
          margin-bottom: 26px;
        }

        /* Right column: compact icon-list beside a larger image */
        .ci-right {
          display: grid;
          grid-template-columns: minmax(120px, 150px) 1fr;
          gap: clamp(16px, 2.5vw, 28px);
          align-items: center;
        }
        .ci-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 2vw, 20px);
        }
        .ci-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 248, 231, 0.9);
          font-size: clamp(12.5px, 1.3vw, 14px);
          font-weight: 600;
          line-height: 1.3;
        }
        .icon-ring {
          flex: 0 0 auto;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1.5px solid var(--gold);
          background: rgba(244, 197, 66, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon-ring svg {
          width: 14px;
          height: 14px;
          color: var(--gold);
        }

        /* Larger image */
        .ci-image {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          min-height: 260px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(244, 197, 66, 0.25);
        }

        /* ---- Responsive breakpoints ---- */
        @media (max-width: 1100px) {
          .ci-right {
            grid-template-columns: minmax(110px, 130px) 1fr;
          }
        }

        @media (max-width: 900px) {
          .ci-inner {
            grid-template-columns: 1fr;
          }
          .ci-right {
            grid-template-columns: 1fr 1.3fr;
          }
          .ci-image {
            aspect-ratio: 1 / 1;
            min-height: 220px;
          }
        }

        @media (max-width: 640px) {
          .ci-right {
            grid-template-columns: 1fr;
          }
          .ci-list {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 14px 18px;
          }
          .ci-list li {
            flex: 1 1 45%;
            font-size: 12.5px;
          }
          .ci-image {
            aspect-ratio: 16 / 9;
            min-height: 200px;
            order: -1;
          }
        }

        @media (max-width: 400px) {
          .ci-list li {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </section>
  );
}