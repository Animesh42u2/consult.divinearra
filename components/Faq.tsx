"use client";

// components/FAQ.tsx

import { useState } from "react";

type FaqEntry = {
  question: string;
  answer: string;
};

const faqs: FaqEntry[] = [
  {
    question: "Is this a personalized consultation ?",
    answer:
      "Yes. Every session is based on your own birth details and the questions you bring, not a pre-written script.",
  },
  {
    question: "What information do I need to provide ?",
    answer:
      "Just your date, time and place of birth, plus anything specific you'd like to focus on during the session.",
  },
  {
    question: "What topics can I ask about ?",
    answer:
      "Career, relationships, health, finances, or any life decision you're weighing — the conversation follows what matters to you.",
  },
  {
    question: "Will I get guaranteed predictions ?",
    answer:
      "No. You'll get honest guidance and perspective to help you decide for yourself, not fixed guarantees about the future.",
  },
  {
    question: "How long does a session last ?",
    answer:
      "Most consultations run 30 to 45 minutes, enough time to go through your chart and cover your questions without feeling rushed.",
  },
  {
    question: "Can I book a follow-up session ?",
    answer:
      "Yes. Many clients return for follow-ups as circumstances change or new questions come up — just book another slot whenever you're ready.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      style={{
        background: "var(--cream)",
        padding: "0 clamp(16px, 4vw, 24px) clamp(64px, 9vw, 100px)",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <p
          style={{
            textAlign: "center",
            color: "var(--royal-red)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            fontSize: "clamp(22px, 4vw, 32px)",
            fontFamily: "var(--font-playfair), serif",
            marginBottom: "clamp(22px, 3.5vw, 32px)",
          }}
        >
          Frequently Asked Questions
        </p>

        <div
          style={{
            border: "1px solid var(--light-gold)",
            borderRadius: 18,
            overflow: "hidden",
            background: "#fffdf9",
            boxShadow: "0 6px 22px rgba(43, 22, 15, 0.07)",
          }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`faq-item${isOpen ? " is-open" : ""}`}
                style={{
                  borderTop: index === 0 ? "none" : "1px solid var(--light-gold)",
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className={`faq-question${isOpen ? " is-open" : ""}`}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "clamp(18px, 3vw, 24px) clamp(20px, 3.5vw, 28px)",
                    border: "none",
                    textAlign: "left",
                    fontWeight: 600,
                    fontSize: "clamp(15.5px, 2.2vw, 17.5px)",
                    fontFamily: "var(--font-playfair), serif",
                    color: "var(--deep-brown)",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ flex: 1 }}>{faq.question}</span>
                  <span
                    aria-hidden
                    style={{
                      flex: "0 0 auto",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "var(--royal-red)",
                      color: "var(--cream)",
                      fontSize: 17,
                      fontWeight: 700,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  >
                    +
                  </span>
                </button>

                {/* CSS-only accordion: no refs, no measured heights, no render-phase reads */}
                <div
                  className="faq-panel"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s ease",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: 0,
                        padding:
                          "0 clamp(20px, 3.5vw, 28px) clamp(18px, 3vw, 24px)",
                        fontSize: "clamp(14.5px, 2vw, 16px)",
                        lineHeight: 1.65,
                        color: "var(--maroon)",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-item {
          border-left: 3px solid transparent;
          transition: border-color 0.2s ease;
        }
        .faq-item.is-open {
          border-left-color: var(--gold);
        }
        .faq-question {
          background: transparent;
          transition: background-color 0.2s ease;
        }
        .faq-question:hover {
          background-color: rgba(244, 197, 66, 0.1);
        }
        .faq-question.is-open {
          background-color: var(--soft-cream-gold);
        }
        .faq-question.is-open:hover {
          background-color: var(--soft-cream-gold);
        }
        .faq-panel {
          background-color: var(--soft-cream-gold);
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-question,
          .faq-question span,
          .faq-item,
          .faq-panel { transition: none !important; }
        }
      `}</style>
    </section>
  );
}