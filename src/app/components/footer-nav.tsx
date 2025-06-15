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
      <nav className="w-full flex items-center shadow-lg py-4 px-6 lg:px-12">
        {/* Logo */}
        <div className="flex basis-1/3 justify-start">
          <Link href="/" className="flex flex-col items-start">
            <Image
              src="/images/shpe-logos/shpe_transparent.png"
              alt="SHPE Logo"
              width={300}
              height={300}
              priority
            />
            {/*<p className="text-2xl pt-2">@2025 SHPE at Cornell</p>*/}
          </Link>
        </div>

        {/* Social Icons */}
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
              width={60}
              height={60}
              priority
              className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-cyan-400 group-hover:shadow-lg rounded-full"
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
              width={60}
              height={60}
              priority
              className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-cyan-400 group-hover:shadow-lg rounded-full"
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
              width={60}
              height={60}
              priority
              className="transition-transform duration-300 group-hover:scale-110 group-hover:shadow-cyan-400 group-hover:shadow-lg rounded-full"
            />
          </Link>
        </div>

        {/* Location Info */}
        <div className="flex basis-1/3 justify-end items-center space-x-4">
          <Image
            src="/images/icons/location.png"
            alt="location icon"
            width={60}
            height={60}
            className=""
            priority
          />
          <div className="text-right text-2xl">
            <p>Cornell University</p>
            <p>146 Olin Hall, Ithaca, NY 14853</p>
          </div>
        </div>
      </nav>
    </>
  );
}
