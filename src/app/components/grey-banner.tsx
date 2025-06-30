"use client";
import Link from "next/link";

export default function GreyBanner() {
  // Active style for the button (same as points active style)
  const buttonClasses = [
    "relative group px-2 md:px-4 py-1 flex items-center justify-center",
    "font-semibold rounded-full text-sm md:text-md lg:text-md",
    "transition-all duration-300 border-[#0070C0]",
    "bg-[#00308E] text-white hover:scale-110 hover:bg-[#0070C0]",
  ].join(" ");

  return (
    <div className="relative w-full min-h-[20px] flex items-center justify-center px-7 py-1 overflow-hidden">
      <div className="absolute inset-0 animate-marble bg-[gray]/20 opacity-60 blur-sm"></div>

      {/* Content */}
      <div className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-4 z-10 px-6">
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
        <p className="text-[#001F5B] text-center font-bold lg:text-left text-[clamp(1.2rem,5vw,3rem)]">
          Welcome to SHPE at Cornell !
        </p>

        <Link href="/member-info" passHref>
          <button className={buttonClasses}>Join SHPE</button>
        </Link>
      </div>
    </div>
  );
}
