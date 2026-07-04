import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maison Noire · Salon & Studio",
  description:
    "A studio of one. By appointment, no walk-ins. Cuts, color, braids and texture, taken slowly, in two-hour sittings. Labone, Accra.",
  keywords: ["hair salon", "barbershop", "braids", "accra", "ghana", "labone", "Kofi Osei"],
  openGraph: {
    title: "Maison Noire · Salon & Studio",
    description:
      "Editorial hair studio. One chair, one client. Labone, Accra.",
    type: "website",
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Noire · Salon & Studio",
    description: "Editorial hair studio. One chair, one client. Labone, Accra.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${instrumentSerif.variable} ${jakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
