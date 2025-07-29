"use client";

import HeroScroll from "./components/hero-scroll";
import GreyQuoteBanner from "./components/grey-quote-banner";
import HorizontalAccordion from "./components/horizontal-accordion";

// ==============================================================
// Hero Images
// ==============================================================
const images = [
  "/images/conference/2024/conference_upscaled.jpeg",
  "/images/conference/2024/conference_colorful.jpeg",
  "/images/leadership/Spring_2025/grouppic_upscaled.jpeg",
];

// ==============================================================
// What We Do Items
// ==============================================================
const boxes = [
  {
    title: "Professional Development",
    text: "Resume reviews, mock interviews, and technical workshops to shape the engineers of tomorrow.",
  },
  {
    title: "Community Outreach",
    text: "We spark STEM curiosity in schools, mentoring the next generation of thinkers.",
  },
  {
    title: "Info Sessions",
    text: "Top companies connect with SHPE to present roles, missions, and paths for growth.",
  },
  {
    title: "Socials",
    text: "Culture meets community. From game nights to fiestas — we make bonding fun.",
  },
  {
    title: "MentorSHPE",
    text: "Underclassmen are matched with leaders to grow through guidance and shared experience.",
  },
  {
    title: "Study Jams",
    text: "Our collaborative study zones support academic excellence and reduce stress during crunch time.",
  },
];

// ==============================================================
// Accordion Items
// ==============================================================
const items = [
  {
    title: "Donate",
    description: "Support our mission through donations.",
    icon: "/images/icons/donate.png",
    link: "/sponsorship#pricing",
  },
  {
    title: "Become a Member",
    description: "Join our supportive community.",
    icon: "/images/icons/member.png",
    link: "https://shpe.org/membership/become-a-member/",
  },
  {
    title: "Events",
    description: "See upcoming SHPE activities and programs.",
    icon: "/images/icons/united.png",
    link: "/member-info",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-20 bg-gradient-to-b from-[#00031A] to-[#001F5B] text-white font-sans">
      {/* ==============================================================
          Hero Section
        ============================================================== */}
      <HeroScroll
        images={images}
        welcomeMessage="Welcome to SHPE @ Cornell"
        subMessage="Empowerment. Community. Excellence."
        showButton={true}
        buttonHref="https://shpe.org/membership/become-a-member/"
        buttonText="Join SHPE National"
        showImageScroll={true}
      />

      {/* ==============================================================
          Our Goal
        ============================================================== */}
      <Section title="Our Mission">
        <p className="text-lg md:text-xl leading-relaxed text-[#C1D3FF] max-w-4xl font-light mx-auto">
          The purpose of Cornell Society of Hispanic Professional Engineers is
          to increase the participation of Hispanic professionals and college
          students in the fields of engineering, technology, science, and math.
        </p>
      </Section>

      {/* ==============================================================
          What We Do
        ============================================================== */}
      <Section title="What We Do">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 py-6">
          {boxes.map((box, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-[1.03]"
            >
              <h3 className="text-xl font-semibold text-[#FD652F]">
                {box.title}
              </h3>
              <p className="text-sm mt-2 text-[#E5EFFF]">{box.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <GreyQuoteBanner />

      {/* ==============================================================
          Accordion Section
        ============================================================== */}
      <Section title="Explore More">
        <HorizontalAccordion items={items} />
      </Section>
    </div>
  );
}

// ==============================================================
// Reusable Section Wrapper
// ==============================================================
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full px-6 sm:px-12 mt-12 max-w-7xl text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-[#85B6FF] mb-4 tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}
