// components/Testimonials.tsx

import Image from "next/image";

type Testimonial = {
  name: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Swikruti Mishra",
    image: "/Swikruti.jpeg",
    quote:
      "The consultation gave me clarity about my career and helped me see things from a new perspective.",
  },
  {
    name: "Animesh Mohapatra",
    image: "/animesh.jpg",
    quote:
      "It felt like a real conversation about my life, not a generic horoscope. Highly recommended.",
  },
  {
    name: "Dr. Kamal Panda",
    image: "/Kamal.jpeg",
    quote:
      "My questions about timing and big decisions were answered with patience and honesty. No fear, just clear direction.",
  },
  {
    name: "Manisha Padhi",
    image: "/manisha.jpeg",
    quote:
      "I felt heard from the first minute. The remedies suggested were simple and easy to follow in daily life.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="testimonials"
      style={{
        background:
          "radial-gradient(circle at 4% 10%, rgba(139,0,0,0.05), transparent 24%), radial-gradient(circle at 96% 90%, rgba(139,0,0,0.05), transparent 24%), var(--cream)",
        padding: "clamp(40px, 6vw, 72px) clamp(16px, 4vw, 24px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p
          style={{
            textAlign: "center",
            color: "var(--royal-red)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            fontSize: "clamp(12px, 1.4vw, 13px)",
            marginBottom: 8,
          }}
        >
          Real Experiences
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(24px, 4.5vw, 40px)",
            color: "var(--deep-brown)",
            marginBottom: "clamp(24px, 5vw, 44px)",
            fontWeight: 700,
            padding: "0 8px",
          }}
        >
          What People Say
        </h2>

        <div className="marquee">
          <div className="marquee-track">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <article
                key={`${t.name}-${idx}`}
                className="testimonial-card"
                aria-hidden={idx >= testimonials.length}
              >
                <span aria-hidden className="testimonial-quote-mark">
                  &rdquo;
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <div className="testimonial-avatar-ring">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={56}
                      height={56}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        display: "block",
                        border: "2px solid var(--cream)",
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: "clamp(14px, 1.6vw, 15px)",
                        color: "var(--deep-brown)",
                        margin: 0,
                        overflowWrap: "break-word",
                      }}
                    >
                      {t.name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      <span
                        style={{
                          color: "var(--gold)",
                          letterSpacing: 1,
                          fontSize: 13,
                        }}
                      >
                        ★★★★★
                      </span>
                      <span style={{ fontSize: 11.5, color: "var(--maroon)" }}>
                        Verified Client
                      </span>
                    </div>
                  </div>
                </div>

                <p className="testimonial-quote-text">&ldquo;{t.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee {
          overflow: hidden;
          padding: 8px 0 20px;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: testimonial-scroll 45s linear infinite;
        }
        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes testimonial-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        .testimonial-card {
          position: relative;
          background: var(--soft-cream-gold);
          border: 1px solid var(--light-gold);
          border-radius: 18px;
          padding: clamp(20px, 3vw, 26px) clamp(16px, 2.6vw, 22px) clamp(18px, 2.6vw, 22px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 0 0 auto;
          width: clamp(270px, 30vw, 340px);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 10px rgba(43, 22, 15, 0.06);
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(43, 22, 15, 0.12);
        }

        .testimonial-quote-mark {
          position: absolute;
          top: 10px;
          right: 18px;
          font-size: clamp(34px, 5vw, 46px);
          line-height: 1;
          font-family: Georgia, serif;
          color: var(--light-gold);
          opacity: 0.9;
        }

        .testimonial-avatar-ring {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(135deg, var(--gold), var(--royal-red));
          flex: 0 0 auto;
        }

        .testimonial-quote-text {
          font-style: italic;
          font-size: clamp(13.5px, 1.8vw, 14.5px);
          line-height: 1.6;
          color: var(--deep-brown);
          margin: 0;
          overflow-wrap: break-word;
        }

        @media (max-width: 520px) {
          .testimonial-card {
            width: 80vw;
          }
          .testimonial-avatar-ring {
            width: 48px;
            height: 48px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-card { transition: none; }
          .testimonial-card:hover { transform: none; }
          .marquee-track { animation: none; }
          .marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}