"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @next/next/no-img-element */

import Donation_Section from "../components/donation-boxes";
import {
  sponsorshipBenefits,
  sponsorsByTier,
  tierStyles,
  type BenefitValue,
  type Tier,
} from "../data/sponsorship-data";

interface SponsorCardProps {
  tier: string;
  logo: string;
}

// =============================================================================
// Component
// =============================================================================
function SponsorCard({ tier, logo }: SponsorCardProps) {
  const style = tierStyles[tier as Tier] || tierStyles.Bronze;

  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${style.shine} opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none`}
      ></div>

      <div
        className={`w-full max-w-[240px] h-[140px] border-4 rounded-3xl px-6 py-4 flex items-center justify-center bg-white ${style.border} ${style.shadow} transition-all duration-300 group-hover:scale-[1.04]`}
      >
        <img
          src={logo}
          alt={`${tier} sponsor`}
          className="object-contain max-h-[80%] transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent group-hover:left-[150%] transition-all duration-1000"></div>
      </div>
    </div>
  );
}

const CheckIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block w-5 h-5 text-green-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Dash = (
  <span className="inline-block w-5 h-5 text-gray-200 select-none">—</span>
);

const renderBenefitValue = (value: BenefitValue) => {
  if (value === "check") return CheckIcon;
  if (value === "dash") return Dash;
  return value;
};

// =============================================================================
// Page Implementation
// =============================================================================

export default function SponsorPage() {
  const buttonCommonClasses =
    "rounded-xl border border-[#A5AACD]/40 bg-gradient-to-r from-[#001F5B] to-[#003377] text-white font-medium py-4 px-8 flex items-center justify-center gap-3 text-base transition transform hover:scale-105 hover:shadow-md hover:from-[#003377] hover:to-[#0050a0]";

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gradient-to-b from-[#00031A] to-[#001F5B] text-white">
      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="rounded-lg bg-white/5 p-8 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#85B6FF]">
            A Letter from SHPE at Cornell
          </p>
          <h1 className="mb-5 text-3xl font-bold text-white">
            Partner With Us
          </h1>
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-[#D6E5FF]">
            Cornell SHPE collaborates with corporate partners to bring
            impactful workshops, mentorship, scholarships, and career
            opportunities to our members.
          </p>
          <p className="mx-auto mt-5 max-w-4xl text-lg italic text-[#FFD2B6]">
            Thank you to our sponsors, because of you our students can keep
            building community, lead, and explore opportunities.
          </p>
        </div>
      </section>

      <section id="sponsors">
        <div className="max-w-6xl mx-auto px-4 text-center mb-10">
          <h2 className="text-3xl font-bold text-[#FD652F]">
            Our Sponsors
          </h2>
          <p className="mt-4 text-base text-[#C1D3FF] max-w-3xl mx-auto">
            Thank you to our partners who make our community possible.
          </p>
        </div>

        {Object.entries(sponsorsByTier)
          .filter(([_, logos]) => (logos as string[]).length > 0)
          .map(([tier, logos]) => (
            <div key={tier} className="mb-16">
              <h3 className="text-2xl font-semibold text-center uppercase mb-6 tracking-wide text-gray-200">
                {tier} Sponsors
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {(logos as string[]).map((logo, idx) => (
                  <SponsorCard key={idx} tier={tier} logo={logo} />
                ))}
              </div>
            </div>
          ))}
      </section>

      {/* ✅ Responsive Sponsorship Table (scrolls smoothly on mobile) */}
      <section className="w-full px-4 md:px-12 py-5 bg-transparent">
        <div className="w-full max-w-7xl mx-auto bg-[#0A0A2A]/70 backdrop-blur-md rounded-3xl shadow-xl border border-[#1F2C50] p-4 sm:p-8 md:p-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-10 sm:mb-12 tracking-tight">
            Sponsorship Tier Comparison
          </h2>

          {/* Scrollable wrapper */}
          <div className="relative">
            {/* subtle gradient edges for style */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#0A0A2A] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#0A0A2A] to-transparent pointer-events-none" />

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#1F2C50] scrollbar-track-transparent scroll-smooth">
              <table className="min-w-[700px] w-full text-xs sm:text-sm md:text-base text-white border-separate border-spacing-y-2 border-spacing-x-2">
                <thead>
                  <tr className="bg-gradient-to-r from-[#1A2A50] to-[#2A3970] text-white">
                    <th className="text-left py-4 px-4 font-semibold tracking-wide rounded-l-2xl shadow-sm bg-[#1F2C50]/90 min-w-[160px]">
                      Benefit
                    </th>
                    <th className="text-center py-4 px-4 font-bold uppercase bg-[#1F2C50]/90">
                      Platinum
                    </th>
                    <th className="text-center py-4 px-4 font-bold uppercase bg-[#1F2C50]/90">
                      Gold
                    </th>
                    <th className="text-center py-4 px-4 font-bold uppercase bg-[#1F2C50]/90">
                      Silver
                    </th>
                    <th className="text-center py-4 px-4 font-bold uppercase bg-[#1F2C50]/90">
                      Bronze
                    </th>
                    <th className="text-center py-4 px-4 font-bold uppercase bg-[#1F2C50]/90 rounded-r-2xl">
                      Other
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sponsorshipBenefits.map((row, i) => (
                    <tr
                      key={row.benefit}
                      className={`transition ${
                        i % 2 === 0 ? "bg-[#1B2340]/70" : "bg-[#2A355D]/50"
                      } hover:bg-[#344b7e]/30`}
                    >
                      <td className="py-3 px-4 font-medium text-gray-100 whitespace-pre-wrap">
                        {row.benefit}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderBenefitValue(row.platinum)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderBenefitValue(row.gold)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderBenefitValue(row.silver)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderBenefitValue(row.bronze)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {renderBenefitValue(row.other)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <Donation_Section />
      </section>

      <section className="text-center pb-10 pt-8">
        <h2 className="text-3xl font-semibold text-[#FD652F] mb-12 tracking-wide drop-shadow-sm">
          Support SHPE @ Cornell
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          <a
            href="/important/26-27-corporate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonCommonClasses}
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#FD652F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Corporate Packet (.pdf)
          </a>

          <a
            href="https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&bledit=1&dids=789."
            target="_blank"
            rel="noopener noreferrer"
            className={buttonCommonClasses}
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#FD652F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Donate Online
          </a>

          <a
            href="/important/Mail-In-Sponsor-Form.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonCommonClasses}
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#FD652F]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            Donate by Mail (.pdf)
          </a>
        </div>
      </section>
    </div>
  );
}
