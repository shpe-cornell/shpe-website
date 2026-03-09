"use client";

import { useState } from "react";
import Image from "next/image";
import HeroScroll from "../components/hero-scroll";
import { galleryEvents as events } from "../data/gallery-data";

export default function GalleryPage() {
  const [activePhotoIndexes, setActivePhotoIndexes] = useState<number[]>(
    events.map(() => 0),
  );

  const showPreviousPhoto = (eventIndex: number, photoCount: number) => {
    if (photoCount <= 1) return;
    setActivePhotoIndexes((prev) =>
      prev.map((photoIndex, idx) =>
        idx === eventIndex ? (photoIndex - 1 + photoCount) % photoCount : photoIndex,
      ),
    );
  };

  const showNextPhoto = (eventIndex: number, photoCount: number) => {
    if (photoCount <= 1) return;
    setActivePhotoIndexes((prev) =>
      prev.map((photoIndex, idx) =>
        idx === eventIndex ? (photoIndex + 1) % photoCount : photoIndex,
      ),
    );
  };

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
          Use the arrows under each image to browse that event’s photos 📸
        </p>

        <section className="flex flex-col items-center gap-16 w-full">
          {events.map((event, idx) => {
            const hasGallery = event.photos && event.photos.length > 0;
            const activePhoto = hasGallery
              ? event.photos[activePhotoIndexes[idx] ?? 0]
              : null;
            const currentImage = activePhoto?.src ?? event.hero;
            return (
              <div key={idx} className="w-full group">
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
                    src={currentImage}
                    alt={`${event.name} cover photo`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />

                  {/* --- LIGHT SHINE --- */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent mix-blend-overlay pointer-events-none" />
                </div>

                {hasGallery && (
                  <div className="mt-3 flex items-center justify-between px-1 sm:px-2">
                    <button
                      type="button"
                      onClick={() => showPreviousPhoto(idx, event.photos.length)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#AFCBFF]/45 bg-[#00163E]/70 text-white hover:border-white hover:bg-[#001F5B]"
                      aria-label={`Previous ${event.name} photo`}
                    >
                      ←
                    </button>
                    <span className="text-sm text-[#AFCBFF]">
                      {activePhotoIndexes[idx] + 1} / {event.photos.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => showNextPhoto(idx, event.photos.length)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#AFCBFF]/45 bg-[#00163E]/70 text-white hover:border-white hover:bg-[#001F5B]"
                      aria-label={`Next ${event.name} photo`}
                    >
                      →
                    </button>
                  </div>
                )}

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
    </div>
  );
}
