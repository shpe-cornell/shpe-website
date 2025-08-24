"use client";
// import Link from "next/link";

export default function GreyQuoteBanner() {
  return (
    <div className="relative w-full h-auto flex items-center justify-center px-6 py-10 bg-gradient-to-r from-[#00031A] to-[#001F5B] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl pointer-events-none z-0" />

      {/* Quote */}
      <div className="relative z-10 max-w-5xl text-center p-6 md:p-10">
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          rel="stylesheet"
        /> */}
        <p
          className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed italic font-light"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          “I gained more than just career skills—I became part of a supportive
          community, dedicated to helping others like me, including children of
          immigrants and first-generation college students.”
        </p>
        <p className="mt-4 text-[#85B6FF] font-medium tracking-wide text-sm sm:text-md not-italic">
          – Juan Gomez ‘19
        </p>
      </div>
    </div>
  );
}
