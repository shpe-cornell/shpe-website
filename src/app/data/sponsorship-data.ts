export type Tier = "Platinum" | "Gold" | "Silver" | "Bronze";

export type TierStyle = {
  border: string;
  shadow: string;
  shine: string;
};

export type BenefitValue = "check" | "dash" | string;

export type BenefitRow = {
  benefit: string;
  platinum: BenefitValue;
  gold: BenefitValue;
  silver: BenefitValue;
  bronze: BenefitValue;
  other: BenefitValue;
};

export const tierStyles: Record<Tier, TierStyle> = {
  Platinum: {
    border: "border-[#B7BFCC]",
    shadow: "shadow-[0_0_20px_-5px_rgba(183,191,204,0.8)]",
    shine: "from-[#E6F0FF] to-[#FFFFFF]",
  },
  Gold: {
    border: "border-[#C09E5E]",
    shadow: "shadow-[0_0_20px_-5px_rgba(192,158,94,0.8)]",
    shine: "from-[#FFF4E0] to-[#FFFFFF]",
  },
  Silver: {
    border: "border-[#A0A0A0]",
    shadow: "shadow-[0_0_20px_-5px_rgba(160,160,160,0.6)]",
    shine: "from-[#F5F5F5] to-[#FFFFFF]",
  },
  Bronze: {
    border: "border-[#CD7F32]",
    shadow: "shadow-[0_0_20px_-5px_rgba(205,127,50,0.6)]",
    shine: "from-[#FFE9DD] to-[#FFFFFF]",
  },
};

export const sponsorsByTier: Record<Tier | "Other", string[]> = {
  Platinum: [
    "/images/sponsors/Lockheed_Martin_logo.svg.png",
    "/images/sponsors/Intuit.png",
  ],
  Gold: [
    "/images/sponsors/Capital_One_logo.svg.png",
    "/images/sponsors/Accenture.svg-2.png",
  ],
  Silver: [],
  Bronze: [
    "/images/sponsors/Jane_Street.png",
    "/images/sponsors/Bloomberg.jpeg",
  ],
  Other: [],
};

export const sponsorshipBenefits: BenefitRow[] = [
  {
    benefit: "Cost",
    platinum: "$2,000+",
    gold: "$1,750",
    silver: "$1,500",
    bronze: "$1,250",
    other: "<$1,000",
  },
  {
    benefit: "Recognition on Cornell SHPE Website",
    platinum: "check",
    gold: "check",
    silver: "check",
    bronze: "check",
    other: "check",
  },
  {
    benefit: "Resume Book",
    platinum: "check",
    gold: "check",
    silver: "check",
    bronze: "check",
    other: "dash",
  },
  {
    benefit: "Speaking Opportunity at SHPE G-Body Meeting",
    platinum: "check",
    gold: "check",
    silver: "check",
    bronze: "dash",
    other: "dash",
  },
  {
    benefit: "Complimentary Information Session",
    platinum: "check",
    gold: "check",
    silver: "dash",
    bronze: "dash",
    other: "dash",
  },
  {
    benefit: "Company Logo on SHPE Merch and Additional Info Session",
    platinum: "check",
    gold: "dash",
    silver: "dash",
    bronze: "dash",
    other: "dash",
  },
];
