import Image from "next/image";
import { Changa } from "next/font/google";

const changa = Changa({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const buttonClass =
  "w-[300px] px-6 py-4 text-xl text-white rounded-full transition font-semibold bg-[#72A9BE] hover:shadow-[#001F5B] hover:shadow-md hover:bg-[#0070C0]";

export default function MemberInfoPage() {
  return (
    <div
      className="flex flex-col items-center min-h-screen px-4 pt-15"
      style={{ fontFamily: "'Jaldi', sans-serif" }}
    >
      {/* ============================================================== */}
      {/* Calendar Section */}
      {/* ============================================================== */}
      <section className="w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold shpe-navy">Upcoming Events</h2>
        <div className="flex justify-center mt-3">
          <iframe
            src="https://calendar.google.com/calendar/u/0/embed?src=10c8673a173371a1e5b9a8f48a00471f49c586b233f14ab287c11a8818f933ea@group.calendar.google.com&ctz=America/New_York"
            style={{ border: 0 }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </section>

      {/* ============================================================== */}
      {/* Get Plugged in Section */}
      {/* ============================================================== */}
      <section className="w-full max-w-4xl text-center mt-0 pt-5 mb-5">
        <h2 className="text-3xl font-semibold mb-4 shpe-navy">
          Get Plugged In
        </h2>
        <div
          className={`flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center ${changa.className}`}
        >
          <a
            href="https://cornellshpe.slack.com/join/shared_invite/zt-37j10butw-sgOpkzAGx9JRtKH6x~5n8w#/shared-invite/email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={`${buttonClass}`}>Join us on Slack</button>
          </a>
          <a
            href="https://calendar.google.com/calendar/u/0/embed?src=10c8673a173371a1e5b9a8f48a00471f49c586b233f14ab287c11a8818f933ea@group.calendar.google.com&ctz=America/New_York"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={`${buttonClass}`}>Join our Calendar</button>
          </a>
          <a
            href="https://www.instagram.com/cornellshpe/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={`${buttonClass}`}>Follow us on Insta</button>
          </a>
          <a
            href="https://www.linkedin.com/company/shpe-at-cornell-university/?trk=ppro_cprof"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={`${buttonClass}`}>Follow us on LinkedIn</button>
          </a>
        </div>
      </section>
    </div>
  );
}
