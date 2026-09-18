import { Project } from "../types/Project";

export const projects: Project[] = [
  {
    href: "https://github.com/jmaitlandsoto/dev-portfolio",
    title: "Dev Portfolio",
    description:
      "This portfolio site — built to showcase my work and skills to recruiters. Features a clean, modern UI with smooth navigation and responsive design.",
    techStack: ["Vite", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    href: "https://github.com/jmaitlandsoto/housebot",
    title: "Housebot",
    description:
      "Turned my house into a robot with eyes: a motion-gated computer vision pipeline that watches a Tapo RTSP camera stream and runs real-time object detection, only waking the model up when something actually moves.",
    techStack: ["Python", "OpenCV", "YOLO (Ultralytics)", "RTSP"],
  },
  {
    href: "https://github.com/jmaitlandsoto/ats-scanner-mcp",
    title: "ATS Scanner MCP",
    description:
      "A Jobscan-style ATS resume scanner packaged as a Model Context Protocol server, so Claude Desktop can score a resume against a job posting, surface missing keywords, and propose honest edits — all locally, no subscription or API key required.",
    techStack: ["TypeScript", "Node.js", "Model Context Protocol", "Vitest"],
  },
];
