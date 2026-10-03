// components/Scrollbutton.tsx
"use client";

import { useEffect, useState } from "react";

export default function Scrollbutton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <button
        type="button"
        className={`scroll-btn ${visible ? "show" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        tabIndex={visible ? 0 : -1}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 19V5M5 12l7-7 7 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="scroll-label">Scroll</span>
      </button>

      <style jsx>{`
        .scroll-btn {
          /* fluid size: 44px (min tap target) on small phones -> 56px on desktop */
          --size: clamp(44px, 10vw, 56px);
          --edge: clamp(12px, 3.5vw, 28px);

          position: fixed;
          right: calc(var(--edge) + env(safe-area-inset-right, 0px));
          bottom: calc(var(--edge) + env(safe-area-inset-bottom, 0px));
          z-index: 50;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          height: var(--size);
          min-width: var(--size);
          padding: 0 calc(var(--size) * 0.3);
          border: none;
          border-radius: 999px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;

          background: var(--royal-red);
          color: var(--gold);
          font-family: var(--font-body);
          font-size: clamp(14px, 3.6vw, 16px);
          font-weight: 600;
          line-height: 1;
          box-shadow: 0 10px 24px rgba(92, 10, 10, 0.35);

          opacity: 0;
          visibility: hidden;
          transform: translateY(16px);
          transition: opacity 0.25s ease, transform 0.25s ease,
            visibility 0.25s, background 0.2s ease, color 0.2s ease;
        }

        .scroll-btn.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .scroll-btn svg {
          flex: none;
          width: clamp(18px, 4.6vw, 22px);
          height: clamp(18px, 4.6vw, 22px);
        }

        /* label stays collapsed until hover/focus: circle grows into a pill */
        .scroll-label {
          max-width: 0;
          margin-left: 0;
          overflow: hidden;
          white-space: nowrap;
          transition: max-width 0.3s ease, margin-left 0.3s ease;
        }

        .scroll-btn:focus-visible {
          background: var(--gold);
          color: var(--deep-brown);
          outline: 2px solid var(--cream);
          outline-offset: 3px;
        }

        .scroll-btn:focus-visible .scroll-label {
          max-width: 80px;
          margin-left: 8px;
        }

        /* mouse / trackpad devices only, so touch screens don't get a stuck hover */
        @media (hover: hover) and (pointer: fine) {
          .scroll-btn:hover {
            background: var(--gold);
            color: var(--deep-brown);
          }
          .scroll-btn:hover .scroll-label {
            max-width: 80px;
            margin-left: 8px;
          }
        }

        /* touch devices: quick press feedback instead of hover */
        @media (hover: none) {
          .scroll-btn:active {
            background: var(--gold);
            color: var(--deep-brown);
            transform: scale(0.94);
          }
        }

        /* short landscape screens: keep it small and out of the way */
        @media (max-height: 420px) {
          .scroll-btn {
            --size: 40px;
            --edge: 10px;
          }
        }

        /* very wide screens: keep it near the content, not the far corner */
        @media (min-width: 1600px) {
          .scroll-btn {
            --edge: 36px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .scroll-btn,
          .scroll-label {
            transition: none;
          }
        }

        @media print {
          .scroll-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
}