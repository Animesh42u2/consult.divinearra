// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Divine Arra — Astrology Consultations",
  description:
    "Get clarity in Love, Career, Money, Health and Life's important decisions with expert Vedic astrology guidance.",
  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="preload" as="image" href="/hero.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/lotus.png" fetchPriority="low" />
        <link rel="preload" as="image" href="/chakra.png" fetchPriority="low" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}