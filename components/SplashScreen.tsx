"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import lotusAnimation from "../public/Yoga lotus flower.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), 4000);
    const removeTimer = setTimeout(onFinish, 4500);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`splash ${visible ? "" : "splash--hide"}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #5c0a0a 0%, #8b0000 100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.5s ease",
      }}
    >
      <style jsx>{`
        .splash :global(svg) {
          width: min(55vw, 300px);
          height: auto;
        }
      `}</style>
      <Lottie animationData={lotusAnimation} loop={false} autoplay />
    </div>
  );
}