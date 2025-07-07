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
    <>
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#00031A] to-[#001F5B] pb-10 text-white font-sans border-blur">
        {/* Welcome Message Text */}
        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-20 text-center px-4 max-w-[90vw]">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#85B6FF] to-[#FD652F]"
            style={{ fontFamily: "'Changa', sans-serif" }}
          >
            {welcomeMessage}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#E5EFFF] text-md sm:text-lg mt-4 max-w-xl mx-auto"
          >
            {subMessage}
          </motion.p>

          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6"
            >
              <Link href={buttonHref} passHref>
                <button className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-md font-medium rounded-full bg-[#00308E] hover:bg-[#0070C0] hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {buttonText}
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Scrollable Images */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pt-[260px]"
        >
          <div className="flex w-max gap-x-12 px-10">
            {images.map((src, idx) => (
              <div
                key={idx}
                className="relative min-w-[75vw] h-[500px] snap-center shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl"
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
                <div className="absolute inset-0 bg-black/20  z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="blur" />
    </>
  );
}
