"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { quickLinks, socialLinks } from "../data/footer-data";

export function FooterNav() {
  const path = usePathname();
  const currentYear = new Date().getFullYear();
  const donateLink = quickLinks.find(
    ({ label }) => label.toLowerCase() === "donate",
  );
  const standardQuickLinks = quickLinks.filter(
    ({ label }) => label.toLowerCase() !== "donate",
  );

  if (path?.startsWith("/register/") || path?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="w-full border-t border-white/15 bg-[#001F5B] px-6 md:px-10 py-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              href="/"
              className="flex flex-col items-center md:items-start"
            >
              <Image
                src="/images/shpe-logos/shpe_transparent.png"
                alt="SHPE Logo"
                width={110}
                height={110}
                className="cursor-pointer w-[98px] md:w-[120px]"
                priority
              />
              <p className="mt-2 text-xs text-[#FD652F] font-semibold">
                © {currentYear} SHPE at Cornell
              </p>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-sm font-bold tracking-wide text-[#85B6FF]">
              Social
            </p>
            <div className="mt-2 flex items-center gap-5">
              {socialLinks.map(({ href, src, alt }) => (
                <Link
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={alt}
                  className="group shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={30}
                    height={30}
                    className="transition-transform duration-200 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
            <Link
              href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment"
              className="mt-3 text-xs text-[#FD652F] font-semibold select-none text-center"
            >
              All are welcome | Equal Education and Employment
            </Link>
            <p className="mt-1 text-xs text-[#E5EFFF] text-center">
              This organization is a registered student organization of Cornell
              University.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1.5 text-center md:text-right">
            <p className="text-sm font-bold tracking-wide text-[#85B6FF]">
              Quick Links:
            </p>
            {standardQuickLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#E5EFFF] hover:text-[#FD652F] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
            {donateLink && (
              <Link
                href={donateLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-[#FD652F] bg-[#FD652F] px-5 py-1.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(253,101,47,0.32)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#e65516]"
              >
                <span className="wave-button-label">
                  {"Donate".split("").map((char, idx) => (
                    <span
                      key={`${char}-${idx}`}
                      className="wave-letter-soft"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-center gap-2 text-center text-xs text-[#E5EFFF]">
          <Image
            src="/images/icons/location.png"
            alt="location icon"
            width={14}
            height={14}
            className="shrink-0"
          />
          <p>
            <span className="font-semibold text-[#FD652F]">
              Cornell University
            </span>
            {" · "}102 Hollister Hall, Ithaca, NY 14853
          </p>
        </div>
      </div>
    </nav>
  );
}
