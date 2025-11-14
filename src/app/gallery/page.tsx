"use client";

import { useState } from "react";
import Image from "next/image";
import EventGallery from "../components/event-gallery";
import HeroScroll from "../components/hero-scroll";

const events = [
  {
    name: "General Body Meeting 1",
    subtitle: "Getting to Know Each Other Through Bingo",

    hero: "/images/events/25-26/gbody1/g1.jpeg",
    photos: [
      {
        src: "/images/events/25-26/gbody1/g1.jpeg",
        caption: "Our first GBM of 2025 🎉",
      },
      {
        src: "/images/events/25-26/gbody1/g2.png",
        caption: "Networking and catching up after summer break.",
      },
      {
        src: "/images/events/25-26/gbody1/g3.jpeg",
        caption: "Welcoming new members into the familia 💙",
      },
      {
        src: "/images/events/25-26/gbody1/g4.jpeg",
        caption: "Great turnout and energy all around!",
      },
      {
        src: "/images/events/25-26/gbody1/g5.jpeg",
        caption: "Ending the night with smiles and good vibes.",
      },
      {
        src: "/images/events/25-26/gbody1/g7.jpeg",
        caption: "Say I scream for ice cream! 🍦🍧",
      },
      {
        src: "/images/events/25-26/gbody1/g6.jpeg",
        caption: "Fun and games during bingo night!",
      },
      {
        src: "/images/events/25-26/gbody1/g8.jpeg",
        caption: "Nothing better than meeting new people 😄",
      },
    ],
  },
  {
    name: "Bienvenidos",
    subtitle:
      "Annual welcome-back celebration hosted by the Latino Living Center to build community among students, staff, and faculty",
    hero: "/images/events/25-26/bienvenidos/b1.png",
    photos: [
      { src: "/images/events/25-26/bienvenidos/b1.png" },
      { src: "/images/events/25-26/bienvenidos/b2.png" },
      { src: "/images/events/25-26/bienvenidos/b3.jpeg" },
    ],
  },
  {
    name: "Merch Plug",
    hero: "/images/events/25-26/merch_plug.png",
    photos: [],
  },
  {
    name: "Familia Moments",
    subtitle: "Candid memories 💙🧡🩵",
    hero: "/images/events/25-26/Familia/familia.jpg",
    photos: [
      {
        src: "/images/events/25-26/Familia/familia.jpg",
        caption: "🍎 Apple Fest 🍏",
      },
      {
        src: "/images/events/25-26/Familia/f1.jpg",
        caption: "Apple Fest 🧃",
      },
      {
        src: "/images/events/25-26/Familia/f2.jpeg",
        caption: "Conference 2024 👩‍💼🤵‍♂️",
      },
    ],
  },
];

export default function GalleryPage() {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00031A] via-[#000E33] to-[#001F5B] text-white font-sans pt-24 pb-24">
      {/* ==============================================================
          Header (HeroScroll)
      ============================================================== */}
      <HeroScroll
        welcomeMessage="SHPE @ Cornell — 2025 Gallery"
        subMessage="Relive our favorite SHPE moments — a visual story of familia, leadership, and growth, captured con cariño by the SHPE Fam 🧡💙🩵🫶"
        showButton={false}
      />

      {/* ==============================================================
          Event List (with tighter spacing under the hint)
      ============================================================== */}
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 max-w-6xl mx-auto pt-6">
        {/* Hint Message */}
        <p className="text-[#AFCBFF] text-center text-base sm:text-lg italic mb-6">
          Click any picture to view that day’s full album 📸
        </p>

        <section className="flex flex-col items-center gap-16 w-full">
          {events.map((event, idx) => {
            const hasGallery = event.photos && event.photos.some((p) => p.src);
            return (
              <div
                key={idx}
                tabIndex={hasGallery ? 0 : -1}
                role={hasGallery ? "button" : "img"}
                aria-label={
                  hasGallery
                    ? `Open ${event.name} album`
                    : `${event.name} headline image`
                }
                onClick={() => hasGallery && setActiveEvent(idx)}
                onKeyDown={(e) =>
                  hasGallery && e.key === "Enter" && setActiveEvent(idx)
                }
                className="w-full focus-visible:outline-none group cursor-pointer"
              >
                {/* ==============================================================
                    COOL CINEMATIC BORDER
                ============================================================== */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#0B1630] transition-shadow duration-500 group-hover:shadow-[0_0_25px_5px_rgba(133,182,255,0.5)]">
                  <div
                    className="absolute inset-0 rounded-xl border-[6px] border-transparent 
                    bg-[linear-gradient(135deg,#85B6FF,#FD652F90)] 
                    bg-clip-border [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] 
                    [mask-composite:exclude] opacity-90 pointer-events-none"
                    style={{ WebkitMaskComposite: "xor" }}
                  />

                  {/* --- FILM PERFORATIONS --- */}
                  <div className="absolute top-2 left-0 right-0 flex justify-between px-6 opacity-50">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-[6px] bg-[#85B6FF]/40 rounded-sm"
                      />
                    ))}
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 opacity-50">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-[6px] bg-[#85B6FF]/40 rounded-sm"
                      />
                    ))}
                  </div>

                  {/* --- HERO PHOTO --- */}
                  <Image
                    src={event.hero}
                    alt={`${event.name} cover photo`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />

                  {/* --- LIGHT SHINE --- */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent mix-blend-overlay pointer-events-none" />
                </div>

                {/* TITLE + SUBTITLE */}
                <div className="text-center mt-5">
                  <p className="text-[#E5EFFF] text-lg sm:text-xl font-medium italic drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]">
                    {event.name}
                  </p>
                  {event.subtitle && (
                    <p className="text-[#AFCBFF] text-base font-light italic">
                      {event.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>

      {/* ==============================================================
          Expanded Event Gallery
      ============================================================== */}
      {activeEvent !== null && (
        <EventGallery
          event={events[activeEvent]}
          onClose={() => setActiveEvent(null)}
        />
      )}
    </div>
  );
}
