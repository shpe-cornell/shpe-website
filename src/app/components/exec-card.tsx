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
      className="w-[270px] rounded-lg overflow-hidden group relative bg-[#001f5b] border border-gray-600/30 hover:border-orange-400/50 shadow-lg hover:shadow-[0_0_20px_-5px_rgba(100,150,255,0.3)] transition-all duration-300"
      style={{
        fontFamily: "'Jaldi', sans-serif",
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,150,255,0.08)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Member Position */}
      <div className="text-center mt-3 mb-2 text-blue-200 text-md font-medium tracking-wider">
        {member.position}
      </div>

      {/* Profile Image */}
      <div className="flex justify-center px-4">
        <div className="relative w-[200px] h-[275px] rounded-lg overflow-hidden border border-gray-500/30 group-hover:border-blue-300/50 transition-colors duration-300">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:brightness-110 transition duration-300"
            draggable={false}
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_95%,rgba(100,150,255,0.1)_100%)]" />
        </div>
      </div>

      {/* Member Name*/}
      <div className="text-center text-xl font-bold text-white mt-3 tracking-tight">
        {member.name}
      </div>

      {/* Major and Year */}
      <div className="text-center text-sm text-blue-200 mt-1 mb-4 font-medium uppercase tracking-wider">
        {member.major} <span className="text-blue-100/80">{member.year}</span>
      </div>

      {/* Hover panel */}
      <div className="absolute bottom-0 left-0 w-full h-[70px] bg-gradient-to-t from-blue-900/90 via-blue-900/80 to-blue-900/70 backdrop-blur-sm text-white px-4 py-3 flex justify-between items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-orange-300/20">
        <div>
          <p className="text-sm font-medium tracking-wide">
            {member.major}{" "}
            <span className="text-blue-100/80">{member.year}</span>
          </p>
        </div>
        <div className="flex space-x-3">
          {member.email?.trim() && (
            <a
              href={`mailto:${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Email ${member.name}`}
              className="hover:scale-110 transition-transform"
            >
              <Image
                src="/images/icons/mail.png"
                alt="Email"
                width={28}
                height={28}
                className="brightness-30 invert opacity-100 hover:opacity-100 transition-opacity"
              />
            </a>
          )}
          {member.linkedin?.trim() && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} LinkedIn`}
              className="hover:scale-110 transition-transform"
            >
              <Image
                src="/images/icons/linkedin2.png"
                alt="LinkedIn"
                width={28}
                height={28}
                className="brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
