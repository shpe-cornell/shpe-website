import type { Metadata } from "next";
import { Geist, Geist_Mono, Changa } from "next/font/google";
import "./globals.css";
import { Navigation } from "./components/navigation";
import { FooterNav } from "./components/footer-nav";
import { GivingDayPopup } from "./components/giving-day-popup";
import { CursorBackgroundFx } from "./components/cursor-background-fx";

// const jaldi = Jaldi({
//   subsets: ["latin"],
//   weight: ["400", "700"],
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const changa = Changa({
  variable: "--font-changa",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "SHPE @ Cornell",
  description:
    "SHPE at Cornell empowers the Hispanic community and allies in STEM through mentorship, professional development, and community engagement.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "SHPE @ Cornell",
    description:
      "Empowering the Hispanic community and allies in STEM at Cornell University.",
    url: "https://www.shpe.cornell.edu",
    siteName: "SHPE at Cornell",
    images: [
      {
        url: "https://www.shpe.cornell.edu/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHPE at Cornell",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#001F5B" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${changa.variable} ${changa.className} antialiased`}
      >
        <CursorBackgroundFx />
        <div className="relative z-10">
          <header className="text-white text-center">
            <Navigation />
          </header>
          <GivingDayPopup />
          {children}
          <footer className="text-white">
            <FooterNav />
          </footer>
        </div>
      </body>
    </html>
  );
}
