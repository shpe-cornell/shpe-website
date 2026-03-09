import { announcementsList } from "../data/announcements-data";

export default function Announcements() {
  return (
    <section className="w-full px-6 sm:px-12 py-12 shadow-inner shadow-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#85B6FF] mb-8 text-center">
          Latest Announcements
        </h2>

        <div className="space-y-6">
          {announcementsList.map((announcement, index) => (
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
                <div className="flex items-center gap-3 min-w-[120px]">
                  <div className="w-3 h-3 bg-[#FD652F] rounded-full flex-shrink-0"></div>
                  <span className="text-sm text-[#C1D3FF]">
                    {announcement.date}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {announcement.title}
                  </h3>

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
