"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroScrollProps {
  images?: string[];
  welcomeMessage?: string;
  subMessage?: string;
  showButton?: boolean;
  buttonHref?: string;
  buttonText?: string;
  showImageScroll?: boolean;
}

export default function HeroScroll({
  images,
  welcomeMessage = "Welcome to SHPE x Cornell",
  subMessage = "Empowering leaders, celebrating culture, and having fun doing it.",
  showButton = true,
  buttonHref = "/member-info",
  buttonText = "Join SHPE",
  showImageScroll = false,
}: HeroScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const imageWidth = container.clientWidth * 0.75;
    const middleIndex = images?.length ? Math.floor(images.length / 2) : 0;
    container.scrollLeft = middleIndex * imageWidth;
  }, [images]);

  return (
    <div className="overflow-visible relative w-full">
      <section className="relative w-full bg-gradient-to-b from-[#00031A] via-[#000E33] to-[#001F5B] pb-10 text-white font-sans">
        {/* Text */}
        <div className="text-center px-4 max-w-[90vw] mx-auto z-20 relative pt-8 pb-0">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#85B6FF] to-[#FD652F]"
            style={{ fontFamily: "'Changa', sans-serif" }}
          >
            {welcomeMessage}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#E5EFFF] text-sm sm:text-md md:text-lg mt-4 max-w-xl mx-auto"
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
              <Link href={buttonHref}>
                <button className="px-5 py-2 md:px-8 md:py-3 text-sm md:text-md font-medium rounded-full bg-[#00308E] hover:bg-[#0070C0] hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {buttonText}
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Image Scroll */}
        {showImageScroll && Array.isArray(images) && images.length > 0 && (
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth pt-8 sm:pt-10"
          >
            <div className="flex w-max gap-x-6 sm:gap-x-10 px-4 sm:px-10">
              {images.map((src, idx) => (
                <div
                  key={idx}
                  className="relative min-w-[90vw] sm:min-w-[75vw] h-[300px] sm:h-[400px] md:h-[500px] snap-center shrink-0 group"
                >
                  {/* Image */}
                  <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                    <Image
                      src={src}
                      alt={`Hero image ${idx + 1}`}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 75vw, 75vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      draggable={false}
                      loading="eager"
                    />

                    {/* Subtle overlay gradient (bottom fade) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Animated frame border */}
                    <div className="absolute inset-0 rounded-xl p-[2px] bg-[length:200%_200%] animate-borderFlow pointer-events-none">
                      <div className="h-full w-full rounded-[inherit] bg-[#00112A]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
