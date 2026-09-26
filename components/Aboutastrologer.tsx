// components/AboutAstrologer.tsx
// Swap the <img> src for your real photo. If you'd rather use next/image,
// add the image host to images.remotePatterns in next.config.js.
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
          <img
            src="/baba.jpg"
            alt="Astrologer portrait"
          />
        </div>

        <div className="about-copy">
          <h2>Get Guidance from a Trusted Astrologer</h2>
          <p>
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

          <div className="signoff">
            <em>
              Astrology is not about fear,
              <br />
              It&apos;s about finding the right direction.
            </em>
          </div>
        </div>

        <div className="quote-card">
          <div className="quote-mark">&ldquo;</div>
          <p>
            When you understand the energies around you, life becomes
            clearer and more peaceful.
          </p>
          <div className="quote-attr">— Team Divine Arra</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="" className="quote-logo" />
        </div>
      </div>

      <style jsx>{`
        .about {
          background: var(--cream);
          padding: clamp(48px, 8vw, 80px) clamp(20px, 6vw, 6vw);
        }
        .about-inner {
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
          background: #e9ddc4;
          border: 1px solid rgba(197, 155, 60, 0.35);
          box-shadow: 0 10px 30px rgba(122, 30, 30, 0.12);
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
        .about-copy h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--royal-red);
          font-size: clamp(24px, 2.6vw, 32px);
          line-height: 1.25;
          margin-bottom: 16px;
        }
        .about-copy > p {
          color: #6b5a4c;
          font-size: clamp(13.5px, 1.4vw, 15px);
          line-height: 1.7;
          margin-bottom: 22px;
          max-width: 440px;
        }
        .checklist {
          list-style: none;
          margin-bottom: 26px;
          padding: 0;
        }
        .checklist li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: clamp(13px, 1.3vw, 14.5px);
          font-weight: 500;
          color: var(--deep-brown);
          margin-bottom: 12px;
        }
        .checklist svg {
          width: clamp(16px, 1.6vw, 18px);
          height: clamp(16px, 1.6vw, 18px);
          color: var(--gold);
          flex-shrink: 0;
        }
        .signoff {
          font-size: clamp(12.5px, 1.2vw, 14px);
          color: #7a6a5c;
        }
        .signoff em {
          display: block;
          font-style: italic;
          color: var(--royal-red);
          margin-bottom: 2px;
        }
        .quote-card {
          background: var(--soft-cream-gold);
          border-radius: 16px;
          padding: clamp(24px, 3.5vw, 32px) clamp(18px, 3vw, 26px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .quote-mark {
          font-family: var(--font-playfair), serif;
          font-size: clamp(48px, 5.5vw, 64px);
          color: var(--gold);
          line-height: 1;
          margin-bottom: 10px;
        }
        .quote-card p {
          font-family: var(--font-playfair), serif;
          font-style: italic;
          font-size: clamp(15px, 1.6vw, 17px);
          color: var(--deep-brown);
          line-height: 1.5;
          margin-bottom: 20px;
          text-align: center;
        }
        .quote-attr {
          font-size: clamp(12px, 1.1vw, 13px);
          color: #7a6a5c;
          margin-bottom: 16px;
        }
        .quote-card :global(.quote-logo) {
          width: clamp(40px, 4.4vw, 50px);
          height: clamp(40px, 4.4vw, 50px);
          object-fit: contain;
          border-radius: 50%;
        }
        @media (max-width: 980px) {
          .about-inner {
            grid-template-columns: 1fr;
            max-width: 560px;
          }
          .photo-wrap {
            max-height: 340px;
            max-width: 340px;
          }
          .about-copy > p,
          .about-copy .checklist,
          .signoff {
            max-width: 100%;
          }
          .about-copy,
          .quote-card {
            text-align: center;
          }
          .about-copy h2 {
            text-align: center;
          }
          .checklist {
            display: inline-block;
            text-align: left;
          }
        }
        @media (max-width: 480px) {
          .photo-wrap {
            max-width: 320px;
            max-height: 420px;
          }
          .checklist li {
            gap: 8px;
          }
          .quote-card {
            border-radius: 14px;
          }
        }
      `}</style>
    </section>
  );
}