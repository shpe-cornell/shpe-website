"use client";
import { useState } from "react";
import Head from "next/head";
import { Changa } from "next/font/google";
import Image from "next/image";
import CountdownTimer from "../components/countdown";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function HeaderSection() {
  return (
    <section>
      <h2 className="text-6xl font-bold m-15 text-center text-[#7bb4ff]">
        Points System
      </h2>
      <p className="pt-2 text-2xl text-center px-8 mt-8 m-15 text-[#a8c9ff]">
        Our club uses a point-based system to recognize active members. Points
        are awarded for attending events, participating in outreach, and
        volunteering. These points determine eligibility for conferences and
        exclusive opportunities.
      </p>
    </section>
  );
}

function PointsDescription() {
  return (
    <div
      className="border-2 border-white rounded-s p-4 max-w-xl text-3xl bg-black/30 backdrop-blur-xs text-left md:w-[60%]"
      style={{ backgroundColor: "transparent" }}
    >
      <p className="text-center underline underline-offset-2 text-[#a8c9ff]">
        POINTS
      </p>
      <p className="p-4 text-center text-[#a8c9ff]">
        +1 [Insert Description Here]
      </p>
      <p className="p-4 text-center text-[#6293e1]">
        +2 [Insert Description Here]
      </p>
      <p className="p-4 text-center text-[#3261a8]">
        +3 [Insert Description Here]
      </p>
    </div>
  );
}

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

    if (fakePointsDatabase.hasOwnProperty(memberId)) {
      setPoints(fakePointsDatabase[memberId]);
    } else {
      setPoints(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full md:w-[40%] mt-[60px]">
      <label className="text-[#ffffff] text-3xl text-center" htmlFor="memberId">
        Check My Points ✏️
      </label>

      <input
        type="text"
        id="memberId"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCheckPoints()}
        className="px-4 py-2 rounded-md bg-black text-[#ffffff] border text-center border-white outline-none w-[250px]"
        placeholder="Enter Your Cornell Netid"
      />

      {lookupAttempted && points !== null && (
        <div className="text-white text-center">
          <p className="text-6xl font-semibold">
            <span className="text-[#fdff98]">{points}</span>
          </p>
        </div>
      )}

      {lookupAttempted && points === null && (
        <div className="text-center">
          <p className="text-xl text-[#cf85b8]">NetID not recognized.</p>
          <p className="text-xs text-gray-300 mt-1">
            Contact us if you think this is wrong.
          </p>
        </div>
      )}
    </div>
  );
}

// Chalk picture with timer next to it
function FooterSection() {
  return (
    <div className="flex items-center justify-center gap-6 mt-10 w-full">
      {/* Fixed-width box to prevent shifting */}
      <div className="w-[1000px] flex justify-center items-center">
        <CountdownTimer />
      </div>

      {/* Chalk image in a fixed-size box */}
      <div className="w-[150px] h-[150px] shrink-0">
        <Image
          src="/images/backgrounds/white-chalk.png"
          alt="Chalk"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    </div>
  );
}

// Main page component -- IMPLEMENT THIS AFTER GETTING FEEDBACK FROM MELANIE FOR BACKEND
const fakePointsDatabase = {
  "123": 15,
  "456": 27,
  "789": 42,
};

export default function PointsPage() {
  return (
    <div
      className={`min-h-screen bg-cover bg-gray-900 bg-center flex flex-col mt-[50px] ${changa.className}`}
      // style={{ backgroundImage: "url('images/backgrounds/blackboard.jpg')" }}
    >
      <Head>
        <title>Points System</title>
      </Head>

      <div className="flex flex-col gap-8 px-4">
        <HeaderSection />

        <section className="flex flex-col md:flex-row justify-center items-start gap-6 px-4">
          <PointsDescription />
          <PointsChecker fakePointsDatabase={fakePointsDatabase} />
        </section>

        <FooterSection />
      </div>
    </div>
  );
}
