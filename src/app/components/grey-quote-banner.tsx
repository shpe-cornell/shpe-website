"use client";

export default function GreyQuoteBanner() {
  return (
    <section className="relative w-full px-6 py-14 bg-gradient-to-b from-[#000B2A] via-[#001742] to-[#001F5B] overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/8 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl rounded-2xl border border-[#6E9BE2]/35 bg-[#031435]/55 px-6 py-10 md:px-12 shadow-[0_10px_28px_rgba(0,0,0,0.3)]">
        <p className="text-[#AFCBFF] text-4xl leading-none mb-3">“</p>
        <p
          className="text-[#EAF2FF] text-lg md:text-2xl leading-relaxed font-medium text-center tracking-[0.01em]"
          style={{ fontFamily: "'Changa', sans-serif" }}
        >
          I gained more than just career skills. I became part of a supportive
          community dedicated to helping others like me, including children of
          immigrants and first-generation college students.
        </p>
        <p
          className="mt-6 text-center text-[#9FC2FF] font-semibold tracking-wide text-sm md:text-base"
          style={{ fontFamily: "'Changa', sans-serif" }}
        >
          Juan Gomez ’19
        </p>
        <p className="text-[#AFCBFF] text-4xl leading-none mt-1 text-right">”</p>
      </div>
    </section>
  );
}
