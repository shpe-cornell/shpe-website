import Link from "next/link";
import { Changa } from "next/font/google";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

export default function NotFound() {
  return (
    <main
      className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#00031A] to-[#001F5B] px-4 ${changa.className}`}
    >
      <div className="w-full max-w-xl text-center rounded-2xl border border-[#0070C0]/40 bg-[#00163E]/70 p-8 shadow-[0_12px_34px_rgba(0,0,0,0.32)]">
        <img
          src="/images/shpe-logos/shpe-emblem-transparent.png"
          alt="SHPE Cornell Logo"
          className="mx-auto w-16 h-16 mb-4"
        />

        <h1 className="text-4xl sm:text-5xl font-bold text-[#FD652F]">404</h1>
        <p className="mt-3 text-xl sm:text-2xl font-semibold text-white">
          We couldn&apos;t find that page.
        </p>
        <p className="mt-2 text-[#A4C2FF]">
          Looks like this link is missing or moved. Let&apos;s get you back home.
        </p>

        <Link
          href="/"
          className="inline-block mt-7 bg-[#FD652F] hover:bg-[#e65516] text-white font-semibold px-7 py-3 rounded-full shadow-md transition-colors"
        >
          Back To Home
        </Link>
      </div>
    </main>
  );
}
