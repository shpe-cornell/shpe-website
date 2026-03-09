export type NavPage = {
  name: string;
  href: string;
};

export const navPages: NavPage[] = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Members", href: "/member-info" },
  { name: "Gallery", href: "/gallery" },
  { name: "Sponsorship", href: "/sponsorship" },
];

export const pointsPage: NavPage = { name: "Points", href: "/points" };

export const joinUsPage: NavPage = {
  name: "Join Us",
  href: "https://join.slack.com/t/shpecornell/signup",
};
