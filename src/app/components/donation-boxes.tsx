export default function DonationSection() {
  const donationTiers = [
    {
      amount: "$10",
      title: "National Membership",
      description: "Covers the National SHPE Membership cost for one student.",
      pricingType: "student",
      icon: "👥",
    },
    {
      amount: "$25",
      title: "Meal Support",
      description:
        "Covers one meal for a student during the SHPE Conference — because no one networks well on an empty stomach.",
      pricingType: "student",
      icon: "🍽️",
    },
    {
      amount: "$30",
      title: "SHPE Merch",
      description: "Covers SHPE merchandise for a Cornell student. ",
      pricingType: "student",
      icon: "👔",
    },
    {
      amount: "$50",
      title: "Printed Materials",
      description:
        "Supports printing for recruitment, event marketing, and informational materials for the Cornell SHPE chapter.",
      pricingType: "order",
      icon: "📑",
    },
    {
      amount: "$100",
      title: "Prep Event",
      description:
        "Funds an on-campus workshop like elevator pitch training or resume reviews — essential for conference readiness.",
      pricingType: "event",
      icon: "🤵‍♀️🤵‍♂️",
    },
    {
      amount: "$180",
      title: "Hotel Accommodation",
      description:
        "Covers one night of lodging at the conference — safe, accessible housing so students can fully engage.",
      pricingType: "student",
      icon: "🏨",
    },
    {
      amount: "$250",
      title: "Transportation",
      description:
        "Helps a student get to the SHPE National Convention — because talent shouldn’t be limited by travel costs.",
      pricingType: "student",
      icon: "🛫",
    },
    {
      amount: "$345",
      title: "Conference Pass",
      description:
        "Covers one student’s full SHPE National Convention registration — unlocking access to networking, workshops, and career opportunities.",
      pricingType: "student",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    {tier.pricingType === "event"
                      ? "/event"
                      : tier.pricingType === "student"
                      ? "/student"
                      : "/order"}
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
