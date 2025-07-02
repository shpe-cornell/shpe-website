import HeroScroll from "../components/hero-scroll";
import SponsorCard from "../components/sponsor-card";
import Link from "next/link";

// we need info session images, someone must have
const images = [
  "/images/leadership/Spring_2025/grouppic_line.JPG",
  "/images/conference/2024/conference4.jpeg",
  "/images/leadership/2025-2026/boba_day.png",
];

export default function SponsorPage() {
  return (
    <div className="flex flex-col min-h-screen mt-[55px] bg-gradient-to-b from-[#00031A] to-[#001F5B]">

      {/* Page title and images */}
      <HeroScroll
        images={images}
        welcomeMessage="Corporate Sponsorship"
        subMessage="Supporting our values, empowering our mission."
        showButton={false}
      />

      {/* Intro Paragraph */}
      <p className="text-white text-xl p-10">
        Cornell SHPE works with many of its corporate partners to provide workshops, information sessions, and scholarships 
        for its members. On behalf of the members of our chapter, we would like to thank all of our sponsors for their 
        generosity. It is through their efforts and support that we are able to meet many of our goals.
      </p>
      
      {/* Sponsor Section Title */}
      <div className="text-center my-6">
        <div className="inline-block">
          <div className="h-[2px] bg-[#FD652F] mb-2" />
          <p className="text-[#FD652F] text-3xl px-10 py-2 font-bold">Our Sponsors</p>
          <div className="h-[2px] bg-[#FD652F] mt-2" />
        </div>
      </div>

      {/* Sponsor Card Grid */}
      <div className="flex justify-center gap-6 flex-wrap px-6 pb-10">
        <SponsorCard tier="Platinum" logo="/images/icons/slack.png"/>
        <SponsorCard tier="Gold" logo="/images/icons/slack.png" />
        <SponsorCard tier="Silver" logo="/images/icons/slack.png"/>
        <SponsorCard tier="Bronze" logo="/images/icons/slack.png"/>
        <SponsorCard tier="Bronze" logo="/images/icons/slack.png"/>
      </div>

      {/* Support Section Title           MISSING LINK*/}
      <div className="text-center my-6">
        <div className="inline-block">
          <div className="h-[2px] bg-[#FD652F] mb-2" />
          <p className="text-[#FD652F] text-3xl px-10 py-2 font-bold">Support SHPE @ Cornell</p>
          <div className="h-[2px] bg-[#FD652F] mt-2" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 pb-20">
        {/* Corporate Packet Button.       MISSING LINK*/}
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#A5AACD] text-lg text-[#0A0A2A] font-semibold py-3 px-8 rounded-lg shadow h-[100px] w-[220px] flex flex-col items-center justify-center text-center hover:bg-[#9297bf] transition">
            Explore our <br /> Corporate Packet
          </button>
        </a>

        {/* Donate Button */}
        <a
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-[#FFA8A0] text-lg text-[#0A0A2A] font-bold py-3 px-8 rounded-lg shadow h-[100px] w-[220px] flex flex-col items-center justify-center text-center hover:bg-[#e1948d] transition">
            Donate Now!
          </button>
        </a>

        {/* Learn More Button */}
        <Link href="/about">
          <button className="bg-[#A5AACD] text-lg text-[#0A0A2A] font-semibold py-3 px-8 rounded-lg shadow h-[100px] w-[220px] flex flex-col items-center justify-center text-center hover:bg-[#9297bf] transition">
            Learn More About <br /> SHPE
          </button>
        </Link>
      </div>
    </div>
  );
}
