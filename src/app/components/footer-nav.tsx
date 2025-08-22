"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const shadowStyle = "transition-transform duration-300 group-hover:scale-120";

const socialLinks = [
  {
    href: "https://join.slack.com/t/cornellshpe/shared_invite/zt-37j10butw-sgOpkzAGx9JRtKH6x~5n8w",
    src: "/images/icons/slack.png",
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
      className="w-full flex items-center justify-between bg-[#001F5B] px-6 py-4 shadow-lg"
      style={{ fontFamily: "'Jaldi', sans-serif" }}
    >
      {/* Logo and Copyright */}
      <div className="flex flex-col justify-center items-start basis-1/3">
        <Link href="/" className="flex flex-col items-start">
          <Image
            src="/images/shpe-logos/shpe_transparent.png"
            alt="SHPE Logo"
            width={110}
            height={110}
            className="cursor-pointer w-[75px] md:w-[100px] lg:w-[110px] transition-all duration-200"
            priority
          />
          <p className="mt-1 text-xs text-[#FD652F]">@ 2025 SHPE at Cornell</p>
        </Link>
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col basis-1/3 justify-center items-center space-y-1">
        <div className="flex space-x-10">
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
        <Link
          href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
          className="text-xs text-[#FD652F] font-semibold select-none mt-1"
        >
          All are welcome | Equal Education and Employment
        </Link>
        <p className="text-xs text-[#FD652F]">
          {" "}
          This organization is a registered student organization of Cornell
          University.{" "}
        </p>
      </div>

      {/* Address */}
      <div className="flex basis-1/3 justify-end items-center space-x-3 text-right text-xs text-[#FD652F]">
        <div>
          <p>Cornell University</p>
          <p>102 Hollister Hall, Ithaca, NY 14853</p>
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
