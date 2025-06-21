"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function FooterNav() {
  const path = usePathname();

  const pages = [
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Members", href: "/member-info" },
    { name: "Sponsorship", href: "/sponsorship" },
  ];

  return (
    <>
      <nav
        className="w-full flex items-center shadow-lg px-4 lg:px-12 bg-[#001F5B]"
        style={{ fontFamily: "'Jaldi', sans-serif" }}
      >
        {/* ============================================================== */}
        {/* COPYRIGHT AND LOGO */}
        {/* ============================================================== */}
        <div className="flex basis-1/3 justify-start">
          <Link href="/" className="flex flex-col items-start">
            <Image
              src="/images/shpe-logos/shpe_transparent.png"
              alt="SHPE Logo"
              width={150}
              height={150}
              className="cursor-pointer w-[75px] md:w-[100px] lg:w-[110px] transition-all duration-200"
              priority
            />
            <p className="text-xs">@ 2025 SHPE at Cornell</p>
          </Link>
        </div>

        {/* ============================================================== */}
        {/* Social Icons */}
        {/* ============================================================== */}
        <div className="flex basis-1/3 justify-center items-center space-x-4">
          <Link
            href="https://join.slack.com/t/cornellshpe/shared_invite/zt-37j10butw-sgOpkzAGx9JRtKH6x~5n8w"
            className="group shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/slack.png"
              alt="Slack icon"
              width={30}
              height={30}
              priority
              className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[#FD652F] group-hover:shadow-lg rounded-full"
            />
          </Link>

          <Link
            href="https://www.instagram.com/cornellshpe/"
            className="group shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/insta.png"
              alt="Instagram icon"
              width={30}
              height={30}
              priority
              className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[#FD652F] group-hover:shadow-lg rounded-full"
            />
          </Link>

          <Link
            href="https://www.linkedin.com/company/shpe-at-cornell-university?trk=ppro_cprof"
            className="group shrink-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icons/linkedin.png"
              alt="LinkedIn icon"
              width={30}
              height={30}
              priority
              className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[#FD652F] group-hover:shadow-lg rounded-full"
            />
          </Link>
        </div>

        {/* ============================================================== */}
        {/* Location Info*/}
        {/* ============================================================== */}
        <div className="flex basis-1/3 justify-end items-center space-x-4">
          <Image
            src="/images/icons/location.png"
            alt="location icon"
            width={20}
            height={20}
            className=""
            priority
          />
          <div className="text-right text-xs">
            <p>Cornell University</p>
            <p>146 Olin Hall, Ithaca, NY 14853</p>
          </div>
        </div>
      </nav>
    </>
  );
}
