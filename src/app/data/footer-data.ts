export type SocialLink = {
  href: string;
  src: string;
  alt: string;
};

export type FooterQuickLink = {
  label: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    href: "https://join.slack.com/t/shpecornell/signup",
    src: "/images/icons/slack.png",
    alt: "Slack",
  },
  {
    href: "https://www.instagram.com/cornellshpe/",
    src: "/images/icons/ig.png",
    alt: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/shpe-at-cornell-university?trk=ppro_cprof",
    src: "/images/icons/linked.png",
    alt: "LinkedIn",
  },
];

export const quickLinks: FooterQuickLink[] = [
  { label: "SHPE '26 Convention", href: "https://shpe.org/2026-shpe/" },
  {
    label: "Donate",
    href: "https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=16421&bledit=1&dids=789.",
  },
  {
    label: "Become a National Member",
    href: "https://shpe.org/membership/become-a-member/",
  },
  {
    label: "Add our Calendar",
    href: "https://calendar.google.com/calendar/u/0?cid=MTBjODY3M2ExNzMzNzFhMWU1YjlhOGY0OGEwMDQ3MWY0OWM1ODZiMjMzZjE0YWIyODdjMTFhODgxOGY5MzNlYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
  },
];
