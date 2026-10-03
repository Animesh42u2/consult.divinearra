// components/AboutAstrologer.tsx
"use client";

const checklist: string[] = [
  "In-depth Kundli Analysis",
  "Personalized Remedies",
  "Clear and Practical Guidance",
  "Confidential & Judgment Free",
];

export default function AboutAstrologer() {
  return (
    <section className="about">
      <div className="about-inner">
        <div className="photo-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/personal.png" alt="Portrait of the astrologer" />
        </div>

        <div className="about-copy">
          <span className="eyebrow">Meet Your Astrologer</span>
          <h2>Get Guidance from a Trusted Astrologer</h2>
          <p className="role">Founder &amp; Astrologer</p>
          <p className="desc">
            With years of experience in Vedic Astrology, we help you uncover
            the right path and make confident decisions in life.
          </p>

          <ul className="checklist">
            {checklist.map((item) => (
              <li key={item}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M8 12.5l2.5 2.5L16 9.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a href="https://www.divinearra.com/about" className="know-more">
            Know More About Me
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="quote-card">
          <span className="quote-mandala" aria-hidden="true" />
          <div className="quote-content">
            <div className="quote-mark">&ldquo;</div>
            <p>
              Your Kundali is unique. Your questions are unique. Your guidance
              should be unique too.
            </p>
            <div className="quote-attr">— Team Divine Arra</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          position: relative;
          background: linear-gradient(160deg, var(--maroon) 0%, var(--royal-red) 100%);
          padding: clamp(40px, 6vw, 64px) clamp(20px, 6vw, 6vw);
          overflow: hidden;
        }
        .about-inner {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.8fr 1.3fr 0.9fr;
          gap: clamp(24px, 3vw, 36px);
          align-items: stretch;
        }
        .photo-wrap {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(244, 197, 66, 0.35);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.35);
          aspect-ratio: 3 / 4;
          max-height: clamp(260px, 32vw, 380px);
          margin: 0 auto;
          width: 100%;
        }
        .photo-wrap :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .about-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .eyebrow {
          color: var(--gold);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: clamp(11px, 1.2vw, 13px);
          margin-bottom: 10px;
        }
        .about-copy h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--cream);
          font-size: clamp(22px, 2.6vw, 30px);
          line-height: 1.25;
          margin-bottom: 6px;
        }
        .role {
          color: rgba(255, 248, 231, 0.7);
          font-size: clamp(12.5px, 1.3vw, 14px);
          font-weight: 600;
          margin-bottom: 14px;
        }
        .desc {
          color: rgba(255, 248, 231, 0.85);
          font-size: clamp(13.5px, 1.4vw, 15px);
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 440px;
        }
        .checklist {
          list-style: none;
          margin-bottom: 24px;
          padding: 0;
        }
        .checklist li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(13px, 1.3vw, 14.5px);
          font-weight: 500;
          color: var(--cream);
          margin-bottom: 12px;
        }
        .checklist svg {
          width: clamp(16px, 1.6vw, 18px);
          height: clamp(16px, 1.6vw, 18px);
          color: var(--gold);
          flex-shrink: 0;
        }
        .know-more {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          background: var(--gold);
          color: var(--deep-brown);
          border: none;
          text-decoration: none;
          border-radius: 999px;
          padding: clamp(11px, 2.4vw, 14px) clamp(20px, 4vw, 26px);
          font-size: clamp(13px, 1.6vw, 14.5px);
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(244, 197, 66, 0.28);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .know-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(244, 197, 66, 0.4);
        }
        .quote-card {
          position: relative;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(244, 197, 66, 0.3);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 100%;
        }
        .quote-mandala {
          position: absolute;
          inset: 0;
          background-color: var(--gold);
          opacity: 0.22;
          -webkit-mask-image: url("/designn.png");
          mask-image: url("/designn.png");
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-position: center;
          mask-position: center;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          pointer-events: none;
        }
        .quote-content {
          position: relative;
          z-index: 1;
          padding: clamp(24px, 3.5vw, 32px) clamp(18px, 3vw, 26px);
        }
        .quote-mark {
          font-family: var(--font-playfair), serif;
          font-size: clamp(44px, 5vw, 58px);
          color: var(--gold);
          line-height: 1;
          margin-bottom: 8px;
        }
        .quote-card p {
          font-family: var(--font-playfair), serif;
          font-style: italic;
          font-size: clamp(14.5px, 1.5vw, 16.5px);
          color: var(--cream);
          line-height: 1.55;
          margin-bottom: 16px;
        }
        .quote-attr {
          font-size: clamp(12px, 1.1vw, 13px);
          color: rgba(255, 248, 231, 0.65);
        }
        @media (max-width: 980px) {
          .about-inner {
            grid-template-columns: 1fr;
            max-width: 520px;
          }
          .photo-wrap {
            max-height: 340px;
            max-width: 340px;
          }
          .about-copy {
            text-align: center;
            align-items: center;
          }
          .desc {
            max-width: 100%;
          }
          .checklist {
            display: inline-block;
            text-align: left;
          }
          .know-more {
            align-self: center;
          }
        }
        @media (max-width: 480px) {
          .photo-wrap {
            max-width: 280px;
            max-height: 360px;
          }
        }
      `}</style>
    </section>
  );
}