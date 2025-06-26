"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navigation() {
  const path = usePathname();
  const isPointsActive = path === "/points";

  const pages = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Members", href: "/member-info" },
    { name: "Sponsorship", href: "/sponsorship" },
  ];

  const getNavLinkClasses = (isActive: boolean) =>
    [
      "relative group px-4 md:px-6 py-1 flex items-center justify-center",
      "font-bold rounded-full text-sm md:text-md lg:text-md",
      "transition-all duration-300 border-b-2 border-transparent",
      isActive
        ? "bg-white text-[#001F5B] shadow-md scale-110 border-white shadow-[#93c5fd] hover:border-blue-300"
        : "text-[#001F5B] hover:text-[#0070C0] hover:border-white hover:scale-110 hover:shadow-md hover:shadow-[#93c5fd]",
    ].join(" ");

  const pointsButtonClasses = [
    "relative group px-4 md:px-6 py-1 flex items-center justify-center",
    "font-bold rounded-full text-sm md:text-md lg:text-md",
    "transition-all duration-300 border-b-2 border-transparent",
    isPointsActive
      ? "bg-[#001F5B] text-white shadow-md scale-110 border-white shadow-[#93c5fd] hover:border-blue-300"
      : "bg-[#FD652F] text-white hover:text-[#FAEEA7] hover:border-[#feb79e] hover:scale-100 hover:shadow-md hover:shadow-[#fe936d]",
  ].join(" ");

  return (
    <nav
      className="fixed top-0 w-full z-50 flex items-center bg-blue-100/50 backdrop-blur-md shadow-lg sm:pl-8 lg:pl-12 p-1 border-b border-white/60"
      style={{ fontFamily: "'Jaldi', sans-serif" }}
    >
      {/* SHPE Logo */}
      <Link href="/" className="flex-shrink mr-4">
        <Image
          src="/images/shpe-logos/SHPExCORNELL_transp.png"
          alt="SHPE Logo"
          width={500}
          height={500}
          className="cursor-pointer w-[100px] md:w-[200px] lg:w-[200px] transition-all duration-200"
          priority
        />
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center ml-auto space-x-2 md:space-x-4 lg:space-x-6 pr-4 sm:pr-8 lg:pr-12">
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

        <Link
          href="/points"
          className={pointsButtonClasses}
          style={{ fontFamily: "'Changa', sans-serif" }} // Apply Changa only here
        >
          POINTS
        </Link>
      </div>
    </nav>
  );
}
