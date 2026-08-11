import communityConnectImage from "@/assets/work/community-connect.png";
import ourForeverImage from "@/assets/work/our-forever.png";

export const projects = [
  {
    number: "01",
    title: "Community Connect",
    description:
      "A civic web platform that allows residents to report community issues, track submissions, and stay informed through a centralized digital portal.",
    technologies: ["React", "Tailwind CSS", "Firebase", "Cloudinary"],
    image: communityConnectImage,
    // No public live URL or repo provided yet — replace with a real link
    // when available (live site preferred, GitHub repo otherwise).
    href: null,
  },
  {
    number: "02",
    title: "Our Forever",
    description:
      "A private progressive web application featuring real-time data, interactive experiences, media sharing, and personalized features.",
    technologies: ["React", "Tailwind CSS", "Firebase", "Cloudinary", "PWA"],
    image: ourForeverImage,
    // Personal/private project — intentionally not linked.
    href: null,
  },
];