"use client";

import { useState } from "react";
import Image from "next/image";
import PhotoLightbox from "./photo-lightbox";

interface EventPhoto {
  src: string;
  caption?: string;
}

export default function EventGallery({
  event,
  onClose,
}: {
  event: { name: string; subtitle?: string; photos: EventPhoto[] };
  onClose: () => void;
}) {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  return (
    <div
      className="fixed inset-0 bg-[#0B0E1A]/95 text-white z-50 flex flex-col items-center overflow-y-auto pt-20 pb-16"
      role="dialog"
      aria-label={`${event.name} photo gallery`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl p-2 rounded-md hover:bg-white/10"
        aria-label="Close gallery"
      >
        ✕
      </button>

      {/* Title + Subtitle */}
      <div className="text-center px-4 mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#85B6FF] mb-2">
          {event.name}
        </h2>
        {event.subtitle && (
          <p className="text-lg sm:text-xl text-[#AFCBFF] font-light italic">
            {event.subtitle}
          </p>
        )}
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 sm:px-10 max-w-6xl w-full">
        {event.photos.map((photo, idx) => (
          <figure
            key={idx}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActivePhoto(idx)}
          >
            <div className="relative w-full aspect-[4/3] border border-[#C1D3FF]/40 rounded-md overflow-hidden bg-[#00122E] shadow-md">
              <Image
                src={photo.src}
                alt={photo.caption || `${event.name} photo ${idx + 1}`}
                fill
                className="object-contain bg-[#000A1F]"
              />
            </div>
            {photo.caption && (
              <figcaption className="text-sm sm:text-base text-[#C1D3FF] mt-3 text-center max-w-md leading-snug">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Lightbox for fullscreen */}
      {activePhoto !== null && (
        <PhotoLightbox
          src={event.photos[activePhoto].src}
          caption={event.photos[activePhoto].caption}
          onClose={() => setActivePhoto(null)}
        />
      )}
    </div>
  );
}
