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

  return (
    <>
      {/* SHPE logo */}
      <nav
        className="fixed top-0 w-full z-50 flex items-center bg-blue-100 opacity-90 backdrop-blur-md shadow-lg sm:pl-8 lg:pl-12 p-1 "
        style={{ fontFamily: "'Jaldi', sans-serif" }}
      >
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
                className={`
                  group relative px-3 md:px-6 flex items-center
                  text-[#001F5B] hover:text-[#D33A02]
                  text-s md:text-md lg:text-md font-bold
                  border-b-2 border-transparent hover:border-[#FD652F]
                  transition-transform duration-300 rounded-full
                  hover:scale-110 hover:shadow-[#FD652F] hover:shadow-md
                  ${
                    isActive
                      ? "bg-[#001F5B] text-white shadow-md hover:shadow-lg scale-110"
                      : ""
                  }
                `}
              >
                <span
                  className={`
                    absolute inset-0 rounded-full
                    transition-opacity duration-300
                    ${
                      isActive
                        ? "bg-[#001F5B] opacity-100"
                        : "bg-white opacity-0 group-hover:opacity-20"
                    }
                  `}
                ></span>
                <span
                  className={`relative z-10 ${isActive ? "text-white" : ""}`}
                >
                  {page.name}
                </span>
              </Link>
            );
          })}

          <Link
            href="/points"
            className={`group relative
            font-semibold px-2 md:px-4 lg:px-6 py-0.25 md:py-0.5 lg:py-1
            rounded-full transition-all duration-300
            text-s md:text-md lg:text-lg border-2 border-transparent
            shadow-lg hover:shadow-[#FD652F] hover:shadow-md hover:border-[#FD652F]
            flex-shrink-0 group-hover:opacity-90
            text-white
            ${
              isPointsActive
                ? "bg-[#001F5B] shadow-lg"
                : "bg-[#FD652F] hover:border-[#FFFFFF]"
            }
          `}
          >
            <span
              className="
                absolute inset-0 rounded-full
                 opacity-100
                transition-colors duration-300
              "
            ></span>
            <span className="relative z-10 ">POINTS</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
