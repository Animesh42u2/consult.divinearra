// app/layout.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";
import MetaPixelPageView from "@/components/MetaPixelPageView";
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

const META_PIXEL_ID = "901400199226307";

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
      <body>
        {/* Meta Pixel base code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
            `,
          }}
        />
          <noscript>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    height="1"
    width="1"
    style={{ display: "none" }}
    src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
    alt=""
  />
</noscript>
          
        {/* Fires PageView on first load and on every route change */}
        <Suspense fallback={null}>
          <MetaPixelPageView />
        </Suspense>

        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}