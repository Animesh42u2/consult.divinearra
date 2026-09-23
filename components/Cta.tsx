// components/Cta.tsx
"use client";

export default function CTA() {
  return (
    <section className="cta">
      <span className="mandala left" aria-hidden="true" />
      <span className="mandala right" aria-hidden="true" />

      <div className="cta-inner">
        <h2>Your Future Deserves Clarity</h2>
        <p>Take the first step towards a better tomorrow</p>
        <a href="#" className="btn-primary">
          Book Your Consultation Now
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

      <style jsx>{`
        .cta {
          position: relative;
          background: linear-gradient(160deg, var(--maroon) 0%, var(--royal-red) 100%);
          padding: 80px 6vw;
          text-align: center;
          overflow: hidden;
        }
       .mandala {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 320px;
  opacity: 0.35;
  background-color: var(--gold);
  -webkit-mask-image: url("/design.png");
  mask-image: url("/design.png");
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  pointer-events: none;
}
.mandala.left {
  left: -105px;
  transform: scaleX(-1);
}
.mandala.right {
  right: -105px;
  transform: none;
}

@media (max-width: 600px) {
  .mandala {
    width: 160px;
    opacity: 0.25;
  }
  .mandala.left {
    left: -180px;
  }
  .mandala.right {
    right: -180px;
  }
}
        .cta-inner {
          position: relative;
          max-width: 640px;
          margin: 0 auto;
        }
        .cta h2 {
          font-family: var(--font-playfair), serif;
          font-weight: 700;
          color: var(--cream);
          font-size: clamp(26px, 3.4vw, 38px);
          margin-bottom: 14px;
        }
        .cta p {
          color: rgba(255, 248, 231, 0.8);
          font-size: 16px;
          margin-bottom: 34px;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: var(--deep-brown);
          font-weight: 600;
          font-size: 15px;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(244, 197, 66, 0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(244, 197, 66, 0.35);
        }
      `}</style>
    </section>
  );
}