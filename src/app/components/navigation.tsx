"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Changa } from "next/font/google";

// Load font with subsets and weights, and preload for better performance
const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap", // ensures text remains visible during webfont load
  preload: true,
});

export function Navigation() {
  const path = usePathname();
  const isPointsActive = path === "/points";

  const pages = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Members", href: "/member-info" },
    { name: "Sponsorship", href: "/sponsorship" },
    { name: "Conference", href: "/points" },
  ];

  const getNavLinkClasses = (isActive: boolean) =>
    [
      "relative px-4 py-2 flex items-center justify-center",
      "font-bold rounded-2xl text-sm md:text-md transition-all duration-150",
      "border border-transparent",
      isActive
        ? [
            "text-gray-900 bg-gray-50",
            "shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)]",
            "border-gray-200",
          ].join(" ")
        : [
            "text-[#001f5b] hover:text-gray-800",
            "hover:bg-blue-50 hover:border-blue-200",
            "hover:shadow-md hover:-translate-y-0.5",
            "active:bg-blue-100 active:translate-y-0",
            "active:shadow-inner",
          ].join(" "),
    ].join(" ");

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#E9F0FF]/80 backdrop-blur-xs shadow-md py-1 px-180 rounded-full border border-[#E9F0FF] w-[95%] max-w-6xl ${changa.className}`}
    >
      <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-10">
        {/* SHPE Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/shpe-logos/SHPExCORNELL_transp.png"
            alt="SHPE Logo"
            width={200}
            height={80}
            className="cursor-pointer w-[100px] md:w-[200px] transition-all duration-200"
            priority
          />
        </Link>

        {/* Navigation Links */}
        {pages.map((page) => {
          const isActive = path === page.href;
          return (
            <Link
              key={page.name}
              href={page.href}
              className={getNavLinkClasses(isActive)}
            >
              {page.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
