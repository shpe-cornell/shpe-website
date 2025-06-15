"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navigation() {
  const path = usePathname();

  const pages = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Members", href: "/member-info" },
    { name: "Sponsorship", href: "/sponsorship" },
  ];

  return (
    <>
      {/* SHPE logo */}
      <nav className="flex items-center bg-white shadow-lg sm:pl-8 lg:pl-12 py-4">
        <Link href="/" className="flex-shrink-0 mr-4">
          <Image
            src="/images/shpe-logos/SHPExCORNELL_transp.png"
            alt="SHPE Logo"
            width={600}
            height={600}
            className="cursor-pointer w-[200px] md:w-[300px] lg:w-[400px] transition-all duration-200"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center ml-auto space-x-2 md:space-x-4 lg:space-x-6 pr-4 sm:pr-8 lg:pr-12">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={page.href}
              className="text-[#001F5B] hover:text-[#D33A02] px-3 md:px-6 items-center flex 
                        text-lg md:text-xl lg:text-2xl font-bold
                        transition-colors duration-300 border-b-2 border-transparent
                        hover:border-[#FD652F]"
            >
              {page.name}
            </Link>
          ))}

          {/* Points Button */}
          <Link
            href="/points"
            className="bg-[#FD652F] hover:bg-[#D33A02] text-white 
                      font-semibold px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4
                      rounded-lg transition-all duration-300 
                      text-base md:text-lg lg:text-xl
                      border-2 border-transparent hover:border-white
                      shadow-md hover:shadow-lg"
          >
            POINTS
          </Link>
        </div>
      </nav>
    </>
  );
}
