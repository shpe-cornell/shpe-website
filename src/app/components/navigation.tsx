"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Changa } from "next/font/google";
import { useState } from "react";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export function Navigation() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        ? "text-gray-900 bg-gray-50 shadow-[inset_0_2px_5px_rgba(0,0,0,0.1)] border-gray-200"
        : "text-[#001f5b] hover:text-gray-800 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 active:bg-blue-100 active:translate-y-0 active:shadow-inner",
    ].join(" ");

  return (
    <nav
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
        bg-[#E9F0FF]/80 backdrop-blur-xs shadow-md py-1 px-6 
        rounded-full border border-[#E9F0FF] w-[95%] max-w-6xl ${changa.className}`}
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-10">
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto mr-2 text-2xl px-3 py-1 rounded focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown (outside the pill) */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-3 w-full px-3 md:hidden">
          <div className="flex flex-col space-y-2 bg-[#E9F0FF] rounded-2xl shadow p-3">
            {pages.map((page) => {
              const isActive = path === page.href;
              return (
                <Link
                  key={page.name}
                  href={page.href}
                  className={getNavLinkClasses(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  {page.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
