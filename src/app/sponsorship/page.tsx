"use client";
/* eslint-disable @typescript-eslint/no-unused-vars, @next/next/no-img-element */

import Donation_Section from "../components/donation-boxes";
import HeroScroll from "../components/hero-scroll";

// =============================================================================
// Types and Constants
// =============================================================================
type Tier = "Platinum" | "Gold" | "Silver" | "Bronze";

interface TierStyle {
  border: string;
  shadow: string;
  shine: string;
}

const tierStyles: Record<Tier, TierStyle> = {
  Platinum: {
    border: "border-[#B7BFCC]",
    shadow: "shadow-[0_0_20px_-5px_rgba(183,191,204,0.8)]",
    shine: "from-[#E6F0FF] to-[#FFFFFF]",
  },
  Gold: {
    border: "border-[#C09E5E]",
    shadow: "shadow-[0_0_20px_-5px_rgba(192,158,94,0.8)]",
    shine: "from-[#FFF4E0] to-[#FFFFFF]",
  },
  Silver: {
    border: "border-[#A0A0A0]",
    shadow: "shadow-[0_0_20px_-5px_rgba(160,160,160,0.6)]",
    shine: "from-[#F5F5F5] to-[#FFFFFF]",
  },
  Bronze: {
    border: "border-[#CD7F32]",
    shadow: "shadow-[0_0_20px_-5px_rgba(205,127,50,0.6)]",
    shine: "from-[#FFE9DD] to-[#FFFFFF]",
  },
};

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

const sponsors = {
  Platinum: [
    "/images/sponsors/Lockheed_Martin_logo.svg.png",
    "/images/sponsors/Intuit.png",
  ],
  Gold: [
    "/images/sponsors/Capital_One_logo.svg.png",
    "/images/sponsors/Accenture.svg-2.png",
  ],
  Silver: [],
  Bronze: [
    "/images/sponsors/Jane_Street.png",
    "/images/sponsors/Bloomberg.jpeg",
  ],
  Other: [],
};

// =============================================================================
// Page Implementation
// =============================================================================

export default function SponsorPage() {
  const buttonCommonClasses =
    "rounded-xl border border-[#A5AACD]/40 bg-gradient-to-r from-[#001F5B] to-[#003377] text-white font-medium py-4 px-8 flex items-center justify-center gap-3 text-base transition transform hover:scale-105 hover:shadow-md hover:from-[#003377] hover:to-[#0050a0]";

  const benefits = [
    ["Cost", "$2,000+", "$1,750", "$1,500", "$1,250", "<$1,000"],
    [
      "Recognition on Cornell SHPE Website",
      CheckIcon,
      CheckIcon,
      CheckIcon,
      CheckIcon,
      CheckIcon,
    ],
    ["Resume Book", CheckIcon, CheckIcon, CheckIcon, CheckIcon, Dash],
    [
      "Speaking Opportunity at SHPE G-Body Meeting",
      CheckIcon,
      CheckIcon,
      CheckIcon,
      Dash,
      Dash,
    ],
    [
      "Complimentary Information Session",
      CheckIcon,
      CheckIcon,
      Dash,
      Dash,
      Dash,
    ],
    [
      "Company Logo on SHPE Merch and Additional Info Session",
      CheckIcon,
      Dash,
      Dash,
      Dash,
      Dash,
    ],
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gradient-to-b from-[#00031A] to-[#001F5B] text-white">
      <HeroScroll
        welcomeMessage="Explore Sponsorship Opportunities"
        subMessage="Support SHPE @ Cornell"
        showButton={false}
      />

      <section className="max-w-4xl mx-auto py-16">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Partner With Us
        </h1>
        <p className="text-xl leading-relaxed text-gray-300 text-center">
          Cornell SHPE collaborates with corporate partners to bring impactful
          workshops, mentorship, scholarships, and career opportunities to our
          members. Thank you to all our sponsors for your generous support!
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center text-[#FD652F] mb-10">
          Our Sponsors
        </h2>

        {Object.entries(sponsors)
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
                  {benefits.map(
                    ([benefit, platinum, gold, silver, bronze, other], i) => (
                      <tr
                        key={i}
                        className={`transition ${
                          i % 2 === 0 ? "bg-[#1B2340]/70" : "bg-[#2A355D]/50"
                        } hover:bg-[#344b7e]/30`}
                      >
                        <td className="py-3 px-4 font-medium text-gray-100 whitespace-pre-wrap">
                          {benefit}
                        </td>
                        <td className="py-3 px-4 text-center">{platinum}</td>
                        <td className="py-3 px-4 text-center">{gold}</td>
                        <td className="py-3 px-4 text-center">{silver}</td>
                        <td className="py-3 px-4 text-center">{bronze}</td>
                        <td className="py-3 px-4 text-center">{other}</td>
                      </tr>
                    )
                  )}
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
            href="/important/25-26-corporate.pdf"
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
            href="https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&bledit=1&dids=789.&appealcode=GIVDY25P"
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
