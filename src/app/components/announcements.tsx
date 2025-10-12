interface Announcement {
  date: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  isNew?: boolean;
}

const ANNOUNCEMENTS_LIST: Announcement[] = [
  {
    date: "October 11, 2025",
    title: "🚨 Make Sure to Submit Your Resume!",
    description: `
     Submit your resume in the portal!<br/><br/>

      <strong>Other updates:</strong> As the conference gets closer, companies will send out links for you to show your interest and “pre-register” for each specific company. 
      You may not get all the links you’re interested in, so this sheet compiles every link that companies send out. 
      <em>This is one of the best ways to improve your chances of landing interviews pre-conference!</em><br/><br/>

      🔗 <a href="https://docs.google.com/spreadsheets/d/1427lVK5Z2fT9uSD9TmJU6zgUrws5sRu55eShLa7-c_k/edit?usp=drivesdk"
      target="_blank" rel="noopener noreferrer"
      class="text-[#FD652F] underline hover:text-[#FF8A65]">
      Check the Pre-Registration Sheet (updated weekly)</a><br/><br/>

      Thank you all — if you have any questions, please reach out! 💙🧡<br/><br/>
    `,
    isNew: true,
  },
  {
    date: "July 11, 2024",
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

              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Date */}
                <div className="flex items-center gap-3 min-w-[120px]">
                  <div className="w-3 h-3 bg-[#FD652F] rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-[#C1D3FF]">
                    {announcement.date}
                  </span>
                </div>

                {/* Main content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {announcement.title}
                  </h3>

                  {/* ✅ HERE’S THE FIX — renders HTML properly */}
                  <div
                    className="text-[#E5EFFF] mb-3 leading-relaxed space-y-1"
                    dangerouslySetInnerHTML={{
                      __html: announcement.description,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
