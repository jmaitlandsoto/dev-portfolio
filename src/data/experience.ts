import { Experience } from "../types/Experience";

export const experience: Experience[] = [
  {
    company: "Iceberg Cyber",
    position: "Full Stack Developer",
    startDate: "June 2024",
    endDate: "Present",
    highlights: [
      "Raised deploy pipeline success rate from 65% to 95% by automating Bitbucket Pipelines",
      "Architected AWS CDK infrastructure-as-code (Lambda, SQS, RDS, DynamoDB, Cognito, IAM)",
      "Designed distributed event-driven architecture processing 1000+ concurrent CRM jobs",
      "Shipped stakeholder-requested CRM integrations, including bidirectional sync and OAuth flows",
      "Designed an RBAC system for multi-tenant client isolation supporting audit and compliance",
    ],
    techStack: ["TypeScript", "Node.js", "AWS CDK", "Lambda", "DynamoDB", "Bitbucket Pipelines"],
  },
  {
    href: "https://www.gibbly.co/",
    company: "Gibbly",
    position: "Technical Co-Founder",
    startDate: "Dec 2022",
    endDate: "Present",
    highlights: [
      "Sole developer for an AI edtech platform serving ~36,000 users across a multi-tenant system",
      "Built agentic AI automation on the OpenAI API using RAG, structured outputs, and parallelization",
      "Added LLM-as-a-judge evaluation to score and refine AI output against quality criteria",
      "Implemented guardrails for minors, including copyright prevention and OpenAI Moderation API screening",
      "Designed REST/GraphQL APIs and frontend for the web app and a third-party Canva app",
      "Own authentication, authorization, payments, and sensitive user data end-to-end",
    ],
    techStack: ["React", "TypeScript", "OpenAI API", "GraphQL", "AWS", "PostHog"],
  },
  {
    href: "https://www.instagram.com/rippleverse/?hl=en",
    company: "Ripple Studios Inc.",
    position: "Lead Game Developer",
    startDate: "May 2021",
    endDate: "Oct 2022",
    highlights: [
      "Authored 100+ reusable, maintainable C# modules on .NET following clean code and SOLID principles",
      "Integrated Google, Apple, and Unity APIs across 4 shipped mobile and web applications",
      "Configured DevOps, LiveOps, and analytics tooling for production monitoring",
    ],
    techStack: ["C#", ".NET", "Unity"],
  },
  {
    company: "Real Programming 4 Kids",
    position: "Coding Instructor",
    startDate: "Jan 2020",
    endDate: "Aug 2021",
    highlights: [
      "Taught and mentored 100+ students from beginner to advanced programming in Python, Java, C#, C++, and Visual Basic",
      "Adapted technical communication across a wide range of skill levels and age groups",
      "Contributed to the development of 2 course manuals",
    ],
    techStack: ["Python", "Java", "C#", "C++"],
  },
];
