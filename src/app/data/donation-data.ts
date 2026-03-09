export type DonationTier = {
  amount: string;
  title: string;
  description: string;
  pricingType: "student" | "event" | "order";
  icon: string;
};

export const donationTiers: DonationTier[] = [
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
