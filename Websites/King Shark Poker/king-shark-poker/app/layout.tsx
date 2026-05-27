import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "King Shark Poker | Custom Casino Tables & Accessories",
  description:
    "Bespoke poker tables, blackjack tables, roulette tables, and premium casino accessories. Customize your perfect table and receive a personalized quote.",
  keywords:
    "custom poker table, blackjack table, casino table, roulette table, custom casino furniture, poker accessories",
  openGraph: {
    title: "King Shark Poker | Custom Casino Tables",
    description:
      "Craft your perfect casino table. Premium materials, bespoke design, expert craftsmanship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
