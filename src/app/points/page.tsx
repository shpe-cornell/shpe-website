"use client";

import Head from "next/head";
import Image from "next/image";
import { useState, useRef } from "react";
import { Changa } from "next/font/google";
import CountdownTimer from "../components/countdown";
import { countryBubbles, eventBubbles } from "../data/points-carousel-data";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

type MemberCache = {
  points: number;
  name: string;
};

type PointsLookupResponse = {
  status?: "success" | "not_found";
  name?: string;
  totalPoints?: number;
  error?: string;
};

/* Header Section */
function HeaderSection() {
  return (
    <section className="text-center px-6 md:px-20 mt-10 max-w-4xl mx-auto">
      <h2 className="pb-5 text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#85B6FF] to-[#FD652F]">
        Convention Points System
      </h2>
      <p className="text-lg md:text-2xl text-[#3261a8] leading-relaxed max-w-prose mx-auto tracking-tight">
        Our club uses a point-based system to recognize active members. Points
        are awarded for attending events, participating in outreach, and
        volunteering. These points determine eligibility for conventions and
        exclusive opportunities.
      </p>
    </section>
  );
}

/* Points Description */
function PointsDescription() {
  return (
    <div className="bg-gradient-to-br from-[#001F5B] via-[#003366] to-[#004080] shadow-xl border border-[#0070C0]/30 rounded-xl p-7 w-full max-w-[470px] mx-auto md:mx-0 backdrop-blur-sm">
      <h3 className="text-center text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF7B4D] via-[#FD652F] to-[#FF5100] pb-2">
        Points Breakdown
      </h3>
      <ul className="mt-4 space-y-4 text-base md:text-lg text-[#A4C2FF] text-left">
        <li className="leading-snug">
          +1 — Complete Tech Workshops & Study Jams
        </li>
        <li className="leading-snug">
          +2 — Join Professional Development & Socials
        </li>
        <li className="leading-snug">+3 — Contribute to G-body Initiatives</li>
        <li className="leading-snug">+5 — Lead/Serve in Community Projects</li>
      </ul>
    </div>
  );
}

/* Points Checker */
function PointsChecker() {
  const [memberId, setMemberId] = useState("");
  const [points, setPoints] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lookupAttempted, setLookupAttempted] = useState(false);

  const cacheRef = useRef<Record<string, MemberCache>>({});

  const handleCheckPoints = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLookupAttempted(true);

    const id = memberId.trim().toLowerCase();
    if (!id) return;

    // Return from cache if already looked up
    if (cacheRef.current[id]) {
      const cached = cacheRef.current[id];
      setPoints(cached.points);
      setName(cached.name);
      return;
    }

    setLoading(true);
    setPoints(null);
    setName(null);

    try {
      const response = await fetch("/api/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ netId: id }),
      });

      const payload = (await response.json()) as PointsLookupResponse;

      if (!response.ok) {
        throw new Error(payload.error ?? "Could not fetch points.");
      }

      if (payload.status !== "success" || payload.totalPoints === undefined || !payload.name) {
        setPoints(null);
        setName(null);
        return;
      }

      setPoints(payload.totalPoints);
      setName(payload.name);
      cacheRef.current[id] = { points: payload.totalPoints, name: payload.name };
    } catch (err) {
      console.error("Error fetching points:", err);
      setPoints(null);
      setName(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[420px] mt-12 md:mt-0 mx-auto">
      <label
        htmlFor="memberId"
        className="text-2xl sm:text-3xl text-[#FD652F] font-bold text-center tracking-wide"
      >
        Check My Points ✏️
      </label>

      <form
        onSubmit={handleCheckPoints}
        className="w-full flex flex-col items-center gap-4"
      >
        <input
          id="memberId"
          type="text"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          placeholder="Enter Your NetID"
          className="w-full max-w-[280px] px-5 py-3 text-center text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF] focus:ring-2 focus:ring-[#FD652F] transition"
          autoComplete="off"
          autoCapitalize="none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FD652F] hover:bg-[#e65516] text-white font-semibold px-6 rounded-full shadow-md hover:shadow-lg transition"
        >
          {loading ? "Loading..." : "Check"}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center mt-4">
          <img
            src="images/shpe-logos/shpe-emblem-transparent.png"
            className="w-20 h-20 animate-spin"
            alt="Loading spinner"
          />
        </div>
      )}

      {lookupAttempted && !loading && points !== null && (
        <div className="text-center mt-4">
          <p className="text-xl text-[#0070C0] font-semibold">{name}</p>
          <p className="text-6xl sm:text-7xl font-extrabold text-[#00A4FF] drop-shadow-lg">
            {points}
          </p>
          <p className="text-[#A4C2FF] text-sm mt-1">points this year</p>
        </div>
      )}

      {lookupAttempted && !loading && points === null && (
        <div className="text-center mt-6">
          <p className="text-xl text-[#0070C0] font-semibold tracking-wide">
            NetID not recognized.
          </p>
          <p className="text-[#A4C2FF] text-sm mt-1">
            Check in at your next event to get started!
          </p>
        </div>
      )}
    </div>
  );
}

/* Footer Timer */
function FooterSection() {
  return (
    <section className="flex justify-center -mt-2 px-4 mb-0">
      <div className="w-full max-w-3xl flex justify-center items-center py-2">
        <div className="w-full text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#72A9BE]/60 to-transparent mb-4" />
          <CountdownTimer />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FD652F]/45 to-transparent mt-4" />
        </div>
      </div>
    </section>
  );
}

function CountryRepresentationSection() {
  const verticalBubbles = [...countryBubbles, ...countryBubbles];

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-white/15 bg-[#00163e]/35 p-4">
        <h3 className="text-center text-lg font-bold text-[#EAF2FF]">
          Represent Your Country
        </h3>
        <div className="relative mt-4 h-[430px] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(114,169,190,0.12),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(253,101,47,0.10),transparent_48%)]" />
          <div
            className="relative z-10 flex flex-col items-center gap-4"
            style={{ animation: "countryStreamVertical 40s linear infinite" }}
          >
            {verticalBubbles.map((bubble, idx) => (
              <div
                key={`${bubble.country}-${idx}`}
                className="relative h-[118px] w-[118px] rounded-full overflow-hidden border border-white/35 shadow-[0_8px_20px_rgba(0,0,0,0.32)]"
              >
                <Image
                  src={bubble.image}
                  alt={`${bubble.country} at SHPE Conference`}
                  fill
                  sizes="118px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00112f]/75 via-transparent to-transparent" />
                <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white font-semibold tracking-wide px-2 py-0.5 rounded-full bg-[#001f5b]/65 whitespace-nowrap">
                  {bubble.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventsCarouselSection() {
  const verticalBubbles = [...eventBubbles, ...eventBubbles];

  return (
    <section className="w-full">
      <div className="rounded-2xl border border-white/15 bg-[#00163e]/35 p-4">
        <h3 className="text-center text-lg font-bold text-[#EAF2FF]">
          Events Highlights
        </h3>
        <div className="relative mt-4 h-[430px] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(114,169,190,0.12),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(253,101,47,0.10),transparent_48%)]" />
          <div
            className="relative z-10 flex flex-col items-center gap-4"
            style={{
              animation: "countryStreamVertical 38s linear infinite reverse",
            }}
          >
            {verticalBubbles.map((bubble, idx) => (
              <div
                key={`${bubble.label}-${idx}`}
                className="relative h-[118px] w-[118px] rounded-full overflow-hidden border border-white/35 shadow-[0_8px_20px_rgba(0,0,0,0.32)]"
              >
                <Image
                  src={bubble.image}
                  alt={`${bubble.label} at SHPE`}
                  fill
                  sizes="118px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00112f]/75 via-transparent to-transparent" />
                <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-white font-semibold tracking-wide px-2 py-0.5 rounded-full bg-[#001f5b]/65 whitespace-nowrap">
                  {bubble.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileCarouselsSection() {
  const mobileEventStream = [...eventBubbles, ...eventBubbles];
  const mobileCountryStream = [...countryBubbles, ...countryBubbles];

  return (
    <section className="xl:hidden w-full mt-4 space-y-4 px-2">
      <div className="rounded-2xl border border-white/15 bg-[#00163e]/35 p-3">
        <h3 className="text-center text-base font-bold text-[#EAF2FF] mb-3">
          Events Highlights
        </h3>
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-3"
            style={{ animation: "countryStream 30s linear infinite" }}
          >
            {mobileEventStream.map((bubble, idx) => (
              <div
                key={`mobile-event-${idx}`}
                className="relative shrink-0 h-[106px] w-[106px] rounded-full overflow-hidden border border-white/35 shadow-[0_8px_20px_rgba(0,0,0,0.32)]"
              >
                <Image
                  src={bubble.image}
                  alt={`${bubble.label} at SHPE`}
                  fill
                  sizes="106px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00112f]/75 via-transparent to-transparent" />
                <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-white font-semibold tracking-wide px-1.5 py-0.5 rounded-full bg-[#001f5b]/65 whitespace-nowrap">
                  {bubble.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/15 bg-[#00163e]/35 p-3">
        <h3 className="text-center text-base font-bold text-[#EAF2FF] mb-3">
          Represent Your Country
        </h3>
        <div className="overflow-hidden">
          <div
            className="flex w-max gap-3"
            style={{ animation: "countryStream 34s linear infinite reverse" }}
          >
            {mobileCountryStream.map((bubble, idx) => (
              <div
                key={`mobile-country-${idx}`}
                className="relative shrink-0 h-[106px] w-[106px] rounded-full overflow-hidden border border-white/35 shadow-[0_8px_20px_rgba(0,0,0,0.32)]"
              >
                <Image
                  src={bubble.image}
                  alt={`${bubble.country} at SHPE Conference`}
                  fill
                  sizes="106px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00112f]/75 via-transparent to-transparent" />
                <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-white font-semibold tracking-wide px-1.5 py-0.5 rounded-full bg-[#001f5b]/65 whitespace-nowrap">
                  {bubble.country}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PointsPage() {
  return (
    <div
      className={`relative min-h-screen pt-[70px] bg-gradient-to-b from-[#00031A] to-[#001F5B] ${changa.className}`}
    >
      <Head>
        <title>Points System</title>
      </Head>
      <main className="flex flex-col items-center px-4 gap-2">
        <HeaderSection />
        <section className="flex flex-col md:flex-row justify-center items-start gap-6 w-full max-w-[800px] mt-10 px-2 md:px-0">
          <PointsDescription />
          <PointsChecker />
        </section>
        <FooterSection />
        <MobileCarouselsSection />
      </main>

      {/* Right rail carousel */}
      <div className="hidden xl:block absolute right-4 top-[170px] w-[220px] z-20">
        <CountryRepresentationSection />
      </div>

      {/* Left rail events carousel */}
      <div className="hidden xl:block absolute left-4 top-[170px] w-[220px] z-20">
        <EventsCarouselSection />
      </div>
    </div>
  );
}
