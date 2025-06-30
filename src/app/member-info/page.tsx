"use client";

import Image from "next/image";
import { Changa } from "next/font/google";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const buttonClass =
  "w-[280px] px-6 py-4 text-xl text-white rounded-full transition font-semibold bg-[#001F5B] hover:shadow-md hover:shadow-[#001F5B] hover:bg-[#0070C0]";

const flyers = [
  "/images/events/flyers/gbody-03-26-25.png",
  "/images/events/flyers/paint-n-sip-05-03-25.png",
  "/images/events/flyers/tote-painting-03-24-25.png",
];

export default function MemberInfoPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-18 bg-white">
      {/* Upcoming Events Header */}
      <h2 className="text-3xl font-semibold text-[#FD652F] mb-4">
        Upcoming Events
      </h2>

      {/* Events Section */}
      <section className="w-full flex flex-col lg:flex-row justify-center gap-6 max-w-7xl">
        {/* Calendar */}
        <div className="w-full lg:w-2/3 max-w-[800px] h-[600px] bg-[#001F5B] rounded-xl p-4 shadow-lg">
          <iframe
            src="https://calendar.google.com/calendar/u/0/embed?src=10c8673a173371a1e5b9a8f48a00471f49c586b233f14ab287c11a8818f933ea@group.calendar.google.com&ctz=America/New_York"
            style={{ border: 0 }}
            className="w-full h-full rounded-lg"
            frameBorder="0"
            scrolling="no"
            title="SHPE Cornell Events Calendar"
          ></iframe>
        </div>

        {/* Flyers */}
        <div className="w-full lg:w-1/3 h-[600px] bg-[#001F5B] rounded-xl p-5 overflow-y-auto text-white relative shadow-lg">
          <div className="space-y-10">
            {flyers.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`Flyer ${idx + 1}`}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto rounded-md shadow-md"
                priority={idx === 0}
              />
            ))}
          </div>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white opacity-60 animate-bounce text-sm pointer-events-none select-none">
            . . .
          </div>
        </div>
      </section>

      {/* Get Plugged In Section */}
      <section className="w-full max-w-5xl text-center mt-7 mb-10">
        <h2
          className={`text-3xl font-semibold mb-6 text-[#FD652F] ${changa.className}`}
        >
          Get Plugged In
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          <a
            href="https://cornellshpe.slack.com/join/shared_invite/zt-37j10butw-sgOpkzAGx9JRtKH6x~5n8w#/shared-invite/email"
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
    </div>
  );
}
