"use client";

import Image from "next/image";
import type { ExecMember } from "../data/team-data";

interface ExecCardProps {
  member: ExecMember;
  priority?: boolean;
}

export default function ExecCard({ member, priority = false }: ExecCardProps) {
  const isApplicationCard = Boolean(member.applyLink);

  const cardContent = (
    <div
      className={`w-[270px] rounded-lg overflow-hidden group relative bg-[#001f5b] border shadow-lg transition-all duration-300 ${
        isApplicationCard
          ? "border-[#FD652F]/70 hover:-translate-y-1 hover:border-[#FD652F] hover:shadow-[0_0_24px_-4px_rgba(253,101,47,0.55)]"
          : "border-gray-600/30 hover:border-orange-400/50 hover:shadow-[0_0_20px_-5px_rgba(100,150,255,0.3)]"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,150,255,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="text-center mt-3 mb-2 text-blue-200 text-md font-medium tracking-wider">
        {member.position}
      </div>

      <div className="flex justify-center px-4">
        <div className="relative w-[200px] h-[275px] rounded-lg overflow-hidden border border-gray-500/30 group-hover:border-blue-300/50 transition-colors duration-300">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="200px"
            priority={priority}
            className="object-cover group-hover:brightness-110 transition duration-300"
            style={{ objectPosition: member.imagePosition || "center" }}
            draggable={false}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_95%,rgba(100,150,255,0.1)_100%)]" />
        </div>
      </div>

      <div className="text-center text-xl font-bold text-white mt-3 tracking-tight">
        {member.name}
      </div>

      <div className="text-center text-sm text-blue-200 mt-1 font-medium uppercase tracking-wider">
        {member.major} <span className="text-blue-100/80">{member.year}</span>
      </div>

      {/* Inline contact row integrated into card body */}
      <div className="relative mt-4 mb-4 px-5">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#85B6FF]/60 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#001f5b] px-3">
          <div className="flex items-center justify-center gap-3">
            {member.email?.trim() && (
              <a
                href={`mailto:${member.email}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Email ${member.name}`}
                className="hover:scale-110 transition-transform"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]"
                >
                  <rect x="3.2" y="5.5" width="17.6" height="13" rx="2.4" />
                  <path d="M4.6 7.1 12 12.6l7.4-5.5" />
                </svg>
              </a>
            )}
            {member.linkedin?.trim() && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} LinkedIn`}
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src="/images/icons/linkedin2.png"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                  className="[filter:brightness(0)_invert(1)] opacity-100 hover:opacity-100 transition-opacity"
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {isApplicationCard && (
        <div className="px-5 pb-5 -mt-1">
          <div className="rounded-md border border-[#FD652F]/70 bg-[#FD652F] px-3 py-2 text-center text-sm font-bold text-white shadow-[0_0_14px_-6px_rgba(253,101,47,0.9)] transition-colors duration-300 group-hover:bg-[#ff7a45]">
            {member.applyCta || "Apply Now"} -&gt;
          </div>
        </div>
      )}
    </div>
  );

  if (member.applyLink) {
    return (
      <a
        href={member.applyLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={member.applyCta || `Apply for ${member.position}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FD652F] focus-visible:ring-offset-4 focus-visible:ring-offset-[#00031A]"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
