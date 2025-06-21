"use client";
import Link from "next/link";

export default function GreyBanner() {
  return (
    <div className="relative w-full min-h-[75px] flex items-center justify-center px-6 py-4 overflow-hidden">
      {/* Animated marble-like gradient background */}
      <div className="absolute inset-0 animate-marble bg-[#72A9BE]"></div>

      {/* Content */}
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-4 z-10 px-6">
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
        <p
          className="text-white text-center lg:text-left font-semibold text-[clamp(1.2rem,5vw,3rem)]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          •••• Welcome to SHPE at Cornell ! ••••••
        </p>

        <Link href="/member-info" passHref>
          <button
            className="bg-[#001F5B] text-white px-6 py-3 rounded-full hover:bg-[#0070C0] transition text-[clamp(1rem,2.5vw,1.5rem)] font-bold"
            style={{ fontFamily: "'Jaldi', sans-serif" }}
          >
            Join Us
          </button>
        </Link>
      </div>

      {/* CSS styles */}
      <style jsx>{`
        @keyframes marble {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-marble {
          animation: marble 20s ease infinite;
        }
      `}</style>
    </div>
  );
}
