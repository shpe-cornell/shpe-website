"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Changa } from "next/font/google";
import { useState } from "react";
import { joinUsPage, navPages, pointsPage } from "../data/navigation-data";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
});

export function Navigation() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const getNavLinkClasses = (isActive: boolean) =>
    [
      "relative px-2 py-1.5 flex items-center justify-center",
      "font-bold text-xs md:text-sm transition-all duration-150",
      "after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out after:bg-[#FD652F] hover:after:scale-x-100",
      isActive
        ? "text-white after:scale-x-100"
        : "text-white/90 hover:text-white",
    ].join(" ");

  const pointsButtonClasses = (isActive: boolean) =>
    [
      "relative px-3 py-1.5 flex items-center justify-center rounded-full",
      "font-bold text-xs md:text-sm transition-all duration-250",
      "border border-[#85B6FF]/40 bg-[#001F5B]/28 backdrop-blur-sm",
      isActive
        ? "text-white border-[#FD652F]/70 bg-[#0e2f70]/55 shadow-[0_4px_12px_rgba(253,101,47,0.18)]"
        : "text-[#E5EFFF] hover:text-white focus-visible:text-white hover:border-[#FD652F]/55 hover:bg-[#0c2a66]/45 hover:-translate-y-[1px] hover:shadow-[0_6px_14px_rgba(0,0,0,0.22)]",
    ].join(" ");

  return (
    <nav
      className={`fixed top-3 left-0 right-0 z-50 
        bg-[#00143F]/55 backdrop-blur-md border-b border-white/10 shadow-[0_6px_18px_rgba(0,0,0,0.22)] py-1.5 px-3 md:px-8 lg:px-12 
        w-full max-w-none ${changa.className}`}
    >
      <div className="flex items-center justify-between gap-2 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4">
        {/* SHPE Logo */}
        <Link href="/" className="flex-shrink-0 md:justify-self-start">
          <Image
            src="/images/shpe-logos/SHPE_logo_horiz_Cornell_DKBG.png"
            alt="SHPE Logo"
            width={200}
            height={80}
            className="cursor-pointer w-[95px] md:w-[185px] transition-all duration-200"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center justify-self-center space-x-2 lg:space-x-4">
          {navPages.map((page) => {
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

        {/* Desktop Points CTA */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0 md:justify-self-end">
          <Link href={pointsPage.href} className="inline-flex">
            <span className={pointsButtonClasses(path === pointsPage.href)}>
              {pointsPage.name}
            </span>
          </Link>
          <Link
            href={joinUsPage.href}
            className="inline-flex"
            target="_blank"
            rel="noreferrer"
          >
            <span className={pointsButtonClasses(false)}>{joinUsPage.name}</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto mr-1 text-2xl px-3 py-1 rounded focus:outline-none text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown (outside the pill) */}
      {menuOpen && (
        <div className="absolute top-full left-0 mt-3 w-full px-3 md:hidden">
          <div className="flex flex-col space-y-2 rounded-2xl p-3 bg-[#00163E]/95 backdrop-blur-md border border-white/15 shadow-[0_10px_28px_rgba(0,0,0,0.35)]">
            {navPages.map((page) => {
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
            <Link
              href={pointsPage.href}
              className={pointsButtonClasses(path === pointsPage.href)}
              onClick={() => setMenuOpen(false)}
            >
              {pointsPage.name}
            </Link>
            <Link
              href={joinUsPage.href}
              className={pointsButtonClasses(false)}
              onClick={() => setMenuOpen(false)}
              target="_blank"
              rel="noreferrer"
            >
              {joinUsPage.name}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
