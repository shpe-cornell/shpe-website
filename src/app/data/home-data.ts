export type HomeInfoBox = {
  title: string;
  text: string;
};

export type HomeExploreItem = {
  title: string;
  description: string;
  icon?: string;
  link: string;
};

export const homeHeroImages = [
  "/images/conference/2025/familia.jpg",
  "/images/events/25-26/gbody1/g1.jpeg",
  "/images/events/25-26/gbody3:gamenight/loteria.JPEG",
] as const;

export const homeInfoBoxes: HomeInfoBox[] = [
  {
    title: "Professional Development",
    text: "Resume reviews, mock interviews, and technical workshops to shape the engineers of tomorrow.",
  },
  {
    title: "Community Outreach",
    text: "We spark STEM curiosity in schools, mentoring the next generation of thinkers.",
  },
  {
    title: "Info Sessions",
    text: "Top companies connect with SHPE to present roles, missions, and paths for growth.",
  },
  {
    title: "Socials",
    text: "Culture meets community. From game nights to fiestas — we make bonding fun.",
  },
  {
    title: "MentorSHPE",
    text: "Underclassmen are matched with leaders to grow through guidance and shared experience.",
  },
  {
    title: "Study Jams",
    text: "Our collaborative study zones support academic excellence and reduce stress during crunch time.",
  },
];

export const homeExploreItems: HomeExploreItem[] = [
  {
    title: "Donate",
    description: "Support our mission through donations.",
    icon: "/images/icons/donate.png",
    link: "https://join.slack.com/t/shpecornell/signup",
  },
  {
    title: "Become a Member",
    description: "Join our supportive community.",
    icon: "/images/icons/member.png",
    link: "https://join.slack.com/t/shpecornell/signup",
  },
  {
    title: "Events",
    description: "See upcoming SHPE activities and programs.",
    icon: "/images/icons/united.png",
    link: "https://join.slack.com/t/shpecornell/signup",
  },
];
