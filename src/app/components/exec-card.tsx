import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

interface ExecMember {
  name: string;
  position: string;
  image: string;
  major: string;
  year: string;
  email: string;
  linkedin: string;
}

interface ExecCardProps {
  member: ExecMember;
}

export default function ExecCard({ member }: ExecCardProps) {
  const [firstName, ...lastName] = member.name.split(" ");

  return (
    <div
      className="w-[270px] rounded-md shadow-lg overflow-hidden group relative bg-gray-900"
      style={{
        // fontFamily: "'IBM Plex Serif', serif",
        fontFamily: "'Jaldi', sans-serif",
        //     background: `linear-gradient(
        //     135deg,
        //   #001F5B 0%,
        //   #004080 50%,
        //   #337AB7 70%,
        //   #002550 100%
        // )`,
      }}
    >
      {/* Eboard Position */}
      <div className="text-center mt-1 text-white text-md mb-1">
        {member.position}
      </div>

      {/* Profile Pic */}
      <div className="flex justify-center">
        <div className="relative w-[200px] h-[275px]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center text-lg font-bold text-white mt-0">
        {member.name}
      </div>

      {/* Major and Year */}
      <div className="text-center text-md text-white mt-0 mb-2">
        {member.major + " " + member.year}
      </div>

      {/* ============================================================== */
      /** Overlay Control */
      /* ============================================================== */}
      <div
        className="absolute bottom-0 left-0 w-full h-[70px] bg-white/20 backdrop-blur-xs text-white px-4 py-3 flex justify-between items-center
               translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10"
        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        <div>
          <p className="text-lg font-semibold">
            {member.major + " " + member.year}
          </p>
        </div>

        <div className="flex space-x-3">
          {member.email && member.email.trim() !== "" && (
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/mail.png"
                alt="email"
                width={35}
                height={35}
              />
            </a>
          )}
          {member.linkedin && member.linkedin.trim() !== "" && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <Image
                src="/images/icons/linkedin2.png"
                alt="linkedin"
                width={35}
                height={35}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
