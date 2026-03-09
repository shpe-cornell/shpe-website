"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Handshake, Rocket, Award } from "lucide-react";

interface HeroScrollProps {
  images?: string[];
  welcomeMessage?: string;
  subMessage?: string;
  showButton?: boolean;
  buttonHref?: string;
  buttonText?: string;
  showImageScroll?: boolean;
  typeSubMessage?: boolean;
  typeSpeedMs?: number;
}

export default function HeroScroll({
  images,
  welcomeMessage = "Welcome to SHPE x Cornell",
  subMessage = "Empowering leaders, celebrating culture, and having fun doing it.",
  showButton = true,
  buttonHref = "/member-info",
  buttonText = "Join SHPE",
  showImageScroll = false,
  typeSubMessage = true,
  typeSpeedMs = 55,
}: HeroScrollProps) {
  const [typedSubMessage, setTypedSubMessage] = useState(
    typeSubMessage ? "" : subMessage,
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const isCommunityCta = buttonText.toLowerCase().includes("join our community");

  useEffect(() => {
    if (!showImageScroll || !images?.length) return;

    // Warm cache for upcoming transitions to reduce perceived latency.
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const middleIndex = Math.floor(images.length / 2);
    setActiveImageIndex(0);

    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveImageIndex(middleIndex);
      return;
    }

    const sequence = Array.from({ length: images.length }, (_, idx) => idx);
    if (sequence[sequence.length - 1] !== middleIndex) {
      sequence.push(middleIndex);
    }

    const timers: number[] = [];
    let step = 0;

    const advance = () => {
      if (step >= sequence.length - 1) return;
      const timer = window.setTimeout(() => {
        step += 1;
        setActiveImageIndex(sequence[step]);
        advance();
      }, 2900);
      timers.push(timer);
    };

    advance();

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [images, showImageScroll]);

  useEffect(() => {
    if (!typeSubMessage) {
      setTypedSubMessage(subMessage);
      return;
    }

    setTypedSubMessage("");
    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        index += 1;
        setTypedSubMessage(subMessage.slice(0, index));
        if (index >= subMessage.length) clearInterval(interval);
      }, typeSpeedMs);
    }, 220);

    return () => clearTimeout(timeout);
  }, [subMessage, typeSubMessage, typeSpeedMs]);

  return (
    <div className="overflow-visible relative w-full">
      <section className="relative w-full bg-gradient-to-b from-[#00031A] via-[#000E33] to-[#001F5B] pb-6 text-white font-sans">
        {/* Text */}
        <div className="text-center px-4 max-w-[90vw] mx-auto z-20 relative pt-8 pb-0">
          <motion.h1
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "'Changa', sans-serif" }}
          >
            <span className="paint-fill-title" data-text={welcomeMessage}>
              {welcomeMessage}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative mt-4 max-w-xl mx-auto text-[#E5EFFF] text-sm md:text-lg"
          >
            <p className="invisible">{subMessage}</p>
            <p className="absolute inset-0">{typedSubMessage}</p>
          </motion.div>

          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 relative inline-flex items-center justify-center"
            >
              <Link href={buttonHref}>
                <button className="join-community-btn px-5 py-2 md:px-8 md:py-3 text-sm md:text-md font-medium rounded-full text-white hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <span className="wave-button-label">
                    {buttonText.split("").map((char, idx) => (
                      <span
                        key={`${char}-${idx}`}
                        className="wave-letter"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                </button>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Image Scroll */}
        {showImageScroll && Array.isArray(images) && images.length > 0 && (
          <div className="w-full px-4 pt-4 sm:px-10 sm:pt-6">
            <div className="relative mx-auto h-[280px] w-[90vw] overflow-visible sm:h-[360px] sm:w-[75vw] md:h-[460px]">
              {isCommunityCta && (
                <div className="hero-value-staircase hero-value-staircase-above" aria-hidden="true">
                  <div className="hero-value-block hero-value-block-1">
                    <Rocket size={14} strokeWidth={2.2} />
                  </div>
                  <div className="hero-value-block hero-value-block-2">
                    <Handshake size={14} strokeWidth={2.2} />
                  </div>
                  <div className="hero-value-block hero-value-block-3">
                    <Award size={14} strokeWidth={2.2} />
                  </div>
                </div>
              )}

              <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 1.15, ease: [0.22, 0.61, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeImageIndex]}
                      alt={`Hero image ${activeImageIndex + 1}`}
                      fill
                      quality={85}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 75vw, 75vw"
                      className="object-cover object-[center_24%] sm:object-[center_22%] md:object-[center_20%]"
                      draggable={false}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 rounded-xl p-[2px] bg-[length:200%_200%] animate-borderFlow pointer-events-none">
                  <div className="h-full w-full rounded-[inherit] bg-[#00112A]" />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show hero image ${idx + 1}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeImageIndex
                      ? "w-7 bg-[#FD652F]"
                      : "w-2.5 bg-white/45 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
