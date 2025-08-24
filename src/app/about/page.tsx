import Image from "next/image";
import HeroScroll from "../components/hero-scroll";

//some images of shpe tabling or volunteering might be nice for this
// const images = [
//   // "/images/leadership/Spring_2025/grouppic_line.JPG",
//   // "/images/conference/2024/conference4.jpeg",
//   // "/images/leadership/2025-2026/boba_day.png",
// ];
export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20 bg-gradient-to-b from-[#00031A] to-[#001F5B]">
      {/* Page title and images */}
      <HeroScroll
        welcomeMessage="Learn about SHPE @ Cornell"
        subMessage="Creating community for all."
        showButton={false}
      />

      {/* Mission Statement section */}
      <h2 className="text-[#FD652F] text-3xl px-10 py-8 font-bold">
        Mission Statement
      </h2>
      <p className="text-white text-xl px-10">
        SHPE changes lives by empowering the Hispanic community and individuals
        from all backgrounds to realize their fullest potential and impact the
        world through STEM awareness, access, support, and development. Our
        Chapter mission is to become a leading social-technical organization
        whose primary function is to enhance and achieve the potential of
        Hispanics and non-Hispanics in engineering, math, and science. We plan
        to obtain this excellence through integrity, empowerment, achievement,
        and continuous improvement.
      </p>

      <div className="flex justify-center py-6">
        <Image
          src="/images/shpe-logos/earths.png"
          alt="Earth logo"
          width={100}
          height={100}
        />
      </div>

      {/* SHPE National section */}
      <h2 className="text-[#FD652F] text-3xl px-10 pb-8 font-bold">
        About SHPE National
      </h2>
      <p className="text-white text-xl px-10">
        The Society of Hispanic Professional Engineers (SHPE), Inc. is a
        non-profit organization dedicated to increasing the participation of
        Hispanic professionals and college students in the fields of
        engineering, science and math. We welcome and encourage people of all
        identities to join us at our events. National in scope, the organization
        is composed of 50 professional chapters with about 2000 members and 200
        student chapters with a membership of more than 10,000 college students.
        SHPE engages in outreach programs, provides leadership and networking
        opportunities to its members of all backgrounds, and helps in furthering
        their education, advancing their careers, and promoting their
        recognition.
      </p>

      <div className="flex justify-center py-6">
        <Image
          src="/images/shpe-logos/earths.png"
          alt="Earth logo"
          width={100}
          height={100}
        />
      </div>

      {/* Cornell Chapter section */}
      <h2 className="text-[#FD652F] text-3xl px-10 pb-8 font-bold">
        Chapter History
      </h2>
      <p className="text-white px-10 text-xl">
        The Cornell University Student Chapter of SHPE was founded in the fall
        of 1979 by Federico Moncayo, Edwin Rivera, Samuel Ramos, and Mario
        Rivera, under the advisement of Ron Simmons, the Director of the
        Minority Programs at that time. Within SHPE National, the Cornell
        Chapter is a member of Region IV, which primarily serves the
        Northeastern United States and Puerto Rico. Through the continued
        support of the national organization, regional affiliates, the Cornell
        College of Engineering, the Office of Inclusive Excellence, and our
        esteemed corporate partners, SHPE at Cornell upholds its vision to
        inspire future leaders.
      </p>

      <div className="flex justify-center py-6">
        <Image
          src="/images/shpe-logos/earths.png"
          alt="Earth logo"
          width={100}
          height={100}
        />
      </div>

      {/* Bylaws section */}
      <h1 className="text-[#FD652F] text-3xl px-10 pb-8 font-bold">
        {/* Link to gdoc or cg once its ready */}
        Explore our bylaws{" "}
        <a className="underline" href="https://google.com">
          here
        </a>
        !
      </h1>
    </div>
  );
}
