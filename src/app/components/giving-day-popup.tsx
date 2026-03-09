"use client";

import { useEffect, useState } from "react";
import { givingDayCampaign } from "../data/giving-day-data";

const DISMISS_KEY = "shpe-giving-day-dismissed";

export function GivingDayPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!givingDayCampaign.enabled) return;
    const dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    if (!dismissed) setIsOpen(true);
  }, []);

  const closePopup = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setIsOpen(false);
  };

  if (!givingDayCampaign.enabled || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#00031A]/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-[#8A6B52]/35 bg-white px-5 py-8 text-[#4f3726] shadow-[0_18px_44px_rgba(0,0,0,0.36)] sm:px-8">
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close Giving Day invitation"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#7A573D]/30 text-[#7A573D] hover:bg-[#f3e5cf]"
        >
          ✕
        </button>

        <svg
          viewBox="0 0 800 120"
          aria-hidden="true"
          className="mx-auto mb-2 block w-full max-w-[520px] text-[#7A573D]"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M40 60h150" strokeWidth="1.4" opacity=".7" />
            <path d="M610 60h150" strokeWidth="1.4" opacity=".7" />
            <path d="M190 60c34 0 40-26 76-26s42 26 76 26" strokeWidth="2.2" />
            <path d="M610 60c-34 0-40-26-76-26s-42 26-76 26" strokeWidth="2.2" />
            <circle cx="400" cy="60" r="6" strokeWidth="2" />
          </g>
        </svg>

        <div className="text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#6D4B33]">
            {givingDayCampaign.title}
          </p>
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
            {givingDayCampaign.invitationTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-md font-serif text-base leading-relaxed text-[#5e4430] sm:text-lg">
            {givingDayCampaign.invitationSubtitle}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href={givingDayCampaign.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#7A573D]/40 bg-[#7A573D] px-6 py-2.5 font-serif text-base font-semibold text-white shadow-[0_6px_16px_rgba(122,87,61,0.28)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#6B4B34]"
            >
              {givingDayCampaign.ctaLabel}
            </a>
            <button
              type="button"
              onClick={closePopup}
              className="rounded-full border border-[#7A573D]/35 px-4 py-2 text-sm text-[#6D4B33] hover:bg-[#f4e8d5]"
            >
              Maybe later
            </button>
          </div>
        </div>

        <svg
          viewBox="0 0 800 45"
          aria-hidden="true"
          className="mx-auto mt-6 block w-full max-w-[420px] text-[#7A573D]"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            <path d="M120 22.5h190" strokeWidth="1.1" opacity=".55" />
            <path d="M490 22.5h190" strokeWidth="1.1" opacity=".55" />
            <path d="M310 22.5c14 0 14-10 28-10s14 10 28 10" strokeWidth="1.6" />
            <path d="M490 22.5c-14 0-14-10-28-10s-14 10-28 10" strokeWidth="1.6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
