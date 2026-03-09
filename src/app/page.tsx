"use client";

import HeroScroll from "./components/hero-scroll";
import GreyQuoteBanner from "./components/grey-quote-banner";
import HorizontalAccordion from "./components/horizontal-accordion";
import {
  homeExploreItems,
  homeHeroImages,
  homeInfoBoxes,
} from "./data/home-data";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen pt-20 bg-gradient-to-b from-[#00031A] to-[#001F5B] text-white font-sans">
      {/* ==============================================================
          Hero Section
        ============================================================== */}
      <HeroScroll
        images={[...homeHeroImages]}
        welcomeMessage="Welcome to SHPE @ Cornell"
        subMessage="Empowerment. Community. Excellence."
        showButton={true}
        buttonHref="https://join.slack.com/t/shpecornell/signup"
        buttonText="Join Our Community"
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
        {/* 1 per row on mobile, 2 per row on tablets, 3 per row on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 py-6">
          {homeInfoBoxes.map((box, idx) => (
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
        <HorizontalAccordion items={homeExploreItems} />
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
