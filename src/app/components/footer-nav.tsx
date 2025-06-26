"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const shadowStyle =
  "transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[cyan]";

const socialLinks = [
  {
    href: "https://join.slack.com/t/cornellshpe/shared_invite/zt-37j10butw-sgOpkzAGx9JRtKH6x~5n8w",
    src: "/images/icons/SLACK.png",
    alt: "Slack icon",
  },
  {
    href: "https://www.instagram.com/cornellshpe/",
    src: "/images/icons/ig.png",
    alt: "Instagram icon",
  },
  {
    href: "https://www.linkedin.com/company/shpe-at-cornell-university?trk=ppro_cprof",
    src: "/images/icons/linked.png",
    alt: "LinkedIn icon",
  },
];

export function FooterNav() {
  const path = usePathname();

  return (
    <nav
      className="w-full flex items-center shadow-lg px-4 lg:px-12 bg-[#001F5B]"
      style={{ fontFamily: "'Jaldi', sans-serif" }}
    >
      {/* === Logo + Copyright === */}
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

      {/* === Social Links === */}
      <div className="flex basis-1/3 justify-center items-center space-x-4">
        {socialLinks.map(({ href, src, alt }) => (
          <Link
            key={alt}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0"
          >
            <Image
              src={src}
              alt={alt}
              width={30}
              height={30}
              priority
              className={`rounded-full ${shadowStyle}`}
            />
          </Link>
        ))}
      </div>

      {/* === Address === */}
      <div className="flex basis-1/3 justify-end items-center space-x-4">
        <div className="text-right text-xs">
          <p>Cornell University</p>
          <p>146 Olin Hall, Ithaca, NY 14853</p>
        </div>
        <Image
          src="/images/icons/location.png"
          alt="location icon"
          width={20}
          height={20}
          priority
        />
      </div>
    </nav>
  );
}
