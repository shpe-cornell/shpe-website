"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

interface HeroScrollProps {
  images: string[];
}

export default function HeroScroll({ images }: HeroScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const imageWidth = container.clientWidth * 0.75;
    const middleIndex = Math.floor(images.length / 2);
    container.scrollLeft = middleIndex * imageWidth;
  }, [images]);

  return (
    <div
      className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory bg-blue-100"
      ref={scrollRef}
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="flex w-max px-0 gap-x-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative min-w-[75vw] h-[450px] snap-center shrink-0" // ---- Control image specs here -----
          >
            <Image
              src={src}
              alt={`Hero image ${idx + 1}`}
              fill
              priority
              quality={100}
              sizes="75vw"
              className="object-cover rounded-lg"
              draggable={false}
              loading="eager"
            />
            <div className="absolute inset-0 bg-[#001F5B] opacity-25 pointer-events-none rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
