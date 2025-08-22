"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import { Changa } from "next/font/google";
import CountdownTimer from "../components/countdown";
import Announcements from "../components/announcements";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

/* Header Section */
function HeaderSection() {
  return (
    <section className="text-center px-6 md:px-20 mt-10 max-w-4xl mx-auto">
      <h2 className="pb-5 text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#85B6FF] to-[#FD652F]">
        Conference Points System
      </h2>
      <p className="text-2xl text-[#3261a8] leading-relaxed max-w-prose mx-auto tracking-tight">
        Our club uses a point-based system to recognize active members. Points
        are awarded for attending events, participating in outreach, and
        volunteering. These points determine eligibility for conferences and
        exclusive opportunities.
      </p>
    </section>
  );
}

/* Points Description */
function PointsDescription() {
  return (
    <div className="bg-gradient-to-br from-[#001F5B] via-[#003366] to-[#004080] shadow-xl border border-[#0070C0]/30 rounded-xl p-8 w-full max-w-xl mx-auto md:mx-0 backdrop-blur-sm">
      <h3 className="text-center text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#FF7B4D] via-[#FD652F] to-[#FF5100] pb-2">
        Points Breakdown
      </h3>
      <ul className="text-xl space-y-6 text-[#A4C2FF]">
        <li className="pl-15">+1 — Complete Tech Workshops & Study Jams</li>
        <li className="pl-15">+2 — Join Professional Development & Socials</li>
        <li className="pl-15">+3 — Contribute to G-body Initiatives</li>
        <li className="pl-15">+5 — Lead/Serve in Community Projects</li>
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

  const cacheRef = useRef<Record<string, { points: number; name: string }>>({});

  const handleCheckPoints = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLookupAttempted(true);

    const id = memberId.trim().toLowerCase();
    if (!id) return;

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
      const res = await fetch(`/api/get-points?netid=${id}`);
      if (!res.ok) return;
      const data = await res.json();
      setPoints(Number(data.points));
      setName(data.name);
      cacheRef.current[id] = { points: Number(data.points), name: data.name };
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mt-20 md:mt-0 mx-auto">
      <label
        htmlFor="memberId"
        className="text-3xl text-[#FD652F] font-bold text-center tracking-wide"
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
          className="w-[280px] px-5 py-3 text-center text-white bg-[#002F6C] border-2 border-[#FD652F] rounded-lg outline-none placeholder:text-[#A4C2FF] focus:ring-2 focus:ring-[#FD652F] transition"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#FD652F] hover:bg-[#e65516] text-white font-semibold px-6 rounded-full shadow-md hover:shadow-lg transition"
        >
          {loading ? "Loading..." : "Check"}
        </button>
      </form>

      {lookupAttempted && !loading && points !== null && (
        <div className="text-center mt-4">
          <p className="text-xl text-[#0070C0] font-semibold">{name}</p>
          <p className="text-7xl font-extrabold text-[#00A4FF] drop-shadow-lg">
            {points}
          </p>
        </div>
      )}

      {lookupAttempted && !loading && points === null && (
        <div className="text-center mt-6">
          <p className="text-xl text-[#0070C0] font-semibold tracking-wide">
            NetID not recognized.
          </p>
        </div>
      )}
    </div>
  );
}

/* Footer Timer */
function FooterSection() {
  return (
    <section className="flex justify-center mt-16 px-4">
      <div className="w-full max-w-3xl flex justify-center items-center p-5 mb-10 rounded-2xl bg-gradient-to-tr from-[#004080] to-[#001F5B] shadow-inner">
        <CountdownTimer />
      </div>
    </section>
  );
}

export default function PointsPage() {
  return (
    <div
      className={`min-h-screen pt-[70px] bg-gradient-to-b from-[#00031A] to-[#001F5B] ${changa.className}`}
    >
      <Head>
        <title>Points System</title>
      </Head>
      <main className="flex flex-col items-center px-4 gap-2">
        <HeaderSection />
        <section className="flex flex-col md:flex-row justify-center items-start gap-12 w-full max-w-6xl mt-10 px-2 md:px-0">
          <PointsDescription />
          <PointsChecker />
        </section>
        <FooterSection />
        <Announcements />
      </main>
    </div>
  );
}
