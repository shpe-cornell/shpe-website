"use client";
import Link from "next/link";

export default function GreyQuoteBanner() {
  return (
    <div className="relative w-full h-auto flex items-center justify-center px-6 overflow-hidden">
      {/* Background Color */}
      <div className="absolute inset-0 bg-[gray]/20  opacity-60 blur-sm pointer-events-none"></div>

      {/* Quote */}
      <div className="relative w-full flex flex-col sm:flex-row items-center justify-between z-10 p-6">
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
        <div className="border-1 border-black p-4">
          <p
            className="text-[#001F5B] text-3xl font-semibold text-center"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            “I gained more than just career skills—I became part of a supportive
            community, dedicated to helping others like me, including children
            of immigrants and first-generation college students.” - Juan Gomez
            ‘19
          </p>
        </div>
      </div>
    </div>
  );
}
