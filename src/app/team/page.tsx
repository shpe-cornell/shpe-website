"use client";

import Image from "next/image";
import HeroScroll from "../components/hero-scroll";
import ExecCard from "../components/exec-card";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1f44] to-[#001f5b] mt-15">
      {/* Hero Section */}
      <HeroScroll
        welcomeMessage="Meet Your SHPE Leadership Team"
        subMessage="Dedicated professionals driving our organization forward"
        showButton={false}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-[#FD652F] drop-shadow-md">
            Executive Board 2024-2025
          </h1>
          <div className="mx-auto mt-4 h-1 w-24 bg-[#0070C0] opacity-80"></div>
        </div>

        {/* Executive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 justify-items-center">
          {execBoard.map((member, idx) => (
            <ExecCard key={`${member.name}-${idx}`} member={member} />
          ))}
        </div>
      </div>

      {/* Spacer for bottom padding */}
      <div className="h-16"></div>
    </div>
  );
}
/* ============================================================== */
/** EXECUTIVE BOARD LIST */
/* ============================================================== */

/** BASED ON CURRENT IMAGE DATABASE */
const execBoard = [
  {
    name: "Emilio Ceballos",
    position: "President",
    image: "/images/leadership/Spring_2025/lessBlurry_emilio.jpeg",
    major: "MechE",
    year: "'26",
    email: "eac288@cornell.edu",
    linkedin: "https://www.linkedin.com/in/emilio-ceballos/",
  },
  {
    name: "Marco Le Vecchia",
    position: "President",
    image: "/images/leadership/Spring_2025/marco.png",
    major: "ORIE",
    year: "'26",
    email: "mal426@cornell.edu",
    linkedin: "https://www.linkedin.com/in/marco-la-vecchia/",
  },
  {
    name: "Alison Chavez",
    position: "Secretary",
    image: "/images/leadership/Spring_2025/alison.jpg",
    major: "MechE",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/alisonvchavez/",
  },
  {
    name: "Sarah Garcia Moreno",
    position: "Corporate Relations Associate",
    image: "/images/leadership/Spring_2025/sarah.png",
    major: "BME",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/sarah-garcia-moreno-45645425b/",
  },
  {
    name: "Alexis Laurel",
    position: "Publicity Chair Lead",
    image: "/images/leadership/Spring_2025/alexis.png",
    major: "ECE",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/alexisnlaurel/",
  },
  {
    name: "Anthony Manjarrez-Flores",
    position: "Publicity Chair",
    image: "/images/leadership/Spring_2025/anthony.png",
    major: "CS",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/anthony-manjarrez/",
  },
  {
    name: "Ruby Penafiel Gutierrez",
    position: "Webmaster",
    image: "/images/leadership/Spring_2025/ruby.png",
    major: "CS",
    year: "'27",
    email: "rsp227@cornell.edu",
    linkedin: "https://www.linkedin.com/in/ruby-penafiel-gutierrez23/",
  },
  {
    name: "Melanie Jalbert",
    position: "Advice Chair",
    image: "/images/leadership/Spring_2025/melanie.jpg",
    major: "ISST",
    year: "'26",
    email: "",
    linkedin: "https://www.linkedin.com/in/melanie-jalbert/",
  },
  {
    name: "Marcos Martinez",
    position: "Events Chair",
    image: "/images/icons/usericon.png",
    major: "MechE",
    year: "'28",
    email: "",
    linkedin: "https://www.linkedin.com/in/marcos-martinez-071505303/",
  },
  {
    name: "David Valarezo",
    position: "Community Outreach Chair",
    image: "/images/icons/usericon.png",
    major: "CS",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/davidvalarezo/",
  },
  {
    name: "Hilary Cabrera Orozco",
    position: "Treasurer",
    image: "/images/icons/usericon.png",
    major: "IS",
    year: "'26",
    email: "",
    linkedin: "https://www.linkedin.com/in/hilary-cabrera-orozco/",
  },
  {
    name: "Josue Ortiz",
    position: "Academic Excellence Chair",
    image: "/images/icons/usericon.png",
    major: "CS & ORIE",
    year: "'26",
    email: "",
    linkedin: "https://www.linkedin.com/in/josue-ortiz-ordonez/",
  },
  {
    name: "You?",
    position: "Freshman Representative",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'29",
    email: "",
    linkedin: "",
  },
  // {
  //   name: "Jane Doe",
  //   position: "Position",
  //   image: "/images/icons/usericon.png",
  //   major: "MAJOR",
  //   year: "'YY",
  //   email: "",
  //   linkedin: "https://www.linkedin.com/in/janedoe",
  // },
];

/** BASED ON CORPORATE PACKAGE */
// const execBoard = [
//   {
//     name: "Emilio Ceballos",
//     position: "President",
//     image: "/images/leadership/Spring_2025/emilio.png",
//     major: "MechE",
//     year: "'26",
//     email: "eac288@cornell.edu",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Marco Le Vecchia",
//     position: "President",
//     image: "/images/leadership/Spring_2025/marco.png",
//     major: "ORIE",
//     year: "'26",
//     email: "mal426@cornell.edu",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Alison Chavez",
//     position: "Secretary",
//     image: "/images/leadership/Spring_2025/alison.jpg",
//     major: "MechE",
//     year: "'27",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Josue Ortiz",
//     position: "Academic Excellence Chair",
//     image: "/images/icons/usericon.png",
//     major: "Major",
//     year: "'26",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Hilary Cabrera Orozco",
//     position: "Treasurer",
//     image: "/images/icons/usericon.png",
//     major: "Major",
//     year: "'26",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Sarah Garcia Moreno",
//     position: "Corporate Relations Associate",
//     image: "/images/leadership/Spring_2025/sarah.png",
//     major: "BME",
//     year: "'27",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Alexis Laurel",
//     position: "Publicity Chair Lead",
//     image: "/images/leadership/Spring_2025/alexis.png",
//     major: "ECE",
//     year: "'27",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Anthony Manjarrez-Flores",
//     position: "Publicity Chair",
//     image: "/images/leadership/Spring_2025/anthony.png",
//     major: "CS",
//     year: "'27",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Ruby Penafiel Gutierrez",
//     position: "Webmaster",
//     image: "/images/leadership/Spring_2025/ruby.png",
//     major: "CS",
//     year: "'27",
//     email: "rsp227@cornell.edu",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "David Valarezo",
//     position: "Community Outreach Chair",
//     image: "/images/icons/usericon.png",
//     major: "CS",
//     year: "'27",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Marcos Martinez",
//     position: "Events Chair",
//     image: "/images/icons/usericon.png",
//     major: "MechE",
//     year: "'28",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "Melanie Jalbert",
//     position: "Advice Chair",
//     image: "/images/leadership/Spring_2025/melanie.jpg",
//     major: "ISST",
//     year: "'26",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   {
//     name: "This Can Be You",
//     position: "Freshman Representative",
//     image: "/images/icons/usericon.png",
//     major: "MAJOR",
//     year: "'29",
//     email: "",
//     linkedin: "https://www.linkedin.com/in/janedoe",
//   },
//   // {
//   //   name: "Jane Doe",
//   //   position: "Position",
//   //   image: "/images/icons/usericon.png",
//   //   major: "MAJOR",
//   //   year: "'YY",
//   //   email: "",
//   //   linkedin: "https://www.linkedin.com/in/janedoe",
//   // },
// ];
