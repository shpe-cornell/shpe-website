"use client";

import { useState } from "react";
import Head from "next/head";
import { Changa } from "next/font/google";
import CountdownTimer from "../components/countdown";
import Announcements from "../components/announcements";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

/* -------------------------------------------------------------------------- */
/* Header */
/* -------------------------------------------------------------------------- */
function HeaderSection() {
  return (
    <section className="text-center px-6 md:px-20 mt-10 max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-bold text-[#FD652F] mb-6 tracking-wide drop-shadow-md">
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

/* -------------------------------------------------------------------------- */
/* Points Description */
/* -------------------------------------------------------------------------- */
function PointsDescription() {
  return (
    <div className="bg-gradient-to-tr from-[#001F5B] to-[#004080] shadow-lg border border-[#0070C0] rounded-xl p-8 w-full max-w-xl mx-auto md:mx-0">
      <h3 className="text-center text-[#FD652F] text-3xl font-semibold underline underline-offset-4 mb-6 tracking-wide drop-shadow-sm">
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

/* -------------------------------------------------------------------------- */
/* Points Checker */
/* -------------------------------------------------------------------------- */
function PointsChecker({
  fakePointsDatabase,
}: {
  fakePointsDatabase: Record<string, number>;
}) {
  const [memberId, setMemberId] = useState("");
  const [points, setPoints] = useState<number | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);

  const handleCheckPoints = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLookupAttempted(true);
    setPoints(fakePointsDatabase[memberId] ?? null);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mt-20 md:mt-0 mx-auto md:mx-0">
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
          className="bg-[#FD652F] hover:bg-[#e65516] text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
        >
          Check
        </button>
      </form>

      {lookupAttempted && points !== null && (
        <p className="text-7xl font-extrabold text-[#00A4FF] drop-shadow-lg mt-6">
          {points}
        </p>
      )}

      {lookupAttempted && points === null && (
        <div className="text-center mt-6">
          <p className="text-xl text-[#0070C0] font-semibold tracking-wide">
            NetID not recognized.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Contact us if you think this is wrong.
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer Timer */
/* -------------------------------------------------------------------------- */
function FooterSection() {
  return (
    <section className="flex justify-center mt-16 px-4">
      <div
        className="w-full max-w-3xl flex justify-center items-center p-8 rounded-2xl bg-gradient-to-tr from-[#004080] to-[#001F5B] shadow-inner"
        style={{
          boxShadow:
            "inset 0 4px 8px rgba(0,0,0,0.15), inset 0 16px 30px rgba(0,0,0,0.3)",
        }}
      >
        <CountdownTimer />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Page Controll */
/* -------------------------------------------------------------------------- */
const fakePointsDatabase = {
  "123": 15,
  "456": 27,
  "789": 42,
};

export default function PointsPage() {
  return (
    <div
      className={`min-h-screen mt-[55px] pt-[70px] pb-16 bg-gradient-to-b from-[#00031A] to-[#001F5B] ${changa.className}`}
    >
      <Head>
        <title>Points System</title>
      </Head>

      <main className="flex flex-col items-center px-4 gap-12">
        <HeaderSection />

        <section className="flex flex-col md:flex-row justify-center items-start gap-12 w-full max-w-6xl mt-10 px-2 md:px-0">
          <PointsDescription />
          <PointsChecker fakePointsDatabase={fakePointsDatabase} />
        </section>

        <FooterSection />
        <Announcements></Announcements>
      </main>
    </div>
  );
}
