"use client";

import Link from "next/link";
import Image from "next/image";

interface AccordionItem {
  title: string;
  description: string;
  icon?: string;
  link: string;
}

interface HorizontalAccordionProps {
  items: AccordionItem[];
}

export default function HorizontalAccordion({
  items,
}: HorizontalAccordionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="group relative overflow-hidden rounded-2xl border border-[#85B6FF]/25 bg-gradient-to-b from-[#00163f] to-[#00112f] p-6 text-left shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FD652F]/55 hover:shadow-[0_14px_28px_rgba(0,0,0,0.35)]"
        >
          <div className="absolute right-4 top-4 h-10 w-10 rounded-full border border-[#85B6FF]/75 bg-gradient-to-br from-[#0A2D73] to-[#003F9E] flex items-center justify-center shadow-[0_0_18px_rgba(133,182,255,0.35)]">
            <span className="absolute inset-0 rounded-full animate-ping bg-[#85B6FF]/35" />
            <span className="relative text-white text-lg leading-none">›</span>
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#85B6FF]/10 via-transparent to-[#FD652F]/10" />

          <div className="relative z-10 flex h-full flex-col">
            {item.icon && (
              <div className="mb-4 h-12 w-12 rounded-xl border border-white/20 bg-white/5 flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={26}
                  height={26}
                  className="invert contrast-[1.1] brightness-[1.25] transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}

            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#EAF2FF]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm md:text-base text-[#BFD4FF] leading-relaxed">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
