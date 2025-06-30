"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Changa } from "next/font/google";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

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
      "relative group px-3 md:px-4 py-1 flex items-center justify-center",
      "font-bold rounded-full text-sm md:text-md lg:text-md transition-all duration-300 border-b-2 border-transparent",
      isActive
        ? "bg-white text-[#001F5B] shadow-md scale-110 border-white shadow-[#72A9BE] hover:border-blue-300"
        : "text-[#001F5B] hover:text-[#0070C0] hover:border-white hover:scale-110 hover:shadow-md hover:shadow-[#93c5fd]",
    ].join(" ");

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[#E9F0FF]/80 backdrop-blur-sm shadow-md border-b border-[#E9F0FF] flex justify-center py-2 px-4"
      style={{ fontFamily: "'Changa', sans-serif" }} // now applied to the whole nav
    >
      <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-10">
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

        {/* Conference Button */}
        <Link href="/points" className={getNavLinkClasses(isPointsActive)}>
          Conference
        </Link>
      </div>
    </nav>
  );
}
