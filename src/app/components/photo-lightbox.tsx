"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function PhotoLightbox({
  src,
  caption,
  onClose,
}: {
  src: string;
  caption?: string;
  onClose: () => void;
}) {
  // Close on ESC key (accessibility)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] bg-[#0B0E1A]/95 flex flex-col items-center justify-center p-6 text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded photo viewer"
      onClick={onClose}
    >
      {/* subtle vignette overlay for film look */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00031A]/30 to-[#00031A]/60 pointer-events-none" />

      {/* ================================
          Accessible Film Memory Frame
         ================================ */}
      <div
        className="relative w-[95vw] md:w-[80vw] max-w-5xl aspect-[4/3] border border-[#C1D3FF]/30 
        rounded-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] bg-[#00122E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative subtle perforations */}
        <div className="absolute top-2 left-0 right-0 flex justify-between px-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-1 bg-[#85B6FF]/25 rounded-sm" />
          ))}
        </div>
        <div className="absolute bottom-2 left-0 right-0 flex justify-between px-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-1 bg-[#85B6FF]/25 rounded-sm" />
          ))}
        </div>

        {/* Image projection */}
        <Image
          src={src}
          alt={caption || "Expanded photo"}
          fill
          className="object-contain bg-[#000A1F]"
        />

        {/* Subtle film reflection — non-blinding */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent mix-blend-overlay pointer-events-none" />
      </div>

      {/* Caption */}
      {caption && (
        <p
          className="text-[#C1D3FF] mt-6 text-base sm:text-lg text-center max-w-3xl leading-snug"
          style={{ lineHeight: 1.5 }}
        >
          {caption}
        </p>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-3xl p-2 rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#85B6FF]"
        aria-label="Close expanded photo"
      >
        ✕
      </button>
    </div>
  );
}
