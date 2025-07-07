"use client";

import Image from "next/image";
import HeroScroll from "../components/hero-scroll";
import ExecCard from "../components/exec-card";

/* ============================================================== */
/** Hero Images */
/* ============================================================== */
const images = [
  "/images/leadership/Spring_2025/grouppic_line.JPG",
  "/images/conference/2024/conference2.jpeg",
  "/images/leadership/2025-2026/boba_day.png",
];

export default function TeamPage() {
  return (
    <div className="flex flex-col items-center min-h-screen mt-[55px] bg-gradient-to-b from-[#0a1f44] to-[#001f5b] text-white font-sans">
      {/* Hero Scroll */}
      <HeroScroll
        images={images}
        welcomeMessage="Meet your SHPE Executive Board"
        subMessage="Committed to leadership, community, and growth."
        showButton={false}
      />

      {/* Title */}
      <h1 className="text-[#40c4ff] font-extrabold p-6 text-4xl tracking-wide drop-shadow-lg font-[Jaldi]">
        Executive Board
      </h1>

      {/* Exec cards container */}
      <div className="flex flex-wrap justify-center gap-16 px-10 py-10 max-w-7xl">
        {execBoard.map((member, idx) => (
          <ExecCard key={idx} member={member} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================== */
/** EXECUTIVE BOARD LIST */
/* ============================================================== */
const execBoard = [
  {
    name: "Emilio Ceballos",
    position: "Co-President",
    image: "/images/leadership/Spring_2025/emilio.png",
    major: "MechE",
    year: "'26",
    email: "eac288@cornell.edu",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Marco Le Vecchia",
    position: "Co-President",
    image: "/images/leadership/Spring_2025/marco.png",
    major: "ORIE",
    year: "'26",
    email: "mal426@cornell.edu",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Alison Chavez",
    position: "Secretary",
    image: "/images/leadership/Spring_2025/alison.jpg",
    major: "MechE",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Alexis Laurel",
    position: "Publicity Chair Lead",
    image: "/images/leadership/Spring_2025/alexis.png",
    major: "ECE",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Ruby Penafiel Gutierrez",
    position: "Web Development Lead",
    image: "/images/leadership/Spring_2025/ruby.png",
    major: "CS",
    year: "'27",
    email: "rsp227@cornell.edu",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Sarah Garcia Moreno",
    position: "Corporate Chair",
    image: "/images/leadership/Spring_2025/sarah.png",
    major: "BME",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Anthony Manjarrez-Flores",
    position: "Publicity Chair",
    image: "/images/leadership/Spring_2025/anthony.png",
    major: "CS",
    year: "'27",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Melanie Jalbert",
    position: "Webmaster / Ex-Copresident",
    image: "/images/leadership/Spring_2025/melanie.jpg",
    major: "ISST",
    year: "'26",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Jane Doe",
    position: "Treasurer",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'YY",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Jane Doe",
    position: "Chapter Development Chair",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'YY",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Jane Doe",
    position: "Outreach Committee Chair Lead",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'YY",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Jane Doe",
    position: "Academic Chair",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'YY",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Jane Doe",
    position: "Outreach Committee Chair",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'YY",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
  {
    name: "Jane Doe",
    position: "Freshman Representative",
    image: "/images/icons/usericon.png",
    major: "MAJOR",
    year: "'YY",
    email: "",
    linkedin: "https://www.linkedin.com/in/janedoe",
  },
];
