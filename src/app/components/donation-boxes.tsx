import { donationTiers } from "../data/donation-data";

export default function DonationSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-transparent text-white bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100 mb-4">
          Empower Student Success
        </h2>
        <p className="text-lg text-blue-200/90 max-w-2xl mx-auto">
          Your contribution directly impacts students through our donation
          system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {donationTiers.map((tier, index) => (
          <div
            key={index}
            className=" backdrop-blur-md rounded-xl border border-blue-700/50 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full group relative overflow-hidden bg-[#0F005B]/10"
          >
            <div className="p-5 flex flex-col h-full relative z-10">
              <div className="flex-1">
                <div className="text-4xl mb-5 text-blue-100 flex justify-center">
                  {tier.icon}
                </div>

                <div className="flex items-baseline mb-4 justify-center">
                  <span className="text-2xl font-bold text-white">
                    {tier.amount}
                  </span>
                  <span className="ml-2 text-sm text-blue-300/80">
                    {tier.pricingType === "event"
                      ? "/event"
                      : tier.pricingType === "student"
                      ? "/student"
                      : "/order"}
                  </span>
                </div>

                <p className="text-blue-100/90 mb-5 text-center text-[0.95rem] leading-snug">
                  {tier.description}
                </p>
              </div>

              <h3 className="text-lg font-medium text-white text-center mt-auto pt-4 border-t border-blue-700/50 group-hover:border-blue-400 transition-colors">
                {tier.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
