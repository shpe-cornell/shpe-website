export type Announcement = {
  date: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  isNew?: boolean;
};

export const announcementsList: Announcement[] = [
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
