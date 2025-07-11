// components/announcements.tsx
import Link from "next/link";

interface Announcement {
  date: string;
  title: string;
  description: string;
  link?: string; // Now optional
  linkText?: string; // Now optional
  isNew?: boolean;
}

const ANNOUNCEMENTS_LIST: Announcement[] = [
  {
    date: "July 11,2024",
    title: "No Announcements Yet",
    description: "Have a fun summer!",
  },
];

export default function Announcements() {
  return (
    <section className="w-full px-6 sm:px-12 py-12 shadow-inner shadow-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#85B6FF] mb-8 text-center">
          Latest Announcements
        </h2>

        <div className="space-y-6">
          {ANNOUNCEMENTS_LIST.map((announcement, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all relative border ${
                announcement.isNew
                  ? "border-[#FD652F]/50 shadow-[0_0_15px_rgba(253,101,47,0.3)]"
                  : "border-white/20 hover:border-[#FD652F]/50"
              }`}
            >
              {announcement.isNew && (
                <div className="absolute top-4 right-4 bg-[#FD652F] text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 min-w-[120px]">
                  <div className="w-3 h-3 bg-[#FD652F] rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-[#C1D3FF]">
                    {announcement.date}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {announcement.title}
                  </h3>
                  <p className="text-[#E5EFFF] mb-3">
                    {announcement.description}
                  </p>
                  {announcement.link && announcement.linkText && (
                    <Link
                      href={announcement.link}
                      className="text-[#FD652F] hover:text-[#FF8A65] font-medium inline-flex items-center gap-1"
                    >
                      {announcement.linkText}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
