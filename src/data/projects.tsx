import { Project } from "../types/Project";
import React from "react";

export const projects: Project[] = [
  {
    href: "https://github.com/jmaitlandsoto/dev-portfolio",
    title: "Dev Portfolio",
    description:<React.Fragment>This portfolio site — clean, and modern UI is cool and all, but my favourite part of this project is that I deployed it onto a Raspberry Pi 5 sitting next to my modem. To deploy I SSH into the Pi, clone the repo, start the Docker container, and use Cloudflare to expose the port to the internet. <a href="https://pi.joshmaitland.ca" target="_blank" rel="noopener noreferrer">Check it out!</a></React.Fragment>,
    techStack: ["Vite", "React", "TypeScript", "Tailwind CSS", 'Docker', "Cloudflare Tunnels", "Raspberry Pi"],
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
    techStack: ["TypeScript", "Node.js", "Model Context Protocol (MPC)", "Vitest"],
  },
];
