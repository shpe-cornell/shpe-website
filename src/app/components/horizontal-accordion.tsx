"use client";

import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full h-[240px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#00031A] to-[#001F5B] backdrop-blur-md shadow-inner border border-white/10">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`relative transition-all duration-500 ease-in-out ${
            activeIndex === index ? "flex-[4]" : "flex-[1]"
          } cursor-pointer overflow-hidden group`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {/* AI-vibe looking background glow */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all z-0" />

          {/* Content */}
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center px-4 py-6 text-white">
            {/* Icon */}
            {item.icon && (
              <div className="mb-2">
                <Image
                  src={item.icon}
                  alt={`${item.title} icon`}
                  width={36}
                  height={36}
                  className="invert contrast-[1.1] brightness-[1.3] transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            )}

            {/* Action Title */}
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-semibold tracking-wide transition-colors duration-300 ${
                activeIndex === index ? "text-[#85B6FF]" : "text-[#FD652F]"
              }`}
            >
              {item.title}
            </h3>

            {/* Description - shown on hover */}
            {activeIndex === index && (
              <p className="mt-3 text-sm max-w-[85%] text-white/80 transition-opacity duration-300">
                {item.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
