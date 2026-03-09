"use client";

import HeroScroll from "../components/hero-scroll";
import ExecCard from "../components/exec-card";
import { execBoard } from "../data/team-data";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00031A] to-[#001f5b] pt-20">
      <HeroScroll
        welcomeMessage="Meet Your SHPE Leadership Team"
        showButton={false}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-[#FD652F] drop-shadow-md">
            Executive Board 2025-2026
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-[#0070C0] opacity-80"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
          {execBoard.map((member, idx) => (
            <ExecCard key={`${member.name}-${idx}`} member={member} />
          ))}
        </div>
      </div>

      <div className="h-16"></div>
    </div>
  );
}
