"use client";

import { Changa } from "next/font/google";
import HeroScroll from "../components/hero-scroll";
import { useEffect, useState } from "react";
import BeholdWidget from "@behold/react";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const buttonClass =
  "w-full max-w-[280px] px-6 py-3 sm:py-4 text-lg sm:text-xl text-white rounded-full transition font-semibold bg-[#001F5B] border border-white/30 hover:bg-[#0070C0] hover:scale-105";

type MemberPoints = {
  name: string;
  netId: string;
  points: number;
};

export default function MemberInfoPage() {
  const [loading, setLoading] = useState(true);
  const [pointsLoading, setPointsLoading] = useState(true);
  const [members, setMembers] = useState<MemberPoints[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch("/api/points/all");
        const data = await response.json();
        if (data.status === "success") {
          setMembers(data.members);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      } finally {
        setPointsLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-gradient-to-b from-[#00031A] to-[#001f5b] text-white font-sans">
      {/* Welcome Message Text */}
      <HeroScroll
        welcomeMessage="Explore Happenings for Members"
        subMessage="Get involved with SHPE @ Cornell"
        showButton={true}
        buttonHref="https://docs.google.com/forms/d/e/1FAIpQLSefPfxjHbs45JLnP2LcNlrwjV3rT5Q3BlfkPQwEyqCBoiGojQ/viewform?usp=heade"
        buttonText="Give Us Feedback"
      />

      {loading ? (
        <div className="flex justify-center items-center ">
          <img
            src="/images/shpe-logos/shpe-emblem-transparent.png"
            className="w-20 h-20 animate-spin"
            alt="SHPE logo"
          />
        </div>
      ) : (
        <>
          {/* Upcoming Events Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FD652F] mb-6 mt-10 tracking-wide drop-shadow-lg text-center px-4">
            Upcoming Events
          </h2>

          {/* Events Section */}
          <section className="w-full flex flex-col lg:flex-row-reverse justify-center gap-8 max-w-7xl px-4">
            {/* Calendar */}
            <div className="order-1 lg:order-2 w-full max-w-[800px] h-[340px] sm:h-[400px] lg:h-[600px] bg-[#002550] rounded-xl p-4 sm:p-5 shadow-xl border border-[#004080] mx-auto">
              <iframe
                src="https://calendar.google.com/calendar/u/0/embed?src=10c8673a173371a1e5b9a8f48a00471f49c586b233f14ab287c11a8818f933ea@group.calendar.google.com&ctz=America/New_York"
                style={{ border: 0 }}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                scrolling="no"
                title="SHPE Cornell Events Calendar"
              ></iframe>
            </div>

            {/* Flyers (Behold posts) */}
            <div className="order-2 lg:order-1 w-full lg:w-1/3 h-[340px] sm:h-[400px] lg:h-[600px] bg-[#002550] rounded-xl p-4 sm:p-5 shadow-xl border border-[#004080] overflow-y-auto scroll-mt-0">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#40c4ff] mb-4 tracking-wide drop-shadow-sm text-center">
                Explore Our Instagram
              </h3>
              <BeholdWidget feedId="5hnsHoxgKwXhkvgSiGYB" />
            </div>
            {/* <div className="w-full lg:w-1/3 h-[600px] bg-[#002550] rounded-xl p-6 overflow-y-auto relative shadow-xl border border-[#004080]">
              <div className="space-y-12">
                {flyers.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`Flyer ${idx + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto rounded-lg shadow-lg"
                    priority={idx === 0}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white opacity-50 animate-bounce text-sm pointer-events-none select-none">
              </div>
            </div> */}
          </section>

          {/* Get Plugged In Section */}
          <section className="w-full max-w-5xl text-center mt-10 mb-12 px-4">
            <h2
              className={`text-3xl sm:text-4xl font-extrabold mb-8 text-[#40c4ff] tracking-wide drop-shadow-lg ${changa.className}`}
            >
              Get Plugged In
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center items-center">
              <a
                href="https://join.slack.com/t/shpecornell/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={buttonClass}>Join us on Slack</button>
              </a>
              <a
                href="https://calendar.google.com/calendar/u/0/embed?src=10c8673a173371a1e5b9a8f48a00471f49c586b233f14ab287c11a8818f933ea@group.calendar.google.com&ctz=America/New_York"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={buttonClass}>Join our Calendar</button>
              </a>
              <a
                href="https://www.instagram.com/cornellshpe/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={buttonClass}>Follow us on Insta</button>
              </a>
              <a
                href="https://www.linkedin.com/company/shpe-at-cornell-university/?trk=ppro_cprof"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={buttonClass}>Follow us on LinkedIn</button>
              </a>
            </div>
          </section>

          {/* Points Leaderboard Section */}
          <section className="w-full max-w-5xl text-center mt-10 mb-12 px-4">
            <h2
              className={`text-3xl sm:text-4xl font-extrabold mb-8 text-[#FD652F] tracking-wide drop-shadow-lg ${changa.className}`}
            >
              Points Leaderboard
            </h2>
            {pointsLoading ? (
              <div className="flex justify-center items-center">
                <img
                  src="/images/shpe-logos/shpe-emblem-transparent.png"
                  className="w-20 h-20 animate-spin"
                  alt="Loading points"
                />
              </div>
            ) : (
              <div className="bg-[#002550] rounded-xl p-6 shadow-xl border border-[#004080] max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {members.map((member, index) => (
                    <div
                      key={member.netId}
                      className="flex justify-between items-center py-2 px-4 bg-[#001F5B] rounded-lg border border-[#0070C0]/30"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[#40c4ff] font-bold text-lg w-8 text-left">
                          {index + 1}.
                        </span>
                        <span className="text-white font-semibold text-left">
                          {member.name}
                        </span>
                      </div>
                      <span className="text-[#FD652F] font-bold text-xl">
                        {member.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
