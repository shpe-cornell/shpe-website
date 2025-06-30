"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroScrollProps {
  images: string[];
  welcomeMessage?: string;
  subMessage?: string;
  showButton?: boolean;
  buttonHref?: string;
  buttonText?: string;
}

export default function HeroScroll({
  images,
  welcomeMessage = "Welcome to SHPE x Cornell",
  subMessage = "Empowering leaders, celebrating culture, and having fun doing it.",
  showButton = true,
  buttonHref = "/member-info",
  buttonText = "Join SHPE",
}: HeroScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const imageWidth = container.clientWidth * 0.75;
    const middleIndex = Math.floor(images.length / 2);
    container.scrollLeft = middleIndex * imageWidth;
  }, [images]);

  return (
    <section className="relative w-full overflow-hidden bg-[#001F5B] pb-10">
      {/* Floating Welcome Message */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20 text-center px-4 max-w-[90vw]">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-5xl md:text-6xl font-bold drop-shadow-md"
          style={{ fontFamily: "'Changa', sans-serif" }}
        >
          {welcomeMessage}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[#FD652F] text-lg mt-3 font-medium tracking-wider"
        >
          {subMessage}
        </motion.p>

        {/* Only render button container when showButton is true */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6"
          >
            <Link href={buttonHref} passHref>
              <button
                className="relative group px-4 py-2 md:px-6 md:py-2 font-semibold text-sm md:text-md rounded-full 
              bg-[#00308E] text-white hover:scale-110 hover:bg-[#0070C0] transition-all duration-300"
              >
                {buttonText}
              </button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Scrollable Images */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pt-[250px]"
      >
        <div className="flex w-max gap-x-12 px-10">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="relative min-w-[75vw] h-[500px] snap-center shrink-0 rounded-xl overflow-hidden"
            >
              <Image
                src={src}
                alt={`Hero image ${idx + 1}`}
                fill
                quality={100}
                sizes="(max-width: 768px) 75vw, 75vw"
                className="object-cover"
                draggable={false}
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
