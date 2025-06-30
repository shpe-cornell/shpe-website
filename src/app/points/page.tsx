"use client";

import { useState } from "react";
import Head from "next/head";
import { Changa } from "next/font/google";
import CountdownTimer from "../components/countdown";

const changa = Changa({ subsets: ["latin"], weight: ["400", "700"] });

/* -------------------------------------------------------------------------- */
/*                                   Section: Header                          */
/* -------------------------------------------------------------------------- */
function HeaderSection() {
  return (
    <section className="text-center px-6 md:px-20 mt-10">
      <h2 className="text-5xl md:text-6xl font-bold text-[#FD652F] mb-6">
        Conference Points System
      </h2>
      <p className="text-2xl text-[#3261a8] leading-relaxed">
        Our club uses a point-based system to recognize active members. Points
        are awarded for attending events, participating in outreach, and
        volunteering. These points determine eligibility for conferences and
        exclusive opportunities.
      </p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Section: Points Description                   */
/* -------------------------------------------------------------------------- */
function PointsDescription() {
  return (
    <div className="bg-white shadow-lg shadow-[#72A9BE] border border-gray-200 rounded-xl p-6 w-full max-w-xl mx-auto md:mx-0">
      <h3 className="text-center text-[#FD652F] text-3xl font-semibold underline underline-offset-4 mb-4">
        Points Breakdown
      </h3>
      <ul className="text-xl space-y-4 text-[#3261a8]">
        <li className="text-center">+1 — Attending a general body meeting</li>
        <li className="text-center">+2 — Volunteering at an event</li>
        <li className="text-center">+3 — Representing SHPE at a conference</li>
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Points Checker */
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
    <div className="flex flex-col items-center gap-4 w-full max-w-md mt-8 md:mt-0 mx-auto md:mx-0">
      <label
        htmlFor="memberId"
        className="text-3xl text-[#FD652F] font-bold text-center"
      >
        Check My Points ✏️
      </label>

      <input
        id="memberId"
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCheckPoints()}
        className="w-[250px] px-4 py-2 text-center text-white bg-[#001f5b] border-2 border-[#FD652F] rounded-md outline-none placeholder:text-gray-200"
        placeholder="Enter Your NetID"
      />

      {lookupAttempted && points !== null && (
        <p className="text-6xl font-bold text-[#0070C0]">{points}</p>
      )}

      {lookupAttempted && points === null && (
        <div className="text-center">
          <p className="text-xl text-[#0070C0] font-semibold">
            NetID not recognized.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Contact us if you think this is wrong.
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Section: Footer Timer */
/* -------------------------------------------------------------------------- */
function FooterSection() {
  return (
    <section className="flex justify-center mt-12 px-4">
      <div
        className="w-full max-w-3xl flex justify-center items-center p-6 rounded-xl bg-white py-6 shadow-inner"
        style={{
          boxShadow:
            "inset 0 2px 4px rgba(0,0,0,0.1), inset 0 8px 15px rgba(0,0,0,0.2)",
        }}
      >
        <CountdownTimer />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT */
/* -------------------------------------------------------------------------- */
const fakePointsDatabase = {
  "123": 15,
  "456": 27,
  "789": 42,
};

export default function PointsPage() {
  return (
    <div
      className={`min-h-screen pt-[70px] pb-12 bg-[#F8FAFC] ${changa.className}`}
    >
      <Head>
        <title>Points System</title>
      </Head>

      <main className="flex flex-col items-center px-4 gap-12">
        <HeaderSection />

        <section className="flex flex-col md:flex-row justify-center items-start gap-10 w-full max-w-6xl mt-10">
          <PointsDescription />
          <PointsChecker fakePointsDatabase={fakePointsDatabase} />
        </section>

        <FooterSection />
      </main>
    </div>
  );
}
