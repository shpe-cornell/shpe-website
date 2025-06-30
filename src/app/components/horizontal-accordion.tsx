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
    <div className="flex w-full h-[200px] overflow-hidden rounded-xl mb-4">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`relative transition-all duration-300 ease-in-out ${
            activeIndex === index ? "flex-[4]" : "flex-[1]"
          } cursor-pointer overflow-hidden bg-[#DBEAFE] hover:bg-orange-100`}
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="flex h-full w-full items-center justify-center text-center p-4">
            <div className="text-[#FD652F] flex flex-col items-center px-2">
              {item.icon && (
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="w-8 h-8 mb-2"
                />
              )}
              <h3
                className={`text-2xl font-bold transition-colors ${
                  activeIndex === index ? "text-[#D33A02]" : "text-[#FD652F]"
                }`}
              >
                {item.title}
              </h3>
              {activeIndex === index && (
                <p className="text-sm mt-2 max-w-[90%]">{item.description}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
