import Image from "next/image";

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
  return (
    <div
      className="w-[270px] rounded-md shadow-lg overflow-hidden group relative bg-[#001f5b] shadow-sm shadow-black hover:shadow-white "
      style={{
        fontFamily: "'Jaldi', sans-serif",
      }}
    >
      {/* Position */}
      <div className="text-center mt-1 mb-1 text-white text-lg italic tracking-wide">
        {member.position}
      </div>

      {/* Profile Pic */}
      <div className="flex justify-center">
        <div className="relative w-[200px] h-[275px] rounded-lg overflow-hidden  shadow-inner shadow-black/30">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Name */}
      <div className="text-center text-lg font-bold text-white mt-3 tracking-tight drop-shadow-md">
        {member.name}
      </div>

      {/* Major and Year */}
      <div className="text-center text-md text-white mt-0 mb-3 font-semibold uppercase tracking-wide">
        {member.major} <span className="opacity-80">{member.year}</span>
      </div>

      {/* Overlay on hover */}
      <div
        className="absolute bottom-0 left-0 w-full h-[70px] bg-blue/50 backdrop-blur-sm text-white px-4 py-3 flex justify-between items-center
               translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-t-md z-10"
      >
        <div>
          <p className="text-lg font-semibold tracking-wide">
            {member.major} <span className="opacity-90">{member.year}</span>
          </p>
        </div>

        <div className="flex space-x-3">
          {member.email?.trim() && (
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${member.name}`}
            >
              <Image
                src="/images/icons/mail.png"
                alt="email icon"
                width={35}
                height={35}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
          )}
          {member.linkedin?.trim() && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
            >
              <Image
                src="/images/icons/linkedin2.png"
                alt="linkedin icon"
                width={35}
                height={35}
                className="hover:scale-110 transition-transform duration-200"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
