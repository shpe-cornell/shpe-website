export default function DonationSection() {
  const donationTiers = [
    {
      amount: "$10",
      title: "National Membership",
      description: "Covers the National SHPE Membership cost for one student.",
      icon: "👥",
    },
    {
      amount: "$20",
      title: "Meal Support",
      description: "Covers a nutritious meal for one student.",
      icon: "🍽️",
    },
    {
      amount: "$200",
      title: "Hotel Accommodation",
      description: "Covers a hotel room for 4 students at conferences.",
      icon: "🏨",
    },
    {
      amount: "$200",
      title: "Transportation",
      description: "Covers travel costs to conference for one student.",
      icon: "🚌",
    },
    {
      amount: "$250",
      title: "Conference Pass",
      description: "Full conference registration fee for one student.",
      icon: "🎟️",
    },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {donationTiers.map((tier, index) => (
          <div
            key={index}
            className=" backdrop-blur-md rounded-xl border border-blue-700/50 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full group relative overflow-hidden bg-[#0F005B]/10"
          >
            {/* Box content */}
            <div className="p-5 flex flex-col h-full relative z-10">
              <div className="flex-1">
                <div className="text-4xl mb-5 text-blue-100 flex justify-center">
                  {tier.icon}
                </div>

                {/* Price */}
                <div className="flex items-baseline mb-4 justify-center">
                  <span className="text-2xl font-bold text-white">
                    {tier.amount}
                  </span>
                  <span className="ml-2 text-sm text-blue-300/80">
                    /student
                  </span>
                </div>

                {/* Description */}
                <p className="text-blue-100/90 mb-5 text-center text-[0.95rem] leading-snug">
                  {tier.description}
                </p>
              </div>

              {/* Title */}
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
