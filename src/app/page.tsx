"use client";

import HeroScroll from "./components/hero-scroll";
import GreyBanner from "./components/grey-banner";
import GreyQuoteBanner from "./components/grey-quote-banner";
import HorizontalAccordion from "./components/horizontal-accordion";

/* ============================================================== */
/** Hero Images */
/* ============================================================== */
const images = [
  "/images/leadership/Spring_2025/grouppic_line.JPG",
  "/images/conference/2024/conference2.jpeg",
  "/images/conference/2024/conference3.jpeg",
];

/* ============================================================== */
/** What We Do Items */
/* ============================================================== */
const boxes = [
  {
    title: "Professional Development",
    text: "We host resume reviews, mock interviews, and technical workshops to help students prepare for their careers.",
  },
  {
    title: "Community Outreach",
    text: "We visit local schools and participate in community events to promote STEM and inspire the next generation.",
  },
  {
    title: "Info Sessions",
    text: "We collaborate with top companies to host sessions about their mission, open roles, and internship opportunities.",
  },
  {
    title: "Socials",
    text: "We build community through game nights, cultural celebrations, and events that strengthen bonds between members.",
  },
  {
    title: "MentorSHPE",
    text: "Our mentorship program pairs upperclassmen with underclassmen to foster academic and personal growth.",
  },
  {
    title: "Study Jams",
    text: "We provide a collaborative space for students to study together and support each other during exams and project deadlines.",
  },
];

/* ============================================================== */
/** Accordion Items */
/* ============================================================== */
const items = [
  {
    title: "Donate",
    description: "Support our mission through donations.",
    icon: "/images/icons/donate.png",
    link: "https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&bledit=1&dids=789.&appealcode=GIVDY25P",
  },
  {
    title: "Become a Member",
    description: "Join our supportive community.",
    icon: "/images/icons/member.png",
    link: "https://www.shpeconnect.org/eweb/DynamicPage.aspx?WebCode=LoginRequired&expires=yes&Site=shpe",
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
    <div className="flex flex-col items-center min-h-screen mt-[50px] bg-white text-[#001F5B]">
      <HeroScroll
        images={images}
        welcomeMessage="Welcome to SHPE at Cornell!"
        subMessage="Empowering leaders, celebrating culture, and having fun doing it."
        showButton={true}
        buttonHref="/member-info"
        buttonText="Join SHPE"
      />

      {/* ============================================================== */}
      {/* Our Goal Section */}
      {/* ============================================================== */}
      <Section title="Our Goal">
        <p className="text-xl leading-relaxed text-gray-800 max-w-4xl">
          SHPE's mission is to increase the participation of Hispanic
          professionals and college students in the fields of engineering,
          technology, science, and math.
        </p>
      </Section>

      {/* ============================================================== */}
      {/* What We Do Section */}
      {/* ============================================================== */}
      <Section title="What We Do">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 py-6">
          {boxes.map((box, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <p className="text-2xl font-bold text-[#FD652F]">{box.title}</p>
              <p className="text-lg text-gray-700 mt-2">{box.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <GreyQuoteBanner />

      {/* ============================================================== */}
      {/* Accordion Section */}
      {/* ============================================================== */}
      <Section title="Learn More">
        <HorizontalAccordion items={items} />
      </Section>
    </div>
  );
}

/* ============================================================== */
/** Reusable Section Wrapper */
/* ============================================================== */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full px-6 sm:px-12 mt-12 max-w-7xl">
      <h2 className="text-left text-4xl font-semibold text-[#00308E] mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
